// Taiwan mobile normalization & validation.
// 共用於 Cart.jsx（前端輸入欄位）與 worker.js（後端 ECPay 物流建單）。
//
// 規格：09 開頭、共 10 碼純數字。容忍 dashes / spaces / 國際碼
// (+886 / 886) prefix — 統一去掉再驗。失敗回空字串，呼叫端依需求
// fallback 或報錯。

export function normalizeTwMobile(input) {
  if (!input) return '';
  const digits = String(input).replace(/[^\d]/g, '');
  let local = digits;
  if (local.startsWith('886')) local = local.slice(3);
  if (!local.startsWith('0')) local = '0' + local;
  return /^09\d{8}$/.test(local) ? local : '';
}

export function isValidTwMobile(input) {
  return normalizeTwMobile(input) !== '';
}
