/**
 * Editorial material-family guidance, NOT catalog facts or a material selector.
 * Sources support general properties, never an OCP3D part's qualification.
 * Reviewed 2026-09-08. Deliberately no universal service-temperature ratings.
 */
export const materialSources = [
  { id: "pla", publisher: "Prusa Research", title: "PLA: properties and limitations", href: "https://help.prusa3d.com/article/pla_2062" },
  { id: "petg", publisher: "Prusa Research", title: "PETG: toughness and practical uses", href: "https://help.prusa3d.com/article/petg_2059" },
  { id: "asa", publisher: "Prusa Research", title: "ASA: UV and temperature resistance", href: "https://help.prusa3d.com/article/asa_1809" },
  { id: "nylon", publisher: "Prusa Research", title: "Polyamide / nylon: wear and moisture", href: "https://help.prusa3d.com/article/polyamide-nylon_167188" },
  { id: "porsche", publisher: "Porsche Newsroom · 2018", title: "Porsche Classic supplies classic parts from a 3D printer", href: "https://newsroom.porsche.com/en/company/porsche-classic-3d-printer-spare-parts-sls-printer-production-cars-innovative-14816.html" },
];

export const materials = [
  {
    id: "pla", name: "PLA", label: "The proof model",
    benefit: "Quick and cheap for checking a shape.",
    limitation: "Softens in heat. A good bench print says nothing about a parked car.",
    question: "Was the final design checked in its real material?",
    source: "pla",
  },
  {
    id: "petg", name: "PETG", label: "Tough, with limits",
    benefit: "Tough and practical for working prototypes and cooler jobs.",
    limitation: "Shaded interiors still get hot, and a steady load can slowly bend it.",
    question: "How hot does this spot get, and what load does it carry?",
    source: "petg",
  },
  {
    id: "asa", name: "ASA", label: "Sun & heat resistance",
    benefit: "Handles sun and heat much better than PLA.",
    limitation: "The name isn’t an approval. Grade, print quality and load still need checking.",
    question: "Has the finished part been tested under heat and load?",
    source: "asa",
  },
  {
    id: "nylon", name: "Nylon / PA", label: "Wear & repeated use",
    benefit: "Tough and wear-resistant for hard-working parts.",
    limitation: "Absorbs moisture, which changes its size and strength. Grades aren’t interchangeable.",
    question: "Is this exact grade right for the moisture and load?",
    source: "nylon",
  },
];

export const materialQuestions = [
  {
    id: "metal",
    question: "Don’t car parts need to be metal?",
    answer: "Some do. But cars are full of plastic clips, trim and knobs, and the job decides the material. OCP3D only makes non-safety-critical parts: never brakes, steering, restraints or structure.",
  },
  {
    id: "heat",
    question: "Won’t it soften in a hot car?",
    answer: "The wrong plastic can. Ordinary PLA softens in a hot car; ASA holds up much better. The exact grade, heat, time and load still matter, so each part gets checked.",
    source: "asa",
  },
  {
    id: "layers",
    question: "What about the layers splitting?",
    answer: "It’s a real issue. Printed parts are weaker across their layers, so print direction and wall design have to suit the load. A good-looking print doesn’t prove strength.",
  },
  {
    id: "lifetime",
    question: "How do I know how long a part will last?",
    answer: "Only from evidence on that version, in that material, in those conditions. OCP3D’s records are early; none yet proves long-term durability, so there’s no lifespan claim.",
  },
];
