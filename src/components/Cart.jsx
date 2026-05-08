// /cart — dedicated cart + checkout page.
// Split out of Shop.jsx so 「逛」(grid) 跟「結帳」(form) 各自一頁。
import { useEffect, useState } from 'react';
import { Divider } from './GoldenFlower.jsx';
import { useCart } from '../state/CartContext.jsx';
import { TierNotice } from './TierNotice.jsx';

const ECPAY_SUBTYPE = { seven: 'UNIMARTC2C', family: 'FAMIC2C' };
const ECPAY_DEFAULT_EMAP_URL = 'https://logistics.ecpay.com.tw/Express/map';

const SHIP_METHODS = [
  { id: 'seven', label: '7-11 店到店（貨到付款）', kind: 'store' },
  { id: 'family', label: '全家 店到店（貨到付款）', kind: 'store' },
];

function CartPhoto({ src, alt }) {
  if (!src) return null;
  const base = src.replace(/\.(png|jpe?g)$/i, '');
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={`${base}.webp`}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: 60,
          height: 60,
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </picture>
  );
}

function shipKind(method) {
  return SHIP_METHODS.find((m) => m.id === method)?.kind;
}

function ThankYou({ orderId, navigate }) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '120px 44px 60px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          訂單已送出
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: 14,
            margin: '16px 0 14px',
            color: 'var(--sumi)',
          }}
        >
          謝謝你的購買
        </h1>
        <div
          className="tc"
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            letterSpacing: 4,
            color: 'var(--gold-3)',
            margin: '0 auto 18px',
          }}
        >
          您的支持是我們最大的動力
        </div>
        <p
          className="tc"
          style={{
            fontSize: 16,
            lineHeight: 1.85,
            letterSpacing: 1,
            color: 'var(--sumi)',
            maxWidth: 520,
            margin: '0 auto',
          }}
        >
          我們收到了，闆娘會開始使喚老公執行出貨事宜。
          收到訂單後最多兩個工作天內一定會出貨。
        </p>

        <div style={{ margin: '40px auto 0', maxWidth: 600 }}>
          <picture>
            <source type="image/avif" srcSet="/images/thanku/thanks.avif" />
            <source type="image/webp" srcSet="/images/thanku/thanks.webp" />
            <img
              src="/images/thanku/thanks.jpeg"
              alt="金花樓夫妻檔在工坊裡做皂、包貨"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </picture>
        </div>

        {orderId && (
          <div
            style={{
              margin: '40px auto 28px',
              padding: '18px 28px',
              display: 'inline-block',
              background: 'var(--paper)',
              border: '1px solid var(--gold-1)',
            }}
          >
            <div
              className="mono"
              style={{
                color: 'var(--gold-3)',
                fontSize: 10,
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              訂單編號 · 請保留
            </div>
            <div
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: 22,
                letterSpacing: 4,
                color: 'var(--red)',
              }}
            >
              {orderId}
            </div>
          </div>
        )}

        <p
          className="tc"
          style={{
            fontSize: 15,
            lineHeight: 1.85,
            letterSpacing: 1,
            color: 'var(--sumi)',
            maxWidth: 480,
            margin: '0 auto 40px',
          }}
        >
          接下來請加我們 Line（右下角的綠色按鈕）並告知這個編號，
          我們會在 24 小時內回覆付款與寄送方式。
        </p>

        <div
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => navigate && navigate('/?tab=shop')}
            className="tc"
            style={{
              padding: '14px 26px',
              background: 'var(--red)',
              color: 'var(--gold-2)',
              border: '1px solid var(--gold-1)',
              fontSize: 14,
              letterSpacing: 3,
              cursor: 'pointer',
            }}
          >
            繼續逛十二花  ▸
          </button>
          <button
            type="button"
            onClick={() => navigate && navigate('/')}
            className="tc"
            style={{
              padding: '14px 26px',
              background: 'transparent',
              color: 'var(--sumi)',
              border: '1px solid var(--ink-15)',
              fontSize: 14,
              letterSpacing: 3,
              cursor: 'pointer',
            }}
          >
            回首頁
          </button>
        </div>
      </section>
    </div>
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

