// 海棠修復 data, composed from PRODUCTS[0] plus prototype-only fields
// (fiveAxis, ingredientTiers, ritual). Marked as PROTOTYPE — values are
// guesstimates aligned with brand voice, NOT verified formula data.
// 老闆娘 reviews and decides what stays.

import { PRODUCTS } from '../../data/products.js';

const base = PRODUCTS[0];

export const haitang = {
  ...base,
  // PROTOTYPE — 5-axis radar values (0..5). Guess based on positioning
  // (修復 / 保濕 強、起泡 中、香氣 木質、溫和度 強). Owner can adjust.
  fiveAxis: [
    { label: '修復', value: 5 },
    { label: '保濕', value: 5 },
    { label: '起泡', value: 3 },
    { label: '香氣', value: 4 },
    { label: '溫和', value: 5 },
  ],
  // Hierarchical split of coreIngredients into three editorial tiers.
  // Not arbitrary — based on the order they appear in products.js and
  // the oilProfile narrative (海棠 + 乳油木果脂 = 主役).
  ingredientTiers: {
    lead: ['有機初榨瓊崖海棠油'],
    support: ['義大利純橄欖油', '精製乳油木果脂'],
    base: ['甜杏仁油', '蓖麻油', '椰子油', '棕櫚油'],
  },
  // Skin types split for chip-style display.
  skinTypeChips: ['敏弱肌', '痘痘困擾肌', '瑕疵受損肌'],
  // PROTOTYPE — short ritual line, hand-written feel.
  ritual: '用於潔顏 · 早晚一次 · 起泡靜置三十秒再沖。',
};
