// Build the full image-generation task list.
//
// Reads PRODUCTS from src/data/products.js, walks per-product visual
// hints, and emits one task per (product × shot type 02-04, 06).
// Plus 11 article cover tasks + 12 inline-illustration tasks.
//
// Output: scripts/full-tasks.json (consumed by scripts/generate-images.js)
//
// Run:
//   node scripts/build-tasks.mjs

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCTS } from '../src/data/products.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

// ── Per-product visual hints ────────────────────────────────────────────
// Maps the canonical 中文 product folder name (matches public/images/products/<dir>)
// to colour tone, embedded particle hint, and matching botanical for the
// beauty-shot scene.

const PRODUCT_HINTS = {
  海棠: {
    color: 'deep mottled jade-green fading into muddy walnut brown',
    embedded: 'tiny dark-green tamanu nut fragments and faint mineral specks',
    botanical: 'a small sprig of dried calophyllum (tamanu) leaf',
  },
  霧蜜: {
    color: 'warm honey-cream gold with subtle amber drips visible inside',
    embedded: 'pale golden honey crystals and faint pollen flecks',
    botanical: 'a few dried sophora japonica blossoms and a small honey-dipper',
  },
  綠豆: {
    color: 'pale beige with soft pistachio-green flecks',
    embedded: 'finely ground mung bean powder grains showing as tiny green dots',
    botanical: 'a small bundle of whole dried mung beans on a folded linen square',
  },
  蝶豆花: {
    color: 'deep cobalt blue fading to violet at one edge',
    embedded: 'dried butterfly pea petal fragments and faint blue dust',
    botanical: 'three dried butterfly pea blossoms in their characteristic blue',
  },
  金盞花: {
    color: 'glowing golden orange with petal-flecked surface',
    embedded: 'visible dried calendula petal fragments embedded throughout',
    botanical: 'a small cluster of dried calendula flower heads',
  },
  大米: {
    color: 'soft pearl cream with faint pale yellow undertone',
    embedded: 'fine rice bran specks and the suggestion of milled grain',
    botanical: 'a tiny bundle of rice stalks with their grains attached',
  },
  酒粕: {
    color: 'ivory cream traced with subtle warm amber streaks',
    embedded: 'soft sake-lees fragments suggesting fermented rice texture',
    botanical: 'a small unglazed ceramic sake cup beside a few loose rice grains',
  },
  桂花: {
    color: 'cream surface freckled with tiny burnt-orange osmanthus flecks',
    embedded: 'real osmanthus petals embedded densely throughout',
    botanical: 'a small sprig of dried osmanthus blossoms still on its stem',
  },
  山茶淨髮: {
    color: 'olive-green surface with pale brown undertones, slightly rounder and flatter shape than a regular soap bar — this is a hair bar',
    embedded: 'subtle camellia oil sheen, no embedded particles',
    botanical: 'a single dried camellia flower beside a few loose long hairs of unbleached silk',
  },
  茉莉沐膚: {
    color: 'cream-white with tiny pale yellow flecks, slightly rounder body-bar shape',
    embedded: 'jasmine flower powder visible as soft pale dust throughout',
    botanical: 'a small cluster of fresh-looking dried jasmine flowers',
  },
  一皂到底清爽: {
    color: 'pale lavender-grey with subtle herbaceous flecks',
    embedded: 'dried lavender flower bud fragments scattered through the bar',
    botanical: 'a small bundle of dried lavender stems tied with twine',
  },
  一皂到底保濕: {
    color: 'warm cream-ivory, perfectly smooth and uniform with no embedded particles',
    embedded: 'no embedded particles — a clean uniform creamy surface',
    botanical: 'a small folded square of raw linen and a sprig of dried olive leaves',
  },
};

// ── Style anchor blocks (re-used) ───────────────────────────────────────

const PHOTO_STYLE = `Soft directional north-facing daylight from the upper-left, shallow depth of field, slight medium-format film grain, low-saturation warm neutral palette of raw linen beige, ink black, muted gold (#C8A24A) and charcoal. East Asian artisanal soap atelier mood. Aged wood tabletop with visible grain and small scuffs of long use, raw linen cloth visible at the lower edge. No people, no readable text, no logos, no printed labels, no plastic, no modern packaging.`;

const ILLUSTRATION_STYLE = `A hand-drawn 4:3 horizontal illustration in the manner of a Japanese sumi-e brush study crossed with mid-century linocut, executed in a single warm earth tone of muted sepia-gold (#C8A24A) on textured cream paper. Light cross-hatching for depth. Crisp ink contour lines, restrained wash, the feeling of an old craft-school textbook plate. No photorealism, no colour beyond the single warm tone, no shadows cast outside the subject, no text, no signatures, no logos, no border.`;

