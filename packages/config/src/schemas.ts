/**
 * Zod validation schemas for type-safe data validation
 */

import { z } from 'zod';
import {
  UNLOCK_METHODS,
  PIECE_STATE,
  MATCH_VIA,
  TRANSACTION_TYPE,
  CARD_TYPES,
  REPORT_REASONS,
} from './constants';

// User schemas
export const UserSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string().min(2).max(20),
  region_code: z.string().optional(),
  interests: z.array(z.string()).min(2),
  created_at: z.string().datetime(),
});

export const UserProfileSchema = UserSchema.extend({
  email: z.string().email().optional(),
  bio: z.string().max(500).optional(),
});

// Card schemas
export const CardMetaSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
});

export const CardSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum([
    CARD_TYPES.PHOTO,
    CARD_TYPES.HOBBY,
    CARD_TYPES.LOCATION,
    CARD_TYPES.INTEREST,
  ]),
  meta: CardMetaSchema,
  created_at: z.string().datetime(),
});

// Piece schemas
export const PieceMaskSchema = z.object({
  blur_level: z.number().min(0).max(20),
  preview_url: z.string().url().optional(),
});

export const PieceSchema = z.object({
  id: z.string().uuid(),
  card_id: z.string().uuid(),
  idx: z.number().int().min(0).max(2),
  state: z.enum([PIECE_STATE.FREE, PIECE_STATE.PAID]),
  preview_level: z.number().int().min(0).max(20),
  mask: PieceMaskSchema,
  created_at: z.string().datetime(),
});

// Unlock schemas
export const UnlockSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  piece_id: z.string().uuid(),
  method: z.enum([UNLOCK_METHODS.FREE_PASS, UNLOCK_METHODS.COIN, UNLOCK_METHODS.PROMO]),
  created_at: z.string().datetime(),
});

// Match schemas
export const MatchIntentSchema = z.object({
  id: z.string().uuid(),
  from_user: z.string().uuid(),
  to_user: z.string().uuid(),
  via: z.enum([MATCH_VIA.SEND_PIECE, MATCH_VIA.OPEN_LAST_PIECE]),
  created_at: z.string().datetime(),
});

export const MatchSchema = z.object({
  id: z.string().uuid(),
  user_a: z.string().uuid(),
  user_b: z.string().uuid(),
  created_at: z.string().datetime(),
});

// Wallet schemas
export const WalletSchema = z.object({
  user_id: z.string().uuid(),
  coins: z.number().int().min(0),
  pass_tier: z.string(),
});

export const TransactionMetaSchema = z.object({
  description: z.string().optional(),
  reference_id: z.string().optional(),
  iap_receipt: z.string().optional(),
});

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum([TRANSACTION_TYPE.EARN, TRANSACTION_TYPE.SPEND, TRANSACTION_TYPE.PURCHASE]),
  amount: z.number().int(),
  meta: TransactionMetaSchema,
  created_at: z.string().datetime(),
});

// Report schemas
export const ReportSchema = z.object({
  id: z.string().uuid(),
  actor: z.string().uuid(),
  target_type: z.enum(['user', 'card', 'message']),
  target_id: z.string().uuid(),
  reason: z.enum([
    REPORT_REASONS.SPAM,
    REPORT_REASONS.INAPPROPRIATE,
    REPORT_REASONS.HARASSMENT,
    REPORT_REASONS.FAKE,
    REPORT_REASONS.OTHER,
  ]),
  created_at: z.string().datetime(),
});

// Block schemas
export const BlockSchema = z.object({
  id: z.string().uuid(),
  actor: z.string().uuid(),
  target_user: z.string().uuid(),
  created_at: z.string().datetime(),
});

// API request/response schemas
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  status: z.number().int(),
});

export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const FeedFiltersSchema = z.object({
  region: z.string().optional(),
  interests: z.array(z.string()).optional(),
  sort: z.enum(['recent', 'popular', 'nearby']).default('recent'),
}).merge(PaginationSchema);

// Types derived from schemas
export type User = z.infer<typeof UserSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Card = z.infer<typeof CardSchema>;
export type CardMeta = z.infer<typeof CardMetaSchema>;
export type Piece = z.infer<typeof PieceSchema>;
export type PieceMask = z.infer<typeof PieceMaskSchema>;
export type Unlock = z.infer<typeof UnlockSchema>;
export type MatchIntent = z.infer<typeof MatchIntentSchema>;
export type Match = z.infer<typeof MatchSchema>;
export type Wallet = z.infer<typeof WalletSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionMeta = z.infer<typeof TransactionMetaSchema>;
export type Report = z.infer<typeof ReportSchema>;
export type Block = z.infer<typeof BlockSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type FeedFilters = z.infer<typeof FeedFiltersSchema>;
