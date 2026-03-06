import { create } from 'zustand';
import { CUSTOMERS } from '@/data/demoDb';

interface CustomerState {
  customerId: string; setCustomer: (id: string) => void;
  getCustomer: () => typeof CUSTOMERS[0] | undefined;
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customerId: 'c1',
  setCustomer: (id) => set({ customerId: id }),
  getCustomer: () => CUSTOMERS.find(c => c.id === get().customerId) || CUSTOMERS[0],
}));
