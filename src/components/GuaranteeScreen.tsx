import React, { useState } from 'react';
import { Calendar, CheckCircle2, MapPin, RefreshCw, ShieldCheck } from 'lucide-react';
import { POPUP_EVENTS } from '../data/catalog';

export const GuaranteeScreen: React.FC = () => {
  const [orderLookup, setOrderLookup] = useState('');
  const [claimType, setClaimType] = useState<'return' | 'warranty'>('warranty');
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterCadence, setNewsletterCadence] = useState<'weekly' | 'monthly'>('weekly');
  const [subscribed, setSubscribed] = useState(false);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderLookup.trim()) return;
    setClaimStatus(
      claimType === 'return'
        ? `Return label generated for ${orderLookup.toUpperCase()} under our 30-day money-back guarantee.`
        : `Replacement authorization opened for ${orderLookup.toUpperCase()} under our 1-year manufacturing defect warranty.`
    );
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12">
      <div className="pb-6 border-b border-black/[0.08]">
        <p className="text-xs font-medium text-[#52525B]">
          Warranty · Returns · Pop-Up Stores · Newsletter
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#111827] mt-1 text-balance">
          Protected After You Unbox
        </h1>
        <p className="text-sm text-[#52525B] mt-2 max-w-2xl">
          Every CLAD accessory protector carries a 30-day money-back guarantee
          and a 1-year manufacturing defect warranty. Visit our offline pop-up
          stores for live engraving or register a claim below.
        </p>
      </div>

      {/* Guarantee Pillars + Claim Lookup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white border border-black/[0.08] rounded-xl p-6">
            <ShieldCheck className="w-6 h-6 text-[#2563EB] mb-3" />
            <h2 className="font-display text-lg font-bold text-[#111827]">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
              Carry it on runs, lectures, or commutes. If the fit or grip isn’t
              right within 30 days of delivery, return it for a full refund.
            </p>
          </div>
          <div className="bg-white border border-black/[0.08] rounded-xl p-6">
            <RefreshCw className="w-6 h-6 text-[#2563EB] mb-3" />
            <h2 className="font-display text-lg font-bold text-[#111827]">
              1-Year Defect Warranty
            </h2>
            <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
              Covers silicone boot splitting, cap seal failure, clasp fatigue,
              and bumper separation for 12 full months.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-black/[0.08] rounded-xl p-6 sm:p-7">
          <h2 className="font-display text-xl font-bold text-[#111827]">
            Self-Service Return & Warranty Portal
          </h2>
          <p className="text-xs text-[#52525B] mt-1">
            Enter your CLAD order ID (e.g. CLD-1042) to initiate a return or
            defect replacement.
          </p>

          <div className="flex items-center gap-1 p-1 bg-[#F3F4F6] rounded-lg mt-4">
            <button
              type="button"
              onClick={() => {
                setClaimType('warranty');
                setClaimStatus(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                claimType === 'warranty'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#52525B]'
              }`}
            >
              1-Year Defect Claim
            </button>
            <button
              type="button"
              onClick={() => {
                setClaimType('return');
                setClaimStatus(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                claimType === 'return'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#52525B]'
              }`}
            >
              30-Day Return Label
            </button>
          </div>

          <form onSubmit={handleClaimSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={orderLookup}
              onChange={(e) => setOrderLookup(e.target.value)}
              placeholder="Order ID (e.g. CLD-1042)"
              className="flex-1 px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg text-[#111827] focus:outline-none focus:border-[#2563EB]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Verify & Submit
            </button>
          </form>

          {claimStatus && (
            <div className="mt-4 p-3.5 bg-[#2563EB]/8 border border-[#2563EB]/25 rounded-lg flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="text-xs text-[#111827] leading-relaxed">{claimStatus}</p>
            </div>
          )}
        </div>
      </div>

      {/* Offline Pop-Up Stores + Weekly/Monthly Newsletter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-black/[0.08] rounded-xl p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[#111827]">
            Offline Pop-Up Studio Calendar
          </h2>
          <p className="text-xs text-[#52525B] mt-1">
            Try bottle boots, swap phone straps, and get live laser engraving in
            person.
          </p>

          <div className="mt-6 divide-y divide-black/[0.07]">
            {POPUP_EVENTS.map((ev) => (
              <div
                key={ev.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
                    <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>
                      {ev.city} — {ev.venue}
                    </span>
                  </div>
                  <p className="text-xs text-[#52525B] mt-1">{ev.focus}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#111827] tabular-nums whitespace-nowrap shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#52525B]" />
                  <span>{ev.dates}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#111827] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs text-white/70">Drop Alerts & Promotions</p>
            <h2 className="font-display text-2xl font-bold mt-1 text-balance">
              Get Designer Series & Pop-Up Updates
            </h2>
            <p className="text-sm text-white/75 mt-2 leading-relaxed">
              Choose weekly or monthly digests for new artist drops, seasonal
              bottle boot colors, and pop-up studio dates.
            </p>
          </div>

          {subscribed ? (
            <div className="mt-6 p-4 bg-white/10 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0" />
              <p className="text-xs text-white leading-relaxed">
                Subscribed ({newsletterCadence} digest) for {newsletterEmail}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="mt-6 space-y-3">
              <div className="flex items-center gap-1 p-1 bg-white/10 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setNewsletterCadence('weekly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    newsletterCadence === 'weekly'
                      ? 'bg-white text-[#111827]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  Weekly
                </button>
                <button
                  type="button"
                  onClick={() => setNewsletterCadence('monthly')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    newsletterCadence === 'monthly'
                      ? 'bg-white text-[#111827]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="flex-1 px-3.5 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#60A5FA]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold text-[#111827] bg-white hover:bg-white/90 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
