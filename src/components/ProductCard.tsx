import React, { useState } from 'react';
import {
  MaterialSpec,
  PackageSize,
  DilutionOption,
  OriginOption,
  CartItem,
} from '../types';
import {
  Heart,
  Droplets,
  ShieldAlert,
  Plus,
  Minus,
  Check,
  ChevronDown,
  FlaskConical,
} from 'lucide-react';

interface ProductCardProps {
  material: MaterialSpec;
  onAddToCart: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  material,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<PackageSize>('100g');
  const [selectedOrigin, setSelectedOrigin] = useState<OriginOption>(material.origins[0]);
  const [selectedDilution, setSelectedDilution] = useState<DilutionOption>('100% (Neat)');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // When material changes (e.g. variant switched), sync origin if needed
  React.useEffect(() => {
    setSelectedOrigin(material.origins[0]);
    setImageError(false);
  }, [material]);

  // Size multipliers
  const sizeMultipliers: Record<PackageSize, number> = {
    '25g': 0.35,
    '100g': 1.0,
    '500g': 4.3,
    '1kg': 8.0,
    '5kg Drum': 36.0,
  };

  // Dilution multipliers (dilutions reduce neat material cost, plus formulation base fee)
  const dilutionMultipliers: Record<DilutionOption, number> = {
    '100% (Neat)': 1.0,
    '50% in DPG': 0.65,
    '10% in TEC': 0.32,
    '1% in IPM': 0.18,
  };

  const originMultiplier = selectedOrigin?.premiumMultiplier || 1.0;
  const unitPrice =
    material.basePricePer100g *
    sizeMultipliers[selectedSize] *
    dilutionMultipliers[selectedDilution] *
    originMultiplier;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      materialId: material.id,
      materialName: material.commercialName,
      size: selectedSize,
      dilution: selectedDilution,
      origin: selectedOrigin?.distiller || 'Standard Lab Distillate',
      quantity,
      unitPrice,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <aside
      id="smelt-product-card"
      className="w-[326px] shrink-0 h-full border-r border-[var(--border-subtle)] bg-[var(--surface-card)] flex flex-col overflow-y-auto select-none font-ui"
    >
      {/* 1. Horizontal Product Image with Wishlist Icon Overlaid */}
      <div className="relative w-full h-44 bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] overflow-hidden shrink-0 group">
        {!imageError ? (
          <img
            src={material.imageUrl}
            alt={material.commercialName}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover grayscale contrast-125 opacity-85 group-hover:scale-102 transition-all duration-500"
          />
        ) : (
          /* High-fidelity scientific fallback SVG with Cyan accent */
          <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--surface-elevated)] p-4 relative">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1CE2D8_1px,transparent_1px)] [background-size:16px_16px]" />
            <FlaskConical className="w-12 h-12 text-[var(--color-cyan)] opacity-70 mb-2 relative z-10" />
            <span className="font-headline text-xs font-bold text-[var(--text-main)] relative z-10 uppercase tracking-wider">
              {material.commercialName}
            </span>
            <span className="font-accent text-[10px] text-[var(--color-gray)] relative z-10 tracking-widest mt-0.5">
              LAB SPECIMEN #{material.lotNumber}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] via-transparent to-black/20 pointer-events-none" />

        {/* Lot Tag Overlay Bottom-Left */}
        <div className="absolute bottom-2.5 left-2.5 font-accent text-[11px] px-2 py-0.5 rounded bg-[var(--surface-card)]/90 text-[var(--color-gray)] border border-[var(--border-subtle)] uppercase tracking-wider">
          LOT #{material.lotNumber}
        </div>

