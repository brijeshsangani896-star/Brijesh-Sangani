import { MaterialSpec, TileDefinition } from '../types';

export const ALL_TILES_DEFINITIONS: Record<string, TileDefinition> = {
  'overview': {
    id: 'overview',
    label: 'Specifications & Identity',
    subtitle: 'CAS, FEMA, Formula & Strength',
    iconName: 'FileSpreadsheet',
    size: 'md',
  },
  'structure': {
    id: 'structure',
    label: 'Molecular Structure',
    subtitle: 'Skeletal Diagram & Formula',
    iconName: 'Atom',
    size: 'md',
  },
  'accord': {
    id: 'accord',
    label: 'Example Accord',
    subtitle: 'Sample Formula & Percentages',
    iconName: 'Layers',
    size: 'tall',
  },
  'odor-profile': {
    id: 'odor-profile',
    label: 'Odor Profile',
    subtitle: 'Olfactory Facets & Scent Bars',
    iconName: 'Radar',
    size: 'tall',
  },
  'story': {
    id: 'story',
    label: 'Material Profile & Story',
    subtitle: 'Olfactory Arc & Character',
    iconName: 'Activity',
    size: 'md',
  },
  'at-a-glance': {
    id: 'at-a-glance',
    label: 'Physical Constants',
    subtitle: 'Tenacity, Vapor Pressure & Density',
    iconName: 'Gauge',
    size: 'sm',
  },
  'effects-behaviour': {
    id: 'effects-behaviour',
    label: 'Effects & Behaviour in a Blend',
    subtitle: 'Harmonics & Terpene Synergy',
    iconName: 'Activity',
    size: 'md',
  },
  'perfumers-notes': {
    id: 'perfumers-notes',
    label: "Perfumer's Notes",
    subtitle: 'Studio Pro Tier Monograph',
    iconName: 'Lock',
    size: 'md',
    isGated: true,
  },
  'safety-ifra': {
    id: 'safety-ifra',
    label: 'Safety & IFRA Limits',
    subtitle: 'Standard Category Thresholds',
    iconName: 'ShieldAlert',
    size: 'md',
  },
  'safe-handling': {
    id: 'safe-handling',
    label: 'Safe Handling & Storage',
    subtitle: 'Flash Point, Shelf Life & PPE',
    iconName: 'FlaskConical',
    size: 'sm',
  },
  'network': {
    id: 'network',
    label: 'Related Materials',
    subtitle: 'Analogues & Complements',
    iconName: 'Network',
    size: 'md',
  },
  'solubility': {
    id: 'solubility',
    label: 'Solubility Matrix',
    subtitle: 'Miscibility in Solvents',
    iconName: 'TestTube2',
    size: 'sm',
  },
  'bundle-offers': {
    id: 'bundle-offers',
    label: 'Formulation Kits',
    subtitle: 'Curated Compounding Sets',
    iconName: 'Package',
    size: 'sm',
  },
  'allergens': {
    id: 'allergens',
    label: 'Allergens Declaration',
    subtitle: 'Trace Fractions & Disclosures',
    iconName: 'AlertTriangle',
    size: 'md',
  },
};

