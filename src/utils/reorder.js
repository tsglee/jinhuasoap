// Reorder helper — lets a returning self-care regular re-add a past order in
// one tap (Shop「上次買的」row + /order「再買一次」button). No accounts: the last
// order's lines are stashed in localStorage on checkout success (Cart.jsx).
import { PRODUCTS } from '../data/products.js';

const KEY = 'gf_last_order';

// Returns { orderId, savedAt, lines:[{num, zh, qty}] } or null.
export function readLastOrder() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.lines) || !parsed.lines.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

// Re-add saved lines using CURRENT product data (price/photo may have moved).
// Skips bars that no longer exist or are made-to-order (price 0).
// Returns the number of distinct bars added.
export function reorderToCart(add, lines) {
  let added = 0;
  for (const line of lines || []) {
    const p = PRODUCTS.find((x) => x.num === line.num);
    if (!p || p.price <= 0) continue;
    add(
      {
        num: p.num,
        zh: p.zh,
        lat: p.subtitle,
        price: p.price,
        photo: p.photos?.[0] || '',
        tone: 'warm',
      },
      Math.max(1, line.qty || 1),
    );
    added += 1;
  }
  return added;
}
