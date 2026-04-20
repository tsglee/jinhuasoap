// Products tab — editorial ad-style hero stills, each bar shot like a print ad
import { useState } from 'react';
import { IllProductHero, IllGiftBox } from './Illustrations.jsx';

const PRODUCTS = [
  {
    zh: '玫瑰', en: 'Rose', lat: 'Rosa centifolia', price: 380, tone: 'rose', num: 'I',
    notes: ['floral', 'soft', 'rich'], family: 'Floral',
    pitchZh: '千片花瓣，\n只為一方溫柔。',
    pitchEn: 'A thousand petals, distilled into a single bar.',
    staging: 'bowl',
  },
  {
    zh: '艾草', en: 'Mugwort', lat: 'Artemisia argyi', price: 320, tone: 'cool', num: 'II',
    notes: ['warm', 'herbal', 'grounding'], family: 'Herbal',
    pitchZh: '端午掛艾，\n古法入皂。',
    pitchEn: 'The herb our grandmothers hung at the door, pressed into soap.',
    staging: 'kraft',
  },
  {
    zh: '柚子', en: 'Pomelo', lat: 'Citrus grandis', price: 300, tone: 'warm', num: 'III',
    notes: ['zesty', 'bright', 'clean'], family: 'Citrus',
    pitchZh: '中秋的那顆柚子，\n留下了皮。',
    pitchEn: 'The zest of the mid-autumn fruit, held in cold-pressed oil.',
    staging: 'bowl',
  },
  {
    zh: '茶花', en: 'Camellia', lat: 'Camellia japonica', price: 400, tone: 'deep', num: 'IV',
    notes: ['nourishing', 'glossy'], family: 'Floral',
    pitchZh: '山茶之油，\n百年宮中之秘。',
    pitchEn: 'The oil that dressed a thousand years of black hair.',
    staging: 'kraft',
  },
  {
    zh: '薑黃', en: 'Turmeric', lat: 'Curcuma longa', price: 340, tone: 'warm', num: 'V',
    notes: ['warm', 'spiced', 'golden'], family: 'Spice',
    pitchZh: '一寸金色，\n洗去倦容。',
    pitchEn: 'An inch of gold. A wash of warmth.',
    staging: 'bowl',
  },
  {
    zh: '桂花', en: 'Osmanthus', lat: 'Osmanthus fragrans', price: 420, tone: 'warm', num: 'VI',
    notes: ['honeyed', 'soft', 'drowsy'], family: 'Floral',
    pitchZh: '秋風送來桂花，\n我們把它洗進皮膚。',
    pitchEn: "Autumn's sweetest scent, pressed slowly into the bar.",
    staging: 'bowl',
  },
  {
    zh: '白梅', en: 'White Plum', lat: 'Prunus mume', price: 360, tone: 'cool', num: 'VII',
    notes: ['brisk', 'green', 'linen'], family: 'Floral',
    pitchZh: '雪未落，\n梅先開。',
    pitchEn: 'Before the snow, the plum.',
    staging: 'kraft',
  },
  {
    zh: '檜木', en: 'Hinoki', lat: 'Chamaecyparis obtusa', price: 440, tone: 'deep', num: 'VIII',
    notes: ['wooded', 'cool', 'quiet'], family: 'Wood',
    pitchZh: '阿里山的清晨，\n一塊帶回家。',
    pitchEn: 'Alishan morning, shaved into a bar.',
    staging: 'bowl',
  },
  {
    zh: '蜂蜜', en: 'Raw Honey', lat: 'Mel crudum', price: 380, tone: 'warm', num: 'IX',
    notes: ['mellow', 'sweet', 'rich'], family: 'Food',
    pitchZh: '苗栗蜂場的一滴，\n留在你手心。',
    pitchEn: 'One drop from a Miaoli apiary, warmed on your palms.',
    staging: 'kraft',
  },
  {
    zh: '海鹽', en: 'Sea Salt', lat: 'Sal maris', price: 320, tone: 'cool', num: 'X',
    notes: ['crisp', 'exfoliating'], family: 'Mineral',
    pitchZh: '台南的鹽,\n鹹在肌膚。',
    pitchEn: 'Tainan salt pans, one crystal at a time.',
    staging: 'bowl',
  },
  {
    zh: '青苔', en: 'Moss', lat: 'Hypnum cupressiforme', price: 360, tone: 'deep', num: 'XI',
    notes: ['earthy', 'cool', 'forest'], family: 'Earth',
    pitchZh: '林中濕氣,\n一塊涼意。',
    pitchEn: 'Forest damp, folded into a cold-pressed bar.',
    staging: 'kraft',
  },
  {
    zh: '金盞花', en: 'Marigold', lat: 'Calendula officinalis', price: 360, tone: 'warm', num: 'XII',
    notes: ['soothing', 'golden'], family: 'Floral',
    pitchZh: '金色花瓣,\n安撫每一吋。',
    pitchEn: 'Golden petals, calming every inch.',
    staging: 'bowl',
  },
];

