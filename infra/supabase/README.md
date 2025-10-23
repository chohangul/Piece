# Supabase Infrastructure

> 데이터베이스 스키마, Edge Functions, 시드 데이터

## 역할

이 디렉토리는 Supabase 백엔드 인프라를 관리합니다:

- PostgreSQL 데이터베이스 스키마 및 마이그레이션
- Row Level Security (RLS) 정책
- Edge Functions (서버리스 함수)
- 시드 데이터 (개발/테스트)

## 디렉토리 구조

```
supabase/
├── migrations/          # 데이터베이스 마이그레이션
│   └── 001_initial_schema.sql
├── functions/          # Edge Functions
│   ├── unlock-piece/
│   ├── iap-verify/
│   └── image-process/
└── seed/               # 시드 데이터
    └── 001_seed_data.sql
```

## 데이터베이스 스키마

### 주요 테이블

| 테이블 | 설명 | 주요 컬럼 |
|--------|------|-----------|
| `users` | 사용자 프로필 | nickname, interests, region_code |
| `cards` | 사용자 카드 | user_id, type, meta |
| `pieces` | 카드 조각 | card_id, idx, state, preview_level |
| `unlocks` | 조각 해제 기록 | user_id, piece_id, method |
| `match_intents` | 매칭 요청 | from_user, to_user, via, status |
| `matches` | 확정 매칭 | user_a, user_b |
| `wallets` | 사용자 지갑 | user_id, coins, pass_tier |
| `transactions` | 거래 내역 | user_id, type, amount |
| `reports` | 신고 | actor, target_type, target_id, reason |
| `blocks` | 차단 | actor, target_user |

### 관계도

```
users (1) ──────< (N) cards
cards (1) ──────< (3) pieces
users (1) ──────< (N) unlocks ─────> (1) pieces
users (1) ──────< (N) match_intents ─────> (1) users
users (N) ──────< (N) matches
users (1) ──────(1) wallets
users (1) ──────< (N) transactions
```

## 사용 방법

### 로컬 개발 환경 설정

```bash
# Supabase CLI 설치
brew install supabase/tap/supabase

# 로컬 Supabase 시작
supabase start

# 마이그레이션 적용
supabase db push

# 시드 데이터 삽입
supabase db seed
```

### 새 마이그레이션 생성

```bash
# 마이그레이션 파일 생성
supabase migration new add_user_preferences

# 파일 편집 후 적용
supabase db push
```

### Edge Functions

```bash
# 새 함수 생성
supabase functions new my-function

# 로컬 테스트
supabase functions serve

# 배포
supabase functions deploy my-function
```

## Row Level Security (RLS)

모든 테이블에 RLS가 활성화되어 있습니다.

### 기본 정책

- **읽기**: 본인 데이터만 조회 가능
- **쓰기**: 본인 데이터만 생성/수정 가능
- **예외**: 
  - 매칭된 사용자의 카드는 서로 볼 수 있음
  - 해제된 조각은 조회 가능

### 예시 정책

```sql
-- 사용자는 자신의 카드만 볼 수 있음
CREATE POLICY "Users can view own cards" ON cards
  FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 카드만 수정할 수 있음
CREATE POLICY "Users can update own cards" ON cards
  FOR UPDATE USING (auth.uid() = user_id);
```

## Edge Functions

### unlock-piece

조각 해제 로직 (코인 차감, 패스 확인)

```typescript
// Request
POST /functions/v1/unlock-piece
{
  "pieceId": "uuid",
  "method": "coin" | "free_pass" | "promo"
}

// Response
{
  "success": true,
  "unlocked": true,
  "piece": { ... }
}
```

### iap-verify

IAP 영수증 검증 (Apple/Google)

```typescript
// Request
POST /functions/v1/iap-verify
{
  "platform": "ios" | "android",
  "receipt": "base64_receipt_data",
  "productId": "piece.coins.100"
}

// Response
{
  "valid": true,
  "coins": 100,
  "transactionId": "..."
}
```

### image-process

이미지 처리 (EXIF 제거, 썸네일 생성, 블러 처리)

```typescript
// Request
POST /functions/v1/image-process
{
  "imageUrl": "storage_url",
  "operations": ["remove_exif", "thumbnail", "blur"]
}

// Response
{
  "original": "url",
  "thumbnail": "url",
  "preview": "url"
}
```

## 시드 데이터

개발 환경에서 사용할 테스트 데이터:

- 5명의 테스트 사용자
- 각 사용자당 1-2개의 카드
- 각 카드당 3개의 조각 (무료 2 + 유료 1)
- 샘플 지갑 및 거래 내역

```bash
# 시드 데이터 삽입
supabase db seed
```

## 환경 변수

```bash
# .env
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 모니터링

- Supabase Dashboard에서 실시간 모니터링
- 쿼리 성능 분석
- RLS 정책 테스트

## 백업 & 복원

```bash
# 백업
supabase db dump > backup.sql

# 복원
supabase db reset
psql -U postgres -h localhost -d postgres < backup.sql
```

## 변경이력

- v0.1.0: 초기 스키마 (10개 테이블, RLS 정책, 트리거)

## 관련 문서

- [Supabase 공식 문서](https://supabase.com/docs)
- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)
- [프로젝트 CHANGELOG](../../CHANGELOG.md)
