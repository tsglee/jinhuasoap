/**
 * Goldenflower Worker — handles non-asset routes (currently just
 * POST /api/order) and falls back to the static site for everything else.
 *
 * Architecture: Cloudflare's Workers Static Assets feature serves the
 * built `dist/` first; this Worker is only invoked when no asset matches,
 * which means we just need to handle our API route(s) and pass everything
 * else back to the asset binding.
 *
 * Bindings (see wrangler.jsonc):
 *   env.ASSETS                 — assets binding (Fetcher)
 *   env.RESEND_API_KEY         — secret, set in Cloudflare dashboard
 *   env.ORDER_TO_EMAIL         — destination email (default: tsghsunlee@gmail.com)
 *   env.ORDER_FROM_EMAIL       — Resend sender (default: onboarding@resend.dev
 *                                until jinhuasoap.com is verified in Resend)
 *   env.ECPAY_LOGISTICS_HASH_KEY  — secret (ECPay 物流 C2C HashKey)
 *   env.ECPAY_LOGISTICS_HASH_IV   — secret
 *   env.ECPAY_LOGISTICS_BASE_URL  — var, default https://logistics.ecpay.com.tw
 *   env.SENDER_NAME / SENDER_PHONE / SENDER_CELL_PHONE — var, 寄件人資料
 *   env.PUBLIC_BASE_URL        — var, 組列印 URL 用，例 https://jinhuasoap.com
 *
 *   金流（ECPay AIO 線上付款）— gated：沒設定這兩個 secret 時 /api/checkout
 *   會回 { notConfigured:true }，前端自動 fallback 到 /api/order（貨到付款）。
 *   兩個都補齊 + 前端才會走線上付款，現行流程完全不受影響。
 *   env.ECPAY_PAYMENT_HASH_KEY — secret（金流 HashKey，與物流的不同組）
 *   env.ECPAY_PAYMENT_HASH_IV  — secret（金流 HashIV）
 *   env.ECPAY_PAYMENT_BASE_URL — var, default https://payment.ecpay.com.tw
 *                                （測試改 https://payment-stage.ecpay.com.tw）
 */
import { createHash } from 'node:crypto';
import { normalizeTwMobile } from './utils/phone.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 法規合規改名後的 301 redirect — 保留舊 URL 的 SEO/外鏈 equity。
    // 2026-05 改名：海棠修復 → 海棠潤澤；concern repair → nurture。
    const REDIRECTS = {
      '/products/haitang-xiufu': '/products/haitang-biyu',
      '/products/concern/repair': '/products/concern/nurture',
    };
    if (REDIRECTS[url.pathname]) {
      return Response.redirect(
        `${url.origin}${REDIRECTS[url.pathname]}${url.search}`,
        301,
      );
    }

    if (url.pathname === '/api/order') {
      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: '不支援此請求方式' }, 405, {
          Allow: 'POST',
        });
      }
      return handleOrder(request, env);
    }

    // 金流：前端先打 /api/checkout。設定齊 → 回 ECPay 收銀台表單；
    // 未設定 → 回 { notConfigured:true }，前端 fallback 到 /api/order。
    if (url.pathname === '/api/checkout') {
      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: '不支援此請求方式' }, 405, {
          Allow: 'POST',
        });
      }
      return handleCheckout(request, env);
    }

    // ECPay 金流付款結果 server-to-server 通知（ReturnURL）。
    if (url.pathname === '/api/payment-callback') {
      return handlePaymentCallback(request, env);
    }

    if (url.pathname === '/api/store-callback') {
      return handleStoreCallback(request);
    }

    if (url.pathname === '/api/logistics-callback') {
      return handleLogisticsCallback(request, env);
    }

    if (url.pathname.startsWith('/api/label/')) {
      const orderId = url.pathname.slice('/api/label/'.length);
      return handleLabel(orderId, env);
    }

    if (url.pathname.startsWith('/api/order/')) {
      const orderId = url.pathname.slice('/api/order/'.length);
      return handleOrderQuery(orderId, env);
    }

    if (url.pathname === '/api/config') {
      // Public client config (MerchantID is non-sensitive — appears in
      // the form payload anyway). Read at runtime so dashboard env
      // changes take effect without rebuilding the JS bundle.
      return jsonResponse(
        {
          ecpayMerchantId:
            env.ECPAY_MERCHANT_ID || env.VITE_ECPAY_MERCHANT_ID || '',
          ecpayEmapUrl:
            env.ECPAY_EMAP_URL ||
            env.VITE_ECPAY_EMAP_URL ||
            'https://logistics.ecpay.com.tw/Express/map',
          // 線上金流是否啟用（兩個 payment secret 都設了才 true）。前端據此
          // 決定結帳文案；未啟用時走貨到付款。
          paymentEnabled: paymentConfigured(env),
        },
        200,
        { 'Cache-Control': 'public, max-age=300' },
      );
    }

    return env.ASSETS.fetch(request);
  },
};

