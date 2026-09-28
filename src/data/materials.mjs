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
    benefit: "Useful for checking a shape before committing to a final material.",
    limitation: "Ordinary PLA has limited heat resistance. A successful bench print is not evidence that it will survive a parked car.",
    question: "Has the final design been checked again in its intended material?",
    source: "pla",
  },
  {
    id: "petg", name: "PETG", label: "Tough, with limits",
    benefit: "A tough, practical material for functional prototypes and selected lower-temperature jobs.",
    limitation: "Not a blanket choice for interiors: a shaded part can still get hot, and a steady load can gradually change its shape.",
    question: "What heat and sustained load will this particular part see?",
    source: "petg",
  },
  {
    id: "asa", name: "ASA", label: "Sun & heat resistance",
    benefit: "UV resistance and better heat resistance than ordinary PLA make ASA a useful candidate for exposed applications.",
    limitation: "The family name is not a car-use approval. The exact grade, print quality, load and exposure still need checking together.",
    question: "Has the finished part been evaluated under heat and load?",
    source: "asa",
  },
  {
    id: "nylon", name: "Nylon / PA", label: "Wear & repeated use",
    benefit: "Engineering nylons can offer toughness and wear resistance for demanding functional parts.",
    limitation: "Grades vary, and absorbed moisture changes dimensions and mechanical behaviour. Filled grades are not interchangeable with unfilled nylon.",
    question: "Is the exact grade suitable in its expected moisture and load conditions?",
    source: "nylon",
  },
];

export const materialQuestions = [
  {
    id: "metal",
    question: "Don’t car parts need to be metal?",
    answer: "Some absolutely do. But cars also use plastic clips, trim, knobs and housings. The job decides the material. OCP3D focuses on pre-2000, unbranded, non-safety-critical parts—not replacing brakes, steering, restraints or structural components with plastic. A printed replacement still needs its own evidence; the existence of a moulded original is not enough.",
  },
  {
    id: "heat",
    question: "Won’t it soften in a hot car?",
    answer: "The wrong plastic can. Ordinary PLA—the material behind many desktop prints—has limited heat resistance. Materials such as ASA offer a different starting point, but the exact grade, temperature, time and load all matter. Even a shaded interior needs assessment. OCP3D does not treat a filament name or a single datasheet temperature as a safe operating limit for every part.",
    source: "asa",
  },
  {
    id: "layers",
    question: "What about the layers splitting?",
    answer: "That is a real design consideration, not something to gloss over. A filament-printed part can resist a force differently across its layers than along them. Print direction, wall design and layer bonding have to suit the job. More infill alone is not a fix, and a good-looking print does not prove strength.",
  },
  {
    id: "lifetime",
    question: "How do I know how long a part will last?",
    answer: "Look for evidence tied to the actual version, material and conditions—not a general promise about 3D printing. Fit, heat exposure and repeated use are different checks. OCP3D’s public files are early-stage research; a measured design or a fit report is not a long-term durability result. Where that evidence is missing, a lifespan claim has not been earned.",
  },
];
