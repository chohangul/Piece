# API Endpoints

Piece 앱의 모든 API 엔드포인트 명세입니다.

## 인증 (Authentication)

### POST /auth/signup
회원가입

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "metadata": {
    "nickname": "민지",
    "interests": ["사진", "카페"]
  }
}
```

**Response:**
```json
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "session": { "access_token": "...", "refresh_token": "..." }
}
```

### POST /auth/login
로그인

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "session": { "access_token": "...", "refresh_token": "..." }
}
```

### POST /auth/logout
로그아웃

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{ "success": true }
```

---

## 카드 (Cards)

### GET /cards
카드 목록 조회

**Query Parameters:**
- `user_id` (optional): 특정 사용자의 카드만 조회

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "cards": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "type": "photo",
      "meta": {
        "title": "주말 카페 투어",
        "description": "강남 카페 탐방",
        "tags": ["카페", "사진"]
      },
      "is_active": true,
      "created_at": "2025-10-23T00:00:00Z"
    }
  ]
}
```

### POST /cards
카드 생성

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "type": "photo",
  "meta": {
    "title": "주말 카페 투어",
    "description": "강남 카페 탐방",
    "tags": ["카페", "사진"]
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "type": "photo",
  "meta": { ... },
  "created_at": "2025-10-23T00:00:00Z"
}
```

### PATCH /cards/:id
카드 수정

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "meta": {
    "title": "업데이트된 제목"
  },
  "is_active": true
}
```

### DELETE /cards/:id
카드 삭제

**Headers:**
```
Authorization: Bearer {access_token}
```

---

## 조각 (Pieces)

### GET /pieces?card_id={card_id}
카드의 조각 목록 조회

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "pieces": [
    {
      "id": "uuid",
      "card_id": "uuid",
      "idx": 0,
      "state": "free",
      "preview_level": 10,
      "mask": { "blur_level": 10 },
      "content_url": "https://..."
    }
  ]
}
```

### POST /pieces/:id/unlock
조각 해제

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "method": "coin"
}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "piece_id": "uuid",
  "method": "coin",
  "created_at": "2025-10-23T00:00:00Z"
}
```

---

## 피드 (Feed)

### GET /feed
피드 목록 조회

**Query Parameters:**
- `region` (optional): 지역 필터
- `interests` (optional): 관심사 필터 (쉼표로 구분)
- `sort` (optional): 정렬 방식 (recent, popular, nearby)
- `page` (optional, default: 1): 페이지 번호
- `limit` (optional, default: 20): 페이지 크기

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "cards": [
    {
      "id": "uuid",
      "user": { "id": "uuid", "nickname": "민지" },
      "pieces": [ ... ],
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

---

## 매칭 (Match)

### POST /match/send-piece
피스 보내기

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "to_user": "uuid",
  "via": "send_piece"
}
```

**Response:**
```json
{
  "id": "uuid",
  "from_user": "uuid",
  "to_user": "uuid",
  "via": "send_piece",
  "status": "pending",
  "created_at": "2025-10-23T00:00:00Z"
}
```

### POST /match/respond
매칭 요청 응답

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "intent_id": "uuid",
  "accept": true
}
```

**Response:**
```json
{
  "match": {
    "id": "uuid",
    "user_a": "uuid",
    "user_b": "uuid",
    "created_at": "2025-10-23T00:00:00Z"
  }
}
```

### GET /match/list
매칭 목록 조회

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "matches": [
    {
      "id": "uuid",
      "user_a": { ... },
      "user_b": { ... },
      "created_at": "2025-10-23T00:00:00Z"
    }
  ]
}
```

---

## 지갑 (Wallet)

### GET /wallet
지갑 정보 조회

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "user_id": "uuid",
  "coins": 100,
  "pass_tier": "free",
  "created_at": "2025-10-23T00:00:00Z"
}
```

### POST /wallet/purchase
코인 구매 (IAP)

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "platform": "ios",
  "receipt": "base64_encoded_receipt",
  "product_id": "piece.coins.100"
}
```

**Response:**
```json
{
  "transaction_id": "uuid",
  "coins": 100,
  "new_balance": 200
}
```

### GET /wallet/transactions
거래 내역 조회

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "type": "purchase",
      "amount": 100,
      "meta": { ... },
      "created_at": "2025-10-23T00:00:00Z"
    }
  ]
}
```

---

## 신고 (Report)

### POST /report
신고하기

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "target_type": "user",
  "target_id": "uuid",
  "reason": "spam",
  "description": "스팸 메시지 반복 전송"
}
```

**Response:**
```json
{
  "id": "uuid",
  "actor": "uuid",
  "target_type": "user",
  "target_id": "uuid",
  "reason": "spam",
  "status": "pending",
  "created_at": "2025-10-23T00:00:00Z"
}
```

---

## 차단 (Block)

### POST /block
사용자 차단

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request:**
```json
{
  "target_user": "uuid"
}
```

**Response:**
```json
{
  "id": "uuid",
  "actor": "uuid",
  "target_user": "uuid",
  "created_at": "2025-10-23T00:00:00Z"
}
```

### GET /block/list
차단 목록 조회

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "blocks": [
    {
      "id": "uuid",
      "target_user": { "id": "uuid", "nickname": "..." },
      "created_at": "2025-10-23T00:00:00Z"
    }
  ]
}
```

### DELETE /block/:target_user_id
차단 해제

**Headers:**
```
Authorization: Bearer {access_token}
```

---

## 오류 응답

모든 API는 오류 발생 시 다음 형식으로 응답합니다:

```json
{
  "error": "error_code",
  "message": "사용자에게 표시할 오류 메시지",
  "status": 400
}
```

**공통 오류 코드:**
- `400`: Bad Request (잘못된 요청)
- `401`: Unauthorized (인증 필요)
- `403`: Forbidden (권한 없음)
- `404`: Not Found (리소스 없음)
- `429`: Too Many Requests (레이트 리밋)
- `500`: Internal Server Error (서버 오류)
