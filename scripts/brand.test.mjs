// Brand decisions of 2026-09-28, locked where they are used: readable type, the stamp mark,
// one ink per evidence rung, the wanted list, a small plain vocabulary, and real car photos
// without location metadata. See BRAND.md. A redesign that needs to change one of these should
// change the decision (and this test) on purpose, not drift past it.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { car } from "../src/data/car.mjs";
import { requestContext } from "../src/lib/request-context.mjs";

const root = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");
const parts = JSON.parse(read("src/data/parts.json"));

// Every page, component, layout and style the public site ships. The local-only studio
// walkthrough is excluded: it is not part of the production site.
function siteSources() {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (/\/studio(\/|$)/.test(path)) continue;
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(astro|css|mjs|ts)$/.test(name)) out.push(path);
    }
  };
  walk(new URL("src", root).pathname);
  return out;
}

test("type tokens keep reading text at 15px+ and nothing below the 11px floor", () => {
  const tokens = read("src/styles/tokens.css");
  const px = (name) => {
    const m = tokens.match(new RegExp(`${name}:\\s*([\\d.]+)px`));
    assert.ok(m, `${name} is defined in px`);
    return Number(m[1]);
  };
  for (const name of ["--t-section", "--t-lead", "--t-dense"]) assert.ok(px(name) >= 15, `${name} >= 15px`);
  for (const name of ["--t-micro", "--t-eyebrow", "--t-nav", "--t-button", "--t-zone"]) assert.ok(px(name) >= 11, `${name} >= 11px`);
  assert.match(tokens, /--font-text:\s*"Archivo"/, "sentences are set in Archivo");
  assert.ok(existsSync(new URL("public/fonts/archivo-400.woff2", root)), "Archivo 400 is self-hosted");
  assert.ok(existsSync(new URL("public/fonts/OFL-Archivo.txt", root)), "Archivo licence stays beside the font");
});

test("no shipped style hard-codes a font size below 11px", () => {
  for (const file of siteSources()) {
    const source = readFileSync(file, "utf8");
    for (const m of source.matchAll(/font(?:-size)?:[^;{}]*?(?<![\w.-])(\d+(?:\.\d+)?)px/g)) {
      assert.ok(Number(m[1]) >= 11, `${file}: "${m[0]}" is below the 11px floor`);
    }
  }
});

test("the print-it, measure-it stamp mark is drawn the same everywhere", () => {
  const insignia = read("src/components/Insignia.astro");
  const favicon = read("public/favicon.svg");
  const nozzle = "M31 11.5H43V15.5H40.5L37 20.5L33.5 15.5H31Z";
  const arrows = "M16 46L24 41.6V50.4Z M48 46L40 41.6V50.4Z";
  for (const [name, svg] of [["Insignia", insignia], ["favicon", favicon]]) {
    assert.ok(svg.includes(nozzle), `${name} draws the nozzle laying the top layer`);
    assert.ok(svg.includes(arrows), `${name} draws the dimension under the part`);
  }
  assert.match(favicon, /<circle[^>]*r="28.5"[^>]*stroke/, "favicon keeps the stamp ring");
  assert.doesNotMatch(favicon, /5BE4D0|fixture/i, "the retired fixture mark is gone");
  assert.doesNotMatch(read("src/components/Lockup.astro"), /font-size:\s*(?:[0-9]|10)px/, "the expansion never drops below the floor");
});

