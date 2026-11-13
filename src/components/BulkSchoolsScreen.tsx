import React, { useMemo, useState } from 'react';
import { Building2, CheckCircle2, GraduationCap, Users } from 'lucide-react';

const ORG_TYPES = [
  { id: 'school', label: 'School / University', icon: GraduationCap },
  { id: 'corporate', label: 'Corporate Branding', icon: Building2 },
  { id: 'club', label: 'Gym / Run Club', icon: Users },
] as const;

export const BulkSchoolsScreen: React.FC = () => {
  const [orgType, setOrgType] = useState<'school' | 'corporate' | 'club'>('school');
  const [orgName, setOrgName] = useState('Pacific Tech University Athletics');
  const [contactEmail, setContactEmail] = useState('');
  const [crestText, setCrestText] = useState('PACIFIC TECH 26');
  const [brandColor, setBrandColor] = useState('#2563EB');

  const [bottleQty, setBottleQty] = useState(50);
  const [phoneQty, setPhoneQty] = useState(30);
  const [earbudsQty, setEarbudsQty] = useState(20);
  const [laptopQty, setLaptopQty] = useState(15);

  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  const totalUnits = bottleQty + phoneQty + earbudsQty + laptopQty;

  const discountRate =
    totalUnits >= 200 ? 0.3 : totalUnits >= 100 ? 0.24 : totalUnits >= 50 ? 0.18 : 0.1;

  const grossTotal = useMemo(() => {
    return bottleQty * 28 + phoneQty * 30 + earbudsQty * 24 + laptopQty * 36;
  }, [bottleQty, phoneQty, earbudsQty, laptopQty]);

  const netTotal = grossTotal * (1 - discountRate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CLD-B2B-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedQuoteId(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <div className="pb-6 border-b border-black/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#52525B]">
            B2B Corporate Branding · Schools & Universities · Pop-Up Events
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#111827] mt-1 text-balance">
            Custom Bulk Orders for Teams & Campuses
          </h1>
          <p className="text-sm text-[#52525B] mt-2 max-w-2xl">
            Outfit student orientations, corporate wellness kits, and athletic
            clubs with co-branded bottles, phone cases, earbuds armor, and
            laptop shells. Volume tiers unlock at 25+ units.
          </p>
        </div>
        <div className="text-left md:text-right shrink-0">
          <p className="font-mono text-sm font-semibold text-[#111827] tabular-nums">
            Typical order: ~$2,500
          </p>
          <p className="text-xs text-[#52525B]">
            14-day production turnaround
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Live Co-Branding Preview & Allocation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-black/[0.08] rounded-xl p-6 sm:p-8">
            <h2 className="text-sm font-semibold text-[#111827] mb-4">
              01. Organization Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ORG_TYPES.map((item) => {
                const Icon = item.icon;
                const active = orgType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOrgType(item.id)}
                    className={`flex items-center gap-2.5 p-3.5 rounded-lg border text-left transition-colors ${
                      active
                        ? 'border-[#2563EB] bg-[#2563EB]/8 text-[#1D4ED8]'
                        : 'border-black/10 text-[#111827] hover:border-black/25'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-semibold whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-black/[0.07]">
              <h2 className="text-sm font-semibold text-[#111827] mb-4">
                02. Mix-and-Match Protector Quantities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: 'Ace Bottle & Boot Kits ($28 base)',
                    value: bottleQty,
                    setter: setBottleQty,
                  },
                  {
                    label: 'Impact Phone Cases ($30 base)',
                    value: phoneQty,
                    setter: setPhoneQty,
                  },
                  {
                    label: 'Earbuds Armor Cases ($24 base)',
                    value: earbudsQty,
                    setter: setEarbudsQty,
                  },
                  {
                    label: 'AeroShell Laptop Cases ($36 base)',
                    value: laptopQty,
                    setter: setLaptopQty,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="p-4 bg-[#FAFAFA] border border-black/[0.06] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[#111827]">
                        {row.label}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#111827] tabular-nums">
                        {row.value}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={200}
                      step={5}
                      value={row.value}
                      onChange={(e) => row.setter(Number(e.target.value))}
                      className="w-full accent-[#2563EB]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-black/[0.07] grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <h2 className="text-sm font-semibold text-[#111827] mb-2">
                  03. Crest / Team Wordmark Preview
                </h2>
                <input
                  type="text"
                  maxLength={24}
                  value={crestText}
                  onChange={(e) => setCrestText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg text-[#111827] focus:outline-none focus:border-[#2563EB]"
                />
                <div className="flex items-center gap-2 mt-3">
                  {['#2563EB', '#111827', '#4D7C6F', '#E14D43', '#7E3AF2'].map(
                    (hex) => (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => setBrandColor(hex)}
                        aria-label={`Select brand color ${hex}`}
                        className={`w-7 h-7 rounded-full border border-black/15 ${
                          brandColor === hex
                            ? 'ring-2 ring-offset-2 ring-[#2563EB]'
                            : ''
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="bg-[#F3F4F6] rounded-xl p-5 flex items-center justify-center gap-4 border border-black/[0.05]">
                <div
                  className="w-20 h-36 rounded-t-xl rounded-b-2xl flex flex-col justify-between p-2.5 text-white shadow-md"
                  style={{ backgroundColor: brandColor }}
                >
                  <div className="w-10 h-2.5 bg-white/30 rounded-full mx-auto" />
                  <span className="font-display text-[10px] font-bold text-center leading-tight break-words">
                    {crestText || 'TEAM'}
                  </span>
                  <div className="h-4 rounded-b-xl bg-black/20 -mx-2.5 -mb-2.5" />
                </div>

                <div
                  className="w-32 h-24 rounded-lg border-4 p-2 flex items-center justify-center bg-white shadow-sm"
                  style={{ borderColor: brandColor }}
                >
                  <span
                    className="font-display text-xs font-bold text-center leading-tight"
                    style={{ color: brandColor }}
                  >
                    {crestText || 'TEAM'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Quote Calculator & Request Form */}
        <div className="lg:col-span-5 bg-white border border-black/[0.08] rounded-xl p-6 sm:p-7">
          {submittedQuoteId ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-[#2563EB] mx-auto" />
              <h2 className="font-display text-2xl font-bold text-[#111827]">
                Bulk Quote Registered
              </h2>
              <p className="font-mono text-sm font-semibold text-[#111827] tabular-nums">
                Reference: {submittedQuoteId}
              </p>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Our corporate & campus branding team received your{' '}
                <span className="font-mono font-semibold text-[#111827] tabular-nums">
                  {totalUnits}-unit
                </span>{' '}
                specification for {orgName} (est.{' '}
                <span className="font-mono font-semibold text-[#111827] tabular-nums">
                  ${netTotal.toFixed(2)}
                </span>
                ). Digital proof mockups arrive within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedQuoteId(null)}
                className="px-4 py-2 text-xs font-semibold text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg"
              >
                Adjust Quantities
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="font-display text-xl font-bold text-[#111827]">
                  Bulk Estimate Summary
                </h2>
                <p className="text-xs text-[#52525B] mt-0.5">
                  Includes custom laser engraving / UV print & bulk carton logistics
                </p>
              </div>

              <div className="bg-[#FAFAFA] border border-black/[0.06] rounded-lg p-4 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#52525B]">Total Units</span>
                  <span className="font-mono font-semibold text-[#111827] tabular-nums">
                    {totalUnits} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52525B]">Retail Value</span>
                  <span className="font-mono text-[#52525B] tabular-nums">
                    ${grossTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52525B]">
                    Volume Tier Discount ({Math.round(discountRate * 100)}%)
                  </span>
                  <span className="font-mono text-[#2563EB] font-semibold tabular-nums">
                    -${(grossTotal - netTotal).toFixed(2)}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-black/[0.07] flex justify-between items-baseline">
                  <span className="font-semibold text-[#111827]">
                    Estimated Bulk Total
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#111827] tabular-nums">
                    ${netTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    School or Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Work or University Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="branding@university.edu"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-black/15 rounded-lg text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={totalUnits < 10}
                className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#111827] hover:bg-[#1F2937] disabled:opacity-45 rounded-lg transition-colors"
              >
                {totalUnits < 10
                  ? 'Select at least 10 units for bulk quote'
                  : 'Request Official Bulk Quote & Mockup'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
