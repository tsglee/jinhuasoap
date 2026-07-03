// ECPay CheckMacValue regression test — imports the REAL worker functions.
//   node scripts/ecpay-mac.test.mjs
//
// 金流 SHA256：對照 ECPay 官方文件的 worked example（唯一權威的正確性證明
// —— 我們算出來的雜湊必須跟 ECPay 公布的一字不差）。
// 物流 MD5：deterministic lock，確保共用的字串前處理沒被改壞。
import { paymentCheckMacValue, checkMacValue } from '../src/worker.js';

let failed = 0;
function eq(label, got, want) {
  const ok = got === want;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS ✅' : 'FAIL ❌'}  ${label}`);
  if (!ok) {
    console.log(`   want: ${want}`);
    console.log(`   got : ${got}`);
  }
}

// ── ECPay 官方文件金流 worked example（SHA256, EncryptType=1）──
eq(
  '金流 SHA256 — ECPay 官方 worked example',
  paymentCheckMacValue(
    {
      ChoosePayment: 'ALL',
      EncryptType: 1,
      ItemName: 'Apple iphone 15',
      MerchantID: '3002607',
      MerchantTradeDate: '2023/03/12 15:30:23',
      MerchantTradeNo: 'ecpay20230312153023',
      PaymentType: 'aio',
      ReturnURL: 'https://www.ecpay.com.tw/receive.php',
      TotalAmount: 30000,
      TradeDesc: '促銷方案',
    },
    'pwFHCqoQZGmho4w6',
    'EkRm7iFT261dpevs',
  ),
  '6C51C9E6888DE861FD62FB1DD17029FC742634498FD813DC43D4243B5685B840',
);

// CheckMacValue 欄位本身要被排除（不參與運算）。帶進去也不該改變結果。
eq(
  '金流 SHA256 — 忽略既有 CheckMacValue 欄位',
  paymentCheckMacValue(
    {
      ChoosePayment: 'ALL',
      EncryptType: 1,
      ItemName: 'Apple iphone 15',
      MerchantID: '3002607',
      MerchantTradeDate: '2023/03/12 15:30:23',
      MerchantTradeNo: 'ecpay20230312153023',
      PaymentType: 'aio',
      ReturnURL: 'https://www.ecpay.com.tw/receive.php',
      TotalAmount: 30000,
      TradeDesc: '促銷方案',
      CheckMacValue: 'SHOULD_BE_IGNORED',
    },
    'pwFHCqoQZGmho4w6',
    'EkRm7iFT261dpevs',
  ),
  '6C51C9E6888DE861FD62FB1DD17029FC742634498FD813DC43D4243B5685B840',
);

// ── 物流 MD5 deterministic lock（共用前處理沒被改壞）──
eq(
  '物流 MD5 — deterministic',
  checkMacValue(
    { MerchantID: '2000132', MerchantTradeNo: 'Test123', TotalAmount: 100 },
    '5294y06JbISpM5x9',
    'v77hoKGq4kWxNNIS',
  ),
  '68CBBE27E5E7614FDDE3387CF77DAFA8',
);

console.log(failed ? `\n${failed} test(s) failed` : '\nAll tests passed');
process.exit(failed ? 1 : 0);
