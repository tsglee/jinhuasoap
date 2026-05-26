// Shared product catalogue.
// - Products.jsx (02 十二花) renders the full detail cards (spec sheet,
//   add-to-cart, etc.) from this list.
// - About/Mobile.jsx renders a compact 2-col grid of all 12 at the bottom
//   of the mobile About page.
// - ProductDetail.jsx renders a single product by `slug` (URL like
//   /products/haitang-xiufu).
// - CategoryListing.jsx filters by `concerns` (URL like
//   /products/concern/sensitive).
//
// Required fields:
//   slug      — lowercase latin pinyin, used as the URL path segment
//   concerns  — array of cluster slugs from CONCERNS below (TA grouping
//               for ad campaigns; a product can belong to multiple)
//
// Optional fields:
//   batchDate — 本批熟成日（YYYY-MM-DD 或自由文字）。設了會在 02 十二花顯示
//   「本批熟成」一行；不設則 row 自動隱藏。透明度品牌信任、買家清楚知道
//   皂的新鮮度。

// 品牌正式系列（5 個）。每個產品 carries `concerns` 對到下面 slug；
// 廣告 campaign + 02 十二花的 ClusterChips + CategoryListing 都 key
// off this list。原舊敘事 series（花神守護 / 花韻時節 / 花露淨髮餅 /
// 全能日常）保留在 product detail card 內、品牌調性敘事用。
//
// 系列 ↔ 產品對應（老闆娘 2026-05-22 定案）：
//   nurture 潤澤滋養：海棠 / 霧蜜 / 蝶豆 / 大米
//   fresh   清爽淨膚：金盞 / 綠豆
//   cleanse 全效潔淨：酒粕 / 桂花
//   sport   運動全身：一皂到底 清爽 / 保濕（一塊洗到底）
//   bar     皂餅：山茶淨髮 / 茉莉沐膚（非冷製、surfactant + 玉米澱粉）
export const CONCERNS = [
  { slug: 'nurture', zh: '潤澤滋養', desc: '極致保濕、敏弱、熟齡、極乾' },
  { slug: 'fresh', zh: '清爽淨膚', desc: '夏日、控油、舒緩、提亮' },
  { slug: 'cleanse', zh: '全效潔淨', desc: '日常潔淨、男士刮鬍、香氛' },
  { slug: 'sport', zh: '運動全身', desc: '一塊到底、運動後、家庭日常' },
  { slug: 'bar', zh: '皂餅', desc: '非冷製、surfactant + 玉米澱粉 製' },
];

