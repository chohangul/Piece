# @piece/mobile

> Piece 모바일 앱 - React Native (Expo)

## 역할

Piece의 메인 모바일 애플리케이션입니다. 카드 기반 커뮤니티의 모든 핵심 기능을 제공합니다.

## 주요 기능

### ✅ 구현 완료
- 사용자 인증 (로그인/회원가입)
- 온보딩 (관심사 선택)
- 홈 화면
- 피드/탐색 화면
- 지갑 화면
- 채팅 화면
- 프로필 화면
- 상태 관리 (Zustand)
- API 클라이언트 (Supabase)

### 🚧 구현 예정
- 카드 생성/편집
- 조각 해제 시스템
- 피스 보내기/매칭
- 실시간 채팅
- IAP (인앱 결제)
- 푸시 알림
- 이미지 업로드/처리

## 기술 스택

- **Framework**: Expo SDK 50
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Backend**: Supabase
- **Styling**: React Native StyleSheet

## 시작하기

### 설치

```bash
cd apps/mobile
pnpm install
```

### 환경 설정

`.env.example`을 `.env`로 복사하고 Supabase 정보를 입력:

```bash
cp .env.example .env
```

### 개발 서버 실행

```bash
# 기본 개발 서버
pnpm dev

# iOS 시뮬레이터
pnpm ios

# Android 에뮬레이터
pnpm android
```

## 프로젝트 구조

```
mobile/
├── app/                    # Expo Router 화면
│   ├── (auth)/            # 인증 관련 화면
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── onboarding.tsx
│   ├── (main)/            # 메인 앱 화면
│   │   ├── home.tsx
│   │   ├── feed.tsx
│   │   ├── wallet.tsx
│   │   ├── chat.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── src/
│   ├── api/               # API 클라이언트
│   │   └── client.ts
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── features/          # 기능별 컴포넌트
│   │   ├── profile/       # 카드/프로필 관련
│   │   ├── feed/          # 피드/탐색
│   │   ├── unlocks/       # 조각 해제
│   │   ├── match/         # 매칭
│   │   ├── wallet/        # 지갑
│   │   └── chat/          # 채팅
│   ├── hooks/             # 커스텀 훅
│   ├── stores/            # Zustand 스토어
│   │   ├── auth-store.ts
│   │   ├── wallet-store.ts
│   │   └── ui-store.ts
│   ├── lib/               # 유틸리티
│   │   └── supabase.ts
│   ├── theme/             # 테마/스타일
│   └── types/             # TypeScript 타입
└── assets/                # 이미지, 폰트 등
```

## API 클라이언트

모든 API 호출은 `src/api/client.ts`를 통해 중앙화되어 있습니다:

```typescript
import { apiClient } from '@/api/client';

// 예시: 카드 목록 가져오기
const cards = await apiClient.cards.list();

// 예시: 로그인
await apiClient.auth.signIn(email, password);
```

## 상태 관리

Zustand를 사용한 간단하고 효율적인 상태 관리:

```typescript
// Auth Store
import { useAuthStore } from '@/stores/auth-store';

const { user, isAuthenticated, signIn, signOut } = useAuthStore();

// Wallet Store
import { useWalletStore } from '@/stores/wallet-store';

const { coins, passTier, fetchWallet } = useWalletStore();
```

## 스타일링 가이드

### 컬러 팔레트

```typescript
const colors = {
  primary: '#007AFF',      // 메인 블루
  danger: '#FF3B30',       // 위험/삭제
  background: '#fff',      // 배경
  backgroundSecondary: '#f8f8f8',
  text: '#1a1a1a',        // 주요 텍스트
  textSecondary: '#666',   // 보조 텍스트
  textTertiary: '#999',    // 비활성 텍스트
  border: '#e0e0e0',       // 테두리
  gold: '#FFD700',         // 코인 색상
};
```

### 간격 시스템

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};
```

### 타이포그래피

```typescript
const typography = {
  title: { fontSize: 28, fontWeight: 'bold' },
  heading: { fontSize: 20, fontWeight: 'bold' },
  body: { fontSize: 16 },
  caption: { fontSize: 14 },
  small: { fontSize: 12 },
};
```

## 테스트

```bash
# 유닛 테스트
pnpm test

# 커버리지
pnpm test:coverage
```

## 빌드

```bash
# Android
pnpm build:android

# iOS
pnpm build:ios
```

## 환경 변수

| 변수 | 설명 | 필수 |
|------|------|------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 | ✅ |
| `EXPO_PUBLIC_ENV` | 환경 (development/production) | ❌ |

## 트러블슈팅

### Metro bundler 캐시 문제

```bash
pnpm dev --clear
```

### iOS 시뮬레이터 문제

```bash
cd ios
pod install
cd ..
```

### Android 빌드 오류

```bash
cd android
./gradlew clean
cd ..
```

## 변경이력

- v0.1.0: 초기 앱 구조 및 기본 화면

## 관련 문서

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [Supabase 공식 문서](https://supabase.com/docs)
- [프로젝트 CHANGELOG](../../CHANGELOG.md)
