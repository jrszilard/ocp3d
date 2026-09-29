// Build logs for specific parts.
//
// Each entry links to exactly one part record (partSlug). A build log reports what
// happened at the bench and on the car; the part record's evidence state stays the source of
// truth for fit, identity, and what the page may offer. An entry for a safety-gated record is a
// research log only: no product, installation, road-use, or availability language.
//
// `cover` is the card image on the home page. A research log's cover shows the problem (the stock
// part), never research geometry that could read as a product.

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
      src: "/images/journal/sun-visor-clip/v8-vs-v12.jpg",
      alt: "The orange v8 visor clip beside the smoother tan v12, both mounted on the headliner.",
      width: 1600,
      height: 1055,
    },
  },
  {
    slug: "wiper-adaptors",
    partSlug: "wiper-arm-adaptor",
    number: "002",
    title: "Modern wiper blades on the original arms",
    eyebrow: "BUILD LOG 002 · RESEARCH ONLY · WORK IN PROGRESS",
    summary: "Adaptors so modern blades fit the original arms. Research only: not for sale, installed or road-tested.",
    updated: "2026-09-17",
    researchOnly: true,
    cover: {
      src: "/images/journal/wiper-adaptors/stock-driver-carrier.jpg",
      alt: "The stock driver-side wiper carrier on the end of the arm, next to a checkerboard scale bar.",
      width: 1600,
      height: 1205,
    },
  },
];

export function journalForPart(partSlug) {
  return journal.find((entry) => entry.partSlug === partSlug) ?? null;
}
