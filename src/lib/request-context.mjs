// Client presentation only. This never qualifies a part or authorizes paid work.
const situations = new Set(["have-part", "on-car", "gone", "improvement"]);

/**
 * @param {URLSearchParams} params
 * @param {Array<{slug: string, title: string, safetyGated: boolean}>} parts Public catalog snapshot
 */
export function requestContext(params, parts) {
  const candidate = params.get("part_slug") || "";
  const partSlug = /^[a-z0-9-]+$/.test(candidate) ? candidate : "";
  const record = parts.find((part) => part.slug === partSlug);
  const researchOnly = record?.safetyGated === true;
  const situation = params.get("situation") || "";
  return {
    partSlug,
    // A query cannot rename a known research record into a different commercial project.
    partTitle: record?.title || params.get("part") || "",
    researchOnly,
    situation: !researchOnly && situations.has(situation) ? situation : "",
  };
}
