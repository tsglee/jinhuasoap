// Shared cart state for the whole site.
// - Persists to localStorage under key `gf_cart` (matches the existing
//   gf_* namespace used by the tab router).
// - Tracks subtotal, shipping, total via derived values.
// - Exposes add / updateQty / remove / clear via useCart().
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'gf_cart';
const FREE_SHIPPING_THRESHOLD = 1200; // NTD
const FLAT_SHIPPING = 120; // NTD, island

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
   * `product` shape: { num, zh, lat, price, tone? }
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
      const { num, zh, lat, price, tone = 'warm' } = product;
      return [...current, { num, zh, lat, price, tone, qty }];
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
    const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
    const total = subtotal + shipping;
    return {
      items,
      itemCount,
      subtotal,
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
