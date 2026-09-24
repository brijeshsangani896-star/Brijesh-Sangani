import React from 'react';
import { MaterialSpec, TileId } from '../types';
import { ALL_TILES_DEFINITIONS } from '../data/materials';
import {
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

interface RailViewProps {
  material: MaterialSpec;
  stagedTileId: TileId;
  onSelectTile: (id: TileId) => void;
  isIconOnly?: boolean;
}

export const RailView: React.FC<RailViewProps> = ({
  material,
  stagedTileId,
  onSelectTile,
  isIconOnly = false,
}) => {
  const availableTileIds = material.availableTiles;

  return (
    <nav
      id="smelt-compressed-rail"
      aria-label="Section navigation rail"
      className="w-52 shrink-0 h-full border-r border-[var(--border-subtle)] bg-[var(--surface-card)] flex flex-col py-3 overflow-y-auto select-none font-ui"
    >
      <div className="px-3 pb-2.5 mb-1.5 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <span className="font-headline text-xs font-bold text-[var(--text-main)] tracking-wider uppercase">
          Sections
        </span>
        <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider">
          {availableTileIds.length} UNITS
        </span>
      </div>

      <div className="flex flex-col gap-1 px-2 flex-1">
        {availableTileIds.map((tileId) => {
          const tileDef = ALL_TILES_DEFINITIONS[tileId];
          if (!tileDef) return null;
          const IconComponent = ICON_MAP[tileDef.iconName] || FileSpreadsheet;
          const isActive = stagedTileId === tileId;

          return (
            <button
              key={tileId}
              type="button"
              onClick={() => onSelectTile(tileId)}
              title={tileDef.label}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-all ${
                isActive
                  ? 'bg-[var(--surface-elevated)] text-[var(--color-cyan)] font-semibold shadow-xs border-l-2 border-[var(--color-cyan)]'
                  : 'text-[var(--color-gray)] hover:text-[var(--text-main)] hover:bg-[var(--surface-card-hover)] border-l-2 border-transparent'
              }`}
            >
              <IconComponent
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[var(--color-cyan)]' : 'text-[var(--color-gray)]'
                }`}
              />
              <span className="truncate text-xs font-medium font-ui">
                {tileDef.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
