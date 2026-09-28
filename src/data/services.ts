export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  locationAvailability: string[];
  features: string[];
  whatWeDesign: string[];
  whatYouGet: string[];
  ctaLabel: string;
  relatedProjectSlugs: string[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "complete-home-interiors",
    number: "01",
    slug: "complete-home-interiors",
    name: "Complete Home Interiors",
    shortDescription: "A coordinated interior for your entire home, designed around how you live.",
    description:
      "End-to-end interior design and execution for flats, villas, and penthouses across Hyderabad, Warangal, and Karimnagar. Benson Cheripelli and our senior engineering team manage every phase — civil alterations, bespoke woodwork, ceiling architecture, lighting, and finishes — into one cohesive, harmonious residence.",
    image: "/Images/services/complete-home-interiors.webp",
    gallery: [
      "/Images/services/complete-home-interiors.webp",
      "/Images/main-hero.webp",
      "/Images/services/living-room-interiors.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Architectural 2D space planning & photorealistic 3D visualization",
      "Factory-finished BWP marine-grade modular woodwork",
      "Unified palette of natural veneers, fluted louvers & Italian marble",
      "Turnkey site ownership with dedicated supervisor on site",
      "100% itemized pricing with zero surprise cost escalations",
    ],
    whatWeDesign: [
      "Master, guest, and children bedroom suites",
      "Open-concept living and formal dining lounges",
      "Custom ergonomic modular kitchens & utility rooms",
      "Integrated pooja mandapams with acoustic wall panelling",
      "False ceiling design with layered architectural cove illumination",
      "Foyer shoe consoles, decorative partitions, and balcony spaces",
    ],
    whatYouGet: [
      "Comprehensive 3D concept walk-throughs & material samples",
      "Detailed bill of quantities (BOQ) with fixed-price guarantee",
      "Boiling water resistant (BWP) plywood carcass with 10-year warranty",
      "European soft-close hardware (Blum / Hettich)",
      "Dedicated site supervisor with weekly photo & milestone tracking",
      "Professional snagging audit and clean turnkey handover",
    ],
    ctaLabel: "Book This Service",
    relatedProjectSlugs: ["nikhils-home", "raju-sir-home", "jubli-heaven-residencey"],
    faqs: [
      {
        question: "How long does a complete home interior project take?",
        answer: "A standard 2BHK or 3BHK flat typically takes 45 to 60 business days from 3D drawing sign-off to turnkey handover. Larger villas and penthouses typically range between 75 and 90 days depending on the civil alterations and scope.",
      },
      {
        question: "Can we make design changes after work begins?",
        answer: "Every detail is visualized and approved in 3D prior to site execution. If minor changes are desired during the build, we provide transparent variance estimates before touching any materials so you always retain complete financial control.",
      },
      {
        question: "What locations do you cover for full turnkey projects?",
        answer: "Our operations and execution teams actively manage active sites across Hyderabad, Warangal, and Karimnagar with local supervisors stationed directly on site.",
      },
      {
        question: "What core materials and wood grades do you use?",
        answer: "We exclusively utilize IS:710 Boiling Water Proof (BWP) marine-grade plywood for kitchens and bathrooms, and IS:303 BWR/MR calibrated plywood for dry areas, backed by a 10-year warranty against warping and delamination.",
      },
      {
        question: "Are civil, electrical, and plumbing works included?",
        answer: "Yes. Our turnkey service encompasses complete internal electrical rewiring, plumbing realignment, flooring, tile cladding, wall panelling, and false ceilings under a single unified management contract.",
      },
      {
        question: "How do you guarantee that there are no hidden costs?",
        answer: "Prior to contract signing, we furnish a comprehensive, itemized Bill of Quantities (BOQ) detailing square footages, brand models, and hardware specifications. Our fixed-price policy ensures zero surprise cost escalations.",
      },
      {
        question: "How do you supervise and manage the site daily?",
        answer: "A dedicated senior site engineer is assigned to your residence. They manage all artisan schedules, verify material deliveries, conduct daily snag checks, and send structured weekly photo and video progress reports.",
      },
      {
        question: "Can we select our own laminates, veneers, and hardware?",
        answer: "Absolutely. We guide you through physical material sample boxes and showroom walkthroughs to curate and hand-pick laminates, natural veneers, quartz tops, and hardware finishes.",
      },
      {
        question: "What is your payment structure for full home interiors?",
        answer: "Payments are linked strictly to verified construction milestones: booking token, 3D design approval, factory production dispatch, site woodwork assembly, and final handover snag clearance.",
      },
      {
        question: "What happens after handover if any adjustment is needed?",
        answer: "Every complete interior includes a 10-year warranty along with complimentary 6-month and 12-month post-handover maintenance visits covering hinge alignments, drawer runners, and touch-ups.",
      },
    ],
  },
  {
    id: "modular-kitchens",
    number: "02",
    slug: "modular-kitchens",
    name: "Modular Kitchens",
    shortDescription: "Storage, workflow, and finishes planned around how you cook, use, and move through the kitchen.",
    description:
      "Kitchens designed around Indian cooking habits, heavy utility requirements, and ergonomic prep-cook-wash triangles. Built using 100% boiling water proof (BWP) marine plywood, European soft-close hardware, heat-resistant quartz countertops, and oil-repellent acrylic and PU shutter finishes.",
    image: "/Images/services/modular-kitchens.webp",
    gallery: [
      "/Images/services/modular-kitchens.webp",
      "/Images/main-hero.webp",
      "/Images/services/complete-home-interiors.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Ergonomic work triangle planning (prep, cook, wash)",
      "710-grade BWP marine plywood carcass with calibrated core",
      "High-load soft-close tandem drawer systems and corner carousels",
      "Concealed chimney ducting, waste sorters & integrated appliance units",
      "Quartz, sintered stone & nano-crystal countertop integration",
    ],
    whatWeDesign: [
      "Straight, L-shaped, parallel, and island kitchen layouts",
      "Full-height pantry pull-outs and rolling shutter appliance garages",
      "Under-sink waterproof PVC drip trays & bottle pull-outs",
      "Under-cabinet LED task lighting with warm CRI 95+ light strips",
      "Matching utility area cabinetry and laundry storage",
      "Concealed chimney ducting and integrated spice drawer inserts",
    ],
    whatYouGet: [
      "Laser-measured site drawings and ergonomic height calibration",
      "Scratch-resistant anti-fingerprint acrylic or matte PU finishes",
      "Blum or Hettich lifetime-rated soft-close hinges and drawer runners",
      "Dedicated electrical routing for microwaves, ovens, and dishwashers",
      "Full installation by factory-trained modular carpenters",
      "10-year warranty against delamination, moisture warp, and termites",
    ],
    ctaLabel: "Book Modular Kitchen",
    relatedProjectSlugs: ["nikhils-home", "jubli-heaven-residencey"],
    faqs: [
      {
        question: "What core wood do you use for wet and sink areas?",
        answer: "We exclusively use IS:710 certified Boiling Water Proof (BWP) marine plywood with calibrated multi-layer hardwood core, ensuring zero swelling even under prolonged water exposure.",
      },
      {
        question: "Do you supply and install kitchen appliances?",
        answer: "We provide exact dimension cutouts, electrical points, and plumbing lines for your chosen chimneys, cooktops, ovens, and dishwashers, and coordinate seamless installation.",
      },
      {
        question: "Which shutter finishes are best for heavy Indian cooking?",
        answer: "Anti-scratch acrylic and PU lacquer finishes are ideal because they are non-porous, highly resistant to oil splatter, and can be effortlessly wiped clean with mild soapy water.",
      },
      {
        question: "How long does a modular kitchen installation take?",
        answer: "Factory fabrication takes 21 to 25 business days. Once modules arrive on site, assembly, countertop placement, and hardware calibration are completed within 4 to 6 days.",
      },
      {
        question: "What brand of hardware and drawer channels do you install?",
        answer: "We exclusively install genuine German hardware from Blum and Hettich, featuring silent soft-close mechanisms tested for over 200,000 open-close cycles.",
      },
      {
        question: "Can you customize the counter height for our family members?",
        answer: "Yes, counter heights are ergonomically customized (typically between 33 and 36 inches) based on your height to eliminate back fatigue during food prep.",
      },
      {
        question: "How do you handle corner cabinet storage?",
        answer: "We install heavy-load swing carousels, magic corners, and LeMans pull-out trays that bring rear kitchenware effortlessly to the front without straining.",
      },
      {
        question: "Is under-sink waterproof protection included?",
        answer: "Yes, all our sink base cabinets are lined with waterproof PVC drip trays or marine aluminum foil barriers to safeguard woodwork against accidental plumbing leaks.",
      },
      {
        question: "Do you provide modular utility and washing machine storage?",
        answer: "Yes, we integrate matching utility zone cabinets, broom cupboards, washing machine enclosures, and sink counters in parallel with the kitchen.",
      },
      {
        question: "What warranty comes with the modular kitchen?",
        answer: "We provide a comprehensive 10-year structural warranty on BWP plywood carcasses and lifetime manufacturer warranties on Blum/Hettich hinges and runner systems.",
      },
    ],
  },
  {
    id: "living-room-interiors",
    number: "03",
    slug: "living-room-interiors",
    name: "Living Room Interiors",
    shortDescription: "A space designed for everyday living, welcoming guests, and memorable family time.",
    description:
      "The living room is where your family gathers and guests are received. We craft comfortable, airy living and dining spaces with bespoke TV feature walls, fluted timber louvers, acoustic wall paneling, Italian marble consoles, and curated architectural lighting.",
    image: "/Images/services/living-room-interiors.webp",
    gallery: [
      "/Images/services/living-room-interiors.webp",
      "/Images/main-hero.webp",
      "/Images/services/customised-furniture.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Custom entertainment consoles with concealed cable routing",
      "Architectural fluted wood paneling and natural veneer finishes",
      "Integrated pooja niches with backlit onyx and brass highlights",
      "Acoustic wall treatments and concealed ambient LED profiles",
    ],
    whatWeDesign: [
      "Feature TV walls with Italian marble and fluted paneling",
      "Partition screens separating living, foyer, and dining spaces",
      "Floating consoles, curio display cabinets, and bar units",
      "Pooja mandapam enclosures with CNC jaali and warm lighting",
      "Dining credenzas with matching cutlery drawers",
      "Foyer entry console tables with integrated shoe storage",
    ],
    whatYouGet: [
      "Custom 3D living room layouts tailored to natural room daylight",
      "Full structural woodwork with anti-termite marine ply backing",
      "Concealed conduits for 4K TVs, home theaters, and soundbars",
      "Dimmable cove lighting and magnetic track light fixtures",
      "Handcrafted finish with PU polish or natural wood oil",
      "10-year craftsmanship warranty on all fixed carpentry units",
    ],
    ctaLabel: "Book Living Room Design",
    relatedProjectSlugs: ["raju-sir-home", "nikhils-home"],
    faqs: [
      {
        question: "How do you conceal unsightly cords and TV cables?",
        answer: "Every TV unit is planned with in-wall PVC conduits and rear back-panel chases that route all HDMI, power, and audio cables invisibly behind the feature wall.",
      },
      {
        question: "Can you incorporate Italian marble into the TV feature wall?",
        answer: "Yes, we integrate bookmatched Italian marble slabs, tinted mirror bands, and CNC fluted charcoal louvers reinforced with marine ply backing frames.",
      },
      {
        question: "How do you divide an open-concept living and dining area?",
        answer: "We design bespoke semi-permeable metal profile partitions, wooden louvered slats, or double-sided display credenzas that maintain visual light while defining distinct zones.",
      },
      {
        question: "What lighting schemes do you recommend for living spaces?",
        answer: "We design a 3-layer lighting plan: warm 3000K perimeter cove illumination, magnetic track spotlights for art pieces, and anti-glare COB downlights for ambient relaxation.",
      },
      {
        question: "Can home theater speakers and soundbars be integrated?",
        answer: "Yes, we coordinate acoustic fabric panels, sub-woofer cutouts, and concealed speaker wiring inside media consoles for clean, cinema-grade audio performance.",
      },
      {
        question: "Do you design shoe cabinets and foyer entry consoles?",
        answer: "Yes, foyer design is tailored with ventilated shoe racks, hidden key niches, seating ledges, and full-length dress-up mirrors.",
      },
      {
        question: "How long does living room carpentry execution take?",
        answer: "Living room wall panelling and media console installation usually requires 12 to 16 business days on site following factory preparation.",
      },
      {
        question: "Can we choose natural wood veneer finishes with PU polish?",
        answer: "Yes, we work with imported teak, walnut, and smoked oak veneers coated in high-durability matte or satin polyurethane (PU) polish.",
      },
      {
        question: "Will the false ceiling match the living room woodwork?",
        answer: "All false ceiling coves, wooden rafters, and light channels are coordinated directly with the wall panelling and console finishes for visual continuity.",
      },
      {
        question: "Is there a warranty on living room wall panelling?",
        answer: "We provide a 10-year warranty covering termite resistance, structural framing stability, and adhesive delamination across all living room installations.",
      },
    ],
  },
  {
    id: "bedroom-interiors",
    number: "04",
    slug: "bedroom-interiors",
    name: "Bedroom Interiors",
    shortDescription: "Comfort, intelligent storage, and personal sanctuary brought together seamlessly.",
    description:
      "Bespoke bedroom interiors tailored for rest and privacy. From custom cushioned headboards and floating nightstands to acoustically insulated study nooks and concealed dressers, every element balances serene aesthetics with everyday utility.",
    image: "/Images/services/bedroom-interiors.webp",
    gallery: [
      "/Images/services/bedroom-interiors.webp",
      "/Images/services/complete-home-interiors.webp",
      "/Images/services/wardrobes-storage.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Custom bed platforms with hydraulic under-mattress storage",
      "Acoustic fabric, fluted velvet, or natural veneer headboards",
      "Floating bedside consoles with integrated wireless chargers",
      "Concealed vanity mirrors with backlit high-CRI vanity lights",
    ],
    whatWeDesign: [
      "Master bedroom suites with walk-in dressing zones",
      "Children bedrooms with study desks and playful ergonomics",
      "Elder-friendly bedrooms with anti-skid and accessible reach",
      "Guest bedrooms with space-optimizing multipurpose joinery",
      "Floating nightstands with integrated charging niches",
      "Acoustic fabric and fluted timber accent headboard walls",
    ],
    whatYouGet: [
      "Custom spatial layout ensuring 360-degree clearance around beds",
      "Durable plywood framing with heavy-duty German hydraulic pistons",
      "Integrated reading lights and soft nighttime floor illumination",
      "Full material and fabric swatch coordination",
      "Soft-closing wardrobe shutters and velvet-lined dressing drawers",
      "10-year structural warranty on all built-in bedroom joinery",
    ],
    ctaLabel: "Book Bedroom Design",
    relatedProjectSlugs: ["nikhils-home", "jubli-heaven-residencey"],
    faqs: [
      {
        question: "Can bedroom furniture accommodate hydraulic storage?",
        answer: "Yes, our custom bed platforms use heavy-duty German gas lifts calibrated to your mattress weight for effortless one-handed lifting and deep under-bed storage.",
      },
      {
        question: "How do you design children's bedrooms for longevity?",
        answer: "We use adaptable study desks, rounded corner edges, scratch-resistant laminates, and neutral primary wood tones that effortlessly transition as children grow older.",
      },
      {
        question: "What headboard styles do you craft?",
        answer: "We design floor-to-ceiling upholstered fabric headboards, fluted wooden acoustic panels, cane webbing accents, and padded leatherette backrests.",
      },
      {
        question: "Can reading lights and switches be built into the headboard?",
        answer: "Yes, we integrate dual-switched gooseneck directional reading lamps, two-way master switch plates, and USB-C fast charging sockets right at arm's reach.",
      },
      {
        question: "How do you optimize compact master bedrooms?",
        answer: "We design sliding-door wardrobes, floating bedside ledges, concealed dressing mirrors, and recessed ceiling coves to maximize open floor movement.",
      },
      {
        question: "Are fabrics and headboard cushioning easy to clean?",
        answer: "We offer hydrophobic, stain-resistant upholstery fabrics with high Martindale rub counts that resist moisture, stains, and daily wear.",
      },
      {
        question: "Do you design built-in study and work-from-home nooks?",
        answer: "Yes, complete with cable grommets, wire management conduits, overhead book ledges, and glare-free under-shelf LED task lighting.",
      },
      {
        question: "How do you control light and sound in the master bedroom?",
        answer: "We incorporate recessed curtain pelmets for blackout drapes, acoustic fabric wall panelling, and soft warm 2700K–3000K lighting.",
      },
      {
        question: "What wood grade is used for bedroom wardrobes and beds?",
        answer: "We use IS:303 BWR/MR calibrated hardwood plywood for dry bedroom areas, ensuring structural rigidity and zero sagging over decades.",
      },
      {
        question: "What is the typical completion time for a master suite?",
        answer: "Factory modular woodwork is built in 20 days, and on-site assembly, headboard panelling, and painting take approximately 10 to 14 days.",
      },
    ],
  },
  {
    id: "wardrobes-storage",
    number: "05",
    slug: "wardrobes-storage",
    name: "Wardrobes & Storage",
    shortDescription: "Floor-to-ceiling wardrobes, walk-in closets, and concealed storage customized to your wardrobe.",
    description:
      "Precision-crafted storage solutions designed around your specific clothing, jewelry, accessories, and luggage. Featuring floor-to-ceiling sliding or openable shutters, tinted fluted glass, sensor LED wardrobe lighting, and internal lockable drawers.",
    image: "/Images/services/wardrobes-storage.webp",
    gallery: [
      "/Images/services/wardrobes-storage.webp",
      "/Images/services/bedroom-interiors.webp",
      "/Images/services/complete-home-interiors.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Floor-to-ceiling sliding and hinged wardrobe configurations",
      "Anodized aluminum profile doors with fluted or tinted glass",
      "Dedicated sari pull-outs, trouser racks, and jewelry organizers",
      "Motion-activated internal LED strip illumination",
    ],
    whatWeDesign: [
      "Master walk-in dressing rooms with island accessory displays",
      "Modular hinged wardrobes with soft-close 165-degree hinges",
      "Smooth ceiling-suspended top-hung sliding wardrobe systems",
      "Locker drawers with digital keypad or Godrej biometric locks",
      "Pull-out trouser racks, tie organizers, and saree trays",
      "Loft storage spaces for seasonal duvets and travel bags",
    ],
    whatYouGet: [
      "Tailored internal zoning based on hanging vs folded clothes ratio",
      "100% calibrated BWR/BWP marine plywood carcasses",
      "Moisture-proof edge banding with German PUR glue technology",
      "Velvet-lined drawers and integrated full-length mirrors",
      "Sensor-activated wardrobe profile lighting",
      "10-year warranty covering carcass alignment and hinges",
    ],
    ctaLabel: "Book Wardrobe Consultation",
    relatedProjectSlugs: ["nikhils-home", "jubli-heaven-residencey"],
    faqs: [
      {
        question: "What is the advantage of floor-to-ceiling wardrobes?",
        answer: "Floor-to-ceiling construction eliminates the dust-collecting gap on top of standard wardrobes and yields up to 35% more vertical storage for suitcases and seasonal bedding.",
      },
      {
        question: "What is the difference between sliding and hinged wardrobes?",
        answer: "Sliding wardrobes save floor space in compact rooms by gliding sideways, whereas hinged doors open fully outward to provide 100% immediate visual access to all shelves at once.",
      },
      {
        question: "Can we install tinted glass profile doors with lighting?",
        answer: "Yes, we specialize in slim anodized aluminum profile doors fitted with tinted bronze or fluted reed glass and internal motion-sensor LED vertical light strips.",
      },
      {
        question: "Are internal locker drawers secure?",
        answer: "We integrate concealed internal locker drawers equipped with Godrej high-security key cylinders, digital PIN keypads, or biometric fingerprint scanners.",
      },
      {
        question: "How do you customize internal shelves for Indian clothing?",
        answer: "We provide dedicated pull-out saree trays, multi-tier trouser rails, deep folded kurta shelves, and velvet-lined jewelry organizer compartments.",
      },
      {
        question: "How do you prevent wardrobe doors from bending or warping?",
        answer: "We install heavy-duty aluminum anti-warp door straighteners inside tall shutters to ensure perfectly flat alignment across seasons.",
      },
      {
        question: "What edge banding technology is applied to shutters?",
        answer: "All edges are sealed using 2mm high-impact PVC edge bands and moisture-resistant German PUR hot-melt adhesives, preventing peeling or water ingress.",
      },
      {
        question: "Can you create a standalone walk-in closet room?",
        answer: "Yes, with glass island display cases, illuminated shoe shelving, 360-degree vanity mirrors, and integrated dressing tables.",
      },
      {
        question: "What finishes are available for the exterior shutters?",
        answer: "Choose from anti-fingerprint super-matte laminates, high-gloss acrylic, PU painted shutters, natural wood veneer, or tinted glass profiles.",
      },
      {
        question: "What warranty is provided on wardrobe hardware and carcass?",
        answer: "We provide a 10-year warranty on the plywood carcass and lifetime manufacturer warranty on Blum/Hettich hinges and sliding runners.",
      },
    ],
  },
  {
    id: "customised-furniture",
    number: "06",
    slug: "customised-furniture",
    name: "Customised Furniture",
    shortDescription: "Bespoke dining tables, credenzas, accent seating, and consoles scaled to your floor plan.",
    description:
      "Factory-built modular furniture often fails to fit unique room dimensions. We craft bespoke furniture pieces using solid teak wood, natural veneers, Italian marble, and premium fabrics built to exact centimeter dimensions.",
    image: "/Images/services/customised-furniture.webp",
    gallery: [
      "/Images/services/customised-furniture.webp",
      "/Images/services/living-room-interiors.webp",
      "/Images/main-hero.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Handcrafted solid wood and veneer dining tables",
      "Custom upholstered dining chairs, accent armchairs & benches",
      "Console tables with custom brass, metal, or stone legs",
      "Bar cabinets with wine racks and stemware holders",
    ],
    whatWeDesign: [
      "6-seater and 8-seater dining suites with matching server units",
      "Entryway console tables with integrated shoe storage",
      "Study desks with ergonomic cable routing and drawers",
      "Custom coffee tables with nesting marble and wood discs",
      "Upholstered accent lounge chairs and dining benches",
      "Bespoke bar credenzas with stemware hangers and wine racks",
    ],
    whatYouGet: [
      "Dimensional blueprints verifying proportions within your floor plan",
      "Selected wood veneers (teak, oak, walnut) with PU finish",
      "High-density 40-density foam cushioning with stain-resistant fabric",
      "Hand-finished joinery delivered and set in place",
      "Custom hardware fittings with smooth soft-close slides",
      "5-year craftsmanship warranty on all bespoke solid wood items",
    ],
    ctaLabel: "Discuss Custom Furniture",
    relatedProjectSlugs: ["raju-sir-home", "jubli-heaven-residencey"],
    faqs: [
      {
        question: "Can you customize furniture to match existing pieces?",
        answer: "Yes, our team can match wood stain shades, veneer grain directions, and metal accent tones to blend seamlessly with any existing family heirlooms.",
      },
      {
        question: "What woods do you use for solid bespoke furniture?",
        answer: "We predominantly work with seasoned CP Teak, Burma Teak, White Oak, and American Walnut, all treated against moisture and wood-boring insects.",
      },
      {
        question: "Can we supply our own upholstery fabric for chairs?",
        answer: "Yes, you can choose from our curated fabric swatch libraries (velvets, linens, leatherettes) or provide your own preferred designer textile.",
      },
      {
        question: "What stone tops do you recommend for custom dining tables?",
        answer: "We recommend imported Italian Statuario, Botticino marble, or sintered compact stone, sealed with anti-stain epoxy food-grade resin.",
      },
      {
        question: "How long does it take to handcraft a custom dining set?",
        answer: "A custom dining table with 6 to 8 matching chairs typically takes 20 to 25 business days from 3D drawing sign-off to doorstep delivery.",
      },
      {
        question: "Do you build custom study desks for dual-monitor setups?",
        answer: "Yes, we integrate concealed cable grommets, under-desk power strip trays, document drawers, and ergonomic wrist-rest chamfers.",
      },
      {
        question: "Are your bar cabinets customized for glassware?",
        answer: "Yes, we integrate inverted stemware brass racks, wine bottle racks, mirror-backed liquor display shelves, and soft LED cove lighting.",
      },
      {
        question: "How do you protect solid wood against weather expansion?",
        answer: "All solid timber is kiln-dried to optimal moisture content (under 12%) and sealed with multi-coat PU polish to prevent seasonal swelling or cracking.",
      },
      {
        question: "Can you design nesting coffee tables for smaller living rooms?",
        answer: "Yes, we craft dual nesting tables combining wood and fluted metal or marble discs that slide under each other to optimize floor space.",
      },
      {
        question: "What maintenance is required for PU-polished furniture?",
        answer: "PU finishes simply require periodic dusting with a microfiber cloth and gentle wiping with mild water; no harsh chemical waxes are needed.",
      },
    ],
  },
  {
    id: "false-ceiling-lighting",
    number: "07",
    slug: "false-ceiling-lighting",
    name: "False Ceiling & Lighting",
    shortDescription: "Clean architectural ceiling geometry with layered ambient, cove, and task lighting.",
    description:
      "Ceilings are the fifth wall of your home. We design minimal, uncluttered false ceilings that conceal beams and AC copper piping while introducing warm indirect coves, magnetic architectural track lights, and glare-free downlights.",
    image: "/Images/services/false-ceiling-lighting.webp",
    gallery: [
      "/Images/services/false-ceiling-lighting.webp",
      "/Images/main-hero.webp",
      "/Images/services/living-room-interiors.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Saint-Gobain Gyproc false ceiling framing with anti-sag guarantee",
      "Recessed magnetic track lighting with interchangeable spots",
      "CRI 90+ warm white (3000K) indirect ambient perimeter coves",
      "Concealed AC ducting and curtain pocket integration",
    ],
    whatWeDesign: [
      "Minimalist flat ceilings with perimeter cove shadow channels",
      "Dining feature ceilings with pendant suspensions",
      "Wooden louvered ceiling insets for foyers and pooja rooms",
      "Acoustic false ceiling solutions for home theater suites",
      "Recessed curtain pelmets concealing automated drape tracks",
      "Magnetic low-voltage track lighting layouts with modular spots",
    ],
    whatYouGet: [
      "Detailed ceiling CAD plan with circuit switching & dimming paths",
      "Heavy-gauge GI framework with structural anchor fasteners",
      "Seamless joint taping with fiberglass mesh to prevent hairline cracks",
      "High-efficiency LED drivers placed in accessible service hatches",
      "CRI 90+ warm white (3000K) energy-efficient lighting fixtures",
      "5-year anti-sag and crack-free installation warranty",
    ],
    ctaLabel: "Plan Ceiling & Lighting",
    relatedProjectSlugs: ["nikhils-home", "raju-sir-home"],
    faqs: [
      {
        question: "Will a false ceiling reduce my room height drastically?",
        answer: "Our minimal ceiling designs typically require only 4.5 to 5 inches of drop, allowing you to conceal electrical lines while preserving maximum open vertical room height.",
      },
      {
        question: "What gypsum brand and framework gauge do you install?",
        answer: "We strictly use authentic Saint-Gobain Gyproc plasterboards and heavy-gauge galvanized iron (GI) perimeter channels secured with metal ceiling fasteners.",
      },
      {
        question: "How do you prevent hairline cracks along ceiling joints?",
        answer: "We apply fiber-reinforced paper joint tapes with specialized jointing compound and allow controlled curing between coats to ensure crack-free ceiling planes.",
      },
      {
        question: "What color temperature of lighting is best for residences?",
        answer: "We recommend 3000K (Warm White) for living rooms and bedrooms for a relaxed, luxury ambiance, and 4000K (Neutral White) for kitchens and study zones.",
      },
      {
        question: "Can false ceilings conceal split AC copper piping and drains?",
        answer: "Yes, all AC refrigerant pipes, electrical power cables, and gravity condensate drain lines are routed invisibly inside the ceiling drop.",
      },
      {
        question: "What are magnetic track lights?",
        answer: "Magnetic tracks are ultra-slim low-voltage 48V recessed channels that let you click, reposition, or swap floodlights and spotlights effortlessly by hand.",
      },
      {
        question: "Where are the LED power supply drivers housed?",
        answer: "We locate heavy-duty constant-voltage drivers inside discreet, accessible magnetic service access hatches, making future replacements effortless.",
      },
      {
        question: "Can you integrate wooden rafters or louvers into the ceiling?",
        answer: "Yes, we integrate CNC-milled natural veneer rafters, fluted charcoal baffles, and gold metal trims in foyers and dining areas.",
      },
      {
        question: "How long does false ceiling installation take for a 3BHK?",
        answer: "Framing, board fixing, joint finishing, and primer application across an entire 3BHK flat are completed in 10 to 14 business days.",
      },
      {
        question: "What warranty covers false ceilings?",
        answer: "We offer a 5-year anti-sag and crack-free installation warranty on all Gyproc structural ceiling frameworks.",
      },
    ],
  },
  {
    id: "turnkey-interior-execution",
    number: "08",
    slug: "turnkey-interior-execution",
    name: "Turnkey Interior Execution",
    shortDescription: "Complete site ownership, on-site supervision, zero hidden costs, and on-time handover.",
    description:
      "Full turnkey site execution where Benson Cheripelli and our senior engineering team handle every tradesman, subcontractor, material delivery, and quality check. You receive weekly photo reports and a 100% itemized contract with zero cost escalation.",
    image: "/Images/services/turnkey-interior-execution.webp",
    gallery: [
      "/Images/services/turnkey-interior-execution.webp",
      "/Images/main-hero.webp",
      "/Images/services/bedroom-interiors.webp",
    ],
    locationAvailability: ["Hyderabad", "Warangal", "Karimnagar"],
    features: [
      "Single point of contact: dedicated senior site engineer",
      "Strict locked bill of quantities (BOQ) with zero surprise costs",
      "Weekly photo progress logs & milestone Gantt tracking",
      "Comprehensive 3-stage snagging audit prior to key handover",
    ],
    whatWeDesign: [
      "Civil alterations, tile laying, and plumbing realignment",
      "Complete electrical re-cabling and automation conduit routing",
      "On-site and factory joinery assembly and PU painting",
      "Deep chemical post-construction cleaning and handover",
      "Sanitaryware installation and glass shower partition framing",
      "Protective surface floor sheets and doorway dust barriers",
    ],
    whatYouGet: [
      "Turnkey contractual agreement with guaranteed handover date",
      "Transparent schedule of payments tied strictly to site progress",
      "Full site protection (floor sheets, door guards, dust barriers)",
      "Formal handover dossier with material warranties and service manual",
      "Dedicated senior site engineer stationed directly on your project",
      "Complimentary 6-month and 12-month post-handover tune-up visits",
    ],
    ctaLabel: "Book Turnkey Execution",
    relatedProjectSlugs: ["jubli-heaven-residencey", "nikhils-home", "raju-sir-home"],
    faqs: [
      {
        question: "How does turnkey execution protect me against cost overruns?",
        answer: "Before any construction begins, we deliver a 100% itemized Bill of Quantities with locked material specifications. Our contract guarantees zero unexpected bills unless you request a structural scope change.",
      },
      {
        question: "Do I have to visit the construction site frequently?",
        answer: "No. Your dedicated site supervisor manages daily artisan attendance, material quality checks, and sends weekly photo logs, so you can manage your work and family in peace.",
      },
      {
        question: "What happens if a project milestone is delayed?",
        answer: "Our contracts feature committed completion dates with penalty clauses for unexcused delays, backed by structured milestone tracking to prevent project stalls.",
      },
      {
        question: "What is your 3-stage snagging audit process?",
        answer: "Stage 1 inspects rough carpentry and electricals; Stage 2 checks paint finishes, hinges, and drawer alignments; Stage 3 tests plumbing water pressure and hardware before keys are handed over.",
      },
      {
        question: "How are site floors and windows protected during construction?",
        answer: "We lay heavy-duty corrugation sheets with sealed seams over all finished floors, foam-wrap door jambs, and install dust barrier zip-doors to prevent any damage.",
      },
      {
        question: "Are civil modifications like knocking down walls handled?",
        answer: "Yes, our civil engineering team assesses structural beam loads, secures builder permissions, and safely executes wall removal, debris clearing, and lintel bracing.",
      },
      {
        question: "How are payments scheduled during turnkey projects?",
        answer: "Payments are divided across 4 to 5 transparent stages tied to tangible deliverables: design sign-off, civil/electrical completion, woodwork delivery, and final snag clearance.",
      },
      {
        question: "Who coordinates with the apartment builder / society office?",
        answer: "Our site engineer coordinates directly with society management for work permits, debris disposal, lift usage permissions, and designated working hours.",
      },
      {
        question: "Is deep post-construction cleaning included?",
        answer: "Yes, we perform full industrial vacuuming, glass polishing, tile descaling, and sanitized chemical cleaning prior to hand-off so your home is move-in ready.",
      },
      {
        question: "What warranties and documentation do I receive at handover?",
        answer: "You receive a formal handover dossier containing material warranty certificates, electrical circuit schematics, hardware keys, and a 10-year warranty contract.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((service) => service.slug);
}
