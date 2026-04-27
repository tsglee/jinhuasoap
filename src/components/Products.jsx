// 02 十二花 — full product catalogue. Each item is a detailed card with
// a photo, spec sheet, weight + price + add-to-cart, and a stable anchor
// id so About-page cards can deep-link to a specific product.
import { useEffect, useState } from 'react';
import { Divider } from './GoldenFlower.jsx';
import { useCart } from '../state/CartContext.jsx';
import { TierNotice } from './TierNotice.jsx';

// ── Product data ────────────────────────────────────────────────────────
// Source: 金花樓 · 十二花神官網系列文案 V7 (PDF) + jh_mk wiki for the
// 6 items the PDF only ships ingredients for. Items where the wiki/draft
// inferences fill the gaps are marked `draft: true` so the page can flag
// them for the owner to review.
//
// `price` and `weight` are placeholders pending owner confirmation; the
// buy button shows 「待定」 when price is 0 to avoid a misleading checkout.
const PRODUCTS = [
  // 【一、花神守護系列 — 修復與潤澤】
  {
    num: '壹',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '海棠修復 · 碧玉',
    subtitle: '瓊崖海棠修復皂',
    photo: '/images/products/海棠.png',
    weight: '105 g',
    price: 380,
    skinType: '敏弱肌、痘痘困擾肌、瑕疵受損肌。',
    coreIngredients:
      '有機初榨瓊崖海棠油、義大利純橄欖油、精製乳油木果脂、甜杏仁油、蓖麻油、椰子油、棕櫚油。',
    oilProfile:
      '瓊崖海棠油提供強大修復力，乳油木果脂則如厚實護盾鎖住水分。',
    washFeel:
      '帶有深沉的木質堅果香，泡泡細緻如凝脂，沖水後皮膚呈現溫潤的玉石光澤。',
    draft: false,
  },
  {
    num: '貳',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '槐花蜜潤 · 霧蜜',
    subtitle: '霧峰蜜 · 潤玉皂',
    photo: '/images/products/霧蜜.png',
    weight: '105 g',
    price: 300,
    skinType: '極乾燥肌、熟齡肌。',
    coreIngredients:
      '霧峰特產純蜂蜜、義大利純橄欖油、乳油木果脂、甜杏仁油、蓖麻油、椰子油、棕櫚油。',
    oilProfile:
      '取霧峰百花蜜之精萃，蜂蜜中的天然保濕因子能深度抓水。',
    washFeel:
      '泡沫綿密如奶，洗時釋出淡淡蜜香；沖水後肌膚飽滿溫潤、不留澀感。',
    draft: true,
  },
  {
    num: '參',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '綠豆清芳 · 澡豆',
    subtitle: '潤玉澡豆',
    photo: '/images/products/綠豆.png',
    weight: '100 g',
    price: 280,
    skinType: '角質肥厚、膚色暗沉、粉刺肌。',
    coreIngredients:
      '研磨綠豆粉、本草萃取粉、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '研磨綠豆粉細微如塵，輕拭即代謝表皮；本草萃取粉舒緩深層粉刺。',
    washFeel:
      '泡沫綿密帶涼，沖水後肌膚透出本來的明亮，毛孔感覺被收束。',
    draft: true,
  },
  {
    num: '肆',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '藍蝶清瑩 · 蝶豆',
    subtitle: '蝶豆花美顏皂',
    photo: '/images/products/蝶豆花.png',
    weight: '100 g',
    price: 320,
    skinType: '疲憊暗沉肌、輕熟齡肌、需加強代謝之肌膚。',
    coreIngredients:
      '蝶豆花浸泡橄欖油、甜杏仁油、米糠油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '蝶豆花富含花青素，具備極佳的抗氧化與防禦能力，能提亮肌膚並延緩老化。',
    washFeel:
      '泡泡輕盈細膩，洗臉時如同沐浴在清晨的藍色星光下，洗後肌膚感覺清透、充滿彈性與光澤。',
    draft: false,
  },

  // 【二、花韻時節系列 — 風土與暖心】
  {
    num: '伍',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '金盞舒緩 · 長金',
    subtitle: '長濱金 · 舒膚皂',
    photo: '/images/products/金盞花.png',
    weight: '110 g',
    price: 320,
    skinType: '敏感肌、過冬乾燥肌、走過幾道刺激的肌膚。',
    coreIngredients:
      '長濱金盞花浸泡油、義大利純橄欖油、乳油木果脂、甜杏仁油、椰子油、棕櫚油。',
    oilProfile:
      '長濱金盞花於橄欖油中浸泡四週，金盞花烯與類黃酮慢慢釋進油裡；乳油木果脂接在後面把修護鎖住。',
    washFeel:
      '泡沫溫潤敦厚，洗時帶一抹金，洗完肌膚柔軟、不緊繃。',
    draft: true,
  },
  {
    num: '陸',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '稻花暖心 · 星米',
    subtitle: '三星米 · 暖心皂',
    photo: '/images/products/大米.png',
    weight: '105 g',
    price: 300,
    skinType: '偏乾肌、季節敏感肌、需要溫和滋潤者。',
    coreIngredients:
      '宜蘭三星米漿、米糠油、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '三星米漿入皂時為水相替換；米糠油富含 γ-穀維素與生育三烯酚 ── 給肌膚溫潤的米光。',
    washFeel:
      '泡沫綿密如奶，洗後留一層淡淡米香，肌膚像剛收的新米般柔潤。',
    draft: true,
  },
  {
    num: '柒',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '杜康醉月 · 酒粕',
    subtitle: '醉月酒粕',
    photo: '/images/products/酒粕.png',
    weight: '105 g',
    price: 320,
    skinType: '暗沉肌、紋路深沉肌、需要光澤感的成熟肌。',
    coreIngredients:
      '清酒酒粕精華、米糠油、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '酒粕含氨基酸與酵素，能溫和代謝表皮；米糠油與橄欖油底層厚實滋潤。',
    washFeel:
      '泡沫細緻如絹，洗時有微微酒香，洗後肌膚透出絲絨般的光澤。',
    draft: true,
  },
  {
    num: '捌',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '桂月流金 · 桂花',
    subtitle: '桂花潤膚皂',
    photo: '/images/products/桂花.png',
    weight: '105 g',
    price: 360,
    skinType: '一般肌、追求香氣的日常肌、皮膚薄者。',
    coreIngredients:
      '桂花浸泡橄欖油、甜杏仁油、米糠油、乳油木果脂、椰子油。',
    oilProfile:
      '桂花浸泡橄欖油四週，金秋桂花的甜香釋進油裡；甜杏仁油與米糠油給薄皮肌的親膚滋潤。',
    washFeel:
      '泡沫輕盈，洗時是一抹清淡的桂花蜜香，洗後肌膚柔軟、香氣留半日。',
    draft: true,
  },

  // 【三、花露淨髮餅系列 — 髮沐】
  {
    num: '玖',
    series: '花露淨髮餅',
    seriesNote: '髮沐',
    zh: '山茶淨髮',
    subtitle: '植萃髮餅',
    photo: '/images/products/山茶淨髮.png',
    weight: '90 g',
    price: 320,
    skinType: '一般髮質、敏感頭皮、追求弱酸護髮者。',
    coreIngredients: '山茶花油、蠶絲蛋白萃取液、玉米澱粉、甘油。',
    oilProfile:
      'pH 5–6 弱酸貼近頭皮原生酸鹼；蠶絲蛋白多胜肽順毛鱗片、洗後不澀不打結；玉米澱粉扛起成型。',
    washFeel:
      '起泡細密，山茶花淡香；洗後髮絲滑順、頭皮清爽。',
    draft: true,
  },
  {
    num: '拾',
    series: '花露淨髮餅',
    seriesNote: '髮沐',
    zh: '茉莉沐膚',
    subtitle: '香氛沐浴餅',
    photo: '/images/products/茉莉沐膚.png',
    weight: '100 g',
    price: 320,
    skinType: '全身肌、夏日想要香氛體驗者。',
    coreIngredients: '茉莉花萃取粉、玉米澱粉、甘油。',
    oilProfile:
      '弱酸表活組合 (pH 5–6) 為骨架；茉莉花萃取粉是真實花瓣磨成粉，不是精油不是香精；遇水才釋出香氣。',
    washFeel:
      '泡沫綿密細緻，洗時香氣慢慢開出來；洗後全身微微涼意，茉莉香留一夜。',
    draft: true,
  },

  // 【四、全能日常系列 — 一皂到底】
  {
    num: '拾壹',
    series: '全能日常',
    seriesNote: '一皂到底',
    zh: '一皂到底 · 清爽款',
    subtitle: '水仙清透',
    photo: '/images/products/一皂到底清爽2.png',
    weight: '110 g',
    price: 320,
    skinType: '運動後肌、油脂分泌旺、夏日想清爽過一天的全身肌。',
    coreIngredients: '荷荷芭油、薰衣草粉、植物性甘油。',
    oilProfile:
      '荷荷芭脂肪酸結構與肌膚皮脂幾乎同源，運動後油脂分泌變多時反而能起平衡；薰衣草粉走粉類植萃路線，量壓低位。',
    washFeel:
      '起泡輕盈快速，徹底洗去汗與油；沖完全身有微涼的草本氣息。',
    draft: true,
  },
  {
    num: '拾貳',
    series: '全能日常',
    seriesNote: '一皂到底',
    zh: '一皂到底 · 保濕款',
    subtitle: '待命名',
    photo: '/images/products/一皂到底保濕.png',
    weight: '110 g',
    price: 320,
    skinType: '乾燥肌、季節敏感肌、追求一塊到底滋潤者。',
    coreIngredients: '成分待補。',
    oilProfile: '原料特性待補。',
    washFeel: '洗感感受待補。',
    draft: true,
  },
];

