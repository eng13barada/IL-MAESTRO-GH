import { create } from 'zustand';

interface AppState {
  locale: 'ar' | 'en';
  theme: 'light' | 'dark';
  setLocale: (l: 'ar' | 'en') => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'ar',
  theme: 'light',
  setLocale: (locale) => set({ locale }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
