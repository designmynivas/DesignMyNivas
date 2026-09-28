export interface PricingOption {
  id: string;
  label: string;
  description?: string;
  multiplier?: number;
  fixedCost?: number;
}

export interface ServicePricingModel {
  serviceSlug: string;
  serviceName: string;
  baseMinPrice: number;
  baseMaxPrice: number;
  unitLabel: string;
  disclaimer: string;
  steps: {
    id: string;
    title: string;
    subtitle: string;
    options: PricingOption[];
  }[];
  calculate: (selections: Record<string, string>) => { min: number; max: number };
}

/**
 * Realistic Telangana residential interior benchmarks (Hyderabad, Warangal, Karimnagar).
 * Carcass: IS:710 BWP marine plywood / HDHMR.
 * Hardware: Blum / Hettich soft-close.
 * Transparent indicative ranges for homeowner planning.
 */
export const pricingConfig: Record<string, ServicePricingModel> = {
  "complete-home-interiors": {
    serviceSlug: "complete-home-interiors",
    serviceName: "Complete Home Interiors",
    baseMinPrice: 550000,
    baseMaxPrice: 900000,
    unitLabel: "Total Home Package",
    disclaimer:
      "Indicative estimate for full woodwork, modular kitchen, false ceilings, lighting, and finishes. Final pricing depends on site measurements, material grades, and custom scopes.",
    steps: [
      {
        id: "homeType",
        title: "Home Configuration",
        subtitle: "Select the size of your residence",
        options: [
          { id: "2bhk", label: "2 BHK Flat", description: "Approx. 1,000 – 1,300 sq.ft", multiplier: 1.0 },
          { id: "3bhk", label: "3 BHK Flat", description: "Approx. 1,400 – 2,000 sq.ft", multiplier: 1.5 },
          { id: "4bhk", label: "4 BHK / Large Flat", description: "Approx. 2,200 – 3,000 sq.ft", multiplier: 2.1 },
          { id: "villa", label: "Independent Villa / Penthouse", description: "3,000+ sq.ft triplex/duplex", multiplier: 3.0 },
        ],
      },
      {
        id: "finishScope",
        title: "Material & Finish Scope",
        subtitle: "Choose your desired finish and hardware grade",
        options: [
          { id: "essential", label: "Essential Elegance", description: "Matte laminate woodwork, standard soft-close, warm LED coves", multiplier: 1.0 },
          { id: "premium", label: "Premium Signature", description: "Anti-fingerprint acrylic/PU shutters, fluted louvers, profile glass wardrobes", multiplier: 1.35 },
          { id: "luxury", label: "Luxury Architectural", description: "Natural veneer + PU polish, Italian marble consoles, magnetic track lighting", multiplier: 1.8 },
        ],
      },
      {
        id: "location",
        title: "Project Location",
        subtitle: "Active studio execution zones",
        options: [
          { id: "hyderabad", label: "Hyderabad", description: "Full turnkey studio & site teams" },
          { id: "warangal", label: "Warangal", description: "Local supervision & site teams" },
          { id: "karimnagar", label: "Karimnagar", description: "Local supervision & site teams" },
        ],
      },
    ],
    calculate: (selections) => {
      const typeMulti = selections.homeType === "3bhk" ? 1.5 : selections.homeType === "4bhk" ? 2.1 : selections.homeType === "villa" ? 3.0 : 1.0;
      const finishMulti = selections.finishScope === "luxury" ? 1.8 : selections.finishScope === "premium" ? 1.35 : 1.0;
      const baseMin = 550000;
      const baseMax = 850000;
      return {
        min: Math.round((baseMin * typeMulti * finishMulti) / 10000) * 10000,
        max: Math.round((baseMax * typeMulti * finishMulti) / 10000) * 10000,
      };
    },
  },

  "modular-kitchens": {
    serviceSlug: "modular-kitchens",
    serviceName: "Modular Kitchens",
    baseMinPrice: 180000,
    baseMaxPrice: 320000,
    unitLabel: "Complete Modular Kitchen",
    disclaimer:
      "Includes 100% 710-grade BWP marine plywood carcass, soft-close Blum/Hettich tandem boxes, cutlery trays, bottle pull-outs, and matching shutters. Countertops and appliances quoted per selection.",
    steps: [
      {
        id: "layout",
        title: "Kitchen Layout",
        subtitle: "Select the geometry of your kitchen space",
        options: [
          { id: "straight", label: "Straight Line", description: "Single-wall compact layout (up to 10 running feet)", multiplier: 0.85 },
          { id: "lshape", label: "L-Shaped Kitchen", description: "Most popular ergonomic layout (12–16 running feet)", multiplier: 1.0 },
          { id: "parallel", label: "Parallel / Galley", description: "Dual counter preparation & cooking zones (16–22 running feet)", multiplier: 1.25 },
          { id: "ushape", label: "U-Shaped / Island", description: "Spacious layout with breakfast counter / island", multiplier: 1.55 },
        ],
      },
      {
        id: "shutterFinish",
        title: "Shutter Material & Finish",
        subtitle: "Durable surfaces engineered for high Indian cooking heat & oil",
        options: [
          { id: "laminate", label: "High-Pressure Laminate", description: "1mm scratch-resistant matte/gloss laminate with 2mm PVC edge banding", multiplier: 1.0 },
          { id: "acrylic", label: "Anti-Scratch Acrylic", description: "Seamless mirror-gloss / soft-matte European acrylic shutters", multiplier: 1.3 },
          { id: "pu", label: "Bespoke Matte PU Lacquer", description: "Sleek routed handle-less profile with imported polyurethane paint finish", multiplier: 1.65 },
        ],
      },
      {
        id: "storageAccessories",
        title: "Hardware & Pantry Storage",
        subtitle: "Internal organizers and drawer systems",
        options: [
          { id: "standard", label: "Standard Tandem Soft-Close", description: "3-tier tandem drawers, cutlery insert, dual bottle pull-out", multiplier: 1.0 },
          { id: "advanced", label: "Premium Blum + Tall Pantry", description: "Heavy-duty Blum Antaro/Legrabox drawers + 6-tier tall unit pantry", multiplier: 1.35 },
        ],
      },
    ],
    calculate: (selections) => {
      const layoutMulti = selections.layout === "straight" ? 0.85 : selections.layout === "parallel" ? 1.25 : selections.layout === "ushape" ? 1.55 : 1.0;
      const finishMulti = selections.shutterFinish === "pu" ? 1.65 : selections.shutterFinish === "acrylic" ? 1.3 : 1.0;
      const storageMulti = selections.storageAccessories === "advanced" ? 1.35 : 1.0;
      const baseMin = 180000;
      const baseMax = 280000;
      return {
        min: Math.round((baseMin * layoutMulti * finishMulti * storageMulti) / 5000) * 5000,
        max: Math.round((baseMax * layoutMulti * finishMulti * storageMulti) / 5000) * 5000,
      };
    },
  },

  "living-room-interiors": {
    serviceSlug: "living-room-interiors",
    serviceName: "Living Room Interiors",
    baseMinPrice: 150000,
    baseMaxPrice: 350000,
    unitLabel: "Living & Foyer Package",
    disclaimer:
      "Includes entertainment console, feature TV panelling, acoustic louvers, pooja mandapam enclosure, and cove lighting. Loose sofas and loose chairs priced separately.",
    steps: [
      {
        id: "roomScale",
        title: "Living Room Scale",
        subtitle: "Approximate floor area for living and dining spaces",
        options: [
          { id: "compact", label: "Compact Living (~150 sq.ft)", description: "TV console + minimal wall paneling + cove lights", multiplier: 0.8 },
          { id: "standard", label: "Standard Living (~250 sq.ft)", description: "TV feature wall + foyer shoe credenza + partition screen", multiplier: 1.0 },
          { id: "grand", label: "Expansive Living & Dining (~400+ sq.ft)", description: "Full-height marble/veneer wall, integrated bar, pooja partition", multiplier: 1.6 },
        ],
      },
      {
        id: "featureWall",
        title: "Feature TV Wall Finish",
        subtitle: "Focal point design and wall cladding",
        options: [
          { id: "louverLaminate", label: "Fluted Charcoal/Wood Louvers & Laminate", description: "Modern vertical slats with matte console base", multiplier: 1.0 },
          { id: "veneerMarble", label: "Natural Oak Veneer + Italian Marble Tile", description: "Honed stone slab backing with brass highlight grooves", multiplier: 1.45 },
          { id: "acousticBacklit", label: "Acoustic Fabric + Backlit Onyx / Acrylic", description: "Home theater integration with diffused indirect halo coves", multiplier: 1.75 },
        ],
      },
    ],
    calculate: (selections) => {
      const scaleMulti = selections.roomScale === "compact" ? 0.8 : selections.roomScale === "grand" ? 1.6 : 1.0;
      const wallMulti = selections.featureWall === "acousticBacklit" ? 1.75 : selections.featureWall === "veneerMarble" ? 1.45 : 1.0;
      const baseMin = 150000;
      const baseMax = 280000;
      return {
        min: Math.round((baseMin * scaleMulti * wallMulti) / 5000) * 5000,
        max: Math.round((baseMax * scaleMulti * wallMulti) / 5000) * 5000,
      };
    },
  },

  "bedroom-interiors": {
    serviceSlug: "bedroom-interiors",
    serviceName: "Bedroom Interiors",
    baseMinPrice: 160000,
    baseMaxPrice: 320000,
    unitLabel: "Complete Bedroom Joinery",
    disclaimer:
      "Includes floor-to-ceiling wardrobe with internal organizers, hydraulic king/queen bed frame, headboard paneling, and dual bedside tables.",
    steps: [
      {
        id: "roomType",
        title: "Bedroom Type",
        subtitle: "Select the intended room suite",
        options: [
          { id: "guest", label: "Guest / Children Bedroom", description: "3-door wardrobe, study desk, single/queen bed frame", multiplier: 0.85 },
          { id: "masterStandard", label: "Master Bedroom Standard", description: "Full-height wardrobe, king bed with hydraulic storage, cushioned headboard", multiplier: 1.0 },
          { id: "masterGrand", label: "Grand Master Suite", description: "Walk-in wardrobe / tinted glass profile shutters, accent dresser, lounge nook", multiplier: 1.55 },
        ],
      },
      {
        id: "wardrobeFinish",
        title: "Wardrobe Style & Shutter Finish",
        subtitle: "Carcass in 100% BWP Marine Plywood",
        options: [
          { id: "hingedLaminate", label: "Hinged Matte Laminate", description: "Soft-close 165° hinges, recessed grooved handles", multiplier: 1.0 },
          { id: "slidingLaminate", label: "Top-Hung Sliding Wardrobe", description: "Smooth ceiling-suspended sliding track with anti-jump rollers", multiplier: 1.2 },
          { id: "profileGlass", label: "Anodized Aluminum Profile Glass", description: "Tinted fluted glass doors with motion sensor LED strip lights", multiplier: 1.5 },
        ],
      },
    ],
    calculate: (selections) => {
      const roomMulti = selections.roomType === "guest" ? 0.85 : selections.roomType === "masterGrand" ? 1.55 : 1.0;
      const finishMulti = selections.wardrobeFinish === "profileGlass" ? 1.5 : selections.wardrobeFinish === "slidingLaminate" ? 1.2 : 1.0;
      const baseMin = 160000;
      const baseMax = 270000;
      return {
        min: Math.round((baseMin * roomMulti * finishMulti) / 5000) * 5000,
        max: Math.round((baseMax * roomMulti * finishMulti) / 5000) * 5000,
      };
    },
  },

  "wardrobes-storage": {
    serviceSlug: "wardrobes-storage",
    serviceName: "Wardrobes & Storage",
    baseMinPrice: 90000,
    baseMaxPrice: 220000,
    unitLabel: "Custom Wardrobe Unit",
    disclaimer:
      "Calculated per running feet of 8ft–9.5ft floor-to-ceiling height. Built with 18mm BWP marine plywood carcass and European soft-close fittings.",
    steps: [
      {
        id: "runningFeet",
        title: "Wardrobe Width (Running Feet)",
        subtitle: "Floor-to-ceiling height (approx. 9 ft standard)",
        options: [
          { id: "6ft", label: "6 Running Feet (2 Doors)", description: "Ideal for compact rooms or single closets", multiplier: 0.75 },
          { id: "8ft", label: "8 Running Feet (3 Doors)", description: "Standard double wardrobe with vanity or loft", multiplier: 1.0 },
          { id: "10ft", label: "10 Running Feet (4 Doors)", description: "Spacious master wardrobe with separate men/women sections", multiplier: 1.3 },
          { id: "12ftPlus", label: "12+ Running Feet (Walk-in / 5+ Doors)", description: "Expansive master storage with accessory island", multiplier: 1.7 },
        ],
      },
      {
        id: "doorSystem",
        title: "Door System & Shutter Finish",
        subtitle: "Select your preferred mechanism and texture",
        options: [
          { id: "laminateHinged", label: "Hinged Matte Laminate", description: "Bespoke edge-banded shutters with long brass/black handles", multiplier: 1.0 },
          { id: "slidingLaminate", label: "Heavy-Duty Sliding Mechanism", description: "Top-hung sliding doors with soft-closing dampers", multiplier: 1.2 },
          { id: "tintedProfileGlass", label: "Tinted Fluted Glass + Profile Aluminum", description: "Architectural metal profile with integrated vertical sensor LEDs", multiplier: 1.55 },
        ],
      },
    ],
    calculate: (selections) => {
      const sizeMulti = selections.runningFeet === "6ft" ? 0.75 : selections.runningFeet === "10ft" ? 1.3 : selections.runningFeet === "12ftPlus" ? 1.7 : 1.0;
      const doorMulti = selections.doorSystem === "tintedProfileGlass" ? 1.55 : selections.doorSystem === "slidingLaminate" ? 1.2 : 1.0;
      const baseMin = 110000;
      const baseMax = 160000;
      return {
        min: Math.round((baseMin * sizeMulti * doorMulti) / 5000) * 5000,
        max: Math.round((baseMax * sizeMulti * doorMulti) / 5000) * 5000,
      };
    },
  },

  "customised-furniture": {
    serviceSlug: "customised-furniture",
    serviceName: "Customised Furniture",
    baseMinPrice: 80000,
    baseMaxPrice: 240000,
    unitLabel: "Custom Furniture Suite",
    disclaimer:
      "Precision-crafted in natural veneers, solid teak wood accents, and Italian stone tops to fit exact floor plan dimensions.",
    steps: [
      {
        id: "furnitureScope",
        title: "Furniture Requirement",
        subtitle: "Choose piece or multi-room suite",
        options: [
          { id: "diningSuite", label: "6 to 8 Seater Dining Table & Chairs", description: "Custom teak/veneer dining table with upholstered cushioned chairs", multiplier: 1.0 },
          { id: "livingSet", label: "Lounge Seating & Accent Credenzas", description: "3+2 designer sofa setup with nesting marble coffee tables", multiplier: 1.25 },
          { id: "fullPackage", label: "Complete Loose Furniture Suite", description: "Dining suite, living seating, entryway console, and bar credenza", multiplier: 2.2 },
        ],
      },
      {
        id: "materialGrade",
        title: "Material & Craftsmanship",
        subtitle: "Select wood species and finish standard",
        options: [
          { id: "veneerPu", label: "Natural Wood Veneer + PU Polish", description: "Warm oak / walnut veneer with durable scratch-resistant polyurethane", multiplier: 1.0 },
          { id: "teakMarble", label: "Solid Teak Wood + Honed Italian Marble", description: "Hand-finished seasoned CP teak with imported natural stone top", multiplier: 1.4 },
        ],
      },
    ],
    calculate: (selections) => {
      const scopeMulti = selections.furnitureScope === "livingSet" ? 1.25 : selections.furnitureScope === "fullPackage" ? 2.2 : 1.0;
      const matMulti = selections.materialGrade === "teakMarble" ? 1.4 : 1.0;
      const baseMin = 95000;
      const baseMax = 155000;
      return {
        min: Math.round((baseMin * scopeMulti * matMulti) / 5000) * 5000,
        max: Math.round((baseMax * scopeMulti * matMulti) / 5000) * 5000,
      };
    },
  },

  "false-ceiling-lighting": {
    serviceSlug: "false-ceiling-lighting",
    serviceName: "False Ceiling & Lighting",
    baseMinPrice: 85000,
    baseMaxPrice: 220000,
    unitLabel: "Ceiling & Architectural Lighting",
    disclaimer:
      "Includes Saint-Gobain Gyproc GI framing, gypsum boards, anti-crack taping, perimeter cove shadow lines, and installation of lighting fixtures.",
    steps: [
      {
        id: "ceilingArea",
        title: "Approximate Ceiling Coverage",
        subtitle: "Total ceiling area to be designed",
        options: [
          { id: "compact", label: "Single Hall / Master Bedroom (~300 sq.ft)", description: "Targeted ambient perimeter cove & spotlighting", multiplier: 0.65 },
          { id: "medium", label: "Living + Dining + Foyer (~600 sq.ft)", description: "Unified open-plan ceiling geometry with curtain pockets", multiplier: 1.0 },
          { id: "entireFlat", label: "Complete 3BHK Residence (~1,200 sq.ft)", description: "Full-home ceiling architecture across all bedrooms & halls", multiplier: 1.85 },
        ],
      },
      {
        id: "lightingScope",
        title: "Lighting Architecture",
        subtitle: "Wiring, fixtures, and control pathways",
        options: [
          { id: "standardCove", label: "Warm Cove (3000K) + COB Spotlights", description: "Perimeter indirect LED strips with anti-glare recessed downlights", multiplier: 1.0 },
          { id: "magneticTrack", label: "Magnetic Low-Voltage Recessed Tracks", description: "Architectural linear diffusers, accent spots, and dimming drivers", multiplier: 1.45 },
        ],
      },
    ],
    calculate: (selections) => {
      const areaMulti = selections.ceilingArea === "compact" ? 0.65 : selections.ceilingArea === "entireFlat" ? 1.85 : 1.0;
      const lightMulti = selections.lightingScope === "magneticTrack" ? 1.45 : 1.0;
      const baseMin = 95000;
      const baseMax = 145000;
      return {
        min: Math.round((baseMin * areaMulti * lightMulti) / 5000) * 5000,
        max: Math.round((baseMax * areaMulti * lightMulti) / 5000) * 5000,
      };
    },
  },

  "turnkey-interior-execution": {
    serviceSlug: "turnkey-interior-execution",
    serviceName: "Turnkey Interior Execution",
    baseMinPrice: 750000,
    baseMaxPrice: 1800000,
    unitLabel: "End-to-End Turnkey Execution",
    disclaimer:
      "Covers complete civil modifications, electrical cabling, modular woodwork, painting, ceilings, and deep post-construction cleaning with dedicated on-site engineer.",
    steps: [
      {
        id: "propertyScale",
        title: "Property Type & Scale",
        subtitle: "Full turnkey site scope",
        options: [
          { id: "apt2bhk", label: "2BHK Apartment (1,100 – 1,400 sq.ft)", description: "Turnkey handover in 40–50 business days", multiplier: 0.8 },
          { id: "apt3bhk", label: "3BHK Apartment (1,600 – 2,200 sq.ft)", description: "Turnkey handover in 55–70 business days", multiplier: 1.0 },
          { id: "villaLarge", label: "Duplex / Villa / Penthouse (3,000+ sq.ft)", description: "Turnkey handover in 75–90 business days", multiplier: 1.85 },
        ],
      },
      {
        id: "location",
        title: "Execution Location",
        subtitle: "Benson Cheripelli & dedicated site supervisor assigned",
        options: [
          { id: "hyderabad", label: "Hyderabad", description: "West & Central Hyderabad clusters" },
          { id: "warangal", label: "Warangal", description: "Hanamkonda & Warangal city clusters" },
          { id: "karimnagar", label: "Karimnagar", description: "Collectorate & Karimnagar bypass clusters" },
        ],
      },
    ],
    calculate: (selections) => {
      const scaleMulti = selections.propertyScale === "apt2bhk" ? 0.8 : selections.propertyScale === "villaLarge" ? 1.85 : 1.0;
      const baseMin = 750000;
      const baseMax = 1250000;
      return {
        min: Math.round((baseMin * scaleMulti) / 10000) * 10000,
        max: Math.round((baseMax * scaleMulti) / 10000) * 10000,
      };
    },
  },
};

/**
 * Format Indian currency with rupee symbol and comma separators.
 */
export function formatRupees(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