export const PRODUCTS = [
  // 【一、花神守護系列 — 滋養與柔潤】
  {
    num: '壹',
    slug: 'haitang-biyu',
    concerns: ['nurture'],
    series: '花神守護',
    seriesNote: '滋養與柔潤',
    zh: '海棠潤澤 · 碧玉',
    subtitle: '瓊崖海棠潤膚皂',
    photos: [
      '/images/products/海棠/01.png',
      '/images/products/海棠/02.png',
      '/images/products/海棠/03.png',
      '/images/products/海棠/04.png',
      '/images/products/海棠/05.png',
      '/images/products/海棠/06.png',
      '/images/products/海棠/07.png',
      '/images/products/海棠/08.png',
    ],
    weight: '105 g',
    price: 380,
    skinType: '敏弱肌、易乾肌、熟齡肌與極乾性肌。',
    coreIngredients:
      '有機初榨瓊崖海棠油、義大利純橄欖油、精製乳油木果脂、甜杏仁油、蓖麻油、椰子油、棕櫚油。',
    oilProfile:
      '瓊崖海棠油在法系芳療與傳統草本中，是滋養油的代名詞；乳油木果脂則如厚實護盾鎖住水分。',
    washFeel:
      '帶深沉的木質堅果香，泡泡細緻，沖完肌膚柔軟、不緊不澀。',
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Nurture & soften',
        zh: 'Calophyllum Nurture · Jade',
        subtitle: 'Calophyllum tamanu nurture bar',
        skinType: 'Sensitive, easily-dry, mature, or very dry skin.',
        coreIngredients:
          'Organic cold-pressed tamanu (calophyllum) oil, Italian extra-virgin olive oil, refined shea butter, sweet almond, castor, coconut, palm.',
        oilProfile:
          'Tamanu oil has been called the nourishing oil in French aromatherapy and traditional botanicals; shea butter locks the moisture in like a soft shield.',
        washFeel: 'A deep, woody-nutty scent. Fine lather. After rinsing, skin feels soft, never tight.',
      },
    },
  },
  {
    num: '貳',
    slug: 'wumeng-runyu',
    concerns: ['nurture'],
    series: '花神守護',
    seriesNote: '滋養與柔潤',
    zh: '槐花蜜潤 · 霧蜜',
    subtitle: '霧峰蜜 · 潤玉皂',
    photos: [
      '/images/products/霧蜜/01.png',
      '/images/products/霧蜜/02.png',
      '/images/products/霧蜜/03.png',
      '/images/products/霧蜜/04.png',
      '/images/products/霧蜜/05.png',
      '/images/products/霧蜜/06.png',
    ],
    weight: '105 g',
    price: 300,
    skinType: '極乾燥肌、熟齡肌。',
    coreIngredients:
      '霧峰特產純蜂蜜、義大利純橄欖油、乳油木果脂、甜杏仁油、蓖麻油、椰子油、棕櫚油。',
    oilProfile:
      '取霧峰百花蜜之精萃，蜂蜜帶有天然糖份是肌膚最熟悉的保濕分子。',
    washFeel:
      '泡沫綿密如奶，洗時釋出淡淡蜜香；沖水後肌膚飽滿溫潤、不留澀感。',
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Nurture & soften',
        zh: 'Honey Soothe · Mist',
        subtitle: 'Wufeng honey · soft jade bar',
        skinType: 'Very dry or mature skin.',
        coreIngredients:
          'Pure Wufeng honey, Italian olive oil, shea butter, sweet almond, castor, coconut, palm.',
        oilProfile:
          'Honey carries natural sugars — the moisturising molecules skin knows best.',
        washFeel: 'Creamy milk-like lather with a soft honey scent. After rinsing, skin feels plump and never tight.',
      },
    },
  },
  {
    num: '參',
    slug: 'lvdou-zaodou',
    concerns: ['fresh'],
    series: '花神守護',
    seriesNote: '滋養與柔潤',
    zh: '綠豆清芳 · 澡豆',
    subtitle: '潤玉澡豆',
    photos: [
      '/images/products/綠豆/01.png',
      '/images/products/綠豆/02.png',
      '/images/products/綠豆/03.png',
      '/images/products/綠豆/04.png',
      '/images/products/綠豆/05.png',
      '/images/products/綠豆/06.png',
      '/images/products/綠豆/07.png',
      '/images/products/綠豆/08.png',
    ],
    weight: '100 g',
    price: 280,
    skinType: '角質代謝異常、膚色暗沉、皮脂分泌旺盛之肌膚。',
    coreIngredients:
      '研磨綠豆粉、白芷粉、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '研磨綠豆粉在手工皂中帶點細微的顆粒感，溫和的代謝角質。白芷粉在古方裡常被用來淡化暗沉。',
    washFeel:
      '泡沫綿密帶涼，沖完肌膚清爽明亮，輕微代謝角質，但是肌膚不緊繃。',
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Nurture & soften',
        zh: 'Mung Bean Fresh · Bath Bean',
        subtitle: 'Mung bean cleansing bar',
        skinType: 'Skin with uneven keratin renewal, dull tone, or active sebum.',
        coreIngredients:
          'Ground mung bean powder, angelica dahurica powder, Italian olive oil, shea butter, coconut, palm.',
        oilProfile:
          'Ground mung bean powder gives a fine grain texture, gently turning over keratin. Angelica dahurica powder has long been used in traditional botanicals for dull-tone refining.',
        washFeel: 'Cool, creamy lather. After rinsing, skin feels bright with gentle exfoliation — never tight.',
      },
    },
  },
  {
    num: '肆',
    slug: 'diedou-meiyan',
    concerns: ['nurture'],
    series: '花神守護',
    seriesNote: '滋養與柔潤',
    zh: '藍蝶清瑩 · 蝶豆',
    subtitle: '蝶豆花美顏皂',
    photos: [
      '/images/products/蝶豆花/01.png',
      '/images/products/蝶豆花/02.png',
      '/images/products/蝶豆花/03.png',
      '/images/products/蝶豆花/04.png',
      '/images/products/蝶豆花/05.png',
      '/images/products/蝶豆花/06.png',
    ],
    weight: '100 g',
    price: 320,
    skinType: '疲憊暗沉肌、輕熟齡肌、需加強代謝之肌膚。',
    coreIngredients:
      '蝶豆花浸泡橄欖油、甜杏仁油、米糠油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '蝶豆花富含花青素，具備極佳的抗氧化與防禦能力 ── 維持肌膚的彈性。',
    washFeel:
      '泡泡輕盈細膩，洗完肌膚清透、有彈性與光澤。',
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Nurture & soften',
        zh: 'Butterfly Pea Brighten · Indigo',
        subtitle: 'Butterfly pea brightening bar',
        skinType: 'Tired, dull, or early-maturing skin in need of renewal.',
        coreIngredients:
          'Butterfly pea infused olive oil, sweet almond, rice bran, shea butter, coconut, palm.',
        oilProfile:
          'Butterfly pea is rich in anthocyanins — strong antioxidant defense that brightens and supports skin elasticity.',
        washFeel: 'Light, refined lather. After rinsing, skin feels clear, supple, and luminous.',
      },
    },
  },

  // 【二、花韻時節系列 — 風土與暖心】
  {
    num: '伍',
    slug: 'jinzhan-shufu',
    concerns: ['fresh'],
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '金盞舒緩 · 長金',
    subtitle: '長濱金 · 舒膚皂',
    photos: [
      '/images/products/金盞花/01.png',
      '/images/products/金盞花/02.png',
      '/images/products/金盞花/03.png',
      '/images/products/金盞花/04.png',
      '/images/products/金盞花/05.png',
      '/images/products/金盞花/06.png',
      '/images/products/金盞花/07.png',
      '/images/products/金盞花/08.png',
    ],
    weight: '110 g',
    price: 320,
    skinType: '敏感肌、換季乾燥肌、走過幾道刺激的肌膚。',
    coreIngredients:
      '長濱金盞花浸泡油、義大利純橄欖油、乳油木果脂、甜杏仁油、椰子油、棕櫚油。',
    oilProfile:
      '長濱金盞花於橄欖油中浸泡四週，金盞花烯與類黃酮慢慢釋進油裡；乳油木果脂接在後面把潤澤鎖住。',
    washFeel:
      '泡沫溫潤敦厚，洗完肌膚柔軟、不緊繃。',
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Calendula Calm · Changbin Gold',
        subtitle: 'Changbin calendula soothing bar',
        skinType: 'Sensitive skin, season-dry, or skin recovering from irritation.',
        coreIngredients:
          'Changbin calendula infused olive oil, Italian olive oil, shea butter, sweet almond, coconut, palm.',
        oilProfile:
          'Changbin calendula steeped in olive oil for four weeks releases calendulene and flavonoids; shea butter follows behind to lock the nourishment in.',
        washFeel: 'Warm, full-bodied lather. After rinsing, skin feels soft and never tight.',
      },
    },
  },
  {
    num: '陸',
    slug: 'dami-nuanxin',
    concerns: ['nurture'],
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '稻花暖心 · 星米',
    subtitle: '三星米 · 暖心皂',
    photos: [
      '/images/products/大米/01.png',
      '/images/products/大米/02.png',
      '/images/products/大米/03.png',
      '/images/products/大米/04.png',
      '/images/products/大米/05.png',
      '/images/products/大米/06.png',
    ],
    weight: '105 g',
    price: 300,
    skinType: '偏乾肌、季節敏感肌、需要溫和滋潤者。',
    coreIngredients:
      '宜蘭三星米漿、米糠油、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '三星米漿入皂時為水相替換；米糠油富含 γ-穀維素與生育三烯酚 ── 給肌膚溫潤的滋養。',
    washFeel:
      '泡沫綿密如奶，洗後留一層淡淡米香，肌膚柔潤、不緊繃。',
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Rice Warmth · Sanxing',
        subtitle: 'Sanxing rice warming bar',
        skinType: 'Slightly dry skin, seasonally sensitive, needing gentle nourishment.',
        coreIngredients:
          'Yilan Sanxing rice milk, rice bran oil, Italian olive oil, shea butter, coconut, palm.',
        oilProfile:
          'Sanxing rice milk replaces the water phase; rice bran oil is rich in γ-oryzanol and tocotrienols — gentle, deep nourishment.',
        washFeel: 'Milky creamy lather. After rinsing, skin keeps a soft hint of rice scent and feels soft, never tight.',
      },
    },
  },
  {
    num: '柒',
    slug: 'jiupo-zuiyue',
    concerns: ['cleanse'],
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '杜康醉月 · 酒粕',
    subtitle: '醉月酒粕',
    photos: [
      '/images/products/酒粕/01.png',
      '/images/products/酒粕/02.png',
      '/images/products/酒粕/03.png',
      '/images/products/酒粕/04.png',
      '/images/products/酒粕/05.png',
      '/images/products/酒粕/06.png',
    ],
    weight: '105 g',
    price: 320,
    skinType: '暗沉肌、紋路深沉肌、需要光澤感的成熟肌。',
    coreIngredients:
      '清酒酒粕精華、米糠油、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '酒粕含氨基酸與酵素，能溫和代謝表皮；米糠油與橄欖油底層厚實滋潤。',
    washFeel:
      '泡沫細緻，洗時有微微酒香，洗後肌膚柔軟、有光澤。',
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Sake Lees Glow · Moonlight',
        subtitle: 'Moonlight sake lees bar',
        skinType: 'Dull or mature skin, fine lines, in need of luminosity.',
        coreIngredients:
          'Sake lees essence, rice bran oil, Italian olive oil, shea butter, coconut, palm.',
        oilProfile:
          'Sake lees contain amino acids and enzymes that gently turn over surface keratin; rice bran and olive oils build a rich nourishing base.',
        washFeel: 'Fine lather with a soft sake scent. After rinsing, skin feels soft and luminous.',
      },
    },
  },
  {
    num: '捌',
    slug: 'guihua-runfu',
    concerns: ['cleanse'],
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '桂月流金 · 桂花',
    subtitle: '桂花潤膚皂',
    photos: [
      '/images/products/桂花/01.png',
      '/images/products/桂花/02.png',
      '/images/products/桂花/03.png',
      '/images/products/桂花/04.png',
      '/images/products/桂花/05.png',
      '/images/products/桂花/06.png',
    ],
    weight: '105 g',
    price: 360,
    skinType: '一般肌、追求香氣的日常肌、皮膚薄者。',
    coreIngredients:
      '桂花浸泡橄欖油、甜杏仁油、米糠油、乳油木果脂、椰子油。',
    oilProfile:
      '桂花浸泡橄欖油四週，金秋桂花的甜香釋進油裡；甜杏仁油與米糠油給薄皮肌的親膚滋潤。',
    washFeel:
      '泡沫輕盈，洗時是一抹清淡的桂花蜜香，洗後肌膚柔軟、香氣留半日。',
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Osmanthus Autumn · Gold',
        subtitle: 'Osmanthus moisturizing bar',
        skinType: 'Normal skin, thin or delicate skin, those who love a soft fragrance.',
        coreIngredients:
          'Osmanthus infused olive oil, sweet almond, rice bran, shea butter, coconut.',
        oilProfile:
          'Osmanthus blossoms steeped in olive oil for four weeks release autumn sweetness; sweet almond and rice bran oils nourish thin or delicate skin.',
        washFeel: 'Light lather with a soft osmanthus-honey scent. After rinsing, skin feels soft and the scent lingers for hours.',
      },
    },
  },

  // 【三、花露淨髮餅系列 — 髮沐】
  {
    num: '玖',
    slug: 'shancha-fa',
    concerns: ['bar'],
    series: '花露淨髮餅',
    seriesNote: '髮沐',
    zh: '山茶淨髮',
    subtitle: '植萃髮餅',
    photos: [
      '/images/products/山茶淨髮/01.png',
      '/images/products/山茶淨髮/02.png',
      '/images/products/山茶淨髮/03.png',
      '/images/products/山茶淨髮/04.png',
      '/images/products/山茶淨髮/05.png',
      '/images/products/山茶淨髮/06.png',
    ],
    weight: '90 g',
    price: 320,
    skinType: '一般髮質、敏感頭皮、追求弱酸護髮者。',
    coreIngredients: '山茶花油、蠶絲蛋白萃取液、玉米澱粉、甘油。',
    oilProfile:
      'pH 5–6 弱酸貼近頭皮原生酸鹼；蠶絲蛋白多胜肽順毛鱗片、洗後不澀不打結；玉米澱粉扛起成型。',
    washFeel:
      '起泡細密，山茶花淡香；洗後髮絲滑順、頭皮清爽。',
    translations: {
      en: {
        series: 'Botanical Hair Bars',
        seriesNote: 'Hair & shower',
        zh: 'Camellia Hair Bar',
        subtitle: 'Botanical hair-cleansing bar',
        skinType: 'All hair types, sensitive scalps, those seeking mild-acid hair care.',
        coreIngredients: 'Camellia oil, silk protein extract, corn starch, glycerin.',
        oilProfile:
          'pH 5–6 close to scalp\'s natural acidity; silk protein peptides smooth the cuticle for tangle-free hair; corn starch holds the bar shape.',
        washFeel: 'Fine lather with a soft camellia scent. After rinsing, hair feels smooth and scalp clean.',
      },
    },
  },
  {
    num: '拾',
    slug: 'moli-mufu',
    concerns: ['bar'],
    series: '花露淨髮餅',
    seriesNote: '髮沐',
    zh: '茉莉沐膚',
    subtitle: '香氛沐浴餅',
    photos: [
      '/images/products/茉莉沐膚/01.png',
      '/images/products/茉莉沐膚/02.png',
      '/images/products/茉莉沐膚/03.png',
      '/images/products/茉莉沐膚/04.png',
      '/images/products/茉莉沐膚/05.png',
      '/images/products/茉莉沐膚/06.png',
    ],
    weight: '100 g',
    price: 320,
    skinType: '全身肌、夏日想要香氛體驗者。',
    coreIngredients: '茉莉花萃取粉、玉米澱粉、甘油。',
    oilProfile:
      '弱酸表活組合 (pH 5–6) 為骨架；茉莉花萃取粉是真實花瓣磨成粉。遇水釋出香氣。',
    washFeel:
      '泡沫綿密細緻，洗時香氣慢慢開出來；洗後全身微微涼意，茉莉香留一夜。',
    translations: {
      en: {
        series: 'Botanical Hair Bars',
        seriesNote: 'Hair & shower',
        zh: 'Jasmine Body Bar',
        subtitle: 'Fragrant body-cleansing bar',
        skinType: 'Whole-body skin, especially for summer fragrance lovers.',
        coreIngredients: 'Jasmine extract powder, corn starch, glycerin.',
        oilProfile:
          'Mild-acid surfactant blend (pH 5–6) as backbone; jasmine extract is real petals milled into powder, releasing scent on contact with water.',
        washFeel: 'Fine creamy lather. The scent unfolds slowly during the wash, leaving a cool, jasmine-lingering finish overnight.',
      },
    },
  },

  // 【四、全能日常系列 — 一皂到底】
  {
    num: '拾壹',
    slug: 'yizao-qingshuang',
    concerns: ['sport'],
    series: '全能日常',
    seriesNote: '一皂到底',
    zh: '一皂到底 · 清爽款',
    subtitle: '水仙清透',
    photos: [
      '/images/products/一皂到底清爽/01.png',
      '/images/products/一皂到底清爽/02.png',
      '/images/products/一皂到底清爽/03.png',
      '/images/products/一皂到底清爽/04.png',
      '/images/products/一皂到底清爽/05.png',
      '/images/products/一皂到底清爽/06.png',
    ],
    weight: '110 g',
    price: 320,
    skinType: '運動後肌、油脂分泌旺、夏日想清爽過一天的全身肌。',
    coreIngredients: 'SCI、玉米澱粉、薰衣草粉、PCG、甜杏仁油、甘油、APG、蠶絲蛋白液、1,2-己二醇。',
    oilProfile:
      '弱酸表活組合 (pH 5–6) 為骨架；甜杏仁油補上親膚的油性、蠶絲蛋白讓沖洗後肌膚有絲緞感；薰衣草粉是真實乾燥花磨成粉、走粉類植萃路線、量壓在低位。',
    washFeel:
      '起泡輕盈快速，徹底洗去汗與油；沖完全身有微涼的草本氣息。',
    translations: {
      en: {
        series: 'All-Day Essentials',
        seriesNote: 'One bar, head to toe',
        zh: 'All-Day · Cool',
        subtitle: 'Narcissus crisp',
        skinType: 'Active skin, oily skin, anyone seeking a refreshing summer wash.',
        coreIngredients: 'SCI, corn starch, lavender powder, PCG, sweet almond, glycerin, APG, silk protein, 1,2-hexanediol.',
        oilProfile:
          'Mild-acid surfactant blend (pH 5–6) as backbone; sweet almond brings skin-friendly oils, silk protein leaves a silky finish, lavender powder is real dried flowers gently dosed.',
        washFeel: 'Quick light lather that cuts through sweat and oil. After rinsing, a cool herbal note lingers on skin.',
      },
    },
  },
  {
    num: '拾貳',
    slug: 'yizao-baoshi',
    concerns: ['sport'],
    series: '全能日常',
    seriesNote: '一皂到底',
    zh: '一皂到底 · 保濕款',
    subtitle: '待命名',
    photos: [
      '/images/products/一皂到底保濕/01.png',
      '/images/products/一皂到底保濕/02.png',
      '/images/products/一皂到底保濕/03.png',
      '/images/products/一皂到底保濕/04.png',
      '/images/products/一皂到底保濕/05.png',
      '/images/products/一皂到底保濕/06.png',
    ],
    weight: '110 g',
    price: 320,
    skinType: '乾燥肌、季節敏感肌、追求一塊到底滋潤者。',
    coreIngredients: 'SCI、玉米澱粉、燕麥粉、PCG、荷荷巴油、甘油、APG、蠶絲蛋白液、1,2-己二醇。',
    oilProfile: '弱酸表活組合 (pH 5–6) 為骨架；燕麥粉帶有 β-葡聚醣的肌膚親和性；荷荷巴油與蠶絲蛋白接著補上潤澤與絲緞感。',
    washFeel: '泡沫綿密溫和，沖完全身保水、不緊繃。',
    translations: {
      en: {
        series: 'All-Day Essentials',
        seriesNote: 'One bar, head to toe',
        zh: 'All-Day · Hydrate',
        subtitle: 'To be named',
        skinType: 'Dry skin, seasonally sensitive, seeking a one-bar hydrating wash.',
        coreIngredients: 'SCI, corn starch, oat powder, PCG, jojoba oil, glycerin, APG, silk protein, 1,2-hexanediol.',
        oilProfile: 'Mild-acid surfactant blend (pH 5–6) as backbone; oat powder for skin-friendly β-glucan; jojoba oil and silk protein add nourishment and silkiness.',
        washFeel: 'Soft, gentle lather. After rinsing, skin feels nourished and never tight.',
      },
    },
  },
];

