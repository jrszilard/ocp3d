# OCP3D — Old Car Problems

OCP3D measures, engineers, and 3D-prints difficult-to-find parts for cars worth keeping.
Discontinued reproductions and original interface solutions both begin as an old-car problem,
then earn their evidence one measurement and real-car test at a time.

Production: **https://ocp3d.com**. Legacy web domains 308-redirect here. The existing verified case
mailbox remains `requests@lostclipsociety.com` until a separately verified mail migration.

Static [Astro](https://astro.build) site. Part pages are generated from the committed catalog
snapshot at `src/data/parts.json` — the site builds anywhere with no private-repo dependency.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm test
```

## Design

- The design system lives in [`src/styles/tokens.css`](src/styles/tokens.css). Components consume
  tokens rather than hard-coded visual values.
- `src/components/ServiceHeading.astro` is the common page masthead: original orbital instrument,
  literal field-file labels, and responsive route framing.
- Live reference: `/styleguide`.
- Brand and voice rules: [`BRAND.md`](BRAND.md).
- Visual direction is original retrofuturist **Orbital Service** — space-age nostalgia applied to
  keeping old vehicles running. Do not copy Fallout or other proprietary visual language.

## Pages

- `/` home · `/registry/` parts archive · `/registry/<slug>/` part pages
- `/request/` log an old-car problem · `/method/` fit lab · `/charter/` mission
- `/styleguide/` design-system reference

## Catalog data

`src/data/parts.json` is a generated snapshot — don't hand-edit it. It is refreshed from the
workshop’s private catalog with `node scripts/sync-catalog.mjs` (workshop machine only).
