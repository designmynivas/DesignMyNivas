export interface LocationItem {
  slug: "hyderabad" | "warangal" | "karimnagar";
  city: string;
  state: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  overview: string;
  homeTypesServed: {
    title: string;
    description: string;
    typicalAreas: string[];
  }[];
  localDesignConsiderations: {
    title: string;
    description: string;
  }[];
  serviceCoverage: {
    title: string;
    description: string;
  }[];
  localFaqs: {
    question: string;
    answer: string;
  }[];
}

export const locationsData: Record<string, LocationItem> = {
  hyderabad: {
    slug: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    headline: "Residential Interior Designers in Hyderabad",
    subheadline:
      "End-to-end turnkey interior design and precision woodwork execution for high-rise apartments, gated communities, and luxury villas across Hyderabad.",
    metaTitle: "Interior Designers in Hyderabad | Design My Nivas",
    metaDescription:
      "Looking for residential interior designers in Hyderabad? Design My Nivas delivers complete home interiors, modular kitchens, and turnkey execution across Gachibowli, Kokapet, Tellapur, and Financial District.",
    heroImage: "/Images/services/complete-home-interiors.webp",
    overview:
      "Hyderabad is a dynamic metropolis characterized by soaring high-rise gated communities in the western IT corridor and prestigious independent residences in central neighborhoods. Design My Nivas provides complete turnkey interior design and on-site execution led by Benson Cheripelli. From acoustic room planning against outer ring road traffic to space-maximizing modular kitchens, we tailor every residence to modern city living.",
    homeTypesServed: [
      {
        title: "High-Rise Gated Community Apartments (2BHK, 3BHK, 4BHK)",
        description:
          "Ergonomic layouts maximizing floor area in modern high-rises. We specialize in floor-to-ceiling modular wardrobes, concealed TV wiring panels, integrated foyer shoe consoles, and ambient cove ceiling designs.",
        typicalAreas: ["Gachibowli", "Kokapet", "Tellapur", "Kondapur", "Nanakramguda", "Financial District", "Miyapur"],
      },
      {
        title: "Gated Community Villas & Triplexes",
        description:
          "Comprehensive spatial transformation for multi-floor villas. Incorporating double-height feature walls, custom wooden stair rail paneling, home theatre acoustic lounges, and imported quartz island kitchens.",
        typicalAreas: ["Gandipet", "Mokila", "Manikonda", "Appa Junction", "Kollur", "Bowenpally"],
      },
      {
        title: "Luxury Independent Bungalows & Penthouses",
        description:
          "Tailored luxury finishes featuring natural teak veneers, Italian marble cladding, architectural fluted louvers, and bespoke automated lighting controls.",
        typicalAreas: ["Jubilee Hills", "Banjara Hills", "Madhapur", "Somajiguda"],
      },
    ],
    localDesignConsiderations: [
      {
        title: "High-Rise Wind Turbulence & Dust Management",
        description:
          "Balcony and window interfaces in Hyderabad high-rises experience high dust exposure and wind pressure. We utilize sealed brush gaskets, acrylic-coated easy-clean cabinetry, and moisture-resistant marine ply for balcony utility zones.",
      },
      {
        title: "Acoustic Glazing & Fluted Wall Insulation",
        description:
          "Apartments adjacent to the Outer Ring Road and metro corridors benefit from our acoustic wall paneling with high-density mineral batting behind fluted louvers to dampen external ambient noise.",
      },
      {
        title: "Compact Urban Spatial Efficiency",
        description:
          "In modern Hyderabad flats, every square inch counts. We incorporate concealed pocket doors, hydraulic under-bed storage, pull-out tall pantry units, and fold-away work-from-home study desks.",
      },
    ],
    serviceCoverage: [
      {
        title: "Direct Physical Site Supervision",
        description:
          "A full-time senior site engineer is stationed on your site in Hyderabad from day one to oversee civil alterations, false ceiling framing, and electrical conduit routing.",
      },
      {
        title: "Factory-Calibrated Machine Woodwork",
        description:
          "All modular kitchen carcasses and wardrobe frames are machine-pressed with 1mm PVC edge-banding and delivered fully modular for dust-free on-site assembly.",
      },
      {
        title: "100% Locked Bill of Quantities",
        description:
          "We provide a transparent, line-item BOQ with zero hidden charges and locked milestone payments prior to starting site work.",
      },
    ],
    localFaqs: [
      {
        question: "How much does full home interior design cost in Hyderabad?",
        answer:
          "Full home interior execution for a 3BHK flat in Hyderabad typically ranges from basic essential woodwork to premium turnkey finishes depending on materials (laminate vs acrylic vs PU) and false ceiling scope. Design My Nivas provides a locked, itemized estimate with zero surprise cost escalations.",
      },
      {
        question: "Do you handle societies with strict interior working hour restrictions in Hyderabad?",
        answer:
          "Yes. Most gated communities in Kokapet, Gachibowli, and Tellapur restrict noisy work to 9:30 AM – 5:30 PM and bar weekend noise. Because our woodwork is precision-cut and edge-banded off-site in our automated facility, on-site noise is minimal and work complies strictly with society bylaws.",
      },
      {
        question: "How long does a turnkey project take to complete in Hyderabad?",
        answer:
          "A standard 2BHK or 3BHK flat is delivered within 45 to 60 business days from 3D drawing sign-off. Larger penthouses or villas in Jubilee Hills or Gandipet take 75 to 90 business days.",
      },
    ],
  },

  warangal: {
    slug: "warangal",
    city: "Warangal",
    state: "Telangana",
    headline: "Residential Interior Designers in Warangal & Hanamkonda",
    subheadline:
      "Turnkey home interiors, bespoke modular kitchens, and custom woodwork execution for independent houses, duplexes, and villas across Warangal, Hanamkonda, and Kazipet.",
    metaTitle: "Interior Designers in Warangal | Design My Nivas",
    metaDescription:
      "Premier residential interior designers in Warangal, Hanamkonda, and Kazipet. Design My Nivas delivers custom modular kitchens, false ceilings, and turnkey home interiors with locked pricing.",
    heroImage: "/Images/services/living-room-interiors.webp",
    overview:
      "Warangal's residential landscape is celebrated for spacious independent duplexes, contemporary multi-floor bungalows, and close-knit family residences across Hanamkonda and Kazipet. Design My Nivas brings metropolitan architectural sophistication directly to Warangal homeowners, combining factory-precision woodwork with dedicated local project engineering.",
    homeTypesServed: [
      {
        title: "Spacious Independent Duplex Homes & Bungalows",
        description:
          "Designed for multi-generational comfort with generous living rooms, expansive prayer mandapams, double-height ceiling treatments, and custom solid wood furniture.",
        typicalAreas: ["Hanamkonda", "Kazipet", "Subedari", "Nakkalagutta", "Hunter Road", "Waddepally"],
      },
      {
        title: "Modern Residential Apartments",
        description:
          "Smart modular space planning for contemporary flats across Warangal city, featuring clean acrylic modular kitchens, sliding wardrobes, and ambient LED cove lighting.",
        typicalAreas: ["Bhimaram", "Kishanpura", "Balasamudram", "Kakatiya University Road"],
      },
    ],
    localDesignConsiderations: [
      {
        title: "Thermal Insulation for Intense Telangana Summers",
        description:
          "Warangal experiences scorching peak summer temperatures exceeding 43°C. We integrate Saint-Gobain thermal-barrier false ceiling designs with insulated air cavities that drop interior ambient heat by 3-4°C.",
      },
      {
        title: "Expansive Pooja Mandapam Architecture",
        description:
          "Homeowners in Warangal frequently request prominent, sacred prayer spaces. We craft dedicated mandapams featuring CNC-cut back-lit jali screens, brass inlays, and acoustic wood paneling.",
      },
      {
        title: "Spacious Dual Kitchen Configurations (Wet & Dry)",
        description:
          "Many Warangal homes feature a show kitchen for everyday serving and an adjoining heavy-duty wet utility kitchen for intensive Indian cooking with heavy spice and oil frying.",
      },
    ],
    serviceCoverage: [
      {
        title: "Local On-Site Supervision in Tri-Cities",
        description:
          "Our dedicated project managers coordinate site work directly in Hanamkonda, Kazipet, and Warangal with rigorous milestone tracking.",
      },
      {
        title: "IS:710 Marine-Grade Woodwork Guarantee",
        description:
          "We use only calibrated Boiling Water Proof (BWP) marine plywood backed by a 10-year warranty, protecting your investment from moisture and termites.",
      },
    ],
    localFaqs: [
      {
        question: "Do you have active interior projects in Warangal?",
        answer:
          "Yes. Design My Nivas has completed multiple turnkey residences in Warangal and Hanamkonda, such as the Raju Sir residence featuring bespoke fluted living room paneling and architectural cove lighting.",
      },
      {
        question: "How do you manage quality control for sites in Warangal?",
        answer:
          "Our project engineers are physically present on site during all critical phases: framing, wiring, plumbing, and woodwork assembly. Benson Cheripelli personally reviews all 3D designs and conducts milestone quality audits.",
      },
      {
        question: "Can we get factory-pressed modular cabinets in Warangal instead of carpenter hand-work?",
        answer:
          "Yes. That is one of our primary advantages over local carpenters. All cabinetry is manufactured in automated factory presses with 1mm edge banding, ensuring flawless waterproof seals and seamless alignments.",
      },
    ],
  },

  karimnagar: {
    slug: "karimnagar",
    city: "Karimnagar",
    state: "Telangana",
    headline: "Residential Interior Designers in Karimnagar",
    subheadline:
      "Turnkey home interiors, custom modular kitchens, and premium wardrobe execution for independent houses and family apartments in Karimnagar.",
    metaTitle: "Interior Designers in Karimnagar | Design My Nivas",
    metaDescription:
      "Expert residential interior designers in Karimnagar. Design My Nivas offers turnkey interiors, modular kitchens, and woodwork execution with 100% itemized pricing.",
    heroImage: "/Images/services/wardrobes-storage.webp",
    overview:
      "Karimnagar is an evolving residential powerhouse with beautiful independent homes and new apartment complexes. Design My Nivas brings professional interior design, transparent BOQ pricing, and factory-finished modular craftsmanship to Karimnagar homeowners seeking premium quality without local contractor headaches.",
    homeTypesServed: [
      {
        title: "Independent Family Residences & Duplexes",
        description:
          "Grand living rooms, custom TV consoles, multi-door wardrobes, and spacious modular kitchens built for durable family living.",
        typicalAreas: ["Mukarampura", "Vavilalapalli", "Bhagyanagar", "Collectorate Road", "Jyothi Nagar", "Kothapalli"],
      },
      {
        title: "Modern 2BHK and 3BHK Gated Flats",
        description:
          "Clean contemporary lines, ergonomic space optimization, false ceiling with warm 3000K lighting, and durable laminate finishes.",
        typicalAreas: ["Housing Board Colony", "Mankammathota", "Sapthagiri Colony", "Kashmirgadda"],
      },
    ],
    localDesignConsiderations: [
      {
        title: "Longevity & Termite Resistance",
        description:
          "We exclusively utilize certified IS:710 BWP Marine-grade plywood with anti-termite treatment to ensure that cabinetry withstands regional environmental conditions for decades.",
      },
      {
        title: "Multi-Generational Family Spatial Dynamics",
        description:
          "Designing spaces that cater equally to elders requiring peaceful, clutter-free bedrooms with anti-skid surfaces, and younger family members desiring contemporary minimalist aesthetics.",
      },
      {
        title: "Dust-Resistant Finishes for Telangana Roads",
        description:
          "High-gloss acrylics or anti-fingerprint matte laminates that can be wiped down easily with microfiber cloths without scratches or dullness.",
      },
    ],
    serviceCoverage: [
      {
        title: "Full Turnkey Contract with Zero Cost Escalation",
        description:
          "Every screw, hinge, laminate brand, and lighting fixture is documented in a transparent BOQ before you pay a single rupee beyond the design token.",
      },
      {
        title: "Direct Physical Site Management",
        description:
          "Experienced supervisors oversee on-site installation to ensure precise millimeter joins and smooth handover.",
      },
    ],
    localFaqs: [
      {
        question: "Do you provide on-site consultations in Karimnagar?",
        answer:
          "Yes. Our design and technical team visits your property in Karimnagar for laser measurements, spatial assessment, and lifestyle consultation.",
      },
      {
        question: "How are materials transported and assembled in Karimnagar?",
        answer:
          "Cabinets are precision-manufactured in our central facility, flat-packed in protective corner foam, and transported directly to your Karimnagar residence. Our specialized assembly team installs the complete project with zero messy on-site cutting.",
      },
      {
        question: "What warranty do you offer on modular woodwork in Karimnagar?",
        answer:
          "We provide a 10-year warranty certificate covering modular plywood carcasses and delamination, along with lifetime manufacturer warranties on European soft-close hinges and drawer runners.",
      },
    ],
  },
};

export function getLocationBySlug(slug: string): LocationItem | undefined {
  return locationsData[slug.toLowerCase()];
}

export function getAllLocationSlugs(): string[] {
  return Object.keys(locationsData);
}
