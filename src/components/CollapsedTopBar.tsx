import React, { useState } from 'react';
import { MaterialSpec, CartItem } from '../types';
import { Plus, Minus, Check, ArrowDownToLine, Droplets, ShieldAlert } from 'lucide-react';

interface CollapsedTopBarProps {
  material: MaterialSpec;
  onAddToCart: (item: CartItem) => void;
  onRestoreFromFullScreen: () => void;
}

export const CollapsedTopBar: React.FC<CollapsedTopBarProps> = ({
  material,
  onAddToCart,
  onRestoreFromFullScreen,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const unitPrice = material.basePricePer100g;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      materialId: material.id,
      materialName: material.commercialName,
      size: '100g',
      dilution: '100% (Neat)',
      origin: material.origins[0]?.distiller || 'Primary Distiller',
      quantity,
      unitPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      id="smelt-collapsed-top-bar"
      className="h-12 border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 flex items-center justify-between gap-4 shrink-0 z-10 select-none animate-fadeIn"
    >
      {/* Left: Compact thumbnail + Name + Chemical identity */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xs overflow-hidden border border-[var(--border-subtle)] shrink-0 bg-[var(--surface-elevated)]">
          <img
            src={material.imageUrl}
            alt={material.commercialName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        <div className="flex items-baseline gap-2 truncate">
          <span className="font-serif text-sm font-semibold text-[var(--text-main)] truncate">
            {material.commercialName}
            {material.trademarkSymbol}
          </span>
          <span className="font-mono text-[10px] text-[var(--accent-amber)] hidden md:inline truncate">
            {material.formula} · MW {material.molecularWeight}
          </span>
          {material.isIfraRestricted && (
            <span className="hidden lg:inline text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--color-synthetic-bg)] text-[var(--color-synthetic)] border border-[var(--color-synthetic)]/30">
              IFRA Cat. 4 Limit 21.4%
            </span>
          )}
        </div>
      </div>

      {/* Right: Price + Quantity Stepper + Add to Cart Button + Restore prompt */}
      <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
        {/* Price display */}
        <div className="text-right">
          <span className="text-[10px] text-[var(--text-muted)] mr-1">100g Neat:</span>
          <span className="font-bold text-[var(--text-main)]">${totalPrice.toFixed(2)}</span>
        </div>

        {/* Quantity Stepper */}
        <div className="flex items-center border border-[var(--border-subtle)] bg-[var(--surface-elevated)] rounded">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-6 h-7 flex items-center justify-center hover:bg-[var(--surface-card-hover)] text-[var(--text-muted)]"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <span className="w-6 text-center text-xs font-semibold text-[var(--text-main)]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-6 h-7 flex items-center justify-center hover:bg-[var(--surface-card-hover)] text-[var(--text-muted)]"
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Add to Batch Order Button */}
        <button
          type="button"
          onClick={handleAdd}
          className={`h-7 px-3 rounded font-semibold uppercase tracking-wider text-[11px] transition-all flex items-center gap-1.5 ${
            added
              ? 'bg-[var(--color-natural)] text-[#12161A]'
              : 'bg-[var(--accent-amber)] text-[#12161A] hover:opacity-90'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3 h-3" />
              <span>Added</span>
            </>
          ) : (
            <span>Add to Batch</span>
          )}
        </button>

        {/* Restore layout button */}
        <button
          type="button"
          onClick={onRestoreFromFullScreen}
          className="p-1.5 rounded hover:bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors border border-transparent hover:border-[var(--border-subtle)] text-[11px] flex items-center gap-1"
          title="Restore standard card view"
        >
          <span>Exit Fullstage</span>
        </button>
      </div>
    </div>
  );
};