// ── Per-product 4 photo prompts (02, 03, 04, 06) ───────────────────────

function productTasks(folderName, hints) {
  const ref = `public/images/products/${folderName}/01.webp`;
  const out = (n) => `public/images/products/${folderName}/${n}.png`;
  return [
    {
      label: `${folderName} · 02 包裝完成`,
      outputPath: out('02'),
      referenceImagePath: ref,
      prompt: `Using the soap shown in the reference image as the exact same bar (preserve its colour ${hints.color}, surface texture, and proportions), generate a square 1:1 editorial product photograph of that same hand-pressed soap bar now fully wrapped in a sheet of unbleached kraft paper folded with two clean creases over the top, tied snugly around the middle with a length of natural raw twine knotted in a simple loose bow, and sealed on the front face with a small irregular dark-red wax stamp the diameter of a coin — the stamp is plain, organic in shape, completely featureless with no letters or insignia. The wrapped bar rests at a 45-degree three-quarter angle on the tabletop, with ${hints.botanical} placed deliberately just behind it. ${PHOTO_STYLE} Hand-tied, slow-craft, gift-like atmosphere.`,
    },
    {
      label: `${folderName} · 03 包裝到一半`,
      outputPath: out('03'),
      referenceImagePath: ref,
      prompt: `Using the soap shown in the reference image as the exact same bar (preserve its colour ${hints.color}, surface texture, and proportions), generate a square 1:1 editorial product photograph of that same hand-pressed soap bar in the middle of being wrapped — a sheet of unbleached kraft paper has been partially folded around the bottom and back of the bar but the top and front remain exposed, with a length of raw twine resting unrolled nearby ready to tie, perhaps with a small coil of red sealing wax beside it. The bar's surface is fully visible from the front showing its colour ${hints.color} and texture clearly. Composition: top-down at a slight 15-degree tilt, capturing the moment of wrapping in progress, ${hints.botanical} resting just outside the work area. ${PHOTO_STYLE}`,
    },
    {
      label: `${folderName} · 04 切剖面`,
      outputPath: out('04'),
      referenceImagePath: ref,
      prompt: `Using the soap shown in the reference image as the exact same bar's external colour, generate a square 1:1 editorial product photograph of a cut bar of that soap showing its cross-section — the bar has been cleanly sliced down the middle with a thin wire to reveal the interior. The interior tone matches the bar's external colour ${hints.color}, with ${hints.embedded} visible throughout the cut face. The cut is flat, smooth, with the fresh fine texture of recently cut soap. Both halves rest face-up on the tabletop at slight 30-degree angles toward the viewer, the sliced faces catching the light. A thin wire cutter with two wooden handles rests just beside them suggesting how the cut was made. ${PHOTO_STYLE}`,
    },
    {
      label: `${folderName} · 06 美照 lifestyle`,
      outputPath: out('06'),
      referenceImagePath: ref,
      prompt: `Using the soap shown in the reference image as the exact same bar (preserve its colour ${hints.color}, surface texture, and proportions), generate a square 1:1 editorial lifestyle photograph of a contemplative bathroom or vanity corner: the soap rests on a small round antique brass dish on a worn wooden ledge, a folded raw linen hand towel partially visible to one side, ${hints.botanical} placed nearby as a quiet decorative gesture. Soft natural daylight comes from a window just outside the frame, casting long gentle shadows across the wood. The atmosphere is quiet, slow, ritualistic — early morning use or late afternoon. Shallow depth of field, slight grain, low-saturation warm neutral palette of raw linen beige, ink black, muted gold (#C8A24A) and charcoal. No people, no readable text, no logos, no plastic, no modern toiletries.`,
    },
  ];
}

// ── 11 article covers (3 of 11; rest reuses PROMPTS.md draft text) ─────
// (Cover for three-oils already exists at public/images/journal/three-oils.png
// — script will skip due to idempotent file check.)

