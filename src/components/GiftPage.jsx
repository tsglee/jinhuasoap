// /gift — 禮盒頁：固定禮盒（可購）+ 節禮/婚禮/企業客製洽詢。
// 語氣是「包裝的故事」（未漂紙、紅蠟封緘、手寫小卡），不是促銷組合。
// 資料在 src/data/gifts.js：price 0 = 約訂中（不可加購）；photos 空 = 不出圖。
// ⚠ 老闆娘定價前記得先補 photos —— 加購時購物籃縮圖取 photos[0]。
import { useEffect } from 'react';
import { GIFT_SETS, GIFT_CUSTOM } from '../data/gifts.js';
import { AddToCartButton } from './BuyButton.jsx';

function Img({ src, alt }) {
  const base = src.replace(/\.(png|jpe?g|webp|avif)$/i, '');
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      {/* eager：整頁只有兩張圖，第一張就是 LCP —— lazy 在這裡沒有好處。 */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </picture>
  );
}

function GiftSetRow({ set, first }) {
  const hasPhoto = set.photos && set.photos.length > 0;
  const body = (
    <div>
      <div className="mono" style={{ color: 'var(--gold-3)', fontSize: 12, letterSpacing: 2 }}>
        № {set.num}
      </div>
      <h2
        className="tc"
        style={{
          fontSize: 'clamp(26px, 3.6vw, 34px)',
          fontWeight: 500,
          letterSpacing: 6,
          color: 'var(--sumi)',
          margin: '10px 0 12px',
        }}
      >
        {set.zh}
      </h2>
      <p
        className="tc"
        style={{
          fontSize: 15,
          lineHeight: 1.9,
          letterSpacing: 1,
          color: 'var(--ink-60)',
          margin: '0 0 18px',
          maxWidth: '30em',
        }}
      >
        {set.line}
      </p>
      <ul
        className="tc"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 22px',
          display: 'grid',
          gap: 6,
          fontSize: 14.5,
          letterSpacing: 1,
          color: 'var(--sumi)',
        }}
      >
        {set.contents.map((c) => (
          <li key={c}>· {c}</li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <span className="tc" style={{ fontSize: 17, letterSpacing: 1, color: 'var(--sumi)' }}>
          {set.price > 0 ? `NT$ ${set.price}` : '售價 · 約訂中'}
        </span>
        <AddToCartButton p={{ ...set, subtitle: set.lat }} size="sm" />
      </div>
    </div>
  );
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: hasPhoto ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
        gap: 'clamp(24px, 4vw, 56px)',
        alignItems: 'center',
        padding: '48px 0',
        borderTop: first ? 'none' : '1px dashed var(--ink-15)',
      }}
    >
      {hasPhoto && (
        <div className="gf-img-zoom" style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <Img src={set.photos[0]} alt={`${set.zh} · 金花樓禮盒`} />
        </div>
      )}
      {body}
    </div>
  );
}

export function GiftPage() {
  useEffect(() => {
    document.title = '禮盒 · 金花樓';
  }, []);
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* 頁首 */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px 30px',
          textAlign: 'center',
        }}
      >
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 60,
            fontWeight: 500,
            letterSpacing: 12,
            margin: '0 0 10px',
            color: 'var(--sumi)',
          }}
        >
          禮盒
        </h1>
        <div className="tc" style={{ fontSize: 16, letterSpacing: 3, color: 'var(--gold-3)' }}>
          未漂紙 · 紅蠟封緘 · 手寫小卡
        </div>
      </section>

      {/* 固定禮盒 */}
      <section
        className="gf-pad-md"
        style={{ maxWidth: 980, margin: '0 auto', padding: '10px 44px 40px' }}
      >
        {GIFT_SETS.map((set, i) => (
          <GiftSetRow key={set.num} set={set} first={i === 0} />
        ))}
      </section>

      {/* 客製洽詢 */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '30px 44px 100px',
          textAlign: 'center',
        }}
      >
        <div className="edu-block" style={{ textAlign: 'left' }}>
          <span className="edu-label">{GIFT_CUSTOM.title}</span>
          <p className="edu-note">{GIFT_CUSTOM.body}</p>
          <p className="edu-note" style={{ marginTop: 10 }}>
            {GIFT_CUSTOM.note}
          </p>
        </div>
        <a
          href="https://lin.ee/7m167md"
          target="_blank"
          rel="noopener noreferrer"
          className="tc gf-cta"
          style={{
            display: 'inline-block',
            marginTop: 30,
            padding: '13px 28px',
            background: 'transparent',
            color: 'var(--sumi)',
            border: '1px solid var(--sumi)',
            fontSize: 14,
            letterSpacing: 3,
          }}
        >
          LINE 洽詢客製 →
        </a>
      </section>
    </div>
  );
}
