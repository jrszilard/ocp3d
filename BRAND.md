# The Ministry of Discontinued Parts — brand notes (design edition)

**The idea:** a ministry for the things the industry stopped making — and for the cars that
still don't know who you are.

**Two pillars carry the brand. Everything else serves them.**

1. **PRESERVATION.** Cars outlive the parts that hold them together, and the industry has no
   reason to care. We measure surviving originals, reproduce them, fit them to a real car, and
   publish every dimension free whether or not anyone buys. Preservation is proved by evidence,
   never by sentiment — do not be nostalgic at the customer.
2. **INDEPENDENCE.** A 1974 car has no modem, no telematics unit and no opinion about its owner.
   Keeping such machines running is the practical form of that argument, so the Ministry collects
   what a job needs and nothing for its own sake — purpose limitation, not abstinence. We may ask
   for anything a job genuinely requires. Never promise to hold less than we hold, and never turn
   privacy into a security-product aesthetic.

**The joke is delivery, not subject.** A self-appointed ministry granting institutional dignity to
a missing plastic clip is how this brand *talks*; it is not what it is *about*. Where humour and
either pillar conflict, the pillar wins. The irony does have a reason worth keeping: a ministry is
the most data-hungry institution imaginable, and this one applies total seriousness to the object
and keeps no picture of the person.

**What we are against:** discontinuation, and the culture that replaced owning a machine with being
watched by one. Never the customer, never their car, never a workshop.

**The promise:** measured from real originals · published free · fits or we remake it.

## Voice rules
1. **The newcomer test rules everything:** a first-time visitor must understand what we make and
   how to request it from plain language alone. Headlines, navigation, CTAs, statuses, and all
   data are PLAIN. Ministry fiction is garnish: one dry joke per section, maximum.
2. **Every joke must do a job:** explain a process, disclose a boundary, or relieve the customer.
   The fake bureaucracy may never create real friction.
3. **Data copy gets zero jokes.** Mono type is the trust signal. State actual collection and
   retention exactly: the vehicle supplies no telemetry; a request or registration supplies only
   what a person voluntarily files.
4. Never mock an owner, a car, a safety boundary, a fitment uncertainty, or workshop competence.
   The villain is discontinuation; modern surveillance culture is the quiet foil.
5. The Monty Python ode lives only in the Ministry name and the deadpan irony of a self-appointed
   public office. **No walking figure, bowler hat, copied pose, quote, title reference, or
   character-like iconography.**

## Visual world — "The Paint Chart Era"
- **The idea:** ~80% of new cars today are white/black/grey/silver; in 1970 Mopar alone offered
  ~30 colors. The Ministry looks like a period dealer brochure crossed with a carefully filed
  civic document: warm stock, printer's ink, evidence plates, and every accent a REAL named
  pre-1990 paint (Mexico Blue, Signal Orange, Grabber Blue, Plum Crazy, Sublime, Sunflower,
  Bahia Red, Irish Green). One paint, one job; see `src/styles/tokens.css`.
- **Color is chrome, never product:** part renders stay neutral resin everywhere; a part earns
  its real trim colors only on its own page, from its own OEM data.
- **Logo — THE DEPARTMENT, PRINTED (selected 2026-08-20).** The mark is a flat departmental tile:
  **MDP** knocked out of a solid block, in the quiet sans, built up in visible **layer courses** —
  ground-coloured hairlines at the pitch of a real machine, because a perfectly crisp tile is the
  one thing this workshop cannot produce. The full lockup is tile · hairline
  rule · `Ministry of` / `Discontinued Parts`. The premise is that today's real government
  departments are flat and one-ink, and the Ministry wears that uniform perfectly straight —
  the joke is that the institution wearing it appointed itself. Two rules carry the whimsy:
  captions state true things, and **there is no crown, ever** — an official tile with nothing
  above it is the entire gag, and it also keeps us clear of impersonating a real department.
  - **Printed ink, not enamel.** `Mark.astro` takes the page's ink via `currentColor` and knocks
    its letters out to the page ground, so it repaints with the theme. Where the mark must carry
    its own color and cannot read the page — favicon, letterhead, anything physical — it takes
    **badge oxblood** with cream letters (`public/favicon.svg`).
  - **Scale:** the layer seams are hairlines, so they close up as the mark shrinks — by 16 px it
    collapses back to a solid departmental block and the letters go to texture. That is correct
    and intended; do not thicken the letters or the seams to fight it. The whimsy is free precisely
    because it disappears at the size where it would cost legibility.
  - **The layer courses are the method, not decoration.** They are the only place the identity
    still says how the Ministry makes things; keep their pitch even and never let them become a
    decorative stripe.
  - **Retired:** the enamel grille-badge crest and its clip glyph (`Crest.astro`, deleted). No
    individual-part silhouette, no gait, no nozzle, no shield, no crown, no Royal Arms.
  - Studies behind the choice: `public/mockups/ministry-mark-study-04.html` (selected board)
    and `ministry-mark-printed.html` (the printed variants; 11 The Layer Line shipped), plus
    `ministry-mark-options.html` and `ministry-mark-study-03.html` (rejected families).
- **Period civic, not actual government:** use garters, rules, docket labels, and stamps—but no
  crown, Royal Arms, shield/trust-badge language, or implication of UK-government affiliation.
- **Type:** slab serif is the Ministry's voice; monospace is anything evidentiary (dimensions,
  labels, case stamps); quiet sans is body copy.
- **Texture cues:** documentary tabs, rubber-stamped statuses, graph-paper evidence plates,
  registration cards. Use one fictional artifact per section, not a layer of distressed props.

## Things with fixed meaning (don't restyle away)
- The **status stamps** (Requested / In development / Measured / Fitted on a real car) encode the
  part's real state and their color is semantic.
- The **dimension tables** are mono, with CONFIRMED in measured-green. They are the product's
  trust core, not decoration.
- **"Fits or we remake it free"** and **"measurements published free"** are commitments; keep
  them visible wherever a part can be ordered.