        {/* Wishlist Icon Top-Right */}
        <button
          type="button"
          id="product-wishlist-toggle"
          onClick={onToggleWishlist}
          aria-label="Save material to wishlist"
          className={`absolute top-2.5 right-2.5 p-2 rounded-full border transition-all ${
            isWishlisted
              ? 'bg-[var(--color-magenta)]/20 text-[var(--color-magenta)] border-[var(--color-magenta)] shadow-xs'
              : 'bg-[var(--surface-card)]/80 text-[var(--color-gray)] border-[var(--border-subtle)] hover:text-[var(--color-magenta)]'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* 2. Identity Block */}
      <div className="p-4 space-y-4 flex-1">
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Synthetic vs Natural Badge */}
          <span className="font-accent text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-[var(--color-gray)] border border-[var(--border-subtle)]">
            {material.materialType === 'synthetic' ? 'SYNTHETIC ISOLATE' : 'NATURAL EXTRACT'}
          </span>

          {/* Physical-state icon + label */}
          <span className="font-accent text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-[var(--color-gray)] border border-[var(--border-subtle)] flex items-center gap-1.5">
            <Droplets className="w-3 h-3 text-[var(--color-cyan)]" />
            <span>{material.physicalStateCategory}</span>
          </span>

          {/* IFRA-restricted badge (rendered with magenta accent when restricted) */}
          {material.isIfraRestricted && (
            <span className="font-accent text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-magenta)]/15 text-[var(--color-magenta)] border border-[var(--color-magenta)]/30 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              <span>IFRA RESTRICTED</span>
            </span>
          )}
        </div>

        {/* Chemical Name + Commercial Name */}
        <div>
          {/* Long chemical name in small italic type above the short commercial name */}
          <div className="font-ui text-xs text-[var(--color-gray)] leading-relaxed line-clamp-2 mb-1">
            {material.chemicalName}
          </div>
          {/* H1 in Supply Mono — Bold — large editorial scale */}
          <h1 className="font-headline text-2xl font-bold text-[var(--text-main)] tracking-tight flex items-baseline">
            {material.commercialName}
            {material.trademarkSymbol && (
              <span className="font-ui text-xs font-normal text-[var(--color-gray)] ml-1">
                {material.trademarkSymbol}
              </span>
            )}
          </h1>
          {/* Material family line */}
          <div className="font-accent text-xs tracking-wider uppercase text-[var(--color-cyan)] mt-1.5 font-medium">
            {material.family}
          </div>
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-1.5">
          {material.tags.map((tag) => (
            <span
              key={tag}
              className="font-ui text-xs px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-[var(--color-gray)] border border-[var(--border-subtle)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Short description in Roboto, set off with a left cyan accent rule */}
        <div className="border-l-2 border-[var(--color-cyan)] pl-3 py-1">
          <p className="font-ui text-xs text-[var(--text-main)] leading-relaxed">
            "{material.shortDescription}"
          </p>
        </div>

        {/* Selectors Section */}
        <div className="space-y-3.5 pt-3 border-t border-[var(--border-subtle)]">
          {/* Size Selector (Segmented Buttons) */}
          <div>
            <div className="flex justify-between items-center text-xs text-[var(--color-gray)] mb-1.5">
              <span className="font-medium">Package Size</span>
              <span className="font-headline text-[11px] tabular-nums">In stock: {material.stockAvailableKg} kg</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-medium">
              {(['25g', '100g', '500g', '1kg'] as PackageSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 rounded text-center transition-all border font-headline text-xs ${
                    selectedSize === size
                      ? 'bg-[var(--surface-elevated)] border-[var(--color-cyan)] text-[var(--color-cyan)] font-bold shadow-xs'
                      : 'border-[var(--border-subtle)] text-[var(--color-gray)] hover:text-[var(--text-main)] hover:bg-[var(--surface-card-hover)]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Origin Selector (Dropdown - ONLY rendered if material has >1 origin) */}
          {material.origins.length > 1 && (
            <div>
              <div className="text-xs font-medium text-[var(--color-gray)] mb-1">
                Distiller / Origin
              </div>
              <div className="relative">
                <select
                  value={selectedOrigin?.id}
                  onChange={(e) => {
                    const found = material.origins.find((o) => o.id === e.target.value);
                    if (found) setSelectedOrigin(found);
                  }}
                  className="w-full appearance-none bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded p-2 pr-8 text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--color-cyan)] cursor-pointer"
                >
                  {material.origins.map((org) => (
                    <option key={org.id} value={org.id} className="bg-[var(--surface-card)]">
                      {org.distiller} ({org.location})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-gray)] pointer-events-none" />
              </div>
            </div>
          )}

          {/* Dilution Selector (Dropdown: 100/50/10/1%) */}
          <div>
            <div className="flex justify-between items-center text-xs text-[var(--color-gray)] mb-1">
              <span className="font-medium">Dilution</span>
              <span className="font-accent text-[11px] text-[var(--color-gray)] tracking-wider">SOLVENT MATRIX</span>
            </div>
            <div className="relative">
              <select
                value={selectedDilution}
                onChange={(e) => setSelectedDilution(e.target.value as DilutionOption)}
                className="w-full appearance-none bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded p-2 pr-8 text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--color-cyan)] cursor-pointer"
              >
                <option value="100% (Neat)" className="bg-[var(--surface-card)]">100% (Neat)</option>
                <option value="50% in DPG" className="bg-[var(--surface-card)]">50% in DPG</option>
                <option value="10% in TEC" className="bg-[var(--surface-card)]">10% in TEC</option>
                <option value="1% in IPM" className="bg-[var(--surface-card)]">1% in IPM</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-gray)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. Buy Row */}
        <div className="pt-3.5 border-t border-[var(--border-subtle)] space-y-3 mt-auto">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[var(--color-gray)] font-medium">Price</span>
            <div className="text-right">
              <span className="font-headline text-xl font-bold text-[var(--text-main)] tabular-nums">
                ${totalPrice.toFixed(2)}
              </span>
              <span className="font-headline text-xs text-[var(--color-gray)] block tabular-nums">
                (${unitPrice.toFixed(2)} / {selectedSize})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[var(--border-subtle)] bg-[var(--surface-elevated)] rounded text-xs shrink-0">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-9 flex items-center justify-center hover:bg-[var(--surface-card-hover)] text-[var(--color-gray)] hover:text-[var(--text-main)] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-headline font-bold text-[var(--text-main)] text-sm tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-9 flex items-center justify-center hover:bg-[var(--surface-card-hover)] text-[var(--color-gray)] hover:text-[var(--text-main)] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart button in Roboto Bold + Cyan brand highlight */}
            <button
              type="button"
              id="add-to-cart-btn"
              onClick={handleAddToCart}
              className={`flex-1 h-9 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs ${
                addedAnimation
                  ? 'bg-[var(--color-cyan)] text-[#091335]'
                  : 'bg-[var(--color-cyan)] text-[#091335] hover:brightness-110 active:scale-[0.98]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <span>Add to Cart</span>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between font-accent text-[11px] text-[var(--color-gray)] pt-1 uppercase tracking-wider">
            <span>CoA & GC-MS Included</span>
            <span>Amber Glass Bottle</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