function OrderRequestForm({ cart, total, onSent }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shipMethod, setShipMethod] = useState('');
  const [storeId, setStoreId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [pickerError, setPickerError] = useState('');
  const [ecpayConfig, setEcpayConfig] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const kind = shipKind(shipMethod);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.data?.type !== 'gf:store-picked') return;
      setStoreId(e.data.store?.id || '');
      setStoreName(e.data.store?.name || '');
      setPickerError('');
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fallback = {
      ecpayMerchantId: import.meta.env.VITE_ECPAY_MERCHANT_ID || '',
      ecpayEmapUrl:
        import.meta.env.VITE_ECPAY_EMAP_URL || ECPAY_DEFAULT_EMAP_URL,
    };
    fetch('/api/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        setEcpayConfig(data && data.ecpayMerchantId ? data : fallback);
      })
      .catch(() => {
        if (!cancelled) setEcpayConfig(fallback);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openStorePicker = () => {
    const subType = ECPAY_SUBTYPE[shipMethod];
    if (!subType) return;
    if (!ecpayConfig) {
      setPickerError('正在載入選店設定，請稍候再試。');
      return;
    }
    if (!ecpayConfig.ecpayMerchantId) {
      setPickerError('未設定 ECPay 商編，無法開啟選店地圖。');
      return;
    }
    const popup = window.open(
      'about:blank',
      'gfStorePicker',
      'width=720,height=720,resizable=yes,scrollbars=yes',
    );
    if (!popup) {
      setPickerError('請允許彈出視窗以開啟選店地圖。');
      return;
    }
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = ecpayConfig.ecpayEmapUrl || ECPAY_DEFAULT_EMAP_URL;
    form.target = 'gfStorePicker';
    form.style.display = 'none';
    const fields = {
      MerchantID: ecpayConfig.ecpayMerchantId,
      LogisticsType: 'CVS',
      LogisticsSubType: subType,
      IsCollection: 'Y',
      ServerReplyURL: `${window.location.origin}/api/store-callback`,
      Device: /Mobi|Android|iPhone/.test(navigator.userAgent) ? '1' : '0',
    };
    for (const [k, v] of Object.entries(fields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = v;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    form.remove();
    setPickerError('');
  };

  const validate = () => {
    if (!name.trim()) return '請留下您的姓名，我們才知道這批皂要寄給誰。';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return '請留下正確的電子郵件 —— 訂單回信要用。';
    if (!/^09\d{8}$/.test(phone.replace(/[\s-]/g, ''))) return '請留下台灣手機號碼（09 開頭、共十碼）。';
    if (!shipMethod) return '請選一個寄送方式。';
    if (kind === 'store' && !storeId.trim()) return '請留下超商店號（可於 7-11 或全家 App 查到）。';
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
          // 直送 ECPay LogisticsSubType（UNIMARTC2C / FAMIC2C），worker 用
          // 這個自動 call CreateShippingOrder API。比從中文 shipMethod
          // 反推 subType 穩。
          subType: kind === 'store' ? ECPAY_SUBTYPE[shipMethod] : undefined,
          storeId: kind === 'store' ? storeId.trim() : '',
          storeName: kind === 'store' ? storeName.trim() : '',
          recipientName: (recipientName.trim() || name.trim()),
          address: '',
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
      onSent && onSent(data.orderId || '');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || '訂單未能送出，請稍後再試。');
    }
  };

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
        送出後請加我們 Line 並告知訂單編號，我們會在 24 小時內回覆付款與寄送方式。無需先付款。
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
        onChange={(e) => {
          setShipMethod(e.target.value);
          setStoreId('');
          setStoreName('');
          setPickerError('');
        }}
        required
        style={{ ...inputStyle, appearance: 'none', background: 'var(--paper)' }}
      >
        <option value="">── 選擇寄送方式 ──</option>
        {SHIP_METHODS.map((m) => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </select>
      {kind === 'store' && (
        <div style={{ display: 'grid', gap: 6 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              placeholder="超商店號"
              required
              style={{ ...inputStyle, flex: 1, minWidth: 0 }}
            />
            <button
              type="button"
              onClick={openStorePicker}
              className="tc"
              style={{
                padding: '0 16px',
                border: '1px solid var(--ink-15)',
                background: 'var(--paper)',
                color: 'var(--sumi)',
                fontSize: 13,
                letterSpacing: 2,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {storeId ? '重選門市' : '選擇門市'}
            </button>
          </div>
          {storeName && (
            <div
              className="tc"
              style={{ fontSize: 13, color: 'var(--gold-3)', letterSpacing: 1 }}
            >
              ☑ {storeName}
            </div>
          )}
          {pickerError && (
            <div
              className="tc"
              style={{ fontSize: 13, color: 'var(--red)', letterSpacing: 1 }}
            >
              {pickerError}
            </div>
          )}
        </div>
      )}
      {kind === 'store' && (
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

export function Cart({ navigate }) {
  const { items: cart, subtotal, discount, discountRate, shipping, total, updateQty, clear } = useCart();
  const [thanks, setThanks] = useState(null);

  if (thanks) {
    return <ThankYou orderId={thanks.orderId} navigate={navigate} />;
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px 30px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          結帳
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: 16,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          購物籃
        </h1>
        <div
          className="tc"
          style={{
            fontSize: 15,
            color: 'var(--gold-3)',
            letterSpacing: 3,
          }}
        >
          確認您挑的皂塊與寄送方式
        </div>
      </section>

      {/* Cart aside */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '20px 44px 60px',
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
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div
                className="tc"
                style={{
                  color: 'var(--ink-60)',
                  fontSize: 15,
                  letterSpacing: 2,
                  marginBottom: 22,
                }}
              >
                籃中尚無皂塊。
              </div>
              <button
                type="button"
                onClick={() => navigate && navigate('/?tab=shop')}
                className="tc"
                style={{
                  padding: '12px 22px',
                  background: 'var(--red)',
                  color: 'var(--gold-2)',
                  border: '1px solid var(--gold-1)',
                  fontSize: 14,
                  letterSpacing: 3,
                  cursor: 'pointer',
                }}
              >
                回去逛皂  ▸
              </button>
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
                <CartPhoto src={item.photo} alt={`${item.zh} · ${item.lat}`} />
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
              <TierNotice variant="cart" subtotal={subtotal} />
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
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="tc" style={{ color: 'var(--red)' }}>
                      {discountRate === 0.10 ? '9 折優惠' : '95 折優惠'}
                    </span>
                    <span className="mono" style={{ color: 'var(--red)' }}>− NT${discount}</span>
                  </div>
                )}
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

              <OrderRequestForm
                cart={cart}
                total={total}
                onSent={(orderId) => {
                  setThanks({ orderId });
                  clear();
                }}
              />

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
    </div>
  );
}
