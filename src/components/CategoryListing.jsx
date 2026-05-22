// Category (TA cluster) listing — addressed by URL like
// /products/concern/sensitive. Filters PRODUCTS by `concerns` and renders
// the same ProductDetailCard as 02 十二花. Used as the landing page for
// Google Ads campaigns targeting specific audience clusters.
import { useEffect } from 'react';
import { PRODUCTS, CONCERNS } from '../data/products.js';
import { ProductDetailCard } from './Products.jsx';

export function CategoryListing({ slug, navigate }) {
  const concern = CONCERNS.find((c) => c.slug === slug);
  const products = concern ? PRODUCTS.filter((p) => p.concerns?.includes(slug)) : [];

  useEffect(() => {
    if (!concern) {
      document.title = '找不到分類 · 金花樓';
      return;
    }
    document.title = `${concern.zh} · 金花樓`;
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    const desc = `金花樓 · ${concern.zh} ── ${concern.desc}。${products.length} 款手工冷製皂、八週熟成。`;
    const prevDesc = meta.getAttribute('content');
    meta.setAttribute('content', desc);
    return () => {
      if (prevDesc != null) meta.setAttribute('content', prevDesc);
    };
  }, [concern, products.length]);

  if (!concern) {
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
          找不到這個分類
        </div>
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
          看十二款全部 ▸
        </button>
      </section>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '70px 44px 24px',
          textAlign: 'center',
        }}
      >
        <div
          className="mono"
          style={{ color: 'var(--red)', letterSpacing: 3, fontSize: 11 }}
        >
          按膚況分類
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: 12,
            margin: '14px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          {concern.zh}
        </h1>
        <div
          className="tc"
          style={{ fontSize: 16, color: 'var(--gold-3)', letterSpacing: 4 }}
        >
          {concern.desc}
        </div>
        <div
          className="tc"
          style={{
            marginTop: 16,
            fontSize: 13,
            color: 'var(--ink-60)',
            letterSpacing: 2,
          }}
        >
          {products.length} 款
        </div>
      </section>

      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '20px 44px 40px',
        }}
      >
        {products.length > 0 ? (
          products.map((p, i) => (
            <ProductDetailCard key={p.num} p={p} flip={i % 2 === 1} first={i === 0} />
          ))
        ) : (
          <div
            className="tc"
            style={{
              textAlign: 'center',
              padding: '60px 0',
              color: 'var(--ink-60)',
              fontSize: 15,
              letterSpacing: 1,
            }}
          >
            這個分類暫時沒有產品。
          </div>
        )}
      </section>

      <section
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '20px 44px 80px',
          textAlign: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => navigate && navigate('/?tab=products')}
          className="mono"
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: 'var(--sumi)',
            border: '1px solid var(--ink-15)',
            fontSize: 13,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
        >
          看十二款全部 ▸
        </button>
      </section>
    </div>
  );
}
