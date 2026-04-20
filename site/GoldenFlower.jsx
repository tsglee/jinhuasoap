// Shared GoldFlower emblem — a hand-drawn gold line-art lily.
// Scalable; accepts size. The `tone` and `stroke` props remain for API compat
// but the lily uses a single gold ink line on no background.
function GoldFlower({ size = 120, tone = "gold", stroke = true }) {
  const gold1 = "#c69a3a";
  const gold2 = "#e8cd78";
  const gold3 = "#8a6420";

  // Line color — always gold; tone just tweaks depth a touch
  const ink = tone === "dark" ? gold3 : gold1;
  const shade = gold3;

  // Thin / medium / accent stroke weights (tuned for size)
  const w1 = 0.8;   // fine veins
  const w2 = 1.2;   // petal outlines
  const w3 = 1.6;   // main stem + anthers

  return (
    <svg viewBox="0 0 200 200"
      style={{ width: size, height: size, display: "block", overflow: "visible" }}
      fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id={`lily-ink-${size}-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={gold2}/>
          <stop offset="50%" stopColor={gold1}/>
          <stop offset="100%" stopColor={gold3}/>
        </linearGradient>
      </defs>

      {/* ── Stem (curved, flicks up into the flower) ─────────────── */}
      <path d="M100 172 C 102 148, 98 124, 104 100"
        stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w3}/>

      {/* ── Lower leaves (two long leaves at the base) ────────────── */}
      {/* left leaf */}
      <g>
        <path d="M100 168 C 82 170, 64 162, 52 146 C 70 152, 86 160, 100 168 Z"
          stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w2}/>
        <path d="M100 168 C 84 161, 70 154, 56 148"
          stroke={shade} strokeWidth={w1} opacity="0.7"/>
      </g>
      {/* right leaf */}
      <g>
        <path d="M100 168 C 120 172, 140 168, 156 152 C 138 156, 118 162, 100 168 Z"
          stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w2}/>
        <path d="M100 168 C 118 162, 134 157, 150 152"
          stroke={shade} strokeWidth={w1} opacity="0.7"/>
      </g>
      {/* small tie wrapping the stems */}
      <path d="M94 170 C 100 174, 108 174, 112 170"
        stroke={ink} strokeWidth={w2}/>
      <path d="M95 172 L 111 172"
        stroke={shade} strokeWidth={w1} opacity="0.7"/>

      {/* ── Bloom: 5 petals radiating, three-quarter view ─────────── */}
      {/* Back-left big petal (curls up and back) */}
      <path d="M104 100 C 76 96, 52 76, 44 50 C 60 58, 80 78, 104 100 Z"
        stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w2}/>
      {/* top petal — tall, leaning right */}
      <path d="M104 100 C 118 74, 130 44, 128 20 C 140 38, 142 72, 118 98"
        stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w2}/>
      {/* right upper petal */}
      <path d="M104 100 C 132 88, 158 78, 170 60 C 162 82, 144 102, 118 110"
        stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w2}/>
      {/* front lower-left petal (the big cupped one) */}
      <path d="M104 100 C 86 110, 62 118, 46 132 C 68 132, 94 124, 110 110 Z"
        stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w2}/>
      {/* front lower-right petal */}
      <path d="M108 104 C 108 124, 116 140, 134 146 C 134 128, 128 112, 114 104 Z"
        stroke={`url(#lily-ink-${size}-${tone})`} strokeWidth={w2}/>

      {/* ── Veins on each petal (fan out from the throat) ─────────── */}
      <g stroke={shade} strokeWidth={w1} opacity="0.75">
        {/* back-left */}
        <path d="M104 100 C 84 92, 68 80, 52 60"/>
        <path d="M104 100 C 80 88, 62 74, 48 56"/>
        <path d="M104 100 C 76 86, 58 70, 44 50"/>
        {/* top */}
        <path d="M106 100 C 114 76, 122 50, 126 24"/>
        <path d="M108 100 C 118 74, 128 50, 134 28"/>
        {/* right */}
        <path d="M108 100 C 128 92, 150 80, 168 62"/>
        <path d="M110 102 C 132 94, 154 86, 170 68"/>
        {/* lower-left */}
        <path d="M104 102 C 90 110, 72 118, 56 130"/>
        <path d="M104 104 C 86 114, 68 124, 52 134"/>
        {/* lower-right */}
        <path d="M110 104 C 114 122, 122 136, 132 146"/>
        <path d="M112 104 C 118 124, 124 138, 130 148"/>
      </g>

      {/* ── Pistil + stamens (5 stamens with T-shaped anthers) ──── */}
      {/* pistil (long, tallest, with Y top) */}
      <path d="M104 100 C 96 82, 92 60, 94 34" stroke={ink} strokeWidth={w3}/>
      <path d="M92 32 L 96 36 M 90 30 L 98 30"
        stroke={ink} strokeWidth={w2}/>

      {/* stamens — 4 curving out from the throat, each with a T anther */}
      {[
        { d: "M104 100 C 96 86, 86 68, 74 50", ax: 72, ay: 48, angle: -50 },
        { d: "M104 100 C 100 80, 98 60, 104 42", ax: 104, ay: 40, angle: 0 },
        { d: "M104 100 C 112 84, 116 66, 120 48", ax: 122, ay: 46, angle: 25 },
        { d: "M104 100 C 114 88, 128 76, 140 64", ax: 142, ay: 62, angle: 50 },
      ].map((s, i) => (
        <g key={i}>
          <path d={s.d} stroke={ink} strokeWidth={w2}/>
          {/* Anther — a short angled bar */}
          <g transform={`translate(${s.ax} ${s.ay}) rotate(${s.angle})`}>
            <rect x="-5" y="-2.2" width="10" height="4.4" rx="1.8"
              fill={ink} stroke={ink}/>
            {/* pollen speckle */}
            <circle cx="0" cy="0" r="0.9" fill={gold3}/>
          </g>
        </g>
      ))}

      {/* Throat shading — tiny curved lines inside the flower's heart */}
      <g stroke={shade} strokeWidth={w1} opacity="0.8">
        <path d="M100 104 C 102 108, 108 108, 112 104"/>
        <path d="M98 106 C 104 112, 112 112, 116 106"/>
      </g>
    </svg>
  );
}

// Placeholder soap-photo: striped paper tile with a monospace note.
function PhotoPlaceholder({ ratio = "4/5", label = "soap photo", tone = "warm" }) {
  const palettes = {
    warm: ["#e6d4a3", "#d1b47a"],
    deep: ["#6e5a3a", "#4a3a22"],
    rose: ["#e2b8a8", "#c49689"],
    cool: ["#b8c4b2", "#8fa090"],
  };
  const [a, b] = palettes[tone] || palettes.warm;
  return (
    <div style={{
      aspectRatio: ratio,
      width: "100%",
      background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      position: "relative",
      overflow: "hidden",
      borderRadius: 2,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 18px, transparent 18px 36px)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: '"DM Mono", monospace', fontSize: 10,
        letterSpacing: 3, textTransform: "uppercase",
        color: "rgba(255,255,255,0.85)",
      }}>[ {label} ]</div>
    </div>
  );
}

// Rule line with a small gold diamond in the middle
function Divider({ width = "100%", tone = "gold" }) {
  const color = tone === "gold" ? "#8a6420" : "rgba(26,21,18,0.25)";
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 14, width,
    }}>
      <span style={{ flex: 1, height: 1, background: color, opacity: 0.45 }} />
      <span style={{
        width: 6, height: 6, background: color,
        transform: "rotate(45deg)",
      }} />
      <span style={{ flex: 1, height: 1, background: color, opacity: 0.45 }} />
    </div>
  );
}

Object.assign(window, { GoldFlower, PhotoPlaceholder, Divider });
