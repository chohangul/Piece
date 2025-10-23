# @piece/config

> 중앙화된 설정 및 네이밍 컨벤션 패키지

## 역할

이 패키지는 Piece 프로젝트 전체에서 사용되는 **단일 소스 진실(Single Source of Truth)**을 제공합니다:

- API 엔드포인트
- 이벤트 이름
- 스토어 키
- 라우트 경로
- 검증 스키마
- 공통 상수

## 왜 필요한가?

프로젝트 전반에 걸쳐 네이밍의 일관성을 보장하고, 변경 시 단일 지점에서 수정할 수 있도록 합니다.

## Public API

### 네이밍 상수

```typescript
import {
  API_ROUTES,
  EVENT_NAMES,
  STORE_KEYS,
  ROUTE_PATHS,
} from '@piece/config';

// API 호출
fetch(API_ROUTES.CARDS_CREATE);

// 이벤트 발행
eventEmitter.emit(EVENT_NAMES.PIECE_UNLOCKED);

// 스토어 키
const profile = store.get(STORE_KEYS.USER_PROFILE);

// 네비게이션
navigation.navigate(ROUTE_PATHS.MAIN_FEED);
```

### 검증 스키마 (Zod)

```typescript
import { UserSchema, CardSchema, PieceSchema } from '@piece/config';

// 데이터 검증
const user = UserSchema.parse(userData);

// 타입 추론
import type { User, Card, Piece } from '@piece/config';
```

### 상수

```typescript
import {
  APP_CONFIG,
  WALLET_CONFIG,
  BLUR_LEVELS,
  RATE_LIMITS,
} from '@piece/config';

// 앱 설정
console.log(APP_CONFIG.APP_NAME); // "Piece"
console.log(APP_CONFIG.FREE_PIECES_PER_CARD); // 2

// 지갑 설정
const unlockCost = WALLET_CONFIG.UNLOCK_COST_COIN; // 10

// 블러 레벨
const blurLevel = BLUR_LEVELS.LOCKED; // 20
```

## 의존성

- `zod`: 스키마 검증

## 사용 방법

### 설치

이 패키지는 워크스페이스의 일부이므로 자동으로 사용할 수 있습니다:

```typescript
// 다른 패키지에서 import
import { API_ROUTES } from '@piece/config';
```

### 새 상수 추가

1. 해당 파일 편집 (`names.ts`, `constants.ts`, `schemas.ts`)
2. export 추가
3. `index.ts`에서 re-export (필요한 경우)
4. 타입 체크: `pnpm typecheck`

### 네이밍 규칙

- **API_ROUTES**: `RESOURCE_ACTION` 형식 (예: `CARDS_CREATE`)
- **EVENT_NAMES**: `domain:action:detail` 형식 (예: `match:request:received`)
- **STORE_KEYS**: `domain:detail` 형식 (예: `user:profile`)
- **ROUTE_PATHS**: 실제 경로 (예: `/(main)/feed`)

## 변경이력

- v0.1.0: 초기 버전 (API 라우트, 이벤트, 스토어 키, 스키마)

## 관련 문서

- [CHANGELOG](../../CHANGELOG.md)
- [Architecture Decisions](../../docs/ADR/)
