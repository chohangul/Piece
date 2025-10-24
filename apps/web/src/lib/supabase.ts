import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          nickname: string
          email: string | null
          region_code: string | null
          interests: string[]
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      cards: {
        Row: {
          id: string
          user_id: string
          type: 'intro' | 'lifestyle' | 'values' | 'personality' | 'goal'
          meta: any
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['cards']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['cards']['Insert']>
      }
      pieces: {
        Row: {
          id: string
          card_id: string
          idx: number
          content: string
          is_locked: boolean
          unlock_method: 'free_pass' | 'coin' | 'promo' | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pieces']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pieces']['Insert']>
      }
      unlocks: {
        Row: {
          id: string
          user_id: string
          piece_id: string
          method: 'free_pass' | 'coin' | 'promo'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['unlocks']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['unlocks']['Insert']>
      }
      matches: {
        Row: {
          id: string
          user_a: string
          user_b: string
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['matches']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['matches']['Insert']>
      }
      match_intents: {
        Row: {
          id: string
          from_user: string
          to_user: string
          via: 'send_piece' | 'open_last_piece'
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['match_intents']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['match_intents']['Insert']>
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          coins: number
          free_passes: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['wallets']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['wallets']['Insert']>
      }
    }
  }
}
