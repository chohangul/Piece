import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark' | 'auto';
  language: 'ko' | 'en';
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (language: 'ko' | 'en') => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'auto',
  language: 'ko',

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));
