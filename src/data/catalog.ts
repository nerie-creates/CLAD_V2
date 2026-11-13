import {
  ColorOption,
  DesignerDrop,
  DeviceCategory,
  LifestyleSegment,
  PopUpEvent,
  Product,
} from '../types';

export const LIFESTYLE_SEGMENTS: LifestyleSegment[] = [
  'Students',
  'Office Workers',
  'Gym Members',
  'Runners',
  'Children',
];

export const DEVICE_LABELS: Record<DeviceCategory, string> = {
  phones: 'Phones',
  earbuds: 'Earbuds',
  laptops: 'Laptops',
  bottles: 'Bottles',
};

export const COLOR_PALETTE: ColorOption[] = [
  { id: 'obsidian', name: 'Obsidian Matte', hex: '#18181B', secondaryHex: '#27272A' },
  { id: 'cobalt', name: 'Electric Cobalt', hex: '#2563EB', secondaryHex: '#1D4ED8' },
  { id: 'sage', name: 'Track Sage', hex: '#4D7C6F', secondaryHex: '#3B6358' },
  { id: 'coral', name: 'Pulse Coral', hex: '#E14D43', secondaryHex: '#BE3A31' },
  { id: 'sand', name: 'Warm Stone', hex: '#D6D3CD', secondaryHex: '#A8A29E' },
  { id: 'lilac', name: 'Mist Lilac', hex: '#9B8FB8', secondaryHex: '#7B6FA0' },
];

