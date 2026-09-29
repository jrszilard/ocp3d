// Images for part cards and part records. Real photos lead; a render must say it is a render.
// Photos follow the car-photo rules in car.mjs (no plates or stickers, EXIF stripped).
// A part in long-term testing may show real photos too; its caption must say it is in testing
// and not for sale (founder, 2026-09-29).
export const partArt = {
  "sun-visor-clip": {
    src: "/images/parts/sun-visor-clip-photo.jpg",
    width: 1200,
    height: 900,
    kind: "photo",
    alt: "The final tan v12 sun visor clip installed on the headliner of the founder's Supra.",
    caption: ["PHOTO · V12 · TAN ASA", "INSTALLED SEPT 8, 2026"],
  },
  "wiper-arm-adaptor": {
    src: "/images/journal/wiper-adaptors/on-car-adaptor-closeup.jpg",
    width: 1600,
    height: 900,
    kind: "photo",
    alt: "A printed adaptor on the original wiper arm, holding a Rain-X blade connector, in long-term testing.",
    caption: ["IN LONG-TERM TESTING · NOT FOR SALE", "ON THE CAR SINCE SEPT 20, 2026"],
  },
};