// Small price/meta footer shared by all cards
function ProductMeta({ p, size = 'md' }) {
  const big = size === 'lg';
  return (
    <div
      style={{
        padding: big ? '26px 4px 0' : '18px 2px 0',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 18,
        alignItems: 'baseline',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            className="mono"
            style={{
              color: 'var(--red)',
              border: '1px solid var(--gold-3)',
              padding: '2px 8px',
            }}
          >
            № {p.num}
          </span>
          <span
            className="tc"
            style={{
              fontSize: big ? 34 : 24,
              fontWeight: 500,
              letterSpacing: 4,
            }}
          >
            {p.zh}
          </span>
          <span
            className="italic"
            style={{
              fontSize: big ? 20 : 15,
              color: 'var(--gold-3)',
            }}
          >
            {p.en}
          </span>
        </div>
        <div
          className="italic"
          style={{
            fontSize: big ? 14 : 12,
            color: 'var(--ink-60)',
            marginTop: 4,
          }}
        >
          {p.lat}
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.notes.map((n) => (
            <span
              key={n}
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: 9,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--gold-3)',
                border: '1px solid var(--ink-15)',
                padding: '3px 8px',
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div
          className="italic"
          style={{
            fontSize: big ? 28 : 22,
            color: 'var(--red)',
          }}
        >
          NT${p.price}
        </div>
        <button
          style={{
            marginTop: 8,
            fontFamily: '"DM Mono", monospace',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--sumi)',
            borderBottom: '1px solid var(--sumi)',
            paddingBottom: 2,
          }}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}

function ProductCard({ p, size = 'md' }) {
  return (
    <div style={{ position: 'relative' }}>
      <IllProductHero
        tone={p.tone}
        staging={p.staging}
        ratio={size === 'lg' ? '4/5' : '4/5'}
        overlayZh={size === 'lg' ? p.pitchZh : undefined}
        overlayEn={size === 'lg' ? p.pitchEn : undefined}
        wordmark={p.en.toUpperCase()}
      />
      <ProductMeta p={p} size={size} />
    </div>
  );
}

export function Products() {
  const [filter, setFilter] = useState('All');
  const families = ['All', 'Floral', 'Herbal', 'Citrus', 'Spice', 'Wood', 'Earth', 'Mineral', 'Food'];
  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.family === filter);

  // Split the list: first is full-bleed ad hero, next two are editorial pair, rest is grid
  const hero = filtered[0];
  const pair = filtered.slice(1, 3);
  const rest = filtered.slice(3);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Page header */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '70px 44px 30px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          The Twelve · 十二花
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 68,
            fontWeight: 500,
            letterSpacing: 14,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          本舍之皂
        </h1>
        <div
          className="italic"
          style={{
            fontSize: 22,
            color: 'var(--gold-3)',
            letterSpacing: 4,
          }}
        >
          Our soap, by the bar.
        </div>
        <div
          style={{
            maxWidth: 560,
            margin: '26px auto 0',
            fontSize: 16,
            lineHeight: 1.65,
            color: 'var(--sumi)',
          }}
        >
          Twelve recipes — one for each moon. Every bar is cold-pressed, cured forty-two days, and
          wrapped in unbleached paper with a red-wax seal.
        </div>
      </section>

      {/* Filter bar */}
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '20px 44px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
          borderBottom: '1px solid var(--ink-15)',
        }}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {families.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                fontFamily: '"DM Mono", monospace',
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
                border: `1px solid ${filter === f ? 'var(--red)' : 'var(--ink-15)'}`,
                background: filter === f ? 'var(--red)' : 'transparent',
                color: filter === f ? 'var(--gold-2)' : 'var(--sumi)',
                transition: 'all 200ms',
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mono" style={{ color: 'var(--ink-60)' }}>
          Showing {filtered.length} · Sort: alphabetical
        </div>
      </section>

      {/* Hero ad — full-bleed, Moonlight-style */}
      {hero && (
        <section className="gf-pad-md" style={{ padding: '40px 44px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                <IllProductHero
                  tone={hero.tone}
                  staging={hero.staging}
                  ratio="16/9"
                  overlayZh={hero.pitchZh}
                  overlayEn={hero.pitchEn}
                  wordmark={hero.en.toUpperCase()}
                />
              </div>
              <div
                style={{
                  background: 'var(--paper-2)',
                  borderTop: '1px solid var(--ink-15)',
                  padding: '20px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 20,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div className="mono" style={{ color: 'var(--gold-3)' }}>
                    Featured · 本月之花 · № {hero.num}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span
                      className="tc"
                      style={{ fontSize: 28, letterSpacing: 4, fontWeight: 500 }}
                    >
                      {hero.zh}
                    </span>
                    <span
                      className="italic"
                      style={{ marginLeft: 14, fontSize: 18, color: 'var(--gold-3)' }}
                    >
                      {hero.en} · <span style={{ fontSize: 14 }}>{hero.lat}</span>
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 14,
                      color: 'var(--ink-60)',
                      lineHeight: 1.5,
                      maxWidth: 600,
                    }}
                  >
                    {hero.pitchEn}
                  </div>
                </div>
                <button
                  style={{
                    background: 'var(--red)',
                    color: 'var(--gold-2)',
                    padding: '14px 28px',
                    fontFamily: '"DM Mono", monospace',
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                  }}
                >
                  來去逛逛 · NT${hero.price}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Editorial pair — two large ad stills side by side */}
      {pair.length > 0 && (
        <section
          className="gf-pad-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '60px 44px 20px',
          }}
        >
          <div
            className="gf-stack-md"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 40,
            }}
          >
            {pair.map((p) => (
              <ProductCard key={p.num} p={p} size="lg" />
            ))}
          </div>
        </section>
      )}

      {/* Rest as a grid of smaller ad stills, 3-up */}
      {rest.length > 0 && (
        <section
          className="gf-pad-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '40px 44px 60px',
          }}
        >
          <div
            className="gf-cols-2-md"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '50px 28px',
            }}
          >
            {rest.map((p) => (
              <ProductCard key={p.num} p={p} size="md" />
            ))}
          </div>
        </section>
      )}

      {/* Gift set banner */}
      <section
        className="gf-pad-md"
        style={{
          background: 'var(--sumi)',
          color: 'var(--paper)',
          padding: '70px 44px',
        }}
      >
        <div
          className="gf-stack-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}
        >
          <div>
            <div className="mono" style={{ color: 'var(--gold-2)' }}>
              Gift sets · 四花盒
            </div>
            <h2
              className="tc"
              style={{
                fontSize: 52,
                fontWeight: 400,
                letterSpacing: 8,
                margin: '14px 0',
                color: 'var(--paper)',
              }}
            >
              四方之花
            </h2>
            <div
              className="italic"
              style={{
                fontSize: 22,
                color: 'var(--gold-2)',
                maxWidth: 420,
              }}
            >
              Four seasonal bars in a cedar box, sealed with red wax and a hand-written tag.
            </div>
            <button
              style={{
                marginTop: 32,
                background: 'var(--gold-1)',
                color: 'var(--sumi)',
                padding: '14px 28px',
                fontFamily: '"DM Mono", monospace',
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Shop gift sets · NT$1,480
            </button>
          </div>
          <IllGiftBox ratio="4/3" label="four-bar cedar gift box" />
        </div>
      </section>
    </div>
  );
}
