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
const SHIP_METHODS = [
  { id: 'seven', label: '7-11 店到店', kind: 'store' },
  { id: 'family', label: '全家 店到店', kind: 'store' },
  { id: 'tcat', label: '黑貓宅配', kind: 'home' },
  { id: 'pickup', label: '自取（艋舺）', kind: 'pickup' },
];

function shipKind(method) {
  return SHIP_METHODS.find((m) => m.id === method)?.kind;
}

function OrderRequestForm({ cart, total, onSent }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shipMethod, setShipMethod] = useState('');
  const [storeId, setStoreId] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const kind = shipKind(shipMethod);

  const validate = () => {
    if (!name.trim()) return '請留下您的姓名，我們才知道這批皂要寄給誰。';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return '請留下正確的電子郵件 —— 訂單回信要用。';
    if (!/^09\d{8}$/.test(phone.replace(/[\s-]/g, ''))) return '請留下台灣手機號碼（09 開頭、共十碼）。';
    if (!shipMethod) return '請選一個寄送方式。';
    if (kind === 'store' && !storeId.trim()) return '請留下超商店號（可於 7-11 或全家 App 查到）。';
    if (kind === 'home' && !address.trim()) return '請留下完整的收件地址（含郵遞區號）。';
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const clientError = validate();
    if (clientError) {
      setStatus('error');
      setErrorMsg(clientError);
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    try {
      const selected = SHIP_METHODS.find((m) => m.id === shipMethod);
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.replace(/[\s-]/g, ''),
          shipMethod: selected?.label || shipMethod,
          shipKind: kind,
          storeId: kind === 'store' ? storeId.trim() : '',
          recipientName: (recipientName.trim() || name.trim()),
          address: kind === 'home' ? address.trim() : '',
          note: note.trim(),
          cart: cart.map((i) => ({
            num: i.num,
            zh: i.zh,
            lat: i.lat,
            qty: i.qty,
            price: i.price,
          })),
          total,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `伺服器回應 ${res.status}`);
      }
      setStatus('sent');
      setName('');
      setEmail('');
      setPhone('');
      setShipMethod('');
      setStoreId('');
      setRecipientName('');
      setAddress('');
      setNote('');
      window.setTimeout(() => onSent && onSent(), 1500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || '訂單未能送出，請稍後再試。');
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
        <div
          className="tc"
          style={{ fontSize: 14, color: 'var(--sumi)', lineHeight: 1.7, letterSpacing: 1 }}
        >
          我們已收到您的訂購請求，將於 24 小時內以電子郵件回覆付款與寄送方式。
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="tc"
        style={{
          marginTop: 24,
          width: '100%',
          background: 'var(--red)',
          color: 'var(--gold-2)',
          padding: '16px',
          fontSize: 15,
          letterSpacing: 4,
          border: '1px solid var(--gold-1)',
        }}
      >
        送出訂購
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
        訂購單
      </div>
      <div
        className="tc"
        style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.7, letterSpacing: 1 }}
      >
        將於 24 小時內以電子郵件回覆付款與寄送方式。無需先付款。
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="姓名"
        required
        autoComplete="name"
        style={inputStyle}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="電子郵件"
        required
        autoComplete="email"
        style={inputStyle}
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="手機號碼（09XX-XXX-XXX）"
        required
        autoComplete="tel"
        style={inputStyle}
      />
      <select
        value={shipMethod}
        onChange={(e) => setShipMethod(e.target.value)}
        required
        style={{ ...inputStyle, appearance: 'none', background: 'var(--paper)' }}
      >
        <option value="">── 選擇寄送方式 ──</option>
        {SHIP_METHODS.map((m) => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </select>
      {kind === 'store' && (
        <input
          type="text"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          placeholder="超商店號（於超商 App 查詢）"
          required
          style={inputStyle}
        />
      )}
      {kind === 'home' && (
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="完整地址（含郵遞區號）"
          rows={2}
          required
          autoComplete="street-address"
          style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }}
        />
      )}
      {kind && kind !== 'pickup' && (
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="收件人姓名（若與上方不同）"
          autoComplete="name"
          style={inputStyle}
        />
      )}
      <div style={{ display: 'grid', gap: 6, marginTop: 4 }}>
        <label
          htmlFor="gf-order-note"
          className="mono"
          style={{ color: 'var(--gold-3)', fontSize: 10, letterSpacing: 2 }}
        >
          想給我們留一句話？（選填）
        </label>
        <textarea
          id="gf-order-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="送禮對象、想要的包裝、到貨時間，或任何想告訴我們的事。"
          rows={4}
          maxLength={2000}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
        />
      </div>
      {status === 'error' && (
        <div
          className="tc"
          style={{
            color: 'var(--red)',
            fontSize: 13,
            padding: '8px 12px',
            background: 'rgba(138,42,34,0.06)',
            border: '1px solid var(--red)',
            letterSpacing: 1,
          }}
        >
          {errorMsg}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="tc"
          style={{
            flex: 1,
            padding: '14px',
            border: '1px solid var(--ink-15)',
            color: 'var(--sumi)',
            fontSize: 14,
            letterSpacing: 3,
          }}
        >
          取消
        </button>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="tc"
          style={{
            flex: 2,
            background: 'var(--red)',
            color: 'var(--gold-2)',
            padding: '14px',
            fontSize: 14,
            letterSpacing: 3,
            border: '1px solid var(--gold-1)',
            opacity: status === 'sending' ? 0.6 : 1,
            cursor: status === 'sending' ? 'wait' : 'pointer',
          }}
        >
          {status === 'sending' ? '寄送中…' : `送出 · NT$${total}`}
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
  fontFamily: '"Noto Serif TC", serif',
  fontSize: 15,
  letterSpacing: 1,
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
          線上購皂
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
        <div
          className="tc"
          style={{
            fontSize: 17,
            color: 'var(--gold-3)',
            maxWidth: 640,
            margin: '0 auto',
            lineHeight: 1.85,
            letterSpacing: 3,
          }}
        >
          收到訂單後三個工作天內寄出 · 支援 7-11 與全家店到店付款
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
                購物籃
              </div>
              <div className="tc" style={{ fontSize: 26, letterSpacing: 4, marginTop: 4 }}>
                您的籃子
              </div>
            </div>
            <div className="tc" style={{ fontSize: 14, color: 'var(--gold-3)', letterSpacing: 2 }}>
              {cart.length} 款
            </div>
          </div>

          <Divider />

          {cart.length === 0 && (
            <div
              className="tc"
              style={{
                textAlign: 'center',
                padding: '40px 0',
                color: 'var(--ink-60)',
                fontSize: 15,
                letterSpacing: 2,
              }}
            >
              籃中尚無皂塊。
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
                <IllSoap ratio="1/1" label={item.num} tone={item.tone} flower="rose" />
              </div>
              <div>
                <div className="tc" style={{ fontSize: 18, letterSpacing: 3 }}>
                  {item.zh}
                </div>
                <div className="italic" style={{ fontSize: 13, color: 'var(--gold-3)' }}>
                  {item.lat} · № {item.num}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
                  <button
                    onClick={() => updateQty(item.num, -1)}
                    className="gf-tiny-btn"
                    aria-label={`${item.zh} 減少一件`}
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
                    aria-label={`${item.zh} 增加一件`}
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
                  fontSize: 14,
                  letterSpacing: 2,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="tc" style={{ color: 'var(--ink-60)' }}>小計</span>
                  <span className="mono">NT${subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="tc" style={{ color: 'var(--ink-60)' }}>運費 · 本島</span>
                  <span
                    className={shipping === 0 ? 'tc' : 'mono'}
                    style={{ color: shipping === 0 ? 'var(--red)' : 'var(--sumi)' }}
                  >
                    {shipping === 0 ? '免運' : `NT$${shipping}`}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                    marginTop: 6,
                    borderTop: '1px solid var(--sumi)',
                    fontSize: 20,
                  }}
                >
                  <span className="tc" style={{ letterSpacing: 4 }}>合計</span>
                  <span className="italic" style={{ color: 'var(--red)' }}>NT${total}</span>
                </div>
              </div>

              <OrderRequestForm cart={cart} total={total} onSent={clear} />

              <div
                className="tc"
                style={{
                  marginTop: 14,
                  fontSize: 13,
                  color: 'var(--ink-60)',
                  textAlign: 'center',
                  letterSpacing: 2,
                }}
              >
                每週四出貨 · 手工包裝 · 紅蠟封緘
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
              批發合作
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
              className="tc"
              style={{
                fontSize: 16,
                color: 'rgba(248,245,235,0.85)',
                maxWidth: 440,
                lineHeight: 1.85,
                letterSpacing: 1,
              }}
            >
              本舍與少數獨立店家合作。若您的店面與我們的皂氣質相投，請來信一敘 — 最低訂量十二塊。
            </div>
            <button
              className="tc"
              style={{
                marginTop: 28,
                background: 'transparent',
                color: 'var(--gold-2)',
                border: '1px solid var(--gold-1)',
                padding: '14px 26px',
                fontSize: 14,
                letterSpacing: 3,
              }}
            >
              申請批發 · wholesale@jinhuasoap.com
            </button>
          </div>

          <div>
            <div className="mono" style={{ color: 'var(--gold-2)' }}>
              月訊
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
              className="tc"
              style={{
                fontSize: 16,
                color: 'rgba(248,245,235,0.85)',
                maxWidth: 440,
                lineHeight: 1.85,
                letterSpacing: 1,
              }}
            >
              每月一封 — 新一批的皂、本月所思之材、與一小段熟成室的隨筆。不推銷、不聒噪。
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
                placeholder="您的電子郵件"
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  background: 'transparent',
                  border: '1px solid var(--gold-1)',
                  borderRight: 'none',
                  color: 'var(--paper)',
                  fontFamily: '"Noto Serif TC", serif',
                  fontSize: 15,
                  letterSpacing: 1,
                  outline: 'none',
                }}
              />
              <button
                className="tc"
                style={{
                  background: 'var(--gold-1)',
                  color: 'var(--sumi)',
                  padding: '14px 22px',
                  fontSize: 14,
                  letterSpacing: 3,
                }}
              >
                訂閱
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
