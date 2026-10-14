// Hosting on Cloudflare Workers (2026-10-13, moved from Vercel): the site Worker
// (wrangler.jsonc), the redirect Worker for the old and www hostnames (workers/redirects/),
// and the two ways the move could fail quietly. Server settings read with import.meta.env are
// inlined at build time, so on Cloudflare they would be missing and every form would report
// "unconfigured"; and the Worker's own code sits in dist/, so it has to be kept out of the
// public files.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import redirects from "../workers/redirects/index.js";

const root = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");
// wrangler.jsonc files here keep their comments on lines of their own.
const jsonc = (file) => JSON.parse(read(file).split("\n").filter((l) => !l.trim().startsWith("//")).join("\n"));

const OLD_HOSTS = [
  "www.ocp3d.com",
  "lostclipsociety.com",
  "www.lostclipsociety.com",
  "ministryofdiscontinuedparts.com",
  "www.ministryofdiscontinuedparts.com",
];
const SECRETS = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "UNSUBSCRIBE_SECRET",
  "AGENTMAIL_API_KEY",
  "AGENTMAIL_INBOX_ID",
  "REQUESTS_NOTIFY_EMAIL",
  "REQUESTS_WEBHOOK_URL",
];

test("every old hostname 308s to the same path and query on ocp3d.com", () => {
  for (const host of OLD_HOSTS) {
    for (const path of ["/", "/journal/", "/request/?part=coat-hook&ref=a%20b"]) {
      const res = redirects.fetch(new Request(`https://${host}${path}`));
      assert.equal(res.status, 308, `${host}${path}`);
      assert.equal(res.headers.get("location"), `https://ocp3d.com${path}`, `${host}${path}`);
    }
  }
});

test("the redirect Worker claims exactly the old hostnames, never ocp3d.com itself", () => {
  const config = jsonc("workers/redirects/wrangler.jsonc");
  const hosts = config.routes.map((r) => {
    assert.equal(r.custom_domain, true, r.pattern);
    return r.pattern;
  });
  assert.deepEqual([...hosts].sort(), [...OLD_HOSTS].sort());
  assert.ok(!hosts.includes("ocp3d.com"), "ocp3d.com would redirect to itself");
});

test("the site Worker runs the adapter's output and keeps no settings in its config", () => {
  const config = jsonc("wrangler.jsonc");
  assert.equal(config.main, "./dist/_worker.js/index.js");
  assert.equal(config.assets.directory, "./dist");
  assert.equal(config.vars, undefined, "settings belong in Worker secrets, not wrangler.jsonc");
  const routes = (config.routes ?? []).map((r) => r.pattern);
  for (const host of OLD_HOSTS) assert.ok(!routes.includes(host), `${host} belongs to the redirect Worker`);
});

test("the Worker's own code is never served as a public file", () => {
  const ignored = read("public/.assetsignore").split("\n").map((l) => l.trim());
  assert.ok(ignored.includes("_worker.js"));
});

test("server settings are read per request, not inlined at build", () => {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (/\/studio(\/|$)/.test(path)) continue;
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(astro|mjs|ts)$/.test(name)) files.push(path);
    }
  };
  walk(new URL("src", root).pathname);
  let reads = 0;
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const key of SECRETS) {
      assert.ok(!text.includes(`import.meta.env.${key}`), `${file} reads ${key} at build time`);
      if (text.includes(`getSecret("${key}")`)) {
        reads++;
        assert.match(text, /import \{ getSecret \} from "astro:env\/server";/, file);
      }
    }
  }
  assert.ok(reads >= SECRETS.length, "every setting is read somewhere");
});

test("Vercel no longer builds the repo (it would serve the Worker's code as a file)", () => {
  assert.deepEqual(JSON.parse(read("vercel.json")), { git: { deploymentEnabled: false } });
});
