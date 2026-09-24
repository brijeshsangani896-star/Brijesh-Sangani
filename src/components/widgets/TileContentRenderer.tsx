import React from 'react';
import { MaterialSpec, TileId } from '../../types';
import { MolecularStructureWidget } from './MolecularStructure';
import { ExampleAccordWidget } from './ExampleAccord';
import { VisualOdorProfileWidget } from './VisualOdorProfile';
import { GatedTileContent } from './GatedTileContent';
import {
  ShieldAlert,
  ShieldCheck,
  Check,
  Package,
  Network,
  TestTube2,
  AlertTriangle,
  Flame,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface TileContentRendererProps {
  tileId: TileId;
  material: MaterialSpec;
  isExpanded?: boolean;
}

export const TileContentRenderer: React.FC<TileContentRendererProps> = ({
  tileId,
  material,
  isExpanded = false,
}) => {
  switch (tileId) {
    case 'structure':
      return <MolecularStructureWidget material={material} isExpanded={isExpanded} />;

    case 'accord':
      return <ExampleAccordWidget material={material} isExpanded={isExpanded} />;

    case 'odor-profile':
      return <VisualOdorProfileWidget material={material} isExpanded={isExpanded} />;

    case 'perfumers-notes':
      return <GatedTileContent material={material} isExpanded={isExpanded} />;

    // Top-Left Box: Quick Specifications & Identity
    case 'overview':
      if (!isExpanded) {
        return (
          <div className="flex flex-col justify-between h-full gap-2.5 text-xs font-ui">
            {/* One-line smell description */}
            <div>
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Olfactive Descriptor</span>
              <p className="font-ui text-xs text-[var(--text-main)] leading-snug line-clamp-2 mt-0.5">
                "{material.oneLineSmell}"
              </p>
            </div>

            {/* Identification Matrix */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                <span className="font-accent text-[10px] text-[var(--color-gray)] block uppercase tracking-wider">CAS</span>
                <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.cas}</span>
              </div>
              <div className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                <span className="font-accent text-[10px] text-[var(--color-gray)] block uppercase tracking-wider">Formula</span>
                <span className="font-headline text-xs font-bold text-[var(--color-cyan)]">{material.formula}</span>
              </div>
              <div className="p-2 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                <span className="font-accent text-[10px] text-[var(--color-gray)] block uppercase tracking-wider">Mol Wt</span>
                <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.molecularWeight.split(' ')[0]}</span>
              </div>
            </div>

            {/* Strength and Diffusion Badges */}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider">Intensity:</span>
                <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.strengthRating.split('·')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider">Diffusion:</span>
                <span className="font-headline text-xs font-bold text-[var(--color-cyan)]">{material.diffusionRating.split('·')[0]}</span>
              </div>
            </div>
          </div>
        );
      }

      // Expanded Stage View for Overview
      return (
        <div className="flex flex-col h-full gap-6 font-ui">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
              Technical Identity & Sensorics
            </h2>
            <p className="font-ui text-xs text-[var(--color-gray)] mt-0.5">
              Regulatory registry identifiers, chemical constants, and primary olfactive metrics
            </p>
          </div>

          {/* Smell description callout */}
          <div className="p-4 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
            <span className="font-accent text-xs text-[var(--color-cyan)] uppercase tracking-wider block mb-1">
              One-Line Smell Description
            </span>
            <p className="font-ui text-base text-[var(--text-main)] leading-relaxed">
              "{material.oneLineSmell}"
            </p>
          </div>

          {/* Complete 8-card grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">CAS Registry</span>
              <span className="font-headline text-sm font-bold text-[var(--text-main)]">{material.cas}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">FEMA Number</span>
              <span className="font-headline text-sm font-bold text-[var(--text-main)]">{material.fema}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">EC / EINECS</span>
              <span className="font-headline text-sm font-bold text-[var(--text-main)]">{material.einecs}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Formula</span>
              <span className="font-headline text-sm font-bold text-[var(--color-cyan)]">{material.formula}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Mol Weight</span>
              <span className="font-headline text-sm font-bold text-[var(--text-main)]">{material.molecularWeight}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Purity Assay</span>
              <span className="font-headline text-sm font-bold text-[var(--color-cyan)]">{material.purityAssay}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Strength Rating</span>
              <span className="font-headline text-sm font-bold text-[var(--text-main)]">{material.strengthRating}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Diffusion Rating</span>
              <span className="font-headline text-sm font-bold text-[var(--color-cyan)]">{material.diffusionRating}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Flash Point</span>
              <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.flashPoint}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Boiling Point</span>
              <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.boilingPoint}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Shelf Stability</span>
              <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.shelfLife}</span>
            </div>
          </div>
        </div>
      );

    // Dedicated Home for Long Description: Material Profile & Story
    case 'story':
      if (!isExpanded) {
        return (
          <div className="flex flex-col justify-between h-full gap-2 text-xs font-ui">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[var(--color-cyan)] font-medium text-xs">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="font-accent text-[11px] uppercase tracking-wider">Perfumer's Monograph</span>
              </div>
              <p className="font-ui text-xs text-[var(--text-main)] line-clamp-3 leading-relaxed">
                "{material.longDescription.split('\n')[0]}"
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="font-ui text-[var(--color-gray)]">Historical olfactory evolution</span>
              <span className="font-ui text-[var(--color-cyan)] font-bold">Read monograph</span>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col h-full gap-5 font-ui">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
              Material Profile & Perfumery Monograph
            </h2>
            <p className="font-ui text-xs text-[var(--color-gray)] mt-0.5">
              Origin story, sensory behaviour across the evaporation arc, and landmark fragrance formulation roles
            </p>
          </div>

          <div className="space-y-4 font-ui text-sm leading-relaxed text-[var(--text-main)] overflow-y-auto pr-2">
            {material.longDescription.split('\n\n').map((paragraph, i) => (
              <p key={i}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-auto p-4 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--color-gray)]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-cyan)]" />
              <span>Documented in SMELT Raw Material Compendium</span>
            </div>
            <span className="font-headline text-[11px] text-[var(--color-cyan)] uppercase tracking-wider">Verified Formulation Data</span>
          </div>
        </div>
      );

    // Safety & IFRA Box
    case 'safety-ifra':
      if (!isExpanded) {
        return (
          <div className="flex flex-col justify-between h-full gap-2 text-xs font-ui">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                {material.isIfraRestricted ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold font-accent uppercase tracking-wider bg-[var(--color-magenta)]/15 text-[var(--color-magenta)] border border-[var(--color-magenta)]/30">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>IFRA Restricted</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold font-accent uppercase tracking-wider bg-[var(--color-cyan)]/15 text-[var(--color-cyan)] border border-[var(--color-cyan)]/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>No IFRA Restriction</span>
                  </span>
                )}
              </div>
              <p className="font-ui text-xs text-[var(--text-main)] leading-relaxed mt-1">
                {material.ifraRestrictionSummary || 'Safe for cosmetic and fine fragrance compounding without specific concentration limits.'}
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--color-gray)] flex justify-between">
              <span className="font-accent uppercase tracking-wider">Cat 4 Thresholds</span>
              <span className="font-ui text-[var(--color-cyan)] font-bold">View limits</span>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col h-full gap-5 font-ui">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
              Safety, Regulatory & IFRA Compliance
            </h2>
            <p className="font-ui text-xs text-[var(--color-gray)] mt-0.5">
              Maximum allowable limits by product application category and dermatological safety guidelines
            </p>
          </div>

          <div className="p-4 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className={`w-5 h-5 ${material.isIfraRestricted ? 'text-[var(--color-magenta)]' : 'text-[var(--color-cyan)]'}`} />
              <span className="font-headline font-bold text-sm text-[var(--text-main)]">
                {material.ifraRestrictionSummary || 'Unrestricted aroma chemical under IFRA Standards'}
              </span>
            </div>
            <p className="font-ui text-xs text-[var(--color-gray)] leading-relaxed">
              Compliance status verified against the International Fragrance Association (IFRA) 51st Amendment Code of Practice.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Cat 4 (Fine Fragrance)</span>
              <span className="font-headline text-sm font-bold text-[var(--color-cyan)]">{material.isIfraRestricted ? '21.40%' : '100%'}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Cat 5A (Body Lotion)</span>
              <span className="font-headline text-sm font-bold text-[var(--text-main)]">{material.isIfraRestricted ? '5.40%' : '100%'}</span>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Cat 9 (Rinse-off Soap)</span>
              <span className="font-headline text-sm font-bold text-[var(--text-main)]">{material.isIfraRestricted ? '10.50%' : '100%'}</span>
            </div>
          </div>
        </div>
      );

    // Safe Handling & Storage
    case 'safe-handling':
      if (!isExpanded) {
        return (
          <div className="flex flex-col justify-between h-full gap-2 text-xs font-ui">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider">Flash Point</span>
                <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.flashPoint}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider">Shelf Life</span>
                <span className="font-headline text-xs font-bold text-[var(--text-main)]">{material.shelfLife}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--color-gray)] flex justify-between">
              <span className="font-accent uppercase tracking-wider">Storage Protocol</span>
              <span className="font-ui text-[var(--color-cyan)] font-bold">Details</span>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-4 font-ui">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
              Handling, Storage & Laboratory Safety
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider block mb-1">Recommended Storage</span>
              <p className="font-ui font-medium text-[var(--text-main)] leading-relaxed">Store in sealed amber containers in dark, cool facility (15–20°C) with inert nitrogen headspace.</p>
            </div>
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
              <span className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider block mb-1">Personal Protection (PPE)</span>
              <p className="font-ui font-medium text-[var(--text-main)] leading-relaxed">Nitrile gloves, lab coat, safety glasses. Work under well-ventilated laboratory hood.</p>
            </div>
          </div>
        </div>
      );

    // Related Materials
    case 'network':
      if (!isExpanded) {
        return (
          <div className="flex flex-col justify-between h-full gap-2 text-xs font-ui">
            <div className="space-y-1">
              <span className="font-accent text-[11px] text-[var(--color-gray)] block uppercase tracking-wider">Structural Analogues</span>
              <div className="space-y-1">
                {material.networkMaterials.slice(0, 2).map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-xs">
                    <span className="font-ui text-xs font-medium text-[var(--text-main)]">{item.name}</span>
                    <span className="font-headline text-[11px] font-bold text-[var(--color-cyan)]">{item.similarity}% match</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--color-gray)] flex justify-between">
              <span className="font-accent uppercase tracking-wider">{material.networkMaterials.length} Analogues</span>
              <span className="font-ui text-[var(--color-cyan)] font-bold">Explore</span>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-4 font-ui">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-headline text-lg font-bold text-[var(--text-main)]">
              Related Materials & Olfactory Analogues
            </h2>
          </div>
          <div className="space-y-2.5">
            {material.networkMaterials.map((item) => (
              <div key={item.name} className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <div className="font-headline text-sm font-bold text-[var(--text-main)]">{item.name}</div>
                  <div className="font-ui text-xs text-[var(--color-gray)] mt-0.5">{item.olfactiveDelta}</div>
                </div>
                <div className="text-right">
                  <div className="font-headline text-sm font-bold text-[var(--color-cyan)]">{item.similarity}%</div>
                  <div className="font-accent text-[10px] text-[var(--color-gray)] uppercase tracking-wider">{item.relationship}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="text-xs text-[var(--text-muted)] p-2">
          Technical data available in expanded view.
        </div>
      );
  }
};