const ARTICLE_COVERS = [
  {
    slug: 'three-oils',
    prompt: `(skipped — sample A already at final path)`,
  },
  {
    slug: 'ffa-five-forces',
    prompt: `A horizontal 4:3 editorial still-life photograph in the East Asian artisanal soap atelier style. On an aged wood tabletop with raw linen cloth, a single hand-pressed natural soap bar sits at the centre, surrounded by five small handmade paper cards arranged in a loose pentagon around it — each card represents one fatty acid attribute (washing power, foam, gentleness, smoothness, hardness) but the cards remain blank, their position alone suggesting the radar pattern. A worn wooden stirring spoon and a few dried botanical fragments scattered nearby. ${PHOTO_STYLE} Quiet study-room atmosphere, like an open page from an old soapmaker's notebook.`,
  },
  {
    slug: 'saponification',
    prompt: `A horizontal 4:3 editorial still-life photograph. Two clear glass beakers sit side by side on aged wood — the left beaker holds golden olive oil filling about two-thirds, the right beaker holds clear lye solution catching the light with a faint cloudy interface where the two surfaces would soon meet. A small handwritten formula card rests in front, blank. ${PHOTO_STYLE} The atmosphere is quietly chemical, like a kitchen-laboratory at dawn.`,
  },
  {
    slug: 'trace',
    prompt: `A horizontal 4:3 editorial still-life photograph, top-down view of a wide stainless-steel mixing bowl on aged wood, soap batter inside at the moment of trace — pale viscous liquid with a wooden spoon being lifted out leaving a smooth ribbon trail across the surface in two or three loose loops. Soft steam rises gently. A small sand-timer or wooden timer beside the bowl. ${PHOTO_STYLE} The atmosphere is concentrated, the moment of decision.`,
  },
  {
    slug: 'yes-palm',
    prompt: `A horizontal 4:3 editorial still-life photograph. A small cluster of fresh red-orange oil palm fruits resting on aged wood, beside them a clear glass bottle of golden-amber palm oil and a small folded paper card sealed with a dark red wax stamp suggesting sustainability certification (the seal is plain, no readable text). Raw linen cloth in the background. ${PHOTO_STYLE} The atmosphere is honest, agricultural, conversation-inviting.`,
  },
  {
    slug: 'skin-ph-acid-mantle',
    prompt: `A horizontal 4:3 editorial still-life photograph. A series of pH paper test strips arranged in a gentle gradient curve across aged wood — colour transitions from yellow (acidic) through orange and green (neutral) to blue (alkaline). Beside the strips, a single hand-pressed cold-process soap bar and a smaller round body-bar of pH-neutral soap, plus a tiny clear glass dropper with water. ${PHOTO_STYLE} The atmosphere is quietly didactic, like a science still-life.`,
  },
  {
    slug: 'cold-vs-hot-process',
    prompt: `A horizontal 4:3 editorial still-life photograph. Three distinct soap bars in a row on a long aged wood plank, each visibly different in surface texture: left bar smooth matte cream-coloured (cold-process), middle bar slightly glossy darker amber (hot-process), right bar with visible re-melted swirls and tiny chunks (re-batch). Soft warm rim light reveals each surface honestly. Raw linen cloth folded at the back edge. ${PHOTO_STYLE}`,
  },
  {
    slug: 'ins-value',
    prompt: `A horizontal 4:3 editorial still-life photograph. A small handwritten formula sheet on aged paper rests at the centre of an aged wood tabletop, showing oil names (the writing is suggested through brush-marks but unreadable) with numbers next to each. Beside the sheet a small abacus corner, a glass measuring cylinder half full of golden olive oil, and a slim drafting pencil. ${PHOTO_STYLE} The atmosphere is like a soapmaker's working bench at dusk.`,
  },
  {
    slug: 'botanical-design-truth',
    prompt: `A horizontal 4:3 editorial still-life photograph showing a thoughtful contrast — at the left, a single plain pale-green hand-pressed soap bar sitting elegantly on raw linen; at the right, scattered tiny piles of dry botanical powders (matcha, coffee grounds, dried flower petals, mineral clays) and several small glass vials look slightly chaotic and over-decorative. The contrast visually argues "less is more". ${PHOTO_STYLE}`,
  },
  {
    slug: 'how-to-choose-soap',
    prompt: `A horizontal 4:3 editorial still-life photograph. An arc of seven hand-pressed soap bars on a long aged wood table, arranged in a graceful semicircle with progressing tones — ivory cream, pale jade, soft yellow, golden orange, dusty pink, deep brown, charcoal — each on its own small unglazed ceramic saucer. A single open notebook with hand-written notes (writing suggested but unreadable) peeks at the corner of the frame. ${PHOTO_STYLE} The atmosphere is curated, apothecary-like, inviting selection.`,
  },
  {
    slug: 'why-handmade-soap',
    prompt: `A horizontal 4:3 editorial still-life photograph. Three objects laid in a row on aged wood — left a single hand-pressed cold-process soap bar with visible chamfered edges, centre a smaller round pH-neutral wash bar (slightly different texture, pressed not poured), right a small clear glass bottle of liquid body wash (the bottle is plain, no labels, no readable text). Side window light from the left. ${PHOTO_STYLE} Contemplative side-by-side comparison mood.`,
  },
];

const articleCoverTasks = ARTICLE_COVERS.filter((a) => a.slug !== 'three-oils').map((a) => ({
  label: `Article cover · ${a.slug}`,
  outputPath: `public/images/journal/${a.slug}.png`,
  prompt: a.prompt,
}));

