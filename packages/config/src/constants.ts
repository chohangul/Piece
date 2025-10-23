/**
 * Application-wide constants
 */

export const APP_CONFIG = {
  APP_NAME: 'Piece',
  APP_VERSION: '0.1.0',
  MIN_AGE: 19,
  MAX_PHOTOS_PER_CARD: 5,
  FREE_PIECES_PER_CARD: 2,
  PAID_PIECES_PER_CARD: 1,
  TOTAL_PIECES_PER_CARD: 3,
} as const;

export const UNLOCK_METHODS = {
  FREE_PASS: 'free_pass',
  COIN: 'coin',
  PROMO: 'promo',
} as const;

export const PIECE_STATE = {
  FREE: 'free',
  PAID: 'paid',
} as const;

export const MATCH_VIA = {
  SEND_PIECE: 'send_piece',
  OPEN_LAST_PIECE: 'open_last_piece',
} as const;

export const TRANSACTION_TYPE = {
  EARN: 'earn',
  SPEND: 'spend',
  PURCHASE: 'purchase',
} as const;

export const WALLET_CONFIG = {
  DEFAULT_COINS: 0,
  DEFAULT_PASS_TIER: 'free',
  UNLOCK_COST_COIN: 10,
  LAST_PIECE_COST: 50,
} as const;

export const RATE_LIMITS = {
  UNLOCK_PER_DAY: 10,
  MATCH_REQUEST_PER_DAY: 20,
  REPORT_PER_DAY: 5,
} as const;

export const BLUR_LEVELS = {
  LOCKED: 20,
  PREVIEW_LOW: 15,
  PREVIEW_MEDIUM: 10,
  PREVIEW_HIGH: 5,
  UNLOCKED: 0,
} as const;

export const CARD_TYPES = {
  PHOTO: 'photo',
  HOBBY: 'hobby',
  LOCATION: 'location',
  INTEREST: 'interest',
} as const;

export const REPORT_REASONS = {
  SPAM: 'spam',
  INAPPROPRIATE: 'inappropriate',
  HARASSMENT: 'harassment',
  FAKE: 'fake',
  OTHER: 'other',
} as const;

export const SUPABASE_TABLES = {
  USERS: 'users',
  CARDS: 'cards',
  PIECES: 'pieces',
  UNLOCKS: 'unlocks',
  MATCH_INTENTS: 'match_intents',
  MATCHES: 'matches',
  WALLETS: 'wallets',
  TRANSACTIONS: 'transactions',
  REPORTS: 'reports',
  BLOCKS: 'blocks',
} as const;
