import React, { useState } from 'react';
import { ArrowRight, Check, Layers } from 'lucide-react';
import { DESIGNER_DROPS, DEVICE_LABELS } from '../data/catalog';
import { DesignerDrop, DeviceCategory } from '../types';
import { ResilientImage } from './ResilientImage';

interface DesignerSeriesScreenProps {
  onAddDropBundle: (drop: DesignerDrop) => void;
  onCustomizeDrop: (device: DeviceCategory, patternName: string) => void;
}

export const DesignerSeriesScreen: React.FC<DesignerSeriesScreenProps> = ({
  onAddDropBundle,
  onCustomizeDrop,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleBundleClick = (drop: DesignerDrop) => {
    onAddDropBundle(drop);
    setAddedId(drop.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12">
      <div className="pb-6 border-b border-black/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#52525B]">
            Designer, KOL & Brand Collaborations
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#111827] mt-1 text-balance">
            Curated Designer Series
          </h1>
          <p className="text-sm text-[#52525B] mt-2 max-w-2xl">
            Co-created with independent designers, athletes, and cultural
            archives. Order a matched multi-device protection kit or personalize
            any drop in the Custom Studio.
          </p>
        </div>
        <span className="font-mono text-xs text-[#52525B] tabular-nums whitespace-nowrap">
          {DESIGNER_DROPS.length} Active Capsules · Bundle Save ~20%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DESIGNER_DROPS.map((drop) => {
          const isAdded = addedId === drop.id;
          return (
            <article
              key={drop.id}
              className="bg-white border border-black/[0.08] rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div className="bg-[#F3F4F6] p-8 aspect-[16/10] flex items-center justify-center relative">
                <ResilientImage
                  src={drop.heroImage}
                  alt={drop.title}
                  fallbackLabel={drop.title}
                  accentHex={drop.accentHex}
                  className="max-h-[240px] w-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs text-[#52525B]">
                    <span>
                      {drop.roleLabel} · {drop.collaborator}
                    </span>
                    <span>{drop.season}</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-[#111827] mt-2">
                    {drop.title}
                  </h2>

                  <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
                    {drop.story}
                  </p>

                  <div className="mt-4 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[#52525B]">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>
                        Kit includes:{' '}
                        {drop.devicesIncluded
                          .map((d) => DEVICE_LABELS[d])
                          .join(' + ')}
                      </span>
                    </div>
                    <span>Fit: {drop.lifestyleFit.join(' / ')}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/[0.07]">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xl font-bold text-[#111827] tabular-nums">
                        ${drop.bundlePrice.toFixed(2)}
                      </span>
                      <span className="font-mono text-xs text-[#52525B] line-through tabular-nums">
                        ${drop.individualPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#52525B]">
                      Complete matched set
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleBundleClick(drop)}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Bundle Added</span>
                        </>
                      ) : (
                        <span>Add Matched Set</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onCustomizeDrop(drop.devicesIncluded[0], drop.patternName)
                      }
                      className="px-3.5 py-2.5 text-xs font-semibold text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
