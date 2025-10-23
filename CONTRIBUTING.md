# 기여 가이드

Piece 프로젝트에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 설명합니다.

## 🚀 시작하기

### 1. 저장소 포크 및 클론

```bash
# 포크한 저장소 클론
git clone https://github.com/YOUR_USERNAME/piece.git
cd piece

# 원본 저장소를 upstream으로 추가
git remote add upstream https://github.com/original-org/piece.git
```

### 2. 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
cd apps/mobile
pnpm dev
```

## 📋 개발 워크플로우

### 브랜치 전략

- `main`: 프로덕션 브랜치 (보호됨)
- `feature/*`: 새 기능 개발
- `fix/*`: 버그 수정
- `chore/*`: 기타 작업 (리팩토링, 문서화 등)

### 브랜치 생성

```bash
# 새 기능 개발
git checkout -b feature/card-creation

# 버그 수정
git checkout -b fix/unlock-piece-bug

# 기타 작업
git checkout -b chore/update-readme
```

## ✅ 체크리스트

PR을 생성하기 전에 다음 사항을 확인하세요:

### 코드 품질
- [ ] 린트 검사 통과 (`pnpm lint`)
- [ ] 타입 체크 통과 (`pnpm typecheck`)
- [ ] 테스트 통과 (`pnpm test`)
- [ ] 빌드 성공 (`pnpm build`)

### 일관성 검증
- [ ] 스키마/타입/스토어 키 일관성 검토 완료
- [ ] API/이벤트 명세 업데이트 (필요한 경우)
- [ ] 네이밍 규칙 준수 (`packages/config/src/names.ts` 사용)

### 문서화
- [ ] 관련 README 업데이트
- [ ] ADR 작성 (아키텍처 결정이 있는 경우)
- [ ] CHANGELOG 업데이트 고려
- [ ] API 문서 업데이트 (API 변경 시)

### 테스트
- [ ] 유닛 테스트 작성 (핵심 로직)
- [ ] e2e 스모크 테스트 통과 (주요 플로우 변경 시)

## 📝 커밋 규칙

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

### 커밋 타입

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경 (포맷팅, 세미콜론 등)
- `refactor`: 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 파일 변경
- `ci`: CI 설정 변경
- `revert`: 이전 커밋 되돌리기

### 커밋 메시지 예시

```bash
# 좋은 예
feat: 카드 생성 UI 추가
fix: 조각 해제 시 코인 차감 오류 수정
docs: API 문서 업데이트
refactor: 매칭 로직 개선

# 나쁜 예
update code
fixed bugs
WIP
```

### Commitizen 사용

```bash
# 대화형 커밋 도구 사용
pnpm commit
```

## 🧪 테스트 작성

### 유닛 테스트

```typescript
// example.test.ts
import { describe, it, expect } from '@jest/globals';
import { unlockPiece } from './unlock';

describe('unlockPiece', () => {
  it('should unlock piece with valid coin balance', async () => {
    const result = await unlockPiece({
      userId: 'user-123',
      pieceId: 'piece-456',
      method: 'coin',
    });
    
    expect(result.success).toBe(true);
    expect(result.unlocked).toBe(true);
  });
});
```

### e2e 테스트

주요 사용자 플로우에 대한 e2e 테스트를 작성하세요:

1. 온보딩 → 카드 생성
2. 피드 탐색 → 조각 해제
3. 피스 보내기 → 매칭 → 채팅

## 🎨 코드 스타일

### TypeScript

```typescript
// 파일명: kebab-case
// user-profile.ts

// 변수/함수: camelCase
const userName = 'John';
function getUserProfile() {}

// 컴포넌트/클래스: PascalCase
class UserProfile {}
function UserCard() {}

// 상수: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;

// 타입/인터페이스: PascalCase
type UserData = {};
interface CardProps {}
```

### 네이밍 규칙

**중요**: 모든 API 경로, 이벤트명, 스토어 키는 `@piece/config`에서 import하세요.

```typescript
// ✅ 좋은 예
import { API_ROUTES, EVENT_NAMES, STORE_KEYS } from '@piece/config';

fetch(API_ROUTES.CARDS_CREATE);
emit(EVENT_NAMES.PIECE_UNLOCKED);
store.get(STORE_KEYS.USER_PROFILE);

// ❌ 나쁜 예
fetch('/cards/create'); // 하드코딩 금지
emit('piece-unlocked'); // 하드코딩 금지
store.get('userProfile'); // 하드코딩 금지
```

## 🔍 코드 리뷰

### PR 생성

1. PR 템플릿의 체크리스트를 모두 확인하세요
2. 변경 사항을 명확하게 설명하세요
3. 스크린샷이나 GIF를 첨부하세요 (UI 변경 시)
4. 관련 이슈를 링크하세요 (`Closes #123`)

### 리뷰어 가이드

- 코드 품질과 일관성을 중점적으로 검토
- 건설적인 피드백 제공
- 승인 전 모든 CI 체크가 통과되었는지 확인

## 🐛 버그 리포트

버그를 발견하셨나요? [이슈 템플릿](https://github.com/your-org/piece/issues/new?template=bug_report.md)을 사용하여 리포트해주세요.

### 포함할 내용

- 버그 설명
- 재현 방법
- 예상 동작
- 실제 동작
- 환경 정보 (OS, 디바이스, 앱 버전)
- 스크린샷 (가능한 경우)

## 💡 기능 제안

새로운 기능을 제안하고 싶으신가요? [기능 제안 템플릿](https://github.com/your-org/piece/issues/new?template=feature_request.md)을 사용해주세요.

### 포함할 내용

- 기능 설명
- 사용 사례
- 기대 효과
- 대안 (있는 경우)

## 📚 추가 리소스

- [프로젝트 아키텍처](./docs/ADR/)
- [API 문서](./docs/API/)
- [디자인 가이드](./docs/DESIGN/)

## 📞 문의

질문이 있으시면:

- 이슈를 생성하거나
- han@krobia.or.kr로 이메일을 보내주세요

---

다시 한번 기여해주셔서 감사합니다! 🙏
