// Post-build: drop PNGs from dist/ that have an .avif or .webp sibling.
// Source PNGs are kept in public/ as inputs to optimize-images.js, but
// they're 6-8 MB each and never loaded by the browser (Products.jsx and
// friends always pick AVIF→WebP via <picture>). Shipping them inflates
// deploy size and CDN cache without any user benefit.
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('dist/images');

let removed = 0;
let bytesFreed = 0;

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // dist/images may not exist if build is empty
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full);
    } else if (e.isFile() && full.toLowerCase().endsWith('.png')) {
      const base = full.slice(0, -4);
      const hasAlt =
        (await stat(base + '.avif').catch(() => null)) ||
        (await stat(base + '.webp').catch(() => null));
      if (hasAlt) {
        const { size } = await stat(full);
        await unlink(full);
        removed += 1;
        bytesFreed += size;
      }
    }
  }
}

await walk(ROOT);
const mb = (bytesFreed / (1024 * 1024)).toFixed(1);
console.log(`strip-redundant-pngs: removed ${removed} files, freed ${mb} MB`);
