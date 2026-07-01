// 本舍 · 精簡 — the distilled home.
// One idea per screen, few words, much air. Keeps the ink-wash identity and a
// single vertical-set (直排) title accent; one cinnabar per screen (Single Seal
// Rule). Prose lives in content.js; the long-form voice stays in the journal.
import { HERO, CREW } from './content.js';
import { PRODUCTS } from '../../data/products.js';
import { AddToCartButton } from '../BuyButton.jsx';

function Img({ src, alt, eager }) {
  const base = src.replace(/\.(png|jpe?g|webp|avif)$/i, '');
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </picture>
  );
}

// Three signature bars to feature on the home — real photos + a shopping entry.
const FEATURED = PRODUCTS.filter((p) => ['壹', '參', '伍'].includes(p.num));

function leadLine(washFeel) {
  return washFeel ? washFeel.split(/[，；。]/)[0].trim() : '';
}

function FeaturedBar({ p, navigate }) {
  const href = p.slug ? `/products/${p.slug}` : null;
  const onName = (e) => {
    if (!href || !navigate || e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <a
        href={href || undefined}
        onClick={onName}
        aria-label={p.zh}
        style={{ display: 'block', aspectRatio: '4 / 5', overflow: 'hidden' }}
      >
        <Img src={p.photos[0]} alt={`${p.zh} · ${p.subtitle}`} />
      </a>
      <a href={href || undefined} onClick={onName} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="tc" style={{ fontSize: 18, letterSpacing: 3, color: 'var(--sumi)', lineHeight: 1.3 }}>
          {p.zh}
        </div>
      </a>
      <p
        className="tc"
        style={{
          fontSize: 13,
          letterSpacing: 1,
          color: 'var(--ink-60)',
          lineHeight: 1.7,
          margin: 0,
          minHeight: '2.7em',
        }}
      >
        {leadLine(p.washFeel)}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          marginTop: 'auto',
          paddingTop: 10,
          borderTop: '1px dotted var(--ink-15)',
        }}
      >
        <div>
          <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--gold-3)' }}>
            {p.weight}
          </span>
          <div className="tc" style={{ fontSize: 17, letterSpacing: 1, color: 'var(--sumi)' }}>
            NT$ {p.price}
          </div>
        </div>
        <AddToCartButton p={p} size="sm" />
      </div>
    </article>
  );
}

