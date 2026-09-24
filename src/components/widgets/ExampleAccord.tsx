import React, { useState } from 'react';
import { MaterialSpec } from '../../types';

interface ExampleAccordProps {
  material: MaterialSpec;
  isExpanded?: boolean;
}

export const ExampleAccordWidget: React.FC<ExampleAccordProps> = ({ material, isExpanded = false }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const components = material.accordComponents;

  // Closed Teaser Mode: Stacked bar chart on left, ingredients & percentages on right
  if (!isExpanded) {
    const totalHeight = 110;
    let currentY = 0;
    const rects = components.map((comp, idx) => {
      const h = (comp.percentage / 100) * totalHeight;
      const y = currentY;
      currentY += h;
      return { ...comp, y, h, idx };
    });

    return (
      <div className="flex flex-col justify-between h-full gap-2 text-xs font-ui">
        <div>
          <span className="font-headline text-xs text-[var(--color-cyan)] font-bold tracking-wider uppercase">
            {material.accordName}
          </span>
        </div>

        <div className="flex items-center gap-4 flex-1">
          {/* Stacked Bar Chart on Left */}
          <div className="relative shrink-0 flex flex-col items-center">
            <svg width="28" height={totalHeight} className="overflow-visible rounded">
              <rect
                x="0"
                y="0"
                width="28"
                height={totalHeight}
                rx="4"
                fill="var(--surface-elevated)"
                stroke="var(--border-subtle)"
                strokeWidth="1"
              />
              {rects.map((segment) => (
                <rect
                  key={segment.name}
                  x="2"
                  y={segment.y + 1}
                  width="24"
                  height={Math.max(segment.h - 2, 3)}
                  rx="2"
                  fill={segment.isCurrentMaterial ? 'var(--color-cyan)' : segment.color}
                  fillOpacity={segment.isCurrentMaterial ? 1 : 0.8}
                  stroke={segment.isCurrentMaterial ? 'var(--text-main)' : 'none'}
                  strokeWidth={segment.isCurrentMaterial ? '1.5' : '0'}
                />
              ))}
            </svg>
            <span className="font-headline text-[10px] text-[var(--color-gray)] mt-1 font-bold tabular-nums">100%</span>
          </div>

          {/* List of Ingredients with Percentages on Right */}
          <div className="flex-1 flex flex-col justify-center gap-1.5 overflow-hidden">
            {components.slice(0, 4).map((comp, idx) => (
              <div
                key={comp.name}
                className={`flex items-center justify-between text-xs py-0.5 px-1.5 rounded transition-colors ${
                  comp.isCurrentMaterial
                    ? 'bg-[var(--surface-elevated)] font-bold text-[var(--text-main)] border-l-2 border-[var(--color-cyan)]'
                    : 'text-[var(--color-gray)]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: comp.isCurrentMaterial ? 'var(--color-cyan)' : comp.color }}
                  />
                  <span className="truncate font-ui">{comp.name}</span>
                </div>
                <span className="font-headline text-xs font-bold ml-2 text-[var(--text-main)] tabular-nums">
                  {comp.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
            {components.length > 4 && (
              <div className="font-accent text-[11px] text-[var(--color-gray)] pl-2 uppercase tracking-wider">
                +{components.length - 4} more materials
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--color-gray)] flex justify-between">
          <span className="truncate font-ui">{material.accordRoleDescription}</span>
          <span className="font-ui text-[var(--color-cyan)] font-bold shrink-0 ml-1">Expand</span>
        </div>
      </div>
    );
  }

  // Expanded Stage Mode: Detailed Formula Table and Proportional Bar
  const totalHeight = 240;
  let currentY = 0;
  const rects = components.map((comp, idx) => {
    const h = (comp.percentage / 100) * totalHeight;
    const y = currentY;
    currentY += h;
    return { ...comp, y, h, idx };
  });

  return (
    <div className="flex flex-col h-full gap-6 font-ui">
      <div className="border-b border-[var(--border-subtle)] pb-3">
        <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
          Sample Formula Accord: {material.accordName}
        </h2>
        <p className="font-ui text-xs text-[var(--color-gray)] mt-0.5">
          Demonstration fine fragrance base illustrating the structural role of {material.commercialName} in context
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Stacked bar chart on left */}
        <div className="flex flex-col items-center shrink-0 p-4 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
          <div className="font-accent text-xs uppercase tracking-wider text-[var(--color-gray)] mb-3">Formula Ratio</div>
          <svg width="48" height={totalHeight} className="overflow-visible rounded shadow-xs">
            <rect
              x="0"
              y="0"
              width="48"
              height={totalHeight}
              rx="4"
              fill="var(--surface-card)"
              stroke="var(--border-subtle)"
              strokeWidth="1.5"
            />
            {rects.map((segment) => {
              const isSelected = segment.isCurrentMaterial || hoveredIdx === segment.idx;
              return (
                <g
                  key={segment.name}
                  onMouseEnter={() => setHoveredIdx(segment.idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer"
                >
                  <rect
                    x="3"
                    y={segment.y + 1}
                    width="42"
                    height={Math.max(segment.h - 2, 4)}
                    rx="2"
                    fill={segment.isCurrentMaterial ? 'var(--color-cyan)' : segment.color}
                    fillOpacity={isSelected ? 1 : 0.85}
                    stroke={segment.isCurrentMaterial ? 'var(--text-main)' : 'none'}
                    strokeWidth={segment.isCurrentMaterial ? '2' : '0'}
                  />
                  {segment.isCurrentMaterial && (
                    <polygon
                      points={`49,${segment.y + segment.h / 2} 56,${segment.y + segment.h / 2 - 4} 56,${segment.y + segment.h / 2 + 4}`}
                      fill="var(--color-cyan)"
                    />
                  )}
                </g>
              );
            })}
          </svg>
          <span className="font-headline text-xs text-[var(--color-gray)] mt-3 tabular-nums font-bold">100.0% Total</span>
        </div>

        {/* List of ingredients with percentages on right */}
        <div className="flex-1 w-full space-y-2">
          <div className="font-accent text-xs font-bold text-[var(--color-gray)] uppercase tracking-wider mb-2">
            Component Breakdown
          </div>
          <div className="space-y-1.5">
            {components.map((comp, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={comp.name}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`flex items-center justify-between p-3 rounded transition-colors border ${
                    comp.isCurrentMaterial
                      ? 'border-[var(--color-cyan)] bg-[var(--surface-elevated)] font-bold text-[var(--text-main)] shadow-xs'
                      : isHovered
                      ? 'border-[var(--border-subtle)] bg-[var(--surface-card-hover)] text-[var(--text-main)]'
                      : 'border-transparent bg-[var(--surface-elevated)] text-[var(--color-gray)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: comp.isCurrentMaterial ? 'var(--color-cyan)' : comp.color }}
                    />
                    <div>
                      <span className={`text-sm ${comp.isCurrentMaterial ? 'text-[var(--text-main)] font-bold' : 'text-[var(--text-main)]'}`}>
                        {comp.name}
                      </span>
                      {comp.isCurrentMaterial && (
                        <span className="ml-2 font-accent text-xs font-bold px-2 py-0.5 rounded bg-[var(--color-cyan)]/20 text-[var(--color-cyan)] uppercase tracking-wider">
                          Target Specimen
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-headline text-sm font-bold text-[var(--text-main)] tabular-nums">
                      {comp.percentage.toFixed(1)}%
                    </span>
                    <span className="font-headline text-xs text-[var(--color-gray)] block tabular-nums">
                      {(comp.percentage * 10).toFixed(0)} ppt
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Role explanation */}
      <div className="p-4 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
        <div className="font-accent text-xs font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-1">
          Formulation Architecture
        </div>
        <p className="font-ui text-sm text-[var(--text-main)] leading-relaxed">
          "{material.accordRoleDescription}"
        </p>
      </div>
    </div>
  );
};
