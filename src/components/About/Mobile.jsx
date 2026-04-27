// Mobile-first About — 4 essential sections, single-column vertical
// scroll. Keeps the brand poetry (hero), the three pillars, the founders,
// and a CTA into the product catalogue. Long-form / decorative sections
// from Desktop.jsx (manifesto, water interlude, 五皂五境) are intentionally
// omitted — those overlap with the 02 十二花 catalogue or are decorative.
import { Divider } from '../GoldenFlower.jsx';
import { HERO, PILLARS, CREW } from './content.js';

function HeroPhoto() {
  return (
    <picture>
      <source type="image/avif" srcSet="/images/landingmedia/hero-poster.avif" />
      <source type="image/webp" srcSet={HERO.poster} />
      <img
        src={HERO.poster}
        alt="金花樓 · 山居水墨"
        decoding="async"
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </picture>
  );
}

function PillarPhoto({ src, alt }) {
  const base = src.replace(/\.(png|jpe?g)$/i, '');
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={`${base}.webp`}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </picture>
  );
}

export function AboutMobile({ setTab }) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* 1 · Hero — poster image (no video on mobile to save bandwidth + LCP) */}
      <section aria-label="金花樓 · 序幕">
        <HeroPhoto />
        <div style={{ padding: '32px 24px 40px', background: 'var(--paper)' }}>
          <div
            className="mono"
            style={{ color: 'var(--red)', fontSize: 11, letterSpacing: 4 }}
          >
            {HERO.micro}
          </div>
          <h1
            className="tc"
            style={{
              fontSize: 52,
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: 4,
              margin: '14px 0 0',
              color: 'var(--sumi)',
            }}
          >
            {HERO.titleLines.map((line, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  color:
                    i === HERO.titleAccentIndex ? 'var(--red)' : 'inherit',
                }}
              >
                {line}
              </span>
            ))}
          </h1>
          <div
            className="tc"
            style={{
              marginTop: 18,
              fontSize: 16,
              lineHeight: 1.6,
              letterSpacing: 3,
              color: 'var(--gold-3)',
            }}
          >
            {HERO.tagline}
          </div>
          <p
            className="tc"
            style={{
              marginTop: 18,
              fontSize: 15,
              lineHeight: 1.85,
              letterSpacing: 1,
              color: 'var(--sumi)',
            }}
          >
            {HERO.intro}
          </p>
        </div>
      </section>

      {/* 2 · 三大支柱 — vertical stack */}
      <section
        style={{
          padding: '50px 24px 40px',
          background: 'rgba(244,236,215,0.5)',
          borderTop: '1px solid var(--ink-15)',
          borderBottom: '1px solid var(--ink-15)',
        }}
      >
        <div
          className="mono"
          style={{
            color: 'var(--red)',
            fontSize: 11,
            letterSpacing: 4,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          本舍三事
        </div>
        <div
          style={{
            display: 'grid',
            gap: 44,
          }}
        >
          {PILLARS.map((p) => (
            <div key={p.zh}>
              <div
                style={{
                  width: '70%',
                  margin: '0 auto 22px',
                }}
              >
                <PillarPhoto src={p.photo} alt={p.zh} />
              </div>
              <div
                className="tc"
                style={{
                  fontSize: 38,
                  fontWeight: 300,
                  letterSpacing: 8,
                  color: 'var(--red)',
                  textAlign: 'center',
                }}
              >
                {p.zh}
              </div>
              <Divider />
              <p
                className="tc"
                style={{
                  marginTop: 14,
                  fontSize: 15,
                  lineHeight: 1.85,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                  textAlign: 'center',
                  maxWidth: 320,
                  margin: '14px auto 0',
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · 我們二人 — couple bios, stacked */}
      <section style={{ padding: '60px 24px 50px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            className="mono"
            style={{ color: 'var(--red)', fontSize: 11, letterSpacing: 4 }}
          >
            {CREW.micro}
          </div>
          <h2
            className="tc"
            style={{
              fontSize: 42,
              fontWeight: 400,
              letterSpacing: 10,
              margin: '12px 0 6px',
              color: 'var(--sumi)',
            }}
          >
            {CREW.title}
          </h2>
          <div
            className="tc"
            style={{ fontSize: 14, color: 'var(--gold-3)', letterSpacing: 4 }}
          >
            {CREW.subtitle}
          </div>
          <p
            className="tc"
            style={{
              maxWidth: 360,
              margin: '18px auto 0',
              fontSize: 14,
              lineHeight: 1.85,
              color: 'var(--ink-60)',
              letterSpacing: 1,
            }}
          >
            {CREW.intro}
          </p>
        </div>
        <div style={{ display: 'grid', gap: 28 }}>
          {CREW.members.map((m) => (
            <div
              key={m.roleZh}
              style={{
                padding: '26px 22px',
                background: 'var(--paper)',
                border: '1px solid var(--ink-15)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: 18,
                  background: 'var(--sumi)',
                  color: 'var(--gold-2)',
                  padding: '5px 10px',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 9,
                  letterSpacing: 2,
                }}
              >
                {m.roleMono}
              </div>
              <div
                className="tc"
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: 4,
                  color: 'var(--sumi)',
                  marginTop: 6,
                }}
              >
                {m.roleZh}
              </div>
              <p
                className="tc"
                style={{
                  marginTop: 14,
                  fontSize: 14.5,
                  lineHeight: 1.9,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                }}
              >
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 · CTA → 02 十二花 */}
      <section
        style={{
          padding: '50px 24px 70px',
          background: 'var(--sumi)',
          color: 'var(--paper)',
          textAlign: 'center',
        }}
      >
        <div
          className="mono"
          style={{
            color: 'var(--gold-2)',
            fontSize: 11,
            letterSpacing: 4,
            marginBottom: 14,
          }}
        >
          看看本舍的皂
        </div>
        <h2
          className="tc"
          style={{
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: 8,
            margin: '0 0 22px',
            color: 'var(--paper)',
          }}
        >
          十二款，一款一境
        </h2>
        <p
          className="tc"
          style={{
            fontSize: 14.5,
            lineHeight: 1.85,
            letterSpacing: 1,
            color: 'rgba(248,245,235,0.8)',
            maxWidth: 320,
            margin: '0 auto 28px',
          }}
        >
          每一塊都從一個季節、一個材料、一段日常出發。慢慢看，挑你最對得上的。
        </p>
        <button
          type="button"
          onClick={() => setTab && setTab('products')}
          className="tc"
          style={{
            display: 'inline-block',
            padding: '14px 30px',
            background: 'var(--gold-1)',
            color: 'var(--sumi)',
            border: '1px solid var(--gold-1)',
            fontFamily: '"Noto Serif TC", serif',
            fontSize: 15,
            letterSpacing: 4,
            cursor: 'pointer',
          }}
        >
          看看 12 款皂  ▸
        </button>
      </section>
    </div>
  );
}
