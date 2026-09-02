import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const parts = JSON.parse(readFileSync(new URL("../src/data/parts.json", import.meta.url), "utf8"));

test("research snapshot excludes archived heater work", () => {
  assert.equal(parts.some((part) => part.slug === "heater-control-knob"), false);
});

test("wiper adaptor remains research-only pending final testing", () => {
  const wiper = parts.find((part) => part.slug === "wiper-arm-adaptor");
  assert.ok(wiper, "wiper adaptor must be in the research archive");
  assert.equal(wiper.safetyGated, true);
  assert.equal(wiper.state, "requested", "R&D must not borrow a developed/fitted product state");
  assert.doesNotMatch(wiper.title, /safety-gated/i);
  assert.match(wiper.description, /vibration.*UV.*rain/is);
});

test("every generated field file carries an explicit safety-gate projection", () => {
  assert.ok(parts.length > 0);
  for (const part of parts) assert.equal(typeof part.safetyGated, "boolean", part.slug);
});
