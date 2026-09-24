/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ThemeMode,
  InteractionState,
  MaterialVariantType,
  TileId,
  CartItem,
  MaterialSpec,
} from './types';
import {
  FULL_SPECIMEN_ISO_E_SUPER,
  SPARSE_SPECIMEN_LINALYL_ANTHRANILATE,
} from './data/materials';
import { TopBar } from './components/TopBar';
import { ProductCard } from './components/ProductCard';
import { TileGrid } from './components/TileGrid';
import { RailView } from './components/RailView';
import { StageView } from './components/StageView';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  // Theme: 'dark' ("lab-at-night") or 'light' ("specimen paper")
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Variant: 'full' (11 boxes) or 'sparse' (5 boxes)
  const [variant, setVariant] = useState<MaterialVariantType>('full');

  // Interaction State: 'grid' | 'half-screen' | 'full-screen'
  // Show three screens: the closed grid, one box opened to half the screen, and one box opened to full screen
  const [interactionState, setInteractionState] = useState<InteractionState>('grid');

  // Staged Tile Id (when in half-screen or full-screen)
  const [stagedTileId, setStagedTileId] = useState<TileId>('structure');

  // Wishlist state
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({
    'iso-e-super-54464-57-2': true,
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      materialId: 'iso-e-super-54464-57-2',
      materialName: 'Iso E Super®',
      size: '500g',
      dilution: '100% (Neat)',
      origin: 'IFF Union Beach Synthesis',
      quantity: 1,
      unitPrice: 148.35,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Active Material based on current variant
  const currentMaterial: MaterialSpec =
    variant === 'full' ? FULL_SPECIMEN_ISO_E_SUPER : SPARSE_SPECIMEN_LINALYL_ANTHRANILATE;

  // Handle Variant Switching
  const handleSelectVariant = (newVariant: MaterialVariantType) => {
    setVariant(newVariant);
    const targetMaterial =
      newVariant === 'full' ? FULL_SPECIMEN_ISO_E_SUPER : SPARSE_SPECIMEN_LINALYL_ANTHRANILATE;
    // If the currently staged tile is not available in the new variant, switch to 'overview'
    if (!targetMaterial.availableTiles.includes(stagedTileId)) {
      setStagedTileId('overview');
    }
  };

  // Handle Tile Click in Grid -> opens to half-screen stage
  const handleTileClick = (tileId: TileId) => {
    setStagedTileId(tileId);
    setInteractionState('half-screen');
  };

  // Toggle between half-screen and full-screen stage
  const handleToggleFullScreen = () => {
    setInteractionState((prev) => (prev === 'full-screen' ? 'half-screen' : 'full-screen'));
  };

  // Close stage -> returns to closed grid
  const handleCloseStage = () => {
    setInteractionState('grid');
  };

  // Navigate next/prev tile inside stage
  const handleNavigateTile = (direction: 'prev' | 'next') => {
    const available = currentMaterial.availableTiles;
    const currIdx = available.indexOf(stagedTileId);
    if (currIdx === -1) return;
    if (direction === 'prev' && currIdx > 0) {
      setStagedTileId(available[currIdx - 1]);
    } else if (direction === 'next' && currIdx < available.length - 1) {
      setStagedTileId(available[currIdx + 1]);
    }
  };

  // Wishlist toggle
  const handleToggleWishlist = () => {
    setWishlist((prev) => ({
      ...prev,
      [currentMaterial.id]: !prev[currentMaterial.id],
    }));
  };

  // Cart actions
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [item, ...prev]);
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'theme-dark' : 'theme-light'
      } w-screen h-screen overflow-hidden flex flex-col bg-[var(--bg-app)] text-[var(--text-main)] font-ui transition-colors duration-200`}
    >
      {/* 1. Top Header with 3-Screens Switcher, Variant Reflow Switcher, Theme & Cart */}
      <TopBar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        variant={variant}
        onSelectVariant={handleSelectVariant}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        commercialName={currentMaterial.commercialName}
        chemicalName={currentMaterial.chemicalName}
        interactionState={interactionState}
        onSetInteractionState={setInteractionState}
      />

      {/* 2. Workspace: Non-scrolling page with persistent Product Card on the left in ALL THREE states */}
      <main
        id="smelt-main-workspace"
        className="flex-1 flex overflow-hidden relative"
      >
        {/* LEFT REGION: Product Card stays visible in ALL THREE screens (closed grid, half screen, full screen) */}
        <ProductCard
          material={currentMaterial}
          onAddToCart={handleAddToCart}
          isWishlisted={!!wishlist[currentMaterial.id]}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* RIGHT REGION:
            - Screen 1: Closed Grid of teaser boxes
            - Screen 2: Half Screen (Navigation Rail in middle + Staged Box on right)
            - Screen 3: Full Screen (Staged Box filling 100% of remaining width with quick-jump tabs) */}
        {interactionState === 'grid' && (
          <TileGrid
            material={currentMaterial}
            onTileClick={handleTileClick}
          />
        )}

        {interactionState === 'half-screen' && (
          <div className="flex-1 flex h-full overflow-hidden">
            {/* Navigation rail to jump to any box */}
            <RailView
              material={currentMaterial}
              stagedTileId={stagedTileId}
              onSelectTile={(tileId) => setStagedTileId(tileId)}
            />

            {/* Opened box occupying the half-screen stage */}
            <StageView
              material={currentMaterial}
              tileId={stagedTileId}
              interactionState="half-screen"
              onToggleFullScreen={handleToggleFullScreen}
              onCloseStage={handleCloseStage}
              onSelectTile={(tileId) => setStagedTileId(tileId)}
              onNavigateTile={handleNavigateTile}
            />
          </div>
        )}

        {interactionState === 'full-screen' && (
          <div className="flex-1 flex h-full overflow-hidden">
            {/* Staged box filling the full remaining screen width */}
            <StageView
              material={currentMaterial}
              tileId={stagedTileId}
              interactionState="full-screen"
              onToggleFullScreen={handleToggleFullScreen}
              onCloseStage={handleCloseStage}
              onSelectTile={(tileId) => setStagedTileId(tileId)}
              onNavigateTile={handleNavigateTile}
            />
          </div>
        )}
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
