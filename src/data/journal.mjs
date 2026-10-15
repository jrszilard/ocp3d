// Build logs for specific parts.
//
// Each entry links to exactly one part record (partSlug). A build log reports what
// happened at the bench and on the car; the part record's evidence state stays the source of
// truth for fit, identity, and what the page may offer. An entry for a safety-gated record is a
// research log only: no product, installation, road-use, or availability language.
//
// `cover` is the card image on the home page. A closed (safety-gated) log may show the part on the
// car only while it is in long-term testing, and its card always says so (founder, 2026-09-29), or
// once it has passed and is for sale soon (founder, 2026-10-15).

export const journal = [
  {
    slug: "sun-visor-clip",
    partSlug: "sun-visor-clip",
    number: "001",
    title: "Rebuilding the sun visor clip",
    eyebrow: "BUILD LOG 001 · 1983 CELICA SUPRA (A60)",
    summary: "A broken visor clip, twelve versions, and a v12 in ASA that’s back in the car.",
    updated: "2026-09-17",
    researchOnly: false,
    cover: {
      src: "/images/journal/sun-visor-clip/v12-final-installed.jpg",
      alt: "The final tan v12 visor clip installed on the headliner.",
      width: 1600,
      height: 1200,
    },
  },
  {
    slug: "wiper-adaptors",
    partSlug: "wiper-arm-adaptor",
    number: "002",
    title: "Modern wiper blades on the original arms",
    eyebrow: "BUILD LOG 002 · PASSED TESTING",
    summary: "Printed adaptors so modern blades fit the original arms. Passed long-term testing on the car; for sale soon.",
    updated: "2026-10-15",
    researchOnly: true,
    cover: {
      src: "/images/journal/wiper-adaptors/on-car-adaptor-closeup.jpg",
      alt: "A printed adaptor on the original wiper arm, holding a Rain-X blade connector, after passing long-term testing.",
      width: 1600,
      height: 900,
    },
  },
];

export function journalForPart(partSlug) {
  return journal.find((entry) => entry.partSlug === partSlug) ?? null;
}
