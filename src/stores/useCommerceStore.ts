import { create } from 'zustand';
import { PRICING, PROMO_CODES } from '@/config/brand';
import { calcVat, calcTotal, generateInvoiceNumber } from '@/lib/money';

export interface CartItem {
  id: string; type: 'service' | 'package' | 'membership'; nameEn: string; nameAr: string;
  price: number; quantity: number; image?: string;
}
export interface Order { id: string; items: CartItem[]; subtotal: number; discount: number; vat: number; total: number; date: string; customerId?: string; }
interface CommerceState {
  cart: CartItem[]; promoCode: string | null; discountAmount: number; orders: Order[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  applyPromo: (code: string) => boolean;
  clearCart: () => void; checkout: (customerId?: string) => string;
  getTotals: () => { subtotal: number; discount: number; vat: number; total: number };
}

export const useCommerceStore = create<CommerceState>((set, get) => ({
  cart: [], promoCode: null, discountAmount: 0, orders: [],
  addItem: (item) => set((state) => {
    const ex = state.cart.find(i => i.id === item.id);
    if (ex) return { cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),
  removeItem: (id) => set(s => ({ cart: s.cart.filter(i => i.id !== id) })),
  updateQuantity: (id, q) => set(s => ({ cart: s.cart.map(i => i.id === id ? { ...i, quantity: Math.max(1, q) } : i) })),
  applyPromo: (code) => {
    const up = code.toUpperCase(); if (up in PROMO_CODES) { set({ promoCode: up, discountAmount: PROMO_CODES[up as keyof typeof PROMO_CODES].discount }); return true; } return false;
  },
  clearCart: () => set({ cart: [], promoCode: null, discountAmount: 0 }),
  getTotals: () => {
    const s = get(); const sub = s.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const disc = sub * s.discountAmount; const afterD = sub - disc; const vat = calcVat(afterD); return { subtotal: sub, discount: disc, vat, total: calcTotal(afterD) };
  },
  checkout: (cid) => {
    const { cart, orders, getTotals, clearCart } = get(); if (!cart.length) return '';
    const to = getTotals(); const id = generateInvoiceNumber();
    set({ orders: [...orders, { id, items: [...cart], ...to, date: new Date().toISOString(), customerId: cid }] });
    clearCart(); return id;
  }
}));
