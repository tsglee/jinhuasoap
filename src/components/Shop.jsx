// Shop tab — product catalogue + wholesale section.
// 結帳流程已搬到 /cart（Cart.jsx）。
import { PRODUCTS } from '../data/products.js';
import { TESTIMONIALS } from '../data/testimonials.js';
import { ProductHeroStatic } from './ProductGallery.jsx';
import { TierNotice } from './TierNotice.jsx';
import { AddToCartButton } from './BuyButton.jsx';
import { useT, useLocaleVariant } from '../i18n/index.jsx';
import { useState } from 'react';
import { useCart } from '../state/CartContext.jsx';
import { readLastOrder, reorderToCart } from '../utils/reorder.js';

function leadLine(washFeel) {
  if (!washFeel) return '';
  const first = washFeel.split(/[，；。]/)[0].trim();
  return first;
}

function CatalogCard({ p, onJumpToCart, navigate }) {
  const product = useLocaleVariant(p);
  const priceDisplay = p.price > 0 ? `NT$ ${p.price}` : 'NT$ —';
  const detailHref = p.slug ? `/products/${p.slug}` : null;
  const onTitleClick = (e) => {
    if (!detailHref || !navigate) return;
    // Allow cmd/ctrl-click + middle-click to open in a new tab (browser default).
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();
    navigate(detailHref);
  };
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
      <ProductHeroStatic photos={p.photos} alt={`${product.zh} · ${product.subtitle}`} ratio="1/1" />

      <div className="mono" style={{ color: 'var(--gold-3)', fontSize: 12, letterSpacing: 1.5 }}>
        № {p.num}
      </div>
      {detailHref ? (
        <a
          href={detailHref}
          onClick={onTitleClick}
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
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
        </a>
      ) : (
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
      )}
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

function ProductCatalog({ onAdded, navigate }) {
  // Group the twelve bars by series so the shelf reads as a curated apothecary,
  // not one flat run of identical cards. Order follows first appearance.
  const order = [];
  const groups = new Map();
  for (const p of PRODUCTS) {
    if (!groups.has(p.series)) {
      groups.set(p.series, []);
      order.push(p.series);
    }
    groups.get(p.series).push(p);
  }
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      {order.map((series) => (
        <section key={series} className="gf-pad-md" style={{ padding: '8px 44px 40px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 14,
              margin: '0 0 22px',
              paddingBottom: 10,
              borderBottom: '1px solid var(--ink-15)',
            }}
          >
            <h2
              className="tc"
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 6,
                color: 'var(--sumi)',
                margin: 0,
              }}
            >
              {series}
            </h2>
            <span className="mono" style={{ color: 'var(--gold-3)', fontSize: 11, letterSpacing: 1.5 }}>
              {groups.get(series).length} 款
            </span>
          </div>
          <div className="gf-catalog-grid">
            {groups.get(series).map((p) => (
              <CatalogCard key={p.num} p={p} onJumpToCart={onAdded} navigate={navigate} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// Returning-buyer fast path: if a past order is stashed in localStorage, offer
// a one-tap re-add. No accounts — serves the self-care regular who reorders.
function LastOrderRow({ navigate }) {
  const { add } = useCart();
  const [last] = useState(readLastOrder);
  if (!last) return null;
  const names = last.lines.map((l) => l.zh).filter(Boolean);
  if (!names.length) return null;
  const preview =
    names.slice(0, 3).join('、') + (names.length > 3 ? ` 等 ${names.length} 款` : '');
  return (
    <section className="gf-pad-md" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 44px 8px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          padding: '14px 18px',
          background: 'var(--paper-2)',
          border: '1px solid var(--ink-15)',
        }}
      >
        <div>
          <div className="mono" style={{ color: 'var(--gold-3)', fontSize: 11, letterSpacing: 2 }}>
            上次買的
          </div>
          <div className="tc" style={{ color: 'var(--sumi)', fontSize: 15, letterSpacing: 1, marginTop: 4 }}>
            {preview}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            reorderToCart(add, last.lines);
            if (navigate) navigate('/cart');
          }}
          className="tc gf-cta"
          style={{
            padding: '10px 18px',
            background: 'transparent',
            color: 'var(--sumi)',
            border: '1px solid var(--sumi)',
            fontSize: 13,
            letterSpacing: 3,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          再買一次 →
        </button>
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
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: 14,
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

      {/* 滿額規則唯一的靜態落點（全站紅 banner 已移除）——放在買皂決策發生的頁。 */}
      <TierNotice variant="static" />

      <LastOrderRow navigate={navigate} />

      {/* Add-to-cart stays on the page (✓ flash + header badge), consistent
          with 02 十二花 — lets a returning regular build a basket of 2–3 bars
          without being yanked to /cart each time. */}
      <ProductCatalog navigate={navigate} />

      {/* 客戶心得 — 三則靜置引文（不轉動）。資料維護於 src/data/testimonials.js，
          換前三筆的順序即可換展示的心得。 */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '60px 44px 80px',
        }}
      >
        <h2
          className="tc gf-h2-md"
          style={{
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: 8,
            margin: '0 0 40px',
            color: 'var(--sumi)',
            textAlign: 'center',
          }}
        >
          {t('pages.shop.testimonials.title')}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
          }}
        >
          {TESTIMONIALS.slice(0, 3).map((q) => (
            <figure
              key={q.id}
              style={{
                margin: 0,
                paddingTop: 16,
                borderTop: '1px dotted var(--gold-3)',
              }}
            >
              <blockquote
                className="tc"
                style={{
                  margin: '0 0 14px',
                  fontSize: 15,
                  lineHeight: 1.9,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                }}
              >
                {q.quote}
              </blockquote>
              <figcaption
                className="mono"
                style={{ fontSize: 11, letterSpacing: 2, color: 'var(--gold-3)' }}
              >
                {q.name} · {q.tag}
              </figcaption>
            </figure>
          ))}
        </div>
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
