-- Piece MVP Initial Database Schema
-- Version: 0.1.0
-- Created: 2025-10-23

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE unlock_method AS ENUM ('free_pass', 'coin', 'promo');
CREATE TYPE piece_state AS ENUM ('free', 'paid');
CREATE TYPE match_via AS ENUM ('send_piece', 'open_last_piece');
CREATE TYPE transaction_type AS ENUM ('earn', 'spend', 'purchase');
CREATE TYPE report_target_type AS ENUM ('user', 'card', 'message');
CREATE TYPE report_reason AS ENUM ('spam', 'inappropriate', 'harassment', 'fake', 'other');
CREATE TYPE card_type AS ENUM ('photo', 'hobby', 'location', 'interest');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nickname TEXT NOT NULL CHECK (length(nickname) >= 2 AND length(nickname) <= 20),
  email TEXT UNIQUE,
  region_code TEXT,
  interests TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT interests_min_length CHECK (array_length(interests, 1) >= 2)
);

-- Cards table
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type card_type NOT NULL DEFAULT 'photo',
  meta JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pieces table
CREATE TABLE pieces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  idx SMALLINT NOT NULL CHECK (idx >= 0 AND idx <= 2),
  state piece_state NOT NULL DEFAULT 'free',
  preview_level SMALLINT NOT NULL DEFAULT 15 CHECK (preview_level >= 0 AND preview_level <= 20),
  mask JSONB NOT NULL DEFAULT '{}',
  content_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(card_id, idx)
);

-- Unlocks table
CREATE TABLE unlocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  piece_id UUID NOT NULL REFERENCES pieces(id) ON DELETE CASCADE,
  method unlock_method NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, piece_id)
);

-- Match intents table
CREATE TABLE match_intents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  via match_via NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT no_self_match CHECK (from_user != to_user),
  UNIQUE(from_user, to_user)
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_b UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT no_self_match_actual CHECK (user_a != user_b),
  UNIQUE(user_a, user_b)
);

-- Wallets table
CREATE TABLE wallets (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  coins INTEGER NOT NULL DEFAULT 0 CHECK (coins >= 0),
  pass_tier TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount INTEGER NOT NULL,
  meta JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type report_target_type NOT NULL,
  target_id UUID NOT NULL,
  reason report_reason NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Blocks table
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_user UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT no_self_block CHECK (actor != target_user),
  UNIQUE(actor, target_user)
);

-- Create indexes for performance
CREATE INDEX idx_cards_user_id ON cards(user_id);
CREATE INDEX idx_cards_is_active ON cards(is_active);
CREATE INDEX idx_pieces_card_id ON pieces(card_id);
CREATE INDEX idx_unlocks_user_id ON unlocks(user_id);
CREATE INDEX idx_unlocks_piece_id ON unlocks(piece_id);
CREATE INDEX idx_match_intents_from_user ON match_intents(from_user);
CREATE INDEX idx_match_intents_to_user ON match_intents(to_user);
CREATE INDEX idx_match_intents_status ON match_intents(status);
CREATE INDEX idx_matches_user_a ON matches(user_a);
CREATE INDEX idx_matches_user_b ON matches(user_b);
CREATE INDEX idx_matches_is_active ON matches(is_active);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_reports_actor ON reports(actor);
CREATE INDEX idx_reports_target_id ON reports(target_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_blocks_actor ON blocks(actor);
CREATE INDEX idx_blocks_target_user ON blocks(target_user);
CREATE INDEX idx_users_region_code ON users(region_code);
CREATE INDEX idx_users_interests ON users USING GIN(interests);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cards_updated_at BEFORE UPDATE ON cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_match_intents_updated_at BEFORE UPDATE ON match_intents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create wallet automatically when user is created
CREATE OR REPLACE FUNCTION create_wallet_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallets (user_id, coins, pass_tier)
  VALUES (NEW.id, 0, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_wallet_on_user_insert
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION create_wallet_for_user();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE pieces ENABLE ROW LEVEL SECURITY;
ALTER TABLE unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies: Cards
CREATE POLICY "Users can view own cards" ON cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own cards" ON cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cards" ON cards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cards" ON cards
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies: Pieces (visible to unlocked users)
CREATE POLICY "Users can view pieces of their cards" ON pieces
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM cards WHERE cards.id = pieces.card_id AND cards.user_id = auth.uid()
    )
  );

-- RLS Policies: Unlocks
CREATE POLICY "Users can view own unlocks" ON unlocks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own unlocks" ON unlocks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies: Match intents
CREATE POLICY "Users can view match intents involving them" ON match_intents
  FOR SELECT USING (auth.uid() = from_user OR auth.uid() = to_user);

CREATE POLICY "Users can create match intents" ON match_intents
  FOR INSERT WITH CHECK (auth.uid() = from_user);

CREATE POLICY "Users can update received match intents" ON match_intents
  FOR UPDATE USING (auth.uid() = to_user);

-- RLS Policies: Matches
CREATE POLICY "Users can view own matches" ON matches
  FOR SELECT USING (auth.uid() = user_a OR auth.uid() = user_b);

-- RLS Policies: Wallets
CREATE POLICY "Users can view own wallet" ON wallets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own wallet" ON wallets
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies: Transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies: Reports
CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = actor);

CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = actor);

-- RLS Policies: Blocks
CREATE POLICY "Users can create blocks" ON blocks
  FOR INSERT WITH CHECK (auth.uid() = actor);

CREATE POLICY "Users can view own blocks" ON blocks
  FOR SELECT USING (auth.uid() = actor);

CREATE POLICY "Users can delete own blocks" ON blocks
  FOR DELETE USING (auth.uid() = actor);

-- Comments for documentation
COMMENT ON TABLE users IS 'User profiles with interests and regional information';
COMMENT ON TABLE cards IS 'User-created cards (photo, hobby, location, interest)';
COMMENT ON TABLE pieces IS 'Individual pieces of a card (2 free + 1 paid)';
COMMENT ON TABLE unlocks IS 'Record of pieces unlocked by users';
COMMENT ON TABLE match_intents IS 'Match requests sent between users';
COMMENT ON TABLE matches IS 'Confirmed matches that enable chat';
COMMENT ON TABLE wallets IS 'User wallet with coins and pass tier';
COMMENT ON TABLE transactions IS 'Wallet transaction history';
COMMENT ON TABLE reports IS 'User reports for spam/harassment';
COMMENT ON TABLE blocks IS 'User blocks to prevent interactions';
