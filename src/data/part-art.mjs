// Photos for part cards and part records, shown as a carousel (PhotoCarousel.astro).
// Real photos lead; a render must be marked kind: "render" so it is labelled as one.
// Photos follow the car-photo rules in car.mjs (no plates or stickers, EXIF stripped).
// A part in long-term testing may show real photos too; its `note` must say it is in
// testing and not for sale, and stays visible on every slide (founder, 2026-09-29). Once it
// has passed, the note says so and "for sale soon" until it is listed (founder, 2026-10-15).
// `fit: "contain"` shows a portrait photo whole on the part record instead of cropping it.

export const partArt = {
  "sun-visor-clip": {
    note: null,
    photos: [
      { src: "/images/parts/sun-visor-clip-photo.jpg", width: 1200, height: 900,
        alt: "The final tan v12 sun visor clip installed on the headliner of the founder's Supra.",
        caption: "V12 · tan ASA · installed Sept 8" },
      { src: "/images/journal/sun-visor-clip/v12-installed.jpg", width: 1205, height: 1600, fit: "contain",
        alt: "The tan v12 clip on the headliner above the windshield, seen from further back.",
        caption: "V12 · in the car" },
      { src: "/images/journal/sun-visor-clip/v12-on-the-bed.jpg", width: 1205, height: 1600, fit: "contain",
        alt: "The tan v12 clip on the print bed inside the enclosed printer.",
        caption: "V12 · on the print bed · Sept 8" },
      { src: "/images/journal/sun-visor-clip/v8-vs-v12.jpg", width: 1600, height: 1055,
        alt: "A boxy orange v8 clip beside the smoother tan v12, both on the same headliner.",
        caption: "V8 orange vs V12 tan" },
      { src: "/images/hero/measured.jpg", width: 1280, height: 960,
        alt: "The original clip beside a ruler on the measuring bench.",
        caption: "The original · measured" },
    ],
  },
  "wiper-arm-adaptor": {
    note: "PASSED TESTING · FOR SALE SOON",
    photos: [
      { src: "/images/journal/wiper-adaptors/on-car-adaptor-closeup.jpg", width: 1600, height: 900,
        alt: "A printed adaptor on the original wiper arm, holding a Rain-X blade connector.",
        caption: "Adaptor + Rain-X connector · Sept 20" },
      { src: "/images/journal/wiper-adaptors/on-car-adaptor-on-arm.jpg", width: 900, height: 1600, fit: "contain",
        alt: "A printed adaptor mounted on the end of the original wiper arm, with the blade attached.",
        caption: "On the original arm · Sept 20" },
      { src: "/images/journal/wiper-adaptors/on-car-blade-along-cowl.jpg", width: 900, height: 1600, fit: "contain",
        alt: "A modern blade resting along the windshield on its printed adaptor, next to the red hood.",
        caption: "Blade at rest · Sept 20" },
      { src: "/images/journal/wiper-adaptors/stock-driver-carrier.jpg", width: 1600, height: 1205,
        alt: "The original driver-side wiper carrier on the end of the arm, next to a scale bar.",
        caption: "The original carrier" },
    ],
  },
};
