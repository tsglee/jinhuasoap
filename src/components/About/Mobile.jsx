// Mobile-first About — 4 essential sections, single-column vertical
// scroll. Hero is a full-bleed image with title overlaid; the bottom
// section shows the 12 products inline (tap to deep-link to 02 十二花).
import { Divider } from '../GoldenFlower.jsx';
import { HERO, PILLARS, CREW } from './content.js';
import { PRODUCTS } from '../../data/products.js';

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

function ProductCardPhoto({ src, alt }) {
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
          aspectRatio: '4 / 5',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </picture>
  );
}

export function AboutMobile({ setTab }) {
  const goToProduct = (num) => {
    if (!setTab) return;
    try {
      sessionStorage.setItem('gf_jump_product', num);
    } catch {
      /* sessionStorage may be unavailable; tab switch still happens */
    }
    setTab('products');
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* 1 · Hero — full-bleed image, title overlaid bottom-left.
          aspect 3/4 gives ~500px tall at 375 wide — enough for a centred
          ink-wash scene with breathing room above the text block. */}
      <section
        aria-label="金花樓 · 序幕"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <picture>
          <source type="image/avif" srcSet="/images/landingmedia/hero-poster.avif" />
          <source type="image/webp" srcSet={HERO.poster} />
          <img
            src={HERO.poster}
            alt="金花樓 · 山居水墨"
            decoding="async"
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              objectPosition: '78% center',
              display: 'block',
            }}
          />
        </picture>
        {/* Soft fade at the bottom so the overlay text reads cleanly even
            against the busy cobblestone area of the illustration. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '40% 0 0',
            background:
              'linear-gradient(180deg, rgba(248,245,235,0) 0%, rgba(248,245,235,0.65) 60%, rgba(248,245,235,0.92) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 28,
          }}
        >
          <h1
            className="tc"
            style={{
              fontSize: 52,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: 4,
              margin: '12px 0 0',
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
              marginTop: 14,
              fontSize: 15,
              lineHeight: 1.5,
              letterSpacing: 3,
              color: 'var(--gold-3)',
            }}
          >
            {HERO.tagline}
          </div>
        </div>
      </section>

      {/* Brand intro — small typographic section right after the hero */}
      <section style={{ padding: '28px 24px 36px' }}>
        <p
          className="tc"
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.85,
            letterSpacing: 1,
            color: 'var(--sumi)',
          }}
        >
          {HERO.intro}
        </p>
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
        <div style={{ display: 'grid', gap: 44 }}>
          {PILLARS.map((p) => (
            <div key={p.zh}>
              <div style={{ width: '70%', margin: '0 auto 22px' }}>
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

      {/* 3 · 我們二人 — couple bios stacked */}
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
              {m.photo && (
                <div
                  style={{
                    margin: '12px auto 14px',
                    width: 160,
                    aspectRatio: '1 / 1',
                  }}
                >
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={m.photo.replace(/\.(png|jpe?g)$/i, '.avif')}
                    />
                    <source
                      type="image/webp"
                      srcSet={m.photo.replace(/\.(png|jpe?g)$/i, '.webp')}
                    />
                    <img
                      src={m.photo}
                      alt={m.photoAlt || m.roleZh}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </picture>
                </div>
              )}
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

      {/* 4 · 十二款皂 — inline grid (replaces CTA button). Tap a card to
          jump straight to that product on 02 十二花. */}
      <section
        style={{
          padding: '50px 18px 70px',
          borderTop: '1px solid var(--ink-15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28, padding: '0 6px' }}>
          <div
            className="mono"
            style={{ color: 'var(--red)', fontSize: 11, letterSpacing: 4 }}
          >
            十二花
          </div>
          <h2
            className="tc"
            style={{
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: 8,
              margin: '12px 0 8px',
              color: 'var(--sumi)',
            }}
          >
            十二款，一款一境
          </h2>
          <p
            className="tc"
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              letterSpacing: 1,
              color: 'var(--ink-60)',
              maxWidth: 320,
              margin: '0 auto',
            }}
          >
            每一塊都從一個季節、一個材料、一段日常出發。點開看細節。
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
          }}
        >
          {PRODUCTS.map((p) => (
            <button
              key={p.num}
              type="button"
              onClick={() => goToProduct(p.num)}
              aria-label={`查看 ${p.zh} 詳情`}
              style={{
                display: 'block',
                textAlign: 'left',
                padding: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <ProductCardPhoto src={p.photos[0]} alt={p.zh} />
              <div
                className="mono"
                style={{
                  marginTop: 8,
                  color: 'var(--gold-3)',
                  fontSize: 9,
                  letterSpacing: 2,
                }}
              >
                № {p.num}
              </div>
              <div
                className="tc"
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  letterSpacing: 2,
                  color: 'var(--sumi)',
                  lineHeight: 1.4,
                }}
              >
                {p.zh}
              </div>
              <div
                className="italic"
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  color: 'var(--red)',
                }}
              >
                {p.price > 0 ? `NT$${p.price}` : 'NT$ 待定'}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
