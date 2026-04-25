// Generate AVIF + WebP next to each PNG/JPG in public/images/products/.
// Idempotent: skips outputs that are newer than the source.
// Run with: npm run optimize:images

import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIRS = [path.join(__dirname, '..', 'public', 'images', 'products')];
const MAX_WIDTH = 1200;
const AVIF_QUALITY = 65;
const WEBP_QUALITY = 80;

async function isStale(src, out) {
  if (!existsSync(out)) return true;
  const [s, o] = await Promise.all([stat(src), stat(out)]);
  return s.mtimeMs > o.mtimeMs;
}

async function processDir(dir) {
  const entries = await readdir(dir);
  const sources = entries.filter((f) => /\.(png|jpe?g)$/i.test(f));
  let touched = 0;
  let skipped = 0;
  for (const file of sources) {
    const src = path.join(dir, file);
    const base = path.join(dir, file.replace(/\.(png|jpe?g)$/i, ''));
    const avifOut = `${base}.avif`;
    const webpOut = `${base}.webp`;

    const tasks = [];
    if (await isStale(src, avifOut)) {
      tasks.push(
         sharp(src)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .avif({ quality: AVIF_QUALITY, effort: 6 })
          .toFile(avifOut)
          .then(() => console.log(`  ✓ ${path.basename(avifOut)}`)),
      );
    }
    if (await isStale(src, webpOut)) {
      tasks.push(
        sharp(src)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(webpOut)
          .then(() => console.log(`  ✓ ${path.basename(webpOut)}`)),
      );
    }
    if (tasks.length) {
      await Promise.all(tasks);
      touched++;
    } else {
      skipped++;
    }
  }
  return { touched, skipped, total: sources.length };
}

for (const dir of SRC_DIRS) {
  console.log(`→ ${path.relative(path.join(__dirname, '..'), dir)}`);
  const { touched, skipped, total } = await processDir(dir);
  console.log(`  ${touched} processed, ${skipped} up-to-date, ${total} total`);
}
