import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Palette,
  RefreshCw,
  ShieldCheck,
  Sliders,
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  DEVICE_LABELS,
  LIFESTYLE_SEGMENTS,
} from '../data/catalog';
import {
  ColorOption,
  DeviceCategory,
  LifestyleSegment,
  Product,
  ScreenId,
} from '../types';
import { ResilientImage } from './ResilientImage';

interface StorefrontScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenStudio: (device: DeviceCategory) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, model: string, color: ColorOption) => void;
}

const HERO_DEVICES: {
  id: DeviceCategory;
  label: string;
  headline: string;
  image: string;
  caption: string;
}[] = [
  {
    id: 'bottles',
    label: 'Bottles',
    headline: 'Custom Ace Bottles & Silicone Boots',
    image:
      'https://getmontigo.com/cdn/shop/files/MT_DYW_Launch_-_SI_3b.jpg?v=1733711665&width=1200',
    caption: 'Mix caps, shock-guard boots, and laser monograms',
  },
  {
    id: 'phones',
    label: 'Phones',
    headline: '3.5m Drop-Rated MagSafe Armor',
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/raw/4f43c6e60b2e8e3b8d57319f8900ae21.png',
    caption: 'Bumper protection with runner straps & custom prints',
  },
  {
    id: 'earbuds',
    label: 'Earbuds',
    headline: 'Sweat & Drop Guard Cases',
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/6e42e0fcd27922c581bdc1028ebdd6ad.png',
    caption: 'Snap-fit pods with aluminum carabiners for gym & trail',
  },
  {
    id: 'laptops',
    label: 'Laptops',
    headline: 'Featherweight Corner-Rib Shells',
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/a787a5ba100afcb8e54eed61a360fa3f.png',
    caption: 'Scratch-proof campus & commute protection',
  },
];

