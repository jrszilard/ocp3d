# OCP3D — brand notes

**OCP3D means Old Car Problems.** We measure, engineer, and 3D-print difficult-to-find parts for
cars worth keeping. A discontinued clip, a brittle knob, or an interface nobody ever designed is
not a nostalgia prop: it is an old-car problem with a physical path forward.

## The promise

1. **Keep the car running.** Start from an original or a measured interface, state what is known,
   and make the next useful version. OCP3D covers faithful reproductions and original adaptors.
2. **Make the evidence visible.** Dimensions are published free. Draft, measured, and real-car fit
   statuses are distinct. A render is not a fit test.
3. **Keep the owner private.** No trackers, analytics, advertising pixels, or third-party scripts.
   Store only what a request or Dispatch signup needs.

## Voice

- Expand **OCP3D — Old Car Problems** on first encounter. The acronym is memorable only after the
  customer understands what it solves.
- Plain language leads: *3D-printed parts and engineering for old car problems.*
- Direct, capable, and a little cosmic. The world can say *field file*, *service bay*, *signal*,
  and *orbit*; claims about measurement, fit, material, safety, or availability stay literal.
- Never romanticise a broken car, mock an owner, or imply that every old-car problem is printable.
- The customer buys a part path, not a fiction. Data and safety copy receive no jokes.

## Visual world — “Orbital Service”

An **original retrofuturist vehicle-service world**: space-age optimism, night-sky workshop,
moon-paper records, analog instruments, additive layer courses, and an old vehicle kept useful in
a future that otherwise forgot it.

- **Not Fallout.** Fallout is an internal mood shorthand for “futuristic old world,” never a visual
  source. Do not use Vault/Pip-Boy-like marks, poses, colour treatment, typography, characters,
  dialogue, names, or other identifiable trade dress.
- The palette lives in `src/styles/tokens.css`: midnight service sky, moon-paper, signal orange,
  and ion green. Components consume tokens only.
- **The mark** is original: a vintage-car silhouette travels inside an orbital ring, over three
  additive layer courses. `Insignia.astro` and `public/favicon.svg` own it.
- **The lockup** is mark + `OCP3D` + `OLD CAR PROBLEMS`. Keep the expansion visible in major first
  encounters; never isolate a logo-like mark from the brand without need.
- Field-manual furniture — rules, file labels, service notes, star/orbit coordinates — adds
  atmosphere. It must never make a request, safety boundary, status, or measurement harder to read.
- **Mechanical helper motif:** `WorkshopHelper.astro` is a small mid-century wheeled service-cart /
  assembly-rover with a carrying arm. Use it as an occasional field-panel detail, never as a mascot
  or primary mark. It has no face, chat, humanoid body, AI claim, or autonomous-vehicle implication.
- Every non-home public route opens with `ServiceHeading.astro`: a clear literal title paired with
  an original orbital-instrument panel and a file/signal readout. Use it rather than inventing a
  one-off page masthead, so the archive, intake, fit lab, mission, confirmations, and styleguide
  remain one coherent service system.
- Part renders remain neutral resin. Do not invent photos or make marketing imagery look like proof.

## Things with fixed meaning

- Status stamps (Requested / In development / Measured / Fitted on a real car) describe real
  evidence and must remain semantically distinct.
- The no-original placeholder remains an honest request funnel.
- Dimension tables and per-material fit reports are the product’s trust core.
- “Fits or we remake it free” applies only where the evidence and offer actually support it.
- **OCP3D Dispatch** is a quiet opt-in update channel, not a social feed or membership identity.
