/**
 * catalog.ts — the site's ONLY data source.
 *
 * Pages are generated from the committed snapshot at src/data/parts.json, so the site
 * builds anywhere with plain `npm install && npm run build` — no access to the (private)
 * workshop repo required. The snapshot is regenerated on the workshop machine with
 * `node scripts/sync-catalog.mjs`.
 *
 * State ladder: requested → development → measured → fitted (on a real car).
 * An unresolved exterior/safety gate is orthogonal: `safetyGated` closes the
 * public record to R&D evidence rather than promoting a state into an offer.
 */
import raw from "../data/parts.json";
import { longTermTesting } from "../data/long-term-testing.mjs";

export type PartState = "requested" | "development" | "measured" | "fitted";
export type OemIdentityStatus = "confirmed" | "candidate" | "disputed" | "unknown";
export type FitmentStatus = "confirmed" | "candidate" | "disputed" | "unknown";

export interface Dim { name: string; mm: number | null; confidence: string }
export interface FitReport { vehicle: string; material: string; result: string }
export interface Part {
  slug: string;
  catalogId: string;
  oemIdentityStatus: OemIdentityStatus;
  oemNumber: string | null;
  title: string;
  description: string;
  fitmentStatus: FitmentStatus;
  vehicleLabel: string | null;
  yearRange: string;
  category: string;
  state: PartState;
  stateLabel: string;
  /** True only when the non-safety-critical scope gate remains unresolved. */
  safetyGated: boolean;
  colors: string[];
  supersededTo: string | null;
  dims: Dim[];
  dimsConfirmed: number;
  dimsTotal: number;
  fitReports: FitReport[];
}

export function allParts(): Part[] {
  return raw as Part[];
}

export function fitmentLabel(part: Part): string {
  if (part.fitmentStatus === "confirmed" && part.vehicleLabel) {
    return `${part.yearRange} ${part.vehicleLabel}`.trim();
  }
  if (part.fitmentStatus === "disputed") return "Vehicle/trim fitment under investigation";
  if (part.fitmentStatus === "candidate") return "Vehicle/trim fitment being verified";
  return "Vehicle/trim fitment pending";
}

export function oemIdentityLabel(part: Part): string {
  if (part.oemIdentityStatus === "confirmed" && part.oemNumber) {
    return `OEM № ${part.oemNumber}`;
  }
  if (part.oemIdentityStatus === "disputed") return "OEM identity under investigation";
  if (part.oemIdentityStatus === "candidate") return "OEM identity being verified";
  return "OEM № pending";
}

/** The evidence ladder, in order. Labels are literal claims; see EvidenceLadder.astro. */
export const ladderRungs: { state: PartState; label: string }[] = [
  { state: "requested", label: "Requested" },
  { state: "development", label: "In development" },
  { state: "measured", label: "Measured" },
  { state: "fitted", label: "Fitted on a real car" },
];

export function rungIndex(state: PartState): number {
  const i = ladderRungs.findIndex((rung) => rung.state === state);
  if (i < 0) throw new Error(`unknown part state: ${state}`);
  return i;
}

/** The vehicle application a card or list may show. A gate or a disputed identity wins. */
export function applicationLabel(part: Part): string {
  if (part.safetyGated) return "Safety review open — no vehicle claim";
  if (part.fitmentStatus === "confirmed" && part.vehicleLabel && part.oemIdentityStatus !== "disputed") {
    return `${part.yearRange} ${part.vehicleLabel}`.trim();
  }
  if (part.oemIdentityStatus === "disputed") return "Application under investigation";
  return "Application being verified";
}

/**
 * Which records appear on the public site. A requested record with no work started is a
 * private demand note, not a listing: no wanted lists or donor asks (founder, 2026-09-29).
 * A safety-gated record is listed so its testing stays visible.
 */
export function isListed(part: Part): boolean {
  return part.safetyGated || part.state !== "requested";
}

export function listedParts(): Part[] {
  return allParts().filter(isListed);
}

/** Public label for a closed (safety-gated) record. The gate itself never opens here. */
export function closedLabel(part: Part): string {
  const testing = closedTesting(part);
  return testing?.passed ? "Passed testing" : testing ? "In long-term testing" : "Research only";
}

export function closedTesting(part: Part): { since: string; proving: string; passed?: string; brief?: string } | null {
  return longTermTesting[part.slug as keyof typeof longTermTesting] ?? null;
}

/** A closed record's one literal line on availability. */
export function closedSale(part: Part): string {
  return closedTesting(part)?.passed ? "For sale soon." : "Not for sale until testing is complete.";
}
