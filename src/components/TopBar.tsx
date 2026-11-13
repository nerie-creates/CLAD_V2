import React, { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { ScreenId } from '../types';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'studio', label: 'Custom Studio' },
  { id: 'designer', label: 'Designer Series' },
  { id: 'bulk', label: 'Bulk & Schools' },
  { id: 'guarantee', label: 'Guarantee' },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeScreen,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/[0.07]">
      {bannerVisible && (
        <div className="bg-[#111827] text-white text-xs h-8 px-4 flex items-center justify-between">
          <div className="w-6 shrink-0" aria-hidden="true" />
          <p className="truncate text-center tracking-normal">
            30-Day Money-Back Guarantee · 1-Year Manufacturing Defect Warranty · Free Shipping Over $45
          </p>
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            aria-label="Dismiss announcement"
            className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="font-display text-xl font-bold tracking-tight text-[#111827] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          CLAD
        </button>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] ${
                  isActive
                    ? 'text-[#111827] font-semibold'
                    : 'text-[#52525B] hover:text-[#111827]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#2563EB] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Bag</span>
          <span className="font-mono text-xs tabular-nums text-white/85">
            ({cartCount})
          </span>
        </button>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="md:hidden border-t border-black/[0.06] px-4 py-2 flex items-center gap-4 overflow-x-auto"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`text-xs font-medium py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                isActive
                  ? 'border-[#2563EB] text-[#111827]'
                  : 'border-transparent text-[#52525B]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
