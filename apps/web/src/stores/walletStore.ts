import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface Wallet {
  id: string
  user_id: string
  coins: number
  free_passes: number
}

interface WalletState {
  wallet: Wallet | null
  isLoading: boolean
  
  // Actions
  fetchWallet: () => Promise<void>
  unlockPiece: (pieceId: string, method: 'free_pass' | 'coin') => Promise<void>
}

export const useWalletStore = create<WalletState>((set, get) => ({
  wallet: null,
  isLoading: false,

  fetchWallet: async () => {
    set({ isLoading: true })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      set({ wallet: data, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch wallet:', error)
      set({ isLoading: false })
    }
  },

  unlockPiece: async (pieceId: string, method: 'free_pass' | 'coin') => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const wallet = get().wallet
    if (!wallet) throw new Error('Wallet not loaded')

    // Check if user has enough resources
    if (method === 'free_pass' && wallet.free_passes <= 0) {
      throw new Error('Not enough free passes')
    }
    if (method === 'coin' && wallet.coins < 1) {
      throw new Error('Not enough coins')
    }

    // Create unlock record
    const { error: unlockError } = await supabase
      .from('unlocks')
      .insert({
        user_id: user.id,
        piece_id: pieceId,
        method,
      })

    if (unlockError) throw unlockError

    // Update piece
    const { error: pieceError } = await supabase
      .from('pieces')
      .update({
        is_locked: false,
        unlock_method: method,
      })
      .eq('id', pieceId)

    if (pieceError) throw pieceError

    // Deduct from wallet
    const updates: any = {}
    if (method === 'free_pass') {
      updates.free_passes = wallet.free_passes - 1
    } else if (method === 'coin') {
      updates.coins = wallet.coins - 1
    }

    const { error: walletError } = await supabase
      .from('wallets')
      .update(updates)
      .eq('user_id', user.id)

    if (walletError) throw walletError

    // Refresh wallet
    await get().fetchWallet()
  },
}))
