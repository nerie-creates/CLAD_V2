export type ScreenId =
  | 'shop'
  | 'studio'
  | 'designer'
  | 'bulk'
  | 'guarantee';

export type DeviceCategory = 'phones' | 'earbuds' | 'laptops' | 'bottles';

export type LifestyleSegment =
  | 'Students'
  | 'Office Workers'
  | 'Gym Members'
  | 'Runners'
  | 'Children';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
}

export interface Product {
  id: string;
  name: string;
  category: DeviceCategory;
  categoryLabel: string;
  price: number;
  image: string;
  secondaryImage?: string;
  tag?: string;
  description: string;
  protectionSpec: string;
  lifestyles: LifestyleSegment[];
  colors: ColorOption[];
  models: string[];
  designerName?: string;
}

export interface CustomDesignConfig {
  device: DeviceCategory;
  model: string;
  baseColor: ColorOption;
  accentColor: ColorOption;
  capOrPattern: string;
  finish: 'Matte Shield' | 'Frosted Grip' | 'Impact Clear';
  monogramText: string;
  monogramFont: 'Outfit' | 'Mono' | 'Classic';
  monogramColor: string;
  addOns: string[];
  designerOverlay?: string;
}

export interface CartItem {
  id: string;
  name: string;
  category: DeviceCategory;
  unitPrice: number;
  quantity: number;
  image: string;
  specs: string[];
  isCustom: boolean;
}

export interface DesignerDrop {
  id: string;
  title: string;
  collaborator: string;
  roleLabel: string;
  season: string;
  story: string;
  bundlePrice: number;
  individualPrice: number;
  heroImage: string;
  accentHex: string;
  patternName: string;
  devicesIncluded: DeviceCategory[];
  lifestyleFit: LifestyleSegment[];
}

export interface PopUpEvent {
  id: string;
  city: string;
  venue: string;
  dates: string;
  focus: string;
}
