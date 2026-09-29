# OCP3D — brand notes

**OCP3D means Old Car Problems.** We measure, engineer, and 3D-print difficult-to-find parts for
cars worth keeping. A discontinued clip, a brittle knob, or an interface nobody ever designed is
not a nostalgia prop: it is an old-car problem with a physical path forward.

## The promise

1. **Start with the interface.** Begin at an original or a measured mating surface, state what is
   known, and make the next useful version. OCP3D has two explicit paths: **Restore** (faithful
   reproductions/repair aids) and **Improve** (clearly labeled OCP3D-original, non-safety-critical
   convenience additions). They never borrow each other’s identity or fit claims.
2. **Make the evidence visible.** Dimensions are published free. Draft, measured, and real-car fit
   statuses are distinct. A render is not a fit test.
3. **Keep the owner private.** No trackers, analytics, advertising pixels, or third-party scripts.
   Store only what an enquiry or email-updates signup needs.

## Voice

- Expand **OCP3D — Old Car Problems** on first encounter. The acronym is memorable only after the
  customer understands what it solves.
- Plain language leads: *3D-printed parts and engineering for old car problems.*
- Direct, capable, and grounded in a useful workshop. The world can say *field file*, *case note*,
  *bench*, *trace*, and *signal*; claims about measurement, fit, material, safety, or availability
  stay literal.
- Never romanticise a broken car, mock an owner, or imply that every old-car problem is printable.
- The customer buys a part path, not a fiction. Data and safety copy receive no jokes.

## Durability before process (2026-09-08; released 2026-09-28)

The home page and `/materials/` guide open with **“Old cars. Modern materials.”**
Visitors unfamiliar with 3D printing need to understand why the right printed polymer can do a
real automotive job before learning the workshop process. Released as copy and design only; it is
not a product-qualification decision.

- Lead with familiar conditions: parked-car heat, sunlight, repeated use, flex and load. Explain
  material names after the job, not as a wall of acronyms.
- Material capability is not part qualification. Exact grade, geometry, print direction, process,
  environment and evidence all matter. Do not use universal “car-safe”, stronger-than-metal,
  service-temperature, lifespan or OEM-equivalence claims.
- A PLA proof print is not a final-material test. Even shaded interiors can get hot. Nylon grades
  and filled/unfilled formulations are not interchangeable.
- Publish only real results. The current research archive is not a shelf of durability-qualified
  products. Render captions remain explicit; material labels must come from evidence, never a
  hard-coded fallback for missing catalog identity.
- Primary references in `src/data/materials.mjs` support general education only. Porsche Classic’s
  powder-based SLS example is not an endorsement or validation of OCP3D’s filament-printed parts.
- Keep process available, but secondary. The next action stays a human part discussion, not a
  promise that every problem can be printed.

## Owner-first extension (2026-09-08; released 2026-09-28)

Keep **Old cars. Modern materials.** and the workshop identity, but make the owner's next step
clear before the internal research vocabulary. Released as copy only; it does not set prices,
turnaround, stock or qualification.

- **Two doors:** Parts & projects, and Custom design & prototyping. The current collection is
  research/development; do not give it a Buy now CTA. Fitted/non-safety-gated records may open a
  made-to-order discussion, not automatic checkout or universal fitment.
- **The Supra is an origin, not a customer boundary.** Welcome eligible pre-2000 problems across
  makes and models. Founder work must not be presented as paid customer results.
- **Start with the problem, not a CAD file.** Missing parts and original convenience ideas can both
  start a conversation. Custom development is paid, scoped and quoted before it starts. No free
  engineering funnel, fixed prices, invented pilot slots, deadline or guaranteed finished outcome.
- **Start online. Meet where it helps.** Based in NH's Lakes Region; visits across the Seacoast
  and Lakes Region of New Hampshire and Maine by arrangement (founder, 2026-09-29). No statewide coverage claim, unarranged drop-offs,
  shipping instruction or need for a matching founder-owned vehicle.
- **Plain-language navigation and intake.** Custom design / Parts & projects / Materials / About /
  Start an enquiry. The technical record still owns evidence language. `ServiceHeading` supports
  an owner-facing context and a compact enquiry heading; do not invent a second masthead system.
- **Research leads are not sales leads.** Known safety-gated deep links use the canonical title,
  suppress paid-project and visit guidance, and retain an evidence-only submit action. Query
  parameters cannot grant qualification; human scope/identity checks still apply to every enquiry.
- **Real photos before polished renders.** Label the original as an original, the CAD as CAD, and
  physical test results only when they exist. Keep readable light body text on dark panels.

## Brand refresh — readable, stamped, plain (2026-09-28)

Founder direction after the 2026-09-28 brand review: ship the owner-first redesign and **stop
changing the look**. Improve the brand through real content (photos, build logs) and legibility,
not a new theme. Five changes, each locked by `scripts/brand.test.mjs`:

1. **Readable type.** Sentences are set in Archivo 400 (`--font-text`); labels, part numbers,
   dimensions, stamps and navigation stay in IBM Plex Mono. Mono means “label or record”.
   Reading text starts at 15 px (body 17, lead 19); nothing ships below 11 px. Use the `--t-*`
   tokens, never a hard-coded small size. Small-text greys and the rust/teal functional tones
   were darkened to pass WCAG AA on every paper surface.
