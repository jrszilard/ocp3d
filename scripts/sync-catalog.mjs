#!/usr/bin/env node
/**
 * sync-catalog.mjs — regenerate src/data/parts.json from the catalog authority.
 *
 * The public site builds from a committed snapshot, so collaborators never need
 * access to the workshop database. On the workshop machine this script reads
 * the authoritative Postgres catalog through Supabase's service-role REST API.
 *
 * The snapshot is a *research archive*, not a product/release feed:
 * - archived and legally blocked records never enter it;
 * - records must have moved beyond `draft`;
 * - a non-safety-critical gate other than `true` is carried forward as
 *   `safetyGated`, so the UI must present it as R&D rather than an offer.
 *
 * It deliberately does not read the historical venture catalog YAML. See
 * ../3d-car-parts-maker/docs/data-authority.md.
 *
 *   node scripts/sync-catalog.mjs
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const STATE_LABELS = {
  requested: "Requested",
  development: "In development",
  measured: "Measured",
  fitted: "Fitted on a real car",
};
const RECORDS_ON_FILE = new Set(["researched", "reference-secured", "realized", "verified"]);
const IDENTITY_STATUSES = new Set(["confirmed", "candidate", "disputed", "unknown"]);
const FITMENT_STATUSES = new Set(["confirmed", "candidate", "disputed", "unknown"]);

function loadLocalEnv(path) {
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

loadLocalEnv(join(root, ".env.local"));
const sbUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!sbUrl || !sbKey) {
  console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required (set env or .env.local).");
  process.exit(1);
}

async function select(table, query) {
  const res = await fetch(`${sbUrl}/rest/v1/${table}?${query}`, {
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` },
  });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

function by(rows, key) {
  const map = new Map();
  for (const row of rows) {
    const group = map.get(row[key]) ?? [];
    group.push(row);
    map.set(row[key], group);
  }
  return map;
}

function oneBy(rows, key) {
  return new Map(rows.map((row) => [row[key], row]));
}

function stableUnique(values) {
  return [...new Set(values.filter(Boolean))];
}

function stateFor(realization, fitReports) {
  if (!realization) return "requested";
  if (fitReports.some((report) => report.result === "pass")) return "fitted";
  if (realization.status === "dim-verified") return "measured";
  return "development";
}

const [rawParts, partNumbers, supersessions, colors, partFits, generations, models, makes, trims, realizations, dimensions, fitConfirmations, materials] = await Promise.all([
  select("parts", "select=id,catalog_id,slug,title,description,category,oem_identity_status,scope_non_safety_critical,scope_gate_status,record_status,archived_at&archived_at=is.null&order=catalog_id"),
  select("part_numbers", "select=part_id,number,role,color_id"),
  select("part_number_supersessions", "select=part_id,position,part_number&order=part_id,position"),
  select("colors", "select=id,name"),
  select("part_fits", "select=part_id,generation_id,trim_id,year_start,year_end,position,status,year_source"),
  select("generations", "select=id,model_id,name"),
  select("models", "select=id,make_id,name"),
  select("makes", "select=id,name"),
  select("trims", "select=id,name"),
  select("realizations", "select=id,part_id,version,status,release_status,archived_at&archived_at=is.null&order=part_id,version.desc"),
  select("realization_dimensions", "select=realization_id,name,nominal,confidence"),
  select("fit_confirmations", "select=realization_id,generation_id,trim_id,model_year,material_code,result"),
  select("materials", "select=code,name"),
]);

const numbersByPart = by(partNumbers, "part_id");
const supersessionsByPart = by(supersessions, "part_id");
const fitsByPart = by(partFits, "part_id");
const realizationsByPart = by(realizations, "part_id");
const dimensionsByRealization = by(dimensions, "realization_id");
const confirmationsByRealization = by(fitConfirmations, "realization_id");
const colorById = oneBy(colors, "id");
const generationById = oneBy(generations, "id");
const modelById = oneBy(models, "id");
const makeById = oneBy(makes, "id");
const trimById = oneBy(trims, "id");
const materialByCode = oneBy(materials, "code");

function vehicleFor(generationId) {
  const generation = generationById.get(generationId);
  const model = generation && modelById.get(generation.model_id);
  const make = model && makeById.get(model.make_id);
  return [make?.name, model?.name].filter(Boolean).join(" ") || null;
}

const parts = rawParts
  .filter((part) => part.scope_gate_status !== "blocked" && RECORDS_ON_FILE.has(part.record_status))
  .map((part) => {
    const oemIdentityStatus = IDENTITY_STATUSES.has(part.oem_identity_status) ? part.oem_identity_status : "unknown";
    const identityConfirmed = oemIdentityStatus === "confirmed";
    const numbers = (numbersByPart.get(part.id) ?? [])
      .toSorted((a, b) => Number(b.role === "original") - Number(a.role === "original") || a.number.localeCompare(b.number));
    const primaryNumber = numbers.find((number) => number.role === "original" && number.number)?.number
      ?? numbers.find((number) => number.number)?.number
      ?? null;
    const chain = supersessionsByPart.get(part.id) ?? [];
    const latestChain = chain.length > 1 ? chain[chain.length - 1]?.part_number ?? null : null;

    const fitStatusOrder = ["confirmed", "candidate", "disputed", "unknown"];
    const fits = (fitsByPart.get(part.id) ?? [])
      .toSorted((a, b) => fitStatusOrder.indexOf(a.status) - fitStatusOrder.indexOf(b.status)
        || a.year_start - b.year_start
        || a.year_end - b.year_end
        || String(a.position ?? "").localeCompare(String(b.position ?? "")));
    const selectedFit = fits[0] ?? null;
    const fitmentStatus = FITMENT_STATUSES.has(selectedFit?.status) ? selectedFit.status : "unknown";
    const fitmentConfirmed = fitmentStatus === "confirmed";
    const hasPartSpecificYears = fitmentConfirmed && selectedFit?.year_source === "part_specific";
    const yearRange = hasPartSpecificYears ? `’${String(selectedFit.year_start).slice(2)}–’${String(selectedFit.year_end).slice(2)}` : "";

    const realization = (realizationsByPart.get(part.id) ?? [])[0] ?? null;
    const rawReports = realization ? confirmationsByRealization.get(realization.id) ?? [] : [];
    const fitReports = rawReports.map((report) => ({
      vehicle: [report.model_year, generationById.get(report.generation_id)?.name, trimById.get(report.trim_id)?.name]
        .filter(Boolean).join(" "),
      material: materialByCode.get(report.material_code)?.name ?? report.material_code ?? "?",
      result: report.result,
    })).toSorted((a, b) => a.vehicle.localeCompare(b.vehicle) || a.material.localeCompare(b.material) || a.result.localeCompare(b.result));
    const dims = (realization ? dimensionsByRealization.get(realization.id) ?? [] : [])
      .map((dimension) => ({
        name: dimension.name,
        mm: Number.isFinite(Number(dimension.nominal)) ? Number(dimension.nominal) : null,
        confidence: dimension.confidence ?? "estimated",
      }))
      .toSorted((a, b) => Number(b.confidence === "confirmed") - Number(a.confidence === "confirmed") || a.name.localeCompare(b.name));
    const state = stateFor(realization, fitReports);

    return {
      slug: part.slug,
      catalogId: part.catalog_id,
      oemIdentityStatus,
      oemNumber: identityConfirmed ? primaryNumber : null,
      title: part.title,
      description: (part.description ?? "").trim(),
      fitmentStatus,
      vehicleLabel: fitmentConfirmed ? vehicleFor(selectedFit?.generation_id) : null,
      yearRange,
      category: part.category ?? "",
      state,
      stateLabel: STATE_LABELS[state],
      // An exterior/cyclic record is allowed in this research archive only as a visibly
      // closed R&D case. This does not change the catalog gate or create an offer.
      safetyGated: String(part.scope_non_safety_critical) !== "true",
      colors: identityConfirmed
        ? stableUnique(numbers.map((number) => colorById.get(number.color_id)?.name))
        : [],
      supersededTo: identityConfirmed ? latestChain : null,
      dims,
      dimsConfirmed: dims.filter((dimension) => dimension.confidence === "confirmed").length,
      dimsTotal: dims.length,
      fitReports,
    };
  });

const order = ["fitted", "measured", "development", "requested"];
parts.sort((a, b) => {
  const aSafety = Number(Boolean(a.safetyGated));
  const bSafety = Number(Boolean(b.safetyGated));
  if (aSafety !== bSafety) return bSafety - aSafety;
  return order.indexOf(a.state) - order.indexOf(b.state) || a.title.localeCompare(b.title);
});

const out = join(root, "src", "data", "parts.json");
writeFileSync(out, JSON.stringify(parts, null, 2) + "\n");
console.log(`wrote ${out}: ${parts.length} research records (${parts.map((part) => part.slug).join(", ")})`);
