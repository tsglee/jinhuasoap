// Products tab — editorial ad-style hero stills, each bar shot like a print ad
import { useState } from 'react';
import { IllProductHero, IllGiftBox } from './Illustrations.jsx';
import { useCart } from '../state/CartContext.jsx';

const PRODUCTS = [
  {
    zh: '玫瑰', lat: 'Rosa centifolia', price: 380, tone: 'rose', num: 'I',
    notes: ['花香', '柔和', '醇厚'], family: '花香',
    pitchZh: '千片花瓣，\n只為一方溫柔。',
    staging: 'bowl',
    familyZh: '橄欖家族為主 · 溫潤滑順', allergens: '無', usage: '洗手 · 洗身', wash: '約 40–60 次',
  },
  {
    zh: '艾草', lat: 'Artemisia argyi', price: 320, tone: 'cool', num: 'II',
    notes: ['溫厚', '草本', '安定'], family: '草本',
    pitchZh: '端午掛艾，\n古法入皂。',
    staging: 'kraft',
    familyZh: '橄欖家族 · 艾草浸油 · 溫潤中帶草本', allergens: '無', usage: '全身', wash: '約 40–60 次',
  },
  {
    zh: '柚子', lat: 'Citrus grandis', price: 300, tone: 'warm', num: 'III',
    notes: ['清爽', '明亮', '潔淨'], family: '柑橘',
    pitchZh: '中秋的那顆柚子，\n留下了皮。',
    staging: 'bowl',
    familyZh: '橄欖與椰子平衡 · 清爽起泡', allergens: '柑橘精油（具光敏性）', usage: '洗身（建議夜用，避免直接日曬）', wash: '約 40–60 次',
  },
  {
    zh: '茶花', lat: 'Camellia japonica', price: 400, tone: 'deep', num: 'IV',
    notes: ['滋養', '亮澤'], family: '花香',
    pitchZh: '山茶之油，\n百年宮中之秘。',
    staging: 'kraft',
    familyZh: '茶花油家族為主 · 滋養滑順', allergens: '無', usage: '洗臉 · 洗身', wash: '約 45–65 次',
  },
  {
    zh: '薑黃', lat: 'Curcuma longa', price: 340, tone: 'warm', num: 'V',
    notes: ['溫暖', '辛香', '金黃'], family: '辛香',
    pitchZh: '一寸金色，\n洗去倦容。',
    staging: 'bowl',
    familyZh: '橄欖家族 · 薑黃粉 · 清爽帶溫', allergens: '初用皂泡或染淺黃（會退）', usage: '洗身', wash: '約 40–60 次',
  },
  {
    zh: '桂花', lat: 'Osmanthus fragrans', price: 420, tone: 'warm', num: 'VI',
    notes: ['蜜甜', '柔和', '慵懶'], family: '花香',
    pitchZh: '秋風送來桂花，\n我們把它洗進皮膚。',
    staging: 'bowl',
    familyZh: '橄欖家族 · 桂花浸油 · 溫潤花香', allergens: '無', usage: '洗手 · 洗身', wash: '約 40–60 次',
  },
  {
    zh: '白梅', lat: 'Prunus mume', price: 360, tone: 'cool', num: 'VII',
    notes: ['清冽', '青翠', '亞麻'], family: '花香',
    pitchZh: '雪未落，\n梅先開。',
    staging: 'kraft',
    familyZh: '橄欖與甜杏仁 · 清透滑順', allergens: '堅果類（甜杏仁油）', usage: '全身', wash: '約 40–60 次',
  },
  {
    zh: '檜木', lat: 'Chamaecyparis obtusa', price: 440, tone: 'deep', num: 'VIII',
    notes: ['木質', '沉靜', '幽靜'], family: '木質',
    pitchZh: '阿里山的清晨，\n一塊帶回家。',
    staging: 'bowl',
    familyZh: '橄欖家族 · 檜木精油 · 溫潤沉靜', allergens: '針葉類精油（孕期請留意）', usage: '洗身', wash: '約 45–65 次',
  },
  {
    zh: '蜂蜜', lat: 'Mel crudum', price: 380, tone: 'warm', num: 'IX',
    notes: ['醇和', '甘甜', '醇厚'], family: '食材',
    pitchZh: '苗栗蜂場的一滴，\n留在你手心。',
    staging: 'kraft',
    familyZh: '橄欖家族 · 苗栗蜂蜜 · 溫潤保濕', allergens: '蜂製品（一歲以下嬰兒請避免）', usage: '洗臉 · 洗手 · 洗身', wash: '約 40–60 次',
  },
  {
    zh: '海鹽', lat: 'Sal maris', price: 320, tone: 'cool', num: 'X',
    notes: ['俐落', '去角質'], family: '礦物',
    pitchZh: '臺南的鹽，\n鹹在肌膚。',
    staging: 'bowl',
    familyZh: '椰子油家族為主 · 臺南鹽田海鹽 · 清潔稍高', allergens: '無', usage: '洗身（去角質日用）', wash: '約 30–45 次（快熔）',
  },
  {
    zh: '青苔', lat: 'Hypnum cupressiforme', price: 360, tone: 'deep', num: 'XI',
    notes: ['泥土氣', '沉靜', '林息'], family: '大地',
    pitchZh: '林中濕氣，\n一塊涼意。',
    staging: 'kraft',
    familyZh: '橄欖家族 · 礦泥 · 溫潤收斂', allergens: '無', usage: '洗身', wash: '約 40–60 次',
  },
  {
    zh: '金盞花', lat: 'Calendula officinalis', price: 360, tone: 'warm', num: 'XII',
    notes: ['撫慰', '金黃'], family: '花香',
    pitchZh: '金色花瓣，\n安撫每一吋。',
    staging: 'bowl',
    familyZh: '橄欖家族 · 金盞花浸油 · 溫潤撫慰', allergens: '菊科植物（極少數敏感者請留意）', usage: '洗臉 · 洗手 · 洗身（敏感肌友善）', wash: '約 40–60 次',
  },
];

