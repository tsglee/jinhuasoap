// Compose ingredient-label images by overlaying typography (via SVG)
// onto the AI-generated background at public/images/_label-bg.png.
//
// For each product, reads zh / subtitle / coreIngredients / weight from
// products.js and produces public/images/products/<產品名>/05.png.
//
// Run:
//   node scripts/compose-labels.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PRODUCTS } from '../src/data/products.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

const BG_PATH = path.join(__dirname, '_label-bg.png');

// Map product 中文名 → folder name (must match the actual subdirectory under
// public/images/products/). Most products use a short folder name; the two
// 一皂到底 variants use suffixed folder names.
const FOLDER_BY_NUM = {
  壹: '海棠',
  貳: '霧蜜',
  參: '綠豆',
  肆: '蝶豆花',
  伍: '金盞花',
  陸: '大米',
  柒: '酒粕',
  捌: '桂花',
  玖: '山茶淨髮',
  拾: '茉莉沐膚',
  拾壹: '一皂到底清爽',
  拾貳: '一皂到底保濕',
};

// Wrap Chinese-comma-separated ingredient list to fit ~22 chars per line.
function wrapIngredients(text, maxChars = 22) {
  if (!text) return [''];
  // Split by Chinese comma 、 first; clean up each token.
  const tokens = text.replace(/[。.]$/, '').split(/[、]/).map((t) => t.trim()).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const t of tokens) {
    const sep = cur ? '、' : '';
    if ((cur + sep + t).length > maxChars && cur) {
      lines.push(cur);
      cur = t;
    } else {
      cur = cur + sep + t;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// Encode XML-special chars for safe SVG embedding
function xml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSvg({ zh, subtitle, ingredients, weight, width, height }) {
  // Card layout (specific to the AI-generated background _label-bg.png):
  // - tag occupies roughly y=18%–82% vertically (wax ribbon at top edge,
  //   leaf in upper-left corner)
  // - safe text zone: y=40%–78% (skips wax + leaf)
  const fontFamily = `"Noto Serif TC", "PingFang TC", "Hiragino Sans CNS", "Songti TC", serif`;
  const inkColor = '#1A1612'; // near-black, warm undertone
  const goldColor = '#8B6F2A';

  // Anchor in absolute pixel positions (1024×1024 expected).
  // The bg image has a thick wax ribbon at top (y=15%–37%) and a leaf
  // partly intruding to y=42%, so safe text zone starts at y=46%.
  const titleY = Math.round(height * 0.46);
  const subtitleY = titleY + 38;
  const dividerY = subtitleY + 28;
  const ingredientsLabelY = dividerY + 30;
  const ingredientsStartY = ingredientsLabelY + 30;
  const lineHeight = 28;

  const lines = wrapIngredients(ingredients, 18); // tighter wrap so 3 lines fit cleanly
  const ingredientsBlock = lines
    .map(
      (line, i) =>
        `<text x="${width / 2}" y="${ingredientsStartY + i * lineHeight}" text-anchor="middle" font-family='${fontFamily}' font-size="20" fill="${inkColor}" letter-spacing="2">${xml(line)}</text>`,
    )
    .join('\n');

  const ingredientsEnd = ingredientsStartY + lines.length * lineHeight;
  const weightLabelY = ingredientsEnd + 26;
  const weightValueY = weightLabelY + 30;
  const footerY = weightValueY + 36;

  // Card horizontal extents for divider lines
  const cardLeft = width * 0.22;
  const cardW = width * 0.56;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <text x="${width / 2}" y="${titleY}" text-anchor="middle" font-family='${fontFamily}' font-size="38" font-weight="600" fill="${inkColor}" letter-spacing="6">${xml(zh)}</text>
  <text x="${width / 2}" y="${subtitleY}" text-anchor="middle" font-family='${fontFamily}' font-size="17" fill="${goldColor}" letter-spacing="4">${xml(subtitle)}</text>
  <line x1="${cardLeft + cardW * 0.25}" y1="${dividerY}" x2="${cardLeft + cardW * 0.75}" y2="${dividerY}" stroke="${goldColor}" stroke-width="0.7" />
  <text x="${width / 2}" y="${ingredientsLabelY}" text-anchor="middle" font-family='${fontFamily}' font-size="12" fill="${goldColor}" letter-spacing="6">成 分 · INGREDIENTS</text>
  ${ingredientsBlock}
  <line x1="${cardLeft + cardW * 0.35}" y1="${ingredientsEnd + 10}" x2="${cardLeft + cardW * 0.65}" y2="${ingredientsEnd + 10}" stroke="${goldColor}" stroke-width="0.4" stroke-dasharray="2,2" />
  <text x="${width / 2}" y="${weightLabelY}" text-anchor="middle" font-family='${fontFamily}' font-size="11" fill="${goldColor}" letter-spacing="6">淨 重 · NET WEIGHT</text>
  <text x="${width / 2}" y="${weightValueY}" text-anchor="middle" font-family='${fontFamily}' font-size="26" font-weight="500" fill="${inkColor}" letter-spacing="3">${xml(weight)}</text>
  <text x="${width / 2}" y="${footerY}" text-anchor="middle" font-family='${fontFamily}' font-size="10" fill="${goldColor}" letter-spacing="5" font-style="italic">手 壓 於 林 口 · 金 花 樓</text>
</svg>`;
}

async function compose(product, folder) {
  if (!existsSync(BG_PATH)) {
    throw new Error(`Background image not found: ${BG_PATH}`);
  }

  // Read background, get dimensions
  const bg = sharp(BG_PATH);
  const meta = await bg.metadata();
  const width = meta.width;
  const height = meta.height;

  const svg = buildSvg({
    zh: product.zh,
    subtitle: product.subtitle,
    ingredients: product.coreIngredients,
    weight: product.weight,
    width,
    height,
  });

  const outDir = path.join(REPO_ROOT, 'public', 'images', 'products', folder);
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, '05.png');

  await sharp(BG_PATH)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toFile(outPath);

  console.log(`  ✓ ${path.relative(REPO_ROOT, outPath)}`);
  return outPath;
}

async function main() {
  console.log(`→ Composing ${PRODUCTS.length} ingredient labels onto _label-bg.png\n`);
  let ok = 0;
  let fail = 0;
  for (const p of PRODUCTS) {
    const folder = FOLDER_BY_NUM[p.num];
    if (!folder) {
      console.error(`  ✗ no folder mapping for product ${p.num} (${p.zh})`);
      fail++;
      continue;
    }
    try {
      await compose(p, folder);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${folder}: ${err.message}`);
      fail++;
    }
  }
  console.log(`\n${ok} composed, ${fail} failed`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
