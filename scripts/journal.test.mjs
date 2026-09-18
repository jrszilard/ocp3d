import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { journal } from "../src/data/journal.mjs";

const root = new URL("../", import.meta.url);
const parts = JSON.parse(readFileSync(new URL("src/data/parts.json", root), "utf8"));
const pageFor = (entry) => new URL(`src/pages/journal/${entry.slug}.astro`, root);

test("every journal entry points at a field file in the snapshot and has a page", () => {
  assert.ok(journal.length > 0);
  for (const entry of journal) {
    assert.ok(parts.some((part) => part.slug === entry.partSlug), `${entry.slug}: no field file ${entry.partSlug}`);
    assert.ok(existsSync(pageFor(entry)), `${entry.slug}: missing page`);
  }
});

test("every image or video a journal page references is committed", () => {
  for (const entry of journal) {
    const source = readFileSync(pageFor(entry), "utf8");
    const dir = source.match(/\/images\/journal\/([a-z0-9-]+)\//)?.[1];
    const refs = [
      ...[...source.matchAll(/img\("([^"]+)"\)/g)].map((m) => `images/journal/${dir}/${m[1]}`),
      ...[...source.matchAll(/"\/(video\/journal\/[^"]+)"/g)].map((m) => m[1]),
    ];
    assert.ok(refs.length > 0, `${entry.slug}: no media found`);
    for (const ref of refs) assert.ok(existsSync(new URL(`public/${ref}`, root)), `${entry.slug}: missing public/${ref}`);
  }
});

test("a log for a safety-gated field file stays research-only", () => {
  for (const entry of journal) {
    const part = parts.find((item) => item.slug === entry.partSlug);
    if (!part?.safetyGated) continue;
    assert.equal(entry.researchOnly, true, `${entry.slug} must be marked researchOnly`);
    const source = readFileSync(pageFor(entry), "utf8");
    assert.match(source, /Research only/i);
    assert.match(source, /vibration.*UV.*rain/is, "the pending proof must be named");
    // Offer calls-to-action, not negated mentions like "nothing here is for sale".
    assert.doesNotMatch(source, /Discuss getting this part|made-to-order|Order this part|Add to cart/i, `${entry.slug}: offer CTA`);
  }
});

test("every home-page card has a committed cover image", () => {
  for (const entry of journal) {
    if (!entry.cover) continue;
    assert.ok(existsSync(new URL(`public${entry.cover.src}`, root)), `${entry.slug}: missing cover ${entry.cover.src}`);
    assert.ok(entry.cover.alt?.length > 10, `${entry.slug}: cover needs real alt text`);
  }
});

// Founder direction 2026-09-17: the journal must be easy to find from the main page. A layout or
// home-page rewrite has to carry both entry points forward, not quietly drop them.
test("the journal stays reachable from the main nav and the home page", () => {
  const base = readFileSync(new URL("src/layouts/Base.astro", root), "utf8");
  const home = readFileSync(new URL("src/pages/index.astro", root), "utf8");
  assert.match(base, /href:\s*"\/journal\/"/, "main nav must link to /journal/");
  assert.match(home, /<BenchLogs\b/, "home page must include the BenchLogs block");
});
