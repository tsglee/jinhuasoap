// 本舍 · 精簡 — the distilled home.
// One idea per screen, few words, much air. Keeps the ink-wash identity and a
// single vertical-set (直排) title accent; one cinnabar per screen (Single Seal
// Rule). Prose lives in content.js; the long-form voice stays in the journal.
import { HERO, CREW } from './content.js';
import { PRODUCTS } from '../../data/products.js';
import { AddToCartButton } from '../BuyButton.jsx';
import { getCurrentTerm } from '../../data/solarTerms.js';

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

// Featured trio on the home: the current 節氣 bar leads, two signatures follow
// (deduped). If the term's num ever mismatches products.js, fall back to the
// three signatures — the beat degrades, never breaks.
const SIGNATURE_NUMS = ['壹', '參', '伍'];
function featuredForTerm(term) {
  const seasonal = term && PRODUCTS.find((p) => p.num === term.num);
  const signatures = SIGNATURE_NUMS.map((n) => PRODUCTS.find((p) => p.num === n)).filter(
    Boolean,
  );
  if (!seasonal) return signatures.slice(0, 3);
  return [seasonal, ...signatures.filter((p) => p.num !== seasonal.num).slice(0, 2)];
}

function leadLine(washFeel) {
  return washFeel ? washFeel.split(/[，；。]/)[0].trim() : '';
}

function FeaturedBar({ p, navigate, badge }) {
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
        className="gf-img-zoom"
        style={{ display: 'block', aspectRatio: '4 / 5', overflow: 'hidden' }}
      >
        <Img src={p.photos[0]} alt={`${p.zh} · ${p.subtitle}`} />
      </a>
      {badge && (
        <div className="mono" style={{ fontSize: 10, letterSpacing: 2, color: 'var(--gold-3)' }}>
          {badge}
        </div>
      )}
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
  const goProduct = (e, slug) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();
    navigate && navigate(`/products/${slug}`);
  };
  const term = getCurrentTerm();
  const featured = featuredForTerm(term);
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
          <div style={{ maxWidth: 372, minWidth: 0, flexShrink: 1 }}>
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
              {/* 詞組為單位換行 —— 窄幅時在頓號處斷、不把「四十二日」拆開 */}
              <span style={{ display: 'inline-block' }}>兩個人、</span>
              <span style={{ display: 'inline-block' }}>一口鍋、</span>
              <span style={{ display: 'inline-block' }}>四十二日。</span>
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
              冷製手壓、親膚天然 ── 洗得乾淨，留得溫柔。
            </p>
            <button
              type="button"
              onClick={() => go('/products')}
              className="tc gf-cta"
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

      {/* 十二花手卷 — all twelve soaps drift past like an unrolling handscroll.
          Ambient, not scroll-jacking: the page still scrolls vertically; the
          strip moves itself, pauses on hover, and turns swipeable under
          reduced-motion. Low detail on purpose — № + name, no prices. */}
      <section aria-label="十二花一覽" style={{ padding: 'clamp(40px, 7vh, 76px) 0 clamp(48px, 8vh, 88px)' }}>
        <div style={{ textAlign: 'center', padding: '0 28px', marginBottom: 'clamp(22px, 4vh, 38px)' }}>
          <div className="mono" style={{ color: 'var(--gold-3)', letterSpacing: 4, fontSize: 12 }}>
            本舍十二花　·　一覽
          </div>
        </div>
        <div className="gf-scroll-mask">
          <div className="gf-scroll-track">
            {[...PRODUCTS, ...PRODUCTS].map((p, i) => {
              const dup = i >= PRODUCTS.length;
              return (
                <a
                  key={i}
                  href={`/products/${p.slug}`}
                  onClick={(e) => goProduct(e, p.slug)}
                  className="gf-soap-tile"
                  aria-label={dup ? undefined : p.zh}
                  aria-hidden={dup ? 'true' : undefined}
                  tabIndex={dup ? -1 : undefined}
                >
                  <div className="gf-soap-img gf-img-zoom">
                    <Img src={p.photos[0]} alt={dup ? '' : p.zh} />
                  </div>
                  <div className="gf-soap-cap">
                    <div className="mono" style={{ fontSize: 11, letterSpacing: 2, color: 'var(--gold-3)' }}>
                      № {p.num}
                    </div>
                    <div className="tc" style={{ fontSize: 13, letterSpacing: 1, color: 'var(--sumi)', marginTop: 4, lineHeight: 1.4 }}>
                      {p.zh}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2 · Essence — the whole ethos in one line + one sentence. */}
      <section
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: 'clamp(48px, 9vh, 96px) 28px',
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
          林口的小小皂舍。一次一個配方，在架上慢慢陳化。
        </p>
      </section>

      {/* 3 · 本季精選 — the seasonal bar + two signatures, with real prices. */}
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
            本季精選
          </h2>
          <p className="tc" style={{ fontSize: 15, letterSpacing: 2, color: 'var(--gold-3)', margin: 0 }}>
            節氣 · {term.name} ── {term.line}
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(20px, 3vw, 40px)',
          }}
        >
          {featured.map((p, i) => (
            <FeaturedBar
              key={p.num}
              p={p}
              navigate={navigate}
              badge={i === 0 ? `節氣之皂 · ${term.name}` : undefined}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vh, 52px)' }}>
          <button
            type="button"
            onClick={() => go('/products')}
            className="tc gf-cta"
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
                  className="gf-img-zoom"
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

      {/* 5 · Close — a quiet line, the one seal-red CTA, then calm ways onward. */}
      <section
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: 'clamp(64px, 12vh, 120px) 28px',
          textAlign: 'center',
          display: 'grid',
          justifyItems: 'center',
          gap: 'clamp(24px, 4vh, 36px)',
        }}
      >
        <p
          className="tc"
          style={{
            fontSize: 'clamp(20px, 3vw, 26px)',
            fontWeight: 500,
            lineHeight: 1.7,
            letterSpacing: 2,
            color: 'var(--sumi)',
            margin: 0,
            maxWidth: '18em',
            textWrap: 'balance',
          }}
        >
          洗澡，是一天裡最誠實的幾分鐘。
        </p>
        <button
          type="button"
          onClick={() => go('/shop')}
          className="tc gf-cta-solid"
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
        <nav
          aria-label="更多"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(12px, 3vw, 22px)',
            marginTop: 4,
          }}
        >
          <a
            href="/products"
            onClick={(e) => { e.preventDefault(); go('/products'); }}
            className="gf-quiet-link tc"
            style={{ fontSize: 13.5, letterSpacing: 2, color: 'var(--ink-60)', textDecoration: 'none' }}
          >
            看十二花
          </a>
          <span aria-hidden="true" style={{ color: 'var(--ink-15)' }}>·</span>
          <a
            href="/journal"
            onClick={(e) => { e.preventDefault(); go('/journal'); }}
            className="gf-quiet-link tc"
            style={{ fontSize: 13.5, letterSpacing: 2, color: 'var(--ink-60)', textDecoration: 'none' }}
          >
            本舍小記
          </a>
          <span aria-hidden="true" style={{ color: 'var(--ink-15)' }}>·</span>
          <a
            href="https://www.instagram.com/jinhuasoap/"
            target="_blank"
            rel="noopener noreferrer"
            className="gf-quiet-link mono"
            style={{ fontSize: 12, letterSpacing: 2, color: 'var(--ink-60)', textDecoration: 'none' }}
          >
            @jinhuasoap
          </a>
        </nav>
      </section>
    </div>
  );
}