// ECPay 物流選店地圖會把選到的店導回這裡，依使用者點哪個按鈕、有無
// ClientReplyURL 等條件，可能是 POST form-urlencoded 或 GET query string。
// 我們兩種都吃；回一段 HTML：postMessage 給開啟此 popup 的頁面
// （window.opener），再 window.close()。
// 沒做 CheckMacValue 驗證 — callback 不寫入任何訂單狀態，最壞情況
// 使用者拿到錯店號（與手動輸錯同等）。
async function handleStoreCallback(request) {
  const url = new URL(request.url);
  const q = url.searchParams;
  let id = q.get('CVSStoreID') || '';
  let name = q.get('CVSStoreName') || '';
  let addr = q.get('CVSStoreAddress') || q.get('CVSAddress') || '';
  if (request.method === 'POST') {
    try {
      const fd = await request.formData();
      id = id || String(fd.get('CVSStoreID') || '');
      name = name || String(fd.get('CVSStoreName') || '');
      addr = addr || String(fd.get('CVSStoreAddress') || fd.get('CVSAddress') || '');
    } catch {
      // keep query values
    }
  }
  const payload = JSON.stringify({
    type: 'gf:store-picked',
    store: { id, name, addr },
  });
  const html = `<!doctype html>
<meta charset="utf-8">
<title>已選擇門市</title>
<script>
  try { window.opener && window.opener.postMessage(${payload}, '*'); } catch (e) {}
  window.close();
</script>
<body style="font-family:-apple-system,'Noto Serif TC',serif;padding:40px;text-align:center;color:#1a1512;">
  <p>已選擇 ${escapeHtml(name)}（${escapeHtml(id)}）。</p>
  <p style="color:#666;font-size:13px;">可關閉此視窗。</p>
</body>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

// JH-YYMMDD-XXXX — 訂單編號。日期讓 user 一眼看出哪天的單，4 碼隨機
// （base32 字元集去掉 0/O/1/I/L 等易混字）讓同一天多單不會撞號。
// 純運算、不需要儲存；如果某天哪兩單剛好撞了 4 碼（碰撞率 < 1/10⁶），
// 兩封 email 看到的單也不會弄錯，因為 subject 還會帶名字 + 金額。
const ID_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function generateOrderId(date = new Date()) {
  const tz = new Date(date.getTime() + 8 * 60 * 60 * 1000); // GMT+8（台北時區）
  const yymmdd =
    String(tz.getUTCFullYear()).slice(-2) +
    String(tz.getUTCMonth() + 1).padStart(2, '0') +
    String(tz.getUTCDate()).padStart(2, '0');
  const buf = new Uint8Array(4);
  crypto.getRandomValues(buf);
  let suffix = '';
  for (const b of buf) suffix += ID_ALPHABET[b % ID_ALPHABET.length];
  return `JH-${yymmdd}-${suffix}`;
}

async function handleOrder(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: '請求內容格式錯誤' }, 400);
  }

  const errors = validateOrder(payload);
  if (errors.length) {
    return jsonResponse({ ok: false, error: errors.join('；') }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse(
      { ok: false, error: '寄件服務尚未設定，請稍後再試。' },
      500,
    );
  }

  const toEmail = env.ORDER_TO_EMAIL || 'tsghsunlee@gmail.com';
  const fromEmail = env.ORDER_FROM_EMAIL || 'onboarding@resend.dev';
  const {
    name,
    email,
    phone,
    shipMethod,
    shipKind,
    storeId,
    storeName,
    recipientName,
    address,
    note,
    cart,
    total,
  } = payload;
  const ip = request.headers.get('CF-Connecting-IP') || '未知';

  const orderId = generateOrderId();
  const shipFields = { phone, shipMethod, shipKind, storeId, storeName, recipientName, address };
  const subject = `[金花樓] ${orderId} · ${name} · NT$${total}`;

  // ECPay 物流 C2C：if 店到店付款 + 有 HashKey/HashIV，自動建單。回傳的
  // CVSPaymentNo 是寄件編號，列印寄件單時用。subType 從 payload 直送
  // （UNIMARTC2C / FAMIC2C）— 比從中文 shipMethod 推回穩。
  let logistics = null;
  let logisticsError = null;
  if (
    payload.shipKind === 'store' &&
    payload.subType &&
    env.ECPAY_LOGISTICS_HASH_KEY &&
    env.ECPAY_LOGISTICS_HASH_IV
  ) {
    try {
      const result = await createShippingOrder(
        {
          orderId,
          subType: payload.subType,
          total,
          storeId,
          recipientName: recipientName || name,
          recipientPhone: phone,
          recipientEmail: email,
        },
        env,
      );
      if (result.ok) {
        logistics = {
          allPayLogisticsId: result.allPayLogisticsId,
          cvsPaymentNo: result.cvsPaymentNo,
          cvsValidationNo: result.cvsValidationNo,
          subType: payload.subType,
          createdAt: new Date().toISOString(),
        };
      } else {
        logisticsError = result.error || 'ECPay 回傳未知錯誤';
        console.error('ECPay createShippingOrder failed:', logisticsError);
      }
    } catch (err) {
      logisticsError = err.message || String(err);
      console.error('ECPay createShippingOrder threw:', err);
    }
  }

  const labelUrl = logistics ? `${publicBaseUrl(env)}/api/label/${orderId}` : null;
  const html = renderOrderEmailHtml({
    orderId, name, email, note, cart, total, ip, ...shipFields,
    labelUrl, logistics, logisticsError,
  });
  const text = renderOrderEmailText({
    orderId, name, email, note, cart, total, ip, ...shipFields,
    labelUrl, logistics, logisticsError,
  });

  // Fallback log：把訂單 + ECPay logistics info 一起寫進 KV（30 天 TTL）。
  // 列印寄件單 endpoint 從 KV 讀 logistics info，所以寄信成功後**不刪 KV**
  // （TTL 自動過期即可）。沒設 KV binding（local dev / 還沒 wire）也不擋訂單。
  const fallbackKey = `order/${orderId}/${Date.now()}`;
  let fallbackSaved = false;
  if (env.ORDER_FALLBACK) {
    try {
      await env.ORDER_FALLBACK.put(
        fallbackKey,
        JSON.stringify({
          orderId,
          createdAt: new Date().toISOString(),
          ip,
          payload,
          logistics,
          logisticsError,
        }),
        { expirationTtl: 30 * 24 * 60 * 60 },
      );
      fallbackSaved = true;
    } catch (err) {
      console.error('ORDER_FALLBACK put failed', err);
    }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `金花樓 <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return jsonResponse(
        {
          ok: false,
          error: `寄件服務回應錯誤（${res.status}）`,
          detail,
          orderId,
          recoverable: fallbackSaved,
        },
        502,
      );
    }
  } catch (err) {
    return jsonResponse(
      {
        ok: false,
        error: `寄件失敗：${err.message}`,
        orderId,
        recoverable: fallbackSaved,
      },
      502,
    );
  }

  // KV 不刪 — 列印寄件單 endpoint (/api/label/:orderId) 仰賴 KV 讀 logistics
  // info。30 天 TTL 自動失效，影響不大。

  // 寄買家確認信 ── nice-to-have。失敗時只 log、不擋訂單成立（老闆娘信已
  // 寄出 + KV fallback 已寫）。買家信 reply_to 設為老闆娘信箱，買家直接回
  // 信會到 ORDER_TO_EMAIL。
  try {
    const orderUrl = `${publicBaseUrl(env)}/order/${orderId}`;
    const buyerHtml = renderBuyerEmailHtml({
      orderId, orderUrl, name, phone, shipMethod, shipKind, storeName, address, recipientName,
      cart, total,
    });
    const buyerText = renderBuyerEmailText({
      orderId, orderUrl, name, phone, shipMethod, shipKind, storeName, address, recipientName,
      cart, total,
    });
    const buyerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `金花樓 <${fromEmail}>`,
        to: [email],
        reply_to: toEmail,
        subject: `謝謝您的訂購 · 金花樓 #${orderId}`,
        html: buyerHtml,
        text: buyerText,
      }),
    });
    if (!buyerRes.ok) {
      const detail = await buyerRes.text().catch(() => '');
      console.error(`Buyer email failed (non-fatal): ${buyerRes.status} ${detail}`);
    }
  } catch (err) {
    console.error('Buyer email send error (non-fatal)', err);
  }

  return jsonResponse({ ok: true, orderId });
}

