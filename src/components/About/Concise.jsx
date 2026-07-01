// 本舍 · 精簡 — the distilled home.
// One idea per screen, few words, much air. Keeps the ink-wash identity and a
// single vertical-set (直排) title accent; one cinnabar per screen (Single Seal
// Rule). Prose lives in content.js; the long-form voice stays in the journal.
import { HERO, CREW } from './content.js';

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

const HERO_PRODUCT = '/images/products/海棠/01.png';

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
          <div style={{ maxWidth: 280, minWidth: 0, flexShrink: 1 }}>
            <div
              className="mono"
              style={{ color: 'var(--gold-3)', letterSpacing: 4, marginBottom: 18 }}
            >
              林口 · 手壓天然皂
            </div>
            <div
              className="tc"
              style={{ fontSize: 16, letterSpacing: 3, color: 'var(--gold-3)', lineHeight: 1.9 }}
            >
              {HERO.tagline}
            </div>
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

      {/* 3 · 十二花 — one product beat, one path forward. */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'center',
          gap: 'clamp(28px, 5vw, 72px)',
          maxWidth: 1120,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px) clamp(64px, 12vh, 120px)',
        }}
      >
        <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
          <Img src={HERO_PRODUCT} alt="金花樓手工皂 · 瓊崖海棠潤膚皂" />
        </div>
        <div>
          <h2
            className="tc"
            style={{
              fontSize: 'clamp(30px, 5vw, 48px)',
              fontWeight: 500,
              letterSpacing: 8,
              color: 'var(--sumi)',
              margin: '0 0 14px',
            }}
          >
            十二花
          </h2>
          <p
            className="tc"
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              letterSpacing: 1,
              color: 'var(--ink-60)',
              margin: '0 0 26px',
            }}
          >
            一月一方，一皂一花。
          </p>
          <button
            type="button"
            onClick={() => go('/products')}
            className="tc"
            style={{
              padding: '13px 28px',
              background: 'transparent',
              color: 'var(--sumi)',
              border: '1px solid var(--sumi)',
              fontSize: 14,
              letterSpacing: 4,
              cursor: 'pointer',
            }}
          >
            看十二花 →
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