export function ConciseHome({ navigate }) {
  const go = (path) => navigate && navigate(path);
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* 1 · Hero — the ink-wash mood + one vertical-set title. */}
      <section
        aria-label="金花樓 · 序"
        style={{ position: 'relative', minHeight: 'min(88svh, 760px)', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <Img src={HERO.poster} alt="金花樓 · 山居水墨" eager />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(248,245,235,0.94) 0%, rgba(248,245,235,0.58) 34%, rgba(248,245,235,0) 66%)',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            minHeight: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 4vw, 56px)',
            padding: 'clamp(80px, 12vh, 140px) clamp(26px, 7vw, 120px) clamp(60px, 8vh, 100px)',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <div style={{ maxWidth: 320, minWidth: 0, flexShrink: 1 }}>
            <div
              className="mono"
              style={{ color: 'var(--gold-3)', letterSpacing: 4, marginBottom: 18 }}
            >
              林口 · 手壓天然皂
            </div>
            <p
              className="tc"
              style={{
                fontSize: 'clamp(19px, 2.4vw, 23px)',
                fontWeight: 500,
                letterSpacing: 2,
                lineHeight: 1.6,
                color: 'var(--sumi)',
                margin: '0 0 14px',
              }}
            >
              洗得乾淨，留得溫柔。
            </p>
            <p
              className="tc"
              style={{
                fontSize: 14,
                letterSpacing: 1,
                lineHeight: 1.9,
                color: 'var(--ink-60)',
                margin: '0 0 26px',
              }}
            >
              冷製手壓 · 四十二日熟成 · 只用親膚的天然材料。
            </p>
            <button
              type="button"
              onClick={() => go('/products')}
              className="tc"
              style={{
                padding: '12px 26px',
                background: 'transparent',
                color: 'var(--sumi)',
                border: '1px solid var(--sumi)',
                fontSize: 14,
                letterSpacing: 3,
                cursor: 'pointer',
              }}
            >
              看十二花 →
            </button>
          </div>
          <h1
            className="tc"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: 'clamp(40px, 8vh, 66px)',
              fontWeight: 500,
              letterSpacing: '0.12em',
              lineHeight: 1.06,
              margin: 0,
              color: 'var(--sumi)',
              flexShrink: 0,
            }}
          >
            山中一盞<span style={{ color: 'var(--red)' }}>金花</span>
          </h1>
        </div>
      </section>

      {/* 2 · Essence — the whole ethos in one line + one sentence. */}
      <section
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: 'clamp(64px, 12vh, 120px) 28px',
          textAlign: 'center',
        }}
      >
        <div
          className="tc"
          style={{
            fontSize: 'clamp(20px, 3.4vw, 28px)',
            letterSpacing: 'clamp(6px, 1.4vw, 12px)',
            color: 'var(--sumi)',
            fontWeight: 500,
          }}
        >
          純手工　·　天然　·　慢製
        </div>
        <p
          className="tc"
          style={{
            marginTop: 26,
            fontSize: 16,
            lineHeight: 2,
            letterSpacing: 1,
            color: 'var(--ink-60)',
            maxWidth: 520,
            marginInline: 'auto',
          }}
        >
          林口的小小皂舍。一次一個配方，一批四十二日，慢慢陳化。
        </p>
      </section>

      {/* 3 · 十二花 · 精選 — three signature bars: real product, real prices. */}
      <section
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: 'clamp(56px, 10vh, 100px) clamp(24px, 5vw, 64px) clamp(64px, 12vh, 120px)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vh, 56px)' }}>
          <h2
            className="tc"
            style={{
              fontSize: 'clamp(28px, 4.4vw, 42px)',
              fontWeight: 500,
              letterSpacing: 8,
              color: 'var(--sumi)',
              margin: '0 0 10px',
            }}
          >
            十二花
          </h2>
          <p className="tc" style={{ fontSize: 15, letterSpacing: 2, color: 'var(--gold-3)', margin: 0 }}>
            一月一方，一皂一花 —— 先從這三款開始。
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(20px, 3vw, 40px)',
          }}
        >
          {FEATURED.map((p) => (
            <FeaturedBar key={p.num} p={p} navigate={navigate} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vh, 52px)' }}>
          <button
            type="button"
            onClick={() => go('/products')}
            className="tc"
            style={{
              padding: '13px 30px',
              background: 'transparent',
              color: 'var(--sumi)',
              border: '1px solid var(--sumi)',
              fontSize: 14,
              letterSpacing: 4,
              cursor: 'pointer',
            }}
          >
            看全部十二花 →
          </button>
        </div>
      </section>

      {/* 4 · 我們二人 — trust, said once. */}
      <section
        style={{
          background: 'rgba(244,236,215,0.5)',
          borderTop: '1px solid var(--ink-15)',
          borderBottom: '1px solid var(--ink-15)',
          padding: 'clamp(64px, 12vh, 110px) 28px',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2
            className="tc"
            style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 500,
              letterSpacing: 8,
              color: 'var(--sumi)',
              margin: '0 0 12px',
            }}
          >
            我們二人
          </h2>
          <p
            className="tc"
            style={{
              fontSize: 15.5,
              lineHeight: 1.9,
              letterSpacing: 1,
              color: 'var(--ink-60)',
              maxWidth: 460,
              margin: '0 auto clamp(36px, 6vh, 56px)',
            }}
          >
            一位守著配方與鍋前，一位守著文字與頁面。
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'clamp(20px, 3vw, 44px)',
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            {CREW.members.map((m) => (
              <figure key={m.roleZh} style={{ margin: 0 }}>
                <div
                  style={{ aspectRatio: '4 / 3', overflow: 'hidden', border: '1px solid var(--ink-15)' }}
                >
                  <Img src={m.photo} alt={m.photoAlt} />
                </div>
                <figcaption
                  className="tc"
                  style={{ fontSize: 15, letterSpacing: 2, color: 'var(--sumi)', marginTop: 12 }}
                >
                  {m.roleZh}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Close — one quiet line, one seal-red CTA. */}
      <section
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: 'clamp(64px, 12vh, 120px) 28px',
          textAlign: 'center',
          display: 'grid',
          justifyItems: 'center',
          gap: 24,
        }}
      >
        <div className="mono" style={{ color: 'var(--gold-3)', letterSpacing: 3 }}>
          每週四出貨 · 紅蠟封緘
        </div>
        <button
          type="button"
          onClick={() => go('/shop')}
          className="tc"
          style={{
            padding: '14px 34px',
            background: 'var(--red)',
            color: 'var(--paper)',
            border: 'none',
            fontSize: 15,
            letterSpacing: 6,
            cursor: 'pointer',
          }}
        >
          購皂
        </button>
      </section>
    </div>
  );
}
