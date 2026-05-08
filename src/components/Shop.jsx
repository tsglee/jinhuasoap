// Shop tab — product catalogue + wholesale section.
// 結帳流程已搬到 /cart（Cart.jsx）。
import { PRODUCTS } from '../data/products.js';
import { ProductGallery } from './ProductGallery.jsx';
import { AddToCartButton } from './BuyButton.jsx';

function leadLine(washFeel) {
  if (!washFeel) return '';
  const first = washFeel.split(/[，；。]/)[0].trim();
  return first;
}

function CatalogCard({ p, onJumpToCart }) {
  const priceDisplay = p.price > 0 ? `NT$ ${p.price}` : 'NT$ 待定';
  return (
    <article
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--ink-15)',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <ProductGallery photos={p.photos} alt={`${p.zh} · ${p.subtitle}`} ratio="1/1" />

      <div className="mono" style={{ color: 'var(--gold-3)', fontSize: 10, letterSpacing: 2 }}>
        № {p.num} · {p.series}
      </div>
      <div>
        <div
          className="tc"
          style={{ fontSize: 20, letterSpacing: 4, color: 'var(--sumi)', lineHeight: 1.3 }}
        >
          {p.zh}
        </div>
        <div
          className="tc"
          style={{ fontSize: 12, letterSpacing: 3, color: 'var(--gold-3)', marginTop: 4 }}
        >
          {p.subtitle}
        </div>
      </div>
      <p
        className="tc"
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          letterSpacing: 1,
          color: 'var(--ink-60)',
          margin: 0,
          minHeight: '2.4em',
        }}
      >
        {leadLine(p.washFeel)}
      </p>
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          paddingTop: 6,
          borderTop: '1px dotted var(--ink-15)',
        }}
      >
        <div>
          <span
            className="mono"
            style={{ color: 'var(--gold-3)', fontSize: 9, letterSpacing: 2 }}
          >
            {p.weight}
          </span>
          <div
            className="italic"
            style={{ fontSize: 18, color: 'var(--red)', letterSpacing: 1 }}
          >
            {priceDisplay}
          </div>
        </div>
        <AddToCartButton p={p} size="sm" onAdded={onJumpToCart} />
      </div>
    </article>
  );
}

function ProductCatalog({ onAdded }) {
  return (
    <section
      className="gf-pad-md"
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '20px 44px 50px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div className="mono" style={{ color: 'var(--red)' }}>
          選皂 · choose
        </div>
        <h2
          className="tc gf-h2-md"
          style={{
            fontSize: 38,
            fontWeight: 400,
            letterSpacing: 8,
            margin: '10px 0 6px',
            color: 'var(--sumi)',
          }}
        >
          十二款 · 一塊一塊挑
        </h2>
        <div
          className="tc"
          style={{ fontSize: 14, color: 'var(--gold-3)', letterSpacing: 3 }}
        >
          想看完整風土與配方，請至 02 十二花
        </div>
      </div>
      <div className="gf-catalog-grid">
        {PRODUCTS.map((p) => (
          <CatalogCard key={p.num} p={p} onJumpToCart={onAdded} />
        ))}
      </div>
    </section>
  );
}

export function Shop({ navigate }) {
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

      <ProductCatalog
        onAdded={() => {
          if (navigate) navigate('/cart');
        }}
      />

      {/* Wholesale */}
      <section
        className="gf-pad-md"
        style={{
          background: 'var(--sumi)',
          color: 'var(--paper)',
          padding: '70px 44px',
        }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div className="mono" style={{ color: 'var(--gold-2)' }}>
            客製合作
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
            節禮 · 婚禮
          </h2>
          <div
            className="tc"
            style={{
              fontSize: 16,
              color: 'rgba(248,245,235,0.85)',
              maxWidth: 440,
              margin: '0 auto',
              lineHeight: 1.85,
              letterSpacing: 1,
            }}
          >
            若您有婚禮小物、節日禮品或其他客製需求，歡迎加我們 Line 一敘 ── 一同為您構思一份合宜的皂禮。
          </div>
          <a
            href="https://lin.ee/7m167md"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: 28,
              padding: 16,
              background: 'var(--paper)',
              border: '1px solid var(--gold-1)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <img
              src="https://qr-official.line.me/gs/M_867ryfzn_GW.png?oat__id=6629290&oat_content=qr"
              alt="掃 QR · 加入金花樓官方 Line 洽詢客製"
              width="180"
              height="180"
              style={{ display: 'block' }}
            />
            <div
              className="tc"
              style={{
                marginTop: 12,
                fontSize: 13,
                color: 'var(--sumi)',
                letterSpacing: 2,
              }}
            >
              掃 QR · 加入好友洽詢
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
