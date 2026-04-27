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
 */

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
  const html = renderOrderEmailHtml({ orderId, name, email, note, cart, total, ip, ...shipFields });
  const text = renderOrderEmailText({ orderId, name, email, note, cart, total, ip, ...shipFields });

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
        { ok: false, error: `寄件服務回應錯誤（${res.status}）`, detail },
        502,
      );
    }
  } catch (err) {
    return jsonResponse({ ok: false, error: `寄件失敗：${err.message}` }, 502);
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

  return `<!doctype html>
<html lang="zh-Hant"><body style="font-family:'Noto Serif TC',Georgia,serif;color:#1a1512;background:#f8f5eb;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:28px;border:1px solid #ddd;">
    <h2 style="margin:0 0 6px;font-weight:500;letter-spacing:6px;">新訂購請求</h2>
    <p style="margin:0 0 6px;color:#666;font-size:13px;letter-spacing:3px;">金花樓 · 手壓天然皂</p>
    <p style="margin:0 0 18px;font-family:'DM Mono',monospace;font-size:14px;letter-spacing:2px;color:#8a2a22;">訂單編號 · ${escapeHtml(orderId)}</p>

    <p style="margin:0 0 4px;"><strong>${escapeHtml(name)}</strong></p>
    <p style="margin:0 0 6px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>

    ${shipBlock}

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
