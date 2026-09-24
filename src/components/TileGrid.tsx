import React from 'react';
import { MaterialSpec, TileId } from '../types';
import { ALL_TILES_DEFINITIONS } from '../data/materials';
import { TileContentRenderer } from './widgets/TileContentRenderer';
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
  ArrowUpRight,
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

interface TileGridProps {
  material: MaterialSpec;
  onTileClick: (tileId: TileId) => void;
}

export const TileGrid: React.FC<TileGridProps> = ({ material, onTileClick }) => {
  const isSparse = material.variantKey === 'sparse';
  const availableTiles = material.availableTiles;

  // Dynamic grid spanning classes to prevent any gaps or holes
  const getTileSpanClasses = (tileId: TileId) => {
    if (isSparse) {
      // 5 tiles cleanly filling 2 rows in a 6-column grid:
      // Row 1: overview (3 cols), structure (3 cols)
      // Row 2: odor-profile (2 cols), story (2 cols), safe-handling (2 cols)
      switch (tileId) {
        case 'overview':
          return 'col-span-1 md:col-span-3 min-h-[220px]';
        case 'structure':
          return 'col-span-1 md:col-span-3 min-h-[220px]';
        case 'odor-profile':
          return 'col-span-1 md:col-span-2 min-h-[210px]';
        case 'story':
          return 'col-span-1 md:col-span-2 min-h-[210px]';
        case 'safe-handling':
          return 'col-span-1 md:col-span-2 min-h-[210px]';
        default:
          return 'col-span-1 md:col-span-2 min-h-[200px]';
      }
    }

    // Full variant (11 tiles) in 12-column grid:
    switch (tileId) {
      case 'overview':
        return 'col-span-1 md:col-span-4 min-h-[190px]';
      case 'structure':
        return 'col-span-1 md:col-span-4 min-h-[190px]';
      case 'odor-profile':
        return 'col-span-1 md:col-span-4 min-h-[190px]';
      case 'accord':
        return 'col-span-1 md:col-span-4 min-h-[190px]';
      case 'story':
        return 'col-span-1 md:col-span-4 min-h-[190px]';
      case 'perfumers-notes':
        return 'col-span-1 md:col-span-4 min-h-[190px]';
      case 'safety-ifra':
        return 'col-span-1 md:col-span-3 min-h-[175px]';
      case 'safe-handling':
        return 'col-span-1 md:col-span-3 min-h-[175px]';
      case 'network':
        return 'col-span-1 md:col-span-3 min-h-[175px]';
      case 'at-a-glance':
        return 'col-span-1 md:col-span-3 min-h-[175px]';
      case 'allergens':
        return 'col-span-1 md:col-span-12 min-h-[110px]';
      default:
        return 'col-span-1 md:col-span-4 min-h-[180px]';
    }
  };

  return (
    <div
      id="smelt-tile-grid-container"
      className="flex-1 h-full overflow-y-auto p-4 bg-[var(--bg-app)] flex flex-col justify-start font-ui"
    >
      <div className={`grid grid-cols-1 ${isSparse ? 'md:grid-cols-6' : 'md:grid-cols-12'} gap-3 w-full`}>
        {availableTiles.map((tileId) => {
          const tileDef = ALL_TILES_DEFINITIONS[tileId];
          if (!tileDef) return null;
          const IconComponent = ICON_MAP[tileDef.iconName] || FileSpreadsheet;
          const spanClasses = getTileSpanClasses(tileId);

          return (
            <article
              key={tileId}
              id={`tile-${tileId}`}
              onClick={() => onTileClick(tileId)}
              className={`${spanClasses} bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--color-cyan)]/60 rounded-md p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:shadow-md relative overflow-hidden`}
              title={`Click to open ${tileDef.label}`}
            >
              {/* Tile Header: Title, Subtitle, and Open Arrow */}
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[var(--border-subtle)] shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-cyan)] shrink-0 group-hover:bg-[var(--color-cyan)] group-hover:text-[#091335] transition-colors">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-ui text-xs font-bold text-[var(--text-main)] truncate group-hover:text-[var(--color-cyan)] transition-colors">
                      {tileDef.label}
                    </h3>
                    {tileDef.subtitle && (
                      <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider truncate block">
                        {tileDef.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                {/* Click-to-open affordance */}
                <div className="w-6 h-6 rounded-full bg-[var(--surface-elevated)] group-hover:bg-[var(--color-cyan)] group-hover:text-[#091335] text-[var(--color-gray)] flex items-center justify-center transition-all shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Teaser Content (Short preview, larger type, fewer words) */}
              <div className="flex-1 pt-2.5 flex flex-col justify-between">
                <TileContentRenderer
                  tileId={tileId}
                  material={material}
                  isExpanded={false}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