export const StorefrontScreen: React.FC<StorefrontScreenProps> = ({
  onNavigate,
  onOpenStudio,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [heroDevice, setHeroDevice] = useState<DeviceCategory>('bottles');
  const [deviceFilter, setDeviceFilter] = useState<DeviceCategory | 'all'>('all');
  const [lifestyleFilter, setLifestyleFilter] = useState<LifestyleSegment | 'all'>('all');

  const activeHero =
    HERO_DEVICES.find((d) => d.id === heroDevice) || HERO_DEVICES[0];

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((p) => {
      const matchesDevice =
        deviceFilter === 'all' || p.category === deviceFilter;
      const matchesLifestyle =
        lifestyleFilter === 'all' || p.lifestyles.includes(lifestyleFilter);
      return matchesDevice && matchesLifestyle;
    });
  }, [deviceFilter, lifestyleFilter]);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Storefront Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-black/[0.08] rounded-xl p-8 sm:p-10">
            <div>
              <p className="text-xs font-medium text-[#52525B] tracking-normal">
                Phones · Earbuds · Laptops · Bottles
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#111827] mt-4 leading-[1.08] text-balance">
                Wholistic protection in style for every carry.
              </h1>
              <p className="mt-5 text-base text-[#52525B] leading-relaxed max-w-xl">
                Uniquely designed by you or curated from our designer series.
                Engineered for runners, gym members, students, office commuters,
                and active kids.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenStudio(heroDevice)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Open Custom Studio</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('designer')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Palette className="w-4 h-4" />
                  <span>Designer Series</span>
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-black/[0.07] grid grid-cols-3 gap-4">
              <div>
                <p className="font-mono text-lg font-semibold text-[#111827] tabular-nums">
                  4 Devices
                </p>
                <p className="text-xs text-[#52525B] mt-0.5">
                  Unified accessory armor
                </p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold text-[#111827] tabular-nums">
                  30 Days
                </p>
                <p className="text-xs text-[#52525B] mt-0.5">
                  Money-back guarantee
                </p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold text-[#111827] tabular-nums">
                  1 Year
                </p>
                <p className="text-xs text-[#52525B] mt-0.5">
                  Defect warranty
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F3F4F6] border border-black/[0.07] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-black/[0.06]">
                {HERO_DEVICES.map((device) => {
                  const isActive = heroDevice === device.id;
                  return (
                    <button
                      key={device.id}
                      type="button"
                      onClick={() => setHeroDevice(device.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#111827] text-white'
                          : 'text-[#52525B] hover:text-[#111827]'
                      }`}
                    >
                      {device.label}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => onOpenStudio(activeHero.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] whitespace-nowrap shrink-0"
              >
                <span>Customize {activeHero.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="my-6 flex-1 flex items-center justify-center min-h-[280px] sm:min-h-[340px] bg-white rounded-lg border border-black/[0.05] overflow-hidden p-4">
              <ResilientImage
                src={activeHero.image}
                alt={activeHero.headline}
                fallbackLabel={activeHero.headline}
                className={`w-full h-full max-h-[320px] ${
                  heroDevice === 'bottles' ? 'object-cover rounded-md' : 'object-contain'
                }`}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#111827]">
                  {activeHero.headline}
                </h2>
                <p className="text-xs text-[#52525B] mt-0.5">
                  {activeHero.caption}
                </p>
              </div>
              <span className="font-mono text-xs font-medium text-[#111827] tabular-nums whitespace-nowrap shrink-0">
                From $24.00
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div>
            <p className="text-xs font-medium text-[#52525B]">
              Curated Protectors & Modular Kits
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
              Build your daily armor
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#F3F4F6] rounded-lg overflow-x-auto">
              <button
                type="button"
                onClick={() => setDeviceFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  deviceFilter === 'all'
                    ? 'bg-white text-[#111827] shadow-sm'
                    : 'text-[#52525B] hover:text-[#111827]'
                }`}
              >
                All Devices
              </button>
              {(['bottles', 'phones', 'earbuds', 'laptops'] as DeviceCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setDeviceFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      deviceFilter === cat
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#52525B] hover:text-[#111827]'
                    }`}
                  >
                    {DEVICE_LABELS[cat]}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Lifestyle Segment Filter Strip */}
        <div className="py-4 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-medium text-[#52525B] whitespace-nowrap shrink-0 mr-1">
            Lifestyle fit:
          </span>
          <button
            type="button"
            onClick={() => setLifestyleFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
              lifestyleFilter === 'all'
                ? 'bg-[#111827] text-white border-[#111827]'
                : 'bg-white text-[#52525B] border-black/10 hover:text-[#111827]'
            }`}
          >
            All Lifestyles
          </button>
          {LIFESTYLE_SEGMENTS.map((segment) => (
            <button
              key={segment}
              type="button"
              onClick={() => setLifestyleFilter(segment)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                lifestyleFilter === segment
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#52525B] border-black/10 hover:text-[#111827]'
              }`}
            >
              {segment}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white border border-black/[0.07] rounded-xl mt-4">
            <p className="text-sm font-medium text-[#111827]">
              No protectors match that exact device and lifestyle filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setDeviceFilter('all');
                setLifestyleFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#111827] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group bg-white border border-black/[0.07] rounded-xl overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="bg-[#F3F4F6] aspect-[4/3] w-full p-6 flex items-center justify-center relative overflow-hidden focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#2563EB]"
                >
                  <ResilientImage
                    src={product.image}
                    alt={product.name}
                    fallbackLabel={product.name}
                    className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </button>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#52525B]">
                      <span>
                        {product.categoryLabel}
                        {product.tag ? ` · ${product.tag}` : ''}
                      </span>
                      <span className="truncate max-w-[140px]">
                        {product.lifestyles[0]}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left mt-1.5 block w-full"
                    >
                      <h3 className="text-base font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                        {product.name}
                      </h3>
                    </button>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-mono text-[15px] font-semibold text-[#111827] tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {product.colors.slice(0, 4).map((c) => (
                          <span
                            key={c.id}
                            title={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-black/15"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onQuickAdd(product, product.models[0], product.colors[0])
                      }
                      className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors whitespace-nowrap"
                    >
                      Quick Add
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenStudio(product.category)}
                      className="py-2 px-3 text-xs font-semibold text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3. Wholistic Protection Proof & B2B / Designer Routing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-black/[0.08] rounded-xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#52525B]">
              Tested Protection & Zero-Risk Ownership
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827] mt-1 text-balance">
              Built for active pace, backed by real guarantees.
            </h2>
            <p className="mt-3 text-sm text-[#52525B] leading-relaxed">
              Every CLAD protector ships with impact-tested elastomer framing,
              a 30-day no-questions return window, and full 1-year manufacturing
              defect coverage. Outfitting a university, gym club, or corporate
              onboarding kit? Configure bulk pricing in seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('bulk')}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors whitespace-nowrap"
              >
                School & Corporate Bulk
              </button>
              <button
                type="button"
                onClick={() => onNavigate('guarantee')}
                className="px-4 py-2.5 text-xs font-semibold text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap"
              >
                Warranty & Pop-Up Schedule
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#FAFAFA] border border-black/[0.06] rounded-lg">
              <ShieldCheck className="w-5 h-5 text-[#2563EB] mb-3" />
              <h3 className="text-sm font-semibold text-[#111827]">
                30-Day Money-Back Guarantee
              </h3>
              <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                Test fit, grip, and boot cushion on your daily commute or track
                sessions with hassle-free returns.
              </p>
            </div>
            <div className="p-5 bg-[#FAFAFA] border border-black/[0.06] rounded-lg">
              <RefreshCw className="w-5 h-5 text-[#2563EB] mb-3" />
              <h3 className="text-sm font-semibold text-[#111827]">
                1-Year Defect Warranty
              </h3>
              <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                Instant replacement for latch wear, hinge fatigue, or bumper
                separation within 12 months.
              </p>
            </div>
            <div className="p-5 bg-[#FAFAFA] border border-black/[0.06] rounded-lg">
              <Award className="w-5 h-5 text-[#2563EB] mb-3" />
              <h3 className="text-sm font-semibold text-[#111827]">
                Designer & KOL Collaborations
              </h3>
              <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                Limited capsules co-developed with independent illustrators,
                athletes, and cultural archives.
              </p>
            </div>
            <div className="p-5 bg-[#FAFAFA] border border-black/[0.06] rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB] mb-3" />
              <h3 className="text-sm font-semibold text-[#111827]">
                B2B & University Co-Branding
              </h3>
              <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                Custom team crests, campus orientations, and corporate wellness
                kits from 25 to 500+ units.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
