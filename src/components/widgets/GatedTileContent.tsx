import React, { useState } from 'react';
import { Lock, Unlock, Sparkles, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { MaterialSpec } from '../../types';

interface GatedTileContentProps {
  material: MaterialSpec;
  isExpanded?: boolean;
}

export const GatedTileContent: React.FC<GatedTileContentProps> = ({ material, isExpanded = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [membershipRequested, setMembershipRequested] = useState(false);

  // If user toggled demo unlock or is unlocked
  if (isUnlocked) {
    return (
      <div className="flex flex-col h-full justify-between gap-3 text-xs font-ui">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
          <div className="flex items-center gap-1.5 text-[var(--color-cyan)] font-medium">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span className="font-headline text-xs font-bold uppercase tracking-wider">Studio Pro Monograph Unlocked</span>
          </div>
          <button
            type="button"
            onClick={() => setIsUnlocked(false)}
            className="font-ui text-[11px] text-[var(--color-gray)] hover:text-[var(--text-main)] underline"
          >
            Lock preview
          </button>
        </div>

        <div className="space-y-3 font-ui leading-relaxed text-[var(--text-main)]">
          <p>
            <strong className="font-bold text-[var(--color-cyan)]">Master Compounding Protocol:</strong> High-resolution GC-MS fractions at 180°C confirm the presence of 18.2% (+)-(1R,2S)-cis-gamma isomer, the primary carrier of the velvety violet-cedar aura.
          </p>
          <p className="text-xs text-[var(--color-gray)]">
            When pairing with Damascenone (0.05%) or Hedione HC (12.0%), this material creates a radiant, non-linear atmospheric projection within 8 minutes of drydown. Recommended compounding sequence: pre-dissolve crystalline musks directly in neat Iso E Super at 38°C prior to alcohol addition to prevent clouding.
          </p>
          {isExpanded && (
            <div className="p-3 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] font-headline text-[11px] space-y-1 text-[var(--text-main)]">
              <div>BENCHMARK FID TRACE: 93.4% Active Isomers</div>
              <div>STABILITY IN ETHANOL 96%: &gt; 36 Months without peroxide formation</div>
              <div>RECOMMENDED BLOTTER CONCENTRATION: 5.0% in DPG</div>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--color-gray)] flex justify-between">
          <span className="font-accent uppercase tracking-wider">Verified B2B Lab Monograph</span>
          <span className="font-headline text-[11px] text-[var(--color-cyan)] font-bold uppercase tracking-wider">Updated Q1 2026</span>
        </div>
      </div>
    );
  }

  // Teaser Mode (Closed Box)
  if (!isExpanded) {
    return (
      <div className="flex flex-col justify-between h-full gap-2 text-xs font-ui">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-cyan)]">
            <div className="w-6 h-6 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
            </div>
            <span className="font-headline font-bold text-xs uppercase tracking-wider text-[var(--text-main)]">Requires Studio Pro</span>
          </div>

          <p className="font-ui text-xs text-[var(--color-gray)] line-clamp-2 leading-relaxed">
            Historical GC-MS benchmark curves, isomer balance ratios, and synergistic pairing protocols with damascones and ionones.
          </p>
        </div>

        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <span className="font-headline text-[11px] font-bold text-[var(--color-gray)] tabular-nums">$49 / MONTH</span>
          <span className="font-ui text-xs font-bold text-[var(--color-cyan)] flex items-center gap-1">
            <span>Unlock Tier</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </span>
        </div>
      </div>
    );
  }

  // Expanded Stage View: Full unlock pitch and interactive demo
  return (
    <div className="flex flex-col h-full items-center justify-center p-6 text-center max-w-xl mx-auto font-ui">
      <div className="w-12 h-12 rounded bg-[var(--surface-elevated)] border border-[var(--color-cyan)]/40 flex items-center justify-center text-[var(--color-cyan)] mb-4 shadow-sm">
        <Lock className="w-6 h-6" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--color-cyan)]/15 border border-[var(--color-cyan)]/30 text-xs font-accent uppercase tracking-wider text-[var(--color-cyan)] mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[var(--color-magenta)]" />
        <span>Studio Pro Membership Tier</span>
      </div>

      <h2 className="font-headline text-lg font-bold text-[var(--text-main)] mb-2">
        Clinical Bench Notes & Chromatography
      </h2>

      <p className="font-ui text-xs text-[var(--color-gray)] max-w-md mb-6 leading-relaxed">
        Access comprehensive GC-MS fraction curves, proprietary isomer breakdowns, micro-dosing compounding sequences, and benchmark synergy coefficients.
      </p>

      {/* Plan Card */}
      <div className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded p-4 mb-5 text-left">
        <div className="flex justify-between items-baseline mb-2">
          <div className="font-headline text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">SMELT Studio Pro</div>
          <div className="font-headline text-sm font-bold text-[var(--color-cyan)] tabular-nums">$49 <span className="font-ui text-xs font-normal text-[var(--color-gray)]">/ month</span></div>
        </div>
        <ul className="font-ui text-xs text-[var(--color-gray)] space-y-1.5 mb-3">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0 stroke-[2.5]" />
            <span>Full isomer distribution analysis and GC-MS traces</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0 stroke-[2.5]" />
            <span>Compounding order and solubility temperature thresholds</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0 stroke-[2.5]" />
            <span>Commercial formula reverse-engineering notes</span>
          </li>
        </ul>

        {membershipRequested ? (
          <div className="w-full py-2 px-3 rounded bg-[var(--color-cyan)]/15 border border-[var(--color-cyan)]/30 text-[var(--color-cyan)] text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>Studio Pro upgrade request submitted for your lab account</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setMembershipRequested(true)}
            className="w-full py-2.5 px-4 rounded font-bold text-xs bg-[var(--color-cyan)] text-[#091335] hover:brightness-110 transition-opacity flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider"
          >
            <span>Upgrade to Studio Pro ($49/mo)</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Interactive Reviewer Demo Toggle */}
      <button
        type="button"
        onClick={() => setIsUnlocked(true)}
        className="font-ui text-xs text-[var(--color-gray)] hover:text-[var(--text-main)] flex items-center gap-1.5 transition-colors underline"
      >
        <Unlock className="w-3.5 h-3.5" />
        <span>Preview Unlocked Perfumer's Notes (Client Demo)</span>
      </button>
    </div>
  );
};
