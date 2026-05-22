// 240×240 pentagonal radar — 5 axes, value 0..5 each.
// Colors tuned to main-site cream/maroon/gold palette (NOT the redesign
// prototype's white+sky-blue). No external deps; pure SVG + trig.
//
// axes prop: [{ label: '修復', value: 5 }, ...]  (exactly 5 entries)

const SIZE = 240;
const C = SIZE / 2;
const RADIUS = 96;
const RINGS = 5;
const TAU = Math.PI * 2;

function point(idx, total, distance) {
  const angle = -Math.PI / 2 + (idx / total) * TAU; // start at top (north)
  return [C + Math.cos(angle) * distance, C + Math.sin(angle) * distance];
}

export function RadarFive({ axes, size = SIZE }) {
  if (!axes || axes.length !== 5) return null;
  const n = 5;
  const scale = size / SIZE;
  const radius = RADIUS * scale;
  const center = (size / 2);

  function pt(idx, distance) {
    const angle = -Math.PI / 2 + (idx / n) * TAU;
    return [center + Math.cos(angle) * distance, center + Math.sin(angle) * distance];
  }

  const ringPolys = Array.from({ length: RINGS }, (_, r) => {
    const ringR = radius * ((r + 1) / RINGS);
    return Array.from({ length: n }, (_, i) => pt(i, ringR).join(',')).join(' ');
  });
  const valuePoly = axes
    .map((axis, i) => pt(i, radius * (Math.max(0, Math.min(5, axis.value)) / 5)).join(','))
    .join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="五力分布圖"
    >
      {/* concentric rings — clay/gold-tinted hairlines */}
      {ringPolys.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(180, 149, 107, 0.25)"
          strokeWidth={1}
        />
      ))}
      {/* axis spokes */}
      {axes.map((_, i) => {
        const [x, y] = pt(i, radius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(180, 149, 107, 0.25)"
            strokeWidth={1}
          />
        );
      })}
      {/* value polygon — soft maroon fill, dark stroke */}
      <polygon
        points={valuePoly}
        fill="rgba(138, 42, 34, 0.10)"
        stroke="var(--sumi)"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      {/* value vertices — small red dots */}
      {axes.map((axis, i) => {
        const [x, y] = pt(i, radius * (Math.max(0, Math.min(5, axis.value)) / 5));
        return <circle key={i} cx={x} cy={y} r={3} fill="var(--red)" />;
      })}
      {/* axis labels — Noto Serif TC matches main site */}
      {axes.map((axis, i) => {
        const [x, y] = pt(i, radius + 22 * scale);
        return (
          <text
            key={i}
            x={x}
            y={y}
            fontSize={13 * scale}
            fontFamily="'Noto Serif TC', serif"
            fill="var(--ink-60)"
            textAnchor="middle"
            dominantBaseline="middle"
            letterSpacing="2"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
