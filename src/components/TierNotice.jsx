// TierNotice — surfaces the cart-tier rules (9折/免運門檻).
// Two variants: 'static' for the Products page banner, 'cart' for the cart
// sidebar (rules + dynamic progress hint). Thresholds are duplicated here
// (rather than imported from CartContext) to keep this presentational and
// avoid a Fast-Refresh boundary crossing.

const FREE_SHIPPING_THRESHOLD = 500;
const TIER_2 = 1000;

const RULES = [
  '滿 NT$1,000 享 9 折',
  '本島滿 NT$500 免運',
];

function progressFor(subtotal) {
  if (subtotal <= 0) return null;
  if (subtotal < FREE_SHIPPING_THRESHOLD) {
    return `再買 NT$${FREE_SHIPPING_THRESHOLD - subtotal} 即享免運　·　再買 NT$${TIER_2 - subtotal} 即享 9 折`;
  }
  if (subtotal < TIER_2) {
    return `已享免運　·　再買 NT$${TIER_2 - subtotal} 即享 9 折`;
  }
  return '已享 9 折 + 免運';
}

export function TierNotice({ variant = 'static', subtotal = 0 }) {
  if (variant === 'cart') {
    const progress = progressFor(subtotal);
    return (
      <div
        style={{
          marginTop: 18,
          padding: '12px 14px',
          border: '1px solid var(--ink-15)',
          background: 'rgba(244,236,215,0.5)',
          display: 'grid',
          gap: 8,
        }}
      >
        <div
          className="tc"
          style={{
            fontSize: 12.5,
            lineHeight: 1.7,
            letterSpacing: 1,
            color: 'var(--ink-60)',
          }}
        >
          {RULES.join('　·　')}
        </div>
        {progress && (
          <div
            className="tc"
            style={{
              fontSize: 13,
              letterSpacing: 1,
              color: 'var(--red)',
            }}
          >
            {progress}
          </div>
        )}
      </div>
    );
  }

  return (
    <section
      style={{
        background: 'rgba(244,236,215,0.6)',
        borderTop: '1px solid var(--ink-15)',
        borderBottom: '1px solid var(--ink-15)',
        padding: '14px 24px',
        textAlign: 'center',
      }}
    >
      <span
        className="mono"
        style={{ color: 'var(--gold-3)', fontSize: 11, letterSpacing: 3 }}
      >
        {RULES.join('　·　')}
      </span>
    </section>
  );
}
