// 加入購物籃 button — used by 02 十二花 (BuyBlock layout) and 04 購皂
// (compact card layout). Holds all the cart-add logic + the brief
// "已加入 ✓" confirmation flash so 02 and 04 can never disagree.
import { useState } from 'react';
import { useCart } from '../state/CartContext.jsx';

export function AddToCartButton({ p, fullWidth = false, size = 'md', onAdded }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const canBuy = p.price > 0;

  const handle = () => {
    if (!canBuy) return;
    const cartProduct = {
      num: p.num,
      zh: p.zh,
      lat: p.subtitle,
      price: p.price,
      photo: p.photos[0],
      tone: 'warm',
    };
    add(cartProduct, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
    if (onAdded) onAdded(p);
  };

  const padding = size === 'sm' ? '9px 14px' : '10px 18px';
  const fontSize = size === 'sm' ? 12 : 13;

  return (
    <button
      type="button"
      onClick={handle}
      disabled={!canBuy}
      aria-label={`加入購物籃 · ${p.zh}`}
      className="tc"
      style={{
        padding,
        fontSize,
        letterSpacing: 3,
        cursor: canBuy ? 'pointer' : 'not-allowed',
        opacity: canBuy ? 1 : 0.5,
        color: justAdded ? 'var(--red)' : 'var(--sumi)',
        background: justAdded ? 'var(--paper)' : 'transparent',
        border: `1px solid ${justAdded ? 'var(--red)' : 'var(--sumi)'}`,
        transition: 'color 200ms, background 200ms, border-color 200ms',
        fontFamily: 'inherit',
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      {justAdded ? '已加入購物籃 ✓' : canBuy ? '加入購物籃' : '取貨約訂'}
    </button>
  );
}