function validateOrder(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('請求格式必須為 JSON 物件');
    return errors;
  }
  if (!payload.name || typeof payload.name !== 'string' || payload.name.length > 200) {
    errors.push('請填寫姓名（不超過 200 字）');
  }
  if (
    !payload.email ||
    typeof payload.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    payload.email.length > 200
  ) {
    errors.push('請填寫正確的電子郵件');
  }
  if (
    !payload.phone ||
    typeof payload.phone !== 'string' ||
    !/^09\d{8}$/.test(payload.phone.replace(/[\s-]/g, ''))
  ) {
    errors.push('請填寫正確的台灣手機號碼');
  }
  const allowedKinds = ['store', 'home', 'pickup'];
  if (
    !payload.shipMethod ||
    typeof payload.shipMethod !== 'string' ||
    payload.shipMethod.length > 60 ||
    !allowedKinds.includes(payload.shipKind)
  ) {
    errors.push('請選擇寄送方式');
  } else {
    if (payload.shipKind === 'store') {
      if (!payload.storeId || typeof payload.storeId !== 'string' || payload.storeId.length > 60) {
        errors.push('請填寫超商店號');
      }
    }
    if (payload.shipKind === 'home') {
      if (!payload.address || typeof payload.address !== 'string' || payload.address.length > 300) {
        errors.push('請填寫完整的收件地址');
      }
    }
  }
  if (
    payload.recipientName != null &&
    (typeof payload.recipientName !== 'string' || payload.recipientName.length > 200)
  ) {
    errors.push('收件人姓名格式錯誤');
  }
  if (
    payload.storeName != null &&
    (typeof payload.storeName !== 'string' || payload.storeName.length > 200)
  ) {
    errors.push('門市名稱格式錯誤');
  }
  if (payload.note != null && (typeof payload.note !== 'string' || payload.note.length > 2000)) {
    errors.push('備註不得超過 2000 字');
  }
  if (!Array.isArray(payload.cart) || payload.cart.length === 0 || payload.cart.length > 50) {
    errors.push('購物籃須為非空陣列（不超過 50 項）');
  } else {
    for (const item of payload.cart) {
      if (
        !item ||
        typeof item.num !== 'string' ||
        typeof item.zh !== 'string' ||
        typeof item.lat !== 'string' ||
        typeof item.qty !== 'number' ||
        typeof item.price !== 'number' ||
        item.qty < 1 ||
        item.qty > 99
      ) {
        errors.push('購物籃項目格式錯誤');
        break;
      }
    }
  }
  if (typeof payload.total !== 'number' || payload.total < 0) {
    errors.push('合計金額不正確');
  }
  return errors;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderOrderEmailHtml({
  orderId,
  name,
  email,
  phone,
  shipMethod,
  shipKind,
  storeId,
  storeName,
  recipientName,
  address,
  note,
  cart,
  total,
  ip,
  labelUrl,
  logistics,
  logisticsError,
}) {
  const rows = cart
    .map(
      (i) => `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">
            №&nbsp;${escapeHtml(i.num)}
          </td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">
            <strong>${escapeHtml(i.zh)}</strong> · <em style="color:#8a6420;">${escapeHtml(i.lat)}</em>
          </td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center;">
            ×&nbsp;${i.qty}
          </td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">
            NT$${i.qty * i.price}
          </td>
        </tr>`,
    )
    .join('');

  const noteBlock = note
    ? `<p style="margin:18px 0 0;padding:10px 14px;background:#fcfaf2;border-left:3px solid #8a2a22;color:#1a1512;">${escapeHtml(note)}</p>`
    : '';

  const shipRow = (label, value) =>
    value
      ? `<tr><td style="padding:4px 10px;color:#666;width:90px;letter-spacing:2px;">${escapeHtml(label)}</td><td style="padding:4px 10px;">${escapeHtml(value)}</td></tr>`
      : '';

  const shipBlock = `
    <table style="width:100%;border-collapse:collapse;margin:14px 0 20px;background:#fcfaf2;border:1px solid #e4dcc4;">
      ${shipRow('手機', phone)}
      ${shipRow('寄送方式', shipMethod)}
      ${shipKind === 'store' ? shipRow('超商店號', storeId) : ''}
      ${shipKind === 'store' ? shipRow('門市', storeName) : ''}
      ${shipKind === 'home' ? shipRow('地址', address) : ''}
      ${recipientName && recipientName !== name ? shipRow('收件人', recipientName) : ''}
    </table>`;

  // ECPay 物流建單成功 → 顯示列印按鈕；失敗 → 顯示警示。沒走 store-to-store
  // 寄送的訂單兩個都不顯示。
  let logisticsBlock = '';
  if (labelUrl && logistics) {
    const cvsLabel = logistics.subType === 'UNIMARTC2C' ? '7-11' : '全家';
    logisticsBlock = `
    <div style="margin:24px 0;padding:18px;background:#fbf7e8;border:1px solid #c8a24a;text-align:center;">
      <a href="${escapeHtml(labelUrl)}"
         style="display:inline-block;padding:14px 30px;background:#8a2a22;color:#f8f5eb;text-decoration:none;letter-spacing:4px;font-size:15px;">
        🖨 列印寄件單
      </a>
      <div style="margin-top:12px;font-family:'DM Mono',monospace;font-size:13px;color:#8a8275;letter-spacing:2px;">
        寄件編號：${escapeHtml(logistics.cvsPaymentNo)}（${cvsLabel}）
      </div>
      <div style="margin-top:6px;font-size:11px;color:#8a8275;letter-spacing:1px;">
        點按鈕直接跳 ECPay 列印頁，A4 列印貼包裹即可交寄
      </div>
    </div>`;
  } else if (logisticsError) {
    logisticsBlock = `
    <div style="margin:24px 0;padding:14px 18px;background:#fce4e0;border:1px solid #8a2a22;color:#8a2a22;">
      <strong>⚠ ECPay 物流自動建單失敗</strong><br>
      <span style="font-size:13px;color:#666;">${escapeHtml(logisticsError)}</span><br>
      <span style="font-size:13px;color:#666;">請至 ECPay 後台手動建單。訂單資料已備齊在下方。</span>
    </div>`;
  }

  return `<!doctype html>
<html lang="zh-Hant"><body style="font-family:'Noto Serif TC',Georgia,serif;color:#1a1512;background:#f8f5eb;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:28px;border:1px solid #ddd;">
    <h2 style="margin:0 0 6px;font-weight:500;letter-spacing:6px;">新訂購請求</h2>
    <p style="margin:0 0 6px;color:#666;font-size:13px;letter-spacing:3px;">金花樓 · 手壓天然皂</p>
    <p style="margin:0 0 18px;font-family:'DM Mono',monospace;font-size:14px;letter-spacing:2px;color:#8a2a22;">訂單編號 · ${escapeHtml(orderId)}</p>

    <p style="margin:0 0 4px;"><strong>${escapeHtml(name)}</strong></p>
    <p style="margin:0 0 6px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>

    ${shipBlock}
    ${logisticsBlock}

    <table style="width:100%;border-collapse:collapse;margin-top:8px;">
      <thead>
        <tr style="text-align:left;color:#666;font-size:12px;letter-spacing:2px;">
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;">編號</th>
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;">品項</th>
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;text-align:center;">數量</th>
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;text-align:right;">小計</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:10px;text-align:right;letter-spacing:4px;">合計</td>
          <td style="padding:10px;text-align:right;color:#8a2a22;font-size:18px;">NT$${total}</td>
        </tr>
      </tfoot>
    </table>

    ${noteBlock}

    <p style="margin:24px 0 0;color:#999;font-size:11px;">
      來自 ${escapeHtml(ip)} · jinhuasoap.com
    </p>
  </div>
</body></html>`;
}

function renderOrderEmailText({
  orderId,
  name,
  email,
  phone,
  shipMethod,
  shipKind,
  storeId,
  storeName,
  recipientName,
  address,
  note,
  cart,
  total,
  ip,
  labelUrl,
  logistics,
  logisticsError,
}) {
  const lines = [
    `新訂購請求 — 金花樓 · 手壓天然皂`,
    `訂單編號：${orderId}`,
    ``,
    `姓名：${name}`,
    `電郵：${email}`,
    `手機：${phone}`,
  ];
  if (shipMethod) lines.push(`寄送方式：${shipMethod}`);
  if (shipKind === 'store' && storeId) lines.push(`超商店號：${storeId}`);
  if (shipKind === 'store' && storeName) lines.push(`門市：${storeName}`);
  if (shipKind === 'home' && address) lines.push(`地址：${address}`);
  if (recipientName && recipientName !== name) lines.push(`收件人：${recipientName}`);
  if (labelUrl && logistics) {
    const cvsLabel = logistics.subType === 'UNIMARTC2C' ? '7-11' : '全家';
    lines.push(
      ``,
      `寄件編號：${logistics.cvsPaymentNo}（${cvsLabel}）`,
      `列印寄件單：${labelUrl}`,
    );
  } else if (logisticsError) {
    lines.push(
      ``,
      `⚠ ECPay 物流自動建單失敗：${logisticsError}`,
      `請至 ECPay 後台手動建單。`,
    );
  }
  lines.push(
    ``,
    `購物籃：`,
    ...cart.map((i) => `  № ${i.num}  ${i.zh}（${i.lat}）× ${i.qty}  =  NT$${i.qty * i.price}`),
    ``,
    `合計：NT$${total}`,
  );
  if (note) {
    lines.push('', '備註：', note);
  }
  lines.push('', `來自 ${ip} · jinhuasoap.com`);
  return lines.join('\n');
}

