// Illustrations — hand-drawn botanical/studio artworks rendered in SVG.
// Replace production with real photography; the brand holds on these
// illustrations as-is if needed.
//
// All illustrations live in the brand palette:
//   paper #ece3cf · gold #c69a3a / #e8cd78 / #8a6420 · red #8a2a22 · sumi #1a1512 · tea #4d6b4b

const ART = {
  paper: "#ece3cf",
  paper2: "#f4ecd7",
  paper3: "#e0d5bd",
  sumi: "#1a1512",
  clay: "#b4956b",
  tea: "#4d6b4b",
  red: "#8a2a22",
  gold1: "#c69a3a",
  gold2: "#e8cd78",
  gold3: "#8a6420",
};

// Paper texture + soft noise used inside illustrations
function PaperBg({ tone = "paper", children, style = {} }) {
  const bg = tone === "deep" ? ART.sumi
           : tone === "red"  ? ART.red
           : tone === "tea"  ? ART.tea
           : ART.paper2;
  return (
    <div style={{
      position: "relative",
      background: bg,
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(120,90,40,0.08) 1px, transparent 1.5px)",
        backgroundSize: "4px 4px",
        pointerEvents: "none",
      }} />
      {children}
    </div>
  );
}

// Corner marks for art prints
const CornerMarks = () => (
  <>
    {[
      { top: 8, left: 8, rotate: 0 },
      { top: 8, right: 8, rotate: 90 },
      { bottom: 8, right: 8, rotate: 180 },
      { bottom: 8, left: 8, rotate: 270 },
    ].map((p, i) => (
      <div key={i} style={{
        position: "absolute", width: 14, height: 14,
        borderTop: `1px solid ${ART.gold3}`, borderLeft: `1px solid ${ART.gold3}`,
        opacity: 0.5,
        ...p, transform: `rotate(${p.rotate}deg)`,
      }} />
    ))}
  </>
);

// Caption strip
const Caption = ({ children }) => (
  <div style={{
    position: "absolute", bottom: 12, left: 12,
    fontFamily: '"DM Mono", monospace', fontSize: 9,
    letterSpacing: 2, textTransform: "uppercase",
    color: `rgba(138,100,32,0.85)`,
    zIndex: 2,
  }}>{children}</div>
);

// ── Founder / portrait (stylized silhouette) ─────────────────────────────
function IllPortrait({ label = "portrait", ratio = "3/4" }) {
  return (
    <PaperBg tone="paper" style={{ aspectRatio: ratio, width: "100%" }}>
      <CornerMarks />
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* warm light */}
        <defs>
          <radialGradient id={`p-light-${label}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f4ecd7" />
            <stop offset="70%" stopColor="#e0d5bd" />
            <stop offset="100%" stopColor="#c9b996" />
          </radialGradient>
        </defs>
        <rect width="300" height="400" fill={`url(#p-light-${label})`} />
        {/* workbench */}
        <rect x="0" y="300" width="300" height="100" fill="#b49468" opacity="0.7" />
        <line x1="0" y1="300" x2="300" y2="300" stroke={ART.gold3} strokeWidth="0.5" opacity="0.4" />
        {/* silhouette — head + shoulders */}
        <g fill={ART.sumi} opacity="0.82">
          <ellipse cx="150" cy="150" rx="52" ry="62" />
          <path d="M72 320 C 82 240, 120 210, 150 210 C 180 210, 218 240, 228 320 L 228 400 L 72 400 Z" />
          {/* hair bun */}
          <ellipse cx="182" cy="108" rx="18" ry="14" />
        </g>
        {/* apron tie */}
        <path d="M120 220 L 150 235 L 180 220" fill="none" stroke={ART.red} strokeWidth="1.2" opacity="0.8" />
        {/* soap on bench */}
        <g transform="translate(50 310)">
          <rect x="0" y="0" width="50" height="24" rx="4" fill="#d9c086" />
          <rect x="0" y="0" width="50" height="4" fill="#c69a3a" opacity="0.5" />
        </g>
        <g transform="translate(200 312)">
          <rect x="0" y="0" width="40" height="20" rx="4" fill="#c49689" />
        </g>
        {/* window light beams */}
        <g opacity="0.18" fill="#f4ecd7">
          <polygon points="0,0 80,0 120,200 0,160" />
        </g>
      </svg>
      <Caption>{label}</Caption>
    </PaperBg>
  );
}

// ── Soap bar still life ───────────────────────────────────────────────────
function IllSoap({ label, tone = "warm", ratio = "4/5", flower = "rose" }) {
  const palettes = {
    warm: { a: "#e6d4a3", b: "#b59862", shadow: "rgba(90,70,30,0.4)" },
    deep: { a: "#6e5a3a", b: "#3e2e1e", shadow: "rgba(0,0,0,0.55)" },
    rose: { a: "#e2b8a8", b: "#a86a5a", shadow: "rgba(90,40,30,0.45)" },
    cool: { a: "#b8c4b2", b: "#6a7a68", shadow: "rgba(40,60,40,0.45)" },
  };
  const p = palettes[tone] || palettes.warm;

  return (
    <PaperBg tone="paper" style={{ aspectRatio: ratio, width: "100%" }}>
      <CornerMarks />
      <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id={`soap-light-${label}`} cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#f4ecd7" />
            <stop offset="100%" stopColor="#d9cba8" />
          </radialGradient>
          <linearGradient id={`soap-face-${label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.a} />
            <stop offset="100%" stopColor={p.b} />
          </linearGradient>
        </defs>
        <rect width="400" height="480" fill={`url(#soap-light-${label})`} />

        {/* surface reflection */}
        <ellipse cx="200" cy="420" rx="180" ry="16" fill="rgba(138,100,32,0.12)" />

        {/* back drape */}
        <path d="M0 180 Q 100 120, 200 160 T 400 140 L 400 260 L 0 260 Z"
          fill="#c9b996" opacity="0.6" />

        {/* soap shadow */}
        <ellipse cx="210" cy="340" rx="135" ry="18" fill={p.shadow} opacity="0.35" />

        {/* soap bar — rounded rectangle with bevel */}
        <g transform="translate(80 220)">
          <rect x="0" y="0" width="240" height="130" rx="14" fill={`url(#soap-face-${label})`} />
          {/* top bevel */}
          <rect x="0" y="0" width="240" height="14" rx="14" fill="#fff" opacity="0.18" />
          {/* emboss ring */}
          <g transform="translate(120 65)" opacity="0.7">
            <circle r="40" fill="none" stroke={ART.gold3} strokeWidth="0.8" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <ellipse key={i}
                  cx={Math.cos(a) * 18} cy={Math.sin(a) * 18}
                  rx="10" ry="4"
                  transform={`rotate(${(i / 8) * 360})`}
                  fill="none" stroke={ART.gold3} strokeWidth="0.8" />
              );
            })}
            <circle r="6" fill={ART.gold3} opacity="0.55" />
          </g>
        </g>

        {/* sprig of the botanical */}
        <g transform="translate(260 180)" opacity="0.9">
          {flower === "rose" && (
            <g>
              <circle cx="0" cy="0" r="16" fill={p.b} />
              <circle cx="-4" cy="-4" r="10" fill={p.a} />
              <path d="M0 16 C -6 40, -14 70, -30 90" stroke={ART.tea} strokeWidth="1.5" fill="none" />
              <ellipse cx="-20" cy="60" rx="10" ry="4" fill={ART.tea} transform="rotate(-30 -20 60)" />
            </g>
          )}
          {flower === "leaf" && (
            <g>
              <path d="M0 0 Q 20 20, 10 60 Q 0 80, -15 90" stroke={ART.tea} strokeWidth="1.5" fill="none" />
              {[0,1,2,3].map(i => (
                <ellipse key={i} cx={i*5-5} cy={15+i*18}
                  rx="12" ry="4"
                  transform={`rotate(${-20 + i*8} ${i*5-5} ${15+i*18})`}
                  fill={ART.tea} opacity="0.75" />
              ))}
            </g>
          )}
          {flower === "citrus" && (
            <g>
              <circle cx="0" cy="0" r="22" fill="#e5b13b" />
              <circle cx="-4" cy="-4" r="18" fill="#f4d06a" />
              <path d="M0 22 L -8 40" stroke={ART.tea} strokeWidth="1.5" />
              <ellipse cx="-12" cy="42" rx="10" ry="4" fill={ART.tea} transform="rotate(-30 -12 42)" />
            </g>
          )}
        </g>

        {/* wax seal dot */}
        <circle cx="88" cy="230" r="6" fill={ART.red} opacity="0.95" />
      </svg>
      <Caption>{label}</Caption>
    </PaperBg>
  );
}

