import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  
  // Actions
  initialize: () => Promise<void>
  signUp: (email: string, password: string, nickname: string, interests: string[]) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: { nickname?: string; interests?: string[]; bio?: string }) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      set({
        user: session?.user || null,
        isAuthenticated: !!session,
        isLoading: false,
      })

      // Listen to auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user || null,
          isAuthenticated: !!session,
        })
      })
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      set({ isLoading: false })
    }
  },

  signUp: async (email: string, password: string, nickname: string, interests: string[]) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          interests,
        },
      },
    })

    if (error) throw error

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          nickname,
          email,
          interests,
          region_code: 'KR',
        })

      if (profileError) throw profileError

      // Create wallet
      const { error: walletError } = await supabase
        .from('wallets')
        .insert({
          user_id: data.user.id,
          coins: 0,
          free_passes: 3,
        })

      if (walletError) throw walletError
    }

    set({
      user: data.user,
      isAuthenticated: !!data.session,
    })
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    set({
      user: data.user,
      isAuthenticated: true,
    })
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    set({
      user: null,
      isAuthenticated: false,
    })
  },

  updateProfile: async (data: { nickname?: string; interests?: string[]; bio?: string }) => {
    const user = get().user
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('users')
      .update(data)
      .eq('id', user.id)

    if (error) throw error
  },
}))
