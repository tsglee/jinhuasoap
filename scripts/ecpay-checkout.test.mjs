// ECPay 金流 checkout endpoint integration test — drives the REAL worker
// fetch handler with a mock env + KV. No network, no wrangler.
//   node scripts/ecpay-checkout.test.mjs
//
// 用 ECPay 公開測試金鑰跑完整一趟：config gating → checkout 產收銀台表單
// （後端重算金額、防前端竄改）→ payment-callback 驗 MAC、標記 paid、idempotent。
import worker, { paymentCheckMacValue } from '../src/worker.js';

let failed = 0;
const check = (label, cond, extra) => {
  if (!cond) failed++;
  console.log(`${cond ? 'PASS ✅' : 'FAIL ❌'}  ${label}`);
  if (!cond && extra !== undefined) console.log('   ', extra);
};

function makeKV() {
  const m = new Map();
  return {
    _m: m,
    async put(k, v) { m.set(k, v); },
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async list({ prefix }) {
      return { keys: [...m.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })) };
    },
  };
}

const TEST_KEYS = {
  ECPAY_MERCHANT_ID: '2000132',
  ECPAY_PAYMENT_HASH_KEY: '5294y06JbISpM5x9',
  ECPAY_PAYMENT_HASH_IV: 'v77hoKGq4kWxNNIS',
  ECPAY_PAYMENT_BASE_URL: 'https://payment-stage.ecpay.com.tw',
  PUBLIC_BASE_URL: 'https://jinhuasoap.com',
};

const ORDER = {
  name: '林小花',
  email: 'test@example.com',
  phone: '0912345678',
  shipMethod: '7-11 店到店',
  shipKind: 'store',
  subType: 'UNIMARTC2C',
  storeId: '131386',
  storeName: '測試門市',
  recipientName: '林小花',
  address: '',
  note: '',
  cart: [
    { num: '壹', zh: '海棠潤澤 · 碧玉', lat: 'Begonia', qty: 2, price: 280 },
    { num: '參', zh: '綠豆清芳 · 澡豆', lat: 'Mung', qty: 1, price: 260 },
  ],
  total: 999, // 故意送錯 —— 後端應以購物籃重算的 820 為準
};

const post = (path, body) =>
  new Request(`https://jinhuasoap.com${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
const form = (path, params) =>
  new Request(`https://jinhuasoap.com${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params).toString(),
  });

// 1. config gating
{
  const on = await (await worker.fetch(new Request('https://jinhuasoap.com/api/config'), { ...TEST_KEYS })).json();
  check('config.paymentEnabled = true when keys set', on.paymentEnabled === true, on);
  const off = await (await worker.fetch(new Request('https://jinhuasoap.com/api/config'), { ECPAY_MERCHANT_ID: '2000132' })).json();
  check('config.paymentEnabled = false when no keys', off.paymentEnabled === false, off);
}

// 2. checkout gated off → notConfigured, writes nothing
{
  const kv = makeKV();
  const j = await (await worker.fetch(post('/api/checkout', ORDER), { ECPAY_MERCHANT_ID: '2000132', ORDER_FALLBACK: kv })).json();
  check('checkout notConfigured when payment off', j.ok === false && j.notConfigured === true, j);
  check('checkout writes NOTHING to KV when off', kv._m.size === 0, kv._m.size);
}

// 3. checkout on → valid AIO form + anti-tamper amount + persisted pending order
let orderId;
let kv;
{
  kv = makeKV();
  const j = await (await worker.fetch(post('/api/checkout', ORDER), { ...TEST_KEYS, ORDER_FALLBACK: kv })).json();
  check('checkout ok:true', j.ok === true, j);
  check('action → stage AIO endpoint', j.action === 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5', j.action);
  check('orderId shaped JH-YYMMDD-XXXX', /^JH-\d{6}-[A-Z0-9]{4}$/.test(j.orderId || ''), j.orderId);
  const f = j.fields || {};
  check('TotalAmount = server-recomputed 820 (ignores client 999)', f.TotalAmount === '820', f.TotalAmount);
  check('ReturnURL → payment-callback', f.ReturnURL === 'https://jinhuasoap.com/api/payment-callback', f.ReturnURL);
  check('ClientBackURL → order tracking', f.ClientBackURL === `https://jinhuasoap.com/order/${j.orderId}`, f.ClientBackURL);
  check('EncryptType = 1 (SHA256)', String(f.EncryptType) === '1', f.EncryptType);
  check('CheckMacValue in form verifies', f.CheckMacValue === paymentCheckMacValue(f, TEST_KEYS.ECPAY_PAYMENT_HASH_KEY, TEST_KEYS.ECPAY_PAYMENT_HASH_IV), f.CheckMacValue);
  check('pending order written to KV', kv._m.size === 1, kv._m.size);
  const stored = JSON.parse([...kv._m.values()][0]);
  check('KV order pending + amount 820', stored.payment?.status === 'pending' && stored.payment?.amount === 820, stored.payment);
  orderId = j.orderId;
}

// 4. payment-callback rejects a bad MAC
{
  const r = await worker.fetch(form('/api/payment-callback', { MerchantTradeNo: '0'.repeat(12), RtnCode: '1', CheckMacValue: 'WRONG' }), { ...TEST_KEYS, ORDER_FALLBACK: kv });
  check('callback rejects bad CheckMacValue', r.status === 400 && (await r.text()).startsWith('0|'));
}

// 5. payment-callback success → paid + idempotent (no RESEND/LOGISTICS keys → fulfill does no network)
{
  const p = {
    MerchantID: '2000132',
    MerchantTradeNo: orderId.replace(/-/g, ''),
    RtnCode: '1',
    RtnMsg: '交易成功',
    TradeNo: '2504091234567890',
    TradeAmt: '820',
    PaymentDate: '2026/07/03 12:00:00',
    PaymentType: 'Credit_CreditCard',
  };
  p.CheckMacValue = paymentCheckMacValue(p, TEST_KEYS.ECPAY_PAYMENT_HASH_KEY, TEST_KEYS.ECPAY_PAYMENT_HASH_IV);
  const env = { ...TEST_KEYS, ORDER_FALLBACK: kv };
  const t1 = await (await worker.fetch(form('/api/payment-callback', p), env)).text();
  check('callback success → 1|OK', t1 === '1|OK', t1);
  const s1 = JSON.parse([...kv._m.values()][0]);
  check('order marked paid', s1.payment?.status === 'paid', s1.payment);
  check('fulfilledAt stamped', !!s1.fulfilledAt, s1.fulfilledAt);
  const first = s1.fulfilledAt;
  await (await worker.fetch(form('/api/payment-callback', p), env)).text(); // replay
  const s2 = JSON.parse([...kv._m.values()][0]);
  check('replay idempotent (fulfilledAt unchanged)', s2.fulfilledAt === first, { first, second: s2.fulfilledAt });
}

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checkout integration checks passed ✅');
process.exit(failed ? 1 : 0);
