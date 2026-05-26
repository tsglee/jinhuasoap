// Single-product detail page — addressed by URL like /products/haitang-biyu.
// Re-uses ProductDetailCard from Products.jsx so the spec sheet layout
// stays identical to 02 十二花 (just shown in isolation with a back link).
// Single-page-specific additions:
//   - 視角 gallery strip surfacing all photos at once (no carousel mode)
//   - 深度 section: 五力 radar + 適膚 chips + whyForYou prose + ritual line
import { useEffect } from 'react';
import { PRODUCTS, PRODUCT_DEPTH } from '../data/products.js';
import { ProductDetailCard } from './Products.jsx';
import { ProductGalleryGrid } from './ProductGallery.jsx';
import { RadarFive } from './RadarFive.jsx';

export function ProductDetail({ slug, navigate }) {
  const product = PRODUCTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) {
      document.title = '找不到產品 · 金花樓';
      return;
    }
    document.title = `${product.zh} · 金花樓`;
    // Inject a product-specific meta description for SEO + social shares.
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const desc = `${product.subtitle} — ${product.skinType} 金花樓林口手工皂、八週熟成、冷製。`;
    const prevDesc = meta.getAttribute('content');
    meta.setAttribute('content', desc);
    return () => {
      if (prevDesc != null) meta.setAttribute('content', prevDesc);
    };
  }, [product]);

  if (!product) {
    return (
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '120px 44px',
          textAlign: 'center',
        }}
      >
        <div
          className="mono"
          style={{ color: 'var(--red)', marginBottom: 24, letterSpacing: 2 }}
        >
          找不到這款皂
        </div>
        <p
          className="tc"
          style={{
            fontSize: 16,
            lineHeight: 1.85,
            letterSpacing: 1,
            color: 'var(--ink-60)',
            margin: '0 0 40px',
          }}
        >
          可能名字搬家了 ── 去十二款看看？
        </p>
        <button
          type="button"
          onClick={() => navigate && navigate('/?tab=products')}
          className="mono"
          style={{
            padding: '12px 24px',
            background: 'var(--red)',
            color: 'var(--gold-2)',
            border: '1px solid var(--gold-1)',
            fontSize: 13,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
        >
          看十二款全部 →
        </button>
      </section>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '70px 44px 60px',
        }}
      >
        <button
          type="button"
          onClick={() => navigate && navigate('/?tab=products')}
          className="mono"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--gold-3)',
            fontSize: 12,
            letterSpacing: 2,
            cursor: 'pointer',
            padding: 0,
            marginBottom: 24,
          }}
        >
          ← 回十二款
        </button>
        <ProductDetailCard p={product} flip={false} first={true} expandedGallery={true} />
      </section>
      <GalleryStripSection product={product} />
      <DepthSection product={product} />
    </div>
  );
}

function GalleryStripSection({ product }) {
  // Photos 2..N — the hero (photo 1) already shows in the card above; this
  // strip surfaces every other angle so visitors don't have to know there's
  // more inside a carousel.
  if (!product.photos || product.photos.length <= 1) return null;
  const alt = `${product.zh} · ${product.subtitle}`;
  return (
    <section
      className="gf-pad-md"
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '10px 44px 70px',
      }}
    >
      <div
        className="mono"
        style={{
          color: 'var(--gold-3)',
          fontSize: 11,
          letterSpacing: 3,
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        視角 · GALLERY
      </div>
      <ProductGalleryGrid
        allPhotos={product.photos}
        alt={alt}
        startIndex={1}
        ratio="1/1"
      />
    </section>
  );
}

function DepthSection({ product }) {
  const depth = PRODUCT_DEPTH[product.slug];
  if (!depth) return null; // Owner hasn't filled this product yet.
  return (
    <section
      className="gf-pad-md"
      style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: '20px 44px 100px',
        borderTop: '1px solid var(--ink-08)',
      }}
    >
      <FiveAxisRow axes={depth.fiveAxis} washFeel={product.washFeel} />
      <SkinTypeRow
        chips={depth.skinTypeChips}
        whyForYou={depth.whyForYou}
        ritual={depth.ritual}
      />
    </section>
  );
}

function FiveAxisRow({ axes, washFeel }) {
  return (
    <div
      className="gf-stack-md"
      style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: 64,
        alignItems: 'center',
        padding: '60px 0 50px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <RadarFive axes={axes} size={320} />
      </div>
      <div>
        <div
          className="mono"
          style={{
            color: 'var(--gold-3)',
            fontSize: 12,
            letterSpacing: 3,
            marginBottom: 16,
          }}
        >
          洗感 · WASH PROFILE
        </div>
        <p
          className="tc"
          style={{
            fontFamily: '"Cormorant Garamond", "Noto Serif TC", serif',
            fontStyle: 'italic',
            fontSize: 24,
            lineHeight: 1.85,
            color: 'var(--sumi)',
            margin: 0,
            maxWidth: '36ch',
          }}
        >
          「{washFeel}」
        </p>
      </div>
    </div>
  );
}

function SkinTypeRow({ chips, whyForYou, ritual }) {
  return (
    <div
      style={{
        padding: '60px 0 0',
        borderTop: '1px solid var(--ink-08)',
        marginTop: 20,
        textAlign: 'center',
      }}
    >
      <div
        className="tc"
        style={{
          color: 'var(--gold-3)',
          fontSize: 14,
          letterSpacing: 4,
          marginBottom: 28,
        }}
      >
        適合什麼樣的肌膚
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: '14px 24px',
          marginBottom: 36,
        }}
      >
        {chips.map((chip, i) => (
          <span
            key={chip}
            style={{ display: 'inline-flex', alignItems: 'baseline', gap: 24 }}
          >
            <span
              className="tc"
              style={{
                fontSize: 28,
                letterSpacing: 4,
                color: 'var(--sumi)',
                fontWeight: 400,
              }}
            >
              {chip}
            </span>
            {i < chips.length - 1 && (
              <span
                className="mono"
                style={{ color: 'var(--ink-40)', fontSize: 14 }}
              >
                ·
              </span>
            )}
          </span>
        ))}
      </div>
      {whyForYou && (
        <p
          className="tc"
          style={{
            fontSize: 16,
            lineHeight: 2.05,
            letterSpacing: 1.5,
            color: 'var(--sumi)',
            margin: '0 auto 32px',
            maxWidth: 560,
            textAlign: 'left',
          }}
        >
          {whyForYou}
        </p>
      )}
      <div
        className="tc"
        style={{
          color: 'var(--gold-3)',
          fontSize: 14,
          letterSpacing: 4,
          margin: '24px 0 14px',
        }}
      >
        建議使用方式
      </div>
      <p
        className="tc"
        style={{
          fontSize: 15,
          lineHeight: 1.85,
          letterSpacing: 1,
          color: 'var(--ink-60)',
          margin: 0,
        }}
      >
        {ritual}
      </p>
    </div>
  );
}
