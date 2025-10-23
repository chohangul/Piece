# ADR 002: Supabase를 Phase 1 백엔드로 선택

## 상태
승인됨

## 날짜
2025-10-23

## 컨텍스트

MVP 단계에서 빠른 개발과 배포가 중요합니다. 백엔드 인프라를 직접 구축하는 것은 시간과 리소스가 많이 소요되며, 인증, 데이터베이스, 스토리지, 실시간 기능 등 여러 서비스를 통합해야 합니다.

## 결정

**Phase 1에서는 Supabase를 백엔드로 사용하고, Phase 2에서 NestJS로 마이그레이션합니다.**

### Phase 1: Supabase
- PostgreSQL 데이터베이스
- Auth (인증/인가)
- Storage (이미지/파일)
- Realtime (채팅)
- Edge Functions (서버리스)

### Phase 2: NestJS 마이그레이션
- 핵심 비즈니스 로직 분리
- Redis 캐싱/큐
- 고급 기능 구현

## 선택 이유

### Supabase 장점
1. **빠른 개발**
   - 인증, DB, 스토리지 즉시 사용
   - SDK 제공 (TypeScript)
   - 자동 API 생성

2. **비용 효율적**
   - 무료 티어 (MVP 충분)
   - 사용량 기반 과금

3. **기능 완성도**
   - Row Level Security (RLS)
   - 실시간 구독
   - Edge Functions

4. **PostgreSQL 호환**
   - 향후 마이그레이션 용이
   - 표준 SQL 사용

### Phase 2로 마이그레이션 이유
1. **확장성**: 트래픽 증가 시 커스텀 로직 필요
2. **비용**: 일정 규모 이상에서 자체 서버가 유리
3. **제어**: 세밀한 비즈니스 로직 구현

## 결과

### 긍정적 영향
- ✅ 2-3주 개발 시간 단축
- ✅ 인프라 관리 부담 감소
- ✅ 실시간 기능 즉시 사용
- ✅ 보안 기본 제공 (RLS)

### 부정적 영향
- ⚠️ Vendor lock-in 리스크
- ⚠️ 복잡한 쿼리 제한
- ⚠️ Edge Functions 성능 제한

### 완화 전략
- 비즈니스 로직을 클라이언트에 과도하게 두지 않음
- 데이터베이스 스키마를 표준 SQL로 작성
- Phase 2 마이그레이션 계획 수립

## 마이그레이션 전략

### Phase 1 → Phase 2
1. **데이터베이스**: PostgreSQL 덤프 → 자체 DB로 복원
2. **인증**: Supabase Auth 유지 or JWT 기반으로 전환
3. **스토리지**: S3 호환 스토리지로 마이그레이션
4. **Edge Functions**: NestJS 엔드포인트로 재구현

## 참고 자료
- [Supabase 공식 문서](https://supabase.com/docs)
- [NestJS 공식 문서](https://docs.nestjs.com/)
