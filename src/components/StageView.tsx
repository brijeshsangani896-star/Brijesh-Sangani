import React from 'react';
import { MaterialSpec, TileId, InteractionState } from '../types';
import { ALL_TILES_DEFINITIONS } from '../data/materials';
import { TileContentRenderer } from './widgets/TileContentRenderer';
import {
  X,
  Maximize2,
  Minimize2,
  FileSpreadsheet,
  Atom,
  Layers,
  Radar,
  Gauge,
  Activity,
  Lock,
  ShieldAlert,
  FlaskConical,
  Network,
  TestTube2,
  Package,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Grid,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  FileSpreadsheet,
  Atom,
  Layers,
  Radar,
  Gauge,
  Activity,
  Lock,
  ShieldAlert,
  FlaskConical,
  Network,
  TestTube2,
  Package,
  AlertTriangle,
};

interface StageViewProps {
  material: MaterialSpec;
  tileId: TileId;
  interactionState: InteractionState;
  onToggleFullScreen: () => void;
  onCloseStage: () => void;
  onSelectTile: (id: TileId) => void;
  onNavigateTile: (direction: 'prev' | 'next') => void;
}

export const StageView: React.FC<StageViewProps> = ({
  material,
  tileId,
  interactionState,
  onToggleFullScreen,
  onCloseStage,
  onSelectTile,
  onNavigateTile,
}) => {
  const tileDef = ALL_TILES_DEFINITIONS[tileId] || {
    id: tileId,
    label: 'Technical Data',
    iconName: 'FileSpreadsheet',
    size: 'md',
  };
  const IconComponent = ICON_MAP[tileDef.iconName] || FileSpreadsheet;
  const isFullScreen = interactionState === 'full-screen';

  const availableTiles = material.availableTiles;
  const currentIndex = availableTiles.indexOf(tileId);

  return (
    <section
      id="smelt-stage-view"
      aria-label={`${tileDef.label} detailed view`}
      className="flex-1 h-full bg-[var(--surface-card)] flex flex-col min-w-0 overflow-hidden select-none animate-fadeIn font-ui"
    >
      {/* Top Header Controls Bar */}
      <div className="h-14 border-b border-[var(--border-subtle)] px-4 flex items-center justify-between gap-3 bg-[var(--surface-elevated)] shrink-0">
        {/* Left: Box Title and Position */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-cyan)] shrink-0 shadow-xs">
            <IconComponent className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="font-accent text-[11px] text-[var(--color-gray)] flex items-center gap-1.5 uppercase tracking-wider">
              <span>Section {currentIndex + 1} of {availableTiles.length}</span>
              {tileDef.subtitle && (
                <>
                  <span>·</span>
                  <span className="truncate">{tileDef.subtitle}</span>
                </>
              )}
            </div>
            {/* H2 in Supply Mono — Bold/Medium */}
            <h2 className="font-headline text-base font-bold text-[var(--text-main)] truncate">
              {tileDef.label}
            </h2>
          </div>
        </div>

        {/* Right Navigation & Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Previous / Next Arrow Stepper */}
          <div className="flex items-center border border-[var(--border-subtle)] bg-[var(--surface-card)] rounded text-xs font-ui">
            <button
              type="button"
              onClick={() => onNavigateTile('prev')}
              disabled={currentIndex <= 0}
              className="p-1.5 px-2 hover:bg-[var(--surface-card-hover)] disabled:opacity-30 disabled:cursor-not-allowed text-[var(--color-gray)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1"
              title="Previous box"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Prev</span>
            </button>
            <span className="px-2 text-xs font-headline text-[var(--color-gray)] border-x border-[var(--border-subtle)] tabular-nums">
              {currentIndex + 1} / {availableTiles.length}
            </span>
            <button
              type="button"
              onClick={() => onNavigateTile('next')}
              disabled={currentIndex >= availableTiles.length - 1}
              className="p-1.5 px-2 hover:bg-[var(--surface-card-hover)] disabled:opacity-30 disabled:cursor-not-allowed text-[var(--color-gray)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1"
              title="Next box"
            >
              <span className="hidden lg:inline text-[11px]">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Half Screen vs Full Screen Toggle Button */}
          <button
            type="button"
            id="stage-fullscreen-toggle"
            onClick={onToggleFullScreen}
            className="px-2.5 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] text-[var(--color-gray)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 text-xs font-medium"
            title={isFullScreen ? 'Switch to Half Screen' : 'Expand to Full Screen'}
          >
            {isFullScreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
                <span className="hidden sm:inline">Half Screen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
                <span className="hidden sm:inline">Full Screen</span>
              </>
            )}
          </button>

          {/* Close to Grid Button */}
          <button
            type="button"
            id="stage-close-btn"
            onClick={onCloseStage}
            className="px-2.5 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--surface-card-hover)] text-[var(--color-gray)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Close box and return to grid"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* In Full-Screen mode: Horizontal quick-jump tab bar showing all available boxes */}
      {isFullScreen && (
        <div className="h-10 border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 flex items-center gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
          <span className="font-accent text-[11px] text-[var(--color-gray)] mr-2 shrink-0 flex items-center gap-1 uppercase tracking-wider">
            <Grid className="w-3 h-3 text-[var(--color-cyan)]" />
            <span>Jump:</span>
          </span>
          {availableTiles.map((tId) => {
            const def = ALL_TILES_DEFINITIONS[tId];
            if (!def) return null;
            const isSelected = tId === tileId;
            const Icon = ICON_MAP[def.iconName] || FileSpreadsheet;

            return (
              <button
                key={tId}
                type="button"
                onClick={() => onSelectTile(tId)}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-[var(--color-cyan)] text-[#091335] border-[var(--color-cyan)] font-bold shadow-xs'
                    : 'bg-[var(--surface-elevated)] text-[var(--color-gray)] border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--surface-card-hover)]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{def.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Expanded Content Stage */}
      <div
        id="stage-content-scroll"
        className="flex-1 overflow-y-auto p-6 bg-[var(--surface-card)]"
      >
        <div className="max-w-4xl mx-auto h-full">
          <TileContentRenderer
            tileId={tileId}
            material={material}
            isExpanded={true}
          />
        </div>
      </div>
    </section>
  );
};