export const ACCENT_PALETTE: ColorOption[] = [
  { id: 'boot-cobalt', name: 'Cobalt Bumper', hex: '#2563EB' },
  { id: 'boot-charcoal', name: 'Graphite Ring', hex: '#18181B' },
  { id: 'boot-peach', name: 'Soft Peach', hex: '#F4A28C' },
  { id: 'boot-mint', name: 'Aqua Mint', hex: '#38B2AC' },
  { id: 'boot-plum', name: 'Berry Plum', hex: '#7E3AF2' },
  { id: 'boot-chalk', name: 'Chalk White', hex: '#F3F4F6' },
];

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 'ace-bottle-protector-kit',
    name: 'Ace Bottle Armor & Boot Kit',
    category: 'bottles',
    categoryLabel: 'Bottles',
    price: 32,
    image:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTVibrantCandyAceMediumAquaCandy.png',
    secondaryImage:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyPeachMediumBoot.png',
    tag: 'Customizable',
    description:
      'Double-wall insulated bottle paired with an impact-absorbing silicone base boot and interchangeable flip/sip cap.',
    protectionSpec: '360° silicone base shock guard · BPA-free · Leak-lock lid',
    lifestyles: ['Gym Members', 'Runners', 'Students'],
    colors: [COLOR_PALETTE[1], COLOR_PALETTE[2], COLOR_PALETTE[5], COLOR_PALETTE[3]],
    models: ['Medium 18oz (530ml)', 'Mega 32oz (950ml)', 'Mini 12oz (350ml)'],
  },
  {
    id: 'impact-magsafe-phone-case',
    name: 'Impact Shield MagSafe Case',
    category: 'phones',
    categoryLabel: 'Phones',
    price: 34,
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/raw/4f43c6e60b2e8e3b8d57319f8900ae21.png',
    secondaryImage:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/8df342dc53f9b5a9b710e0a71fb1c821.png',
    tag: '3.5m Drop Rated',
    description:
      'Dual-density elastomer bumper with raised camera bezel and magnetic ring alignment for active commutes and trail runs.',
    protectionSpec: 'MIL-STD-810G 3.5m drop tested · MagSafe lock · Anti-yellowing',
    lifestyles: ['Runners', 'Students', 'Office Workers'],
    colors: [COLOR_PALETTE[0], COLOR_PALETTE[1], COLOR_PALETTE[4], COLOR_PALETTE[3]],
    models: ['iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro', 'Galaxy S25 Ultra'],
  },
  {
    id: 'earbuds-active-armor',
    name: 'BounceLock Earbuds Armor',
    category: 'earbuds',
    categoryLabel: 'Earbuds',
    price: 26,
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/6e42e0fcd27922c581bdc1028ebdd6ad.png',
    tag: 'Sweat & Drop Guard',
    description:
      'Snap-fit polycarbonate shell with reinforced corner bumpers and anodized carabiner clip built for gym bags and intervals.',
    protectionSpec: '2m impact guard · Precision LED window · Aluminum clip',
    lifestyles: ['Gym Members', 'Runners', 'Students'],
    colors: [COLOR_PALETTE[0], COLOR_PALETTE[2], COLOR_PALETTE[1], COLOR_PALETTE[5]],
    models: ['AirPods Pro 2', 'AirPods 4', 'Galaxy Buds 3 Pro'],
  },
  {
    id: 'laptop-impact-hardshell',
    name: 'AeroShell Laptop Protector',
    category: 'laptops',
    categoryLabel: 'Laptops',
    price: 38,
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/a787a5ba100afcb8e54eed61a360fa3f.png',
    tag: 'Corner Bumper Fit',
    description:
      'Scratch-proof frosted shell with shock-dispersing corner ribs and ventilated base channels for campus and office travel.',
    protectionSpec: 'Polycarbonate armor · Thermal vent slots · Micro-fiber inner trim',
    lifestyles: ['Office Workers', 'Students'],
    colors: [COLOR_PALETTE[0], COLOR_PALETTE[4], COLOR_PALETTE[1]],
    models: ['MacBook Air 13"', 'MacBook Pro 14"', 'MacBook Pro 16"'],
  },
  {
    id: 'runner-crossbody-strap-kit',
    name: 'Crossbody Utility Phone Strap',
    category: 'phones',
    categoryLabel: 'Phones',
    price: 28,
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/raw/0255461e69c2a4256db93ba0814b49b5.png',
    tag: 'Hands-Free Carry',
    description:
      'Quick-release woven cord strap with reinforced anchor card that slips cleanly into any full-coverage phone protector.',
    protectionSpec: '15kg tensile clasp · Sweat-resistant weave · Adjustable length',
    lifestyles: ['Runners', 'Students', 'Children'],
    colors: [COLOR_PALETTE[0], COLOR_PALETTE[1], COLOR_PALETTE[3], COLOR_PALETTE[2]],
    models: ['Universal Anchor Fit'],
  },
  {
    id: 'bottle-cloud-boot-charm',
    name: 'Cloud Silicone Boot & Cap Set',
    category: 'bottles',
    categoryLabel: 'Bottles',
    price: 24,
    image:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTVibrantCandyCloudCharmBootMedium_Purple.png',
    secondaryImage:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyFlipCapJellyPopBlue.png',
    tag: 'Kid-Safe Grip',
    description:
      'High-cushion bottle base sleeve paired with an easy-flip straw cap and playful loop charm to prevent dents and clatter.',
    protectionSpec: 'Food-grade silicone · Anti-slip tread · Dishwasher safe',
    lifestyles: ['Children', 'Gym Members', 'Students'],
    colors: [COLOR_PALETTE[5], COLOR_PALETTE[3], COLOR_PALETTE[1]],
    models: ['Mini 12oz', 'Medium 18oz', 'Mega 32oz'],
  },
  {
    id: 'gradient-ace-bottle-duo',
    name: 'Dreamy Gradient Bottle Protector',
    category: 'bottles',
    categoryLabel: 'Bottles',
    price: 35,
    image:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/Dreamy_Medium_-_Peach_Melon_cfac6eaf-4bd7-469b-99f1-b3884a921bf4.png',
    secondaryImage:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/Dreamy_Mega_-_Mulberry_Mist_eec6f394-cc02-4cc4-8114-11e238b68853.png',
    tag: 'Powder Coat',
    description:
      'Scratch-resistant powder-coated stainless body with custom laser monogram zone and matching silicone bumper sleeve.',
    protectionSpec: '12h hot / 24h cold · Scratch-shield coat · Custom engraving',
    lifestyles: ['Office Workers', 'Students', 'Gym Members'],
    colors: [COLOR_PALETTE[3], COLOR_PALETTE[5], COLOR_PALETTE[2]],
    models: ['Medium 18oz (530ml)', 'Mega 32oz (950ml)'],
  },
  {
    id: 'sapphire-screen-lens-pack',
    name: 'Sapphire Glass & Lens Guard',
    category: 'phones',
    categoryLabel: 'Phones',
    price: 29,
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/e7ecde6732c7d2e8a3d7abdc82adf280.png',
    tag: '9H Hardness',
    description:
      'Oleophobic tempered glass protector with alignment tray and individual metal-ring camera lens shields.',
    protectionSpec: '9H scratch defense · Edge-to-edge fit · Anti-fingerprint',
    lifestyles: ['Office Workers', 'Runners', 'Students'],
    colors: [COLOR_PALETTE[0], COLOR_PALETTE[4]],
    models: ['iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro'],
  },
  {
    id: 'charm-loop-kids-pack',
    name: 'Kinetic Charm & Bumper Pack',
    category: 'earbuds',
    categoryLabel: 'Earbuds',
    price: 25,
    image:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/raw/e113c8e0bb32e3e231a08be4b461769c.png',
    secondaryImage:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyJellyJoyCharmJellySET.png',
    tag: 'Mix & Clip',
    description:
      'Shock-absorbing silicone loop charms and wrist tether engineered to clip onto earbuds cases, phones, and kids bottles.',
    protectionSpec: 'Soft-touch TPE · Reinforced clasp · Kid-friendly rounded edges',
    lifestyles: ['Children', 'Students'],
    colors: [COLOR_PALETTE[3], COLOR_PALETTE[5], COLOR_PALETTE[1]],
    models: ['Universal Loop Fit'],
  },
];