// ── Inline illustrations (hand-drawn, sumi-e style) ─────────────────────

const INLINE_ILLUSTRATIONS = [
  {
    slug: 'three-oils',
    n: 1,
    desc: 'three labelled oil bottles flowing simultaneously into one round mixing bowl below them — olive on the left pouring as a thicker stream, coconut centre pouring as a thinner clear stream, palm right pouring as a darker stream — illustrating how three distinct oils combine into one batter',
  },
  {
    slug: 'ffa-five-forces',
    n: 1,
    desc: 'a clean five-pointed pentagon radar diagram with five labelled axes (washing, foam, gentleness, smoothness, hardness) — the labels themselves suggested as small marks but not readable text — and an irregular pentagon traced inside connecting plotted values, drawn in confident single ink lines',
  },
  {
    slug: 'saponification',
    n: 1,
    desc: 'two laboratory beakers labelled with abstract chemistry symbols pouring their contents into a third larger flask in the middle, an arrow connects them indicating the chemical reaction, droplets visible — illustrating oil + lye → soap + glycerin',
  },
  {
    slug: 'trace-stages',
    n: 2,
    desc: 'three small mixing bowls in a row each at a different trace stage — leftmost shows light trace with thin liquid leaving fine ribbon trail, middle shows medium trace with thicker batter and clearer ribbon, rightmost shows heavy trace nearly solid with the spoon standing upright. Each labelled abstractly with marks underneath',
  },
  {
    slug: 'yes-palm',
    n: 1,
    desc: 'a single oil palm tree on the left with a fruit cluster, on the right a small bottle of palm oil — between them a balance scale weighing yields per acre, suggesting the efficiency argument. Botanical-illustration style',
  },
  {
    slug: 'skin-ph-acid-mantle',
    n: 1,
    desc: 'a horizontal pH scale from 0 to 14 drawn as a long ruler with tiny tick marks, three small labels suggested by brush strokes — one at 5 (skin), one at 9 (cold-process soap), one at 5.5 (acid-mantle). Below the scale, three small body silhouettes — face, scalp, body — each with a small line drawn from the silhouette to a different point on the pH scale',
  },
  {
    slug: 'cold-vs-hot-process',
    n: 1,
    desc: 'a horizontal timeline with three labelled stations — leftmost a thermometer at low temperature with a soap bar above it (CP), centre a thermometer at higher temperature with the bar above (HP), right a fully formed bar being melted down again (MP). Arrows between stations suggest progression of heat and time',
  },
  {
    slug: 'ins-value',
    n: 1,
    desc: 'a stylised handwritten formula calculation sheet showing four oil names at the left (suggested by brush strokes, unreadable) with four corresponding numbers in a column to the right, all summed at the bottom into a single labelled INS value. A small abacus or wooden ruler on the side',
  },
  {
    slug: 'botanical-design-truth',
    n: 1,
    desc: 'two contrasting soaps side by side — left one plain, restrained, rectangular with no embellishment, right one chaotic with too many added botanicals (powder spills, scattered petals, multiple swirls). The arrangement clearly favours the left as the disciplined choice',
  },
  {
    slug: 'why-handmade-soap',
    n: 1,
    desc: 'three vertical bottles or shapes side by side — left a tall classical soap bar (cold-process), centre a small flat round bar (syndet), right a tall liquid bottle (commercial body wash). Below each shape a small label in the same brush style: a pH number suggested abstractly. The composition reads as a clear comparison',
  },
];

const inlineTasks = INLINE_ILLUSTRATIONS.map((it) => ({
  label: `Inline illustration · ${it.slug}-${it.n}`,
  outputPath: `public/images/journal/inline/${it.slug}-${it.n}.png`,
  prompt: `${ILLUSTRATION_STYLE}\n\nSubject: ${it.desc}.`,
}));

// ── Compile + write ────────────────────────────────────────────────────

const productTaskList = Object.entries(PRODUCT_HINTS).flatMap(([folder, hints]) =>
  productTasks(folder, hints),
);

const allTasks = [...articleCoverTasks, ...inlineTasks, ...productTaskList];

const outPath = path.join(__dirname, 'full-tasks.json');
await writeFile(outPath, JSON.stringify(allTasks, null, 2));

console.log(`→ wrote ${allTasks.length} tasks to ${path.relative(REPO_ROOT, outPath)}`);
console.log(`  · ${articleCoverTasks.length} article covers`);
console.log(`  · ${inlineTasks.length} inline illustrations`);
console.log(`  · ${productTaskList.length} product photos (12 products × 4 shots)`);
console.log(`\nValidate that PRODUCTS in products.js (${PRODUCTS.length} entries) covers all 12 PRODUCT_HINTS keys.`);
