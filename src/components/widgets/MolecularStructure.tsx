import React from 'react';
import { MaterialSpec } from '../../types';

interface MolecularStructureProps {
  material: MaterialSpec;
  isExpanded?: boolean;
}

export const MolecularStructureWidget: React.FC<MolecularStructureProps> = ({ material, isExpanded = false }) => {
  const isIsoE = material.id.includes('iso-e-super');

  // Closed Teaser Mode: Structure SVG on left, Formula & Molecular Weight on right
  if (!isExpanded) {
    return (
      <div className="flex flex-col justify-between h-full gap-2 text-xs font-ui">
        <div className="flex items-center gap-4 flex-1">
          {/* Structure SVG */}
          <div className="w-28 h-20 shrink-0 p-1.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
            <svg
              viewBox="0 0 240 140"
              className="w-full h-full stroke-[var(--text-main)] fill-none stroke-linecap-round stroke-linejoin-round"
            >
              {isIsoE ? (
                <g strokeWidth="2.4">
                  <polygon points="50,45 85,25 120,45 120,85 85,105 50,85" />
                  <polygon points="120,45 155,25 190,45 190,85 155,105 120,85" />
                  <line x1="90" y1="32" x2="115" y2="48" strokeWidth="1.8" />
                  <line x1="50" y1="45" x2="25" y2="35" />
                  <line x1="50" y1="45" x2="35" y2="65" />
                  <line x1="85" y1="105" x2="85" y2="128" />
                  <line x1="155" y1="105" x2="155" y2="128" />
                  <line x1="190" y1="45" x2="218" y2="30" />
                  <line x1="218" y1="30" x2="232" y2="38" />
                  <line x1="216" y1="30" x2="222" y2="12" stroke="var(--color-cyan)" />
                  <line x1="220" y1="32" x2="226" y2="14" stroke="var(--color-cyan)" />
                  <text x="224" y="10" fill="var(--color-cyan)" stroke="none" fontSize="11" fontWeight="bold">
                    O
                  </text>
                </g>
              ) : (
                <g strokeWidth="2.4">
                  <polygon points="45,45 75,28 105,45 105,80 75,98 45,80" />
                  <circle cx="75" cy="62" r="18" strokeDasharray="3 3" strokeWidth="1.5" />
                  <line x1="45" y1="80" x2="25" y2="92" />
                  <text x="5" y="102" fill="var(--color-cyan)" stroke="none" fontSize="11" fontWeight="bold">
                    NH₂
                  </text>
                  <line x1="105" y1="45" x2="135" y2="28" />
                  <line x1="133" y1="28" x2="133" y2="10" stroke="var(--color-cyan)" />
                  <line x1="137" y1="28" x2="137" y2="10" stroke="var(--color-cyan)" />
                  <text x="131" y="8" fill="var(--color-cyan)" stroke="none" fontSize="11" fontWeight="bold">O</text>
                  <line x1="135" y1="28" x2="160" y2="42" />
                  <polyline points="168,48 190,40 205,55 225,45 235,58" />
                  <line x1="190" y1="40" x2="192" y2="22" />
                  <line x1="205" y1="55" x2="208" y2="70" />
                </g>
              )}
            </svg>
          </div>

          {/* Formula & Molecular Weight */}
          <div className="flex-1 space-y-1.5">
            <div>
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Formula</span>
              <span className="font-headline text-sm font-bold text-[var(--color-cyan)]">{material.formula}</span>
            </div>
            <div>
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Molecular Weight</span>
              <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.molecularWeight}</span>
            </div>
          </div>
        </div>

        {/* Trace note */}
        <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--color-gray)] flex justify-between items-center">
          <span className="truncate font-accent uppercase tracking-wider">{material.purityAssay}</span>
          <span className="font-ui text-[var(--color-cyan)] font-bold shrink-0 ml-2">Inspect</span>
        </div>
      </div>
    );
  }

  // Expanded Stage View: Large structural diagram + thorough chemical data
  return (
    <div className="flex flex-col h-full gap-6 font-ui">
      <div className="border-b border-[var(--border-subtle)] pb-3">
        <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
          Chemical Identity & Stereochemistry
        </h2>
        <p className="font-ui text-xs text-[var(--color-gray)] mt-0.5">
          Skeletal structure representation, isomeric isomer distribution, and elemental composition
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Large SVG Diagram */}
        <div className="p-6 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 240 140"
            className="w-full h-44 stroke-[var(--text-main)] fill-none stroke-linecap-round stroke-linejoin-round"
          >
            {isIsoE ? (
              <g strokeWidth="2.4">
                <polygon points="50,45 85,25 120,45 120,85 85,105 50,85" />
                <polygon points="120,45 155,25 190,45 190,85 155,105 120,85" />
                <line x1="90" y1="32" x2="115" y2="48" strokeWidth="1.8" />
                <line x1="50" y1="45" x2="25" y2="35" />
                <line x1="50" y1="45" x2="35" y2="65" />
                <line x1="85" y1="105" x2="85" y2="128" />
                <line x1="155" y1="105" x2="155" y2="128" />
                <line x1="190" y1="45" x2="218" y2="30" />
                <line x1="218" y1="30" x2="232" y2="38" />
                <line x1="216" y1="30" x2="222" y2="12" stroke="var(--color-cyan)" />
                <line x1="220" y1="32" x2="226" y2="14" stroke="var(--color-cyan)" />
                <text x="224" y="10" fill="var(--color-cyan)" stroke="none" fontSize="12" fontWeight="bold">
                  O
                </text>
              </g>
            ) : (
              <g strokeWidth="2.4">
                <polygon points="45,45 75,28 105,45 105,80 75,98 45,80" />
                <circle cx="75" cy="62" r="18" strokeDasharray="3 3" strokeWidth="1.5" />
                <line x1="45" y1="80" x2="25" y2="92" />
                <text x="5" y="102" fill="var(--color-cyan)" stroke="none" fontSize="12" fontWeight="bold">
                  NH₂
                </text>
                <line x1="105" y1="45" x2="135" y2="28" />
                <line x1="133" y1="28" x2="133" y2="10" stroke="var(--color-cyan)" />
                <line x1="137" y1="28" x2="137" y2="10" stroke="var(--color-cyan)" />
                <text x="131" y="8" fill="var(--color-cyan)" stroke="none" fontSize="12" fontWeight="bold">O</text>
                <line x1="135" y1="28" x2="160" y2="42" />
                <polyline points="168,48 190,40 205,55 225,45 235,58" />
                <line x1="190" y1="40" x2="192" y2="22" />
                <line x1="205" y1="55" x2="208" y2="70" />
              </g>
            )}
          </svg>
          <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider mt-2">
            2D Skeletal Projection ({isIsoE ? 'Bicyclic Tetramethyl Naphthyl Ethanone' : 'Linalyl Anthranilate Ester'})
          </span>
        </div>

        {/* Specifications Grid */}
        <div className="space-y-4">
          <div>
            <div className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider mb-1">IUPAC Nomenclature</div>
            <div className="font-ui text-sm text-[var(--text-main)] p-2.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] leading-relaxed">
              {material.chemicalName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider block">Formula</span>
              <span className="font-headline text-base font-bold text-[var(--color-cyan)]">{material.formula}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider block">Molecular Weight</span>
              <span className="font-headline text-base font-bold text-[var(--text-main)]">{material.molecularWeight}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider block">CAS Registry</span>
              <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.cas}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider block">FEMA Index</span>
              <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.fema}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trace Constituents & Synthesis Notes */}
      <div className="p-4 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
        <div className="font-accent text-xs font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-1">
          Constituent Distribution & Purity
        </div>
        <p className="font-ui text-xs text-[var(--text-main)] leading-relaxed mb-2">
          {material.traceComponents}
        </p>
        <p className="font-ui text-xs text-[var(--color-gray)] leading-relaxed">
          Assayed at {material.purityAssay}. Tested for batch-to-batch consistency via Gas Chromatography-Flame Ionization Detection (GC-FID).
        </p>
      </div>
    </div>
  );
};
