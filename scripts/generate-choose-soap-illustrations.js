// Generate 5 inline illustrations for journal/how-to-choose-soap.
// Sepia line-sketch style aligned with existing 23+ illustrations across
// the site. Output: public/images/journal/inline/how-to-choose-soap-{1..5}.png
//
// Usage:
//   node scripts/generate-choose-soap-illustrations.js          # all 5
//   node scripts/generate-choose-soap-illustrations.js 1 3      # specific
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ENV_FILE = join(ROOT, '.env.local');
const OUT_DIR = join(ROOT, 'public/images/journal/inline');

function loadEnv() {
  if (!existsSync(ENV_FILE)) {
    throw new Error('.env.local missing — put GEMINI_API_KEY=... there');
  }
  const env = {};
  for (const line of readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

// Critical no-border + no-mat-board lock — learned from earlier rounds.
// Place at the start of every prompt.
const NO_BORDER = [
  'IMPORTANT — the illustration MUST be borderless: do not draw any rectangular',
  'frame, line, box, or border anywhere on the canvas. The drawing fades naturally',
  'into the beige paper background with NO enclosing line. The ENTIRE canvas is',
  'ONE single uniform beige paper color edge-to-edge — NO darker inner rectangle,',
  'NO lighter outer margin, NO mat board effect, NO inset panel.',
].join(' ');

const STYLE_HEAD = [
  'Hand-drawn pen-and-ink line sketch illustration,',
  'single warm sepia and amber-brown ink color on raw linen beige #F0E8D8 paper background,',
  'no color fill, no shading blocks — only delicate hand-drawn lines with natural weight variation,',
  'like a quiet workshop journal sketch, matching pair with the existing 金花樓 illustration set.',
].join(' ');

const STYLE_TRAILER = [
  'Composition: 1:1 square 1024×1024, generous whitespace, simple uncluttered background.',
  'Style aligned with East Asian artisanal soap atelier illustration tradition.',
  'CRITICAL — absolutely NO English words, NO English labels, NO captions, NO',
  'callout text, NO labels of any kind, NO letters of any kind on the canvas.',
  'The illustration must be ENTIRELY language-free. No Chinese characters either.',
  'Do not draw any arrows pointing to written labels. The picture must be purely',
  'visual — readable as a sketch alone, with zero textual annotation.',
  'No photograph, no realistic render, no glossy AI-art slick finish, no color blocks,',
  'no flat fills, no logos, no signature,',
  'no border, no frame, no rectangular line around the drawing, no decorative corners.',
  'Pure light pen-sketch on warm beige paper.',
].join(' ');

const PROMPTS = {
  // 1 — Five skin types as a row of small portrait sketches
  1: [
    NO_BORDER,
    STYLE_HEAD,
    'Subject: a horizontal row of FIVE small simple face sketches side by side,',
    'each face MUST visibly differ from the others through ONE clear distinguishing',
    'feature drawn directly on the face. Read left to right:',
    '(1) Sensitive skin — visible dense small dots/stipples scattered on the cheeks',
    'showing redness/irritation, plus a slightly worried expression with raised brows;',
    '(2) Dry skin — visible short flaky/scaly tick-marks drawn on the cheek and',
    'forehead suggesting peeling skin, mouth slightly downturned;',
    '(3) Oily skin — visible glossy gleam highlights drawn as multiple short curved',
    'strokes/sparkle marks on the forehead and nose tip suggesting shine,',
    'expression neutral;',
    '(4) Combination skin — the forehead and nose strip have shine marks like #3,',
    'but the cheeks are left completely clean and dry-looking like #2 — visually',
    'split between oily T-zone and dry cheeks;',
    '(5) Normal/balanced skin — completely clean even face with no marks anywhere,',
    'a slight calm smile. Each face must look DIFFERENT from the others at a glance.',
    'All five are stylized minimal — head outline, hair, eyes, nose, mouth, plus',
    'the distinguishing feature. Roughly the same size, evenly spaced.',
    STYLE_TRAILER,
  ].join(' '),

  // 2 — 30-minute self-test: mirror + sandglass + face
  2: [
    NO_BORDER,
    STYLE_HEAD,
    'Subject: a small still-life vignette teaching a 30-minute self-test for skin',
    'type. Center-left: a hand-mirror lying flat on a wooden surface, reflective',
    'face shown with a stylized minimal face inside it. Center-right: a small',
    'hourglass / sandglass with sand mid-fall, suggesting the 30-minute wait.',
    'Below: a soft splash of water suggested by 2-3 droplet shapes (the morning',
    'wash). Above the mirror: two tiny annotation marks — one near the cheek',
    'area suggesting tightness (a small inward arrow), one on the T-zone',
    'suggesting shine (a small gleam). Quiet, didactic, like a journal page.',
    STYLE_TRAILER,
  ].join(' '),

  // 3 — Three seasons of soap-making botanicals (no text labels — group visually)
  3: [
    NO_BORDER,
    STYLE_HEAD,
    'Subject: an isometric three-quarter top-down arrangement of soap-making',
    'botanicals split into THREE distinct visual clusters on a wooden surface,',
    'WITH ABSOLUTELY ZERO LABELS OR WORDS ANYWHERE — no labels on jars, no labels',
    'on bottles, no words like HONEY, no words like SUMMER, no English on any',
    'container, no Chinese on any container, every jar and bottle is COMPLETELY',
    'BLANK with no markings. The three clusters are separated naturally by empty',
    'space, no boxes, no dividing lines.',
    'Left cluster: a small unlabeled clear oil bottle, a sprig of lavender with',
    'tiny flower buds, a small pile of mung bean powder beside a butterfly pea',
    'flower.',
    'Right cluster: a small unlabeled jar of honey with a wooden honey dipper',
    'drizzling above it (no label, no text on jar), a chunk of shea butter,',
    'a small dried osmanthus sprig, a small calophyllum nut.',
    'Center-front cluster (slightly closer to viewer): a small handful of dried',
    'calendula flowers, a tiny unlabeled bowl of rice bran, and a small unlabeled',
    'ceramic cup of sake lees.',
    'Subject must fill the canvas — items spread across the wood surface taking',
    'up the majority of the frame, with only modest whitespace around the edges',
    '(not a tiny vignette in the lower half).',
    'Each item drawn cleanly with line work only, items naturally grouped.',
    'The viewer understands the grouping purely from spatial arrangement.',
    STYLE_TRAILER,
  ].join(' '),

  // 4 — Three paths: face / body / hair (no text labels)
  4: [
    NO_BORDER,
    STYLE_HEAD,
    'Subject: a stylized side-profile silhouette of an East Asian person from',
    'shoulders to top of head, sketched in clean lines, occupying the right half',
    'of the canvas, NO TEXT OR LABELS ANYWHERE. Three small soap shapes float on',
    'the left half of the canvas: (a) at the top, a tall cylindrical hair-puck',
    'shape (taller than wide, like a thick coin); (b) in the middle, a small',
    'square facial soap bar; (c) at the bottom, a larger horizontal rectangular',
    'body soap bar. Three delicate thin curved connecting lines arc from each',
    'soap to its corresponding body part on the figure: hair-puck line curves to',
    'the top of the head, facial soap line curves to the cheek area, body soap',
    'line curves to the shoulder/chest area. The connecting lines should be soft',
    'and elegant, not arrows. The mapping must be readable purely visually with',
    'NO words, NO English labels, NO Chinese characters. Like a quiet workshop',
    'diagram in a journal.',
    STYLE_TRAILER,
  ].join(' '),

  // 5 — Four-week trial: calendar + soap shrinking week by week
  5: [
    NO_BORDER,
    STYLE_HEAD,
    'Subject: a horizontal sequence showing FOUR small soap bars left to right,',
    'each progressively smaller and more rounded at the edges than the previous',
    'one — representing the same soap bar after week 1, week 2, week 3, week 4',
    'of daily use. The first bar is fresh and rectangular with crisp edges; by',
    'the fourth bar it is noticeably smaller, edges worn smooth and rounded.',
    'Above the sequence: a simple sketched rectangle suggesting a calendar with',
    'four small marked grid squares matching the four weeks below. Below:',
    'small whimsical decorative elements — a tiny water drop, a sprig.',
    'Reads as a quiet observation journal page about time and use.',
    STYLE_TRAILER,
  ].join(' '),
};

const NAMES = {
  1: 'how-to-choose-soap-1', // five skin types
  2: 'how-to-choose-soap-2', // 30-minute self-test
  3: 'how-to-choose-soap-3', // three seasons botanicals
  4: 'how-to-choose-soap-4', // face / body / hair paths
  5: 'how-to-choose-soap-5', // four-week trial
};

async function generate(num, prompt, apiKey) {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    `gemini-2.5-flash-image:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `Gemini ${res.status}: ${JSON.stringify(data, null, 2)}`,
    );
  }

  const parts = data.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find((p) => p.inlineData?.data);
  if (!imgPart) {
    throw new Error(
      `No image in response for #${num}: ${JSON.stringify(data, null, 2).slice(0, 600)}`,
    );
  }

  const buf = Buffer.from(imgPart.inlineData.data, 'base64');
  const out = join(OUT_DIR, `${NAMES[num]}.png`);
  writeFileSync(out, buf);
  console.log(`✓ #${num} → ${NAMES[num]}.png (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const env = loadEnv();
  if (!env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set in .env.local');

  const args = process.argv.slice(2).map(Number).filter((n) => PROMPTS[n]);
  const targets = args.length === 0 ? [1, 2, 3, 4, 5] : args;

  for (const t of targets) {
    console.log(`→ generating #${t} (${NAMES[t]}) …`);
    await generate(t, PROMPTS[t], env.GEMINI_API_KEY);
  }

  console.log('\nNext: npm run optimize:images');
}

main().catch((err) => {
  console.error('✗', err.message);
  process.exit(1);
});
