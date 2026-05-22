// Shop tab — product catalogue + wholesale section.
// 結帳流程已搬到 /cart（Cart.jsx）。
import { PRODUCTS } from '../data/products.js';
import { TESTIMONIALS } from '../data/testimonials.js';
import { ProductGallery } from './ProductGallery.jsx';
import { TestimonialCarousel } from './TestimonialCarousel.jsx';
import { AddToCartButton } from './BuyButton.jsx';
import { useT, useLocaleVariant } from '../i18n/index.jsx';

function leadLine(washFeel) {
  if (!washFeel) return '';
  const first = washFeel.split(/[，；。]/)[0].trim();
  return first;
}

function CatalogCard({ p, onJumpToCart }) {
  const product = useLocaleVariant(p);
  const priceDisplay = p.price > 0 ? `NT$ ${p.price}` : 'NT$ —';
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
      <ProductGallery photos={p.photos} alt={`${product.zh} · ${product.subtitle}`} ratio="1/1" />

      <div className="mono" style={{ color: 'var(--gold-3)', fontSize: 12, letterSpacing: 1.5 }}>
        № {p.num} · {product.series}
      </div>
      <div>
        <div
          className="tc"
          style={{ fontSize: 20, letterSpacing: 4, color: 'var(--sumi)', lineHeight: 1.3 }}
        >
          {product.zh}
        </div>
        <div
          className="tc"
          style={{ fontSize: 12, letterSpacing: 3, color: 'var(--gold-3)', marginTop: 4 }}
        >
          {product.subtitle}
        </div>
      </div>
      <p
        className="tc"
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          letterSpacing: 1,
          color: 'var(--ink-60)',
          margin: 0,
          minHeight: '2.4em',
        }}
      >
        {leadLine(product.washFeel)}
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
            style={{ color: 'var(--gold-3)', fontSize: 11, letterSpacing: 1.5 }}
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
  const t = useT();
  return (
    <section
      className="gf-pad-md"
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '20px 44px 50px',
      }}
    >
      <div className="gf-hide-md" style={{ textAlign: 'center', marginBottom: 28 }}>
        <div className="mono" style={{ color: 'var(--red)' }}>
          {t('pages.shop.catalog.kicker')}
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
          {t('pages.shop.catalog.title')}
        </h2>
        <div
          className="tc"
          style={{ fontSize: 14, color: 'var(--gold-3)', letterSpacing: 3 }}
        >
          {t('pages.shop.catalog.subtitle')}
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
  const t = useT();
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
          {t('pages.shop.kicker')}
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
          {t('pages.shop.title')}
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
          {t('pages.shop.description')}
        </div>
      </section>

      <ProductCatalog
        onAdded={() => {
          if (navigate) navigate('/cart');
        }}
      />

      {/* Testimonials — 8 條真實感的客戶心得，編輯維護於 src/data/testimonials.js */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '60px 44px 80px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="mono" style={{ color: 'var(--red)' }}>
            {t('pages.shop.testimonials.kicker')}
          </div>
          <h2
            className="tc gf-h2-md"
            style={{
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: 8,
              margin: '12px 0 6px',
              color: 'var(--sumi)',
            }}
          >
            {t('pages.shop.testimonials.title')}
          </h2>
        </div>
        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </section>

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
            {t('pages.shop.custom.kicker')}
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
            {t('pages.shop.custom.title')}
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
            {t('pages.shop.custom.body')}
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
