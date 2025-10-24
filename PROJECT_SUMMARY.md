# Piece MVP - 프로젝트 완료 요약

**생성 일시**: 2025-10-23  
**프로젝트명**: Piece - 카드 기반 커뮤니티 앱 MVP  
**저장소**: https://github.com/chohangul/Piece

---

## 📊 프로젝트 통계

- **총 파일 수**: 56개 (TypeScript/SQL/Markdown/JSON)
- **코드 라인 수**: 3,595줄
- **커밋 수**: 5개
- **README 파일**: 8개 (모든 주요 디렉토리)
- **데이터베이스 테이블**: 10개
- **API 엔드포인트**: 20+ 개

---

## ✅ 완료된 작업

### 1. 프로젝트 구조 및 설정
- ✅ pnpm workspace 기반 monorepo 구조
- ✅ TypeScript strict 설정
- ✅ ESLint + Prettier + EditorConfig
- ✅ Husky + lint-staged Git hooks
- ✅ Conventional Commits + Commitlint
- ✅ semantic-release 설정 (.releaserc.json)
- ✅ GitHub PR/Issue 템플릿

### 2. 공유 패키지
- ✅ `@piece/config`: 중앙화된 네이밍 컨벤션
  - API 라우트 (20+)
  - 이벤트 이름
  - 스토어 키
  - 라우트 경로
  - Zod 검증 스키마
  - 앱 상수
- ✅ `@piece/ui`: UI 라이브러리 (스캐폴딩 완료, 구현 예정)

### 3. Supabase 백엔드
- ✅ 데이터베이스 스키마 (10개 테이블)
  - users, cards, pieces, unlocks
  - match_intents, matches
  - wallets, transactions
  - reports, blocks
- ✅ Row Level Security (RLS) 정책 전체 적용
- ✅ 인덱스 최적화
- ✅ 트리거 (updated_at, wallet 자동 생성)
- ✅ 시드 데이터 (5명 사용자, 5개 카드, 15개 조각)
- ✅ Edge Functions 준비 (unlock-piece, iap-verify, image-process)

### 4. Expo 모바일 앱
- ✅ Expo SDK 50 + TypeScript
- ✅ Expo Router 네비게이션
- ✅ 인증 화면
  - 로그인 (login.tsx)
  - 회원가입 (signup.tsx)
  - 온보딩 (onboarding.tsx)
- ✅ 메인 화면
  - 홈 (home.tsx)
  - 피드/탐색 (feed.tsx)
  - 지갑 (wallet.tsx)
  - 채팅 (chat.tsx)
  - 프로필 (profile.tsx)
- ✅ 상태 관리 (Zustand)
  - auth-store.ts
  - wallet-store.ts
  - ui-store.ts
- ✅ API 클라이언트 (Supabase)
  - 전체 CRUD 작업
  - 타입 안전성 보장

### 5. 핵심 기능 컴포넌트
- ✅ CardEditor: 카드 생성/편집 (7,420자)
- ✅ PieceUnlockModal: 조각 해제 모달 (7,679자)
- ✅ SendPieceButton: 피스 보내기 버튼 (1,939자)
- ✅ MatchRequestCard: 매칭 요청 카드 (3,518자)

### 6. 문서화
- ✅ 루트 README.md (상세 프로젝트 가이드)
- ✅ CONTRIBUTING.md (기여 가이드)
- ✅ CHANGELOG.md (변경 이력)
- ✅ 8개 디렉토리별 README
- ✅ ADR (Architecture Decision Records)
  - 001: Monorepo 구조 선택
  - 002: Supabase 백엔드 선택
- ✅ API 문서 (endpoints.md)
- ✅ 문서 가이드 (docs/README.md)

### 7. 인프라 및 스크립트
- ✅ auto-commit.sh: 자동 커밋/푸시
- ✅ verify-consistency.ts: 전역 일관성 검증
- ✅ GitHub Actions CI 파이프라인 (초안)
  - lint, typecheck, test, build
  - consistency-check
  - semantic-release

### 8. Git & GitHub
- ✅ Git 저장소 초기화
- ✅ .gitignore 설정 (Node.js + React Native)
- ✅ GitHub 연동 완료
- ✅ 5개 커밋 (Conventional Commits)
- ✅ 원격 저장소 푸시 완료

---

## 📂 프로젝트 구조

```
piece/
├── apps/
│   └── mobile/              # Expo React Native 앱
│       ├── app/             # Expo Router 화면
│       │   ├── (auth)/      # 인증 화면
│       │   └── (main)/      # 메인 화면
│       └── src/
│           ├── api/         # API 클라이언트
│           ├── features/    # 기능별 컴포넌트
│           ├── stores/      # Zustand 스토어
│           └── lib/         # 유틸리티
├── packages/
│   ├── config/              # 공유 설정 및 네이밍
│   └── ui/                  # 공유 UI (구현 예정)
├── server/                  # NestJS (Phase 2)
├── infra/
│   ├── scripts/             # 유틸리티 스크립트
│   └── supabase/            # DB 스키마 & Edge Functions
├── docs/
│   ├── ADR/                 # 아키텍처 결정 기록
│   └── API/                 # API 문서
└── .github/                 # CI/CD 설정
```

