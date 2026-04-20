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
        return jsonResponse({ ok: false, error: 'Method not allowed' }, 405, {
          Allow: 'POST',
        });
      }
      return handleOrder(request, env);
    }

    // Anything else: pass through to the static site.
    return env.ASSETS.fetch(request);
  },
};

async function handleOrder(request, env) {
  // 1. Parse + validate
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const errors = validateOrder(payload);
  if (errors.length) {
    return jsonResponse({ ok: false, error: errors.join('; ') }, 400);
  }

  if (!env.RESEND_API_KEY) {
    // Misconfiguration on our side, not a client error.
    return jsonResponse(
      { ok: false, error: 'Email transport not configured (RESEND_API_KEY missing)' },
      500,
    );
  }

  // 2. Build email
  const toEmail = env.ORDER_TO_EMAIL || 'tsghsunlee@gmail.com';
  const fromEmail = env.ORDER_FROM_EMAIL || 'onboarding@resend.dev';
  const { name, email, note, cart, total } = payload;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  const subject = `[金花樓] New order request from ${name} (NT$${total})`;
  const html = renderOrderEmailHtml({ name, email, note, cart, total, ip });
  const text = renderOrderEmailText({ name, email, note, cart, total, ip });

  // 3. Send via Resend
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Goldenflower <${fromEmail}>`,
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
        { ok: false, error: `Email transport rejected the request (${res.status})`, detail },
        502,
      );
    }
  } catch (err) {
    return jsonResponse({ ok: false, error: `Email transport failed: ${err.message}` }, 502);
  }

  return jsonResponse({ ok: true });
}

function validateOrder(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('Body must be a JSON object');
    return errors;
  }
  if (!payload.name || typeof payload.name !== 'string' || payload.name.length > 200) {
    errors.push('Name is required (≤200 chars)');
  }
  if (
    !payload.email ||
    typeof payload.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    payload.email.length > 200
  ) {
    errors.push('Valid email is required');
  }
  if (payload.note != null && (typeof payload.note !== 'string' || payload.note.length > 2000)) {
    errors.push('Note must be a string ≤2000 chars');
  }
  if (!Array.isArray(payload.cart) || payload.cart.length === 0 || payload.cart.length > 50) {
    errors.push('Cart must be a non-empty array (≤50 items)');
  } else {
    for (const item of payload.cart) {
      if (
        !item ||
        typeof item.num !== 'string' ||
        typeof item.zh !== 'string' ||
        typeof item.en !== 'string' ||
        typeof item.qty !== 'number' ||
        typeof item.price !== 'number' ||
        item.qty < 1 ||
        item.qty > 99
      ) {
        errors.push('Invalid cart item shape');
        break;
      }
    }
  }
  if (typeof payload.total !== 'number' || payload.total < 0) {
    errors.push('Total must be a non-negative number');
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

function renderOrderEmailHtml({ name, email, note, cart, total, ip }) {
  const rows = cart
    .map(
      (i) => `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">
            №&nbsp;${escapeHtml(i.num)}
          </td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">
            <strong>${escapeHtml(i.zh)}</strong> · ${escapeHtml(i.en)}
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
    ? `<p style="margin:18px 0 0;padding:10px 14px;background:#fcfaf2;border-left:3px solid #8a2a22;color:#1a1512;font-style:italic;">${escapeHtml(note)}</p>`
    : '';

  return `<!doctype html>
<html><body style="font-family:'Cormorant Garamond',Georgia,serif;color:#1a1512;background:#f7f3e7;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:28px;border:1px solid #ddd;">
    <h2 style="margin:0 0 6px;font-weight:500;letter-spacing:4px;">New order request</h2>
    <p style="margin:0 0 18px;color:#666;font-size:13px;letter-spacing:1px;text-transform:uppercase;">金花樓 · Goldenflower</p>

    <p style="margin:0 0 4px;"><strong>${escapeHtml(name)}</strong></p>
    <p style="margin:0 0 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>

    <table style="width:100%;border-collapse:collapse;margin-top:8px;">
      <thead>
        <tr style="text-align:left;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;">
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;">No.</th>
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;">Item</th>
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;text-align:center;">Qty</th>
          <th style="padding:6px 10px;border-bottom:1px solid #ccc;text-align:right;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:10px;text-align:right;font-style:italic;">Total</td>
          <td style="padding:10px;text-align:right;color:#8a2a22;font-size:18px;">NT$${total}</td>
        </tr>
      </tfoot>
    </table>

    ${noteBlock}

    <p style="margin:24px 0 0;color:#999;font-size:11px;">
      Submitted from ${escapeHtml(ip)} via jinhuasoap.com
    </p>
  </div>
</body></html>`;
}

function renderOrderEmailText({ name, email, note, cart, total, ip }) {
  const lines = [
    `New order request — 金花樓 · Goldenflower`,
    ``,
    `Name:  ${name}`,
    `Email: ${email}`,
    ``,
    `Cart:`,
    ...cart.map((i) => `  No. ${i.num}  ${i.zh} (${i.en})  × ${i.qty}  =  NT$${i.qty * i.price}`),
    ``,
    `Total: NT$${total}`,
  ];
  if (note) {
    lines.push('', 'Note:', note);
  }
  lines.push('', `Submitted from ${ip} via jinhuasoap.com`);
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
