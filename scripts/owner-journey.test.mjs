import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { requestContext } from "../src/lib/request-context.mjs";
import { projectQuestions } from "../src/data/project-questions.mjs";

const source = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const parts = JSON.parse(source("src/data/parts.json"));
const context = (query, rows = parts) => requestContext(new URLSearchParams(query), rows);

test("a fresh enquiry has no invented part, situation or qualification", () => {
  assert.deepEqual(context(""), { partSlug: "", partTitle: "", situation: "", researchOnly: false });
  assert.deepEqual(context("part=Unlisted%20console%20insert"), {
    partSlug: "", partTitle: "Unlisted console insert", situation: "", researchOnly: false,
  });
});

test("only existing situation values can prefill an owner enquiry", () => {
  for (const situation of ["have-part", "on-car", "gone", "improvement"]) {
    assert.equal(context(`situation=${situation}`).situation, situation);
  }
  for (const situation of ["checkout", "approved", "fitted", "<script>", "free-prototype"]) {
    assert.equal(context(`situation=${encodeURIComponent(situation)}`).situation, "");
  }
});

test("known gated records remain research-only despite a conflicting title or commercial intent", () => {
  const gated = parts.filter((part) => part.safetyGated);
  assert.ok(gated.length > 0, "exercise a real gated public record");
  for (const part of gated) {
    const result = context(`part_slug=${part.slug}&part=Buy%20a%20finished%20part&situation=improvement`);
    assert.equal(result.researchOnly, true);
    assert.equal(result.partTitle, part.title);
    assert.equal(result.partSlug, part.slug);
    assert.equal(result.situation, "");
  }
  const synthetic = context("part_slug=test-fitted&situation=improvement", [
    { slug: "test-fitted", title: "Synthetic fitted but gated fixture", state: "fitted", safetyGated: true },
  ]);
  assert.equal(synthetic.researchOnly, true, "a fitted label cannot open a closed scope");
});

test("slug validation and canonical titles preserve identity without injecting markup", () => {
  for (const invalid of ["../elsewhere", "javascript:alert(1)", "<img>", "WITH SPACES"]) {
    assert.equal(context(`part_slug=${encodeURIComponent(invalid)}`).partSlug, "");
  }
  const part = parts.find((part) => !part.safetyGated);
  assert.equal(context(`part_slug=${part.slug}&part=misleading`).partTitle, part.title);
  assert.equal(context("part_slug=unlisted-safe-slug&part=An%20owner%20question").partTitle, "An owner question");
  const request = source("src/pages/request.astro");
  assert.doesNotMatch(request, /innerHTML\s*=/);
  assert.match(request, /project-guidance.*hidden = true/);
  assert.match(request, /intake-local.*hidden = true/);
  assert.match(request, /improvement\.disabled = true/);
});

test("project FAQ is editorial guidance, with no invented price or delivery promise", () => {
  assert.equal(new Set(projectQuestions.map((item) => item.id)).size, projectQuestions.length);
  for (const item of projectQuestions) {
    assert.match(item.id, /^project-[a-z-]+$/);
    assert.ok(item.question.endsWith("?"));
    assert.ok(item.answer.length > 60);
    for (const key of ["price", "stock", "orderable", "qualified", "turnaround"]) {
      assert.equal(Object.hasOwn(item, key), false);
    }
  }
  const copy = projectQuestions.map((item) => item.answer).join(" ");
  assert.match(copy, /paid work/);
  // Visit area, founder 2026-09-29: across the Seacoast and Lakes Region of NH and Maine.
  assert.match(copy, /Seacoast and Lakes Region of New Hampshire and Maine/);
  assert.doesNotMatch(copy, /Rochester|selected Maine/);
  assert.match(copy, /pre-2000/);
  assert.doesNotMatch(copy, /\$\s*\d|guaranteed fit|ships? in \d/i);
});

test("the two-door component uses the existing discussion boundary, not stock fiction", () => {
  const paths = source("src/components/OfferPaths.astro");
  assert.match(paths, /part\.state === "fitted" && !part\.safetyGated/);
  assert.match(paths, /not a ready-to-buy range/);
  assert.match(paths, /href="\/custom\/"/);
  assert.match(paths, /href="\/registry\/"/);
  assert.doesNotMatch(paths, /Add to cart|Buy now|in stock/i);
});

test("Dispatch uses the same multipart/form contract the existing API parses", () => {
  const home = source("src/pages/index.astro");
  const api = source("src/pages/api/request.ts");
  assert.match(api, /request\.formData\(\)/);
  assert.match(home, /new FormData\(joinForm\)/);
  assert.match(home, /headers: \{ accept: "application\/json" \},\s*body: data/);
  assert.doesNotMatch(home, /JSON\.stringify\(Object\.fromEntries/);
  assert.match(home, /if \(!res\.ok \|\| !body\.ok\)/);
});
