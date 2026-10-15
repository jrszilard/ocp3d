// Safety-related parts that are on a car in long-term testing (founder direction, 2026-09-29),
// and when one has passed (founder, 2026-10-15: "they are approved and I am gonna sell them soon").
//
// Public wording only. The record stays closed: no offer, and no fit, installation or road-use
// claim for anyone else's car. The catalog's safetyGated flag is unchanged; this only replaces
// "Research only" with an accurate label. A passed part reads "Passed testing · for sale soon"
// until it is listed in the catalog; `brief` stands in for the catalog's research description,
// which still describes the testing as pending.
export const longTermTesting = {
  "wiper-arm-adaptor": {
    since: "Sept 20, 2026",
    proving: "vibration, UV, rain and time",
    passed: "Oct 15, 2026",
    brief:
      "Printed adaptors so modern wiper blades run on the A60's original arms without drilling them. " +
      "They were on my '83 Supra from Sept 20 and passed long-term testing on Oct 15, 2026. " +
      "They'll be for sale soon. No fit claim is made for any other car yet.",
  },
};
