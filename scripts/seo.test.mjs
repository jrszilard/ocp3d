// Search and link-preview basics (2026-10-14): a sitemap robots.txt points at, a real photo on every
// shared link, and the business described as data. Records are research, not offers: no Product markup.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");

test("robots.txt points search engines at the sitemap", () => {
  assert.match(read("public/robots.txt"), /^Sitemap: https:\/\/ocp3d\.com\/sitemap-index\.xml$/m);
  assert.match(read("astro.config.mjs"), /sitemap\(\{ filter:/);
});

test("every page carries a link preview with a real photo", () => {
  const base = read("src/layouts/Base.astro");
  for (const tag of ['property="og:image"', 'property="og:url"', 'property="og:type"', 'name="twitter:card"'])
    assert.ok(base.includes(tag), tag);
  assert.match(base, /image = car\.photos\[0\]\.src/, "the default preview is the car, a real photo");
  for (const log of ["sun-visor-clip", "wiper-adaptors"])
    assert.match(read(`src/pages/journal/${log}.astro`), /image=\{img\("[^"]+\.jpg"\)\}/, `${log} previews a photo`);
});

test("the business is described as data, never as a product for sale", () => {
  const home = read("src/pages/index.astro");
  assert.match(home, /"@type": "Organization"/);
  assert.doesNotMatch(home + read("src/layouts/Base.astro"), /"Product"|"Offer"/);
  assert.doesNotMatch(home, /areaServed: \[[^\]]*"(New Hampshire|Maine)"/, "no statewide coverage claim");
});
