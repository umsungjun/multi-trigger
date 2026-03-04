# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

MultiTrigger는 미국 주식(Finnhub), 한국 주식(KIS), 암호화폐(Binance)의 가격을 모니터링하고 목표가 도달 시 FCM 푸시 알림을 보내는 Next.js 앱입니다.

## 개발 명령어

```bash
pnpm dev        # 개발 서버 (localhost:3000)
pnpm build      # 프로덕션 빌드
pnpm lint       # ESLint 검사
```

**패키지 매니저**: pnpm (npm/yarn 사용 금지)

## 아키텍처

### 기술 스택
- **프레임워크**: Next.js (App Router) + TypeScript
- **인증**: NextAuth v5 (Google OAuth) + Prisma 세션 관리
- **DB**: PostgreSQL (Neon serverless) via Prisma ORM
- **스타일**: Tailwind CSS v4 + next-themes (라이트/다크 모드)
- **푸시 알림**: Firebase Cloud Messaging (FCM)
- **배포**: Vercel (cron job 포함)

### 디렉토리 구조

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth 핸들러
│   │   ├── alerts/              # 알림 CRUD
│   │   ├── prices/              # 가격 조회 (type별), 검색
│   │   ├── fcm/                 # FCM 토큰 등록
│   │   └── cron/check-alerts/  # 매시간 실행: 알림 체크 → FCM 발송
│   ├── dashboard/               # 메인 대시보드 (인증 필요)
│   └── login/                   # Google OAuth 로그인
├── components/                  # UI 컴포넌트
└── lib/
    ├── auth.ts                  # NextAuth 설정
    ├── db/index.ts              # Prisma 클라이언트 (Neon 어댑터)
    └── services/
        ├── finnhub.ts           # 미국 주식 (Finnhub API)
        ├── kis.ts               # 한국 주식 (KIS API, OAuth2 캐시 포함)
        ├── binance.ts           # 암호화폐 (Binance public API)
        └── fcm.ts               # FCM 알림 발송
```

### 핵심 데이터 흐름

1. **가격 조회**: 클라이언트 60초 폴링 → `/api/prices?type=<type>&symbols=<...>`
2. **알림 트리거**: Vercel cron(매시간) → `/api/cron/check-alerts` → 활성 알림 조회 → 가격 비교 → FCM 발송 → `isActive: false` 처리
3. **인증**: Google OAuth → NextAuth → Prisma `User`/`Session`/`Account` 모델

### DB 스키마 핵심 모델

- `User`: 구글 OAuth 계정
- `Alert`: `{ symbol, assetType, targetPrice, direction('above'|'below'), isActive }` — `[symbol, assetType, isActive]` 인덱스
- `FcmToken`: 사용자별 FCM 디바이스 토큰

## 환경 변수

로컬 개발 시 `.env.local` 필요:

```
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=                    # Neon PostgreSQL
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FINNHUB_API_KEY=
KIS_APP_KEY=
KIS_APP_SECRET=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
CRON_SECRET=                     # /api/cron/check-alerts 보안 헤더
```

## 주요 패턴 및 주의사항

- **API 경로 보안**: cron 엔드포인트는 `Authorization: Bearer <CRON_SECRET>` 헤더 검증, alert 삭제는 `userId` 일치 확인
- **KIS 토큰**: 23시간 캐시 (in-memory) — 재시작 시 재발급
- **assetType 값**: `'us_stock'` | `'kr_stock'` | `'crypto'` (DB에 문자열로 저장)
- **테마**: CSS 변수(`--background`, `--foreground`, `--card` 등)로 정의, `.dark` 클래스 전환
- **Tailwind CSS v4**: `@import "tailwindcss"` 방식 사용 (`tailwind.config.js` 없음)
- **경로 별칭**: `@/*` → `src/*`
