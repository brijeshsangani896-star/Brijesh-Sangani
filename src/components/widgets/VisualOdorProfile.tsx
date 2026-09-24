import React, { useState } from 'react';
import { MaterialSpec } from '../../types';
import { BarChart3, Radar as RadarIcon } from 'lucide-react';

interface VisualOdorProfileProps {
  material: MaterialSpec;
  isExpanded?: boolean;
}

export const VisualOdorProfileWidget: React.FC<VisualOdorProfileProps> = ({ material, isExpanded = false }) => {
  const [viewMode, setViewMode] = useState<'bars' | 'radar'>('bars');
  const facets = material.odorFacets;

  // Closed teaser view: Clean, prominent horizontal bars
  if (!isExpanded) {
    return (
      <div className="flex flex-col justify-between h-full gap-2.5 font-ui">
        <div className="space-y-2.5">
          {facets.slice(0, 4).map((f) => {
            const isApex = f.value > 85;
            return (
              <div key={f.label} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-ui font-medium text-[var(--text-main)] text-xs">{f.label}</span>
                  <span className={`font-headline text-xs font-bold tabular-nums ${isApex ? 'text-[var(--color-magenta)]' : 'text-[var(--color-cyan)]'}`}>
                    {f.value}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isApex ? 'bg-[var(--color-magenta)]' : 'bg-[var(--color-cyan)]'}`}
                    style={{ width: `${f.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
          <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider">{facets.length} Facets Mapped</span>
          <span className="font-ui text-[var(--color-cyan)] font-bold">Inspect Radar</span>
        </div>
      </div>
    );
  }

  // Expanded Stage View: Complete interactive bars + optional radar view toggle
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 90;
  const count = facets.length;

  const getCoordinates = (index: number, radius: number) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / count;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const levels = [0.25, 0.5, 0.75, 1.0];
  const gridRings = levels.map((lvl) => {
    return facets
      .map((_, i) => {
        const { x, y } = getCoordinates(i, r * lvl);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  const dataPoints = facets.map((f, i) => {
    const radius = r * (Math.max(10, Math.min(100, f.value)) / 100);
    return getCoordinates(i, radius);
  });
  const dataPolygonString = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="flex flex-col h-full gap-6 font-ui">
      {/* View Switcher Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div>
          <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
            Olfactory Facet Breakdown
          </h2>
          <p className="font-ui text-xs text-[var(--color-gray)] mt-0.5">
            Measured sensory intensity across standard olfactive dimensions on clean cotton smelling strip
          </p>
        </div>

        <div className="flex items-center bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('bars')}
            className={`px-3 py-1 rounded flex items-center gap-1.5 font-medium transition-all ${
              viewMode === 'bars'
                ? 'bg-[var(--surface-card)] text-[var(--color-cyan)] font-bold shadow-xs border border-[var(--color-cyan)]/30'
                : 'text-[var(--color-gray)] hover:text-[var(--text-main)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Intensity Bars</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('radar')}
            className={`px-3 py-1 rounded flex items-center gap-1.5 font-medium transition-all ${
              viewMode === 'radar'
                ? 'bg-[var(--surface-card)] text-[var(--color-cyan)] font-bold shadow-xs border border-[var(--color-cyan)]/30'
                : 'text-[var(--color-gray)] hover:text-[var(--text-main)]'
            }`}
          >
            <RadarIcon className="w-3.5 h-3.5" />
            <span>Radar Spider</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'bars' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {facets.map((f) => {
            const isApex = f.value > 85;
            return (
              <div key={f.label} className="space-y-1.5 p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                <div className="flex justify-between items-baseline">
                  <span className="font-ui text-sm font-semibold text-[var(--text-main)]">{f.label}</span>
                  <span className={`font-headline text-sm font-bold tabular-nums ${isApex ? 'text-[var(--color-magenta)]' : 'text-[var(--color-cyan)]'}`}>
                    {f.value} / 100
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isApex ? 'bg-[var(--color-magenta)]' : 'bg-[var(--color-cyan)]'}`}
                    style={{ width: `${f.value}%` }}
                  />
                </div>
                <div className="flex justify-between font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider pt-0.5">
                  <span>Classification</span>
                  <span className={isApex ? 'text-[var(--color-magenta)] font-bold' : ''}>
                    {f.value > 85 ? 'Dominant Note' : f.value > 70 ? 'Prominent Character' : 'Secondary Accompanying Nuance'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4">
          <svg width={size} height={size} className="overflow-visible select-none">
            {gridRings.map((points, idx) => (
              <polygon
                key={`ring-${idx}`}
                points={points}
                fill="transparent"
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray={idx < 3 ? '3 3' : 'none'}
              />
            ))}
            {facets.map((_, i) => {
              const outer = getCoordinates(i, r);
              return (
                <line
                  key={`spoke-${i}`}
                  x1={cx}
                  y1={cy}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="var(--border-subtle)"
                  strokeWidth="1"
                />
              );
            })}
            <polygon
              points={dataPolygonString}
              fill="var(--color-cyan)"
              fillOpacity="0.2"
              stroke="var(--color-cyan)"
              strokeWidth="2"
            />
            {dataPoints.map((p, i) => (
              <circle
                key={`dot-${i}`}
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--bg-app)"
                stroke="var(--color-cyan)"
                strokeWidth="2"
              />
            ))}
            {facets.map((f, i) => {
              const labelCoord = getCoordinates(i, r + 24);
              const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
              const cos = Math.cos(angle);
              let textAnchor: 'middle' | 'start' | 'end' = 'middle';
              if (cos > 0.3) textAnchor = 'start';
              else if (cos < -0.3) textAnchor = 'end';

              return (
                <text
                  key={`label-${i}`}
                  x={labelCoord.x}
                  y={labelCoord.y + 3}
                  textAnchor={textAnchor}
                  fill="var(--text-main)"
                  fontSize="11"
                  fontFamily="var(--font-headline)"
                  fontWeight="bold"
                >
                  {f.label} ({f.value})
                </text>
              );
            })}
          </svg>
        </div>
      )}

      {/* Analytical Scent Synthesis Note */}
      <div className="mt-auto p-3.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs leading-relaxed text-[var(--color-gray)]">
        <span className="font-headline font-bold text-[var(--text-main)] uppercase tracking-wider mr-1.5">Evaluation Protocol:</span>
        Smelled neat at 100% and in 10% alcoholic solution across 1 hour, 6 hours, 24 hours, and 120 hours. Consensus ratings recorded across panel flavor and fragrance chemists.
      </div>
    </div>
  );
};
