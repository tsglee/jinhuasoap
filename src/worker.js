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
 */
import { createHash } from 'node:crypto';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/order') {
      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: '不支援此請求方式' }, 405, {
          Allow: 'POST',
        });
      }
      return handleOrder(request, env);
    }

    if (url.pathname === '/api/store-callback') {
      return handleStoreCallback(request);
    }

    if (url.pathname.startsWith('/api/label/')) {
      const orderId = url.pathname.slice('/api/label/'.length);
      return handleLabel(orderId, env);
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

export function checkMacValue(params, hashKey, hashIV) {
  const keys = Object.keys(params)
    .filter((k) => k !== 'CheckMacValue' && params[k] !== undefined && params[k] !== null)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const joined = keys.map((k) => `${k}=${params[k]}`).join('&');
  const wrapped = `HashKey=${hashKey}&${joined}&HashIV=${hashIV}`;
  const encoded = ecpayUrlEncode(wrapped).toLowerCase();
  return createHash('md5').update(encoded, 'utf8').digest('hex').toUpperCase();
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

// Normalize Taiwan mobile to ECPay 物流可接受格式：09 開頭、共 10 碼純數字。
// 容忍 dashes / spaces / 國際碼 +886 / 886 prefix — 全部去掉再驗。
// 失敗（不是台灣手機）回空字串，讓 ECPay 噴明確錯誤而不是吃下去。
function normalizeTwMobile(input) {
  if (!input) return '';
  const digits = String(input).replace(/[^\d]/g, '');
  let local = digits;
  if (local.startsWith('886')) local = local.slice(3);
  if (!local.startsWith('0')) local = '0' + local;
  return /^09\d{8}$/.test(local) ? local : '';
}

async function createShippingOrder(input, env) {
  const { orderId, subType, total, storeId, recipientName, recipientPhone, recipientEmail } = input;
  const tradeNo = orderIdToTradeNo(orderId);
  const merchantId = ecpayMerchantId(env);
  if (!merchantId) {
    return { ok: false, error: '未設定 ECPAY_MERCHANT_ID' };
  }

  const params = {
    MerchantID: merchantId,
    MerchantTradeNo: tradeNo,
    MerchantTradeDate: fmtDate(),
    LogisticsType: 'CVS',
    LogisticsSubType: subType, // UNIMARTC2C | FAMIC2C
    GoodsAmount: String(Math.round(total)),
    CollectionAmount: String(Math.round(total)),
    IsCollection: 'Y',
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

function buildPrintFormHtml(logistics, env) {
  const merchantId = ecpayMerchantId(env);
  const isUni = logistics.subType === 'UNIMARTC2C';
  const action =
    `${logisticsBaseUrl(env)}/Helper/` +
    (isUni ? 'PrintUniMartC2COrderInfo' : 'PrintFAMIC2COrderInfo');

  const params = {
    MerchantID: merchantId,
    AllPayLogisticsID: logistics.allPayLogisticsId,
    CVSPaymentNo: logistics.cvsPaymentNo,
  };
  // 7-11 用 CVSPaymentNo 即可；全家還要 CVSValidationNo
  if (!isUni && logistics.cvsValidationNo) {
    params.CVSValidationNo = logistics.cvsValidationNo;
  }
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
