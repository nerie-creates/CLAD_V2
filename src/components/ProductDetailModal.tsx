import React, { useState } from 'react';
import { Check, ShieldCheck, Sliders, X } from 'lucide-react';
import { ColorOption, DeviceCategory, Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, model: string, color: ColorOption) => void;
  onOpenInStudio: (device: DeviceCategory) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenInStudio,
}) => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedColorId, setSelectedColorId] = useState<string>('');
  const [showSecondary, setShowSecondary] = useState(false);

  if (!product) return null;

  const activeModel = selectedModel || product.models[0];
  const activeColor =
    product.colors.find((c) => c.id === selectedColorId) || product.colors[0];

  const activeImage =
    showSecondary && product.secondaryImage ? product.secondaryImage : product.image;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl rounded-xl border border-black/10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#F3F4F6] p-8 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between text-xs text-[#52525B]">
            <span>{product.categoryLabel}</span>
            {product.secondaryImage && (
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowSecondary(false)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                    !showSecondary
                      ? 'bg-[#111827] text-white'
                      : 'text-[#52525B] hover:text-[#111827]'
                  }`}
                >
                  Primary
                </button>
                <button
                  type="button"
                  onClick={() => setShowSecondary(true)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                    showSecondary
                      ? 'bg-[#111827] text-white'
                      : 'text-[#52525B] hover:text-[#111827]'
                  }`}
                >
                  Detail
                </button>
              </div>
            )}
          </div>

          <div className="my-auto py-6 flex items-center justify-center">
            <ResilientImage
              src={activeImage}
              alt={product.name}
              fallbackLabel={product.name}
              className="w-full max-h-[300px] object-contain"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#52525B]">
            <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span>{product.protectionSpec}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#52525B]">
                  {product.categoryLabel}
                  {product.tag ? ` · ${product.tag}` : ''}
                </p>
                <h2
                  id="pdp-title"
                  className="font-display text-2xl font-bold text-[#111827] mt-1 text-balance"
                >
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="p-2 text-[#52525B] hover:text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-2xl font-semibold text-[#111827] tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#52525B]">
                In Stock · 30-Day Money-Back Guarantee
              </span>
            </div>

            <p className="mt-4 text-sm text-[#52525B] leading-relaxed">
              {product.description}
            </p>

            <div className="mt-5 text-xs text-[#52525B]">
              Built for: {product.lifestyles.join(' · ')}
            </div>

            <div className="mt-6">
              <label className="block text-xs font-semibold text-[#111827] mb-2">
                Select Fit / Capacity
              </label>
              <div className="flex flex-wrap gap-2">
                {product.models.map((model) => {
                  const isSelected = activeModel === model;
                  return (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'border-[#2563EB] bg-[#2563EB]/8 text-[#1D4ED8]'
                          : 'border-black/10 text-[#111827] hover:border-black/30'
                      }`}
                    >
                      {model}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#111827]">
                  Colorway
                </span>
                <span className="text-xs text-[#52525B]">{activeColor.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = activeColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColorId(color.id)}
                      aria-label={`Select color ${color.name}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-transform ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[#2563EB] scale-105 border-black/20'
                          : 'border-black/15 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            color.id === 'sand' ? 'text-[#111827]' : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.07] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                onAddToCart(product, activeModel, activeColor);
                onClose();
              }}
              className="flex-1 py-3 px-5 text-sm font-semibold text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors whitespace-nowrap"
            >
              Add to Bag — ${product.price.toFixed(2)}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenInStudio(product.category);
              }}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
