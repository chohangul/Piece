# Server

> NestJS Backend (Phase 2)

## 상태

🚧 **Phase 2 - 구현 예정**

Phase 1에서는 Supabase를 백엔드로 사용하며, 트래픽 증가와 복잡한 비즈니스 로직이 필요해지면 NestJS로 마이그레이션할 예정입니다.

## Phase 2 목표

### 마이그레이션 대상
- 핵심 비즈니스 로직
- 복잡한 쿼리 및 트랜잭션
- 레이트 리미팅 및 캐싱
- 백그라운드 작업

### 기술 스택
- **Framework**: NestJS
- **Database**: PostgreSQL (from Supabase)
- **Cache**: Redis
- **Queue**: Bull
- **ORM**: Prisma or TypeORM
- **Auth**: JWT (from Supabase or custom)

## 디렉토리 구조 (계획)

```
server/
├── src/
│   ├── auth/              # 인증 모듈
│   ├── users/             # 사용자 모듈
│   ├── cards/             # 카드 모듈
│   ├── matches/           # 매칭 모듈
│   ├── wallet/            # 지갑 모듈
│   ├── common/            # 공통 모듈
│   └── app.module.ts
├── test/
│   ├── unit/
│   └── e2e/
├── prisma/
│   └── schema.prisma
└── package.json
```

## 마이그레이션 전략

### 1단계: 데이터베이스 마이그레이션
- Supabase PostgreSQL 덤프
- 자체 PostgreSQL 서버로 복원
- RLS 정책을 앱 레벨 권한으로 전환

### 2단계: API 점진적 전환
- 새 엔드포인트를 NestJS에서 구현
- 기존 Supabase API와 병행 운영
- 트래픽을 점진적으로 NestJS로 이동

### 3단계: Edge Functions 통합
- Edge Functions를 NestJS 엔드포인트로 재구현
- 이미지 처리, IAP 검증 등

### 4단계: Realtime 기능 전환
- Supabase Realtime → WebSocket (Socket.io)
- 채팅 시스템 재구현

## 예상 타임라인

- **Phase 1 완료**: 2-3개월
- **Phase 2 준비**: 1개월
- **Phase 2 구현**: 3-4개월

## 성능 목표

- **응답 시간**: < 100ms (P95)
- **동시 접속**: 10,000+
- **트랜잭션**: 1,000 TPS

## 관련 문서

- [ADR 002: Supabase 백엔드 선택](../docs/ADR/002-supabase-backend.md)
- [프로젝트 README](../README.md)
