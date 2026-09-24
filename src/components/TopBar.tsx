import React from 'react';
import { ThemeMode, MaterialVariantType, CartItem, InteractionState } from '../types';
import { Moon, Sun, ShoppingBag, ChevronRight, LayoutGrid, Columns2, Maximize } from 'lucide-react';

interface TopBarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  variant: MaterialVariantType;
  onSelectVariant: (variant: MaterialVariantType) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  commercialName: string;
  chemicalName: string;
  interactionState: InteractionState;
  onSetInteractionState: (state: InteractionState) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  theme,
  onToggleTheme,
  variant,
  onSelectVariant,
  cart,
  onOpenCart,
  commercialName,
  interactionState,
  onSetInteractionState,
}) => {
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      id="smelt-top-bar"
      className="h-13 border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 flex items-center justify-between gap-4 select-none shrink-0 z-20 font-ui"
    >
      {/* Left: SMELT brand + Category Breadcrumb */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="font-headline text-sm font-bold tracking-widest text-[var(--text-main)] uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-xs bg-[var(--color-cyan)] inline-block shadow-[0_0_8px_rgba(28,226,216,0.4)]" />
            SMELT
          </span>
          <span className="font-accent text-xs text-[var(--color-gray)] border-l border-[var(--border-subtle)] pl-2.5 hidden sm:inline-block tracking-wider uppercase">
            Lab Data Specimen System
          </span>
        </div>

        {/* Breadcrumb to current material */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs text-[var(--text-muted)] truncate border-l border-[var(--border-subtle)] pl-3">
          <span>Catalog</span>
          <ChevronRight className="w-3 h-3 text-[var(--text-muted)]" />
          <span>{variant === 'full' ? 'Aroma Chemicals' : 'Floral Esters'}</span>
          <ChevronRight className="w-3 h-3 text-[var(--text-muted)]" />
          <span className="font-headline text-xs font-semibold text-[var(--text-main)]">{commercialName}</span>
        </nav>
      </div>

      {/* Center: 3 Screens Interactive Demonstrator */}
      <div className="flex items-center gap-1 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-1 rounded-md">
        <span className="font-accent text-[11px] text-[var(--text-muted)] px-2 hidden md:inline uppercase tracking-wider">
          Viewport:
        </span>
        <button
          type="button"
          id="screen-view-grid"
          onClick={() => onSetInteractionState('grid')}
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            interactionState === 'grid'
              ? 'bg-[var(--surface-card)] text-[var(--color-cyan)] font-semibold shadow-xs border border-[var(--color-cyan)]/30'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
          title="Screen 1: Closed grid of teaser boxes"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Closed Grid</span>
        </button>

        <button
          type="button"
          id="screen-view-half"
          onClick={() => onSetInteractionState('half-screen')}
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            interactionState === 'half-screen'
              ? 'bg-[var(--surface-card)] text-[var(--color-cyan)] font-semibold shadow-xs border border-[var(--color-cyan)]/30'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
          title="Screen 2: One box opened to half screen with navigation rail"
        >
          <Columns2 className="w-3.5 h-3.5" />
          <span>Half Screen</span>
        </button>

        <button
          type="button"
          id="screen-view-full"
          onClick={() => onSetInteractionState('full-screen')}
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            interactionState === 'full-screen'
              ? 'bg-[var(--surface-card)] text-[var(--color-cyan)] font-semibold shadow-xs border border-[var(--color-cyan)]/30'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
          title="Screen 3: One box opened to full screen"
        >
          <Maximize className="w-3.5 h-3.5" />
          <span>Full Screen</span>
        </button>
      </div>

      {/* Right: Data Density Switcher + Theme Toggle + Cart */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Dynamic reflow material switcher */}
        <div className="hidden sm:flex items-center bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-0.5 rounded-md text-xs font-medium">
          <button
            type="button"
            id="variant-switch-full"
            onClick={() => onSelectVariant('full')}
            className={`px-2.5 py-1 rounded transition-all ${
              variant === 'full'
                ? 'bg-[var(--surface-card)] text-[var(--color-cyan)] font-semibold shadow-xs border border-[var(--color-cyan)]/30'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
            title="Material with rich technical data (11 boxes)"
          >
            Full (11 Boxes)
          </button>

          <button
            type="button"
            id="variant-switch-sparse"
            onClick={() => onSelectVariant('sparse')}
            className={`px-2.5 py-1 rounded transition-all ${
              variant === 'sparse'
                ? 'bg-[var(--surface-card)] text-[var(--color-cyan)] font-semibold shadow-xs border border-[var(--color-cyan)]/30'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
            title="Material with sparse data (5 boxes) proving gapless reflow"
          >
            Sparse (5 Boxes)
          </button>
        </div>

        {/* Theme Toggle: Dark ('lab-at-night' / Deep Navy) / Light ('specimen paper' / White & Light Neutral) */}
        <button
          type="button"
          id="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label="Toggle visual theme"
          className="p-1.5 px-2.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-main)] hover:bg-[var(--surface-card-hover)] transition-colors flex items-center gap-1.5 text-xs font-medium"
          title={theme === 'dark' ? 'Switch to Light ("specimen paper")' : 'Switch to Dark ("lab-at-night")'}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
              <span className="text-xs hidden md:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-[var(--color-navy)]" />
              <span className="text-xs hidden md:inline">Dark</span>
            </>
          )}
        </button>

        {/* Cart Button */}
        <button
          type="button"
          id="cart-drawer-toggle-btn"
          onClick={onOpenCart}
          className="relative py-1.5 px-3 rounded border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-card-hover)] text-[var(--text-main)] text-xs font-medium flex items-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
          <span className="hidden sm:inline">Cart</span>
          {totalCartItems > 0 && (
            <span className="w-4 h-4 rounded-full bg-[var(--color-cyan)] text-[#091335] font-bold text-[10px] flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
