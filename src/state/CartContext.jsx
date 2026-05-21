// Shared cart state for the whole site.
// - Persists to localStorage under key `gf_cart` (matches the existing
//   gf_* namespace used by the tab router).
// - Tracks subtotal, shipping, total via derived values.
// - Exposes add / updateQty / remove / clear via useCart().
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'gf_cart';
const FREE_SHIPPING_THRESHOLD = 500; // NTD
const FLAT_SHIPPING = 60; // NTD, island
// Tiers ordered high → low so .find returns the best applicable tier.
// 2026-05 老闆娘決定拿掉 NT$500 的 95 折（毛利吃不消），只留 NT$1000 的 9 折。
const DISCOUNT_TIERS = [
  { threshold: 1000, rate: 0.10 },
];

const CartContext = createContext(null);

function readInitialCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart);

  // Persist on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage may be unavailable (private browsing, quota); ignore.
    }
  }, [items]);

  /**
   * Add a product to the cart, or increment quantity if it's already there.
   * Each product is keyed by `num` (its Roman numeral product number).
   * `product` shape: { num, zh, lat, price, photo?, tone? }
   * (`lat` is the botanical Latin name — preserved so the order email
   * and cart row can show `玫瑰 · Rosa centifolia · № I`.)
   */
  const add = useCallback((product, qty = 1) => {
    setItems((current) => {
      const existing = current.find((i) => i.num === product.num);
      if (existing) {
        return current.map((i) =>
          i.num === product.num ? { ...i, qty: i.qty + qty } : i,
        );
      }
      const { num, zh, lat, price, photo = '', tone = 'warm' } = product;
      return [...current, { num, zh, lat, price, photo, tone, qty }];
    });
  }, []);

  /** Change qty by delta; removes the row if it goes to zero. */
  const updateQty = useCallback((num, delta) => {
    setItems((current) =>
      current
        .map((i) => (i.num === num ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const remove = useCallback((num) => {
    setItems((current) => current.filter((i) => i.num !== num));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    const itemCount = items.reduce((s, i) => s + i.qty, 0);
    const tier = DISCOUNT_TIERS.find((t) => subtotal >= t.threshold);
    const discountRate = tier?.rate ?? 0;
    const discount = Math.round(subtotal * discountRate);
    const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
    const total = subtotal - discount + shipping;
    return {
      items,
      itemCount,
      subtotal,
      discount,
      discountRate,
      shipping,
      total,
      add,
      updateQty,
      remove,
      clear,
    };
  }, [items, add, updateQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be called inside <CartProvider>');
  }
  return ctx;
}