test("each evidence rung has its own ink, and only Fitted is a filled stamp", () => {
  const tokens = read("src/styles/tokens.css");
  const inks = ["requested", "development", "measured", "fitted", "closed"].map((rung) => {
    const m = tokens.match(new RegExp(`--st-${rung}:\\s*([^;]+);`));
    assert.ok(m, `--st-${rung} is defined`);
    return m[1].trim();
  });
  assert.equal(new Set(inks).size, inks.length, "no two rungs share an ink");

  const stamp = read("src/components/Stamp.astro");
  for (const rung of ["requested", "development", "measured", "fitted", "closed"]) {
    assert.match(stamp, new RegExp(`\\.stamp--${rung}\\s*\\{[^}]*var\\(--st-${rung}\\)`), `${rung} uses its own ink`);
  }
  const rule = (rung) => stamp.match(new RegExp(`\\.stamp--${rung}\\s*\\{([^}]*)\\}`))[1];
  assert.match(rule("fitted"), /background:/, "Fitted is filled");
  for (const rung of ["requested", "development", "measured"]) {
    assert.doesNotMatch(rule(rung), /background:/, `${rung} stays an outline stamp`);
  }

  const catalog = read("src/lib/catalog.ts");
  const order = [...catalog.matchAll(/\{ state: "(\w+)", label: "([^"]+)" \}/g)].map((m) => m[1]);
  assert.deepEqual(order, ["requested", "development", "measured", "fitted"], "the ladder order is fixed");
  const ladder = read("src/components/EvidenceLadder.astro");
  assert.match(ladder, /\{safetyGated \?/, "a gated record renders as closed, not as a partly climbed ladder");
});

test("the wanted list is an honest ask: requested, never gated, no invented reward", () => {
  const catalog = read("src/lib/catalog.ts");
  assert.match(catalog, /return part\.state === "requested" && !part\.safetyGated;/);
  const wanted = parts.filter((part) => part.state === "requested" && !part.safetyGated);
  assert.ok(wanted.length > 0, "exercise real wanted records");
  assert.ok(parts.some((part) => part.safetyGated && part.state === "requested"), "a gated requested record exists and stays off the list");

  const list = read("src/components/WantedList.astro");
  assert.match(list, /parts\.filter\(isWanted\)/);
  assert.match(list, /situation=have-part/);
  assert.equal(requestContext(new URLSearchParams(`part_slug=${wanted[0].slug}&situation=have-part`), parts).situation, "have-part",
    "the wanted-list link prefills a real enquiry situation");
  const visible = list.replace(/\/\*\*[\s\S]*?\*\//, "");
  assert.doesNotMatch(visible, /free|reward|first print|loan|\$\s*\d|guarantee/i, "no unapproved donor terms");

  const registry = read("src/pages/registry/index.astro");
  assert.match(registry, /<WantedList parts=\{parts\} \/>/);
  assert.match(registry, /#wanted \.wanted-row/, "search and filters cover the wanted rows");
  assert.match(read("src/pages/index.astro"), /<WantedList parts=\{parts\} compact/);
});

test("the interface keeps a small plain vocabulary", () => {
  const banned = [
    /field[- ]files?\b/i, /field index/i, /bench journal/i, /case file/i, /investigation desk/i,
    /parts investigation/i, /roadbook/i, /a lead is useful/i, /fit lab/i, /measurement bay/i,
    /OCP3D Dispatch|the Dispatch|GET THE DISPATCH/,
  ];
  for (const file of siteSources()) {
    if (/\/api\//.test(file)) continue; // founder-side notification text, not the interface
    if (/styleguide\.astro$/.test(file)) continue; // names the banned words on purpose, as guidance
    // Visible copy only: drop comments before checking.
    const source = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    for (const pattern of banned) assert.doesNotMatch(source, pattern, `${file}: ${pattern}`);
  }
  const nav = read("src/layouts/Base.astro");
  for (const label of ["Custom design", "Parts & projects", "Build logs", "Materials", "About"]) {
    assert.ok(nav.includes(`label: "${label}"`), `nav keeps "${label}"`);
  }
});

test("car photos are real, described, and carry no EXIF or location data", () => {
  assert.ok(car.photos.length > 0);
  for (const photo of car.photos) {
    const file = new URL(`public${photo.src}`, root);
    assert.ok(existsSync(file), `${photo.src} is committed`);
    const head = readFileSync(file).subarray(0, 65536);
    assert.equal(head.indexOf(Buffer.from("Exif\0\0")), -1, `${photo.src} still carries EXIF`);
    assert.ok(photo.alt.length > 20, `${photo.src} needs real alt text`);
    assert.match(photo.caption, /SUPRA/, "captions name the car");
  }
  assert.match(read("src/pages/charter.astro"), /<TheCar \/>/, "About shows the car");
});

// Founder direction 2026-09-28: "make the site less wordy". Budgets for the interface copy that
// tends to grow back. Build-log articles are exempt: they are the long-form writing.
test("interface copy stays short", async () => {
  const words = (text) => text.trim().split(/\s+/).filter(Boolean).length;
  for (const file of siteSources()) {
    if (!/\/pages\//.test(file) || /\/journal\//.test(file)) continue;
    const source = readFileSync(file, "utf8");
    for (const m of source.matchAll(/\slede="([^"]+)"/g)) {
      assert.ok(words(m[1]) <= 25, `${file}: lede is ${words(m[1])} words (budget 25): "${m[1]}"`);
    }
  }
  const { materials, materialQuestions } = await import("../src/data/materials.mjs");
  const { projectQuestions } = await import("../src/data/project-questions.mjs");
  const { journal } = await import("../src/data/journal.mjs");
  for (const item of [...materialQuestions, ...projectQuestions]) {
    assert.ok(words(item.answer) <= 40, `FAQ "${item.question}" is ${words(item.answer)} words (budget 40)`);
  }
  for (const material of materials) {
    for (const key of ["benefit", "limitation", "question"]) {
      assert.ok(words(material[key]) <= 16, `${material.id}.${key} is ${words(material[key])} words (budget 16)`);
    }
  }
  for (const entry of journal) {
    assert.ok(words(entry.summary) <= 22, `${entry.slug} summary is ${words(entry.summary)} words (budget 22)`);
  }
});
