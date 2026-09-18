// Bench journal: build logs for specific field files.
//
// Each entry links to exactly one registry record (partSlug). A journal entry reports what
// happened at the bench and on the car; the field file's evidence state stays the source of
// truth for fit, identity, and what the page may offer. An entry for a safety-gated record is a
// research log only: no product, installation, road-use, or availability language.

export const journal = [
  {
    slug: "sun-visor-clip",
    partSlug: "sun-visor-clip",
    number: "001",
    title: "Rebuilding the sun visor clip",
    eyebrow: "CASE FILE 001 · 1983 CELICA SUPRA (A60)",
    summary:
      "One of the clips that holds the sun visor up had broken. Twelve versions later, v12 is in " +
      "the car in ASA. Two deliberate changes from the original, and a part-number question still open.",
    updated: "2026-09-17",
    researchOnly: false,
  },
  {
    slug: "wiper-adaptors",
    partSlug: "wiper-arm-adaptor",
    number: "002",
    title: "Modern wiper blades on the original arms",
    eyebrow: "RESEARCH LOG 002 · WORK IN PROGRESS",
    summary:
      "Printed adaptors so modern blades can run on the A60's original arms without drilling them. " +
      "Research in progress: nothing here is for sale, installed, or road-tested.",
    updated: "2026-09-17",
    researchOnly: true,
  },
];

export function journalForPart(partSlug) {
  return journal.find((entry) => entry.partSlug === partSlug) ?? null;
}
