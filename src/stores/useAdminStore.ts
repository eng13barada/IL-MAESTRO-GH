import { create } from 'zustand';

interface AdminState {
  branchId: string | 'all';
  timeFilter: '7d' | '30d' | '90d';
  setBranch: (id: string | 'all') => void;
  setTimeFilter: (t: '7d' | '30d' | '90d') => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  branchId: 'all',
  timeFilter: '30d',
  setBranch: (id) => set({ branchId: id }),
  setTimeFilter: (t) => set({ timeFilter: t }),
}));