// Small price/meta footer shared by all cards
function ProductMeta({ p, size = 'md' }) {
  const big = size === 'lg';
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add(p, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

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
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
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
              fontSize: big ? 16 : 13,
              color: 'var(--gold-3)',
            }}
          >
            {p.lat}
          </span>
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.notes.map((n) => (
            <span
              key={n}
              className="tc"
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: 'var(--gold-3)',
                border: '1px solid var(--ink-15)',
                padding: '3px 10px',
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
          onClick={handleAdd}
          aria-live="polite"
          className="tc"
          style={{
            marginTop: 8,
            fontSize: 13,
            letterSpacing: 3,
            color: justAdded ? 'var(--red)' : 'var(--sumi)',
            borderBottom: `1px solid ${justAdded ? 'var(--red)' : 'var(--sumi)'}`,
            paddingBottom: 2,
            transition: 'color 200ms, border-color 200ms',
          }}
        >
          {justAdded ? '已加入 ✓' : '加入購物籃'}
        </button>
      </div>
    </div>
  );
}

function ProductInfo({ p, compact = false }) {
  if (!p.familyZh && !p.allergens && !p.usage && !p.wash) return null;
  const rows = [
    ['家族', p.familyZh],
    ['使用', p.usage],
    ['可洗', p.wash],
    ['敏原', p.allergens],
  ].filter(([, v]) => v);
  return (
    <div className="edu-block" style={{ marginTop: compact ? 14 : 18 }}>
      <span className="edu-label">透明資訊</span>
      <dl
        style={{
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          rowGap: 6,
          columnGap: 14,
        }}
      >
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'contents' }}>
            <dt
              className="mono"
              style={{
                color: 'var(--gold-3)',
                fontSize: 9,
                letterSpacing: 2,
                lineHeight: 1.85,
              }}
            >
              {k}
            </dt>
            <dd
              className="tc"
              style={{
                margin: 0,
                fontSize: compact ? 12.5 : 13,
                lineHeight: 1.7,
                letterSpacing: 0.5,
                color: 'var(--ink-60)',
              }}
            >
              {v}
            </dd>
          </div>
        ))}
      </dl>
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
        wordmark={p.zh}
      />
      <ProductMeta p={p} size={size} />
      <ProductInfo p={p} compact={size !== 'lg'} />
    </div>
  );
}

export function Products() {
  const [filter, setFilter] = useState('全部');
  const families = ['全部', '花香', '草本', '柑橘', '辛香', '木質', '大地', '礦物', '食材'];
  const filtered = filter === '全部' ? PRODUCTS : PRODUCTS.filter((p) => p.family === filter);

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
          十二花 · 本舍之皂
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
          className="tc"
          style={{
            fontSize: 18,
            color: 'var(--gold-3)',
            letterSpacing: 6,
          }}
        >
          一月一方 · 一皂一花
        </div>
        <div
          className="tc"
          style={{
            maxWidth: 560,
            margin: '26px auto 0',
            fontSize: 16,
            lineHeight: 1.85,
            color: 'var(--sumi)',
          }}
        >
          十二款配方，對應十二個月。每一塊皆冷製手壓、熟成四十二日，以未漂紙包裹、封以紅蠟。
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
              className="tc"
              style={{
                padding: '8px 16px',
                fontSize: 13,
                letterSpacing: 3,
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
        <div className="tc" style={{ color: 'var(--ink-60)', fontSize: 13, letterSpacing: 2 }}>
          共 {filtered.length} 款 · 依序排列
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
                  wordmark={hero.zh}
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
                    本月之花 · № {hero.num}
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
                      style={{ marginLeft: 14, fontSize: 16, color: 'var(--gold-3)' }}
                    >
                      {hero.lat}
                    </span>
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      color: 'var(--ink-60)',
                      lineHeight: 1.7,
                      maxWidth: 600,
                      letterSpacing: 1,
                    }}
                  >
                    {hero.notes.join(' · ')}
                  </div>
                  <div style={{ maxWidth: 600, marginTop: 4 }}>
                    <ProductInfo p={hero} />
                  </div>
                </div>
                <button
                  className="tc"
                  style={{
                    background: 'var(--red)',
                    color: 'var(--gold-2)',
                    padding: '14px 28px',
                    fontSize: 14,
                    letterSpacing: 4,
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
              禮盒 · 四花盒
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
              className="tc"
              style={{
                fontSize: 18,
                color: 'var(--gold-2)',
                maxWidth: 420,
                lineHeight: 1.85,
                letterSpacing: 2,
              }}
            >
              四款應季之皂，裝入檜木禮盒，以紅蠟封緘、附手書卡片。
            </div>
            <button
              className="tc"
              style={{
                marginTop: 32,
                background: 'var(--gold-1)',
                color: 'var(--sumi)',
                padding: '14px 28px',
                fontSize: 14,
                letterSpacing: 4,
              }}
            >
              選購禮盒 · NT$1,480
            </button>
          </div>
          <IllGiftBox ratio="4/3" label="四花檜木禮盒" />
        </div>
      </section>
    </div>
  );
}
