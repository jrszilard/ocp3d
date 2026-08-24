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
  - **The symbol is a shield.** A plain heraldic shield with one charge: an 80s coupe in side
    profile. No crown, no supporters, no text inside the shield — the Ministry is self-appointed
    and says so by what it leaves out. `Insignia.astro` is one flat SVG taking `currentColor`,
    so it inverts anywhere. Proportion is fixed at 40 × 46; below 26 px the shield closes up, so
    use the car alone.
  - **The lockup is ONE unit** — symbol, name, colour line. Do not restyle the three parts
    independently. Line breaks are fixed: two lines landscape, three portrait, never one. Mixed
    case, never all caps, never italic. Clear space all round is the height of the shield.
  - **Retired:** the enamel grille-badge crest (`Crest.astro`) and the MDP departmental tile
    (`Mark.astro`), both deleted.
- **The sheet.** Every page is a drawing sheet from a 1980s drawing office: zone markers down the
  margins, a 2px paper frame, general notes, tolerances, and a title block in the footer. Sections
  are divided by 1px paper rules, **never by whitespace**.
- **Colour is the cyanotype.** Near-white line and type on process blue, and **one** accent —
  amber. Never introduce a second: the restraint is why amber still means something when it marks
  the front of the queue or the one part that has actually been measured. Amber on paper fails
  contrast, so the inverted Article IV band uses the darker gold instead.
- **Radius is zero everywhere. No shadows anywhere.** Circles exist only for step balloons, wheels
  and material swatches.
- **Type: two families.** Archivo Narrow carries every headline, uppercase. **IBM Plex Mono is the
  body voice of the whole site** — resist substituting a proportional face for "readability", the
  mono is doing the drawing-office work. Archivo 600 sets the wordmark and nothing else. Never
  reduce mono body copy below 12 px. All self-hosted: Article IV counts "0 third-party scripts" on
  the page itself, so a font linked from Google would make the site's own claim false.
- **Period civic, not actual government:** rules, docket labels, title blocks and stamps — but no
  crown, Royal Arms, or implication of UK-government affiliation.
- **The hatched placeholder is honest furniture.** A diagonally hatched panel means a photograph
  is owed. Keep it in production rather than hiding an empty box.
- **No animation on load.** No parallax, no scroll reveals, no counting-up numbers — a drawing
  sheet does not animate. Hover and focus transitions only, never slower than 120ms.

## Things with fixed meaning (don't restyle away)
- The **status stamps** (Requested / In development / Measured / Fitted on a real car) encode the
  part's real state and their colour is semantic. In a one-accent palette that means amber is
  reserved for what has actually been proven; the earlier states stay paper and steel.
- The **empty state on a requested part** — no art, dashed foot, "NO ORIGINAL ON FILE" — is
  deliberate and must survive. It is the request funnel, and the honest thing to show when there
  is nothing yet to slice.
- The **dimension tables** are mono, with CONFIRMED in the house amber. They are the product's
  trust core, not decoration.
- **"Fits or we remake it free"** and **"measurements published free"** are commitments; keep
  them visible wherever a part can be ordered.
