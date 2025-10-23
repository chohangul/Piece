import { create } from 'zustand';
import { apiClient } from '@/api/client';

interface WalletState {
  coins: number;
  passTier: string;
  isLoading: boolean;

  // Actions
  fetchWallet: () => Promise<void>;
  updateCoins: (amount: number) => void;
  refreshWallet: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  coins: 0,
  passTier: 'free',
  isLoading: false,

  fetchWallet: async () => {
    try {
      set({ isLoading: true });
      const wallet = await apiClient.wallet.get();
      set({
        coins: wallet.coins,
        passTier: wallet.pass_tier,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch wallet:', error);
      set({ isLoading: false });
    }
  },

  updateCoins: (amount: number) => {
    set((state) => ({ coins: state.coins + amount }));
  },

  refreshWallet: async () => {
    await get().fetchWallet();
  },
}));
