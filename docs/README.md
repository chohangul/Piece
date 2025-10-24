# Piece 문서

> 프로젝트 문서 및 아키텍처 결정 기록

## 📁 구조

```
docs/
├── ADR/                    # Architecture Decision Records
│   ├── 001-monorepo-structure.md
│   └── 002-supabase-backend.md
├── API/                    # API 명세
│   └── endpoints.md
├── DESIGN/                 # 디자인 문서
└── README.md               # 이 파일
```

## 📚 문서 유형

### ADR (Architecture Decision Records)
아키텍처 결정 사항을 기록합니다. 새로운 기술 도입이나 구조 변경 시 ADR을 작성합니다.

**템플릿:**
```markdown
# ADR XXX: 제목

## 상태
[제안됨 | 승인됨 | 폐기됨 | 대체됨]

## 날짜
YYYY-MM-DD

## 컨텍스트
결정이 필요한 배경

## 결정
무엇을 결정했는지

## 결과
이 결정의 긍정적/부정적 영향
```

### API 문서
REST API 엔드포인트, 요청/응답 형식을 문서화합니다.

### 디자인 문서
UI/UX 플로우, 화면 설계, 상태 다이어그램을 기록합니다.

## 🔗 주요 문서

### 아키텍처
- [ADR 001: Monorepo 구조 선택](./ADR/001-monorepo-structure.md)
- [ADR 002: Supabase 백엔드 선택](./ADR/002-supabase-backend.md)

### API
- [API Endpoints](./API/endpoints.md)

## ✍️ 문서 작성 가이드

### 새 ADR 작성
1. `docs/ADR/`에 새 파일 생성 (번호 순서)
2. 템플릿 사용
3. 팀원 리뷰 후 "승인됨" 상태로 변경
4. PR에 ADR 링크 포함

### API 문서 업데이트
1. 엔드포인트 추가/변경 시 즉시 업데이트
2. Request/Response 예시 포함
3. 오류 케이스 문서화

### 디자인 문서 작성
1. Figma 링크 또는 다이어그램 포함
2. 주요 사용자 플로우 설명
3. 상태 전이 다이어그램 (Mermaid 권장)

## 🔄 문서 유지보수

- 코드 변경 시 관련 문서 함께 업데이트
- 분기별 문서 리뷰 진행
- 폐기된 ADR은 "대체됨" 상태로 표시하고 새 ADR 링크

## 📖 참고 자료

- [ADR 작성 가이드](https://github.com/joelparkerhenderson/architecture-decision-record)
- [API 문서 베스트 프랙티스](https://swagger.io/blog/api-documentation/best-practices-in-api-documentation/)