---

## 🎨 구현된 핵심 기능

### 사용자 인증
- 이메일/비밀번호 기반 인증
- 온보딩 (닉네임 + 관심사 선택)
- 세션 관리 (Supabase Auth)

### 카드 시스템
- 카드 타입: 사진, 취미, 장소, 관심사
- 메타데이터: 제목, 설명, 태그
- 3개 조각 구조 (무료 2개 + 유료 1개)

### 조각 해제
- 무료 패스 사용
- 코인 사용
- 해제 진행 UI
- 잔액 확인 및 충전 유도

### 피스 & 매칭
- 피스 보내기 버튼
- 매칭 요청 수락/거절
- 매칭 성공 시 채팅 오픈

### 지갑
- 코인 잔액 표시
- 패스 티어 관리
- 코인 패키지 (3종)
- 거래 내역

---

## 🚧 미완성 항목 (Phase 1)

### 구현 예정
1. **실시간 채팅**
   - Supabase Realtime 연동
   - 메시지 전송/수신
   - 읽음 상태 관리

2. **이미지 처리**
   - 사진 업로드
   - EXIF 제거
   - 썸네일 생성
   - 블러 처리

3. **IAP 영수증 검증**
   - Apple IAP 검증 Edge Function
   - Google Play IAP 검증 Edge Function
   - 영수증 저장 및 검증

4. **UI 완성**
   - 카드 상세 보기
   - 조각 진행바
   - 피드 필터링
   - 알림 화면

5. **신고/차단 UI**
   - 신고 양식
   - 차단 목록 관리

---

## 🛠 기술 스택 요약

### Frontend
- **Framework**: Expo SDK 50
- **Language**: TypeScript (strict)
- **Navigation**: Expo Router
- **State**: Zustand
- **Data**: TanStack Query
- **Styling**: React Native StyleSheet

### Backend (Phase 1)
- **BaaS**: Supabase
- **Database**: PostgreSQL
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime
- **Serverless**: Edge Functions

### DevOps
- **Monorepo**: pnpm workspace
- **Linting**: ESLint + Prettier
- **Commit**: Conventional Commits
- **CI/CD**: GitHub Actions
- **Release**: semantic-release

---

## 📝 네이밍 컨벤션

### 파일명
- `kebab-case`: 파일/폴더명
- `PascalCase`: 컴포넌트 파일명

### 코드
- `camelCase`: 변수/함수
- `PascalCase`: 컴포넌트/클래스
- `UPPER_SNAKE_CASE`: 상수

### API/이벤트/스토어
- 중앙화: `@piece/config`에서 import
- API: `API_ROUTES.CARDS_CREATE`
- 이벤트: `EVENT_NAMES.PIECE_UNLOCKED`
- 스토어: `STORE_KEYS.USER_PROFILE`

---

## 🚀 다음 단계

### 즉시 작업 가능
1. Supabase 프로젝트 생성 및 스키마 적용
2. `.env` 파일 설정 (Supabase URL/Key)
3. `pnpm install` 실행
4. `cd apps/mobile && pnpm dev` 실행

### 단기 (1-2주)
1. 실시간 채팅 구현
2. 이미지 업로드 및 처리
3. IAP 영수증 검증
4. UI 마무리

### 중기 (1-2개월)
1. e2e 테스트 작성
2. 성능 최적화
3. 푸시 알림
4. 사용자 피드백 반영

### 장기 (3-4개월) - Phase 2
1. NestJS 백엔드 구축
2. Redis 캐싱
3. 고급 추천 알고리즘
4. 어드민 대시보드

---

## ⚠️ 알려진 이슈

### GitHub Actions Workflow 권한
- **문제**: GitHub App의 `workflows` 권한 부족으로 CI 파일 푸시 실패
- **상태**: 로컬에 파일 존재 (.github/workflows/ci.yml)
- **해결 방법**:
  1. GitHub 저장소 설정에서 직접 workflow 파일 추가
  2. 또는 Personal Access Token으로 푸시
  3. 또는 GitHub App 권한 업데이트

### Expo 앱 실행 전 준비
1. Supabase 프로젝트 생성
2. `.env` 파일 생성 및 설정
3. `pnpm install` 실행
4. 의존성 추가 필요:
   - `@react-native-async-storage/async-storage`
   - `react-native-url-polyfill`
   - `@expo/vector-icons`

---

## 📞 연락처

**PM & 개발자**: 조한글 대리  
**소속**: 한국로봇산업협회 산업협력팀  
**이메일**: han@krobia.or.kr

---

## 📄 라이선스

MIT License

---

**생성 완료**: 2025-10-23  
**최종 커밋**: dffa0ec  
**저장소 상태**: ✅ 정상 (5 commits)
