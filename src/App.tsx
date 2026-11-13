import React, { useState } from 'react';
import { BulkSchoolsScreen } from './components/BulkSchoolsScreen';
import { CartDrawer } from './components/CartDrawer';
import { CustomStudioScreen } from './components/CustomStudioScreen';
import { DesignerSeriesScreen } from './components/DesignerSeriesScreen';
import { GuaranteeScreen } from './components/GuaranteeScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { StorefrontScreen } from './components/StorefrontScreen';
import { TopBar } from './components/TopBar';
import { DEVICE_LABELS } from './data/catalog';
import {
  CartItem,
  ColorOption,
  CustomDesignConfig,
  DesignerDrop,
  DeviceCategory,
  Product,
  ScreenId,
} from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('shop');
  const [studioDevice, setStudioDevice] = useState<DeviceCategory>('bottles');
  const [studioPattern, setStudioPattern] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-ace-kit',
      name: 'Ace Bottle Armor & Boot Kit',
      category: 'bottles',
      unitPrice: 32,
      quantity: 1,
      image:
        'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTVibrantCandyAceMediumAquaCandy.png',
      specs: ['Medium 18oz (530ml)', 'Electric Cobalt'],
      isCustom: false,
    },
  ]);

  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStudio = (device: DeviceCategory, pattern?: string) => {
    setStudioDevice(device);
    setStudioPattern(pattern);
    setActiveScreen('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProductToCart = (
    product: Product,
    model: string,
    color: ColorOption
  ) => {
    const itemId = `${product.id}-${model}-${color.id}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          name: product.name,
          category: product.category,
          unitPrice: product.price,
          quantity: 1,
          image: product.image,
          specs: [model, color.name],
          isCustom: false,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleAddCustomToCart = (
    config: CustomDesignConfig,
    unitPrice: number,
    previewImage: string
  ) => {
    const itemId = `custom-${config.device}-${Date.now()}`;
    const specs = [
      config.model,
      config.baseColor.name,
      config.accentColor.name,
      config.capOrPattern,
      config.monogramText ? `Engraved "${config.monogramText}"` : 'No Monogram',
    ];
    setCartItems((prev) => [
      ...prev,
      {
        id: itemId,
        name: `Custom ${DEVICE_LABELS[config.device]} Protector`,
        category: config.device,
        unitPrice,
        quantity: 1,
        image: previewImage,
        specs,
        isCustom: true,
      },
    ]);
    setCartOpen(true);
  };

  const handleAddDropBundle = (drop: DesignerDrop) => {
    const itemId = `drop-${drop.id}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          name: `${drop.title} Complete Set`,
          category: drop.devicesIncluded[0],
          unitPrice: drop.bundlePrice,
          quantity: 1,
          image: drop.heroImage,
          specs: [
            drop.collaborator,
            drop.devicesIncluded.map((d) => DEVICE_LABELS[d]).join(' + '),
          ],
          isCustom: false,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111827]">
      <TopBar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        cartCount={totalCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {activeScreen === 'shop' && (
          <StorefrontScreen
            onNavigate={handleNavigate}
            onOpenStudio={(device) => handleOpenStudio(device)}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onQuickAdd={handleAddProductToCart}
          />
        )}

        {activeScreen === 'studio' && (
          <CustomStudioScreen
            key={`${studioDevice}-${studioPattern || 'default'}`}
            initialDevice={studioDevice}
            initialPattern={studioPattern}
            onAddCustomToCart={handleAddCustomToCart}
          />
        )}

        {activeScreen === 'designer' && (
          <DesignerSeriesScreen
            onAddDropBundle={handleAddDropBundle}
            onCustomizeDrop={(device, pattern) =>
              handleOpenStudio(device, pattern)
            }
          />
        )}

        {activeScreen === 'bulk' && <BulkSchoolsScreen />}

        {activeScreen === 'guarantee' && <GuaranteeScreen />}
      </main>

      <footer className="border-t border-black/[0.08] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-display text-lg font-bold text-[#111827]">
              CLAD
            </span>
            <p className="text-xs text-[#52525B] mt-1">
              Wholistic protection in style for phones, earbuds, laptops, and
              bottles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#52525B]">
            <button
              type="button"
              onClick={() => handleNavigate('shop')}
              className="hover:text-[#111827] transition-colors"
            >
              Shop All
            </button>
            <button
              type="button"
              onClick={() => handleOpenStudio('bottles')}
              className="hover:text-[#111827] transition-colors"
            >
              Custom Studio
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('designer')}
              className="hover:text-[#111827] transition-colors"
            >
              Designer Series
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('bulk')}
              className="hover:text-[#111827] transition-colors"
            >
              Corporate & Schools
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('guarantee')}
              className="hover:text-[#111827] transition-colors"
            >
              30-Day Guarantee & Pop-Ups
            </button>
          </div>
        </div>
      </footer>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddProductToCart}
        onOpenInStudio={(device) => handleOpenStudio(device)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
