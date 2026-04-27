// About tab — Desktop variant. Brand story, heritage, philosophy, founders.
// Mobile lives in ./Mobile.jsx; ./index.jsx picks one based on viewport.
import { Divider, PhotoPlaceholder } from '../GoldenFlower.jsx';
import { IllSoap } from '../Illustrations.jsx';
import { HERO, PILLARS, CREW } from './content.js';

// Resolves a `*.png` path to its AVIF/WebP siblings (produced by
// scripts/optimize-images.js). The original PNG is no longer requested —
// AVIF/WebP coverage is universal in target browsers.
function SoapPhoto({ src, alt, ratio = '4/5' }) {
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
          aspectRatio: ratio,
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </picture>
  );
}

export function AboutDesktop({ setTab }) {
  // Deep-link from About product card → Products tab + scroll to that product.
  // sessionStorage hand-off keeps URL clean; Products.jsx reads + clears it.
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
      {/* Hero video banner — full-bleed, autoplay muted loop */}
      <section
        aria-label="金花樓 · 手壓皂 · 序幕"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          aspectRatio: '1280 / 540',
          overflow: 'hidden',
          background: 'var(--paper)',
        }}
      >
        <video
          src={HERO.videoSrc}
          poster={HERO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="水墨山居 · 手壓皂的動態影像"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Editorial overlay — the whole 本舍小記 lives on the hero ink-wash */}
        <div
          className="gf-hero-overlay-md"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 'clamp(40px, 12vw, 180px)',
            width: 'min(52%, 600px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '4vh 2vw',
            color: 'var(--sumi)',
            pointerEvents: 'none',
          }}
        >
          <div
            className="mono"
            style={{
              color: 'var(--red)',
              fontSize: 11,
              letterSpacing: 4,
              marginBottom: 18,
            }}
          >
            {HERO.micro}
          </div>
          <h1
            className="tc"
            style={{
              fontSize: 'clamp(38px, 5.4vw, 72px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: 'clamp(2px, 0.4vw, 4px)',
              margin: 0,
              color: 'var(--sumi)',
              textShadow: '0 1px 0 rgba(248,245,235,0.5)',
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
              marginTop: 'clamp(14px, 2vh, 28px)',
              fontSize: 'clamp(14px, 1.5vw, 20px)',
              lineHeight: 1.6,
              letterSpacing: 3,
              color: 'var(--gold-3)',
            }}
          >
            {HERO.tagline}
          </div>
          <div
            className="tc gf-hide-md"
            style={{
              marginTop: 'clamp(14px, 2vh, 28px)',
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              lineHeight: 1.85,
              letterSpacing: 1,
              color: 'var(--sumi)',
              textShadow: '0 1px 0 rgba(248,245,235,0.5)',
              maxWidth: 460,
            }}
          >
            {HERO.intro}
          </div>
        </div>

        {/* Mono caption chip — bottom-right, matches the existing site pattern */}
        <div
          className="mono"
          style={{
            position: 'absolute',
            bottom: 22,
            right: 24,
            background: 'var(--paper)',
            color: 'var(--gold-3)',
            padding: '10px 14px',
            border: '1px solid var(--ink-15)',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          {HERO.caption}
        </div>
      </section>

      {/* Three pillars */}
      <section
        style={{
          borderTop: '1px solid var(--ink-15)',
          borderBottom: '1px solid var(--ink-15)',
          background: 'rgba(244,236,215,0.5)',
        }}
      >
        <div
          className="gf-pad-md gf-stack-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '60px 44px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 60,
          }}
        >
          {PILLARS.map((p, i) => (
            <div key={i}>
              <div
                style={{
                  width: 180,
                  margin: '0 auto 28px',
                }}
              >
                {p.photo ? (
                  <div className="gf-pillar-photo">
                    <SoapPhoto src={p.photo} alt={p.zh} ratio="1/1" />
                  </div>
                ) : (
                  <PhotoPlaceholder ratio="1/1" label={p.zh} tone={p.tone} />
                )}
              </div>
              <div
                className="tc"
                style={{
                  fontSize: 48,
                  fontWeight: 300,
                  letterSpacing: 8,
                  color: 'var(--red)',
                }}
              >
                {p.zh}
              </div>
              <Divider />
              <div
                className="tc"
                style={{
                  marginTop: 16,
                  fontSize: 16,
                  lineHeight: 1.85,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                  maxWidth: 300,
                }}
              >
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto film — placeholder slot. When the film is ready, swap the
          inner placeholder div for a <video> element pointing at the new mp4
          (e.g. /images/about/manifesto.mp4) — the wrapper sizing stays the same. */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px 0',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)', marginBottom: 18 }}>
          本舍之約 · 影片
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: 600,
            overflow: 'hidden',
            background: 'var(--paper-2)',
            border: '1px solid var(--ink-15)',
          }}
        >
          {/*
            ── 影片就緒後，把下方 placeholder 替換為： ──
            <video
              src="/images/about/manifesto.mp4"
              autoPlay muted loop playsInline preload="auto"
              aria-label="本舍之約 · 影片"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          */}
          <div
            className="mono"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              color: 'var(--gold-3)',
              fontSize: 12,
              letterSpacing: 4,
              background:
                'repeating-linear-gradient(135deg, transparent 0 18px, rgba(138,100,32,0.18) 18px 36px)',
            }}
          >
            {/* Play-triangle glyph so the slot reads as a video */}
            <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
              <circle cx="40" cy="40" r="38" fill="none" stroke="var(--gold-3)" strokeWidth="1.5" opacity="0.6" />
              <polygon points="32,26 32,54 56,40" fill="var(--gold-3)" opacity="0.85" />
            </svg>
            <span style={{ fontSize: 18, letterSpacing: 8, color: 'var(--sumi)' }}>
              本舍之約 · 影片預留位
            </span>
            <span style={{ fontSize: 11, letterSpacing: 2, color: 'var(--ink-60)' }}>
              16 : 9 · MP4 · 請放至 /public/images/about/manifesto.mp4
            </span>
          </div>
          <div
            className="mono"
            style={{
              position: 'absolute',
              bottom: 18,
              right: 20,
              background: 'var(--paper)',
              color: 'var(--gold-3)',
              padding: '8px 12px',
              border: '1px solid var(--ink-15)',
              fontSize: 10,
              letterSpacing: 2,
            }}
          >
            金花樓 · MMXXVI
          </div>
        </div>
      </section>

      {/* Manifesto — vertical chinese + horizontal english */}
      <section
        className="gf-pad-md gf-stack-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '60px 44px 90px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 80,
        }}
      >
        <div
          className="gf-vertical-md"
          style={{
            writingMode: 'vertical-rl',
            fontFamily: '"Noto Serif TC", serif',
            fontSize: 30,
            lineHeight: 2.4,
            letterSpacing: 10,
            color: 'var(--sumi)',
            height: 460,
          }}
        >
          以天然之物 · 慢製一方肥皂 · 洗塵心
          <span style={{ color: 'var(--red)' }}> · 照夜夢</span>
        </div>
        <div>
          <div className="mono" style={{ color: 'var(--gold-3)', marginBottom: 20 }}>
            本舍之約
          </div>
          <div
            className="tc"
            style={{
              fontSize: 28,
              lineHeight: 1.6,
              letterSpacing: 3,
              color: 'var(--sumi)',
              maxWidth: 620,
            }}
          >
            我們相信，一方肥皂也能是日常裡的小儀式 ── 清晨的第一盆涼水，夜裡的最後一盆溫水。
          </div>
          <div
            className="gf-stack-md"
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 40,
              fontSize: 16,
              lineHeight: 1.9,
              letterSpacing: 1,
              color: 'var(--sumi)',
            }}
          >
            <p className="tc">
              本舍起於艋舺一間小廚房，一個配方、一台橄欖油壓。第一批 ──
              十二塊艾草皂 ── 一個下午就被街坊收光。從那以後，每個禮拜四，
              我們都壓一批新的。
            </p>
            <p className="tc">
              我們的規矩很簡單：自己的阿嬤皮膚不能用的，就不放進皂裡。
              這樣一來，大工廠做的大半東西都進不了我們的皂 ──
              我們也得以把這一件小事，慢慢地、好好地做。
            </p>
          </div>
          <div className="edu-block" style={{ maxWidth: 620 }}>
            <span className="edu-label">設計之念</span>
            <p className="edu-note">
              一方皂的設計，我們只信一件事：油脂是載體，脂肪酸才是本質。
              每一張配方都先過「五力」自檢 ── 清潔、泡沫、溫潤、滑順、硬度 ──
              五樣顧到，才算是一塊對得起肌膚的皂。花材是風韻，不是救方：
              一撮桂花、一勺艾草，為的是讓皂更耐人尋味，不是用來補一張不夠好的配方。
            </p>
          </div>
        </div>
      </section>

      {/* Crew — the two people behind the soap */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '80px 44px',
          borderTop: '1px solid var(--ink-15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div className="mono" style={{ color: 'var(--red)' }}>
            {CREW.micro}
          </div>
          <h2
            className="tc gf-h2-md"
            style={{
              fontSize: 56,
              fontWeight: 400,
              letterSpacing: 14,
              margin: '14px 0 8px',
              color: 'var(--sumi)',
            }}
          >
            {CREW.title}
          </h2>
          <div
            className="tc"
            style={{ fontSize: 18, color: 'var(--gold-3)', letterSpacing: 6 }}
          >
            {CREW.subtitle}
          </div>
          <div
            className="tc"
            style={{
              maxWidth: 520,
              margin: '22px auto 0',
              fontSize: 15,
              lineHeight: 1.85,
              color: 'var(--ink-60)',
              letterSpacing: 1,
            }}
          >
            {CREW.intro}
          </div>
        </div>

        <div
          className="gf-stack-md"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 40,
          }}
        >
          {CREW.members.map((r, i) => (
            <div
              key={i}
              style={{
                padding: 32,
                background: 'var(--paper)',
                border: '1px solid var(--ink-15)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -12,
                  left: 24,
                  background: 'var(--sumi)',
                  color: 'var(--gold-2)',
                  padding: '6px 12px',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 10,
                  letterSpacing: 2,
                }}
              >
                {r.roleMono}
              </div>
              <div
                className="tc"
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: 6,
                  color: 'var(--sumi)',
                  marginTop: 8,
                }}
              >
                {r.roleZh}
              </div>
              <p
                className="tc"
                style={{
                  marginTop: 18,
                  fontSize: 15.5,
                  lineHeight: 1.9,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                }}
              >
                {r.body}
              </p>
              <div className="edu-block">
                <span className="edu-label">手邊的原則</span>
                <p className="edu-note tc">{r.edu}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Water interlude — echoes the 「涼水 / 溫水」 line in the manifesto */}
      <section
        aria-label="一盞涼水 · 一盞溫水"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          aspectRatio: '1280 / 720',
          overflow: 'hidden',
          background: 'var(--paper)',
        }}
      >
        <video
          src="/images/process/09wash.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="山泉水流動的影像"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          className="mono"
          style={{
            position: 'absolute',
            bottom: 22,
            right: 24,
            background: 'var(--paper)',
            color: 'var(--gold-3)',
            padding: '10px 14px',
            border: '1px solid var(--ink-15)',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          一盞涼水 · 一盞溫水
        </div>
      </section>

      {/* Five bars, five rituals */}
      <section
        style={{
          background: 'var(--paper-3)',
          borderTop: '1px solid var(--ink-15)',
        }}
      >
        <div
          className="gf-pad-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '80px 44px 90px',
          }}
        >
          <div
            className="mono"
            style={{ color: 'var(--red)', textAlign: 'center', marginBottom: 8 }}
          >
            五皂五境
          </div>
          <h2
            className="tc gf-h2-md"
            style={{
              textAlign: 'center',
              fontSize: 44,
              fontWeight: 400,
              letterSpacing: 10,
              margin: '0 0 14px',
              color: 'var(--sumi)',
            }}
          >
            一皂一境
          </h2>
          <div
            className="tc"
            style={{
              textAlign: 'center',
              fontSize: 22,
              letterSpacing: 4,
              color: 'var(--gold-3)',
              maxWidth: 640,
              margin: '0 auto 56px',
              lineHeight: 1.7,
            }}
          >
            一方皂，一種日常 ── 從清晨的第一盆水，
            <br />
            到夜裡長路歸來的那一瓢。每一塊皂，都是為了那一刻。
          </div>

          {/* Hero scene — the all-in-one bar (largest tile) */}
          {(() => {
            const scene = {
              productNum: '壹',
              zh: '海棠修復',
              subtitle: '敏弱 · 痘肌 · 受損 一塊修護',
              tagline: '補回那一寸瑕，留下玉石的光。',
              palette: { tone: 'cool', flower: 'rose' },
              kicker: 'NO. 01 · 修復',
              body: '為敏弱、痘困、走過幾道瑕疵的肌膚而壓。瓊崖海棠油是這方皂的主角 ── 修復的力來自它；乳油木果脂接在後面，把鎖住的水分守好。洗時是一抹深沉的木質堅果香，泡泡細緻如凝脂；沖完，肌膚會回到溫潤的玉石光澤。',
              tags: [
                '瓊崖海棠油',
                '乳油木果脂 · 甜杏仁',
                '敏弱 · 痘肌 · 受損',
                '木質堅果香',
              ],
              edu: {
                label: '設計之念',
                body: '海棠修復走的是五力中的「溫潤」與「修復」 ── 瓊崖海棠油是主角，因為它補的不只是表面，是肌膚自己想長回去的那一寸；乳油木果脂接在後面，把那一刻鎖回的水分守住，不至於太快流失。椰子油刻意壓得低一些，是替敏弱與痘肌留一條退路 ── 該洗的洗掉，不該帶走的，留給肌膚自己慢慢回。',
              },
              note: 'ritual — 入夜的最後一盆溫水。一塊碧玉色的皂，洗去一日的塵與躁；睡前，肌膚會記得這道光澤。',
            };
            return (
              <div
                role="button"
                tabIndex={0}
                onClick={() => goToProduct(scene.productNum)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToProduct(scene.productNum);
                  }
                }}
                aria-label={`查看 ${scene.zh} 詳情`}
                className="gf-stack-md"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 1fr',
                  gap: 60,
                  alignItems: 'center',
                  padding: '44px 0',
                  borderTop: '1px solid var(--ink-15)',
                  borderBottom: '1px solid var(--ink-15)',
                  marginBottom: 60,
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: -16,
                      border: '1px solid var(--gold-3)',
                      opacity: 0.3,
                    }}
                  />
                  <SoapPhoto
                    src="/images/products/海棠.png"
                    alt="海棠修復 · 瓊崖海棠 · 碧玉"
                    ratio="5/4"
                  />
                  <div
                    className="mono"
                    style={{
                      position: 'absolute',
                      bottom: -16,
                      left: -16,
                      background: 'var(--sumi)',
                      color: 'var(--gold-2)',
                      padding: '10px 14px',
                      fontSize: 10,
                      letterSpacing: 2,
                    }}
                  >
                    主皂 · {scene.kicker}
                  </div>
                </div>
                <div>
                  <div className="mono" style={{ color: 'var(--red)' }}>
                    {scene.kicker}
                  </div>
                  <h3
                    className="tc"
                    style={{
                      fontSize: 52,
                      fontWeight: 400,
                      letterSpacing: 6,
                      margin: '10px 0 6px',
                      color: 'var(--sumi)',
                    }}
                  >
                    {scene.zh}
                  </h3>
                  <div
                    className="tc"
                    style={{
                      fontSize: 18,
                      letterSpacing: 6,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {scene.subtitle}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 18,
                      fontSize: 24,
                      lineHeight: 1.45,
                      letterSpacing: 3,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {scene.tagline}
                  </div>
                  <Divider />
                  <p
                    className="tc"
                    style={{
                      marginTop: 18,
                      fontSize: 17,
                      lineHeight: 1.9,
                      letterSpacing: 1,
                      color: 'var(--sumi)',
                      maxWidth: 520,
                    }}
                  >
                    {scene.body}
                  </p>
                  <div
                    style={{
                      marginTop: 22,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    {scene.tags.map((t) => (
                      <span
                        key={t}
                        className="mono"
                        style={{
                          border: '1px solid var(--gold-3)',
                          color: 'var(--gold-3)',
                          padding: '4px 10px',
                          fontSize: 9,
                          letterSpacing: 2,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {scene.edu && (
                    <div className="edu-block" style={{ maxWidth: 520 }}>
                      <span className="edu-label">{scene.edu.label}</span>
                      <p className="edu-note tc">{scene.edu.body}</p>
                    </div>
                  )}
                  <div
                    className="tc"
                    style={{
                      marginTop: 22,
                      fontSize: 15,
                      lineHeight: 1.7,
                      letterSpacing: 1,
                      color: 'var(--ink-60)',
                      paddingLeft: 14,
                      borderLeft: '2px solid var(--red)',
                      maxWidth: 520,
                    }}
                  >
                    {scene.note}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Four smaller scene tiles */}
          <div
            className="gf-stack-md"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 36,
            }}
          >
            {[
              {
                productNum: '玖',
                kicker: 'NO. 02 · 髮',
                zh: '山茶淨髮',
                subtitle: '植萃髮餅',
                tagline: '清晨第一塊，洗出山茶與一夜歇息的香。',
                body: '山茶花油、蠶絲蛋白、玉米澱粉、甘油 ── 四味為主，壓成一塊大約能洗六十次的髮餅。冷水一瓢沖淨；硬水區，再以檸檬酸或一勺米醋茶收尾。山茶花油是這支的主香 ── 淡而不黏，像清晨剛開的那一朵。',
                tags: [
                  '山茶花油 · 蠶絲蛋白',
                  '玉米澱粉 · 甘油',
                  '約 60 次洗髮',
                  '90 g 皂餅',
                ],
                edu: {
                  label: '設計之念',
                  body: '髮餅有兩處較真。一是 pH 5–6 ── 弱酸，貼近頭皮本來的酸鹼；大多數鹼性洗髮皂會把這道酸鹼推遠，洗久了就澀。二是蠶絲蛋白：細小的多胜肽會順著毛鱗片排列，洗後不澀、不打結 ──「洗完澀澀的那種」是被它擋下的。山茶花油補一層輕脂；玉米澱粉扛起成型，沒有它，髮餅就壓不結實。',
                },
                note: 'ritual — 走遠路的清晨用一塊，山茶花香能跟著你一整天。',
                tone: 'warm',
                flower: 'chrysanthemum',
                photo: '/images/products/山茶淨髮.png',
              },
              {
                productNum: '拾',
                kicker: 'NO. 03 · 香',
                zh: '茉莉沐膚',
                subtitle: '香氛沐浴餅',
                tagline: '一塊小皂，一夜茉莉。',
                body: '茉莉花萃取粉、玉米澱粉、甘油 ── 三味為主，壓成一塊掌心大小的沐浴餅。pH 5–6，弱酸，泡沫綿密細緻，洗完不緊繃。茉莉花是這支的主香 ── 不是精油，不是香精，是真實的花瓣磨成粉；水熱了，香就慢慢開了。',
                tags: [
                  '茉莉花萃取粉',
                  '玉米澱粉 · 甘油',
                  'pH 5–6',
                  '100 g 沐浴餅',
                ],
                edu: {
                  label: '設計之念',
                  body: '沐浴餅的骨架是弱酸的表活組合 ── pH 5–6，貼近肌膚原生環境，泡沫綿密但不脫脂。茉莉花萃取粉是植萃之妙：本舍信奉「先讓配方站得住，再讓植萃為它加分」── 香不是用來補配方的。茉莉粉量刻意壓在低位，過了就會擠掉泡沫；玉米澱粉扛起成型，把鬆鬆的表活組合塑成一塊好握的小餅。',
                },
                note: 'ritual — 熱水放好前，先用掌心暖一暖這塊餅。下了水，茉莉就走了出來。',
                tone: 'cool',
                flower: 'pine',
                photo: '/images/products/茉莉沐膚.png',
              },
              {
                productNum: '伍',
                kicker: 'NO. 04 · 舒',
                zh: '金盞舒緩',
                subtitle: '長濱金 · 舒膚皂',
                tagline: '長濱的金，泡進一塊皂裡。',
                body: '長濱海岸的金盞花，採下後在橄欖油裡浸泡四週 ── 那一抹金，慢慢釋進油裡。再與義大利純橄欖、乳油木果脂、甜杏仁一起冷壓，最後以椰子、棕櫚壓住硬度。120 g，兩掌可握。配方走得敦厚 ── 為敏感、過冬、走過幾道刺激的肌膚而備。',
                tags: [
                  '長濱金盞花浸泡油',
                  '橄欖 · 乳油木 · 甜杏仁',
                  '敏感 · 過冬適用',
                  '120 g',
                ],
                edu: {
                  label: '設計之念',
                  body: '金盞舒緩走的是五力中的「溫潤」與「修護」。長濱金盞花要先在橄欖油裡浸泡四週 ── 不靠加熱、不催 ── 讓金盞花烯與類黃酮慢慢釋進油裡，這道功夫不能省。乳油木果脂接在後面，把這道修護鎖在肌膚上；椰子與棕櫚油刻意壓在低位，是為敏感留一道緩衝 ── 配方厚實，但不喧鬧。',
                },
                note: 'ritual — 在最冷的那幾天用一塊。洗完別急著擦；掌心留下來的那點金，是它的工作。',
                tone: 'deep',
                flower: 'rose',
                photo: '/images/products/金盞花.png',
              },
              {
                productNum: '拾壹',
                kicker: 'NO. 05 · 動',
                zh: '一皂到底',
                subtitle: '清爽款 · 水仙清透',
                tagline: '一身汗，一塊皂，一場清。',
                body: '荷荷芭油、薰衣草粉、植物性甘油 ── 三味為主，為一身汗水後的肌膚而壓。荷荷芭油的結構最接近肌膚自身的皮脂，洗完不脫脂、不悶；薰衣草粉在後段釋出一抹草本氣，徹底洗去汗與油；沖完，全身會留下微微的清涼。',
                tags: [
                  '荷荷芭油 · 薰衣草粉',
                  '植物性甘油',
                  '清爽 · 速洗',
                  '110 g',
                ],
                edu: {
                  label: '設計之念',
                  body: '清爽款的設計，把油脂家族壓向最輕盈的一端 ── 荷荷芭油的脂肪酸結構與肌膚自身的皮脂幾乎同源，運動後油脂分泌變多時，反而能起平衡，不像厚重的油脂家族容易悶。薰衣草粉走粉類植萃路線，量壓在低位 ── 多了會壓擠泡沫，剛好的量會在沖水那一刻釋出一陣草本氣。配方薄、洗感快 ── 為夏天、為流汗、為趕著出門的清晨而備。',
                },
                note: 'ritual — 運動完拆開那塊，泡沫起得比汗還快。回家放在通風處，下次訓練前，它已經乾了。',
                tone: 'cool',
                flower: 'mugwort',
                photo: '/images/products/一皂到底清爽2.png',
              },
            ].map((s, i) => (
              <div
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => goToProduct(s.productNum)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToProduct(s.productNum);
                  }
                }}
                aria-label={`查看 ${s.zh} 詳情`}
                className="gf-stack-md"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.2fr',
                  gap: 24,
                  padding: 24,
                  background: 'var(--paper)',
                  border: '1px solid var(--ink-15)',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative' }}>
                  {s.photo ? (
                    <SoapPhoto src={s.photo} alt={`${s.zh} · ${s.subtitle}`} />
                  ) : (
                    <IllSoap label={s.zh} tone={s.tone} flower={s.flower} ratio="4/5" />
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="mono" style={{ color: 'var(--red)', fontSize: 10 }}>
                    {s.kicker}
                  </div>
                  <div
                    className="tc"
                    style={{
                      fontSize: 32,
                      fontWeight: 500,
                      letterSpacing: 6,
                      marginTop: 6,
                      color: 'var(--sumi)',
                      lineHeight: 1,
                    }}
                  >
                    {s.zh}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 6,
                      fontSize: 14,
                      letterSpacing: 4,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {s.subtitle}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 12,
                      fontSize: 17,
                      lineHeight: 1.6,
                      letterSpacing: 2,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {s.tagline}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 12,
                      fontSize: 14.5,
                      lineHeight: 1.85,
                      letterSpacing: 1,
                      color: 'var(--sumi)',
                    }}
                  >
                    {s.body}
                  </div>
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 14,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                    }}
                  >
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="mono"
                        style={{
                          border: '1px solid var(--ink-15)',
                          color: 'var(--gold-3)',
                          padding: '3px 8px',
                          fontSize: 9,
                          letterSpacing: 1.5,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {s.edu && (
                    <div className="edu-block">
                      <span className="edu-label">{s.edu.label}</span>
                      <p
                        className="edu-note tc"
                        style={{ fontSize: 13.5, lineHeight: 1.85 }}
                      >
                        {s.edu.body}
                      </p>
                    </div>
                  )}
                  <div
                    className="tc"
                    style={{
                      marginTop: 12,
                      fontSize: 13,
                      lineHeight: 1.7,
                      letterSpacing: 1,
                      color: 'var(--ink-60)',
                      paddingLeft: 10,
                      borderLeft: '2px solid var(--red)',
                    }}
                  >
                    {s.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