export const FULL_SPECIMEN_ISO_E_SUPER: MaterialSpec = {
  id: 'iso-e-super-54464-57-2',
  variantKey: 'full',
  commercialName: 'Iso E Super',
  trademarkSymbol: '®',
  chemicalName: '1-(1,2,3,4,5,6,7,8-octahydro-2,3,8,8-tetramethyl-2-naphthyl)ethan-1-one',
  materialType: 'synthetic',
  physicalState: 'Colorless to pale straw viscous liquid',
  physicalStateCategory: 'liquid',
  family: 'Woody Amber / Fixative Spine',
  tags: ['Fixative', 'Velvety', 'Diffusive', 'Tenacity: 400h+', 'Core Spine'],
  shortDescription:
    'Remarkably smooth, transparent woody-amber aroma with subtle cedar, ambergris, and velvet violet nuances. Imparts unmistakable lift, diffusion, and velvety fullness without olfactory heaviness.',
  longDescription:
    'Iso E Super® is one of the most celebrated synthetic aroma molecules in contemporary perfumery. First patented by IFF in 1973, it is renowned for its remarkable transparent substantivity: rather than dominating a composition with heavy resinous weight, it provides a warm, vibrating aura that radiates from within the blend.\n\nOn a smelling strip, its profile reveals dry cedarwood shavings, warm skin-like ambergris, vetiver undertones, and a delicate violet-like velvet softness. It behaves with exceptional persistence—remaining perceptible beyond 400 hours on a paper blotter—and creates a powerful synergizing effect, lifting floral accords (especially hedione and damascenones) and smoothing harsh citrus edges.\n\nFamous for serving as the sole olfactory ingredient in Geza Schoen’s Molecule 01, it is also dosed heavily in modern classics including Terre d’Hermès, Encre Noire, and Fahrenheit, where it constitutes the architectural spine holding the fragrance together.',
  oneLineSmell: 'Transparent woody-amber with cedar, ambergris, and soft velvety violet nuances.',
  strengthRating: 'Medium-High (7.5 / 10) · Tenacious',
  diffusionRating: 'Very High (9.0 / 10) · Radiant Lift',
  imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=640&q=80',
  basePricePer100g: 34.50,
  lotNumber: 'SLT-2026-0889-C',
  stockAvailableKg: 184.5,
  
  // Conditional flags
  isIfraRestricted: true,
  ifraRestrictionSummary: 'IFRA 51st Amend. Cat. 4 Max Limit: 21.40%',
  origins: [
    {
      id: 'iff-nj',
      distiller: 'IFF Union Beach Synthesis',
      location: 'New Jersey, USA',
      lotPrefix: 'UB-994',
      premiumMultiplier: 1.0,
    },
    {
      id: 'drt-fr',
      distiller: 'DRT Les Landes Pinene Fraction',
      location: 'Dax, France',
      lotPrefix: 'FR-812',
      premiumMultiplier: 1.08,
    },
    {
      id: 'ventos-es',
      distiller: 'Ernesto Ventos Redistillate',
      location: 'Barcelona, Spain',
      lotPrefix: 'EV-304',
      premiumMultiplier: 1.05,
    },
  ],
  hasDeclaredAllergens: true,
  allergens: [
    {
      name: 'Alpha-Isomethyl Ionone (Trace Isomer)',
      cas: '127-51-5',
      concentration: '< 0.04%',
      status: 'Restricted',
    },
    {
      name: 'd-Limonene (Pinene Precursor)',
      cas: '5989-27-5',
      concentration: '< 0.02%',
      status: 'Detected Trace',
    },
    {
      name: 'Linalool (Secondary fraction)',
      cas: '78-70-6',
      concentration: '< 0.01%',
      status: 'Detected Trace',
    },
  ],

  // Technical properties
  cas: '54464-57-2',
  fema: '2158',
  einecs: '259-174-3',
  flashPoint: '134°C (273°F)',
  boilingPoint: '286°C @ 760 mmHg',
  purityAssay: '≥ 92.5% (sum of isomers by GC-FID)',
  shelfLife: '24 Months in dark amber glass under N₂ blanket',
  logP: '5.65 (High lipophilicity)',

  // Molecular
  formula: 'C₁₆H₂₆O',
  molecularWeight: '234.38 g/mol',
  traceComponents: 'Contains 8–12% isomer-2 (Iso E Super Plus active) and <0.8% alpha-cedrene residue.',
  ecNumber: '259-174-3',

  // Accord
  accordName: 'Modern Minimalist Mineral Woods Accord (Demo)',
  accordRoleDescription:
    'Acts as the structural architectural spine, bridging ethereal citrus top notes to the macrocyclic ambergris foundation.',
  accordComponents: [
    { name: 'Iso E Super® (Current)', percentage: 38.0, isCurrentMaterial: true, color: '#D9A64C' },
    { name: 'Hedione (Methyl Dihydrojasmonate)', percentage: 26.0, isCurrentMaterial: false, color: '#8FAE7C' },
    { name: 'Ambroxan Crystals (10% DPG)', percentage: 14.0, isCurrentMaterial: false, color: '#CB8262' },
    { name: 'Bergamot Reggio Distillate', percentage: 12.0, isCurrentMaterial: false, color: '#97A574' },
    { name: 'Habanolide (Macrocyclic)', percentage: 6.0, isCurrentMaterial: false, color: '#68889E' },
    { name: 'Pink Pepper CO₂ Extract', percentage: 4.0, isCurrentMaterial: false, color: '#B66D52' },
  ],

  // Odor profile radar
  odorFacets: [
    { label: 'Woody Cedar', value: 94 },
    { label: 'Velvety Violet', value: 82 },
    { label: 'Ambergris Warmth', value: 76 },
    { label: 'Atmospheric Lift', value: 90 },
    { label: 'Mineral Fresh', value: 68 },
  ],

  // At a glance
  tenacityBlotter: '400+ Hours (Over 2 weeks on dry smelling strip)',
  maxUseLevel: '21.40% in finished compound (IFRA Cat. 4 Fine Fragrance)',
  evaporationVaporPressure: '0.001800 mmHg @ 25°C (Extremely low volatility)',
  specificGravity: '0.958 – 0.966 @ 20°C',

  // Behaviour
  behaviourNotes: {
    topHeartBase: 'Persistent Base with immediate diffusive top note resonance',
    floralSynergy: 'Dramatically expands transparent petal radiance of Rose, Jasmine, and Hedione',
    longevityFactor: 'Fixative anchor that slows evaporation of terpenes without altering their profile',
    fixativePerformance: 'Exceptionally neutral substantive matrix, imparting velvety sillage',
  },

  // Safe Handling
  ppeRequirements: [
    'Nitrile gloves (min 0.4mm thickness, EN 374)',
    'Protective chemical splash goggles (EN 166)',
    'Local vapor exhaust ventilation',
  ],
  storageConditions: 'Store in tightly sealed amber container between 15°C and 20°C. Sparge headspace with inert Nitrogen.',
  flammabilityClass: 'OSHA Combustible Liquid Class III B',

  // Network
  networkMaterials: [
    { name: 'Timbersilk (IFF)', relationship: 'High-Impact Variant', similarity: 91, olfactiveDelta: 'Enriched in high-impact gamma isomer; more ambergris-woody' },
    { name: 'Sylvamber (DRT)', relationship: 'Direct Isomer', similarity: 88, olfactiveDelta: 'Higher isomer purity (~22%), slightly denser cedar character' },
    { name: 'Orbitone (Takasago)', relationship: 'Structural Analogue', similarity: 85, olfactiveDelta: 'Subtly softer, more violet-leaning powdery nuance' },
    { name: 'Virginia Cedarwood Oil', relationship: 'Complementary Natural', similarity: 65, olfactiveDelta: 'Natural companion; provides dry sawdust and pencil-shaving authenticity' },
  ],

  // Solubility
  solubility: [
    { solvent: 'Ethanol (96% vol)', result: 'Miscible in all proportions' },
    { solvent: 'Dipropylene Glycol (DPG)', result: 'Miscible in all proportions' },
    { solvent: 'Triethyl Citrate (TEC)', result: 'Completely soluble' },
    { solvent: 'Isopropyl Myristate (IPM)', result: 'Miscible in all proportions' },
    { solvent: 'Distilled Water (20°C)', result: 'Practically insoluble', numericGPerL: '< 0.0026 g/L' },
  ],

  // Bundles
  bundles: [
    {
      id: 'b1',
      title: 'Structural Spine Formulation Kit',
      materials: ['Iso E Super (500g)', 'Ambroxan (100g)', 'Hedione HC (500g)'],
      discount: '15% Off',
      bundlePrice: 142.00,
      originalPrice: 167.00,
    },
    {
      id: 'b2',
      title: 'Modern Woody Isomer Evaluation Set',
      materials: ['Iso E Super (100g)', 'Timbersilk (100g)', 'Sylvamber (100g)'],
      discount: '10% Off',
      bundlePrice: 89.00,
      originalPrice: 99.00,
    },
  ],

  // Available tiles for full variant
  availableTiles: [
    'overview',
    'structure',
    'accord',
    'odor-profile',
    'story',
    'perfumers-notes',
    'safety-ifra',
    'safe-handling',
    'network',
    'at-a-glance',
    'allergens',
  ],
};

