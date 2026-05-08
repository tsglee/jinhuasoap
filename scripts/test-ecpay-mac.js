// Sanity test for ECPay 物流 C2C CheckMacValue.
// Reference values come from ECPay 文件 sample（測試用，公開）：
//   https://developers.ecpay.com.tw/?p=8194
// Use the test merchant credentials shown in their docs.
//
// Run:  node scripts/test-ecpay-mac.js
import { checkMacValue, orderIdToTradeNo } from '../src/worker.js';

let pass = 0;
let fail = 0;
function assert(label, actual, expected) {
  if (actual === expected) {
    console.log(`✓ ${label}`);
    pass++;
  } else {
    console.error(`✗ ${label}\n  expected: ${expected}\n  actual:   ${actual}`);
    fail++;
  }
}

// Test 1: orderIdToTradeNo strips dashes
assert(
  'orderIdToTradeNo strips dash',
  orderIdToTradeNo('JH-260508-XYZ4'),
  'JH260508XYZ4',
);

// Test 2: CheckMacValue with ECPay 文件 sample (官方測試 case)
// HashKey: 5294y06JbISpM5x9
// HashIV:  v77hoKGq4kWxNNIS
// 這組是 ECPay 物流 C2C 文件 SDK sample 提供的範例值（金流 docs sample，
// 物流 MD5 算法跟金流 SHA256 不同；下面這組是物流 MD5 我自己算的、用來
// 確認 algorithm 跑得起來、跨呼叫一致）。實際上線後第一筆真單跑成功才
// 是真正驗證。
{
  const hashKey = '5294y06JbISpM5x9';
  const hashIV = 'v77hoKGq4kWxNNIS';
  const params = {
    MerchantID: '2000132',
    MerchantTradeNo: 'jhsoap20260508',
    AllPayLogisticsID: '1234567',
  };
  const mac = checkMacValue(params, hashKey, hashIV);
  console.log(`  MAC for sample params: ${mac}`);
  // Algorithm sanity: same input → same output (deterministic)
  const mac2 = checkMacValue(params, hashKey, hashIV);
  assert('CheckMacValue is deterministic', mac, mac2);
  // MAC must be 32-char uppercase hex (MD5)
  assert(
    'CheckMacValue is 32-char uppercase hex',
    /^[A-F0-9]{32}$/.test(mac),
    true,
  );
  // Param order must not affect result (sort is internal)
  const reordered = {
    AllPayLogisticsID: '1234567',
    MerchantTradeNo: 'jhsoap20260508',
    MerchantID: '2000132',
  };
  assert(
    'CheckMacValue is order-independent',
    checkMacValue(reordered, hashKey, hashIV),
    mac,
  );
  // CheckMacValue itself in params must be excluded
  const withMac = { ...params, CheckMacValue: 'IGNORED' };
  assert(
    'CheckMacValue excludes itself from input',
    checkMacValue(withMac, hashKey, hashIV),
    mac,
  );
}

// Test 3: 含中文 GoodsName 的 case（URL-encode 過程不出錯）
{
  const hashKey = '5294y06JbISpM5x9';
  const hashIV = 'v77hoKGq4kWxNNIS';
  const params = {
    MerchantID: '2000132',
    GoodsName: '金花樓手工皂訂單',
  };
  const mac = checkMacValue(params, hashKey, hashIV);
  assert(
    'CheckMacValue handles Chinese GoodsName',
    /^[A-F0-9]{32}$/.test(mac),
    true,
  );
}

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
