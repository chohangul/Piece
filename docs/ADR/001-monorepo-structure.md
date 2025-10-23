# ADR 001: Monorepo 구조 선택

## 상태
승인됨

## 날짜
2025-10-23

## 컨텍스트

Piece MVP 프로젝트는 모바일 앱, 공유 설정, 그리고 향후 백엔드 서비스를 포함하는 다중 패키지 프로젝트입니다. 코드 공유, 의존성 관리, 그리고 개발 워크플로우 효율성을 위한 구조가 필요했습니다.

## 결정

**pnpm workspace 기반의 monorepo 구조를 채택합니다.**

### 구조
```
piece/
├── apps/
│   └── mobile/          # React Native (Expo) 앱
├── packages/
│   ├── ui/              # 공유 UI 컴포넌트
│   └── config/          # 공유 설정 및 상수
└── server/              # NestJS 백엔드 (Phase 2)
```

### 선택 이유

1. **pnpm을 선택한 이유**
   - 빠른 설치 속도
   - 효율적인 디스크 공간 사용 (하드 링크)
   - 엄격한 의존성 관리 (phantom dependencies 방지)
   - workspace 기능 기본 지원

2. **Monorepo를 선택한 이유**
   - 코드 공유 용이 (타입, 상수, 유틸리티)
   - 단일 버전 관리 (Git)
   - 일관된 개발 환경
   - 리팩토링 시 전체 영향 파악 용이
   - CI/CD 설정 단순화

3. **대안 검토**
   - **Multi-repo**: 코드 공유 어려움, 버전 관리 복잡
   - **npm workspaces**: pnpm보다 느림
   - **yarn workspaces**: pnpm보다 디스크 효율 낮음

## 결과

### 긍정적 영향
- ✅ 타입 안전성이 보장된 코드 공유
- ✅ 중앙화된 네이밍 컨벤션 (@piece/config)
- ✅ 일관된 린트/포맷 규칙
- ✅ 효율적인 CI/CD

### 부정적 영향
- ⚠️ 초기 설정 복잡도 증가
- ⚠️ 빌드 시간 증가 (전체 프로젝트)
- ⚠️ IDE 설정 필요 (path mapping)

### 완화 전략
- Turborepo 또는 Nx 도입 검토 (빌드 캐싱)
- 선택적 빌드 스크립트 제공
- VSCode 설정 공유

## 참고 자료
- [pnpm workspace](https://pnpm.io/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)