// 寄給買家的訂單確認信。Voice 比 renderOrderEmailHtml 溫和 —— 是「謝謝
// 您的訂購、接下來流程」，不是「新訂購請求」。不洩漏 IP / 列印寄件單連結
// 等老闆娘專屬資訊。失敗時只 log、不擋訂單成立（已有 KV fallback）。
function renderBuyerEmailHtml({
  orderId,
  orderUrl,
  name,
  phone,
  shipMethod,
  shipKind,
  storeName,
  address,
  recipientName,
  cart,
  total,
  paid = false,
}) {
  // 貨到付款：Line 是「確認付款」的一步。線上已付款：Line 只是客服窗口。
  const introLine = paid
    ? '我們已經收到您的訂單與款項 ── 付款完成，謝謝您。接下來的流程：'
    : '我們已經收到您的訂單。本舍每週手壓一批，每張單都由老闆娘親自整理。接下來的流程：';
  const stepsHtml = paid
    ? `
      <li>本舍每週手壓一批，付款後 <strong>2-3 個工作天</strong>內為您出貨</li>
      <li>出貨後您會再收到一封通知信</li>
      <li>有任何問題，隨時用 <strong>Line</strong> 與我們聯繫</li>`
    : `
      <li>24 小時內，我們會用 <strong>Line</strong> 與您聯繫確認付款與寄送方式</li>
      <li>確認付款後 <strong>2-3 個工作天</strong>內出貨</li>
      <li>出貨後您會再收到一封通知信</li>`;
  const rows = cart
    .map(
      (i) => `
        <tr>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;font-family:'DM Mono',monospace;font-size:12px;color:#8a6420;letter-spacing:1px;">
            №&nbsp;${escapeHtml(i.num)}
          </td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;">
            <strong>${escapeHtml(i.zh)}</strong>
          </td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;color:#666;font-size:13px;">
            × ${i.qty}
          </td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:right;font-family:'DM Mono',monospace;font-size:13px;">
            NT$${i.qty * i.price}
          </td>
        </tr>`,
    )
    .join('');

  const shipRow = (label, value) =>
    value
      ? `<tr><td style="padding:4px 10px;color:#8a6420;width:90px;letter-spacing:2px;font-size:12px;font-family:'DM Mono',monospace;">${escapeHtml(label)}</td><td style="padding:4px 10px;font-size:14px;">${escapeHtml(value)}</td></tr>`
      : '';

  const shipBlock = `
    <table style="width:100%;border-collapse:collapse;margin:16px 0 0;background:#fcfaf2;border:1px solid #e4dcc4;">
      ${shipRow('寄送方式', shipMethod)}
      ${shipKind === 'store' && storeName ? shipRow('取件門市', storeName) : ''}
      ${shipKind === 'home' && address ? shipRow('地址', address) : ''}
      ${recipientName && recipientName !== name ? shipRow('收件人', recipientName) : ''}
      ${phone ? shipRow('聯絡電話', phone) : ''}
    </table>`;

  return `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"></head>
<body style="font-family:'Noto Serif TC',Georgia,serif;color:#1a1512;background:#f8f5eb;padding:24px;margin:0;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:32px 28px;border:1px solid #e4dcc4;">
    <div style="text-align:center;border-bottom:1px solid #e4dcc4;padding-bottom:20px;margin-bottom:24px;">
      <img src="https://jinhuasoap.com/logo.png" alt="金花樓" width="72" height="auto" style="display:inline-block;max-width:72px;height:auto;margin-bottom:14px;border:0;" />
      <div style="font-size:11px;letter-spacing:4px;color:#8a6420;text-transform:uppercase;font-family:'DM Mono',monospace;">
        Goldenflower · Jin Hua Lou
      </div>
      <h1 style="margin:8px 0 0;font-size:26px;font-weight:500;letter-spacing:8px;color:#1a1512;">金花樓</h1>
      <div style="font-size:12px;letter-spacing:3px;color:#8a6420;margin-top:4px;">手壓天然皂</div>
    </div>

    <p style="margin:0 0 16px;font-size:15px;line-height:1.85;">${escapeHtml(name)} 您好 ──</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.85;">
      ${introLine}
    </p>

    <ol style="margin:0 0 8px;padding-left:20px;font-size:14px;line-height:2;color:#1a1512;">${stepsHtml}
    </ol>

    <div style="text-align:center;background:#fcfaf2;border:1px solid #c8a24a;padding:18px;margin:24px 0;">
      <div style="font-size:11px;letter-spacing:3px;color:#8a6420;font-family:'DM Mono',monospace;">訂單編號</div>
      <div style="margin:6px 0 0;font-size:20px;letter-spacing:3px;color:#8a2a22;font-family:'DM Mono',monospace;">${escapeHtml(orderId)}</div>
      <a href="${escapeHtml(orderUrl)}" style="display:inline-block;margin-top:14px;padding:10px 24px;background:#8a2a22;color:#f8f5eb;text-decoration:none;font-size:13px;letter-spacing:2px;">
        查詢訂單狀態 ▸
      </a>
    </div>

    <h3 style="margin:24px 0 8px;font-size:12px;letter-spacing:3px;color:#8a6420;font-weight:400;font-family:'DM Mono',monospace;text-transform:uppercase;">品項</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:14px 10px 4px;text-align:right;letter-spacing:3px;font-size:14px;">合計</td>
          <td style="padding:14px 10px 4px;text-align:right;color:#8a2a22;font-size:20px;font-family:'DM Mono',monospace;">NT$${total}</td>
        </tr>
      </tfoot>
    </table>

    ${shipBlock}

    <div style="margin-top:32px;padding-top:20px;border-top:1px dotted #c8a24a;font-size:12px;color:#666;line-height:1.85;">
      有任何問題請聯絡我們 ──<br>
      Line · <a href="https://lin.ee/7m167md" style="color:#8a2a22;">lin.ee/7m167md</a><br>
      Email · <a href="mailto:contact@jinhuasoap.com" style="color:#8a2a22;">contact@jinhuasoap.com</a>
    </div>

    <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #eee;color:#999;font-size:11px;letter-spacing:1px;text-align:center;line-height:1.7;">
      金花樓 · 一間位於林口的小小皂舍<br>
      <a href="https://jinhuasoap.com" style="color:#999;">jinhuasoap.com</a>
    </p>
  </div>
</body></html>`;
}

function renderBuyerEmailText({
  orderId,
  orderUrl,
  name,
  phone,
  shipMethod,
  shipKind,
  storeName,
  address,
  recipientName,
  cart,
  total,
  paid = false,
}) {
  const introLines = paid
    ? [`我們已經收到您的訂單與款項 ──`, `付款完成，謝謝您。`]
    : [`我們已經收到您的訂單。本舍每週手壓一批，`, `每張單都由老闆娘親自整理。`];
  const stepLines = paid
    ? [
        `  1. 本舍每週手壓一批，付款後 2-3 個工作天內出貨`,
        `  2. 出貨後您會再收到一封通知信`,
        `  3. 有任何問題，隨時用 Line 與我們聯繫`,
      ]
    : [
        `  1. 24 小時內，我們會用 Line 與您聯繫`,
        `     確認付款與寄送方式`,
        `  2. 確認付款後 2-3 個工作天內出貨`,
        `  3. 出貨後您會再收到一封通知信`,
      ];
  const lines = [
    `金花樓 · 手壓天然皂`,
    `──`,
    ``,
    `${name} 您好，`,
    ``,
    ...introLines,
    ``,
    `接下來的流程：`,
    ...stepLines,
    ``,
    `訂單編號：${orderId}`,
    `查詢狀態：${orderUrl}`,
    ``,
    `品項：`,
    ...cart.map((i) => `  № ${i.num}  ${i.zh}  × ${i.qty}  =  NT$${i.qty * i.price}`),
    ``,
    `合計：NT$${total}`,
    ``,
  ];
  if (shipMethod) lines.push(`寄送方式：${shipMethod}`);
  if (shipKind === 'store' && storeName) lines.push(`取件門市：${storeName}`);
  if (shipKind === 'home' && address) lines.push(`地址：${address}`);
  if (recipientName && recipientName !== name) lines.push(`收件人：${recipientName}`);
  if (phone) lines.push(`聯絡電話：${phone}`);
  lines.push(
    ``,
    `有任何問題請聯絡我們：`,
    `Line · https://lin.ee/7m167md`,
    `Email · contact@jinhuasoap.com`,
    ``,
    `──`,
    `金花樓 · 一間位於林口的小小皂舍`,
    `jinhuasoap.com`,
  );
  return lines.join('\n');
}

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

// ── ECPay 物流 C2C ────────────────────────────────────────────────────────

