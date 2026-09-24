export type ThemeMode = 'dark' | 'light';

export type InteractionState = 'grid' | 'half-screen' | 'full-screen';

export type MaterialVariantType = 'full' | 'sparse';

export type DilutionOption = '100% (Neat)' | '50% in DPG' | '10% in TEC' | '1% in IPM';

export type PackageSize = '25g' | '100g' | '500g' | '1kg' | '5kg Drum';

export interface OriginOption {
  id: string;
  distiller: string;
  location: string;
  lotPrefix: string;
  premiumMultiplier: number;
}

export interface OdorFacet {
  label: string;
  value: number; // 0 to 100
}

export interface AccordComponent {
  name: string;
  percentage: number;
  isCurrentMaterial: boolean;
  color: string;
}

export interface AllergenEntry {
  name: string;
  cas: string;
  concentration: string;
  status: 'Detected Trace' | 'Exempt' | 'Restricted';
}

export interface NetworkMaterial {
  name: string;
  relationship: 'Direct Isomer' | 'Structural Analogue' | 'Complementary Natural' | 'High-Impact Variant';
  similarity: number;
  olfactiveDelta: string;
}

export interface BundleItem {
  id: string;
  title: string;
  materials: string[];
  discount: string;
  bundlePrice: number;
  originalPrice: number;
}

export type TileId =
  | 'overview'
  | 'structure'
  | 'accord'
  | 'odor-profile'
  | 'story'
  | 'at-a-glance'
  | 'effects-behaviour'
  | 'perfumers-notes'
  | 'safety-ifra'
  | 'safe-handling'
  | 'network'
  | 'solubility'
  | 'bundle-offers'
  | 'allergens';

export type TileSize = 'sm' | 'md' | 'lg' | 'wide' | 'tall';

export interface TileDefinition {
  id: TileId;
  label: string;
  subtitle?: string;
  iconName: string;
  size: TileSize;
  isGated?: boolean;
}

export interface MaterialSpec {
  id: string;
  variantKey: MaterialVariantType;
  commercialName: string;
  trademarkSymbol?: string;
  chemicalName: string;
  materialType: 'synthetic' | 'natural';
  physicalState: string;
  physicalStateCategory: 'liquid' | 'crystalline' | 'resin';
  family: string;
  tags: string[];
  shortDescription: string;
  longDescription: string;
  oneLineSmell: string;
  strengthRating: string;
  diffusionRating: string;
  imageUrl: string;
  basePricePer100g: number;
  lotNumber: string;
  stockAvailableKg: number;
  
  // Conditional flags
  isIfraRestricted: boolean;
  ifraRestrictionSummary?: string;
  origins: OriginOption[]; // If length > 1, origin selector renders
  hasDeclaredAllergens: boolean;
  allergens?: AllergenEntry[];

  // Technical properties
  cas: string;
  fema: string;
  einecs: string;
  flashPoint: string;
  boilingPoint: string;
  purityAssay: string;
  shelfLife: string;
  logP: string;

  // Molecular
  formula: string;
  molecularWeight: string;
  traceComponents: string;
  ecNumber: string;

  // Accord
  accordName: string;
  accordRoleDescription: string;
  accordComponents: AccordComponent[];

  // Odor profile radar
  odorFacets: OdorFacet[];

  // At a glance
  tenacityBlotter: string;
  maxUseLevel: string;
  evaporationVaporPressure: string;
  specificGravity: string;

  // Behaviour
  behaviourNotes: {
    topHeartBase: string;
    floralSynergy: string;
    longevityFactor: string;
    fixativePerformance: string;
  };

  // Safe Handling
  ppeRequirements: string[];
  storageConditions: string;
  flammabilityClass: string;

  // Network
  networkMaterials: NetworkMaterial[];

  // Solubility matrix
  solubility: {
    solvent: string;
    result: string;
    numericGPerL?: string;
  }[];

  // Bundles
  bundles: BundleItem[];

  // Available tiles for this variant
  availableTiles: TileId[];
}

export interface CartItem {
  materialId: string;
  materialName: string;
  size: PackageSize;
  dilution: DilutionOption;
  origin: string;
  quantity: number;
  unitPrice: number;
}
