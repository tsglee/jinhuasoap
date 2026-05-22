// 240×240 pentagonal radar — 5 axes, value 0..5 each. No external deps,
// hand-rolled trig. Color pulled from --sumi / --sky-fill CSS vars (works
// in light theme of redesign.css).
//
// axes = [{ label: '修復', value: 5 }, ...]  // exactly 5 entries

const SIZE = 240;
const C = SIZE / 2; // center
const RADIUS = 96; // outer ring radius
const RINGS = 5;
const TAU = Math.PI * 2;

function point(idx, total, distance) {
  // -PI/2 = start at top (north)
  const angle = -Math.PI / 2 + (idx / total) * TAU;
  return [C + Math.cos(angle) * distance, C + Math.sin(angle) * distance];
}

export function RadarFive({ axes }) {
  if (!axes || axes.length !== 5) return null;
  const n = 5;
  const ringPolys = Array.from({ length: RINGS }, (_, r) => {
    const ringR = RADIUS * ((r + 1) / RINGS);
    return Array.from({ length: n }, (_, i) => point(i, n, ringR).join(',')).join(' ');
  });
  const valuePoly = axes
    .map((axis, i) => point(i, n, RADIUS * (Math.max(0, Math.min(5, axis.value)) / 5)).join(','))
    .join(' ');

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="五力分布圖"
    >
      {/* concentric rings */}
      {ringPolys.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="var(--ink-08)"
          strokeWidth={1}
        />
      ))}
      {/* axis spokes */}
      {axes.map((_, i) => {
        const [x, y] = point(i, n, RADIUS);
        return (
          <line
            key={i}
            x1={C}
            y1={C}
            x2={x}
            y2={y}
            stroke="var(--ink-08)"
            strokeWidth={1}
          />
        );
      })}
      {/* value polygon */}
      <polygon
        points={valuePoly}
        fill="var(--sky-fill)"
        stroke="var(--sumi)"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      {/* value vertices */}
      {axes.map((axis, i) => {
        const [x, y] = point(i, n, RADIUS * (Math.max(0, Math.min(5, axis.value)) / 5));
        return <circle key={i} cx={x} cy={y} r={2.5} fill="var(--sumi)" />;
      })}
      {/* axis labels */}
      {axes.map((axis, i) => {
        const [x, y] = point(i, n, RADIUS + 22);
        return (
          <text
            key={i}
            x={x}
            y={y}
            fontSize="12"
            fontFamily="var(--font-serif)"
            fill="var(--ink-80)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