function publicBaseUrl(env) {
  return env.PUBLIC_BASE_URL || 'https://jinhuasoap.com';
}

function logisticsBaseUrl(env) {
  return env.ECPAY_LOGISTICS_BASE_URL || 'https://logistics.ecpay.com.tw';
}

function ecpayMerchantId(env) {
  return env.ECPAY_MERCHANT_ID || env.VITE_ECPAY_MERCHANT_ID || '';
}

// ECPay 限 MerchantTradeNo 4–20 英數，不可有 dash。我們的 orderId 是
// JH-YYMMDD-XXXX（13 字含 dash）→ dash 拿掉變 JHYYMMDDXXXX（11 字），
// 安全範圍內。orderId 對外仍用原格式（給人看的）。
export function orderIdToTradeNo(orderId) {
  return orderId.replace(/-/g, '');
}

// Reverse of orderIdToTradeNo. Used by /api/logistics-callback to look up
// the order in KV from the MerchantTradeNo ECPay sends back.
//   "JH260510MZ9M" → "JH-260510-MZ9M"
export function tradeNoToOrderId(tradeNo) {
  const m = String(tradeNo || '').match(/^(JH)(\d{6})([A-Z0-9]{4})$/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

// ECPay 物流 C2C RtnCode → 對買家有意義的粗略狀態 bucket。
// 文件編碼太多、實際 fire 的 code 視超商而異；我們：
//   1. 永遠存 RtnCode + RtnMsg 原始字串到 history（buyer 還是看得到中文描述）
//   2. 同時 map 成 phase 提供時間軸視覺進度
// 未知 code 一律 → 'updated'（顯示為「狀態更新」）。
// References (ECPay 物流 C2C SDK):
//   3xx series — 7-11 (UNIMARTC2C)
//   2xxx series — 全家 (FAMIC2C)
//   5xxx series — 共用節點
export function rtnCodeToPhase(rtnCode) {
  const code = String(rtnCode || '');
  if (code === '300' || code === '2001') return 'created';
  // 寄件人交寄到便利商店、超商收件
  if (code === '5002' || code === '2030') return 'lodged';
  // 物流取貨 / 配送中
  if (code === '5003' || code === '2005') return 'in_transit';
  // 已送達門市
  if (code === '310' || code === '2002' || code === '2006') return 'arrived';
  // 消費者取件完成
  if (code === '311' || code === '2003' || code === '2007') return 'picked_up';
  // 退貨相關
  if (code === '312' || code === '313' || code === '5004' || code === '2031' || code === '2032') return 'returning';
  return 'updated';
}

// ECPay 物流狀態更新 webhook。建單時我們已經把 ServerReplyURL 設成
//   `${publicBaseUrl(env)}/api/logistics-callback`
// ECPay 在每次狀態變更時會 POST form-urlencoded 到這、要求我們回 `1|OK`。
//
// 流程：
//   1. parse form body
//   2. 驗 CheckMacValue（用同一個物流 HashKey/HashIV）
//   3. MerchantTradeNo → orderId
//   4. KV 讀現有 stored、append 新事件到 stored.statusHistory
//   5. 更新 stored.latestStatus = event
//   6. KV 寫回（reset TTL 30 天）
//   7. 回 text/plain `1|OK`
//
// 即使找不到對應訂單，仍回 `1|OK` 避免 ECPay 無限重試。
async function handleLogisticsCallback(request, env) {
  if (request.method !== 'POST') {
    return new Response('0|Method not allowed', {
      status: 405,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  let params;
  try {
    const fd = await request.formData();
    params = Object.fromEntries(fd);
  } catch (err) {
    console.error('Logistics callback parse failed', err);
    return new Response('0|Bad request', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const receivedMac = params.CheckMacValue;
  if (!receivedMac) {
    return new Response('0|Missing CheckMacValue', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  if (!env.ECPAY_LOGISTICS_HASH_KEY || !env.ECPAY_LOGISTICS_HASH_IV) {
    console.error('Logistics callback: HashKey/IV not configured');
    return new Response('0|Server not configured', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  const expectedMac = checkMacValue(
    params,
    env.ECPAY_LOGISTICS_HASH_KEY,
    env.ECPAY_LOGISTICS_HASH_IV,
  );
  if (receivedMac !== expectedMac) {
    console.error('Logistics callback CheckMacValue mismatch', {
      received: receivedMac,
      expected: expectedMac,
      tradeNo: params.MerchantTradeNo,
    });
    return new Response('0|CheckMacValue mismatch', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const orderId = tradeNoToOrderId(params.MerchantTradeNo);
  if (!orderId) {
    console.error('Logistics callback bad tradeNo', params.MerchantTradeNo);
    // 仍 ack — 不要 ECPay 持續重發
    return new Response('1|OK', { headers: { 'Content-Type': 'text/plain' } });
  }

  if (!env.ORDER_FALLBACK) {
    console.error('Logistics callback: ORDER_FALLBACK KV not bound');
    return new Response('0|KV not configured', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const list = await env.ORDER_FALLBACK.list({ prefix: `order/${orderId}/` });
  if (!list.keys.length) {
    console.error('Logistics callback for unknown order', { orderId });
    return new Response('1|OK', { headers: { 'Content-Type': 'text/plain' } });
  }
  const key = list.keys[0].name;
  const raw = await env.ORDER_FALLBACK.get(key);
  if (!raw) {
    console.error('Logistics callback: order data missing', { key });
    return new Response('1|OK', { headers: { 'Content-Type': 'text/plain' } });
  }

  let stored;
  try {
    stored = JSON.parse(raw);
  } catch (err) {
    console.error('Logistics callback: stored JSON parse failed', err);
    return new Response('1|OK', { headers: { 'Content-Type': 'text/plain' } });
  }

  const event = {
    rtnCode: String(params.RtnCode || ''),
    rtnMsg: String(params.RtnMsg || ''),
    phase: rtnCodeToPhase(params.RtnCode),
    updateStatusDate: String(params.UpdateStatusDate || ''),
    receivedAt: new Date().toISOString(),
  };
  stored.statusHistory = Array.isArray(stored.statusHistory) ? stored.statusHistory : [];

  // Dedup：ECPay 偶爾會重發同一事件、用 (rtnCode + updateStatusDate) 當 idempotency key
  const dupKey = `${event.rtnCode}|${event.updateStatusDate}`;
  const alreadySeen = stored.statusHistory.some(
    (e) => `${e.rtnCode}|${e.updateStatusDate}` === dupKey,
  );
  if (!alreadySeen) {
    stored.statusHistory.push(event);
    stored.latestStatus = event;

    try {
      await env.ORDER_FALLBACK.put(key, JSON.stringify(stored), {
        expirationTtl: 30 * 24 * 60 * 60,
      });
    } catch (err) {
      console.error('Logistics callback: KV put failed', err);
      // 仍 ack — KV write 失敗不該讓 ECPay 重發（手動排查比較好）
    }
  }

  return new Response('1|OK', { headers: { 'Content-Type': 'text/plain' } });
}

// ECPay CheckMacValue 算法（物流 MD5 版）：
// 1. 把所有 query params 依 key 字母排序（不分大小寫一起 ASCII 排序），
//    組成 k=v&k=v 字串
// 2. 前後夾上 HashKey + HashIV：HashKey=...&...&HashIV=...
// 3. URL-encode 整段（用 .NET URL-encode 規格 — small-letter encoded 字元
//    要轉成大寫，例 %20 → %20、%2F → %2f → 需要轉回大寫... 等等。
//    ECPay 要求是 .NET 預設 URL-encode 的小寫格式，跟 RFC 3986 大寫不同）
// 4. 全部小寫
// 5. MD5 hash → 大寫 hex
//
// 文件參照 ECPay 物流 C2C SDK，行為跟金流 SHA256 不同（MD5 + lowercase 後
// uppercase MD5 result）。
function ecpayUrlEncode(str) {
  // .NET 風格：encodeURIComponent 後改寫部分字元
  // ECPay 文件規定這幾個 char 要替換回原字元（不 encode）
  return encodeURIComponent(str)
    .replace(/%20/g, '+')
    .replace(/%21/g, '!')
    .replace(/%2A/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%27/g, "'");
}

// CheckMacValue 的字串前處理 —— 物流 MD5 與金流 SHA256 這一段完全相同，
// 只差最後的 digest。sort → k=v&k=v → 前後夾 HashKey/HashIV → .NET
// URL-encode → 全小寫。抽出來共用，兩條路徑保證同一套規則。
function ecpayMacString(params, hashKey, hashIV) {
  const keys = Object.keys(params)
    .filter((k) => k !== 'CheckMacValue' && params[k] !== undefined && params[k] !== null)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const joined = keys.map((k) => `${k}=${params[k]}`).join('&');
  const wrapped = `HashKey=${hashKey}&${joined}&HashIV=${hashIV}`;
  return ecpayUrlEncode(wrapped).toLowerCase();
}

// 物流 C2C：MD5。
export function checkMacValue(params, hashKey, hashIV) {
  return createHash('md5')
    .update(ecpayMacString(params, hashKey, hashIV), 'utf8')
    .digest('hex')
    .toUpperCase();
}

// 金流 AIO：SHA256（EncryptType=1）。演算法與物流版一致，只差 digest。
// 已用 ECPay 官方文件 worked example 離線驗證 → scripts/ecpay-mac.test.mjs。
export function paymentCheckMacValue(params, hashKey, hashIV) {
  return createHash('sha256')
    .update(ecpayMacString(params, hashKey, hashIV), 'utf8')
    .digest('hex')
    .toUpperCase();
}

function fmtDate(date = new Date()) {
  // ECPay 要 yyyy/MM/dd HH:mm:ss（GMT+8）
  const tz = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    tz.getUTCFullYear() +
    '/' + pad(tz.getUTCMonth() + 1) +
    '/' + pad(tz.getUTCDate()) +
    ' ' + pad(tz.getUTCHours()) +
    ':' + pad(tz.getUTCMinutes()) +
    ':' + pad(tz.getUTCSeconds())
  );
}

async function createShippingOrder(input, env) {
  const { orderId, subType, total, storeId, recipientName, recipientPhone, recipientEmail } = input;
  const tradeNo = orderIdToTradeNo(orderId);
  const merchantId = ecpayMerchantId(env);
  if (!merchantId) {
    return { ok: false, error: '未設定 ECPAY_MERCHANT_ID' };
  }

  // 預設代收貨款（貨到付款）。線上金流已付款的單傳 isCollection:false →
  // 物流不再代收，超商取件不用付錢。
  const collect = input.isCollection !== false;
  const params = {
    MerchantID: merchantId,
    MerchantTradeNo: tradeNo,
    MerchantTradeDate: fmtDate(),
    LogisticsType: 'CVS',
    LogisticsSubType: subType, // UNIMARTC2C | FAMIC2C
    GoodsAmount: String(Math.round(total)),
    CollectionAmount: collect ? String(Math.round(total)) : '0',
    IsCollection: collect ? 'Y' : 'N',
    GoodsName: `金花樓手工皂訂單 ${orderId}`.slice(0, 50),
    SenderName: env.SENDER_NAME || '金花樓',
    SenderPhone: normalizeTwMobile(env.SENDER_PHONE) || env.SENDER_PHONE || '',
    SenderCellPhone:
      normalizeTwMobile(env.SENDER_CELL_PHONE || env.SENDER_PHONE) || '',
    ReceiverName: recipientName,
    ReceiverPhone: normalizeTwMobile(recipientPhone) || recipientPhone,
    ReceiverCellPhone: normalizeTwMobile(recipientPhone) || recipientPhone,
    ReceiverEmail: recipientEmail,
    ReceiverStoreID: storeId,
    ReturnStoreID: storeId,
    ServerReplyURL: `${publicBaseUrl(env)}/api/logistics-callback`,
    LogisticsC2CReplyURL: `${publicBaseUrl(env)}/api/logistics-callback`,
    Remark: '',
    PlatformID: '',
  };
  params.CheckMacValue = checkMacValue(params, env.ECPAY_LOGISTICS_HASH_KEY, env.ECPAY_LOGISTICS_HASH_IV);

  const body = new URLSearchParams(params).toString();
  let res;
  try {
    res = await fetch(`${logisticsBaseUrl(env)}/Express/Create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(10000),
    });
  } catch (err) {
    return { ok: false, error: `連線錯誤：${err.message}` };
  }

  const text = await res.text();
  // ECPay 回 1|key=val&key=val 或 0|錯誤訊息
  const sep = text.indexOf('|');
  const head = sep >= 0 ? text.slice(0, sep) : text;
  const body2 = sep >= 0 ? text.slice(sep + 1) : '';
  if (head !== '1') {
    return { ok: false, error: `ECPay 回應 ${head}: ${body2 || text}` };
  }
  const fields = Object.fromEntries(new URLSearchParams(body2));
  const rtnCode = fields.RtnCode;
  // RtnCode 300 (UNIMARTC2C) / 2001 (FAMIC2C) 是建單成功的回傳代碼
  if (rtnCode !== '300' && rtnCode !== '2001') {
    return { ok: false, error: `RtnCode ${rtnCode}: ${fields.RtnMsg || ''}` };
  }
  return {
    ok: true,
    allPayLogisticsId: fields.AllPayLogisticsID,
    cvsPaymentNo: fields.CVSPaymentNo,
    cvsValidationNo: fields.CVSValidationNo,
  };
}

// ── ECPay 金流 AIO（線上付款）─────────────────────────────────────────────
// Gated + additive：這整條路徑只有在 payment HashKey/IV 兩個 secret 都設定時
// 才會啟用。沒設定時 /api/checkout 回 { notConfigured:true }，前端 fallback
// 到 /api/order（現行貨到付款流程），線上行為完全不變。
//
// 流程：
//   1. 前端 POST /api/checkout（同 order payload）
//   2. handleCheckout：驗證 → 產 orderId → 寫「待付款」訂單進 KV →
//      回 { action, fields }（ECPay 收銀台自動送出表單）
//   3. 買家在 ECPay 付款
//   4. ECPay POST /api/payment-callback（server-to-server）→ 驗 SHA256 MAC →
//      標記 paid → fulfillPaidOrder（物流建單 + 通知老闆娘 + 買家確認信）
//   5. 買家瀏覽器被導回 /order/{orderId} 查單頁

function paymentConfigured(env) {
  return !!(env.ECPAY_PAYMENT_HASH_KEY && env.ECPAY_PAYMENT_HASH_IV);
}

function paymentBaseUrl(env) {
  // 正式 payment.ecpay.com.tw；測試 payment-stage.ecpay.com.tw
  return env.ECPAY_PAYMENT_BASE_URL || 'https://payment.ecpay.com.tw';
}

// ECPay 收銀台顯示的品名。多項用 # 分隔，整段上限 400 字。
function aioItemName(cart) {
  const s = cart.map((i) => `${i.zh} x${i.qty}`).join('#');
  return s.length > 400 ? s.slice(0, 397) + '...' : s;
}

// 組 ECPay AIO 付款表單參數（含 SHA256 CheckMacValue）。回 { action, fields }，
// 前端據此組隱藏表單整頁 POST 到 ECPay。
function buildAioOrder({ orderId, cart, amount }, env) {
  const params = {
    MerchantID: ecpayMerchantId(env),
    MerchantTradeNo: orderIdToTradeNo(orderId),
    MerchantTradeDate: fmtDate(),
    PaymentType: 'aio',
    TotalAmount: String(Math.round(amount)),
    TradeDesc: '金花樓手工皂',
    ItemName: aioItemName(cart),
    ReturnURL: `${publicBaseUrl(env)}/api/payment-callback`, // server-to-server
    ClientBackURL: `${publicBaseUrl(env)}/order/${orderId}`, // 買家付完導回查單頁
    ChoosePayment: 'ALL',
    EncryptType: 1,
    NeedExtraPaidInfo: 'N',
  };
  params.CheckMacValue = paymentCheckMacValue(
    params,
    env.ECPAY_PAYMENT_HASH_KEY,
    env.ECPAY_PAYMENT_HASH_IV,
  );
  return { action: `${paymentBaseUrl(env)}/Cashier/AioCheckOut/V5`, fields: params };
}

async function handleCheckout(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: '請求內容格式錯誤' }, 400);
  }

  const errors = validateOrder(payload);
  if (errors.length) {
    return jsonResponse({ ok: false, error: errors.join('；') }, 400);
  }

  // 金流未設定 → 明確告訴前端走舊流程（貨到付款）。200 而非 error status，
  // 讓前端好判斷這是「預期中的 fallback」而非壞掉。
  if (!paymentConfigured(env)) {
    return jsonResponse({ ok: false, notConfigured: true, error: '線上金流尚未設定' });
  }
  // 沒 KV 就無法在 callback fulfill（會收了錢卻查不到單）→ 一樣走 fallback。
  if (!env.ORDER_FALLBACK) {
    console.error('checkout: ORDER_FALLBACK KV not bound — falling back');
    return jsonResponse({ ok: false, notConfigured: true, error: '訂單儲存尚未設定' });
  }

  // 權威金額：後端一律從購物籃重算，不採信前端送來的 total。
  const amount = payload.cart.reduce((s, i) => s + i.qty * i.price, 0);
  if (!(amount > 0)) {
    return jsonResponse({ ok: false, error: '訂單金額不正確' }, 400);
  }

  const orderId = generateOrderId();
  const ip = request.headers.get('CF-Connecting-IP') || '未知';

  // 先把「待付款」訂單寫進 KV，讓 payment-callback 找得到、fulfill 得了。
  try {
    await env.ORDER_FALLBACK.put(
      `order/${orderId}/${Date.now()}`,
      JSON.stringify({
        orderId,
        createdAt: new Date().toISOString(),
        ip,
        payload: { ...payload, total: amount }, // 用後端重算金額覆寫
        payment: { status: 'pending', amount, method: 'ecpay' },
      }),
      { expirationTtl: 30 * 24 * 60 * 60 },
    );
  } catch (err) {
    console.error('checkout: KV put failed', err);
    return jsonResponse({ ok: false, error: '系統忙碌，請稍後再試' }, 500);
  }

  const { action, fields } = buildAioOrder({ orderId, cart: payload.cart, amount }, env);
  return jsonResponse({ ok: true, orderId, action, fields });
}

async function handlePaymentCallback(request, env) {
  const reply = (body = '1|OK', status = 200) =>
    new Response(body, { status, headers: { 'Content-Type': 'text/plain' } });

  if (request.method !== 'POST') return reply('0|Method not allowed', 405);

  let params;
  try {
    params = Object.fromEntries(await request.formData());
  } catch (err) {
    console.error('payment-callback parse failed', err);
    return reply('0|Bad request', 400);
  }

  if (!paymentConfigured(env)) {
    console.error('payment-callback: payment not configured');
    return reply('0|Not configured', 500);
  }
  const expected = paymentCheckMacValue(
    params,
    env.ECPAY_PAYMENT_HASH_KEY,
    env.ECPAY_PAYMENT_HASH_IV,
  );
  if (!params.CheckMacValue || params.CheckMacValue !== expected) {
    console.error('payment-callback CheckMacValue mismatch', {
      tradeNo: params.MerchantTradeNo,
    });
    return reply('0|CheckMacValue mismatch', 400);
  }

  const orderId = tradeNoToOrderId(params.MerchantTradeNo);
  // 認不出單號 / 沒 KV：仍 ack，避免 ECPay 無限重試。
  if (!orderId || !env.ORDER_FALLBACK) return reply();

  const list = await env.ORDER_FALLBACK.list({ prefix: `order/${orderId}/` });
  if (!list.keys.length) {
    console.error('payment-callback for unknown order', orderId);
    return reply();
  }
  const key = list.keys[0].name;
  const raw = await env.ORDER_FALLBACK.get(key);
  if (!raw) return reply();
  let stored;
  try {
    stored = JSON.parse(raw);
  } catch (err) {
    console.error('payment-callback stored JSON parse failed', err);
    return reply();
  }

  const paid = params.RtnCode === '1';
  stored.payment = {
    ...(stored.payment || {}),
    status: paid ? 'paid' : 'failed',
    rtnCode: String(params.RtnCode || ''),
    rtnMsg: String(params.RtnMsg || ''),
    tradeNo: String(params.TradeNo || ''),
    paymentType: String(params.PaymentType || ''),
    tradeAmt: String(params.TradeAmt || ''),
    paymentDate: String(params.PaymentDate || ''),
    updatedAt: new Date().toISOString(),
  };

  // 只有第一次「付款成功」才 fulfill —— stored.fulfilledAt 當 idempotency key，
  // ECPay 重送同一筆成功通知時不會重複建物流 / 重複寄信。
  if (paid && !stored.fulfilledAt) {
    try {
      await fulfillPaidOrder(stored, env);
      stored.fulfilledAt = new Date().toISOString();
    } catch (err) {
      // 付款已成立（KV 記 paid）。fulfill 失敗仍 ack —— 讓 ECPay 重試會
      // 重複寄信，改由老闆娘從 KV / 後台補救比較安全。
      console.error('payment-callback fulfill failed', err);
    }
  }

  try {
    await env.ORDER_FALLBACK.put(key, JSON.stringify(stored), {
      expirationTtl: 30 * 24 * 60 * 60,
    });
  } catch (err) {
    console.error('payment-callback KV put failed', err);
  }

  return reply();
}

// 付款成功後才跑：物流建單（若店到店、且已付款不代收）+ 通知老闆娘 +
// 買家「付款完成」確認信。與 handleOrder（貨到付款）並存，兩條路徑共用
// createShippingOrder 與 email 樣板。失敗只 log，不丟回 callback。
async function fulfillPaidOrder(stored, env) {
  const { orderId, payload } = stored;
  const {
    name, email, phone, shipMethod, shipKind, storeId, storeName,
    recipientName, address, note, cart, total,
  } = payload;

  let logistics = null;
  let logisticsError = null;
  if (
    shipKind === 'store' &&
    payload.subType &&
    env.ECPAY_LOGISTICS_HASH_KEY &&
    env.ECPAY_LOGISTICS_HASH_IV
  ) {
    try {
      const r = await createShippingOrder(
        {
          orderId,
          subType: payload.subType,
          total,
          storeId,
          recipientName: recipientName || name,
          recipientPhone: phone,
          recipientEmail: email,
          isCollection: false, // 已線上付款 —— 物流不代收
        },
        env,
      );
      if (r.ok) {
        logistics = {
          allPayLogisticsId: r.allPayLogisticsId,
          cvsPaymentNo: r.cvsPaymentNo,
          cvsValidationNo: r.cvsValidationNo,
          subType: payload.subType,
          createdAt: new Date().toISOString(),
        };
      } else {
        logisticsError = r.error || 'ECPay 回傳未知錯誤';
        console.error('fulfillPaidOrder createShippingOrder failed:', logisticsError);
      }
    } catch (err) {
      logisticsError = err.message || String(err);
      console.error('fulfillPaidOrder createShippingOrder threw:', err);
    }
  }
  stored.logistics = logistics;
  stored.logisticsError = logisticsError;

  if (!env.RESEND_API_KEY) return; // 沒信件服務 → 只更新 KV（呼叫端寫回）

  const toEmail = env.ORDER_TO_EMAIL || 'tsghsunlee@gmail.com';
  const fromEmail = env.ORDER_FROM_EMAIL || 'onboarding@resend.dev';
  const labelUrl = logistics ? `${publicBaseUrl(env)}/api/label/${orderId}` : null;
  const shipFields = { phone, shipMethod, shipKind, storeId, storeName, recipientName, address };
  const ip = stored.ip || '線上付款';

  // 老闆娘信 —— subject 標「已付款」，body 沿用同一份樣板。
  const html = renderOrderEmailHtml({
    orderId, name, email, note, cart, total, ip, ...shipFields, labelUrl, logistics, logisticsError,
  });
  const text = renderOrderEmailText({
    orderId, name, email, note, cart, total, ip, ...shipFields, labelUrl, logistics, logisticsError,
  });
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `金花樓 <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `[金花樓·已付款] ${orderId} · ${name} · NT$${total}`,
        html,
        text,
      }),
    });
  } catch (err) {
    console.error('fulfillPaidOrder owner email failed', err);
  }

  // 買家確認信 —— 付款完成版（paid:true 切換「接下來流程」文案）。
  try {
    const orderUrl = `${publicBaseUrl(env)}/order/${orderId}`;
    const buyerHtml = renderBuyerEmailHtml({
      orderId, orderUrl, name, phone, shipMethod, shipKind, storeName, address, recipientName,
      cart, total, paid: true,
    });
    const buyerText = renderBuyerEmailText({
      orderId, orderUrl, name, phone, shipMethod, shipKind, storeName, address, recipientName,
      cart, total, paid: true,
    });
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `金花樓 <${fromEmail}>`,
        to: [email],
        reply_to: toEmail,
        subject: `付款完成 · 金花樓 #${orderId}`,
        html: buyerHtml,
        text: buyerText,
      }),
    });
  } catch (err) {
    console.error('fulfillPaidOrder buyer email failed', err);
  }
}

function buildPrintFormHtml(logistics, env) {
  const merchantId = ecpayMerchantId(env);
  const isUni = logistics.subType === 'UNIMARTC2C';
  // ECPay 物流列印寄件單 endpoint 跟 /Express/Create 同 namespace。
  // 過去寫成 /Helper/ 是錯 path（ECPay 回 404 的原因）。
  const action =
    `${logisticsBaseUrl(env)}/Express/` +
    (isUni ? 'PrintUniMartC2COrderInfo' : 'PrintFAMIC2COrderInfo');

  // 7-11 跟全家 C2C 兩個列印 endpoint 都要 CVSValidationNo ── ECPay 文件
  // 容易誤讀成「7-11 只要 CVSPaymentNo」，實測會回 "CVSValidationNo is null."。
  // CreateShippingOrder 成功時兩個 subType 都會回 CVSValidationNo，所以直接帶。
  const params = {
    MerchantID: merchantId,
    AllPayLogisticsID: logistics.allPayLogisticsId,
    CVSPaymentNo: logistics.cvsPaymentNo,
    CVSValidationNo: logistics.cvsValidationNo || '',
  };
  params.CheckMacValue = checkMacValue(params, env.ECPAY_LOGISTICS_HASH_KEY, env.ECPAY_LOGISTICS_HASH_IV);

  const inputs = Object.entries(params)
    .map(([k, v]) => `<input type="hidden" name="${escapeHtml(k)}" value="${escapeHtml(v)}">`)
    .join('\n    ');

  return `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<title>列印寄件單 · 金花樓</title>
</head>
<body style="font-family:'Noto Serif TC',serif;text-align:center;padding:60px;color:#1a1512;">
  <p style="letter-spacing:3px;">正在跳轉至 ECPay 列印頁…</p>
  <form id="ecpayLabel" method="POST" action="${escapeHtml(action)}">
    ${inputs}
  </form>
  <script>document.getElementById('ecpayLabel').submit();</script>
</body>
</html>`;
}

// 公開查單 endpoint — 買家用訂單編號自助查狀態。
// 安全考量：訂單編號 JH-YYMMDD-XXXX 後 4 碼隨機（36^4 = 1.6M 組合）、
// 不易暴力猜中；且回傳資料**過濾掉 email / 電話 / IP 等敏感欄位**，
// 只回客戶自己已知的訂單資訊（名字、品項、總額、寄送方式、狀態）。
async function handleOrderQuery(orderId, env) {
  if (!orderId || !/^JH-\d{6}-[A-Z0-9]{4}$/.test(orderId)) {
    return jsonResponse({ ok: false, error: '訂單編號格式錯誤' }, 400);
  }
  if (!env.ORDER_FALLBACK) {
    return jsonResponse({ ok: false, error: 'KV not configured' }, 500);
  }
  const list = await env.ORDER_FALLBACK.list({ prefix: `order/${orderId}/` });
  if (!list.keys.length) {
    return jsonResponse({ ok: false, error: '找不到這筆訂單（可能已超過 30 天保存期）' }, 404);
  }
  const raw = await env.ORDER_FALLBACK.get(list.keys[0].name);
  if (!raw) return jsonResponse({ ok: false, error: '訂單資料缺失' }, 404);

  const stored = JSON.parse(raw);
  const payload = stored.payload || {};

  // Status — pending = 訂單已收、ECPay 建單尚未成功；processing = ECPay
  // 建單已成功、等老闆娘交寄；之後物流變更由 /api/logistics-callback
  // 寫進 stored.latestStatus.phase，覆寫 status 顯示給買家。
  let status = stored.logistics ? 'processing' : 'pending';
  if (stored.latestStatus?.phase && stored.latestStatus.phase !== 'created') {
    status = stored.latestStatus.phase;
  }

  return jsonResponse({
    ok: true,
    orderId,
    createdAt: stored.createdAt,
    name: payload.name,
    recipientName: payload.recipientName || payload.name,
    items: payload.cart || [],
    total: payload.total,
    shipMethod: payload.shipMethod,
    storeName: payload.storeName,
    note: payload.note,
    status,
    // 線上金流付款狀態（貨到付款訂單為 null）。買家從 ECPay 付完導回查單頁
    // 時，用這個顯示「付款完成」。
    paid: stored.payment?.status === 'paid',
    paymentStatus: stored.payment?.status || null,
    logisticsId: stored.logistics?.allPayLogisticsId,
    logisticsError: stored.logisticsError,
    // 完整時間軸 — UI 用來畫 ECPay 各階段事件，按 receivedAt asc 排好
    statusHistory: Array.isArray(stored.statusHistory)
      ? [...stored.statusHistory].sort((a, b) =>
          String(a.receivedAt).localeCompare(String(b.receivedAt)),
        )
      : [],
    latestStatus: stored.latestStatus || null,
  });
}

async function handleLabel(orderId, env) {
  if (!orderId || !/^JH-\d{6}-[A-Z0-9]{4}$/.test(orderId)) {
    return new Response('Invalid order id', { status: 400 });
  }
  if (!env.ORDER_FALLBACK) {
    return new Response('KV not configured', { status: 500 });
  }
  // KV key 是 order/{orderId}/{ts}，ts 不知道 → list with prefix
  const list = await env.ORDER_FALLBACK.list({ prefix: `order/${orderId}/` });
  if (!list.keys.length) {
    return new Response('找不到這筆訂單（可能已超過 30 天）', { status: 404 });
  }
  const raw = await env.ORDER_FALLBACK.get(list.keys[0].name);
  if (!raw) {
    return new Response('Order data missing', { status: 404 });
  }
  const stored = JSON.parse(raw);
  if (!stored.logistics) {
    return new Response(
      '這筆訂單沒有 ECPay 物流資料（可能自動建單失敗）。請至 ECPay 後台手動列印。',
      { status: 404 },
    );
  }
  if (!env.ECPAY_LOGISTICS_HASH_KEY || !env.ECPAY_LOGISTICS_HASH_IV) {
    return new Response('ECPay HashKey/HashIV not configured', { status: 500 });
  }
  return new Response(buildPrintFormHtml(stored.logistics, env), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
