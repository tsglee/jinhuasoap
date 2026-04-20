// Shop tab — online-only shopping cart + order request form.
// (Physical stockists removed in Phase H — we don't have retail partners yet.)
import { useState } from 'react';
import { Divider } from './GoldenFlower.jsx';
import { IllSoap } from './Illustrations.jsx';
import { useCart } from '../state/CartContext.jsx';

/**
 * Order request form — POSTs cart contents to /api/order, which our Worker
 * forwards to Resend. This is the "checkout later" model from the launch
 * plan: no live payments, just an email to the brand owner.
 */
function OrderRequestForm({ cart, total, onSent }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          note: note.trim(),
          cart: cart.map((i) => ({
            num: i.num,
            zh: i.zh,
            en: i.en,
            qty: i.qty,
            price: i.price,
          })),
          total,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Server returned ${res.status}`);
      }
      setStatus('sent');
      setName('');
      setEmail('');
      setNote('');
      // Clear cart after a brief pause so the user sees the confirmation.
      window.setTimeout(() => onSent && onSent(), 1500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Could not send order. Please try again.');
    }
  };

  if (status === 'sent') {
    return (
      <div
        style={{
          marginTop: 20,
          padding: 18,
          background: 'rgba(74,107,75,0.08)',
          border: '1px solid var(--tea)',
          textAlign: 'center',
        }}
      >
        <div
          className="tc"
          style={{ fontSize: 22, letterSpacing: 4, color: 'var(--tea)', marginBottom: 6 }}
        >
          收到您的訂單
        </div>
        <div className="italic" style={{ fontSize: 15, color: 'var(--sumi)' }}>
          We&apos;ve received your order request. We&apos;ll reply by email within 24 hours with
          payment + shipping details.
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          marginTop: 24,
          width: '100%',
          background: 'var(--red)',
          color: 'var(--gold-2)',
          padding: '16px',
          fontFamily: '"DM Mono", monospace',
          fontSize: 12,
          letterSpacing: 3,
          textTransform: 'uppercase',
          border: '1px solid var(--gold-1)',
        }}
      >
        Request order · 訂購
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        marginTop: 24,
        display: 'grid',
        gap: 12,
      }}
    >
      <div className="mono" style={{ color: 'var(--gold-3)' }}>
        Order request · 訂購單
      </div>
      <div className="italic" style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.5 }}>
        We&apos;ll reply by email within 24 hours with payment + shipping. No card needed yet.
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name · 姓名"
        required
        autoComplete="name"
        style={inputStyle}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email · 電子郵件"
        required
        autoComplete="email"
        style={inputStyle}
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Anything we should know? (optional)"
        rows={3}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 70, fontFamily: '"Cormorant Garamond", serif' }}
      />
      {status === 'error' && (
        <div
          style={{
            color: 'var(--red)',
            fontSize: 13,
            padding: '8px 12px',
            background: 'rgba(138,42,34,0.06)',
            border: '1px solid var(--red)',
          }}
        >
          {errorMsg}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{
            flex: 1,
            padding: '14px',
            border: '1px solid var(--ink-15)',
            color: 'var(--sumi)',
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            flex: 2,
            background: 'var(--red)',
            color: 'var(--gold-2)',
            padding: '14px',
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            border: '1px solid var(--gold-1)',
            opacity: status === 'sending' ? 0.6 : 1,
            cursor: status === 'sending' ? 'wait' : 'pointer',
          }}
        >
          {status === 'sending' ? 'Sending…' : `Send · NT$${total}`}
        </button>
      </div>
    </form>
  );
}

const inputStyle = {
  padding: '12px 14px',
  background: 'var(--paper)',
  border: '1px solid var(--ink-15)',
  color: 'var(--sumi)',
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: 16,
  outline: 'none',
};

export function Shop() {
  const [addingEmail, setAddingEmail] = useState('');
  const { items: cart, subtotal, shipping, total, updateQty, clear } = useCart();

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px 40px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          線上購皂 · Shop online
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 72,
            fontWeight: 500,
            letterSpacing: 16,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          購皂
        </h1>
        {/* Chinese-only subtitle — intentional break from the bilingual pattern,
            because convenience-store pickup is a Taiwan-specific feature and
            the audience for this line is local. */}
        <div
          className="italic"
          style={{
            fontSize: 20,
            color: 'var(--gold-3)',
            maxWidth: 640,
            margin: '0 auto',
            lineHeight: 1.5,
          }}
        >
          我們在收到訂單後，三個工作天內寄出 · 支援 7-11 與全家店到店付款
        </div>
      </section>

      {/* Cart section — single centred column after Phase H simplification */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: '30px 44px 60px',
        }}
      >
        {/* (Stockists column deleted in Phase H — brand is online-only for now.
            Map SVG and 5-shop list lived here; git preserves it if we ever
            resurrect retail partners.) */}
        <aside
          style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--ink-15)',
            padding: 28,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 20,
            }}
          >
            <div>
              <div className="mono" style={{ color: 'var(--red)' }}>
                Shop online · 線上
              </div>
              <div className="tc" style={{ fontSize: 26, letterSpacing: 4, marginTop: 4 }}>
                您的籃子
              </div>
            </div>
            <div className="italic" style={{ fontSize: 14, color: 'var(--gold-3)' }}>
              {cart.length} bar{cart.length !== 1 ? 's' : ''}
            </div>
          </div>

          <Divider />

          {cart.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 0',
                color: 'var(--ink-60)',
                fontStyle: 'italic',
              }}
            >
              Your basket is empty.
            </div>
          )}

          {cart.map((item) => (
            <div
              key={item.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr auto',
                gap: 14,
                padding: '18px 0',
                borderBottom: '1px dotted var(--ink-15)',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 60, height: 60 }}>
                <IllSoap ratio="1/1" label={item.en} tone={item.tone} flower="rose" />
              </div>
              <div>
                <div className="tc" style={{ fontSize: 18, letterSpacing: 3 }}>
                  {item.zh}
                </div>
                <div className="italic" style={{ fontSize: 13, color: 'var(--gold-3)' }}>
                  {item.en} · No. {item.num}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
                  <button
                    onClick={() => updateQty(item.num, -1)}
                    className="gf-tiny-btn"
                    style={{
                      width: 22,
                      height: 22,
                      border: '1px solid var(--ink-15)',
                      fontFamily: '"DM Mono", monospace',
                      fontSize: 12,
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: 12,
                      minWidth: 22,
                      textAlign: 'center',
                    }}
                  >
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.num, 1)}
                    className="gf-tiny-btn"
                    style={{
                      width: 22,
                      height: 22,
                      border: '1px solid var(--ink-15)',
                      fontFamily: '"DM Mono", monospace',
                      fontSize: 12,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="italic" style={{ fontSize: 17, color: 'var(--red)' }}>
                NT${item.qty * item.price}
              </div>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <div
                style={{
                  marginTop: 20,
                  display: 'grid',
                  gap: 8,
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 11,
                  letterSpacing: 1,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ink-60)' }}>SUBTOTAL</span>
                  <span>NT${subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ink-60)' }}>SHIPPING · ISLAND</span>
                  <span style={{ color: shipping === 0 ? 'var(--red)' : 'var(--sumi)' }}>
                    {shipping === 0 ? 'FREE' : `NT$${shipping}`}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                    marginTop: 6,
                    borderTop: '1px solid var(--sumi)',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: 'italic',
                    fontSize: 20,
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: 'var(--red)' }}>NT${total}</span>
                </div>
              </div>

              <OrderRequestForm cart={cart} total={total} onSent={clear} />

              <div
                className="italic"
                style={{
                  marginTop: 14,
                  fontSize: 13,
                  color: 'var(--ink-60)',
                  textAlign: 'center',
                }}
              >
                Ships Thursdays · hand-wrapped · red wax seal
              </div>
            </>
          )}
        </aside>
      </section>

      {/* Wholesale + newsletter */}
      <section
        className="gf-pad-md"
        style={{
          background: 'var(--sumi)',
          color: 'var(--paper)',
          padding: '70px 44px',
        }}
      >
        <div
          className="gf-stack-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
          }}
        >
          <div>
            <div className="mono" style={{ color: 'var(--gold-2)' }}>
              Wholesale · 批發合作
            </div>
            <h2
              className="tc"
              style={{
                fontSize: 44,
                fontWeight: 400,
                letterSpacing: 8,
                margin: '12px 0',
                color: 'var(--paper)',
              }}
            >
              開店合作
            </h2>
            <div
              className="italic"
              style={{
                fontSize: 18,
                color: 'rgba(247,243,231,0.85)',
                maxWidth: 440,
                lineHeight: 1.6,
              }}
            >
              We partner with a small number of independent shops. If your counter would feel at
              home with our soap, write to us — minimum order twelve bars.
            </div>
            <button
              style={{
                marginTop: 28,
                background: 'transparent',
                color: 'var(--gold-2)',
                border: '1px solid var(--gold-1)',
                padding: '14px 26px',
                fontFamily: '"DM Mono", monospace',
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Apply to stock · wholesale@jinhuasoap.com
            </button>
          </div>

          <div>
            <div className="mono" style={{ color: 'var(--gold-2)' }}>
              Journal · 月訊
            </div>
            <h2
              className="tc"
              style={{
                fontSize: 44,
                fontWeight: 400,
                letterSpacing: 8,
                margin: '12px 0',
                color: 'var(--paper)',
              }}
            >
              月信
            </h2>
            <div
              className="italic"
              style={{
                fontSize: 18,
                color: 'rgba(247,243,231,0.85)',
                maxWidth: 440,
                lineHeight: 1.6,
              }}
            >
              One letter a month — new batches, the ingredient we&apos;re thinking about, and a
              small essay from the cure room. No sales, no plastic talk.
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAddingEmail('');
              }}
              style={{ marginTop: 24, display: 'flex', gap: 0 }}
            >
              <input
                type="email"
                value={addingEmail}
                onChange={(e) => setAddingEmail(e.target.value)}
                placeholder="your email"
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  background: 'transparent',
                  border: '1px solid var(--gold-1)',
                  borderRight: 'none',
                  color: 'var(--paper)',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: 'italic',
                  fontSize: 16,
                  outline: 'none',
                }}
              />
              <button
                style={{
                  background: 'var(--gold-1)',
                  color: 'var(--sumi)',
                  padding: '14px 22px',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
