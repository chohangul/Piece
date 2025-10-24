# Infra

> 인프라 설정 및 스크립트

## 역할

Piece 프로젝트의 인프라 관련 파일들을 관리합니다:
- Supabase 데이터베이스 스키마
- 유틸리티 스크립트
- GitHub Actions 설정
- 배포 스크립트

## 디렉토리 구조

```
infra/
├── github/              # GitHub 관련 설정 (미사용)
├── scripts/             # 유틸리티 스크립트
│   ├── auto-commit.sh
│   └── verify-consistency.ts
└── supabase/            # Supabase 관련
    ├── migrations/      # DB 마이그레이션
    ├── functions/       # Edge Functions
    ├── seed/            # 시드 데이터
    └── README.md
```

## 스크립트

### auto-commit.sh
자동 커밋 및 푸시 스크립트

```bash
./infra/scripts/auto-commit.sh "commit message"
```

### verify-consistency.ts
전역 네이밍 일관성 검증

```bash
npx tsx infra/scripts/verify-consistency.ts
```

검증 항목:
- API 라우트 중복 체크
- 이벤트 이름 중복 체크
- 스토어 키 중복 체크
- 네이밍 규칙 준수 체크
- 하드코딩된 문자열 체크

## Supabase

데이터베이스 및 Edge Functions 관련 파일은 `supabase/` 디렉토리를 참고하세요.

자세한 내용: [supabase/README.md](./supabase/README.md)

## 관련 문서

- [프로젝트 README](../README.md)
- [Supabase 문서](./supabase/README.md)
