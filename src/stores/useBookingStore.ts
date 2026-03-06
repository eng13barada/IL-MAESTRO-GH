import { create } from 'zustand';

export interface BookingState {
  step: number; branchId: string | null; barberId: string | null; serviceIds: string[]; date: string | null; time: string | null;
  setStep: (s: number) => void; setBranch: (id: string) => void; setBarber: (id: string) => void;
  toggleService: (id: string) => void; setDateTime: (d: string, t: string) => void; reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1, branchId: null, barberId: null, serviceIds: [], date: null, time: null,
  setStep: (step) => set({ step }),
  setBranch: (branchId) => set({ branchId, barberId: null, step: 2 }),
  setBarber: (barberId) => set({ barberId, step: 3 }),
  toggleService: (id) => set((state) => {
    const has = state.serviceIds.includes(id);
    return { serviceIds: has ? state.serviceIds.filter(i => i !== id) : [...state.serviceIds, id] };
  }),
  setDateTime: (date, time) => set({ date, time, step: 5 }),
  reset: () => set({ step: 1, branchId: null, barberId: null, serviceIds: [], date: null, time: null }),
}));
