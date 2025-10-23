-- Piece MVP Seed Data
-- Test data for development

-- Insert test users
INSERT INTO users (id, nickname, email, region_code, interests, bio) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '민지', 'minji@example.com', 'seoul-gangnam', ARRAY['사진', '카페'], '사진 찍는 것을 좋아해요 📸'),
  ('550e8400-e29b-41d4-a716-446655440002', '준호', 'junho@example.com', 'seoul-hongdae', ARRAY['음악', '공연'], '밴드에서 기타 치고 있습니다 🎸'),
  ('550e8400-e29b-41d4-a716-446655440003', '서연', 'seoyeon@example.com', 'seoul-gangnam', ARRAY['요가', '카페'], '건강한 라이프스타일을 추구합니다 🧘‍♀️'),
  ('550e8400-e29b-41d4-a716-446655440004', '태양', 'taeyang@example.com', 'busan-haeundae', ARRAY['서핑', '여행'], '주말엔 바다로 🏄‍♂️'),
  ('550e8400-e29b-41d4-a716-446655440005', '지우', 'jiwoo@example.com', 'seoul-gangnam', ARRAY['독서', '영화'], '북카페 탐방 중 📚')
ON CONFLICT (id) DO NOTHING;

-- Insert test cards
INSERT INTO cards (id, user_id, type, meta, is_active) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'photo', '{"title": "주말 카페 투어", "description": "강남 카페 탐방", "tags": ["카페", "사진"]}', true),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'hobby', '{"title": "사진 갤러리", "description": "풍경 사진", "tags": ["사진", "자연"]}', true),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'photo', '{"title": "홍대 거리 공연", "description": "버스킹 현장", "tags": ["음악", "공연"]}', true),
  ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'hobby', '{"title": "요가 루틴", "description": "아침 요가", "tags": ["요가", "건강"]}', true),
  ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', 'photo', '{"title": "해운대 서핑", "description": "파도타기", "tags": ["서핑", "바다"]}', true)
ON CONFLICT (id) DO NOTHING;

-- Insert test pieces (3 pieces per card: 2 free, 1 paid)
INSERT INTO pieces (id, card_id, idx, state, preview_level, mask, content_url) VALUES
  -- Card 1 pieces
  ('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 0, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/1/800/600'),
  ('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 1, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/2/800/600'),
  ('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', 2, 'paid', 20, '{"blur_level": 20}', 'https://picsum.photos/id/3/800/600'),
  -- Card 2 pieces
  ('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', 0, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/10/800/600'),
  ('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440002', 1, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/11/800/600'),
  ('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440002', 2, 'paid', 20, '{"blur_level": 20}', 'https://picsum.photos/id/12/800/600'),
  -- Card 3 pieces
  ('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440003', 0, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/20/800/600'),
  ('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440003', 1, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/21/800/600'),
  ('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440003', 2, 'paid', 20, '{"blur_level": 20}', 'https://picsum.photos/id/22/800/600'),
  -- Card 4 pieces
  ('750e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440004', 0, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/30/800/600'),
  ('750e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440004', 1, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/31/800/600'),
  ('750e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440004', 2, 'paid', 20, '{"blur_level": 20}', 'https://picsum.photos/id/32/800/600'),
  -- Card 5 pieces
  ('750e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440005', 0, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/40/800/600'),
  ('750e8400-e29b-41d4-a716-446655440014', '650e8400-e29b-41d4-a716-446655440005', 1, 'free', 10, '{"blur_level": 10}', 'https://picsum.photos/id/41/800/600'),
  ('750e8400-e29b-41d4-a716-446655440015', '650e8400-e29b-41d4-a716-446655440005', 2, 'paid', 20, '{"blur_level": 20}', 'https://picsum.photos/id/42/800/600')
ON CONFLICT (card_id, idx) DO NOTHING;

-- Insert test unlocks (user 1 unlocked some pieces)
INSERT INTO unlocks (user_id, piece_id, method) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440007', 'free_pass'),
  ('550e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440008', 'free_pass')
ON CONFLICT (user_id, piece_id) DO NOTHING;

-- Insert test wallets (automatically created by trigger, but we ensure initial coins)
UPDATE wallets SET coins = 100 WHERE user_id = '550e8400-e29b-41d4-a716-446655440001';
UPDATE wallets SET coins = 50 WHERE user_id = '550e8400-e29b-41d4-a716-446655440002';
UPDATE wallets SET coins = 80 WHERE user_id = '550e8400-e29b-41d4-a716-446655440003';

-- Insert test transactions
INSERT INTO transactions (user_id, type, amount, meta) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'earn', 20, '{"description": "Welcome bonus"}'),
  ('550e8400-e29b-41d4-a716-446655440001', 'purchase', 100, '{"description": "Coin pack purchase", "iap_receipt": "test_receipt_001"}'),
  ('550e8400-e29b-41d4-a716-446655440001', 'spend', -20, '{"description": "Unlock piece"}')
ON CONFLICT DO NOTHING;

-- Insert test match intents
INSERT INTO match_intents (from_user, to_user, via, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'send_piece', 'pending')
ON CONFLICT (from_user, to_user) DO NOTHING;

-- Note: No test matches or blocks inserted for clean initial state
