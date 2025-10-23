import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { apiClient } from '@/api/client';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: { nickname: string; interests: string[] }) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      set({ isLoading: true });
      const session = await apiClient.auth.getSession();
      set({
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        isLoading: false,
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          session,
          user: session?.user || null,
          isAuthenticated: !!session,
        });
      });
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const data = await apiClient.auth.signIn(email, password);
      set({
        session: data.session,
        user: data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string, metadata: { nickname: string; interests: string[] }) => {
    try {
      const data = await apiClient.auth.signUp(email, password, metadata);
      set({
        session: data.session,
        user: data.user,
        isAuthenticated: !!data.session,
      });
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await apiClient.auth.signOut();
      set({
        session: null,
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  },

  setSession: (session: Session | null) => {
    set({
      session,
      user: session?.user || null,
      isAuthenticated: !!session,
    });
  },
}));