export const SPARSE_SPECIMEN_LINALYL_ANTHRANILATE: MaterialSpec = {
  id: 'linalyl-anthranilate-7149-26-0',
  variantKey: 'sparse',
  commercialName: 'Linalyl Anthranilate',
  chemicalName: '3,7-dimethylocta-1,6-dien-3-yl 2-aminobenzoate',
  materialType: 'synthetic',
  physicalState: 'Pale amber crystalline to viscous fluid',
  physicalStateCategory: 'crystalline',
  family: 'Orange Blossom / Heavy Floral Anthranilate',
  tags: ['Orange Blossom', 'Neroli', 'Grape Nuance', 'Base Fixative'],
  shortDescription:
    'Rich, persistent orange flower note with distinct Concord grape, narcotic gardenia, and honey undertones. Exceptional floral tenacity without the discoloration risk of methyl anthranilate.',
  longDescription:
    'Linalyl Anthranilate is an elegant specialty ester synthesizing the crisp, citrus-floral buoyancy of linalool with the deep, narcotic, indolic character of anthranilic acid. Widely prized for reconstituting authentic orange blossom, neroli, gardenia, and tuberose accords, it contributes the luscious, sweet Concord grape nuances reminiscent of natural floral pomades.\n\nCritically, unlike methyl anthranilate, linalyl anthranilate is significantly less prone to forming darkly discolored Schiff bases when formulated alongside aldehydes and macrocyclic ketones. This makes it a workhorse ingredient for perfumers seeking heavy floral fixation and sillage in white lotions, clear fine fragrances, and luxury candles without staining or color degradation.\n\nTenacity exceeds 280 hours on a paper smelling strip, acting as a substantive floral anchor that bridges luminous top notes (bergamot, petitgrain) into balsamic and woody bases.',
  oneLineSmell: 'Sweet, rich orange blossom and concord grape with honeyed floral depth.',
  strengthRating: 'High (8.0 / 10) · Substantive Heart',
  diffusionRating: 'Medium-High (7.0 / 10) · Velvety Radiance',
  imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=640&q=80',
  basePricePer100g: 48.00,
  lotNumber: 'SLT-2026-0114-A',
  stockAvailableKg: 42.0,

  // Conditional flags - Sparse variant has NO IFRA restriction, SINGLE origin (so no dropdown), NO declared allergens
  isIfraRestricted: false,
  origins: [
    {
      id: 'bedoukian-ct',
      distiller: 'Bedoukian Research Fine Chemicals',
      location: 'Danbury, Connecticut, USA',
      lotPrefix: 'BD-551',
      premiumMultiplier: 1.0,
    },
  ],
  hasDeclaredAllergens: false,

  // Technical properties
  cas: '7149-26-0',
  fema: '2637',
  einecs: '230-472-7',
  flashPoint: '> 100°C (> 212°F)',
  boilingPoint: '348°C @ 760 mmHg',
  purityAssay: '≥ 96.0% by GC',
  shelfLife: '18 Months stored under inert gas',
  logP: '4.82',

  // Molecular
  formula: 'C₁₇H₂₃NO₂',
  molecularWeight: '273.37 g/mol',
  traceComponents: 'Free linalool < 1.2%, anthranilic acid residues < 0.1%.',
  ecNumber: '230-472-7',

  // Accord
  accordName: 'Night-Blooming White Floral Heart',
  accordRoleDescription: 'Anchors white floral accords with non-discoloring indolic warmth.',
  accordComponents: [
    { name: 'Linalyl Anthranilate (Current)', percentage: 12.0, isCurrentMaterial: true, color: '#D9A64C' },
    { name: 'Neroli Bigarade Pure', percentage: 28.0, isCurrentMaterial: false, color: '#8FAE7C' },
    { name: 'Linalool Natural', percentage: 35.0, isCurrentMaterial: false, color: '#97A574' },
    { name: 'Benzyl Acetate', percentage: 15.0, isCurrentMaterial: false, color: '#68889E' },
    { name: 'Indole (1% DPG)', percentage: 10.0, isCurrentMaterial: false, color: '#CB8262' },
  ],

  // Odor profile radar
  odorFacets: [
    { label: 'Orange Blossom', value: 95 },
    { label: 'Concord Grape', value: 78 },
    { label: 'Honeyed Floral', value: 84 },
    { label: 'Narcotic Tenacity', value: 89 },
    { label: 'Balsamic Undertone', value: 62 },
  ],

  // At a glance
  tenacityBlotter: '280+ Hours on test strip',
  maxUseLevel: 'Up to 10.0% in compound (No standard IFRA ban)',
  evaporationVaporPressure: '0.000450 mmHg @ 25°C',
  specificGravity: '1.042 – 1.050 @ 20°C',

  // Behaviour
  behaviourNotes: {
    topHeartBase: 'Heart to Base note bridging citrus/petitgrain to musk',
    floralSynergy: 'Smooths pungent terpenes, extending neroli and tuberose',
    longevityFactor: 'Substantive fixative for light white florals',
    fixativePerformance: 'Much less prone to Schiff base darkening than methyl anthranilate',
  },

  // Safe Handling
  ppeRequirements: [
    'Standard chemical laboratory nitrile gloves',
    'Safety goggles with side shields',
    'Good general workspace exhaust',
  ],
  storageConditions: 'Store in cool dry space protected from light. Keep container sealed.',
  flammabilityClass: 'Combustible Liquid Class III B',

  // Network
  networkMaterials: [
    { name: 'Methyl Anthranilate', relationship: 'Direct Isomer', similarity: 75, olfactiveDelta: 'Harsher grape/neroli note; forms dark Schiff bases with aldehydes' },
    { name: 'Aurantiol (Schiff Base)', relationship: 'Structural Analogue', similarity: 82, olfactiveDelta: 'Orange flower and linden blossom; heavy viscous liquid' },
  ],

  // Solubility
  solubility: [
    { solvent: 'Ethanol (96% vol)', result: 'Freely soluble' },
    { solvent: 'Dipropylene Glycol (DPG)', result: 'Miscible' },
    { solvent: 'Distilled Water', result: 'Practically insoluble' },
  ],

  // Bundles
  bundles: [],

  // Sparse variant contains only 5 tiles:
  // Proving the reflow: no allergens tile, no origin selector, no IFRA badge, collapses to fewer larger tiles!
  availableTiles: [
    'overview',
    'structure',
    'odor-profile',
    'story',
    'safe-handling',
  ],
};
