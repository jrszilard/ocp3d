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
- `src/components/ServiceHeading.astro` is the common page masthead: a literal title plus a dark
  panel of page-specific `facts` (never a repeated slogan).
- Live reference: `/styleguide`. Brand and voice rules: [`BRAND.md`](BRAND.md).
- Type: sentences in Archivo (`--font-text`), labels and data in IBM Plex Mono; 15 px reading
  sizes and an 11 px floor. Mark: the stamp (`Insignia.astro`, `public/favicon.svg`). Status:
  one ink per rung (`Stamp.astro`, `EvidenceLadder.astro`, `LadderKey.astro`). Requested parts
  with no original: `WantedList.astro`. The founder's car: `TheCar.astro`, `src/data/car.mjs`.
- `scripts/brand.test.mjs` locks the 2026-09-28 brand decisions (type floor, mark, ladder inks,
  wanted-list honesty, plain vocabulary, EXIF-free car photos).
- Warm ruled paper, real photographs and status stamps. No generic-car/AI/stock evidence or
  race/travel/performance implication; do not copy proprietary visual language.

## Pages

- `/` home · `/registry/` parts & projects · `/registry/<slug>/` evidence records
- `/custom/` owner-facing custom design & prototyping offer
- `/materials/` plain-English materials and durability guide
- `/request/` start an enquiry · `/method/` development process · `/charter/` about the workshop
- `/styleguide/` design-system reference

## Owner-first redesign (2026-09-08; released with the 2026-09-28 brand refresh)

The local homepage keeps **Old cars. Modern materials.**, with two explicit paths: existing
parts/projects and custom design/prototyping. `/custom/` explains paid scoped development without
inventing prices or turnaround; the collection stays visibly research/development. The Supra is
founder evidence, not the market boundary. Visits across the Seacoast and Lakes Region of NH and Maine are by
arrangement, with online enquiries first. The founder approved releasing it on 2026-09-28 together
with the brand refresh described in `BRAND.md`.

The materials guide and shared FAQ still explain suitability before process. General guidance in
`src/data/materials.mjs` and `src/data/project-questions.mjs` is editorial, not a shadow catalog or
part approval. No new analytics, third-party assets, ordering endpoint or backend data fields.

`src/lib/request-context.mjs` resolves safe situation prefill and canonical known-record titles.
Safety-gated records suppress commercial guidance and retain research-only enquiries. This is a
client presentation guard, not authorization or a replacement for human scope review. Both forms
retain multipart payloads, the existing `/api/request` contract, and native HTML fallbacks; photos
are sent in later email, not uploaded by the form.

`npm test` covers catalog projection, guide/offer boundaries, request context and the email-updates
transport regression (the API parses `request.formData()`, not JSON). Browser checks should cover
both offer paths, keyboard FAQs, responsive layouts, archive search/filter/reset, actual query
prefill, research-only suppression, and form validation/error/retry/receipt. **Intercept `/api/**`
during all form tests** and parse the intercepted form payloads; blindly returning success can
conceal a client/API format mismatch. Never write real demand signals or send email from a test.

## Catalog data

`src/data/parts.json` is a generated snapshot — don't hand-edit it. On the workshop machine,
`node scripts/sync-catalog.mjs` reads the authoritative Supabase catalog through
`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (or `.env.local`). It omits archived/blocked records
and carries an unresolved scope gate as a visibly closed research/final-testing boundary; the
archive is never a product/release feed.
