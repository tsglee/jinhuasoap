// 節氣 × 十二花 — 24 個節氣各配一款本舍之皂 + 一句話（零維護、自動輪替）。
//
// - 日期用傳統近似值（每年會飄 ±1 天；這是氛圍功能，不是天文台）。
// - `num` 對應 src/data/products.js 的產品編號；找不到時前端自動退回常備皂。
// - 句子是品牌語氣的「宜」，講心境不講功效（化妝品法規紅線）。
// - 老闆娘想改哪一節氣的句子或選皂，直接改這個檔即可。
export const SOLAR_TERMS = [
  { from: '01-06', name: '小寒', num: '拾貳', line: '一年最冷前，洗得溫潤一點。' },
  { from: '01-20', name: '大寒', num: '壹', line: '大寒將盡，春天就在後頭。' },
  { from: '02-04', name: '立春', num: '貳', line: '春寒未退，先把水潤留住。' },
  { from: '02-19', name: '雨水', num: '壹', line: '雨水潤物，也洗去一身冬燥。' },
  { from: '03-06', name: '驚蟄', num: '肆', line: '萬物初醒，洗一個輕盈的開始。' },
  { from: '03-21', name: '春分', num: '拾', line: '晝夜均分，浴後留一縷花香。' },
  { from: '04-05', name: '清明', num: '伍', line: '換季之際，慢慢地洗、慢慢地緩。' },
  { from: '04-20', name: '穀雨', num: '玖', line: '春雨綿綿，頭髮也想清爽。' },
  { from: '05-06', name: '立夏', num: '參', line: '夏之初，洗去一日微汗。' },
  { from: '05-21', name: '小滿', num: '拾壹', line: '小滿未滿，動一動、沖個痛快。' },
  { from: '06-06', name: '芒種', num: '肆', line: '忙種時節，泡沫輕盈不拖泥。' },
  { from: '06-21', name: '夏至', num: '拾', line: '日最長的一天，夜裡留一點香。' },
  { from: '07-07', name: '小暑', num: '參', line: '暑氣初盛，洗一身清涼。' },
  { from: '07-23', name: '大暑', num: '拾壹', line: '一年最熱，痛快沖澡最好。' },
  { from: '08-08', name: '立秋', num: '捌', line: '秋意未至，桂香先來。' },
  { from: '08-23', name: '處暑', num: '伍', line: '暑氣收尾，日子也想歇一歇。' },
  { from: '09-08', name: '白露', num: '貳', line: '露水初凝，浴後多一分潤。' },
  { from: '09-23', name: '秋分', num: '捌', line: '桂月正中，浴室一角流金。' },
  { from: '10-08', name: '寒露', num: '玖', line: '天涼了，把頭髮也照顧好。' },
  { from: '10-24', name: '霜降', num: '陸', line: '霜降之後，洗澡要暖暖的。' },
  { from: '11-07', name: '立冬', num: '拾貳', line: '冬之始，把滋潤當日常。' },
  { from: '11-22', name: '小雪', num: '陸', line: '小雪無雪，暖湯暖皂。' },
  { from: '12-07', name: '大雪', num: '柒', line: '大雪封門，酒粕正香。' },
  { from: '12-22', name: '冬至', num: '柒', line: '冬至圓夜，湯圓與熱水澡。' },
];

// 回傳今天所在的節氣。陣列按 MM-DD 排序；日期落在第一個節氣（小寒 01-06）
// 之前的年頭幾天，屬於跨年的冬至。
export function getCurrentTerm(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  const mmdd = `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  let current = SOLAR_TERMS[SOLAR_TERMS.length - 1];
  for (const term of SOLAR_TERMS) {
    if (term.from <= mmdd) current = term;
  }
  return current;
}
