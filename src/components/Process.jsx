// Process & Ingredients tab — how the soap is made, end to end
import { IllStep, IllIngredient, IllNoList } from './Illustrations.jsx';

export function Process() {
  const steps = [
    {
      n: 'I', zh: '採集',
      body: '每週一，我們親赴宜蘭與陽明山的小農 — 取油、取草、取山泉。離地前皆已秤重入冊。',
    },
    {
      n: 'II', zh: '煉油',
      body: '油料於銅鍋中溫至 40°C，以手攪拌。溫度不過體溫 — 為保脂肪酸完整。',
    },
    {
      n: 'III', zh: '調鹼',
      body: '山泉水遇食用級氫氧化鈉。鹼水入陶甕，靜置一夜冷卻。',
    },
    {
      n: 'IV', zh: '入模',
      body: '油與鹼相遇，攪至 trace，拌入花材，倒入鋪有未漂紙之檜木模。',
    },
    {
      n: 'V', zh: '切皂',
      body: '四十八小時後脫模，以金屬線手工切塊 — 每塊蓋上金花印記。',
    },
    {
      n: 'VI', zh: '慢熟',
      body: '皂塊靜置檜木架上四十二日。逐日堅實、醇和、鹼性盡退 — 此步驟機器無法催熟。',
    },
    {
      n: 'VII', zh: '封蠟',
      body: '每塊以楮紙包裹、麻繩繫縛，點一滴紅蠟、押以朱印。',
    },
  ];

  const ingredients = [
    { kind: 'olive', zh: '橄欖油', lat: 'Olea europaea', origin: '嘉義 · 臺灣', ratio: '32%', benefit: '滋潤', note: '根基。親膚、柔潤、泡沫緩慢。' },
    { kind: 'coconut', zh: '椰子油', lat: 'Cocos nucifera', origin: '菲律賓 · 公平貿易', ratio: '26%', benefit: '起泡', note: '泡沫。清脆、綿密、去污。' },
    { kind: 'castor', zh: '蓖麻油', lat: 'Ricinus communis', origin: '印度', ratio: '6%', benefit: '潤滑', note: '收尾。絲滑、泡沫持久。' },
    { kind: 'water', zh: '山泉水', lat: 'Aqua fontis', origin: '陽明山', ratio: '14%', benefit: '淨', note: '每週取自臺北以北山中泉眼。' },
    { kind: 'lye', zh: '食用鹼', lat: 'Natrii hydroxidum', origin: '食品級 · 日本', ratio: '12%', benefit: '皂化', note: '熟成期完全反應 — 成皂之中已無殘鹼。' },
    { kind: 'botanical', zh: '花材', lat: 'Botanica', origin: '宜蘭農家', ratio: '~8%', benefit: '香氣', note: '壓榨、浸泡或磨粉 — 視配方而定。' },
    { kind: 'salt', zh: '海鹽', lat: 'Sal maris', origin: '臺南鹽田', ratio: '1%', benefit: '礦物', note: '加於 trace 之後，帶一絲脆度與礦氣。' },
    { kind: 'honey', zh: '蜂蜜', lat: 'Mel crudum', origin: '苗栗蜂場', ratio: '1%', benefit: '保濕', note: '選配入皂。滋潤、吸濕、微帶蜜香。' },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
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
          七步慢皂
        </h1>
        <div
          className="tc"
          style={{
            fontSize: 18,
            color: 'var(--gold-3)',
            letterSpacing: 6,
          }}
        >
          七道工序 · 四十二日 · 一塊小皂
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
            gridTemplateColumns: 'repeat(7, 1fr)',
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
                borderRight: i < 6 ? '1px solid var(--ink-15)' : 'none',
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
                <IllStep step={s.n} ratio="4/3" label={`第 ${s.n} 序 — ${s.zh}`} />
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
              本舍所用 · 材料
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
              八樣材料
            </h2>
            <div
              className="tc"
              style={{ fontSize: 18, color: 'var(--gold-3)', letterSpacing: 6 }}
            >
              八樣之外 · 別無他物
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
              配方不同，比例各異 — 薑黃皂重橄欖，海鹽皂倚椰子。此為本舍平均數。
            </div>
          </div>

          {/* 4 × 2 photo grid */}
          <div
            className="gf-cols-2-md"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 2,
              background: 'var(--sumi)',
              border: '1px solid var(--sumi)',
            }}
          >
            {ingredients.map((x) => (
              <div key={x.kind} style={{ position: 'relative' }}>
                <IllIngredient kind={x.kind} zh={x.zh} en={x.lat} benefit={x.benefit} />
                {/* Small metadata strip at bottom */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '10px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontSize: 11,
                    letterSpacing: 2,
                    color: 'rgba(244,236,215,0.75)',
                    textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                  }}
                >
                  <span className="tc">{x.origin}</span>
                  <span className="mono" style={{ color: 'var(--gold-2)' }}>{x.ratio}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Caption row beneath the grid — preserves the full notes */}
          <div
            className="gf-cols-2-md"
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '28px 40px',
            }}
          >
            {ingredients.map((x) => (
              <div key={`note-${x.kind}`}>
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
                { zh: '不用棕櫚油', body: '以臺灣冷壓橄欖油與椰子油替代 — 不碰棕櫚。' },
                { zh: '不加香精', body: '香氣只從花材本身而來 — 無合成香料。' },
                { zh: '不加色素', body: '色彩取自泥、薑黃、炭、與時間 — 不加染料。' },
                { zh: '不過度包裝', body: '楮紙一張、麻繩一段、紅蠟一滴 — 不用塑膠。' },
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
