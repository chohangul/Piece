import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface Card {
  id: string
  user_id: string
  type: 'intro' | 'lifestyle' | 'values' | 'personality' | 'goal'
  meta: any
  is_active: boolean
  pieces?: Piece[]
}

interface Piece {
  id: string
  card_id: string
  idx: number
  content: string
  is_locked: boolean
  unlock_method: 'free_pass' | 'coin' | 'promo' | null
}

interface CardState {
  cards: Card[]
  currentCard: Card | null
  isLoading: boolean
  
  // Actions
  fetchMyCards: () => Promise<void>
  createCard: (type: Card['type'], pieces: string[]) => Promise<void>
  updateCard: (cardId: string, meta: any) => Promise<void>
  deleteCard: (cardId: string) => Promise<void>
  fetchCardWithPieces: (cardId: string) => Promise<Card>
}

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],
  currentCard: null,
  isLoading: false,

  fetchMyCards: async () => {
    set({ isLoading: true })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)

      if (error) throw error

      set({ cards: data || [], isLoading: false })
    } catch (error) {
      console.error('Failed to fetch cards:', error)
      set({ isLoading: false })
    }
  },

  createCard: async (type: Card['type'], pieces: string[]) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Create card
    const { data: card, error: cardError } = await supabase
      .from('cards')
      .insert({
        user_id: user.id,
        type,
        meta: {},
        is_active: true,
      })
      .select()
      .single()

    if (cardError) throw cardError

    // Create 5 pieces
    const piecesData = pieces.map((content, idx) => ({
      card_id: card.id,
      idx: idx + 1,
      content,
      is_locked: idx > 0, // Only first piece is unlocked
      unlock_method: null,
    }))

    const { error: piecesError } = await supabase
      .from('pieces')
      .insert(piecesData)

    if (piecesError) throw piecesError

    // Refresh cards
    await get().fetchMyCards()
  },

  updateCard: async (cardId: string, meta: any) => {
    const { error } = await supabase
      .from('cards')
      .update({ meta })
      .eq('id', cardId)

    if (error) throw error

    await get().fetchMyCards()
  },

  deleteCard: async (cardId: string) => {
    const { error } = await supabase
      .from('cards')
      .update({ is_active: false })
      .eq('id', cardId)

    if (error) throw error

    await get().fetchMyCards()
  },

  fetchCardWithPieces: async (cardId: string) => {
    const { data: card, error: cardError } = await supabase
      .from('cards')
      .select('*')
      .eq('id', cardId)
      .single()

    if (cardError) throw cardError

    const { data: pieces, error: piecesError } = await supabase
      .from('pieces')
      .select('*')
      .eq('card_id', cardId)
      .order('idx')

    if (piecesError) throw piecesError

    const cardWithPieces = { ...card, pieces }
    set({ currentCard: cardWithPieces })
    return cardWithPieces
  },
}))