// 深度欄位 — 五力分布（潤澤／保濕／起泡／香氣／溫和度，0-5）+ 適膚 chip +
// whyForYou（日常語感的「這款是為你準備的嗎」段落）+ ritual 一行儀式。
// 2026-05 由 tsglee 參照各款 oilProfile / skinType / 系列定位下筆、老闆娘審
// 過再放上線。五力值不是配方公式比例、是給使用者一眼讀懂的「這款偏向哪」
// 示意。whyForYou 以本舍小記的口吻寫，em-dash「──」分句、第二人稱、
// 觀察先於聲明。
export const PRODUCT_DEPTH = {
  'haitang-biyu': {
    fiveAxis: [
      { label: '潤澤', value: 5 },
      { label: '保濕', value: 5 },
      { label: '起泡', value: 3 },
      { label: '香氣', value: 4 },
      { label: '溫和', value: 5 },
    ],
    skinTypeChips: ['敏弱肌', '易乾肌', '熟齡肌'],
    whyForYou:
      '如果你的肌膚換季就容易發紅、戴口罩悶悶的、或試太多新東西開始不舒服，海棠就是來陪它慢慢回到日常的那一塊。瓊崖海棠油在法系芳療裡是滋養油的代名詞，配上乳油木果脂厚實打底，洗起來不刺、不澀；用一陣子，會找回肌膚自己的節奏。',
    ritual: '用於潔顏 · 早晚一次 · 起泡後輕柔搓揉再沖、輕拍乾後立刻上保濕水。',
  },
  'wumeng-runyu': {
    fiveAxis: [
      { label: '潤澤', value: 4 },
      { label: '保濕', value: 5 },
      { label: '起泡', value: 3 },
      { label: '香氣', value: 4 },
      { label: '溫和', value: 5 },
    ],
    skinTypeChips: ['極乾燥肌', '熟齡肌'],
    whyForYou:
      '如果你的臉一過中午就乾、笑起來眼尾紋路特別明顯、或冬天起床覺得緊繃 ── 那是肌膚抓不住水了。霧峰純蜂蜜含天然糖份是肌膚最熟悉的保濕分子，能把水分穩穩黏在角質層裡。一邊洗一邊聞到淡淡蜜香，沖完臉是飽滿的、不是緊的，那就是你需要的洗感。',
    ritual: '用於潔顏 · 早晚一次 · 起泡細細按摩臉頰與眼周再沖。',
  },
  'lvdou-zaodou': {
    fiveAxis: [
      { label: '潤澤', value: 3 },
      { label: '保濕', value: 3 },
      { label: '起泡', value: 4 },
      { label: '香氣', value: 3 },
      { label: '溫和', value: 3 },
    ],
    skinTypeChips: ['角質肥厚肌', '膚色暗沉肌', '粉刺肌'],
    whyForYou:
      '如果你的鼻翼、額頭油脂分泌旺盛、上妝時覺得不服貼 ── 那多半是角質代謝偏快、皮脂偏多。細緻的研磨綠豆粉洗的時候一點點推開，帶來溫和的角質代謝感。連續用一兩週，肌膚會清爽一些。',
    ritual: '用於潔顏 · 早晚一次 · 起泡輕拍 T 字部位再沖。',
  },
  'diedou-meiyan': {
    fiveAxis: [
      { label: '潤澤', value: 4 },
      { label: '保濕', value: 4 },
      { label: '起泡', value: 3 },
      { label: '香氣', value: 3 },
      { label: '溫和', value: 4 },
    ],
    skinTypeChips: ['疲憊暗沉肌', '輕熟齡肌', '需加強代謝者'],
    whyForYou:
      '如果你最近覺得肌膚「沒精神」── 早上鏡子裡看自己灰灰的，或開始注意到細紋慢慢冒出來，蝶豆花就是補抗氧化這一塊的。花青素的防禦力配上甜杏仁油的親膚滋潤 ── 透過溫和的方式讓肌膚維持透亮和彈性。',
    ritual: '用於潔顏 · 早晚一次 · 起泡後以指腹打圈按摩、再沖洗。',
  },
  'jinzhan-shufu': {
    fiveAxis: [
      { label: '潤澤', value: 4 },
      { label: '保濕', value: 5 },
      { label: '起泡', value: 3 },
      { label: '香氣', value: 3 },
      { label: '溫和', value: 5 },
    ],
    skinTypeChips: ['敏感肌', '換季乾燥肌', '走過刺激肌'],
    whyForYou:
      '如果你的肌膚最近敏感得很 ── 換季就紅、用個新東西就刺、暖氣一開就脫皮，那金盞花就是為這狀況準備的。長濱金盞花在橄欖油裡浸足四週，慢慢釋出金盞花烯與類黃酮；洗起來是有重量、有溫度的。給肌膚一段安靜的時間，自己會回穩。',
    ritual: '用於潔顏 · 早晚一次 · 輕柔按摩、避開正在發炎處再沖。',
  },
  'dami-nuanxin': {
    fiveAxis: [
      { label: '潤澤', value: 3 },
      { label: '保濕', value: 4 },
      { label: '起泡', value: 3 },
      { label: '香氣', value: 3 },
      { label: '溫和', value: 5 },
    ],
    skinTypeChips: ['偏乾肌', '季節敏感肌', '溫和滋潤者'],
    whyForYou:
      '如果你的肌膚平時還好、但季節一換就鬧脾氣 ── 微乾、偶爾發紅、不想要太滋潤的厚膏，大米皂是中庸的選擇。宜蘭三星米漿打進皂裡，米糠油給溫和不負擔的油脂；洗起來像奶一樣綿，沖完臉是放鬆的，沒有過油、也沒有過乾的拉扯感。',
    ritual: '用於潔顏 · 早晚一次 · 起泡後輕柔搓揉再沖。',
  },
  'jiupo-zuiyue': {
    fiveAxis: [
      { label: '潤澤', value: 4 },
      { label: '保濕', value: 4 },
      { label: '起泡', value: 3 },
      { label: '香氣', value: 4 },
      { label: '溫和', value: 4 },
    ],
    skinTypeChips: ['暗沉肌', '紋路深沉肌', '成熟肌'],
    whyForYou:
      '如果你已經過了那個用任何東西都會發光的年紀 ── 鏡子裡看自己會想「怎麼最近沒甚麼光澤」、或粉底蓋不住的灰沉感越來越明顯，酒粕的氨基酸與酵素就是來幫忙溫和代謝的。它不會像果酸那樣猛、是像季節換班、慢慢轉。早晚一次、用滿一個月，光澤感會慢慢顯出來。',
    ritual: '用於潔顏 · 早晚一次 · 起泡後輕柔搓揉再沖。',
  },
  'guihua-runfu': {
    fiveAxis: [
      { label: '潤澤', value: 3 },
      { label: '保濕', value: 4 },
      { label: '起泡', value: 3 },
      { label: '香氣', value: 5 },
      { label: '溫和', value: 4 },
    ],
    skinTypeChips: ['一般肌', '日常追香者', '皮膚薄者'],
    whyForYou:
      '如果你的肌膚平和、但你想要一個「會記得你」的洗感 ── 那種洗完還留一抹香、自己聞到會笑的，桂花就是這樣的存在。它不是濃郁的、是淡淡的，像秋日午後窗邊飄過的那種。皮膚薄敏感的也可以用 ── 配方裡的甜杏仁油與米糠油，是為親膚設計的。',
    ritual: '用於潔顏 · 早晚一次 · 起泡聞香再沖、香氣會留半日。',
  },
  'shancha-fa': {
    fiveAxis: [
      { label: '潤澤', value: 3 },
      { label: '保濕', value: 4 },
      { label: '起泡', value: 5 },
      { label: '香氣', value: 4 },
      { label: '溫和', value: 5 },
    ],
    skinTypeChips: ['一般髮質', '敏感頭皮', '弱酸護髮者'],
    whyForYou:
      '如果你的頭皮在換洗髮精時容易癢、或頭髮洗完總覺得乾澀打結 ── 試試弱酸性的洗髮餅。pH 5–6 跟頭皮原生的酸鹼一致、不像鹼性洗髮會把毛鱗片打開。蠶絲蛋白順毛鱗片、山茶花油給髮絲一抹光澤；用一兩週你會發現吹乾後的順度不一樣了。',
    ritual: '濕髮起泡 · 指腹揉至頭皮 · 一瓢冷水沖淨、毛鱗片會服貼。',
  },
  'moli-mufu': {
    fiveAxis: [
      { label: '潤澤', value: 2 },
      { label: '保濕', value: 3 },
      { label: '起泡', value: 5 },
      { label: '香氣', value: 5 },
      { label: '溫和', value: 4 },
    ],
    skinTypeChips: ['全身肌', '夏日香氛者'],
    whyForYou:
      '如果你不只想洗乾淨、還想讓整個浴室香起來 ── 茉莉沐膚是夏天的儀式。真實茉莉花瓣磨成粉、遇水才釋香，不是合成香精那種尖銳。全身用一塊、邊洗邊深呼吸，洗完肌膚還會留一夜的茉莉香 ── 那是一個讓你願意期待沖澡的味道。',
    ritual: '全身搓泡 · 留香三秒讓花瓣釋出 · 溫水沖淨。',
  },
  'yizao-qingshuang': {
    fiveAxis: [
      { label: '潤澤', value: 2 },
      { label: '保濕', value: 3 },
      { label: '起泡', value: 5 },
      { label: '香氣', value: 3 },
      { label: '溫和', value: 4 },
    ],
    skinTypeChips: ['運動後肌', '油性肌', '夏日清爽者'],
    whyForYou:
      '如果你下班洗澡只想趕快搞定、或運動完一身汗黏 ── 清爽款就是為快速、徹底、不囉嗦設計的。一塊洗頭洗臉洗全身、起泡快、沖水也快。弱酸的表活組合 (pH 5–6) 配上甜杏仁油與蠶絲蛋白，洗完不緊、肌膚帶絲緞般的乾爽感。',
    ritual: '全身搓泡 · 洗淨汗與油 · 沖完即可，不需後續滋潤。',
  },
  'yizao-baoshi': {
    fiveAxis: [
      { label: '潤澤', value: 3 },
      { label: '保濕', value: 5 },
      { label: '起泡', value: 4 },
      { label: '香氣', value: 3 },
      { label: '溫和', value: 4 },
    ],
    skinTypeChips: ['乾燥肌', '季節敏感肌', '一塊到底者'],
    whyForYou:
      '如果你欣賞「一塊到底」的方便、但又需要保濕力 ── 這款保濕版就是給你的。配方以弱酸表活為骨架、燕麥粉與荷荷巴油補上潤澤；早晚一塊洗頭洗臉洗全身，不挑膚況。',
    ritual: '全身搓泡 · 細細塗抹乾燥處 · 留香沖淨。',
  },
};
