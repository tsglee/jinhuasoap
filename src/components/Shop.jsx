// Shop tab — Taipei stockists + online shop + shopping cart
import { useState } from 'react';
import { Divider } from './GoldenFlower.jsx';
import { IllSoap } from './Illustrations.jsx';

const STOCKISTS = [
  { city: 'Taipei', zh: '艋舺 · 本店', addr: '台北市萬華區貴陽街二段 88 號', kind: 'Flagship', hours: '週三–週日 · 11:00–19:00' },
  { city: 'Taipei', zh: '大稻埕', addr: '台北市大同區迪化街一段 142 號', kind: 'Partner', hours: '每日 · 10:30–20:00' },
  { city: 'Taipei', zh: '赤峰街', addr: '台北市大同區赤峰街 47 巷 8 號', kind: 'Partner', hours: '週二–週日 · 12:00–20:00' },
  { city: 'Taipei', zh: '永康街', addr: '台北市大安區永康街 31 巷 9 號', kind: 'Partner', hours: '每日 · 11:00–21:00' },
  { city: 'Taipei', zh: '富錦街', addr: '台北市松山區富錦街 355 號', kind: 'Partner', hours: '週三–週一 · 12:30–19:30' },
];

const CART_ITEMS = [
  { num: 'I', zh: '玫瑰', en: 'Rose', qty: 2, price: 380, tone: 'rose' },
  { num: 'VI', zh: '桂花', en: 'Osmanthus', qty: 1, price: 420, tone: 'warm' },
];

