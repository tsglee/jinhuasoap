// Generate images via Gemini 2.5 Flash Image (Nanobanana).
//
// Loads GEMINI_API_KEY from .env.local (gitignored).
// Reads tasks from a JSON file (default: scripts/image-tasks.json).
// Each task: { prompt, outputPath, referenceImagePath?, label? }
//
// Idempotent — skips a task if outputPath already exists.
// Retries up to 3× on transient failure.
//
// Run:
//   node scripts/generate-images.js [tasks-file]
//
// Notes:
//   - The Gemini "image generation" model returns a base64 PNG inside
//     candidates[0].content.parts[].inlineData.data.
//   - Model: gemini-2.5-flash-image-preview (codename "Nanobanana").
//   - Reference image conditioning: pass a small PNG path as
//     referenceImagePath; we'll inline it in front of the text part so
//     the model conditions output on the reference (used to keep the
//     same soap consistent across 6 angles).

import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

const MODEL = 'gemini-2.5-flash-image';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

function loadEnv(envPath = path.join(REPO_ROOT, '.env.local')) {
  if (!existsSync(envPath)) {
    console.warn(`[env] ${envPath} not found — skipping`);
    return;
  }
  const text = readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const m = trimmed.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function mimeFromPath(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.avif') return 'image/avif';
  return 'image/png';
}

async function callGemini({ prompt, referenceImagePath, apiKey }) {
  const parts = [];
  if (referenceImagePath) {
    const buf = await readFile(referenceImagePath);
    parts.push({
      inlineData: {
        mimeType: mimeFromPath(referenceImagePath),
        data: buf.toString('base64'),
      },
    });
  }
  parts.push({ text: prompt });

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE'],
    },
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText.slice(0, 500)}`);
  }

  const json = await res.json();
  const candidates = json.candidates || [];
  for (const cand of candidates) {
    const candParts = cand.content?.parts || [];
    for (const p of candParts) {
      if (p.inlineData?.data) {
        return Buffer.from(p.inlineData.data, 'base64');
      }
    }
  }

  // No image came back — surface the textual reason if any
  const textParts = candidates.flatMap((c) =>
    (c.content?.parts || []).filter((p) => p.text).map((p) => p.text),
  );
  throw new Error(
    `No image in response. Text parts: ${JSON.stringify(textParts).slice(0, 500)}`,
  );
}

async function generateOne(task, apiKey) {
  const { prompt, outputPath, referenceImagePath, label } = task;
  const absOut = path.isAbsolute(outputPath)
    ? outputPath
    : path.join(REPO_ROOT, outputPath);

  if (existsSync(absOut)) {
    const s = await stat(absOut);
    if (s.size > 0) {
      console.log(`  ↷ skip (exists): ${path.relative(REPO_ROOT, absOut)}`);
      return { skipped: true };
    }
  }

  await mkdir(path.dirname(absOut), { recursive: true });

  let lastErr = null;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const png = await callGemini({
        prompt,
        referenceImagePath: referenceImagePath
          ? path.isAbsolute(referenceImagePath)
            ? referenceImagePath
            : path.join(REPO_ROOT, referenceImagePath)
          : undefined,
        apiKey,
      });
      await writeFile(absOut, png);
      console.log(
        `  ✓ ${label ? `[${label}] ` : ''}${path.relative(REPO_ROOT, absOut)} (${(png.length / 1024).toFixed(1)} KB)`,
      );
      return { generated: true, bytes: png.length };
    } catch (err) {
      lastErr = err;
      console.warn(
        `  ⚠ attempt ${attempt}/${MAX_RETRIES} failed: ${err.message.slice(0, 200)}`,
      );
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  console.error(`  ✗ giving up: ${path.relative(REPO_ROOT, absOut)}`);
  throw lastErr;
}

async function main() {
  loadEnv();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY not set (check .env.local)');
    process.exit(1);
  }

  const tasksPath = process.argv[2] || path.join(__dirname, 'image-tasks.json');
  if (!existsSync(tasksPath)) {
    console.error(`Tasks file not found: ${tasksPath}`);
    process.exit(1);
  }
  const tasks = JSON.parse(await readFile(tasksPath, 'utf8'));
  console.log(`→ ${tasks.length} task(s) from ${path.relative(REPO_ROOT, tasksPath)}\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  for (const task of tasks) {
    try {
      const r = await generateOne(task, apiKey);
      if (r.generated) generated++;
      else if (r.skipped) skipped++;
    } catch {
      failed++;
    }
  }

  console.log(
    `\n${generated} generated, ${skipped} skipped, ${failed} failed of ${tasks.length} total`,
  );
  process.exit(failed > 0 ? 1 : 0);
}

main();
