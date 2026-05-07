// Generate wife.png + husband.png via Gemini 2.5 Flash Image (Nanobanana).
// Reads GEMINI_API_KEY from .env.local. Prompts live in
// public/images/about/crew/PROMPTS.md — keep this script and that doc in sync.
//
// Usage:
//   node scripts/generate-portraits.js          # both
//   node scripts/generate-portraits.js wife     # one
//   node scripts/generate-portraits.js husband  # one
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ENV_FILE = join(ROOT, '.env.local');
const OUT_DIR = join(ROOT, 'public/images/about/crew');

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

// CRITICAL: prepend the no-border rule. Nanobanana iterations:
// (1) drew a sepia line frame — fixed by adding "no rectangular line".
// (2) created a two-tone background (darker beige inner panel + lighter
//     outer margin), reading like a mat-board frame. Fix: lock background
//     as ONE uniform color across the entire canvas, no inner panel.
const NO_BORDER = [
  'IMPORTANT — the illustration MUST be borderless and panelless:',
  '(a) do NOT draw any rectangular line, frame, box, or border anywhere on the canvas.',
  '(b) the ENTIRE canvas is ONE single uniform beige paper color edge-to-edge —',
  'NO darker inner rectangle, NO lighter outer margin, NO mat board effect,',
  'NO inset panel, NO color-shift between center and edges. The background is',
  'a single flat continuous beige tone the whole way out to the canvas edges.',
  'The drawing sits directly on this single-color paper with no enclosing region.',
  'No decorative edge. The canvas edge IS the only edge.',
].join(' ');

const STYLE_TRAILER = [
  'Composition: 1:1 square 1024×1024, generous whitespace around the figure,',
  'simple uncluttered background, ONE continuous beige paper color filling',
  'the entire canvas edge-to-edge.',
  'Style aligned with East Asian artisanal soap atelier illustration tradition.',
  'No photograph, no realistic render, no glossy AI-art slick finish, no color blocks,',
  'no flat fills, no text, no Chinese characters, no logos, no signature,',
  'no border, no frame, no rectangular line around the drawing, no inner panel,',
  'no mat board, no two-tone background, no decorative corners.',
  'Pure light pen-sketch on uniform warm beige paper.',
].join(' ');

const STYLE_HEAD = [
  'Hand-drawn pen-and-ink line sketch portrait illustration,',
  'single warm sepia and amber-brown ink color on raw linen beige #F0E8D8 paper background,',
  'no color fill, no shading blocks — only delicate hand-drawn lines with natural weight variation,',
  'like a quiet workshop journal sketch.',
].join(' ');

const PROMPTS = {
  wife: [
    NO_BORDER,
    STYLE_HEAD,
    'Subject: an East Asian woman soap-maker in her late thirties with a SHORT',
    'haircut (chin-length bob or shorter, NOT long hair, NOT ponytail), standing',
    'at a humble kitchen-workshop counter, gentle three-quarter isometric',
    'perspective from upper-left, calmly stirring a small copper pot with a long',
    'wooden spoon. Beside her on the counter: an open hand-written formula',
    'notebook, a row of glass jars holding dried botanicals, a small mortar.',
    'On a cedar-wood shelf above her: a row of curing handmade soap bars.',
    'She wears a loose linen apron with sleeves rolled to the elbow. Her face',
    'is stylized and minimal — a few soft strokes only, no detailed likeness,',
    'no specific features, symbolic rather than portrait-accurate. Soft window',
    'light implied through line direction, peaceful artisan atelier mood.',
    STYLE_TRAILER,
    'No modern plastic packaging.',
  ].join(' '),

  husband: [
    NO_BORDER,
    STYLE_HEAD,
    'Same hand and pen as the kitchen-workshop sketch, matching pair.',
    'Subject: an East Asian man in his late thirties WEARING ROUND EYEGLASSES',
    '(the glasses are clearly visible on his face), sitting at a small wooden',
    'writing desk, gentle three-quarter isometric perspective from upper-right,',
    'leaning slightly forward and writing with a fountain pen in an open notebook.',
    'On the desk: a steaming ceramic coffee cup, a small stack of two or three',
    'books, an ink bottle, a few loose paper sheets. Tucked under the desk: a',
    'pair of well-worn running shoes. He wears a simple long-sleeve shirt,',
    'sleeves slightly rolled. His face is stylized and minimal — a few soft',
    'strokes only plus the round eyeglasses, no detailed likeness, no specific',
    'features, symbolic rather than portrait-accurate. A window edge implied',
    "at the side with soft daylight coming through, quiet writer's-corner mood.",
    STYLE_TRAILER,
    'No modern device screens, no laptop, no smartphone.',
  ].join(' '),
};

async function generate(name, prompt, apiKey) {
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
      `No image in response for ${name}: ${JSON.stringify(data, null, 2).slice(0, 600)}`,
    );
  }

  const buf = Buffer.from(imgPart.inlineData.data, 'base64');
  const out = join(OUT_DIR, `${name}.png`);
  writeFileSync(out, buf);
  console.log(`✓ ${name} → ${out} (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const env = loadEnv();
  if (!env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set in .env.local');

  const args = process.argv.slice(2);
  const targets =
    args.length === 0 ? ['wife', 'husband'] : args.filter((a) => PROMPTS[a]);

  if (targets.length === 0) {
    console.error('Usage: node scripts/generate-portraits.js [wife|husband]');
    process.exit(1);
  }

  for (const t of targets) {
    console.log(`→ generating ${t}.png …`);
    await generate(t, PROMPTS[t], env.GEMINI_API_KEY);
  }

  console.log('\nNext: npm run optimize:images');
}

main().catch((err) => {
  console.error('✗', err.message);
  process.exit(1);
});
