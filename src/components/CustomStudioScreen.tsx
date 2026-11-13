import React, { useMemo, useState } from 'react';
import { Check, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import {
  ACCENT_PALETTE,
  COLOR_PALETTE,
  DEVICE_CUSTOM_OPTIONS,
  DEVICE_LABELS,
} from '../data/catalog';
import { ColorOption, CustomDesignConfig, DeviceCategory } from '../types';
import { ResilientImage } from './ResilientImage';

interface CustomStudioScreenProps {
  initialDevice: DeviceCategory;
  initialPattern?: string;
  onAddCustomToCart: (
    config: CustomDesignConfig,
    unitPrice: number,
    previewImage: string
  ) => void;
}

const FINISHES: CustomDesignConfig['finish'][] = [
  'Matte Shield',
  'Frosted Grip',
  'Impact Clear',
];

const MONOGRAM_FONTS: CustomDesignConfig['monogramFont'][] = [
  'Outfit',
  'Mono',
  'Classic',
];

const MONOGRAM_COLORS = [
  { id: 'white', name: 'Chalk White', hex: '#FFFFFF' },
  { id: 'dark', name: 'Obsidian', hex: '#111827' },
  { id: 'cobalt', name: 'Cobalt', hex: '#2563EB' },
  { id: 'gold', name: 'Brushed Brass', hex: '#D4AF37' },
];

export const CustomStudioScreen: React.FC<CustomStudioScreenProps> = ({
  initialDevice,
  initialPattern,
  onAddCustomToCart,
}) => {
  const [device, setDevice] = useState<DeviceCategory>(initialDevice);
  const spec = DEVICE_CUSTOM_OPTIONS[device];

  const [model, setModel] = useState<string>(spec.models[1] || spec.models[0]);
  const [baseColor, setBaseColor] = useState<ColorOption>(COLOR_PALETTE[1]);
  const [accentColor, setAccentColor] = useState<ColorOption>(ACCENT_PALETTE[2]);
  const [capOrPattern, setCapOrPattern] = useState<string>(
    initialPattern || spec.capsOrPatterns[0]
  );
  const [finish, setFinish] = useState<CustomDesignConfig['finish']>('Matte Shield');
  const [monogramText, setMonogramText] = useState<string>('ALEX.R');
  const [monogramFont, setMonogramFont] =
    useState<CustomDesignConfig['monogramFont']>('Outfit');
  const [monogramColor, setMonogramColor] = useState<string>('#FFFFFF');
  const [addOns, setAddOns] = useState<string[]>(
    spec.addOns.length > 0 ? [spec.addOns[0].id] : []
  );
  const [previewMode, setPreviewMode] = useState<'interactive' | 'photo'>('interactive');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleSwitchDevice = (nextDevice: DeviceCategory) => {
    const nextSpec = DEVICE_CUSTOM_OPTIONS[nextDevice];
    setDevice(nextDevice);
    setModel(nextSpec.models[1] || nextSpec.models[0]);
    setCapOrPattern(nextSpec.capsOrPatterns[0]);
    setAddOns(nextSpec.addOns.length > 0 ? [nextSpec.addOns[0].id] : []);
  };

  const toggleAddOn = (id: string) => {
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRandomize = () => {
    const randBase =
      COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    const randAccent =
      ACCENT_PALETTE[Math.floor(Math.random() * ACCENT_PALETTE.length)];
    const randCap =
      spec.capsOrPatterns[
        Math.floor(Math.random() * spec.capsOrPatterns.length)
      ];
    setBaseColor(randBase);
    setAccentColor(randAccent);
    setCapOrPattern(randCap);
  };

  const handleReset = () => {
    setModel(spec.models[1] || spec.models[0]);
    setBaseColor(COLOR_PALETTE[1]);
    setAccentColor(ACCENT_PALETTE[2]);
    setCapOrPattern(spec.capsOrPatterns[0]);
    setFinish('Matte Shield');
    setMonogramText('');
    setAddOns(spec.addOns.length > 0 ? [spec.addOns[0].id] : []);
  };

  const addOnTotal = useMemo(() => {
    return spec.addOns
      .filter((a) => addOns.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
  }, [spec.addOns, addOns]);

  const totalPrice = spec.basePrice + addOnTotal;

  const currentPhoto =
    spec.detailImages[capOrPattern] || spec.previewImage;

  const handleAdd = () => {
    const config: CustomDesignConfig = {
      device,
      model,
      baseColor,
      accentColor,
      capOrPattern,
      finish,
      monogramText: monogramText.trim(),
      monogramFont,
      monogramColor,
      addOns: spec.addOns.filter((a) => addOns.includes(a.id)).map((a) => a.label),
    };
    onAddCustomToCart(config, totalPrice, currentPhoto);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const monogramFontClass =
    monogramFont === 'Mono'
      ? 'font-mono tracking-widest'
      : monogramFont === 'Classic'
      ? 'font-serif tracking-wide'
      : 'font-display tracking-tight';

  const hasBoot = addOns.includes('silicone-boot');
  const hasCharm = addOns.includes('boot-charm') || addOns.includes('charm-tether');
  const hasStrap = addOns.includes('crossbody-strap');
  const hasMagSafe = addOns.includes('magsafe-ring');
  const hasCarabiner = addOns.includes('carabiner');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/[0.08]">
        <div>
          <p className="text-xs font-medium text-[#52525B]">
            Custom Studio · Uniquely Designed By You
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#111827] mt-1">
            {spec.title}
          </h1>
          <p className="text-sm text-[#52525B] mt-1">{spec.subtitle}</p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#F3F4F6] rounded-lg overflow-x-auto">
          {(['bottles', 'phones', 'earbuds', 'laptops'] as DeviceCategory[]).map(
            (cat) => {
              const isActive = device === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSwitchDevice(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-[#111827] shadow-sm'
                      : 'text-[#52525B] hover:text-[#111827]'
                  }`}
                >
                  {DEVICE_LABELS[cat]}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left: Live Configurator Stage */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 bg-[#F3F4F6] border border-black/[0.07] rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-black/[0.06]">
              <button
                type="button"
                onClick={() => setPreviewMode('interactive')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  previewMode === 'interactive'
                    ? 'bg-[#111827] text-white'
                    : 'text-[#52525B] hover:text-[#111827]'
                }`}
              >
                Live Customizer View
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('photo')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  previewMode === 'photo'
                    ? 'bg-[#111827] text-white'
                    : 'text-[#52525B] hover:text-[#111827]'
                }`}
              >
                Product Reference
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRandomize}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111827] bg-white hover:bg-[#FAFAFA] border border-black/10 rounded-lg transition-colors whitespace-nowrap"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Mix</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#52525B] bg-white hover:text-[#111827] border border-black/10 rounded-lg transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white border border-black/[0.05] rounded-xl min-h-[420px] sm:min-h-[470px] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {previewMode === 'photo' ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <ResilientImage
                  src={currentPhoto}
                  alt={`${spec.title} — ${capOrPattern}`}
                  fallbackLabel={spec.title}
                  className="max-h-[340px] w-full object-contain"
                />
                <p className="text-xs text-[#52525B]">
                  Reference hardware finish · {capOrPattern}
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                {/* Interactive Live Product Visualizer */}
                {device === 'bottles' && (
                  <div className="relative flex flex-col items-center">
                    {/* Cap Layer */}
                    <div className="relative flex flex-col items-center z-10">
                      {capOrPattern.includes('Straw') && (
                        <div
                          className="w-3 h-7 rounded-t-full -mb-1 border border-black/15"
                          style={{ backgroundColor: accentColor.hex }}
                        />
                      )}
                      {capOrPattern.includes('Flex') && (
                        <div
                          className="w-16 h-6 rounded-t-full border-4 border-b-0 -mb-1"
                          style={{ borderColor: accentColor.hex }}
                        />
                      )}
                      <div
                        className="w-24 h-11 rounded-t-xl border border-black/15 shadow-sm flex items-center justify-center"
                        style={{ backgroundColor: accentColor.hex }}
                      >
                        <div className="w-16 h-1.5 rounded-full bg-black/15" />
                      </div>
                      <div className="w-20 h-3 bg-[#E5E7EB] border-x border-black/10" />
                    </div>

                    {/* Bottle Body */}
                    <div
                      className="relative w-36 h-64 rounded-t-2xl rounded-b-3xl border border-black/15 shadow-lg flex items-center justify-center overflow-hidden transition-colors duration-200"
                      style={{
                        backgroundColor: baseColor.hex,
                        opacity: finish === 'Impact Clear' ? 0.85 : 1,
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 left-3 w-4 bg-white/18 blur-[1px] rounded-full pointer-events-none"
                      />
                      {finish === 'Frosted Grip' && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{
                            backgroundImage:
                              'radial-gradient(#ffffff 1px, transparent 1px)',
                            backgroundSize: '8px 8px',
                          }}
                        />
                      )}
                      <div className="relative z-10 text-center px-3">
                        <span
                          className={`block text-lg font-bold break-words max-w-[110px] ${monogramFontClass}`}
                          style={{ color: monogramColor }}
                        >
                          {monogramText || 'CLAD'}
                        </span>
                      </div>

                      {/* Silicone Boot Overlay */}
                      {hasBoot && (
                        <div
                          className="absolute bottom-0 inset-x-0 h-20 rounded-b-3xl border-t-2 border-black/15 flex items-center justify-center transition-colors duration-200"
                          style={{ backgroundColor: accentColor.hex }}
                        >
                          <span className="text-[10px] font-mono uppercase tracking-widest text-black/45 font-semibold">
                            SHOCK BOOT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Charm Loop */}
                    {hasCharm && (
                      <div
                        className="absolute right-[-44px] top-16 flex flex-col items-center"
                        title="Active Loop Charm"
                      >
                        <div className="w-6 h-6 rounded-full border-2 border-[#111827] bg-white flex items-center justify-center shadow-sm">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: accentColor.hex }}
                          />
                        </div>
                        <span className="text-[10px] text-[#52525B] mt-1 font-medium">
                          Charm
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {device === 'phones' && (
                  <div className="relative flex items-center justify-center">
                    {hasStrap && (
                      <div
                        aria-hidden="true"
                        className="absolute -bottom-10 w-64 h-16 border-b-4 border-x-2 rounded-b-full pointer-events-none"
                        style={{ borderColor: accentColor.hex }}
                      />
                    )}
                    <div
                      className="relative w-52 h-[350px] rounded-[34px] p-2.5 shadow-xl border-4 transition-colors duration-200"
                      style={{
                        borderColor: accentColor.hex,
                        backgroundColor: baseColor.hex,
                      }}
                    >
                      {/* Pattern layer */}
                      {capOrPattern === 'Gridline Geometric' && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-2 rounded-[26px] opacity-20 pointer-events-none"
                          style={{
                            backgroundImage:
                              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                          }}
                        />
                      )}
                      {capOrPattern === 'Kinetic Wave' && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-2 rounded-[26px] opacity-25 pointer-events-none"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 8px, transparent 8px, transparent 20px)',
                          }}
                        />
                      )}

                      {/* Camera Bezel */}
                      <div
                        className="w-20 h-20 rounded-2xl bg-[#111827] border-2 p-2 grid grid-cols-2 gap-1.5 relative z-10"
                        style={{ borderColor: accentColor.hex }}
                      >
                        <div className="rounded-full bg-[#27272A] border border-white/25" />
                        <div className="rounded-full bg-[#27272A] border border-white/25" />
                        <div className="rounded-full bg-[#27272A] border border-white/25" />
                        <div className="w-3 h-3 rounded-full bg-[#FDE68A]/70 self-center justify-self-center" />
                      </div>

                      {/* MagSafe Ring */}
                      {hasMagSafe && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-24 h-24 rounded-full border-[6px] opacity-85"
                              style={{ borderColor: accentColor.hex }}
                            />
                            <div
                              className="w-1.5 h-5 rounded-full mt-1.5 opacity-85"
                              style={{ backgroundColor: accentColor.hex }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Custom Monogram */}
                      <div className="absolute bottom-8 inset-x-4 text-center z-10">
                        <span
                          className={`text-lg font-bold ${monogramFontClass}`}
                          style={{ color: monogramColor }}
                        >
                          {monogramText || 'CLAD'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {device === 'earbuds' && (
                  <div className="relative flex items-center justify-center">
                    {hasCarabiner && (
                      <div
                        className="absolute -right-12 top-6 w-12 h-20 rounded-full border-4 flex items-center justify-center"
                        style={{ borderColor: accentColor.hex }}
                      >
                        <span className="text-[9px] font-mono text-[#52525B] rotate-90">
                          CLIP
                        </span>
                      </div>
                    )}
                    <div
                      className="w-56 h-44 rounded-[36px] border-4 shadow-xl flex flex-col justify-between p-4 relative transition-colors duration-200"
                      style={{
                        backgroundColor: baseColor.hex,
                        borderColor: accentColor.hex,
                      }}
                    >
                      <div className="border-b-2 border-black/20 pb-3 flex items-center justify-center">
                        <div className="w-14 h-1.5 rounded-full bg-white/30" />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 my-auto">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: accentColor.hex }}
                        />
                        <span
                          className={`text-lg font-bold ${monogramFontClass}`}
                          style={{ color: monogramColor }}
                        >
                          {monogramText || 'CLAD'}
                        </span>
                      </div>
                      <div className="h-2" />
                    </div>
                  </div>
                )}

                {device === 'laptops' && (
                  <div className="relative w-full max-w-[380px]">
                    <div
                      className="aspect-[16/10] w-full rounded-2xl border-[6px] shadow-xl p-6 flex flex-col justify-between relative overflow-hidden transition-colors duration-200"
                      style={{
                        backgroundColor: baseColor.hex,
                        borderColor: accentColor.hex,
                      }}
                    >
                      {capOrPattern === 'Studio Stripe' && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-y-0 right-12 w-8 opacity-85"
                          style={{ backgroundColor: accentColor.hex }}
                        />
                      )}
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/70 relative z-10">
                        <span>{model}</span>
                        <span>{finish}</span>
                      </div>
                      <div className="my-auto text-center relative z-10">
                        <span
                          className={`text-2xl font-bold ${monogramFontClass}`}
                          style={{ color: monogramColor }}
                        >
                          {monogramText || 'CLAD STUDIO'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center relative z-10">
                        <span
                          className="w-4 h-4 rounded-sm opacity-75"
                          style={{ backgroundColor: accentColor.hex }}
                        />
                        <span
                          className="w-4 h-4 rounded-sm opacity-75"
                          style={{ backgroundColor: accentColor.hex }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-black/[0.06] w-full flex items-center justify-between text-xs text-[#52525B]">
              <span>
                {model} · {baseColor.name} · {accentColor.name}
              </span>
              <span className="font-mono font-semibold text-[#111827] tabular-nums">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Step-by-Step Controls */}
        <div className="lg:col-span-5 bg-white border border-black/[0.08] rounded-xl p-6 sm:p-7 space-y-6">
          {/* Step 1: Model */}
          <div>
            <h2 className="text-xs font-semibold text-[#111827] mb-2.5">
              01. Device Model & Capacity
            </h2>
            <div className="flex flex-wrap gap-2">
              {spec.models.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModel(m)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    model === m
                      ? 'border-[#2563EB] bg-[#2563EB]/8 text-[#1D4ED8]'
                      : 'border-black/10 text-[#111827] hover:border-black/25'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Primary Shell / Bottle Color */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-semibold text-[#111827]">
                02. Primary Body Color
              </h2>
              <span className="text-xs text-[#52525B]">{baseColor.name}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {COLOR_PALETTE.map((c) => {
                const active = baseColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setBaseColor(c)}
                    aria-label={c.name}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-transform ${
                      active
                        ? 'ring-2 ring-offset-2 ring-[#2563EB] scale-105 border-black/20'
                        : 'border-black/15 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {active && (
                      <Check
                        className={`w-4 h-4 ${
                          c.id === 'sand' ? 'text-[#111827]' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Modular Boot / Bumper / Cap Accent */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-semibold text-[#111827]">
                03. {device === 'bottles' ? 'Boot & Cap Color' : 'Bumper & Ring Accent'}
              </h2>
              <span className="text-xs text-[#52525B]">{accentColor.name}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {ACCENT_PALETTE.map((c) => {
                const active = accentColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setAccentColor(c)}
                    aria-label={c.name}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-transform ${
                      active
                        ? 'ring-2 ring-offset-2 ring-[#2563EB] scale-105 border-black/20'
                        : 'border-black/15 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {active && (
                      <Check
                        className={`w-4 h-4 ${
                          c.id === 'boot-chalk' || c.id === 'boot-peach'
                            ? 'text-[#111827]'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Cap / Pattern & Surface Finish */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xs font-semibold text-[#111827] mb-2.5">
                04. {device === 'bottles' ? 'Lid Style' : 'Backplate Pattern'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {spec.capsOrPatterns.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCapOrPattern(item)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                      capOrPattern === item
                        ? 'border-[#2563EB] bg-[#2563EB]/8 text-[#1D4ED8]'
                        : 'border-black/10 text-[#111827] hover:border-black/25'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-[#111827] mb-2">
                Surface Finish
              </h2>
              <div className="flex items-center gap-1 p-1 bg-[#F3F4F6] rounded-lg">
                {FINISHES.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFinish(f)}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      finish === f
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#52525B] hover:text-[#111827]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 5: Personalization */}
          <div className="pt-4 border-t border-black/[0.07] space-y-3">
            <h2 className="text-xs font-semibold text-[#111827]">
              05. Custom Monogram / Engraving
            </h2>
            <input
              type="text"
              maxLength={12}
              value={monogramText}
              onChange={(e) => setMonogramText(e.target.value)}
              placeholder="Enter up to 12 characters"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg text-[#111827] focus:outline-none focus:border-[#2563EB]"
            />

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-[#F3F4F6] rounded-lg">
                {MONOGRAM_FONTS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setMonogramFont(f)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      monogramFont === f
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#52525B]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {MONOGRAM_COLORS.map((mc) => (
                  <button
                    key={mc.id}
                    type="button"
                    onClick={() => setMonogramColor(mc.hex)}
                    aria-label={`Text color ${mc.name}`}
                    className={`w-6 h-6 rounded-full border border-black/20 ${
                      monogramColor === mc.hex
                        ? 'ring-2 ring-offset-1 ring-[#2563EB]'
                        : ''
                    }`}
                    style={{ backgroundColor: mc.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step 6: Active Add-Ons */}
          <div className="pt-4 border-t border-black/[0.07]">
            <h2 className="text-xs font-semibold text-[#111827] mb-2.5">
              06. Protection & Utility Add-Ons
            </h2>
            <div className="space-y-2">
              {spec.addOns.map((addon) => {
                const checked = addOns.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked
                        ? 'border-[#2563EB] bg-[#2563EB]/5'
                        : 'border-black/10 hover:border-black/25'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddOn(addon.id)}
                        className="w-4 h-4 accent-[#2563EB] rounded"
                      />
                      <span className="text-xs font-medium text-[#111827]">
                        {addon.label}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#52525B] tabular-nums">
                      +${addon.price.toFixed(2)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Summary & CTA */}
          <div className="pt-5 border-t border-black/[0.08]">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-xs text-[#52525B]">Custom Build Total</p>
                <p className="text-[11px] text-[#52525B]">
                  Ships within 48h · 30-day guarantee
                </p>
              </div>
              <span className="font-mono text-2xl font-bold text-[#111827] tabular-nums">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added Custom Build to Bag</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Add Custom Design to Bag — ${totalPrice.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
