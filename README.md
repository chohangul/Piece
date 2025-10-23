# Piece

> 카드 기반 커뮤니티 앱 MVP - 취미와 일상을 공유하는 새로운 방식

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-Expo-000020)](https://expo.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E)](https://supabase.com/)

## 📖 프로젝트 개요

**Piece**는 카드 기반의 취미 커뮤니티 앱입니다. 사용자는 사진, 취미, 활동 지역 등을 담은 카드를 만들고, 각 카드는 **2개의 무료 조각**과 **1개의 유료 조각(Last Piece)**으로 구성됩니다.

### 🎯 핵심 컨셉

- **카드 시스템**: 각 카드는 3개의 조각으로 구성 (무료 2개 + 유료 1개)
- **조각 해제**: 무료 패스 또는 코인으로 조각을 해제하여 전체 콘텐츠 확인
- **피스 매칭**: "하트" 대신 "피스 보내기"로 관심 표현
- **채팅 시스템**: 매칭 성공 시 1:1 채팅 자동 오픈
- **건전한 커뮤니티**: 19금 콘텐츠 금지, 취미와 일상 중심

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 20.0.0
- pnpm >= 8.15.0
- Expo CLI
- Supabase 계정

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-org/piece.git
cd piece

# 의존성 설치
pnpm install

# Supabase 설정
cd infra/supabase
# .env 파일 생성 후 Supabase 프로젝트 정보 입력

# 데이터베이스 마이그레이션
supabase db push

# 시드 데이터 삽입 (개발 환경)
supabase db seed
```

### 개발 서버 실행

```bash
# 모바일 앱 실행
cd apps/mobile
pnpm dev

# iOS 시뮬레이터
pnpm ios

# Android 에뮬레이터
pnpm android
```

## 📁 프로젝트 구조

```
piece/
├── apps/
│   └── mobile/           # React Native (Expo) 앱
├── packages/
│   ├── ui/              # 공유 UI 컴포넌트 라이브러리
│   └── config/          # 공유 설정 및 상수
├── server/              # NestJS 백엔드 (Phase 2)
├── infra/               # 인프라 설정
│   ├── supabase/        # DB 스키마, Edge Functions
│   └── scripts/         # 유틸리티 스크립트
├── docs/                # 문서
│   ├── ADR/            # Architecture Decision Records
│   ├── API/            # API 명세
│   └── DESIGN/         # 디자인 문서
└── .github/            # CI/CD 설정
```

각 디렉토리에는 자체 README.md가 있습니다. 자세한 내용은 해당 디렉토리를 참고하세요.

## 🛠 기술 스택

### Frontend (Phase 1)
- **React Native** with Expo
- **TypeScript** (strict mode)
- **TanStack Query** (서버 상태 관리)
- **Zustand** (클라이언트 상태 관리)
- **React Navigation** (네비게이션)
- **NativeWind** (스타일링)

### Backend (Phase 1)
- **Supabase**
  - PostgreSQL (데이터베이스)
  - Auth (인증)
  - Storage (미디어 저장)
  - Realtime (실시간 채팅)
  - Edge Functions (서버리스 함수)

### Backend (Phase 2 - 확장)
- **NestJS** (핵심 비즈니스 로직)
- **PostgreSQL** (메인 데이터베이스)
- **Redis** (캐시, 큐, 레이트리밋)

### DevOps
- **GitHub Actions** (CI/CD)
- **Expo EAS** (빌드 & 배포)
- **ESLint + Prettier** (코드 품질)
- **Husky + lint-staged** (Git hooks)
- **Jest + React Native Testing Library** (테스트)

## 📊 데이터베이스 스키마

주요 테이블:

- `users`: 사용자 프로필
- `cards`: 사용자가 만든 카드
- `pieces`: 카드의 조각 (3개)
- `unlocks`: 해제 기록
- `match_intents`: 매칭 요청
- `matches`: 확정된 매칭
- `wallets`: 사용자 지갑 (코인, 패스)
- `transactions`: 지갑 거래 내역

전체 스키마는 [`infra/supabase/migrations/001_initial_schema.sql`](./infra/supabase/migrations/001_initial_schema.sql)을 참고하세요.

## 🎨 주요 기능

### ✅ 완료된 기능 (Phase 1)
- [x] 프로젝트 스캐폴딩 및 워크스페이스 설정
- [x] 데이터베이스 스키마 설계
- [x] 공유 설정 패키지 (@piece/config)
- [ ] 사용자 인증 (온보딩)
- [ ] 카드 생성 및 편집
- [ ] 조각 시스템 (무료/유료 해제)
- [ ] 피드 탐색 및 필터링
- [ ] 피스 보내기 및 매칭
- [ ] 채팅 시스템
- [ ] 지갑 및 IAP
- [ ] 신고/차단 시스템

### 🚧 계획 중인 기능 (Phase 2)
- [ ] NestJS 백엔드 마이그레이션
- [ ] Redis 캐싱 및 레이트리밋
- [ ] 고급 추천 알고리즘
- [ ] 푸시 알림
- [ ] 소셜 공유
- [ ] 어드민 대시보드

## 🧪 테스트

```bash
# 전체 테스트 실행
pnpm test

# 특정 패키지 테스트
cd apps/mobile
pnpm test

# 커버리지 확인
pnpm test:coverage
```

## 📝 커밋 규칙

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/)를 따릅니다.

```bash
# Commitizen을 사용한 커밋
pnpm commit

# 또는 직접 작성
git commit -m "feat: 카드 생성 기능 추가"
git commit -m "fix: 조각 해제 버그 수정"
git commit -m "docs: README 업데이트"
```

## 🤝 기여하기

기여를 환영합니다! 자세한 내용은 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참고하세요.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.

## 👥 팀

- **PM & 개발**: 조한글 대리 (han@krobia.or.kr)
- **Organization**: 한국로봇산업협회

## 📮 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 [이슈](https://github.com/your-org/piece/issues)를 생성해주세요.

---

**Made with ❤️ by Piece Team**