// ── Process step illustration ─────────────────────────────────────────────
function IllStep({ step = "I", label, ratio = "4/3", tone = "warm" }) {
  const scenes = {
    I: ( // gather — basket with herbs
      <g>
        <ellipse cx="200" cy="260" rx="130" ry="24" fill="rgba(40,30,20,0.2)" />
        <path d="M100 170 L 110 260 L 290 260 L 300 170 Z" fill="#a08058" stroke={ART.gold3} strokeWidth="1"/>
        <path d="M100 170 L 300 170" stroke={ART.gold3} strokeWidth="1"/>
        {/* weave */}
        {Array.from({length: 8}).map((_,i)=>(
          <line key={i} x1={110+i*22} y1="172" x2={116+i*22} y2="258" stroke={ART.gold3} strokeWidth="0.5" opacity="0.5"/>
        ))}
        {/* herbs */}
        {Array.from({length: 12}).map((_,i)=>{
          const x = 120 + i*14 + (i%2)*6;
          return <g key={i} transform={`translate(${x} ${130 + (i%3)*10}) rotate(${-20 + i*5})`}>
            <path d="M0 0 Q 5 20, 0 40" stroke={ART.tea} strokeWidth="2" fill="none"/>
            <ellipse cx="-3" cy="10" rx="5" ry="2" fill={ART.tea} transform="rotate(-30)"/>
            <ellipse cx="3" cy="22" rx="5" ry="2" fill={ART.tea} transform="rotate(30)"/>
          </g>;
        })}
      </g>
    ),
    II: ( // render — copper pot with steam
      <g>
        <ellipse cx="200" cy="270" rx="120" ry="18" fill="rgba(40,30,20,0.25)" />
        <path d="M110 200 Q 110 260, 150 270 L 250 270 Q 290 260, 290 200 Z" fill="#c2793a" stroke={ART.gold3} strokeWidth="1"/>
        <ellipse cx="200" cy="200" rx="90" ry="18" fill="#d98b40" stroke={ART.gold3} strokeWidth="1"/>
        <ellipse cx="200" cy="200" rx="80" ry="12" fill="#8a5a20" />
        {/* handles */}
        <path d="M112 210 Q 90 220, 100 240" fill="none" stroke={ART.gold3} strokeWidth="3"/>
        <path d="M288 210 Q 310 220, 300 240" fill="none" stroke={ART.gold3} strokeWidth="3"/>
        {/* steam */}
        {[0,1,2].map(i=>(
          <path key={i} d={`M${170+i*30} 180 Q ${165+i*30} 140, ${180+i*30} 120 Q ${185+i*30} 90, ${170+i*30} 70`}
            stroke="rgba(236,227,207,0.65)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        ))}
      </g>
    ),
    III: ( // mix the lye — stoneware jar
      <g>
        <ellipse cx="200" cy="270" rx="100" ry="16" fill="rgba(40,30,20,0.25)" />
        <path d="M150 120 L 140 260 L 260 260 L 250 120 Z" fill="#8a8068" stroke={ART.sumi} strokeWidth="1"/>
        <ellipse cx="200" cy="120" rx="50" ry="10" fill="#5a5040"/>
        {/* water ring */}
        <ellipse cx="200" cy="120" rx="42" ry="7" fill="#c8d2c8" opacity="0.6"/>
        {/* stir stick */}
        <line x1="230" y1="80" x2="260" y2="40" stroke={ART.gold3} strokeWidth="3" strokeLinecap="round"/>
        {/* label */}
        <rect x="170" y="180" width="60" height="30" fill={ART.paper} stroke={ART.sumi} strokeWidth="0.5"/>
        <text x="200" y="200" textAnchor="middle" fontFamily='"Noto Serif TC", serif' fontSize="16" fill={ART.sumi}>鹼</text>
      </g>
    ),
    IV: ( // pour into moulds
      <g>
        <ellipse cx="200" cy="270" rx="140" ry="18" fill="rgba(40,30,20,0.22)" />
        {/* cedar mould */}
        <rect x="80" y="200" width="240" height="60" fill="#b48a5a" stroke={ART.gold3} strokeWidth="1"/>
        <rect x="80" y="200" width="240" height="10" fill="#a07a4a"/>
        {/* pour stream */}
        <path d="M200 60 Q 210 120, 200 200" stroke="#d9c086" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* pitcher */}
        <g transform="translate(165 20)">
          <path d="M0 0 L 60 0 L 65 30 Q 70 30, 75 40 L 60 50 L 0 50 Z" fill={ART.clay} stroke={ART.sumi} strokeWidth="0.5"/>
        </g>
        {/* soap surface in mould */}
        <rect x="90" y="220" width="220" height="30" fill="#e6d4a3"/>
      </g>
    ),
    V: ( // cut with wire
      <g>
        <ellipse cx="200" cy="275" rx="140" ry="14" fill="rgba(40,30,20,0.22)" />
        {/* board */}
        <rect x="40" y="230" width="320" height="40" fill="#a07a4a" stroke={ART.gold3} strokeWidth="0.5"/>
        {/* soap loaf with cuts */}
        <rect x="80" y="170" width="240" height="60" fill="#e6d4a3" stroke={ART.gold3} strokeWidth="0.5"/>
        {[1,2,3,4,5].map(i=>(
          <line key={i} x1={80+i*40} y1="170" x2={80+i*40} y2="230" stroke={ART.gold3} strokeWidth="0.5"/>
        ))}
        {/* wire cutter */}
        <line x1="60" y1="120" x2="340" y2="120" stroke={ART.sumi} strokeWidth="1"/>
        <rect x="40" y="110" width="20" height="20" fill={ART.sumi}/>
        <rect x="340" y="110" width="20" height="20" fill={ART.sumi}/>
        {/* wire descending on one cut */}
        <line x1="160" y1="120" x2="160" y2="200" stroke={ART.sumi} strokeWidth="0.8"/>
      </g>
    ),
    VI: ( // cure on cedar rack
      <g>
        <ellipse cx="200" cy="275" rx="150" ry="14" fill="rgba(40,30,20,0.2)" />
        {/* rack */}
        {[0,1,2].map(row=>(
          <g key={row} transform={`translate(0 ${80+row*60})`}>
            <rect x="60" y="30" width="280" height="8" fill="#a07a4a" stroke={ART.gold3} strokeWidth="0.5"/>
            {[0,1,2,3,4,5].map(i=>(
              <rect key={i} x={70+i*45} y={0} width="36" height="30"
                fill={i%2 ? "#e6d4a3" : "#d1b47a"} stroke={ART.gold3} strokeWidth="0.5"/>
            ))}
          </g>
        ))}
        {/* posts */}
        <rect x="56" y="70" width="8" height="200" fill="#8a6420"/>
        <rect x="336" y="70" width="8" height="200" fill="#8a6420"/>
      </g>
    ),
    VII: ( // seal with wax
      <g>
        <ellipse cx="200" cy="270" rx="130" ry="14" fill="rgba(40,30,20,0.22)" />
        {/* wrapped bar */}
        <rect x="110" y="180" width="180" height="90" fill={ART.paper2} stroke={ART.sumi} strokeWidth="0.5"/>
        {/* hemp string */}
        <line x1="110" y1="225" x2="290" y2="225" stroke={ART.gold3} strokeWidth="2"/>
        <line x1="200" y1="180" x2="200" y2="270" stroke={ART.gold3} strokeWidth="2"/>
        {/* wax seal */}
        <circle cx="200" cy="225" r="18" fill={ART.red}/>
        <circle cx="200" cy="225" r="18" fill="none" stroke="#6e2019" strokeWidth="2"/>
        <text x="200" y="232" textAnchor="middle" fontFamily='"Noto Serif TC", serif'
          fontSize="14" fontWeight="600" fill={ART.gold2}>花</text>
        {/* wax droplet falling */}
        <path d="M200 120 L 205 140 L 195 140 Z" fill={ART.red} opacity="0.8"/>
      </g>
    ),
  };

  return (
    <PaperBg tone="paper" style={{ aspectRatio: ratio, width: "100%" }}>
      <CornerMarks />
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id={`step-bg-${step}`} cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#f4ecd7" />
            <stop offset="100%" stopColor="#d9cba8" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#step-bg-${step})`} />
        {scenes[step]}
      </svg>
      <Caption>{label}</Caption>
    </PaperBg>
  );
}

// ── Gift box ─────────────────────────────────────────────────────────────
function IllGiftBox({ label = "cedar gift box", ratio = "4/3" }) {
  return (
    <PaperBg tone="deep" style={{ aspectRatio: ratio, width: "100%" }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="box-light" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="rgba(230,205,120,0.2)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={ART.sumi}/>
        <rect width="400" height="300" fill="url(#box-light)"/>

        {/* box */}
        <g transform="translate(60 80)">
          {/* shadow */}
          <ellipse cx="140" cy="170" rx="160" ry="14" fill="rgba(0,0,0,0.5)"/>
          {/* box body */}
          <path d="M0 30 L 30 0 L 280 0 L 280 140 L 0 140 Z" fill="#8a6420" stroke={ART.gold1} strokeWidth="0.8"/>
          <path d="M0 30 L 280 30 L 280 140 L 0 140 Z" fill="#b48a4a"/>
          <path d="M0 30 L 30 0 L 280 0 L 250 30 Z" fill="#6a4a10"/>
          {/* 4 soap bars inside */}
          {[0,1,2,3].map(i=>(
            <rect key={i} x={20+i*62} y={45} width="50" height="75"
              fill={["#e6d4a3","#e2b8a8","#d9c086","#c8b0a0"][i]}
              stroke={ART.gold3} strokeWidth="0.4"/>
          ))}
          {/* ribbon */}
          <rect x="140" y="-4" width="18" height="148" fill={ART.red}/>
          <rect x="-4" y="60" width="288" height="12" fill={ART.red}/>
          {/* bow */}
          <path d="M140 60 Q 125 45, 135 60 Q 125 75, 140 60" fill={ART.red}/>
          <path d="M158 60 Q 173 45, 163 60 Q 173 75, 158 60" fill={ART.red}/>
          <circle cx="149" cy="60" r="5" fill={ART.red_2 || "#6e2019"}/>
        </g>
      </svg>
      <Caption style={{ color: ART.gold2 }}>{label}</Caption>
    </PaperBg>
  );
}

// ── Ingredient "no" list — crossed-out bottles ──────────────────────────
function IllNoList({ label = "the no list", ratio = "1/1" }) {
  return (
    <PaperBg tone="paper" style={{ aspectRatio: ratio, width: "100%" }}>
      <CornerMarks />
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect width="400" height="400" fill={ART.paper2}/>
        <rect width="400" height="400" fill="none"/>
        {/* shelf */}
        <line x1="20" y1="310" x2="380" y2="310" stroke={ART.gold3} strokeWidth="1"/>
        <line x1="20" y1="311" x2="380" y2="311" stroke={ART.gold3} strokeWidth="0.5" opacity="0.5"/>

        {/* bottles */}
        {[
          { x: 60,  label: "香精", sub: "frag", h: 120, w: 44, color: "#a86a5a" },
          { x: 130, label: "色素", sub: "dye",  h: 100, w: 38, color: "#7a8a6a" },
          { x: 195, label: "棕櫚", sub: "palm", h: 140, w: 50, color: "#c29a4a" },
          { x: 270, label: "塑膜", sub: "plast",h: 110, w: 40, color: "#6a8a9a" },
          { x: 335, label: "催劑", sub: "accel",h: 130, w: 38, color: "#8a5a3a" },
        ].map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${310 - b.h})`}>
            {/* neck */}
            <rect x={b.w/2 - 6} y="0" width="12" height="18" fill={b.color}/>
            {/* body */}
            <rect x="0" y="18" width={b.w} height={b.h - 18} rx="4" fill={b.color}/>
            {/* highlight */}
            <rect x="3" y="20" width="3" height={b.h - 22} fill="rgba(255,255,255,0.25)"/>
            {/* label */}
            <rect x="4" y={b.h/2} width={b.w - 8} height="30" fill={ART.paper}/>
            <text x={b.w/2} y={b.h/2 + 20} textAnchor="middle"
              fontFamily='"Noto Serif TC", serif' fontSize="12" fill={ART.sumi}>{b.label}</text>
            {/* cross-out X */}
            <line x1="-4" y1="-4" x2={b.w+4} y2={b.h+4} stroke={ART.red} strokeWidth="3" opacity="0.9"/>
            <line x1={b.w+4} y1="-4" x2="-4" y2={b.h+4} stroke={ART.red} strokeWidth="3" opacity="0.9"/>
          </g>
        ))}

        {/* stamp top-right */}
        <g transform="translate(300 50) rotate(-8)">
          <rect x="0" y="0" width="70" height="40" fill="none" stroke={ART.red} strokeWidth="2"/>
          <text x="35" y="26" textAnchor="middle"
            fontFamily='"DM Mono", monospace' fontSize="11"
            letterSpacing="2" fill={ART.red}>NOT IN</text>
        </g>
      </svg>
      <Caption>{label}</Caption>
    </PaperBg>
  );
}

// ── Hero portrait for About (founder at workbench) ──────────────────────
function IllWorkbench({ label = "founder at workbench, morning light", ratio = "3/4" }) {
  return (
    <PaperBg tone="paper" style={{ aspectRatio: ratio, width: "100%" }}>
      <CornerMarks />
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="wb-sun" cx="80%" cy="20%" r="60%">
            <stop offset="0%" stopColor="rgba(255,240,200,0.8)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <rect width="300" height="400" fill="#e0d0a8"/>
        <rect width="300" height="400" fill="url(#wb-sun)"/>

        {/* window */}
        <rect x="180" y="40" width="90" height="150" fill="#f8ecc8" stroke={ART.gold3} strokeWidth="0.5"/>
        <line x1="225" y1="40" x2="225" y2="190" stroke={ART.gold3} strokeWidth="0.5"/>
        <line x1="180" y1="115" x2="270" y2="115" stroke={ART.gold3} strokeWidth="0.5"/>

        {/* wall shelf with soaps */}
        <line x1="20" y1="130" x2="160" y2="130" stroke={ART.gold3} strokeWidth="1"/>
        {[0,1,2,3].map(i=>(
          <rect key={i} x={30+i*30} y="100" width="24" height="28"
            fill={["#e6d4a3","#c49689","#b8c4b2","#d9c086"][i]}
            stroke={ART.gold3} strokeWidth="0.4"/>
        ))}

        {/* bench */}
        <rect x="0" y="280" width="300" height="20" fill="#a07a4a"/>
        <rect x="0" y="300" width="300" height="100" fill="#8a6420"/>

        {/* silhouette — looking down at work */}
        <g fill={ART.sumi} opacity="0.85">
          <ellipse cx="130" cy="200" rx="28" ry="32"/>
          {/* bun */}
          <ellipse cx="150" cy="175" rx="12" ry="10"/>
          {/* shoulders */}
          <path d="M80 290 C 90 240, 115 220, 130 220 C 145 220, 170 240, 180 290 L 180 300 L 80 300 Z"/>
          {/* arm reaching down */}
          <path d="M150 250 Q 170 270, 175 295 L 155 295 Q 150 275, 140 260 Z"/>
        </g>

        {/* soap being cut on bench */}
        <rect x="120" y="290" width="50" height="18" fill="#e6d4a3" stroke={ART.gold3} strokeWidth="0.4"/>
        <line x1="120" y1="280" x2="170" y2="280" stroke={ART.sumi} strokeWidth="0.6"/>

        {/* herbs hanging */}
        <g transform="translate(50 40)">
          {[0,1,2].map(i=>(
            <g key={i} transform={`translate(${i*30} 0)`}>
              <line x1="0" y1="0" x2="0" y2="20" stroke={ART.gold3} strokeWidth="0.5"/>
              <path d="M0 20 Q 5 40, 0 60" stroke={ART.tea} strokeWidth="2" fill="none"/>
              <ellipse cx="-4" cy="35" rx="5" ry="2" fill={ART.tea}/>
              <ellipse cx="4" cy="50" rx="5" ry="2" fill={ART.tea}/>
            </g>
          ))}
        </g>
      </svg>
      <Caption>{label}</Caption>
    </PaperBg>
  );
}

// ── Ingredient photo tile (SHIRO-style) ─────────────────────────────────
// Textured square "photograph" of a raw material. Name + label overlay in center.
function IllIngredient({ kind = "olive", zh, en, benefit, ratio = "1/1" }) {
  // Per-ingredient palettes + texture hints
  const recipes = {
    olive:    { bg: ["#4a5a2e", "#2a3418"], accent: "#c2a64a", kind: "fruit" },
    coconut:  { bg: ["#f2e6cc", "#b89a70"], accent: "#8a6420", kind: "husk" },
    castor:   { bg: ["#6a5038", "#2e1f12"], accent: "#a87a42", kind: "seed" },
    water:    { bg: ["#8aa6aa", "#3a5258"], accent: "#dceae8", kind: "ripple" },
    lye:      { bg: ["#e6e2d6", "#a8a293"], accent: "#8a8068", kind: "crystal" },
    botanical:{ bg: ["#4d6b4b", "#1f2e1f"], accent: "#c69a3a", kind: "leaf" },
    salt:     { bg: ["#e8ecef", "#a8b0b8"], accent: "#6e7a84", kind: "crystal" },
    honey:    { bg: ["#c69a3a", "#6e4a10"], accent: "#f4d06a", kind: "pour" },
  };
  const r = recipes[kind] || recipes.olive;

  // Seeded pseudo-random for consistent texture
  const rand = (seed) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };

  return (
    <div style={{
      position: "relative",
      aspectRatio: ratio, width: "100%",
      overflow: "hidden",
      background: r.bg[1],
    }}>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id={`ing-bg-${kind}`} cx="50%" cy="40%" r="75%">
            <stop offset="0%" stopColor={r.bg[0]}/>
            <stop offset="100%" stopColor={r.bg[1]}/>
          </radialGradient>
          <filter id={`grain-${kind}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed={kind.length}/>
            <feColorMatrix values="0 0 0 0 0.05  0 0 0 0 0.04  0 0 0 0 0.02  0 0 0 0.35 0"/>
            <feComposite in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>
        <rect width="400" height="400" fill={`url(#ing-bg-${kind})`}/>

        {/* Texture layer — per-kind */}
        {r.kind === "fruit" && (
          <g opacity="0.9">
            {Array.from({length: 24}).map((_, i) => {
              const cx = rand(i) * 400;
              const cy = 60 + rand(i*7) * 340;
              const rr = 14 + rand(i*3) * 12;
              return (
                <g key={i} transform={`translate(${cx} ${cy})`}>
                  <ellipse rx={rr} ry={rr*0.85} fill={r.bg[0]} opacity="0.8"/>
                  <ellipse rx={rr*0.6} ry={rr*0.5} cx={-rr*0.3} cy={-rr*0.3}
                    fill={r.accent} opacity="0.35"/>
                </g>
              );
            })}
            {/* leaves */}
            {Array.from({length: 12}).map((_, i) => {
              const cx = rand(i+50) * 400;
              const cy = rand(i+80) * 400;
              const rot = rand(i+10) * 360;
              return (
                <ellipse key={`l${i}`} cx={cx} cy={cy} rx="16" ry="5"
                  transform={`rotate(${rot} ${cx} ${cy})`}
                  fill={r.accent} opacity="0.28"/>
              );
            })}
          </g>
        )}

        {r.kind === "husk" && (
          <g opacity="0.95">
            {/* shredded coconut — pale striations */}
            {Array.from({length: 80}).map((_, i) => {
              const x = rand(i) * 400;
              const y = rand(i*3) * 400;
              const len = 30 + rand(i*5) * 50;
              const rot = rand(i*7) * 360;
              return (
                <rect key={i} x={x} y={y} width={len} height="2.5"
                  transform={`rotate(${rot} ${x} ${y})`}
                  fill={i%3 === 0 ? r.accent : "#fff"}
                  opacity={0.35 + rand(i) * 0.4}/>
              );
            })}
          </g>
        )}

        {r.kind === "seed" && (
          <g opacity="0.92">
            {Array.from({length: 38}).map((_, i) => {
              const cx = rand(i) * 400;
              const cy = rand(i*11) * 400;
              const rot = rand(i*5) * 360;
              return (
                <g key={i} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
                  <ellipse rx="18" ry="11" fill={r.bg[0]}/>
                  <ellipse rx="12" ry="6" cx="-3" cy="-2" fill={r.accent} opacity="0.6"/>
                  <path d="M-12 0 L 12 0" stroke={r.bg[1]} strokeWidth="0.6" opacity="0.7"/>
                </g>
              );
            })}
          </g>
        )}

        {r.kind === "ripple" && (
          <g opacity="0.8" fill="none" stroke={r.accent} strokeWidth="0.8">
            {Array.from({length: 14}).map((_, i) => (
              <ellipse key={i} cx="200" cy="220"
                rx={30 + i*22} ry={8 + i*5}
                opacity={0.5 - i*0.025}/>
            ))}
            {/* highlight streaks */}
            {[0,1,2,3].map(i => (
              <path key={`s${i}`} d={`M${60+i*90} 180 Q ${80+i*90} 170, ${120+i*90} 180`}
                stroke="#fff" strokeWidth="1.5" opacity="0.35"/>
            ))}
          </g>
        )}

        {r.kind === "crystal" && (
          <g opacity="0.92">
            {Array.from({length: 55}).map((_, i) => {
              const cx = rand(i) * 400;
              const cy = rand(i*13) * 400;
              const s = 4 + rand(i*2) * 8;
              const rot = rand(i*5) * 45;
              return (
                <rect key={i} x={cx} y={cy} width={s} height={s}
                  transform={`rotate(${rot} ${cx} ${cy})`}
                  fill={i%4 === 0 ? "#fff" : r.bg[0]}
                  opacity={0.5 + rand(i)*0.4}/>
              );
            })}
          </g>
        )}

        {r.kind === "leaf" && (
          <g opacity="0.9">
            {Array.from({length: 28}).map((_, i) => {
              const cx = rand(i) * 400;
              const cy = rand(i*9) * 400;
              const rot = rand(i*3) * 360;
              const s = 0.8 + rand(i*7);
              return (
                <g key={i} transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${s})`}>
                  <path d="M0 -20 Q 10 0, 0 20 Q -10 0, 0 -20 Z"
                    fill={r.bg[0]} opacity="0.85"/>
                  <line x1="0" y1="-18" x2="0" y2="18"
                    stroke={r.accent} strokeWidth="0.4" opacity="0.5"/>
                </g>
              );
            })}
          </g>
        )}

        {r.kind === "pour" && (
          <g>
            {/* amber pool */}
            <ellipse cx="200" cy="280" rx="180" ry="100" fill={r.bg[0]} opacity="0.7"/>
            {/* honey drip */}
            <path d="M200 0 Q 195 80, 205 160 Q 200 200, 208 260"
              stroke={r.accent} strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.9"/>
            <ellipse cx="208" cy="260" rx="24" ry="8" fill={r.accent} opacity="0.8"/>
            {/* highlights */}
            {[0,1,2].map(i => (
              <ellipse key={i} cx={120 + i*80} cy={260 + i*6} rx="40" ry="4"
                fill="#fff" opacity="0.2"/>
            ))}
          </g>
        )}

        {/* Grain overlay */}
        <rect width="400" height="400" filter={`url(#grain-${kind})`} opacity="0.5"/>
        {/* Soft vignette */}
        <radialGradient id={`vg-${kind}`} cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)"/>
        </radialGradient>
        <rect width="400" height="400" fill={`url(#vg-${kind})`}/>
      </svg>

      {/* Text overlay — SHIRO-style centered */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        color: "#f4ecd7",
        textAlign: "center",
        padding: 20,
        textShadow: "0 1px 12px rgba(0,0,0,0.55)",
      }}>
        <div style={{
          fontFamily: '"Noto Serif TC", serif',
          fontSize: 30, fontWeight: 500,
          letterSpacing: 6,
          marginBottom: 8,
        }}>{zh}</div>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 10, letterSpacing: 3,
          textTransform: "uppercase",
          color: "#e8cd78",
          marginBottom: 14,
        }}>{en}</div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic", fontSize: 15,
          letterSpacing: 1,
          color: "#f4ecd7",
          opacity: 0.92,
        }}>&lt; {benefit} &gt;</div>
      </div>
    </div>
  );
}

// ── Editorial product hero (natural-light ad still life) ────────────────
// Two staging modes:
//   "bowl"  — soap resting in a speckled ceramic bowl on a wood counter
//   "kraft" — soap leaning against a kraft-paper gift box on wood
// The product looks like a real photograph of the brand's soap in-situ.
function IllProductHero({
  tone = "warm",
  staging = "bowl",      // "bowl" | "kraft"
  overlayZh,             // big Chinese headline
  overlayEn,             // italic English sub
  wordmark = "GOLDENFLOWER",
  ratio = "4/5",
}) {
  const palettes = {
    warm: { soap: "#e3c78a", soapEdge: "#a77e3e", stamp: "#6e4a10" },
    rose: { soap: "#d7a999", soapEdge: "#8e5a4a", stamp: "#5a2418" },
    cool: { soap: "#b6bfb2", soapEdge: "#5f6e5f", stamp: "#2a3a2a" },
    deep: { soap: "#7a6038", soapEdge: "#3a2a14", stamp: "#1a1008" },
  };
  const p = palettes[tone] || palettes.warm;
  const id = `${staging}-${tone}-${(overlayZh || "x").codePointAt(0)}`;

  return (
    <div style={{
      position: "relative", aspectRatio: ratio, width: "100%",
      overflow: "hidden", background: "#2a1d10",
    }}>
      <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          {/* window-lit warm gradient wall */}
          <radialGradient id={`wall-${id}`} cx="70%" cy="20%" r="90%">
            <stop offset="0%"  stopColor="#c9a76a"/>
            <stop offset="55%" stopColor="#6a4a2a"/>
            <stop offset="100%" stopColor="#241811"/>
          </radialGradient>
          {/* wood counter */}
          <linearGradient id={`wood-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a5a36"/>
            <stop offset="100%" stopColor="#3d2a18"/>
          </linearGradient>
          {/* soap face shading */}
          <linearGradient id={`soap-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.soap}/>
            <stop offset="100%" stopColor={p.soapEdge}/>
          </linearGradient>
          {/* grain */}
          <filter id={`grain-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={id.length}/>
            <feColorMatrix values="0 0 0 0 0.05  0 0 0 0 0.04  0 0 0 0 0.02  0 0 0 0.3 0"/>
            <feComposite in2="SourceGraphic" operator="in"/>
          </filter>
          {/* soft bokeh blur plant */}
          <filter id={`blur-${id}`}>
            <feGaussianBlur stdDeviation="6"/>
          </filter>
        </defs>

        {/* Wall backdrop */}
        <rect width="800" height="680" fill={`url(#wall-${id})`}/>

        {/* Out-of-focus pine sprig, top-right (suggest nature like the ref) */}
        <g opacity="0.55" filter={`url(#blur-${id})`}>
          <g transform="translate(640 80) rotate(24)">
            <line x1="0" y1="0" x2="160" y2="0" stroke="#3a4a2a" strokeWidth="4"/>
            {Array.from({length: 14}).map((_, i) => {
              const x = 10 + i*10;
              const len = 24 + (i%3)*4;
              return (
                <g key={i}>
                  <line x1={x} y1="0" x2={x - len*0.2} y2={-len} stroke="#4a5e32" strokeWidth="1.5"/>
                  <line x1={x} y1="0" x2={x - len*0.2} y2={len}  stroke="#4a5e32" strokeWidth="1.5"/>
                </g>
              );
            })}
          </g>
        </g>

        {/* Window glow suggestion, top-left */}
        <rect x="0" y="0" width="260" height="280" fill="rgba(255,235,190,0.12)"/>

        {/* Counter edge */}
        <rect x="0" y="680" width="800" height="320" fill={`url(#wood-${id})`}/>
        {/* wood grain lines */}
        {Array.from({length: 18}).map((_, i) => (
          <line key={i}
            x1="0" y1={690 + i*18}
            x2="800" y2={690 + i*18 + (i%3)*3}
            stroke="rgba(20,10,4,0.25)" strokeWidth="0.8"/>
        ))}

        {/* Cast shadow of prop on counter */}
        <ellipse cx="400" cy="830" rx="260" ry="22" fill="rgba(0,0,0,0.55)"/>

        {staging === "bowl" && (
          <g>
            {/* Ceramic bowl — cream with dark speckles, as in the pine-tar ref */}
            <ellipse cx="400" cy="820" rx="250" ry="46" fill="#c9b996"/>
            <path d="M150 820 Q 180 900, 280 920 L 520 920 Q 620 900, 650 820 Z"
              fill="#b59f73"/>
            {/* rim shadow */}
            <ellipse cx="400" cy="820" rx="250" ry="46" fill="none" stroke="#6a5630" strokeWidth="1.5" opacity="0.6"/>
            {/* inner well */}
            <ellipse cx="400" cy="820" rx="220" ry="38" fill="#a89373"/>
            {/* highlight on bowl */}
            <path d="M180 812 Q 260 780, 380 778" stroke="rgba(255,240,210,0.55)" strokeWidth="4" fill="none"/>
            {/* speckles */}
            {Array.from({length: 80}).map((_, i) => {
              const a = (i*137.5) % 360;
              const r = 60 + (i*13 % 180);
              const cx = 400 + Math.cos(a * Math.PI/180) * r;
              const cy = 820 + Math.sin(a * Math.PI/180) * r * 0.18 + ((i*7)%20);
              return (
                <circle key={i} cx={cx} cy={cy} r={1 + (i%3)}
                  fill={i%5 === 0 ? "#4a3a1a" : "#6a5030"}
                  opacity={0.8}/>
              );
            })}

            {/* Soap sitting in bowl — slight tilt */}
            <g transform="translate(400 780) rotate(-3)">
              {/* soap shadow in bowl */}
              <ellipse cx="0" cy="44" rx="170" ry="10" fill="rgba(0,0,0,0.4)"/>
              {/* soap body */}
              <rect x="-160" y="-16" width="320" height="80" rx="10"
                fill={`url(#soap-${id})`} stroke={p.soapEdge} strokeWidth="1"/>
              {/* top bevel */}
              <rect x="-160" y="-16" width="320" height="10" rx="10" fill="rgba(255,255,255,0.25)"/>
              {/* side face tone */}
              <rect x="-160" y="54" width="320" height="10" rx="6" fill={p.soapEdge} opacity="0.6"/>
              {/* embossed wordmark like "MOONLIGHT" */}
              <g transform="translate(0 26)">
                <rect x="-96" y="-22" width="192" height="42" rx="2" fill="none"
                  stroke={p.stamp} strokeWidth="0.8" opacity="0.8"/>
                <text x="0" y="0" textAnchor="middle"
                  fontFamily='"Cormorant Garamond", serif' fontSize="18"
                  letterSpacing="6" fill={p.stamp}>{wordmark}</text>
                <text x="0" y="16" textAnchor="middle"
                  fontFamily='"DM Mono", monospace' fontSize="7"
                  letterSpacing="4" fill={p.stamp}>HAND PRESSED · TAIPEI</text>
              </g>
            </g>
          </g>
        )}

        {staging === "kraft" && (
          <g>
            {/* Kraft gift box (behind) */}
            <g transform="translate(380 520)">
              <path d="M0 0 L 260 0 L 260 220 L 0 220 Z" fill="#c9a572"/>
              <path d="M0 0 L 260 0 L 240 18 L 20 18 Z" fill="#a07a42"/>
              <path d="M0 0 L 20 18 L 20 238 L 0 220 Z" fill="#8a6430"/>
              {/* stamped block on box — mimics 傳世生藥 ref */}
              <rect x="60" y="50" width="160" height="130" fill="none"
                stroke="#5a3a14" strokeWidth="0.8" opacity="0.6"/>
              <text x="140" y="96" textAnchor="middle"
                fontFamily='"Noto Serif TC", serif' fontSize="30" letterSpacing="6"
                fill="#5a3a14">金花樓</text>
              <text x="140" y="126" textAnchor="middle"
                fontFamily='"Cormorant Garamond", serif' fontStyle="italic"
                fontSize="11" letterSpacing="4" fill="#5a3a14">Goldenflower</text>
              {/* tiny botanical ornament */}
              <g transform="translate(140 150)" stroke="#5a3a14" strokeWidth="0.6" fill="none" opacity="0.5">
                <path d="M-40 0 Q -20 -6, 0 0 Q 20 6, 40 0"/>
                <path d="M-30 0 L -34 -6"/>
                <path d="M-10 0 L -14 -6"/>
                <path d="M10 0 L 14 -6"/>
                <path d="M30 0 L 34 -6"/>
              </g>
            </g>

            {/* Round soap tilted on edge, in front of box */}
            <g transform="translate(250 720) rotate(-14)">
              <ellipse cx="0" cy="120" rx="120" ry="12" fill="rgba(0,0,0,0.5)"/>
              <circle r="126" fill={`url(#soap-${id})`} stroke={p.soapEdge} strokeWidth="1.2"/>
              <circle r="126" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"
                strokeDasharray="2 400" strokeDashoffset="-20"/>
              {/* engraved center */}
              <circle r="78" fill="none" stroke={p.stamp} strokeWidth="0.8" opacity="0.7"/>
              <text x="0" y="-8" textAnchor="middle"
                fontFamily='"Noto Serif TC", serif' fontSize="56" fontWeight="500"
                fill={p.stamp}>金花</text>
              <text x="0" y="28" textAnchor="middle"
                fontFamily='"Cormorant Garamond", serif' fontStyle="italic"
                fontSize="14" letterSpacing="4" fill={p.stamp}>Goldenflower</text>
              <text x="0" y="50" textAnchor="middle"
                fontFamily='"DM Mono", monospace' fontSize="8" letterSpacing="3"
                fill={p.stamp}>HAND PRESSED</text>
            </g>
          </g>
        )}

        {/* Overall grain */}
        <rect width="800" height="1000" filter={`url(#grain-${id})`} opacity="0.45"/>
        {/* Subtle vignette */}
        <radialGradient id={`vign-${id}`} cx="50%" cy="45%" r="85%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)"/>
        </radialGradient>
        <rect width="800" height="1000" fill={`url(#vign-${id})`}/>
      </svg>

      {/* Bilingual overlay — big Zh headline over italic En, like the "數百年來" ref */}
      {(overlayZh || overlayEn) && (
        <div style={{
          position: "absolute", top: 40, left: 40, right: 40,
          color: "#f4ecd7",
          textShadow: "0 2px 18px rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }}>
          {overlayZh && (
            <div style={{
              fontFamily: '"Noto Serif TC", serif',
              fontSize: "clamp(20px, 3.2vw, 34px)",
              fontWeight: 500, letterSpacing: 4,
              lineHeight: 1.35,
              maxWidth: "70%",
              whiteSpace: "pre-line",
            }}>{overlayZh}</div>
          )}
          {overlayEn && (
            <div style={{
              marginTop: 8,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "clamp(13px, 1.3vw, 17px)",
              letterSpacing: 2,
              color: "#e8cd78",
              maxWidth: "70%",
            }}>{overlayEn}</div>
          )}
        </div>
      )}

      {/* Wordmark top-right — like MOONLIGHT on the ref */}
      <div style={{
        position: "absolute", top: 26, right: 32,
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 14, letterSpacing: 6,
        color: "#f4ecd7", opacity: 0.9,
      }}>{wordmark}</div>
    </div>
  );
}

Object.assign(window, {
  IllPortrait, IllSoap, IllStep, IllGiftBox, IllNoList, IllWorkbench,
  IllIngredient, IllProductHero, ART,
});