export function Shop() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [cart, setCart] = useState(CART_ITEMS);
  const [addingEmail, setAddingEmail] = useState('');

  const cities = ['All', 'Taipei'];
  const filtered = selectedCity === 'All' ? STOCKISTS : STOCKISTS.filter((s) => s.city === selectedCity);

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const shipping = subtotal > 1200 ? 0 : 120;
  const total = subtotal + shipping;

  const updateQty = (num, delta) => {
    setCart((c) =>
      c
        .map((i) => (i.num === num ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0),
    );
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px 40px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          Where to find us · 尋皂處
        </div>
        <h1
          className="tc"
          style={{
            fontSize: 72,
            fontWeight: 500,
            letterSpacing: 16,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          購皂去處
        </h1>
        <div className="italic" style={{ fontSize: 22, color: 'var(--gold-3)' }}>
          Shop online, or visit us in person.
        </div>
      </section>

      {/* Two-column: map + cart */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '30px 44px 60px',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 50,
        }}
      >
        {/* Stockists column */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 24,
            }}
          >
            <div>
              <div className="mono" style={{ color: 'var(--gold-3)' }}>
                Stockists · 店家
              </div>
              <div
                className="tc"
                style={{
                  fontSize: 32,
                  letterSpacing: 6,
                  marginTop: 6,
                }}
              >
                實體店面
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  style={{
                    padding: '6px 12px',
                    fontFamily: '"DM Mono", monospace',
                    fontSize: 10,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    border: `1px solid ${selectedCity === c ? 'var(--red)' : 'var(--ink-15)'}`,
                    background: selectedCity === c ? 'var(--red)' : 'transparent',
                    color: selectedCity === c ? 'var(--gold-2)' : 'var(--sumi)',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative map — Taipei districts with pins */}
          <div
            style={{
              position: 'relative',
              background: 'var(--paper-2)',
              border: '1px solid var(--ink-15)',
              padding: 24,
              marginBottom: 30,
              aspectRatio: '16/9',
            }}
          >
            <svg viewBox="0 0 400 225" style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgba(26,21,18,0.06)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="400" height="225" fill="url(#map-grid)" />

              {/* Tamsui / Keelung river */}
              <path
                d="M40 70 C 100 60, 160 90, 220 80 C 280 72, 340 100, 380 90"
                fill="none"
                stroke="rgba(77,107,75,0.35)"
                strokeWidth="3"
              />
              <path
                d="M200 40 C 210 80, 180 130, 200 190"
                fill="none"
                stroke="rgba(77,107,75,0.35)"
                strokeWidth="3"
              />

              {/* Basin outline */}
              <path
                d="M50 60 C 40 120, 70 180, 160 195 C 260 205, 360 170, 370 110 C 375 60, 300 30, 200 35 C 120 40, 60 40, 50 60 Z"
                fill="rgba(198,154,58,0.12)"
                stroke="var(--gold-3)"
                strokeWidth="0.8"
              />

              {/* District labels */}
              {[
                { x: 110, y: 150, label: '萬華' },
                { x: 150, y: 75, label: '大同' },
                { x: 230, y: 140, label: '大安' },
                { x: 310, y: 100, label: '松山' },
                { x: 250, y: 55, label: '中山' },
              ].map((d, i) => (
                <text
                  key={i}
                  x={d.x}
                  y={d.y}
                  fontFamily='"Noto Serif TC", serif'
                  fontSize="11"
                  fill="rgba(26,21,18,0.35)"
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              ))}

              {/* Pins */}
              {[
                { x: 115, y: 155, label: '本店', kind: 'flag' },
                { x: 160, y: 90, label: '迪化', kind: '' },
                { x: 175, y: 70, label: '赤峰', kind: '' },
                { x: 240, y: 150, label: '永康', kind: '' },
                { x: 315, y: 105, label: '富錦', kind: '' },
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={p.kind === 'flag' ? 6 : 4} fill="var(--red)" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.kind === 'flag' ? 12 : 9}
                    fill="none"
                    stroke="var(--red)"
                    opacity="0.3"
                  />
                  {p.kind === 'flag' && <circle cx={p.x} cy={p.y} r="3" fill="var(--gold-2)" />}
                  <text
                    x={p.x + 10}
                    y={p.y + 3}
                    fontFamily='"Noto Serif TC", serif'
                    fontSize="10"
                    fill="var(--sumi)"
                  >
                    {p.label}
                  </text>
                </g>
              ))}

              {/* Compass */}
              <g transform="translate(370, 30)">
                <circle cx="0" cy="0" r="14" fill="none" stroke="var(--gold-3)" strokeWidth="0.6" />
                <text
                  x="0"
                  y="-16"
                  textAnchor="middle"
                  fontFamily='"DM Mono", monospace'
                  fontSize="7"
                  fill="var(--gold-3)"
                >
                  N
                </text>
                <path d="M0 8 L-3 0 L0 -8 L3 0 Z" fill="var(--red)" />
              </g>

              {/* Title */}
              <text
                x="24"
                y="30"
                fontFamily='"Cormorant Garamond", serif'
                fontStyle="italic"
                fontSize="14"
                fill="var(--gold-3)"
              >
                Taipei · 台北
              </text>
            </svg>
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                left: 24,
                fontFamily: '"DM Mono", monospace',
                fontSize: 9,
                letterSpacing: 2,
                color: 'var(--ink-60)',
                textTransform: 'uppercase',
              }}
            >
              5 stockists · all within taipei city
            </div>
          </div>

          {/* Stockist list */}
          <div
            style={{
              display: 'grid',
              gap: 0,
              border: '1px solid var(--ink-15)',
            }}
          >
            {filtered.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto auto',
                  gap: 20,
                  padding: '18px 22px',
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--ink-15)' : 'none',
                  background: i % 2 ? 'transparent' : 'rgba(244,236,215,0.5)',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div className="tc" style={{ fontSize: 20, letterSpacing: 3 }}>
                    {s.zh}
                  </div>
                  <div className="italic" style={{ fontSize: 13, color: 'var(--gold-3)' }}>
                    Taipei
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 15, color: 'var(--sumi)' }}>{s.addr}</div>
                  <div className="mono" style={{ color: 'var(--ink-60)', marginTop: 4 }}>
                    {s.hours}
                  </div>
                </div>
                <div
                  style={{
                    padding: '4px 10px',
                    fontFamily: '"DM Mono", monospace',
                    fontSize: 9,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    border: `1px solid ${s.kind === 'Flagship' ? 'var(--red)' : 'var(--ink-15)'}`,
                    color: s.kind === 'Flagship' ? 'var(--red)' : 'var(--ink-60)',
                  }}
                >
                  {s.kind}
                </div>
                <button
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: 'italic',
                    fontSize: 15,
                    color: 'var(--red)',
                  }}
                >
                  directions →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart column */}
        <aside
          style={{
            position: 'sticky',
            top: 160,
            alignSelf: 'start',
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

              <button
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
                Checkout · 結帳
              </button>

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
        style={{
          background: 'var(--sumi)',
          color: 'var(--paper)',
          padding: '70px 44px',
        }}
      >
        <div
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
                color: 'rgba(236,227,207,0.85)',
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
                color: 'rgba(236,227,207,0.85)',
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
