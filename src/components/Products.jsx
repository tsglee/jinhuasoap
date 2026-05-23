// 02 十二花 — full product catalogue. Each item is a detailed card with
// a photo, spec sheet, weight + price + add-to-cart, and a stable anchor
// id so About-page cards can deep-link to a specific product.
//
// Product data lives in src/data/products.js (shared with About/Mobile.jsx
// which renders a compact grid).
import { useEffect } from 'react';
import { Divider } from './GoldenFlower.jsx';
import { TierNotice } from './TierNotice.jsx';
import { PRODUCTS, CONCERNS } from '../data/products.js';
import { ProductGallery, ProductHeroStatic } from './ProductGallery.jsx';
import { AddToCartButton } from './BuyButton.jsx';
import { useT, useLocaleVariant } from '../i18n/index.jsx';

// ── Sub-components ──────────────────────────────────────────────────────

function DetailRow({ label, value }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 18,
        alignItems: 'baseline',
        padding: '10px 0',
        borderBottom: '1px dotted var(--ink-15)',
      }}
    >
      <dt
        className="mono"
        style={{
          color: 'var(--gold-3)',
          fontSize: 12,
          letterSpacing: 2,
          minWidth: 70,
        }}
      >
        {label}
      </dt>
      <dd
        className="tc"
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.85,
          letterSpacing: 1,
          color: 'var(--sumi)',
        }}
      >
        {value}
      </dd>
    </div>
  );
}

function BuyBlock({ p }) {
  const priceDisplay = p.price > 0 ? `NT$ ${p.price}` : 'NT$ 待定';
  return (
    <div
      style={{
        marginTop: 28,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div>
        <span className="mono" style={{ color: 'var(--gold-3)', fontSize: 11, letterSpacing: 2 }}>
          {p.weight}
        </span>
        <span style={{ margin: '0 10px', color: 'var(--ink-15)' }}>·</span>
        <span
          className="italic"
          style={{ fontSize: 22, color: 'var(--red)', letterSpacing: 1 }}
        >
          {priceDisplay}
        </span>
      </div>
      <AddToCartButton p={p} />
    </div>
  );
}

// Exported so ProductDetail.jsx (single product page) and CategoryListing.jsx
// (concern-filtered listing) can render the same spec sheet card.
// `expandedGallery` — on the single-product page we replace the inline
// carousel with a static hero; the rest of the photos are surfaced as a
// thumbnail grid rendered separately below by ProductDetail.
export function ProductDetailCard({ p, flip, first, navigate, expandedGallery = false }) {
  const t = useT();
  const product = useLocaleVariant(p);
  const href = `/products/${p.slug}`;
  // Linkable only when called from list page (navigate is passed). On the
  // single-product page itself, ProductDetail doesn't pass navigate → title
  // stays as plain h3 (no point linking to yourself).
  const handleNav = navigate
    ? (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return; // open-in-new-tab
        e.preventDefault();
        navigate(href);
      }
    : undefined;
  return (
    <div
      id={`product-${p.num}`}
      className="gf-stack-md"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 60,
        alignItems: 'flex-start',
        padding: '60px 0',
        borderTop: first ? 'none' : '1px dashed var(--ink-15)',
        scrollMarginTop: 100,
      }}
    >
      <div style={{ order: flip ? 2 : 1, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: -14,
            border: '1px solid var(--gold-3)',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
        {expandedGallery ? (
          <ProductHeroStatic
            photos={p.photos}
            alt={`${product.zh} · ${product.subtitle}`}
            ratio="4/5"
          />
        ) : (
          <ProductGallery
            photos={p.photos}
            alt={`${product.zh} · ${product.subtitle}`}
            ratio="4/5"
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: -18,
            [flip ? 'right' : 'left']: -18,
            background: 'var(--red)',
            color: 'var(--gold-2)',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Noto Serif TC", serif',
            fontSize: p.num.length > 1 ? 16 : 24,
            fontWeight: 500,
            letterSpacing: p.num.length > 1 ? 0 : 2,
            border: '2px solid var(--gold-1)',
          }}
        >
          {p.num}
        </div>
      </div>
      <div style={{ order: flip ? 1 : 2 }}>
        <div className="mono" style={{ color: 'var(--red)', fontSize: 11, letterSpacing: 3 }}>
          {product.series} · {product.seriesNote}
        </div>
        <h3
          className="tc"
          style={{
            fontSize: 44,
            fontWeight: 500,
            letterSpacing: 6,
            margin: '12px 0 6px',
            color: 'var(--sumi)',
          }}
        >
          {navigate ? (
            <a
              href={href}
              onClick={handleNav}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 200ms ease, color 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--red)';
                e.currentTarget.style.borderBottomColor = 'var(--red)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              {product.zh}
            </a>
          ) : (
            product.zh
          )}
        </h3>
        <div
          className="tc"
          style={{ fontSize: 17, color: 'var(--gold-3)', letterSpacing: 4 }}
        >
          {product.subtitle}
        </div>
        <Divider />
        <dl style={{ margin: '14px 0 0', display: 'grid', gap: 0 }}>
          <DetailRow label={t('pages.products.detailLabels.skinType')} value={product.skinType} />
          <DetailRow label={t('pages.products.detailLabels.coreIngredients')} value={product.coreIngredients} />
          <DetailRow label={t('pages.products.detailLabels.oilProfile')} value={product.oilProfile} />
          <DetailRow label={t('pages.products.detailLabels.washFeel')} value={product.washFeel} />
          {p.batchDate && <DetailRow label={t('pages.products.detailLabels.batchDate')} value={p.batchDate} />}
        </dl>
        <BuyBlock p={p} />
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────

// TA cluster filter chips — rendered above the full product list, lets
// users (and ad-landing visitors) jump to a concern-filtered subset like
// /products/concern/sensitive.
function ClusterChips({ navigate }) {
  return (
    <section
      className="gf-pad-md"
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '24px 44px 0',
      }}
    >
      <div
        className="mono tc"
        style={{
          textAlign: 'center',
          color: 'var(--gold-3)',
          fontSize: 11,
          letterSpacing: 3,
          marginBottom: 14,
        }}
      >
        按膚況挑
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
        }}
      >
        {CONCERNS.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => navigate && navigate(`/products/concern/${c.slug}`)}
            className="tc"
            style={{
              padding: '8px 16px',
              background: 'transparent',
              color: 'var(--sumi)',
              border: '1px solid var(--ink-15)',
              fontSize: 13,
              letterSpacing: 2,
              cursor: 'pointer',
              fontFamily: '"Noto Serif TC", serif',
            }}
            title={c.desc}
          >
            {c.zh}
          </button>
        ))}
      </div>
    </section>
  );
}