2. **The stamp mark: print it, measure it.** A nozzle lays the top layer of a part (rounded
   layers, like extruded plastic), and the part's width is dimensioned beneath it as on a technical
   drawing, inside a rubber-stamp ring. One colour, drawn from 16 px outward; never a single part, a
   car silhouette or a shield. (Round 1's plain layer bars under a dimension didn't read as printing;
   the founder kept the measurement line and asked for clearer layers.) `Insignia.astro` (variants `stamp` and `seal`) and `public/favicon.svg` own it. The full
   seal adds OLD CAR PROBLEMS / NEW HAMPSHIRE rim lettering for 120 px and up. **The lockup is the
   plate** (`Lockup.astro`): the mark, OCP3D and OLD CAR PROBLEMS on a generic embossed licence
   plate, so the name reads like a vanity plate and the expansion sits in the slogan line. It is
   the one old-car cue in the identity (founder asked for "something simple that evokes an old
   car"); a fender arch and a headlamp brow were drawn and read as an arch/hooded eye. No state
   name, plate format or motto; the mark itself stays a method symbol, never a car silhouette. The comparison board
   (F3 chosen, E2 and measurement-only alternatives, round 1 for reference) is
   `design/mockups/ocp3d-mark-options.html`.
3. **The evidence ladder is the signature.** One ink per rung, never shared: Requested (steel,
   dashed), In development (ochre), Measured (teal), Fitted on a real car (solid rust, the only
   filled stamp). A research-only record is off the ladder (hatched), never a partly climbed ladder.
   `Stamp.astro`, `EvidenceLadder.astro` and `LadderKey.astro` read the record; they never add a
   claim.
4. **No wanted lists or donor asks (founder, 2026-09-29).** The "have one of these?" wanted list
   and "help out" asks were Lost-Clip-Society-era gamification of part reconstruction; OCP3D pitches
   custom design and 3D printing. Requested records with no work behind them are not listed and
   get no page (`isListed`, `listedParts` in `catalog.ts`); the site never asks visitors for
   originals. (Customers can still mention their own broken part in an enquiry.)
5. **The car is the face.** The founder stays off camera, so the ’83 Supra carries the story
   (`TheCar.astro`, `src/data/car.mjs`): real photos of the actual car only, plates/VIN tags/
   inspection stickers cropped, location metadata stripped. It is the origin, never a fitment claim
   for other cars.

**Short by default (founder, 2026-09-28: "make the site less wordy").** Say each thing once,
where it matters, in the fewest plain words. One caveat per page, next to the claim it limits;
safety and research-only boundaries stay literal but are never repeated as filler. The home page
links to the materials guide instead of repeating it. Budgets (enforced in `brand.test.mjs`): page
intros ≤ 25 words, FAQ answers ≤ 40, material notes ≤ 16, build-log summaries ≤ 22. Build-log
articles are the long-form writing and are exempt. The 2026-09-28 pass cut visible words on the
interface pages by about a third (home 1,379 → ~620).

**Vocabulary.** Custom design · Parts & projects · Part record · Build log · Materials · About ·
Start an enquiry · Email updates. Status words stay literal. Coined labels (field file, case file,
lead, trail, route, roadbook, investigation desk, fit lab, Dispatch) stay out of the interface;
closed records ask questions, not "research leads". The internal
`LCS-XXXXX` reference prefix is unchanged.

## Visual world

Warm ruled paper, real photographs, status stamps and a dark workshop board. The workshop feel
lives in the visuals and the evidence, not in invented nouns.

- The palette lives in `src/styles/tokens.css`: dark workshop surround/board, warm paper, rust
  action, teal, sun-yellow accent, and the four `--st-*` ladder inks. Components consume tokens only.
- **No generic car hero art.** Vehicles appear only as genuine fitment context, the founder’s own
  labelled car, donor/customer evidence, or appropriately labelled real/render imagery. Part
  renders remain neutral resin; do not invent photos or make marketing imagery look like proof.
- **The lockup** is the plate: mark + `OCP3D` + `OLD CAR PROBLEMS`. Use it in first encounters;
  the mark alone only where space is small and square (favicon, avatar). Slogan line keeps the
  11 px floor.
- Every non-home public route opens with `ServiceHeading.astro`: a clear literal title and a dark
  side panel of page-specific `facts` (a build log’s versions and material, a part’s status and
  dimensions). The panel never repeats a slogan. `audience="owner"` keeps the owner-facing panel.

## Things with fixed meaning

- Status stamps (Requested / In development / Measured / Fitted on a real car) describe real
  evidence and must remain semantically distinct. Restore and Improve are separate **part paths**,
  not status levels; an OCP3D-original improvement gets its own interface and function evidence.
- **Closed (safety-gated) records** are a scope gate, not a status level or an offer. Their public
  label is **In long-term testing** when the part is on the founder's car being tested over time
  (the wiper adaptors since Sept 20, 2026, founder direction 2026-09-29; `src/data/long-term-testing.mjs`),
  otherwise **Research only**. Either way the page says what still needs proving (vibration, UV,
  rain, time), that it is not for sale, and never invites purchase, installation, fit or road-use
  discussion for anyone else's car. The catalog `safetyGated` flag does not change.
- Dimension tables and per-material fit reports are the product’s trust core.
- “Fits or we remake it free” applies only where the evidence and offer actually support it.
- **Email updates** (internally still the `membership` type) are a quiet opt-in channel, not a social feed or membership identity.
