/**
 * Centralized naming constants for API, events, and stores
 * Single source of truth for all naming conventions
 */

export const API_ROUTES = {
  // Auth
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',

  // Profile & Cards
  CARDS_LIST: '/cards',
  CARDS_CREATE: '/cards',
  CARDS_UPDATE: '/cards/:id',
  CARDS_DELETE: '/cards/:id',
  CARDS_DETAIL: '/cards/:id',

  // Pieces
  PIECES_LIST: '/pieces',
  PIECES_CONFIG: '/pieces/config',
  PIECES_UNLOCK: '/pieces/:id/unlock',

  // Discovery
  FEED_LIST: '/feed',
  FEED_FILTERS: '/feed/filters',

  // Match
  MATCH_SEND_PIECE: '/match/send-piece',
  MATCH_RESPOND: '/match/respond',
  MATCH_LIST: '/match/list',

  // Wallet
  WALLET_GET: '/wallet',
  WALLET_PURCHASE: '/wallet/purchase',
  WALLET_SPEND: '/wallet/spend',
  WALLET_TRANSACTIONS: '/wallet/transactions',

  // IAP
  IAP_VERIFY: '/iap/verify',

  // Report & Block
  REPORT_CREATE: '/report',
  BLOCK_CREATE: '/block',
  BLOCK_LIST: '/block/list',
} as const;

export const EVENT_NAMES = {
  // Match events
  MATCH_REQUEST_RECEIVED: 'match:request:received',
  MATCH_ACCEPTED: 'match:accepted',
  MATCH_REJECTED: 'match:rejected',
  
  // Chat events
  CHAT_MESSAGE_RECEIVED: 'chat:message:received',
  CHAT_TYPING: 'chat:typing',
  
  // Wallet events
  WALLET_UPDATED: 'wallet:updated',
  COINS_EARNED: 'wallet:coins:earned',
  COINS_SPENT: 'wallet:coins:spent',
  
  // Piece unlock events
  PIECE_UNLOCKED: 'piece:unlocked',
  PIECE_UNLOCK_FAILED: 'piece:unlock:failed',
} as const;

export const STORE_KEYS = {
  // User
  USER_PROFILE: 'user:profile',
  USER_AUTH: 'user:auth',
  
  // Cards
  USER_CARDS: 'user:cards',
  CARD_DRAFT: 'card:draft',
  
  // Feed
  FEED_ITEMS: 'feed:items',
  FEED_FILTERS: 'feed:filters',
  
  // Match
  MATCH_INTENTS: 'match:intents',
  MATCH_LIST: 'match:list',
  
  // Wallet
  WALLET_BALANCE: 'wallet:balance',
  WALLET_TRANSACTIONS: 'wallet:transactions',
  
  // UI State
  UI_THEME: 'ui:theme',
  UI_LANGUAGE: 'ui:language',
} as const;

export const ROUTE_PATHS = {
  // Auth
  AUTH_LOGIN: '/(auth)/login',
  AUTH_SIGNUP: '/(auth)/signup',
  AUTH_ONBOARDING: '/(auth)/onboarding',
  
  // Main
  MAIN_HOME: '/(main)/home',
  MAIN_FEED: '/(main)/feed',
  MAIN_EXPLORE: '/(main)/explore',
  MAIN_WALLET: '/(main)/wallet',
  MAIN_CHAT: '/(main)/chat',
  
  // Profile
  PROFILE_VIEW: '/profile/:id',
  PROFILE_EDIT: '/profile/edit',
  CARD_CREATE: '/card/create',
  CARD_EDIT: '/card/:id/edit',
  
  // Match
  MATCH_DETAIL: '/match/:id',
  CHAT_CONVERSATION: '/chat/:matchId',
} as const;

export type ApiRoute = typeof API_ROUTES[keyof typeof API_ROUTES];
export type EventName = typeof EVENT_NAMES[keyof typeof EVENT_NAMES];
export type StoreKey = typeof STORE_KEYS[keyof typeof STORE_KEYS];
export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];
