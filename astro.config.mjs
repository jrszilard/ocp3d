import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// Static site generated from the committed catalog snapshot (src/data/parts.json).
// Regenerate the snapshot on the workshop machine: node scripts/sync-catalog.mjs
//
// Pages stay static; routes with `export const prerender = false` (the /api/*
// form endpoints and /unsubscribe) run in the Cloudflare Worker (wrangler.jsonc).
// Their settings are Worker secrets, read per request with getSecret() from
// astro:env/server: import.meta.env is inlined at BUILD time, where they don't exist.
export default defineConfig({
  site: "https://ocp3d.com",
  // Images are optimized with sharp at build time; the Worker serves them as files.
  adapter: cloudflare({ imageService: "compile" }),
  // checkOrigin compares the Origin header against the request URL's origin — but on
  // Vercel, functions saw their URL as https://localhost (host header never reached the
  // renderer), so EVERY browser form POST 403'd in production while working in dev.
  // Kept off through the move to Cloudflare.
  // Our only POSTs are the public request/membership forms: no session to ride, spam is
  // handled by the honeypot.
  security: { checkOrigin: false },
  // sitemap-index.xml for search engines (robots.txt points at it). Static pages only; the
  // thank-you page, unsubscribe, the style guide and the local studio walkthrough stay out.
  integrations: [
    sitemap({ filter: (page) => !/\/(request\/received|styleguide|studio)(\/|$)/.test(new URL(page).pathname) }),
  ],
});
