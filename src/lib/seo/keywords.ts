/**
 * Design My Nivas — Centralized Keyword, Intent & Topic Cluster Architecture
 * 
 * Target Market: Telangana (Hyderabad, Warangal, Karimnagar)
 * Entity: Design My Nivas | Founder: Benson Cheripelli
 * Business: Residential Interior Design & Turnkey Execution
 */

export interface KeywordIntentCluster {
  serviceSlug: string;
  serviceName: string;
  primaryIntent: "TRANSACTIONAL" | "COMMERCIAL" | "LOCAL" | "INFORMATIONAL" | "PROBLEM_SOLUTION";
  targetPage: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  supportingQuestions: {
    question: string;
    directAnswer: string;
  }[];
  locationModifiers: string[];
  conversionAction: "Book Consultation" | "Estimate Cost" | "WhatsApp Inquiry";
}

export const SERVICE_KEYWORD_CLUSTERS: Record<string, KeywordIntentCluster> = {
  "complete-home-interiors": {
    serviceSlug: "complete-home-interiors",
    serviceName: "Complete Home Interiors",
    primaryIntent: "TRANSACTIONAL",
    targetPage: "/services/complete-home-interiors",
    primaryKeyword: "complete home interiors Hyderabad",
    secondaryKeywords: [
      "full home interior designers Hyderabad",
      "turnkey interior designers Hyderabad",
      "home interior design Hyderabad",
      "full house interior design Hyderabad",
      "complete interior design for home",
      "turnkey home interiors Hyderabad",
      "residential interior designers Hyderabad",
      "home interiors Warangal",
      "home interiors Karimnagar",
      "home interiors near me",
    ],
    supportingQuestions: [
      {
        question: "What does complete home interior design include?",
        directAnswer:
          "Complete home interior design by Design My Nivas includes architectural 2D space planning, 3D visualization, modular woodwork for all bedrooms, living, dining, and kitchen, false ceiling design, electrical rewiring, plumbing realignment, and turnkey on-site execution under a single itemized contract.",
      },
      {
        question: "How much does a full home interior cost in Hyderabad?",
        directAnswer:
          "Full home interior costs depend on property size (2BHK, 3BHK, 4BHK or villa), chosen materials (BWP marine ply, acrylic, PU or laminate), and false ceiling scope. Design My Nivas provides a 100% itemized Bill of Quantities with zero mid-project cost escalation.",
      },
      {
        question: "How long does a full home interior project take?",
        directAnswer:
          "A standard 2BHK or 3BHK interior project takes 45 to 60 business days from 3D design approval to turnkey handover. Independent houses and duplex villas generally take 75 to 90 days.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar", "Telangana"],
    conversionAction: "Book Consultation",
  },

  "modular-kitchens": {
    serviceSlug: "modular-kitchens",
    serviceName: "Modular Kitchens",
    primaryIntent: "TRANSACTIONAL",
    targetPage: "/services/modular-kitchens",
    primaryKeyword: "modular kitchen designers Hyderabad",
    secondaryKeywords: [
      "modular kitchen Hyderabad",
      "modular kitchen price Hyderabad",
      "best modular kitchen designs Hyderabad",
      "custom modular kitchen Hyderabad",
      "modern modular kitchen Hyderabad",
      "modular kitchen Warangal",
      "modular kitchen Karimnagar",
      "modular kitchen near me",
    ],
    supportingQuestions: [
      {
        question: "How much does a modular kitchen cost in Hyderabad?",
        directAnswer:
          "A modular kitchen cost depends on layout (L-shaped, U-shaped, parallel, or island), carcass material (IS:710 BWP marine plywood), shutter finishes (acrylic, PU lacquer, laminate), and soft-close hardware (Blum or Hettich). Design My Nivas provides a customized milestone estimate after understanding exact site measurements.",
      },
      {
        question: "Which plywood is best for modular kitchens?",
        directAnswer:
          "IS:710 certified Boiling Water Proof (BWP) marine-grade plywood is the gold standard for kitchen base units and wet areas due to 72-hour boiling water resistance and complete immunity to moisture, steam, and termites.",
      },
      {
        question: "What is the difference between modular kitchen and carpenter-made kitchen?",
        directAnswer:
          "Modular kitchens are precision-engineered in automated factories with 1mm edge-banding, uniform machine pressing, and detachable modules. Carpenter-made kitchens are hand-glued on-site with manual edge pasting, leading to visible imperfections, bubbling, and prolonged on-site dust.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar"],
    conversionAction: "Estimate Cost",
  },

  "living-room-interiors": {
    serviceSlug: "living-room-interiors",
    serviceName: "Living Room Interiors",
    primaryIntent: "COMMERCIAL",
    targetPage: "/services/living-room-interiors",
    primaryKeyword: "living room interior designers Hyderabad",
    secondaryKeywords: [
      "living room interior design Hyderabad",
      "modern living room interiors Hyderabad",
      "TV unit design Hyderabad",
      "living room wall paneling Hyderabad",
      "luxury living room interiors Warangal",
      "living room designers Karimnagar",
    ],
    supportingQuestions: [
      {
        question: "What are the essentials of modern living room interior design?",
        directAnswer:
          "Key elements include ergonomic seating layouts, floating TV entertainment consoles with concealed cable raceways, fluted acoustic paneling, 3000K warm layered cove lighting, and seamless foyer transitions.",
      },
      {
        question: "How to design a TV unit with concealed wiring?",
        directAnswer:
          "Design My Nivas builds floating backer panels with internal PVC conduit raceways and soft-close push-to-open consoles that conceal set-top boxes, gaming consoles, and wiring entirely.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar"],
    conversionAction: "Book Consultation",
  },

  "bedroom-interiors": {
    serviceSlug: "bedroom-interiors",
    serviceName: "Bedroom Interiors",
    primaryIntent: "COMMERCIAL",
    targetPage: "/services/bedroom-interiors",
    primaryKeyword: "bedroom interior designers Hyderabad",
    secondaryKeywords: [
      "bedroom interior design Hyderabad",
      "master bedroom interior design Hyderabad",
      "wardrobe and bedroom interiors Hyderabad",
      "modern bedroom design Warangal",
      "bedroom interiors Karimnagar",
    ],
    supportingQuestions: [
      {
        question: "What does master bedroom interior design include?",
        directAnswer:
          "Master bedroom design includes upholstered headboard wall treatments, floor-to-ceiling built-in wardrobes, dresser consoles with integrated LED mirrors, bedside floating nightstands, and circadian ambient lighting.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar"],
    conversionAction: "Book Consultation",
  },

  "wardrobes-storage": {
    serviceSlug: "wardrobes-storage",
    serviceName: "Wardrobes & Storage",
    primaryIntent: "TRANSACTIONAL",
    targetPage: "/services/wardrobes-storage",
    primaryKeyword: "wardrobe designers Hyderabad",
    secondaryKeywords: [
      "custom wardrobe Hyderabad",
      "built in wardrobe Hyderabad",
      "bedroom wardrobe design Hyderabad",
      "sliding wardrobe designers Hyderabad",
      "walk in wardrobe Hyderabad",
      "wardrobe design Warangal",
      "wardrobe makers Karimnagar",
    ],
    supportingQuestions: [
      {
        question: "Which is better: sliding wardrobe or openable hinge wardrobe?",
        directAnswer:
          "Sliding wardrobes save precious floor clearance in compact bedrooms, while hinged swing doors provide 100% full internal visibility and allow accessory organizers on the inner door faces.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar"],
    conversionAction: "Estimate Cost",
  },

  "customised-furniture": {
    serviceSlug: "customised-furniture",
    serviceName: "Customised Furniture",
    primaryIntent: "COMMERCIAL",
    targetPage: "/services/customised-furniture",
    primaryKeyword: "custom furniture designers Hyderabad",
    secondaryKeywords: [
      "custom made furniture Hyderabad",
      "bespoke furniture makers Hyderabad",
      "custom dining table Hyderabad",
      "handcrafted furniture Warangal",
    ],
    supportingQuestions: [
      {
        question: "Why choose customized furniture over store-bought readymade pieces?",
        directAnswer:
          "Customized furniture is made to exact room dimensions with solid hardwood frames, premium high-resilience foam, stain-resistant fabrics, and wood stains coordinated with your home's architectural palette.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar"],
    conversionAction: "Book Consultation",
  },

  "false-ceiling-lighting": {
    serviceSlug: "false-ceiling-lighting",
    serviceName: "False Ceiling & Lighting",
    primaryIntent: "COMMERCIAL",
    targetPage: "/services/false-ceiling-lighting",
    primaryKeyword: "false ceiling designers Hyderabad",
    secondaryKeywords: [
      "false ceiling design Hyderabad",
      "false ceiling for living room Hyderabad",
      "modern false ceiling Hyderabad",
      "gypsum false ceiling Warangal",
      "pop ceiling designers Karimnagar",
    ],
    supportingQuestions: [
      {
        question: "What false ceiling material is best for Indian homes?",
        directAnswer:
          "Saint-Gobain Gyproc moisture-resistant plasterboards on zinc-galvanized GI channels offer clean hairline-free joints, thermal insulation, and fire resistance for modern residences.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar"],
    conversionAction: "Estimate Cost",
  },

  "turnkey-interior-execution": {
    serviceSlug: "turnkey-interior-execution",
    serviceName: "Turnkey Interior Execution",
    primaryIntent: "TRANSACTIONAL",
    targetPage: "/services/turnkey-interior-execution",
    primaryKeyword: "turnkey interior designers Hyderabad",
    secondaryKeywords: [
      "turnkey interior contractors Hyderabad",
      "turnkey home interiors Hyderabad",
      "interior design and execution Hyderabad",
      "turnkey interiors Warangal",
      "turnkey residential contractors Karimnagar",
    ],
    supportingQuestions: [
      {
        question: "What is turnkey interior execution?",
        directAnswer:
          "Turnkey interior execution means a single interior firm manages everything from 3D architectural design and material procurement to civil works, electrical, plumbing, carpentry, painting, and handover under a locked contract.",
      },
    ],
    locationModifiers: ["Hyderabad", "Warangal", "Karimnagar"],
    conversionAction: "Book Consultation",
  },
};

export const LOCAL_KEYWORD_CLUSTERS = {
  hyderabad: {
    city: "Hyderabad",
    slug: "hyderabad",
    targetPage: "/interior-designers/hyderabad",
    primaryKeyword: "interior designers in Hyderabad",
    secondaryKeywords: [
      "best interior designers Hyderabad",
      "home interior design Hyderabad",
      "turnkey interior designers Hyderabad",
      "modular kitchen designers Hyderabad",
      "interior designers in Gachibowli",
      "interior designers in Kokapet",
      "interior designers in Tellapur",
      "residential interior designers Hyderabad",
    ],
    marketSummary:
      "High-rise gated communities, premium 2BHK/3BHK/4BHK apartments, and luxury villas across Hyderabad's western IT corridor and central residential hubs.",
  },
  warangal: {
    city: "Warangal",
    slug: "warangal",
    targetPage: "/interior-designers/warangal",
    primaryKeyword: "interior designers in Warangal",
    secondaryKeywords: [
      "home interior designers Warangal",
      "turnkey interiors Warangal",
      "modular kitchen designers Warangal",
      "home interiors Warangal",
      "interior designers in Hanamkonda",
      "interior designers in Kazipet",
    ],
    marketSummary:
      "Spacious independent duplex houses, traditional courtyard homes, and contemporary residential villas across Hanamkonda, Kazipet, and Warangal city.",
  },
  karimnagar: {
    city: "Karimnagar",
    slug: "karimnagar",
    targetPage: "/interior-designers/karimnagar",
    primaryKeyword: "interior designers in Karimnagar",
    secondaryKeywords: [
      "home interior designers Karimnagar",
      "turnkey interiors Karimnagar",
      "modular kitchen designers Karimnagar",
      "interior decorators Karimnagar",
      "interior designers Mukarampura",
      "home interiors Karimnagar",
    ],
    marketSummary:
      "Custom multi-generational independent residences, premium family apartments, and modern turnkey homes across Mukarampura, Vavilalapalli, and Collectorate Road.",
  },
};
