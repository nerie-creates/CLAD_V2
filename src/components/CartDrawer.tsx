import React, { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem } from '../types';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [orderId, setOrderId] = useState('CLD-1042');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.15 : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal >= 45 || discountedSubtotal === 0 ? 0 : 6;
  const total = discountedSubtotal + shipping;
  const freeShipRemaining = Math.max(0, 45 - discountedSubtotal);

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'ACTIVE15') {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = `CLD-${Math.floor(1050 + Math.random() * 8900)}`;
    setOrderId(generated);
    setStep('confirmed');
    onClearCart();
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={handleCloseDrawer}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-black/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#111827]" />
            <h2 className="font-display text-lg font-bold text-[#111827]">
              {step === 'bag'
                ? 'Your Bag'
                : step === 'checkout'
                ? 'Express Checkout'
                : 'Order Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close bag"
            className="p-2 text-[#52525B] hover:text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'confirmed' ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#2563EB] mx-auto" />
              <div>
                <p className="font-mono text-xs font-semibold text-[#52525B]">
                  Order #{orderId} Confirmed — Preparing Shipment
                </p>
                <h3 className="font-display text-2xl font-bold text-[#111827] mt-1">
                  Thank you, {fullName || 'Athlete'}.
                </h3>
              </div>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Receipt sent to {email || 'your email'}. Protected by our 30-day
                money-back guarantee and 1-year defect warranty.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-[#111827] rounded-lg"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-8 h-8 text-[#52525B] mx-auto" />
              <p className="text-sm font-medium text-[#111827]">
                Your bag is currently empty.
              </p>
              <p className="text-xs text-[#52525B]">
                Add any catalog protector or build a custom design in the Studio.
              </p>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-4">
              <div className="p-3 bg-[#FAFAFA] border border-black/[0.06] rounded-lg text-xs text-[#52525B]">
                {freeShipRemaining > 0 ? (
                  <span>
                    Add{' '}
                    <strong className="font-mono text-[#111827] tabular-nums">
                      ${freeShipRemaining.toFixed(2)}
                    </strong>{' '}
                    more for free shipping.
                  </span>
                ) : (
                  <span className="text-[#111827] font-medium">
                    Free shipping unlocked on this order.
                  </span>
                )}
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-black/[0.07]"
                >
                  <div className="w-20 h-20 bg-[#F3F4F6] rounded-lg p-2 flex items-center justify-center shrink-0">
                    <ResilientImage
                      src={item.image}
                      alt={item.name}
                      fallbackLabel={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#111827] truncate">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#52525B] hover:text-[#111827] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#52525B] mt-0.5 leading-snug">
                      {item.specs.join(' · ')}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-black/15 rounded-md">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#52525B] hover:text-[#111827]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#52525B] hover:text-[#111827]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-semibold text-[#111827] tabular-nums">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (try ACTIVE15)"
                  className="flex-1 px-3 py-2 text-xs bg-[#FAFAFA] border border-black/15 rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-2 text-xs font-semibold text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-[#2563EB] font-medium">
                  ACTIVE15 applied (15% off).
                </p>
              )}
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Email for Receipt & Warranty ID
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Shipping Address
                </label>
                <textarea
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Apartment, City, Postal Code"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep('bag')}
                className="text-xs font-medium text-[#52525B] hover:text-[#111827]"
              >
                ← Back to Bag
              </button>
            </form>
          )}
        </div>

        {items.length > 0 && step !== 'confirmed' && (
          <div className="p-6 border-t border-black/[0.08] bg-[#FAFAFA] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#52525B]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#2563EB]">
                  <span>Discount (15%)</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#52525B]">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-black/[0.07] flex justify-between items-baseline text-sm font-bold text-[#111827]">
                <span>Total</span>
                <span className="font-mono text-lg tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
              >
                Complete Order — ${total.toFixed(2)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
