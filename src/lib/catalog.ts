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
 * Requested parts with no original on the bench yet. They are shown as a wanted
 * list (an honest ask for an original), not as empty product cards. A safety-gated
 * record is never on the wanted list: it only accepts research evidence.
 */
export function isWanted(part: Part): boolean {
  return part.state === "requested" && !part.safetyGated;
}
