# @piece/ui

> 공유 UI 컴포넌트 라이브러리

## 역할

Piece 프로젝트 전체에서 재사용 가능한 UI 컴포넌트를 제공합니다.

## 상태

🚧 **구현 예정**

현재는 앱에서 직접 컴포넌트를 구현하고 있으며, 향후 공통 컴포넌트를 이 패키지로 추출할 예정입니다.

## 계획된 컴포넌트

### 기본 컴포넌트
- Button
- Input
- Card
- Modal
- Loading Spinner
- Avatar
- Badge

### 복합 컴포넌트
- CardItem (카드 미리보기)
- PieceProgress (조각 진행바)
- UserProfile (사용자 프로필 카드)

## 사용 방법

```typescript
import { Button, Card } from '@piece/ui';

function MyComponent() {
  return (
    <Card>
      <Button>클릭</Button>
    </Card>
  );
}
```

## 개발 가이드

### 새 컴포넌트 추가

1. `src/components/` 에 컴포넌트 생성
2. `src/index.ts` 에서 export
3. Storybook 스토리 작성 (선택)
4. 테스트 작성

### 스타일링

- React Native StyleSheet 사용
- 테마 시스템 적용 예정

## 관련 문서

- [프로젝트 README](../../README.md)
