// IL MAESTRO — Brand Config & Pricing Constants
export const BRAND = {
  name: 'IL MAESTRO',
  nameAr: 'إيل مايسترو',
  monogram: 'IM',
  taglineEn: 'Italian Precision. Saudi Hospitality.',
  taglineAr: 'دقّة إيطالية… وكرم سعودي.',
  taglines: [
    { en: 'Mastered Grooming, Every Visit.', ar: 'إتقان يليق بكل زيارة.' },
    { en: 'Where Craft Becomes Ritual.', ar: 'حِرفة… تتحول إلى طقس.' },
  ],
  vatRate: 0.15,
  currency: 'SAR',
  currencyAr: 'ريال',
} as const;

export const PRICING = {
  services: {
    haircut: 40,
    beard_trim: 40,
    hair_beard_combo: 65,
    hair_dye: 35,
    hair_wash_cold_towel: 15,
    face_scrub: 15,
    waxing: 20,
    blow_dry: 10,
    hair_straightening: 35,
  },
  packages: {
    essentials: 320,
    grooming: 560,
    executive: 990,
    wedding: 1400,
    student: 280,
    traveler: 420,
  },
  memberships: {
    silver: 149,
    gold: 299,
    black: 599,
  },
} as const;

export const PROMO_CODES = {
  DEMO10: { discount: 0.10, label: 'Demo 10% Off' },
  MAESTRO: { discount: 0.15, label: 'Maestro Member 15% Off' },
  NEWCLIENT: { discount: 0.20, label: 'New Client 20% Off' },
  VIP30: { discount: 0.30, label: 'VIP 30% Off' },
} as const;

export const COLORS = {
  nero: '#0B0D10',
  espresso: '#1A1410',
  oro: '#C8A45D',
  pietra: '#E8E0D2',
  oliva: '#4D5B44',
  cenere: '#A7ABB3',
  offwhite: '#F7F4EF',
  danger: '#B84A3A',
  success: '#2E6B4C',
} as const;
