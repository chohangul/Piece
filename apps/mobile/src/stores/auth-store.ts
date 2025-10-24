import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: { nickname: string; interests: string[] }) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

console.log('🔧 Creating auth store...');

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: false,
  isAuthenticated: false,

  initialize: async () => {
    console.log('🔄 Auth initialize called');
    try {
      console.log('📦 Importing supabase...');
      const { supabase } = await import('@/lib/supabase');
      console.log('✅ Supabase imported');
      
      set({ isLoading: true });
      console.log('🔍 Getting session...');
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Session error:', error.message);
        set({ 
          session: null,
          user: null,
          isAuthenticated: false,
          isLoading: false 
        });
        return;
      }
      
      const session = data.session;
      console.log('✅ Session loaded:', session ? 'authenticated' : 'guest');
      
      set({
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        isLoading: false,
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        console.log('🔔 Auth state changed:', _event);
        set({
          session,
          user: session?.user || null,
          isAuthenticated: !!session,
        });
      });
      
      console.log('✅ Initialize complete');
    } catch (error: any) {
      console.error('❌ Initialize error:', error?.message);
      console.error('❌ Stack:', error?.stack);
      set({ 
        session: null,
        user: null,
        isAuthenticated: false,
        isLoading: false 
      });
    }
  },

  signIn: async (email: string, password: string) => {
    console.log('🔐 Signing in...');
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('❌ Sign in error:', error.message);
      throw error;
    }
    
    console.log('✅ Sign in successful');
    set({
      session: data.session,
      user: data.user,
      isAuthenticated: true,
    });
  },

  signUp: async (email: string, password: string, metadata: { nickname: string; interests: string[] }) => {
    console.log('📝 Signing up...');
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) {
      console.error('❌ Sign up error:', error.message);
      throw error;
    }
    
    console.log('✅ Sign up successful');
    set({
      session: data.session,
      user: data.user,
      isAuthenticated: !!data.session,
    });
  },

  signOut: async () => {
    console.log('👋 Signing out...');
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('❌ Sign out error:', error.message);
      throw error;
    }
    
    set({
      session: null,
      user: null,
      isAuthenticated: false,
    });
  },

  setSession: (session: Session | null) => {
    set({
      session,
      user: session?.user || null,
      isAuthenticated: !!session,
    });
  },
}));

console.log('✅ Auth store created');