export function Products({ navigate }) {
  const t = useT();
  // Deep-link from About: when an About card sets gf_jump_product in
  // sessionStorage and switches to this tab, scroll to that product.
  useEffect(() => {
    try {
      const target = sessionStorage.getItem('gf_jump_product');
      if (!target) return;
      sessionStorage.removeItem('gf_jump_product');
      const el = document.getElementById(`product-${target}`);
      if (!el) return;
      // Defer past App's `selectTab` window.scrollTo(0). 350 ms reliably
      // lands after the synchronous scroll-reset and React's commit.
      window.setTimeout(() => {
        el.scrollIntoView({ block: 'start', behavior: 'auto' });
      }, 350);
    } catch {
      // sessionStorage may be unavailable; ignore.
    }
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Page header */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '70px 44px 30px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          {t('pages.products.kicker')}
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 68,
            fontWeight: 500,
            letterSpacing: 14,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          {t('pages.products.title')}
        </h1>
        <div
          className="tc"
          style={{
            fontSize: 18,
            color: 'var(--gold-3)',
            letterSpacing: 6,
          }}
        >
          {t('pages.products.subtitle')}
        </div>
        <div
          className="tc"
          style={{
            maxWidth: 600,
            margin: '26px auto 0',
            fontSize: 16,
            lineHeight: 1.85,
            color: 'var(--sumi)',
          }}
        >
          {t('pages.products.description')}
        </div>
      </section>

      <TierNotice variant="static" />

      <ClusterChips navigate={navigate} />

      {/* 12 件連續陳列 — flip 全局交替（左右輪流） */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '40px 44px 20px',
        }}
      >
        {PRODUCTS.map((p, i) => (
          <ProductDetailCard
            key={p.num}
            p={p}
            flip={i % 2 === 1}
            first={i === 0}
            navigate={navigate}
          />
        ))}
      </section>
    </div>
  );
}
