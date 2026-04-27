// Process & Ingredients tab — how the soap is made, end to end
import { useEffect, useRef } from 'react';
import { IllNoList } from './Illustrations.jsx';

// Step video — autoplays muted/loop only when scrolled into view, pauses
// otherwise. Mirrors SoapPhoto's lazy approach but for <video>. We DO NOT
// set the `autoPlay` attribute; the IntersectionObserver below calls play()
// on first intersection. That way bytes for off-screen step videos are
// never fetched until you scroll near them — large win on the 8-step page.
function ProcessVideo({ src, poster, alt }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      style={{
        width: '100%',
        aspectRatio: '4/3',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}

// Ingredient photo — same AVIF→WebP→WebP-fallback chain as SoapPhoto
// (kept inline here to avoid a cross-component import dance).
function IngredientPhoto({ src, alt }) {
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
          aspectRatio: '1/1',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </picture>
  );
}

export function Process() {
  const steps = [
    {
      n: '壹', zh: '煉油',
      video: '/images/process/01煉油.mp4',
      poster: '/images/process/png/1refined.avif',
      body: '油料於銅鍋中溫至 40°C，以手攪拌。溫度不過體溫 ── 為保脂肪酸完整。',
      eduZh: '脂肪酸怕熱。逾 60°C 則色變、風味走 ── 把溫度壓在體溫之下，為的是把「洗感的本體」完整地留到皂裡。',
    },
    {
      n: '貳', zh: '調和',
      video: '/images/process/02調和.mp4',
      poster: '/images/process/png/2trace.avif',
      body: '冷卻一夜的鹼水與煉好的油相遇，攪至 trace ── 油鹼乳化、液面拉出淡淡一道痕跡；此時拌入花材。',
      eduZh: 'trace 是皂化的臨界點 ── 早一刻油鹼分離，晚一刻已成固。手攪二十分鐘，眼睛盯著那道痕跡走出來，是這一行不能跳過的功夫。',
    },
    {
      n: '參', zh: '入模',
      video: '/images/process/03入模.mp4',
      poster: '/images/process/png/3moding.avif',
      body: '成形的皂液倒入鋪有未漂紙之檜木模 ── 滿模、抹平、輕震出氣泡。',
      eduZh: '倒模的時機要剛好 ── 早了會分層，晚了則已凝固塞模。檜木模不黏皂、好脫；未漂紙留住每一塊邊緣的乾淨。',
    },
    {
      n: '肆', zh: '熟成',
      video: '/images/process/04熟成.mp4',
      poster: '/images/process/png/4ripe.avif',
      body: '入模後靜置四十八小時 ── 皂體由液入凝，硬到剛好可以下刀的「軟凝」狀態。',
      eduZh: '皂化反應其實數小時就完成 ── 但要等水分稍稍走了，才能把皂從模子裡完整取出。早一刻黏模，晚一刻硬得像石膏。',
    },
    {
      n: '伍', zh: '切皂',
      video: '/images/process/05切皂.mp4',
      poster: '/images/process/png/5cut.avif',
      body: '脫模後以金屬線手工切塊 ── 每塊蓋上金花印記。切面俐落，花材不崩。',
      eduZh: '「軟凝」狀態切起來最乾淨 ── 早切會黏刀，晚切則脆得像石膏。一條金屬線拉過去，皂粒不掉、邊緣不塌，是這支皂的第一張臉。',
    },
    {
      n: '陸', zh: '晾皂',
      video: '/images/process/06晾皂.mp4',
      poster: '/images/process/png/6dry.avif',
      body: '切好的皂塊置於檜木架上四十二日 ── 通風陰涼、不曬不蓋，逐日堅實、醇和。',
      eduZh: '晾皂這一段，水分緩緩散去、表層形成保護膜、晶體結構鎖緊 ── 退一分鹼、添一分硬。少一日，皂澀；多一日，香氣退。這四十二日，機器催不出來。',
    },
    {
      n: '柒', zh: '測試',
      video: '/images/process/07測試.mp4',
      poster: '/images/process/png/7test.avif',
      body: '出舍前，每一批皂取一塊以 pH 試紙測之；舌尖輕觸皂面，無刺感者為合格。',
      eduZh: 'pH 8.5 以下、舌尖不刺，才是真的退完了鹼。化學不是口號 ── 不到的那一批，回架上再走七日。',
    },
    {
      n: '捌', zh: '包裝',
      video: '/images/process/08包裝.mp4',
      poster: '/images/process/png/8pack.avif',
      body: '每塊以楮紙包裹、麻繩繫縛，押上金花朱印。',
      eduZh: '楮紙透氣，讓皂繼續呼吸；麻繩繫得穩、朱印壓得實 ── 一塊皂像一封寫好的信，到了手上才拆。',
    },
  ];

  const ingredients = [
    { zh: '桂花', lat: 'Osmanthus fragrans', origin: '苗栗 · 山區', ratio: '~3%', benefit: '香氣',
      photo: '/images/ingredients/桂花.png',
      note: '苗栗山間的金秋桂，以橄欖油浸泡四週萃出 ── 香氣細淡、不喧不燥。屬「風韻」一類，比例壓在三分以下，方不奪皂之本味。' },
    { zh: '瓊崖海棠子', lat: 'Calophyllum inophyllum', origin: '蘭嶼 · 海岸', ratio: '~5%', benefit: '修護',
      photo: '/images/ingredients/海棠子.png',
      note: '蘭嶼海岸的瓊崖海棠子，冷壓出油 ── 富含 calophyllolide，是修護敏弱與瑕疵肌的木質深油。海棠修復皂的主角即此。' },
    { zh: '白芷', lat: 'Angelica dahurica', origin: '中部山區', ratio: '~2%', benefit: '舒緩',
      photo: '/images/ingredients/白芷.png',
      note: '古方中常見的安膚草本，磨成細粉於 trace 後拌入。淡米色、無強烈氣味 ── 能舒緩日曬與情緒不安的肌膚。' },
    { zh: '米糠', lat: 'Oryza sativa bran', origin: '池上 · 稻區', ratio: '~3%', benefit: '輕去角質',
      photo: '/images/ingredients/米糠.png',
      note: '池上稻收成後留下的米糠細粉。粒徑微小，輕拭即代謝表皮 ── 不傷臉、不澀手；亦帶一點米香。' },
    { zh: '綠豆', lat: 'Vigna radiata', origin: '屏東', ratio: '~3%', benefit: '涼感',
      photo: '/images/ingredients/綠豆.png',
      note: '屏東綠豆磨成細粉 ── 觸膚有清涼之意，是夏季沐浴皂的基底之一。也能輕微吸附油脂，洗後不黏。' },
    { zh: '蝶豆花', lat: 'Clitoria ternatea', origin: '屏東', ratio: '~2%', benefit: '天然色素',
      photo: '/images/ingredients/蝶豆花.png',
      note: '屏東種的蝶豆花，萃出天然湛藍色素，遇酸轉紫。皂面層次的自然色 ── 不假化學色粉。' },
    { zh: '酒粕', lat: 'Sake lees', origin: '信義 · 清酒坊', ratio: '~4%', benefit: '滋潤',
      photo: '/images/ingredients/酒粕.png',
      note: '信義鄉清酒坊的酒粕，含氨基酸與酵素 ── 入皂後給予肌膚柔潤與光澤，洗感如絲。' },
    { zh: '金盞花', lat: 'Calendula officinalis', origin: '臺東 · 長濱', ratio: '~5%', benefit: '修護舒敏',
      photo: '/images/ingredients/金盞花.png',
      note: '臺東長濱的金盞花，以橄欖油浸泡四週 ── 金盞花烯與類黃酮入油。金盞舒緩皂的主角。' },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero video banner — mirrors About's opener */}
      <section
        aria-label="金花樓 · 製皂之序 · 序幕"
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
          src="/images/landingmedia/Chinese_Ink_Wash_Painting_Animation.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="水墨山居 · 手壓皂的序幕"
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
          八步慢皂 · 林口 · MMXXVI
        </div>
      </section>

      {/* Header */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px 40px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          製皂之序
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 72,
            fontWeight: 500,
            letterSpacing: 16,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          八步慢皂
        </h1>
        <div
          className="tc"
          style={{
            fontSize: 18,
            color: 'var(--gold-3)',
            letterSpacing: 6,
          }}
        >
          八道工序 · 四十二日 · 一塊小皂
        </div>
      </section>

      {/* Timeline */}
      <section
        className="gf-pad-md gf-hide-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '20px 44px 40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 0,
            borderTop: '1px solid var(--ink-15)',
            borderBottom: '1px solid var(--ink-15)',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                padding: '24px 18px',
                borderRight: i < 7 ? '1px solid var(--ink-15)' : 'none',
                position: 'relative',
              }}
            >
              <div className="mono" style={{ color: 'var(--gold-3)' }}>
                第 {s.n} 序
              </div>
              <div
                className="tc"
                style={{
                  marginTop: 10,
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: 4,
                }}
              >
                {s.zh}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step details — alternating left/right */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '40px 44px 60px',
        }}
      >
        {steps.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={s.n}
              className="gf-stack-md"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 60,
                alignItems: 'center',
                padding: '50px 0',
                borderTop: i > 0 ? '1px dashed var(--ink-15)' : 'none',
              }}
            >
              <div style={{ order: flip ? 2 : 1, position: 'relative' }}>
                <ProcessVideo
                  src={s.video}
                  poster={s.poster}
                  alt={`第 ${s.n} 序 — ${s.zh}`}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: -18,
                    [flip ? 'right' : 'left']: -18,
                    background: 'var(--red)',
                    color: 'var(--gold-2)',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Noto Serif TC", serif',
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: 2,
                    border: '2px solid var(--gold-1)',
                  }}
                >
                  {s.n}
                </div>
              </div>
              <div style={{ order: flip ? 1 : 2 }}>
                <div className="mono" style={{ color: 'var(--gold-3)' }}>
                  第 {s.n} 序
                </div>
                <div
                  className="tc"
                  style={{
                    fontSize: 56,
                    fontWeight: 500,
                    letterSpacing: 10,
                    margin: '10px 0 18px',
                    color: 'var(--sumi)',
                  }}
                >
                  {s.zh}
                </div>
                <div
                  className="tc"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.85,
                    letterSpacing: 1,
                    color: 'var(--sumi)',
                    maxWidth: 460,
                  }}
                >
                  {s.body}
                </div>
                {s.eduZh && (
                  <div className="edu-block" style={{ maxWidth: 460 }}>
                    <span className="edu-label">工序之念</span>
                    <p className="edu-note tc">{s.eduZh}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Ingredient grid — SHIRO-style photo tiles */}
      <section
        style={{
          background: 'var(--paper-3)',
          borderTop: '1px solid var(--ink-15)',
          borderBottom: '1px solid var(--ink-15)',
        }}
      >
        <div
          className="gf-pad-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '80px 44px',
          }}
        >
          {/* Header block */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 50,
            }}
          >
            <div className="mono" style={{ color: 'var(--red)' }}>
              本舍所用 · 花材
            </div>
            <h2
              className="tc gf-h2-md"
              style={{
                fontSize: 64,
                fontWeight: 400,
                letterSpacing: 16,
                margin: '14px 0 8px',
                color: 'var(--sumi)',
              }}
            >
              八樣花材
            </h2>
            <div
              className="tc"
              style={{ fontSize: 18, color: 'var(--gold-3)', letterSpacing: 6 }}
            >
              一皂風韻 · 隨配方而起
            </div>
            <div
              className="tc"
              style={{
                maxWidth: 560,
                margin: '18px auto 0',
                fontSize: 15,
                lineHeight: 1.85,
                color: 'var(--ink-60)',
                letterSpacing: 1,
              }}
            >
              花材是配方的風韻，不是主角 ── 油脂才是洗感的本體。八樣輪番進皂，依當月香氣與配方而選，比例多在 2–5% 之間。
            </div>
          </div>

          {/* Alternating bands: 4 photos → 4 notes → 4 photos → 4 notes */}
          {[ingredients.slice(0, 4), ingredients.slice(4, 8)].map((row, rowIdx) => (
            <div key={`band-${rowIdx}`} style={{ marginTop: rowIdx === 0 ? 0 : 56 }}>
              {/* Photo strip — soft gap, page bg shows through */}
              <div
                className="gf-cols-2-md"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 6,
                }}
              >
                {row.map((x) => (
                  <div key={x.zh} style={{ position: 'relative' }}>
                    <IngredientPhoto src={x.photo} alt={`${x.zh} · ${x.benefit}`} />
                    {/* Ratio-only chip, right-aligned (origin removed) */}
                    <div
                      className="mono"
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        padding: '10px 14px',
                        fontSize: 11,
                        letterSpacing: 2,
                        color: 'var(--gold-2)',
                        textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                        pointerEvents: 'none',
                      }}
                    >
                      {x.ratio}
                    </div>
                  </div>
                ))}
              </div>

              {/* Caption strip — same 4-col layout, full notes */}
              <div
                className="gf-cols-2-md"
                style={{
                  marginTop: 24,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '28px 40px',
                }}
              >
                {row.map((x) => (
                  <div key={`note-${x.zh}`}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 10,
                        marginBottom: 6,
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        className="tc"
                        style={{ fontSize: 20, fontWeight: 500, letterSpacing: 3, color: 'var(--sumi)' }}
                      >
                        {x.zh}
                      </span>
                      <span className="italic" style={{ fontSize: 14, color: 'var(--gold-3)' }}>
                        {x.lat}
                      </span>
                      <span className="mono" style={{ color: 'var(--gold-3)' }}>
                        · {x.ratio}
                      </span>
                    </div>
                    <div
                      className="tc"
                      style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-60)', letterSpacing: 1 }}
                    >
                      {x.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we don't use */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px',
        }}
      >
        <div
          className="gf-stack-md"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative' }}>
            <IllNoList ratio="1/1" label="不入之物" />
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--red)' }}>
              不入之物
            </div>
            <h2
              className="tc"
              style={{
                fontSize: 46,
                fontWeight: 400,
                letterSpacing: 8,
                margin: '14px 0 20px',
              }}
            >
              不做之事
            </h2>
            <div
              style={{
                display: 'grid',
                gap: 16,
                fontSize: 17,
                color: 'var(--sumi)',
              }}
            >
              {[
                { zh: '不加香精', body: '香氣只從花材本身而來 — 無合成香料。' },
                { zh: '不加色素', body: '色彩取自泥、薑黃、炭、與時間 — 不加染料。' },
                { zh: '不過度包裝', body: '楮紙一張、麻繩一段 — 不用塑膠。' },
                { zh: '不催熟', body: '四十二日熟成 — 不加速、不減日。' },
              ].map((x, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 20,
                    alignItems: 'baseline',
                    paddingBottom: 14,
                    borderBottom: '1px dotted var(--ink-15)',
                  }}
                >
                  <span
                    className="tc"
                    style={{
                      fontSize: 22,
                      color: 'var(--red)',
                      letterSpacing: 4,
                      minWidth: 100,
                    }}
                  >
                    {x.zh}
                  </span>
                  <span
                    className="tc"
                    style={{ fontSize: 16, lineHeight: 1.7, letterSpacing: 1 }}
                  >
                    {x.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
