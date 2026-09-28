import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { materials, materialSources, materialQuestions } from "../src/data/materials.mjs";

function uniqueAnchors(items) {
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  for (const item of items) assert.match(item.id, /^[a-z][a-z0-9-]*$/);
}

test("material and source jump links have unique, stable targets", () => {
  uniqueAnchors(materials);
  uniqueAnchors(materialSources);
  const sources = new Set(materialSources.map((source) => source.id));
  for (const material of materials) assert.ok(sources.has(material.source), material.name);
});

test("each material presents a benefit, a limitation and a suitability question", () => {
  for (const material of materials) {
    for (const key of ["name", "label", "benefit", "limitation", "question"]) {
      assert.equal(typeof material[key], "string", `${material.id}.${key}`);
      assert.ok(material[key].trim().length > 0, `${material.id}.${key}`);
    }
    assert.ok(material.question.endsWith("?"));
  }
  // This is editorial guidance, not a shadow catalog or a sales selector.
  for (const material of materials) {
    for (const key of ["price", "orderable", "stock", "fitment", "approved"]) {
      assert.equal(Object.hasOwn(material, key), false, `${material.id}.${key}`);
    }
  }
});

test("FAQ references resolve and citations stay explicit first-party HTTPS links", () => {
  uniqueAnchors(materialQuestions);
  const sources = new Set(materialSources.map((source) => source.id));
  for (const question of materialQuestions) {
    assert.ok(question.answer.trim());
    if (question.source) assert.ok(sources.has(question.source));
  }
  for (const source of materialSources) {
    const url = new URL(source.href);
    assert.equal(url.protocol, "https:");
    assert.ok(["help.prusa3d.com", "newsroom.porsche.com"].includes(url.hostname));
  }
});

test("archive cards do not invent a material when OEM identity is unresolved", () => {
  const card = readFileSync(new URL("../src/components/RegisterCard.astro", import.meta.url), "utf8");
  assert.doesNotMatch(card, /ASA\s*·\s*neutral/);
  assert.match(card, /oemIdentityLabel\(part\)/);
  assert.match(card, /CAD RENDER · NOT A TEST RESULT/);
  assert.doesNotMatch(card, /reproduction in neutral resin/);
});
