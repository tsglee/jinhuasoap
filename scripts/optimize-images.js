// Generate AVIF + WebP next to each PNG/JPG in the configured source dirs.
// Idempotent: skips outputs that are newer than the source.
// Recurses into subdirectories — products are organized as
//   products/<產品名>/01.png 02.png ...
// and journal posts as
//   journal/<slug>.png
// so adding a new product subdir or a new article cover just works.
// Run with: npm run optimize:images

import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIRS = [
  path.join(__dirname, '..', 'public', 'images', 'products'),
  // Process-step stills (poster frames for the 八步慢皂 videos)
  path.join(__dirname, '..', 'public', 'images', 'process', 'png'),
  // 八樣花材 — botanical ingredient photos
  path.join(__dirname, '..', 'public', 'images', 'ingredients'),
  // 三大支柱（本舍） — 純手工 / 天然材料 / 慢製
  path.join(__dirname, '..', 'public', 'images', 'about'),
  // Hero video poster (extracted via ffmpeg, see About.jsx)
  path.join(__dirname, '..', 'public', 'images', 'landingmedia'),
  // ThankYou page illustration
  path.join(__dirname, '..', 'public', 'images', 'thanku'),
  // 本舍小記 cover images (1200×900, 4:3)
  path.join(__dirname, '..', 'public', 'images', 'journal'),
];
const MAX_WIDTH = 1200;
const AVIF_QUALITY = 65;
const WEBP_QUALITY = 80;

async function isStale(src, out) {
  if (!existsSync(out)) return true;
  const [s, o] = await Promise.all([stat(src), stat(out)]);
  return s.mtimeMs > o.mtimeMs;
}

async function processDir(dir) {
  if (!existsSync(dir)) return { touched: 0, skipped: 0, total: 0 };
  const entries = await readdir(dir, { withFileTypes: true });
  let touched = 0;
  let skipped = 0;
  let total = 0;

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await processDir(full);
      touched += sub.touched;
      skipped += sub.skipped;
      total += sub.total;
      continue;
    }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    total++;
    const base = path.join(dir, entry.name.replace(/\.(png|jpe?g)$/i, ''));
    const avifOut = `${base}.avif`;
    const webpOut = `${base}.webp`;

    const tasks = [];
    if (await isStale(full, avifOut)) {
      tasks.push(
        sharp(full)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .avif({ quality: AVIF_QUALITY, effort: 6 })
          .toFile(avifOut)
          .then(() => console.log(`  ✓ ${path.relative(path.join(__dirname, '..'), avifOut)}`)),
      );
    }
    if (await isStale(full, webpOut)) {
      tasks.push(
        sharp(full)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(webpOut)
          .then(() => console.log(`  ✓ ${path.relative(path.join(__dirname, '..'), webpOut)}`)),
      );
    }
    if (tasks.length) {
      await Promise.all(tasks);
      touched++;
    } else {
      skipped++;
    }
  }
  return { touched, skipped, total };
}

for (const dir of SRC_DIRS) {
  console.log(`→ ${path.relative(path.join(__dirname, '..'), dir)}`);
  const { touched, skipped, total } = await processDir(dir);
  console.log(`  ${touched} processed, ${skipped} up-to-date, ${total} total`);
}