export const DESIGNER_DROPS: DesignerDrop[] = [
  {
    id: 'nordic-kinetic-studio',
    title: 'Nordic Kinetic Pop',
    collaborator: 'Marimekko Print Lab',
    roleLabel: 'Designer Series',
    season: '2026 Capsule',
    story:
      'Bold architectural florals engineered onto impact-rated polycarbonate and powder-coated stainless steel for campus and studio runs.',
    bundlePrice: 98,
    individualPrice: 124,
    heroImage:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/98bc778f99ea93be5555e4ac5f89395f.png',
    accentHex: '#2563EB',
    patternName: 'Kinetic Poppy Grid',
    devicesIncluded: ['phones', 'earbuds', 'laptops', 'bottles'],
    lifestyleFit: ['Students', 'Office Workers'],
  },
  {
    id: 'atelier-kitsune-run',
    title: 'Pace Club Atelier',
    collaborator: 'Maison Kitsune × KOL Run Crew',
    roleLabel: 'KOL & Brand Collab',
    season: 'Active Edition',
    story:
      'Co-created with urban marathon pacers for sweat-proof grip across morning 10Ks, gym lockers, and post-run cafe laptops.',
    bundlePrice: 104,
    individualPrice: 132,
    heroImage:
      'https://cdn-image02.casetify.com/img-proxy/jpg/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/172f092b3cef364fa3dd9c48dc7688a0.jpg',
    accentHex: '#4D7C6F',
    patternName: 'Pace Checkered Stripe',
    devicesIncluded: ['phones', 'earbuds', 'bottles'],
    lifestyleFit: ['Runners', 'Gym Members'],
  },
  {
    id: 'matisse-cutout-gallery',
    title: 'Cutout Studio Forms',
    collaborator: 'Henri Matisse Archive',
    roleLabel: 'Artist & Museum Series',
    season: 'Curated Print',
    story:
      'Sculptural cobalt and terracotta paper cutouts sealed beneath a scratch-proof UV barrier for everyday desk and travel carry.',
    bundlePrice: 96,
    individualPrice: 120,
    heroImage:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/f6af05568d1a10c9d9c8066e6d9ff461.png',
    accentHex: '#1D4ED8',
    patternName: 'Cobalt Cutout',
    devicesIncluded: ['phones', 'laptops', 'earbuds'],
    lifestyleFit: ['Office Workers', 'Students'],
  },
  {
    id: 'plaid-play-hydration',
    title: 'Plaid & Play Capsule',
    collaborator: 'Sora Takahashi',
    roleLabel: 'Celebrity & Designer Drop',
    season: 'Limited Drop',
    story:
      'Crisp grid lines and high-bounce silicone boots designed for gym bags, youth athletics, and coordinated family gear.',
    bundlePrice: 88,
    individualPrice: 112,
    heroImage:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTPlaid_PlayAceMegaNavyLinesFront.png',
    accentHex: '#18181B',
    patternName: 'Gridline Navy',
    devicesIncluded: ['bottles', 'earbuds', 'phones'],
    lifestyleFit: ['Gym Members', 'Children', 'Students'],
  },
];

export const POPUP_EVENTS: PopUpEvent[] = [
  {
    id: 'sg-orchard',
    city: 'Singapore',
    venue: 'Orchard Design Atrium, Level 1',
    dates: 'Nov 22 – Dec 06, 2026',
    focus: 'Live 10-minute Bottle Laser Engraving & Phone Drop Test Lab',
  },
  {
    id: 'kl-trx',
    city: 'Kuala Lumpur',
    venue: 'The Exchange TRX Concourse',
    dates: 'Dec 11 – Dec 21, 2026',
    focus: 'Designer Series Capsule Preview & Run Club Boot Swaps',
  },
  {
    id: 'tokyo-shibuya',
    city: 'Tokyo',
    venue: 'Shibuya Scramble Pop-Up Studio',
    dates: 'Jan 08 – Jan 19, 2027',
    focus: 'Custom Earbuds & Laptop Armor Bar + Campus Bulk Desk',
  },
];

