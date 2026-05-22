// Single-product detail page — addressed by URL like /products/haitang-xiufu.
// Re-uses ProductDetailCard from Products.jsx so the spec sheet layout
// stays identical to 02 十二花 (just shown in isolation with a back link).
import { useEffect } from 'react';
import { PRODUCTS } from '../data/products.js';
import { ProductDetailCard } from './Products.jsx';

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
          看十二款全部 ▸
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
          ◂ 回十二款
        </button>
        <ProductDetailCard p={product} flip={false} first={true} />
      </section>
    </div>
  );
}