// ── Sub-components ──────────────────────────────────────────────────────

// AVIF → WebP → WebP-fallback chain. Same pattern as About's SoapPhoto
// and Process's IngredientPhoto (kept inline to avoid a cross-module dance).
function ProductPhoto({ src, alt, ratio = '4/5' }) {
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

function DraftBadge() {
  return (
    <span
      className="mono"
      style={{
        display: 'inline-block',
        marginTop: 12,
        padding: '3px 10px',
        fontSize: 10,
        letterSpacing: 3,
        color: 'var(--gold-3)',
        border: '1px solid var(--gold-3)',
        textTransform: 'uppercase',
      }}
    >
      文案草稿 · DRAFT
    </span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 18,
        alignItems: 'baseline',
        padding: '10px 0',
        borderBottom: '1px dotted var(--ink-15)',
      }}
    >
      <dt
        className="mono"
        style={{
          color: 'var(--gold-3)',
          fontSize: 10,
          letterSpacing: 3,
          minWidth: 70,
        }}
      >
        {label}
      </dt>
      <dd
        className="tc"
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.85,
          letterSpacing: 1,
          color: 'var(--sumi)',
        }}
      >
        {value}
      </dd>
    </div>
  );
}

function BuyBlock({ p }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const priceDisplay = p.price > 0 ? `NT$ ${p.price}` : 'NT$ 待定';
  const cartProduct = {
    num: p.num,
    zh: p.zh,
    lat: p.subtitle,
    price: p.price,
    photo: p.photo,
    tone: 'warm',
  };
  const handle = () => {
    if (p.price <= 0) return;
    add(cartProduct, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };
  return (
    <div
      style={{
        marginTop: 28,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div>
        <span className="mono" style={{ color: 'var(--gold-3)', fontSize: 11, letterSpacing: 2 }}>
          {p.weight}
        </span>
        <span style={{ margin: '0 10px', color: 'var(--ink-15)' }}>·</span>
        <span
          className="italic"
          style={{ fontSize: 22, color: 'var(--red)', letterSpacing: 1 }}
        >
          {priceDisplay}
        </span>
      </div>
      <button
        type="button"
        onClick={handle}
        disabled={p.price <= 0}
        aria-label={`加入購物籃 · ${p.zh}`}
        className="tc"
        style={{
          padding: '10px 18px',
          fontSize: 13,
          letterSpacing: 3,
          cursor: p.price <= 0 ? 'not-allowed' : 'pointer',
          opacity: p.price <= 0 ? 0.5 : 1,
          color: justAdded ? 'var(--red)' : 'var(--sumi)',
          background: justAdded ? 'var(--paper)' : 'transparent',
          border: `1px solid ${justAdded ? 'var(--red)' : 'var(--sumi)'}`,
          transition: 'color 200ms, background 200ms, border-color 200ms',
          fontFamily: 'inherit',
        }}
      >
        {justAdded ? '已加入購物籃 ✓' : p.price > 0 ? '加入購物籃' : '取貨約訂'}
      </button>
    </div>
  );
}

function ProductDetailCard({ p, flip }) {
  return (
    <div
      id={`product-${p.num}`}
      className="gf-stack-md"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 60,
        alignItems: 'flex-start',
        padding: '60px 0',
        borderTop: '1px dashed var(--ink-15)',
        scrollMarginTop: 100,
      }}
    >
      <div style={{ order: flip ? 2 : 1, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: -14,
            border: '1px solid var(--gold-3)',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
        <ProductPhoto src={p.photo} alt={`${p.zh} · ${p.subtitle}`} ratio="4/5" />
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
            fontSize: p.num.length > 1 ? 16 : 24,
            fontWeight: 500,
            letterSpacing: p.num.length > 1 ? 0 : 2,
            border: '2px solid var(--gold-1)',
          }}
        >
          {p.num}
        </div>
      </div>
      <div style={{ order: flip ? 1 : 2 }}>
        <div className="mono" style={{ color: 'var(--red)', fontSize: 11, letterSpacing: 3 }}>
          {p.series}系列 · {p.seriesNote}
        </div>
        <h3
          className="tc"
          style={{
            fontSize: 44,
            fontWeight: 500,
            letterSpacing: 6,
            margin: '12px 0 6px',
            color: 'var(--sumi)',
          }}
        >
          {p.zh}
        </h3>
        <div
          className="tc"
          style={{ fontSize: 17, color: 'var(--gold-3)', letterSpacing: 4 }}
        >
          {p.subtitle}
        </div>
        {p.draft && <DraftBadge />}
        <Divider />
        <dl style={{ margin: '14px 0 0', display: 'grid', gap: 0 }}>
          <DetailRow label="適合膚質" value={p.skinType} />
          <DetailRow label="核心成分" value={p.coreIngredients} />
          <DetailRow label="原料特性" value={p.oilProfile} />
          <DetailRow label="洗感感受" value={p.washFeel} />
        </dl>
        <BuyBlock p={p} />
      </div>
    </div>
  );
}

function SeriesSection({ name, note, products }) {
  return (
    <section
      className="gf-pad-md"
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '60px 44px 20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div className="mono" style={{ color: 'var(--red)', fontSize: 11, letterSpacing: 4 }}>
          {note}
        </div>
        <h2
          className="tc"
          style={{
            fontSize: 48,
            fontWeight: 400,
            letterSpacing: 14,
            margin: '14px 0 6px',
            color: 'var(--sumi)',
          }}
        >
          {name}
        </h2>
      </div>
      {products.map((p, i) => (
        <ProductDetailCard key={p.num} p={p} flip={i % 2 === 1} />
      ))}
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────

export function Products() {
  // Group products by series, preserving PDF order
  const seriesOrder = ['花神守護', '花韻時節', '花露淨髮餅', '全能日常'];
  const seriesNote = {
    花神守護: '修復與潤澤',
    花韻時節: '風土與暖心',
    花露淨髮餅: '髮沐',
    全能日常: '一皂到底',
  };
  const grouped = seriesOrder.map((name) => ({
    name,
    note: seriesNote[name],
    products: PRODUCTS.filter((p) => p.series === name),
  }));

  // Deep-link from About: when an About card sets gf_jump_product in
  // sessionStorage and switches to this tab, scroll to that product.
  useEffect(() => {
    try {
      const target = sessionStorage.getItem('gf_jump_product');
      if (!target) return;
      sessionStorage.removeItem('gf_jump_product');
      const el = document.getElementById(`product-${target}`);
      if (!el) return;
      // Defer past App's `selectTab` window.scrollTo(0). 350 ms reliably
      // lands after the synchronous scroll-reset and React's commit.
      window.setTimeout(() => {
        el.scrollIntoView({ block: 'start', behavior: 'auto' });
      }, 350);
    } catch {
      // sessionStorage may be unavailable; ignore.
    }
  }, []);

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
            maxWidth: 600,
            margin: '26px auto 0',
            fontSize: 16,
            lineHeight: 1.85,
            color: 'var(--sumi)',
          }}
        >
          十二款配方分作四個系列 ── 花神守護、花韻時節、花露淨髮餅、全能日常。
          每一塊皆冷製手壓、熟成四十二日，以未漂紙包裹，押上金花朱印。
        </div>
      </section>

      <TierNotice variant="static" />

      {/* Series sections */}
      {grouped.map((s) => (
        <SeriesSection key={s.name} {...s} />
      ))}
    </div>
  );
}