export const DEVICE_CUSTOM_OPTIONS: Record<
  DeviceCategory,
  {
    title: string;
    subtitle: string;
    basePrice: number;
    models: string[];
    capsOrPatterns: string[];
    addOns: { id: string; label: string; price: number }[];
    previewImage: string;
    detailImages: Record<string, string>;
  }
> = {
  bottles: {
    title: 'Ace Bottle & Boot Protector',
    subtitle: 'Modular insulated bottle with shock-guard silicone boot, custom cap & engraving.',
    basePrice: 28,
    models: ['Mini 12oz (Kids / Run)', 'Medium 18oz (Everyday)', 'Mega 32oz (Gym)'],
    capsOrPatterns: ['Easy-Sip Straw Cap', 'Quick-Flip Cap', 'Flex Loop Handle Cap'],
    addOns: [
      { id: 'silicone-boot', label: 'Shock-Guard Silicone Boot (+$4)', price: 4 },
      { id: 'boot-charm', label: 'Active Loop Charm (+$3)', price: 3 },
      { id: 'laser-engrave', label: 'Precision Laser Monogram (+$4)', price: 4 },
    ],
    previewImage:
      'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTVibrantCandyAceMediumAquaCandy.png',
    detailImages: {
      'Easy-Sip Straw Cap':
        'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTVibrantCandyAcesipcapblue.png',
      'Quick-Flip Cap':
        'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyFlipCapJellyPopBlue.png',
      'Flex Loop Handle Cap':
        'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyAceEasyFlexCapJellyPeach.png',
    },
  },
  phones: {
    title: 'Impact MagSafe Phone Protector',
    subtitle: '3.5m drop-rated bumper case with customizable backplate print, ring & strap.',
    basePrice: 30,
    models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'Galaxy S25 Ultra'],
    capsOrPatterns: ['Clean Solid Shield', 'Gridline Geometric', 'Kinetic Wave'],
    addOns: [
      { id: 'magsafe-ring', label: 'Reinforced MagSafe Array (+$4)', price: 4 },
      { id: 'crossbody-strap', label: 'Runner Crossbody Cord (+$6)', price: 6 },
      { id: 'lens-guard', label: 'Sapphire Lens Ring Set (+$5)', price: 5 },
    ],
    previewImage:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/raw/4f43c6e60b2e8e3b8d57319f8900ae21.png',
    detailImages: {
      'Clean Solid Shield':
        'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/8df342dc53f9b5a9b710e0a71fb1c821.png',
      'Gridline Geometric':
        'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/98bc778f99ea93be5555e4ac5f89395f.png',
      'Kinetic Wave':
        'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/f6af05568d1a10c9d9c8066e6d9ff461.png',
    },
  },
  earbuds: {
    title: 'BounceLock Earbuds Case',
    subtitle: 'Sweat-resistant impact shell with corner shock pods and lockable carabiner.',
    basePrice: 24,
    models: ['AirPods Pro (2nd Gen)', 'AirPods 4', 'Galaxy Buds 3 Pro'],
    capsOrPatterns: ['Smooth Armor Shell', 'Ribbed Grip Texture', 'Translucent Frost'],
    addOns: [
      { id: 'carabiner', label: 'Anodized Aluminum Carabiner (+$3)', price: 3 },
      { id: 'charm-tether', label: 'Silicone Wrist Tether (+$3)', price: 3 },
    ],
    previewImage:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/6e42e0fcd27922c581bdc1028ebdd6ad.png',
    detailImages: {},
  },
  laptops: {
    title: 'AeroShell Laptop Protector',
    subtitle: 'Featherweight polycarbonate hardshell with corner impact guards for daily carry.',
    basePrice: 36,
    models: ['MacBook Air 13" (M3/M4)', 'MacBook Pro 14"', 'MacBook Pro 16"'],
    capsOrPatterns: ['Architectural Matte', 'Tinted Translucent', 'Studio Stripe'],
    addOns: [
      { id: 'corner-bumpers', label: 'Dual-Density Corner Guards (+$5)', price: 5 },
      { id: 'trackpad-film', label: 'Matte Trackpad & Palm Shield (+$4)', price: 4 },
    ],
    previewImage:
      'https://cdn-image02.casetify.com/img-proxy/png/0/0/350x/ctgimage1.s3.amazonaws.com/cms/image/a787a5ba100afcb8e54eed61a360fa3f.png',
    detailImages: {},
  },
};
