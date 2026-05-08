// 02 十二花 — full product catalogue. Each item is a detailed card with
// a photo, spec sheet, weight + price + add-to-cart, and a stable anchor
// id so About-page cards can deep-link to a specific product.
//
// Product data lives in src/data/products.js (shared with About/Mobile.jsx
// which renders a compact grid).
import { useEffect } from 'react';
import { Divider } from './GoldenFlower.jsx';
import { TierNotice } from './TierNotice.jsx';
import { PRODUCTS } from '../data/products.js';
import { ProductGallery } from './ProductGallery.jsx';
import { AddToCartButton } from './BuyButton.jsx';

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
          fontSize: 10,
          letterSpacing: 3,
          minWidth: 70,
        }}
      >
        {label}
      </dt>
      <dd
        className="tc"
        style={{
          margin: 0,
          fontSize: 14,
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

function ProductDetailCard({ p, flip, first }) {
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
        <ProductGallery photos={p.photos} alt={`${p.zh} · ${p.subtitle}`} ratio="4/5" />
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
          {p.series}系列 · {p.seriesNote}
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
          {p.zh}
        </h3>
        <div
          className="tc"
          style={{ fontSize: 17, color: 'var(--gold-3)', letterSpacing: 4 }}
        >
          {p.subtitle}
        </div>
        <Divider />
        <dl style={{ margin: '14px 0 0', display: 'grid', gap: 0 }}>
          <DetailRow label="適合膚質" value={p.skinType} />
          <DetailRow label="核心成分" value={p.coreIngredients} />
          <DetailRow label="原料特性" value={p.oilProfile} />
          <DetailRow label="洗感感受" value={p.washFeel} />
        </dl>
        <BuyBlock p={p} />
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────

export function Products() {
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
          十二花 · 本舍之皂
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
          本舍之皂
        </h1>
        <div
          className="tc"
          style={{
            fontSize: 18,
            color: 'var(--gold-3)',
            letterSpacing: 6,
          }}
        >
          一月一方 · 一皂一花
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
          十二款配方分作四個系列 ── 花神守護、花韻時節、花露淨髮餅、全能日常。
          每一塊皆冷製手壓、熟成四十二日，以未漂紙包裹，押上金花朱印。
        </div>
      </section>

      <TierNotice variant="static" />

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
          <ProductDetailCard key={p.num} p={p} flip={i % 2 === 1} first={i === 0} />
        ))}
      </section>
    </div>
  );
}
