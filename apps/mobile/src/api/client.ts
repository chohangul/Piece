/**
 * API Client
 * Centralized API calls using Supabase and React Query
 */

import { supabase } from '@/lib/supabase';
import { API_ROUTES } from '@piece/config';

export const apiClient = {
  // Auth
  auth: {
    signUp: async (email: string, password: string, metadata: { nickname: string; interests: string[] }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) throw error;
      return data;
    },

    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    getSession: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
  },

  // Cards
  cards: {
    list: async (userId?: string) => {
      let query = supabase.from('cards').select('*');
      if (userId) {
        query = query.eq('user_id', userId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (card: { type: string; meta: Record<string, any> }) => {
      const { data, error } = await supabase.from('cards').insert(card).select().single();
      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: { meta?: Record<string, any>; is_active?: boolean }) => {
      const { data, error } = await supabase.from('cards').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },

    delete: async (id: string) => {
      const { error } = await supabase.from('cards').delete().eq('id', id);
      if (error) throw error;
    },
  },

  // Pieces
  pieces: {
    list: async (cardId: string) => {
      const { data, error } = await supabase.from('pieces').select('*').eq('card_id', cardId).order('idx');
      if (error) throw error;
      return data;
    },

    unlock: async (pieceId: string, method: 'free_pass' | 'coin' | 'promo') => {
      // This should call an Edge Function for proper validation
      const { data, error } = await supabase.from('unlocks').insert({
        piece_id: pieceId,
        method,
      }).select().single();
      if (error) throw error;
      return data;
    },
  },

  // Feed
  feed: {
    list: async (filters?: { region?: string; interests?: string[]; sort?: string; page?: number; limit?: number }) => {
      let query = supabase
        .from('cards')
        .select('*, user:users(*), pieces(*)')
        .eq('is_active', true);

      if (filters?.region) {
        query = query.eq('users.region_code', filters.region);
      }

      const limit = filters?.limit || 20;
      const page = filters?.page || 1;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  },

  // Match
  match: {
    sendPiece: async (toUserId: string, via: 'send_piece' | 'open_last_piece') => {
      const { data, error } = await supabase.from('match_intents').insert({
        to_user: toUserId,
        via,
      }).select().single();
      if (error) throw error;
      return data;
    },

    respond: async (intentId: string, accept: boolean) => {
      const { data, error } = await supabase
        .from('match_intents')
        .update({ status: accept ? 'accepted' : 'rejected' })
        .eq('id', intentId)
        .select()
        .single();
      if (error) throw error;

      // If accepted, create a match
      if (accept) {
        const { data: matchData, error: matchError } = await supabase.from('matches').insert({
          user_a: data.from_user,
          user_b: data.to_user,
        }).select().single();
        if (matchError) throw matchError;
        return matchData;
      }

      return data;
    },

    list: async () => {
      const { data, error } = await supabase.from('matches').select('*, user_a:users!matches_user_a_fkey(*), user_b:users!matches_user_b_fkey(*)').eq('is_active', true);
      if (error) throw error;
      return data;
    },
  },

  // Wallet
  wallet: {
    get: async () => {
      const { data, error } = await supabase.from('wallets').select('*').single();
      if (error) throw error;
      return data;
    },

    transactions: async () => {
      const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  },

  // Report
  report: {
    create: async (report: { target_type: string; target_id: string; reason: string; description?: string }) => {
      const { data, error } = await supabase.from('reports').insert(report).select().single();
      if (error) throw error;
      return data;
    },
  },

  // Block
  block: {
    create: async (targetUserId: string) => {
      const { data, error } = await supabase.from('blocks').insert({
        target_user: targetUserId,
      }).select().single();
      if (error) throw error;
      return data;
    },

    list: async () => {
      const { data, error } = await supabase.from('blocks').select('*');
      if (error) throw error;
      return data;
    },

    delete: async (targetUserId: string) => {
      const { error } = await supabase.from('blocks').delete().eq('target_user', targetUserId);
      if (error) throw error;
    },
  },
};
