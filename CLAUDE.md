# CLAUDE.md — 프로젝트 규칙 (해나루 종합설비 홈페이지)

> Claude Code는 **작업 시작 전 이 파일을 먼저 읽고, 모든 규칙을 준수**한다.
> 상세 기능은 `기능정의서.md` 참조. 이 파일은 **구조·경로·네이밍·가드레일**을 정의한다.

---

## 1. 프로젝트 한 줄 요약
설비 회사 홍보/시공사례 사이트. 공개 페이지 + `/admin`(Cloudflare Access 보호, 2인). 사진 업로드 자동정리(EXIF), **문의는 카카오톡 채널 채팅 버튼**(웹 폼·DB·메일 없음). 전 구간 무료 티어. 스택: **Next.js 15(App Router) + TS + Tailwind v4 + Cloudflare(Pages/D1/R2/Access) + Drizzle**.

---

## 2. 기술 스택 (버전 고정)
- 임의로 메이저 버전 올리지 말 것. `package.json`에 명시된 버전 유지.
- 핵심: `next@15`, `react@19`, `typescript`, `tailwindcss@4`, `drizzle-orm`, `@opennextjs/cloudflare`, `wrangler`, `zod`, `exifr`, `heic2any`, `serwist`.
- 외부 SDK(스크립트 로드): **Kakao JS SDK**(지도 + 채널 채팅 버튼).
- **새 의존성 추가 금지(가드레일 §9).** 추가가 필요하면 먼저 사유를 설명하고 승인받는다.

---

## 3. 폴더 구조 (이 트리를 따른다)

```
.
├─ CLAUDE.md
├─ 기능정의서.md
├─ next.config.ts
├─ open-next.config.ts
├─ wrangler.toml                # Cloudflare 바인딩(D1/R2), 변수
├─ drizzle.config.ts
├─ .dev.vars                    # 로컬 시크릿 (gitignore, 커밋 금지)
├─ .env.example                 # 변수 "이름"만, 값 없음
├─ public/
│   ├─ brand/                   # logo.svg 등 (수령 후 교체)
│   ├─ icons/                   # PWA 아이콘
│   └─ manifest.webmanifest
├─ migrations/                  # D1 SQL 마이그레이션 (drizzle-kit 생성)
└─ src/
    ├─ app/                     # App Router (라우트 = 폴더)
    │   ├─ (public)/            # 공개 페이지 그룹
    │   │   ├─ page.tsx               # /
    │   │   ├─ about/page.tsx
    │   │   ├─ services/page.tsx
    │   │   ├─ works/page.tsx
    │   │   ├─ works/[id]/page.tsx
    │   │   ├─ location/page.tsx
    │   │   ├─ contact/page.tsx       # 전화 + 카카오 채널 버튼 (폼 아님)
    │   │   └─ privacy/page.tsx
    │   ├─ admin/               # 보호 영역 (Cloudflare Access)
    │   │   ├─ page.tsx
    │   │   └─ works/...        # 목록·new·[id]/edit
    │   ├─ api/                 # Route Handlers (서버 액션 우선, 필요 시만)
    │   │   └─ img/[...key]/route.ts   # R2 서빙
    │   ├─ layout.tsx
    │   └─ sitemap.ts / robots.ts
    ├─ components/
    │   ├─ ui/                  # 범용 프리미티브 (Button, Card …)
    │   ├─ sections/            # 페이지 섹션 블록 (Hero, WorkGrid …)
    │   ├─ admin/               # 관리자 전용 컴포넌트
    │   └─ KakaoChannelButton.tsx     # 카카오 채널 채팅 버튼(클라이언트)
    ├─ content/                 # 잘 안 바뀌는 텍스트/설정 (코드 아님)
    │   ├─ site-config.ts       # 창업연도, baseline 카운트, 주소·전화·좌표·영업시간·채널ID
    │   ├─ services.ts          # 사업영역 카테고리 (배관/보일러/난방 …)
    │   ├─ about.md             # 회사소개 본문
    │   └─ privacy.md           # 개인정보처리방침 본문
    ├─ db/
    │   ├─ schema.ts            # Drizzle 스키마 (works, work_photos) ※inquiries 없음
    │   └─ index.ts             # D1 클라이언트
    ├─ lib/                     # 도메인 로직/외부연동
    │   ├─ images.ts            # HEIC변환·리사이즈·EXIF
    │   ├─ geocode.ts           # 카카오 역지오코딩(좌표→구·동)
    │   ├─ kakao.ts             # Kakao SDK 로드·init·채널 채팅 헬퍼
    │   └─ counts.ts            # 누적 시공 카운터 로직
    ├─ styles/
    │   ├─ tokens.css           # 디자인 토큰 (CSS 변수, TBD placeholder)
    │   └─ globals.css
    ├─ types/                   # 공용 타입
    └─ middleware.ts            # /admin Access 확인
```

> **콘텐츠(텍스트·카테고리·운영 숫자)는 컴포넌트 코드에 하드코딩하지 말고 `src/content/`에 둔다.**
> 동적 데이터(시공사례·사진)는 **D1/R2**, 정적 텍스트는 **content 파일**. **문의 관련 폼/DB/메일 코드는 만들지 않는다.**

---

## 4. 네이밍 컨벤션

| 대상 | 규칙 | 예 |
|---|---|---|
| 라우트 폴더/세그먼트 | kebab-case | `works`, `about` |
| 컴포넌트 파일/이름 | PascalCase | `HeroSection.tsx`, `WorkCard.tsx` |
| 훅 | `useXxx` camelCase | `useWorkForm.ts` |
| 유틸/라이브러리 | camelCase 함수 | `lib/images.ts` → `resizeImage()` |
| 타입/인터페이스 | PascalCase | `Work`, `WorkPhoto` |
| 상수 | UPPER_SNAKE_CASE | `MAX_IMAGE_WIDTH` |
| DB 테이블/컬럼 | snake_case | `work_photos`, `worked_at` |
| 환경변수 | UPPER_SNAKE_CASE | `KAKAO_JS_KEY` |
| R2 객체 키 | `works/{workId}/{photoId}_{full|thumb}.jpg` | |
| CSS 토큰 | `--color-…`, `--space-…`, `--radius-…` | `--color-primary` |

---

## 5. 파일 경로 규칙 (가장 중요 — 어디에 무엇을 두나)

- **새 페이지** → `src/app/(public)/<route>/page.tsx` (공개) 또는 `src/app/admin/<route>/...` (보호).
- **재사용 UI 프리미티브** → `src/components/ui/`.
- **페이지 섹션 블록**(Hero, 시공사례 그리드 등) → `src/components/sections/`. 페이지는 섹션을 조립만 한다.
- **관리자 전용 컴포넌트** → `src/components/admin/`.
- **카카오 채널 버튼** → `src/components/KakaoChannelButton.tsx`, SDK 로직은 `src/lib/kakao.ts`.
- **정적 텍스트/카테고리/운영 숫자** → `src/content/`. (코드에 박지 않는다.)
- **DB 스키마** → `src/db/schema.ts`, 쿼리 헬퍼는 `src/db/` 또는 `src/lib/`.
- **외부 연동/도메인 로직**(이미지·지오코딩·카카오·카운트) → `src/lib/`.
- **공용 타입** → `src/types/`.
- **정적 자산**(로고·아이콘·OG 이미지) → `public/`. **사용자 업로드 사진은 `public/`에 두지 않는다 → R2.**
- **마이그레이션 SQL** → `migrations/` (직접 손으로 만들지 말고 drizzle-kit으로 생성).
- **임시/스크래치 파일 금지**: 루트에 무작위 파일 만들지 말 것. 산출물은 위 구조 안에만.

### import alias
- `tsconfig.json`에 `@/*` → `src/*` 설정. **상대경로 `../../..` 남발 금지, `@/`로 import.**
  - 예: `import { Button } from "@/components/ui/Button"`

---

## 6. 환경변수 규칙
- 모든 시크릿은 환경변수. **코드/마크다운/커밋에 실제 키 절대 노출 금지.**
- 변수 "이름"은 `.env.example`에 기록(값 없이). 로컬 값은 `.dev.vars`(gitignore).
- 운영 시크릿은 `wrangler secret put <NAME>`로 주입.
- Cloudflare 바인딩(`DB`=D1, `BUCKET`=R2)은 `wrangler.toml`에 정의, 코드에서는 `getCloudflareContext()`로 접근.
- 필요한 변수: `KAKAO_JS_KEY`, `KAKAO_REST_KEY`, `KAKAO_CHANNEL_PUBLIC_ID` + 바인딩 `DB`/`BUCKET`. (이메일/Brevo 변수 없음.)

---

## 7. 코딩 컨벤션
- **TypeScript strict.** `any` 지양, 외부 입력은 zod로 파싱.
- **서버/클라이언트 컴포넌트 구분**: 기본 RSC(서버). 상호작용 필요한 곳만 `"use client"`. 업로드 UI(EXIF/HEIC/canvas)와 카카오 채널 버튼은 클라이언트.
- **데이터 접근은 서버에서**(서버 컴포넌트/액션/Route Handler). 클라이언트에서 D1 직접 접근 금지.
- 관리자 입력 검증 zod 스키마는 `src/lib` 또는 `src/types`에 공용 정의.
- 카카오 SDK는 필요한 페이지에서만 로드(전역 무분별 로드 금지). `lib/kakao.ts`로 init 중복 방지.
- 주석은 "왜"를 적는다. 자명한 코드 설명 주석 금지.
- 커밋은 작은 단위, 명확한 메시지.

---

## 8. 스타일/디자인 규칙
- 색상·간격·radius·폰트는 **`src/styles/tokens.css`의 CSS 변수만** 사용. 컴포넌트에 hex/px 색상 하드코딩 금지.
- 현재 토큰은 **placeholder(중립값)** — Figma 확정 후 이 파일만 교체하면 전체 반영되어야 함.
- Tailwind는 토큰 변수를 매핑해서 사용. 모바일 우선.
- 로고는 `public/brand/`. 실제 파일 수령 전엔 자리표시 로고 사용.

---

## 9. 가드레일 (하지 말 것 / 반드시 할 것)

**하지 말 것**
- ❌ 웹 문의 폼 / 문의 DB(inquiries) / 이메일 발송 구현 (→ 문의는 카카오톡 채널 버튼으로만)
- ❌ 승인 없이 새 라이브러리/의존성 추가
- ❌ 시크릿 하드코딩 또는 커밋
- ❌ 사용자 업로드 사진을 레포/`public/`에 저장 (→ R2)
- ❌ 상세주소·정확한 좌표를 **공개 페이지에 노출** (공개는 구·동까지만)
- ❌ 공개 회원가입/소셜로그인/결제/실시간 트래픽 집계 구현 (Non-goals)
- ❌ 관리자 비밀번호를 앱에서 저장/검증 (인증은 Cloudflare Access에 위임)
- ❌ 컴포넌트에 본문 텍스트·카테고리·운영 숫자 하드코딩 (→ `src/content/`)
- ❌ 메이저 버전 임의 업그레이드, 폴더 구조 임의 변경

**반드시 할 것**
- ✅ EXIF 자동값이 비면 **수동 입력 폴백** 제공 (날짜/위치)
- ✅ 업로드 사진은 **리사이즈 후** R2 적재(웹용 ≤1600px, 썸네일 ≤400px). 원본 대용량 그대로 올리지 않기
- ✅ 아이폰 HEIC는 JPEG로 변환
- ✅ 문의 진입점은 **카카오톡 채널 채팅 버튼 + 전화(`tel:`)** 로 통일(전 페이지 플로팅 버튼 포함)
- ✅ 모든 외부 입력 zod 검증(관리자 입력)
- ✅ 각 마일스톤 종료 시 `npm run build` + 로컬/프리뷰 동작 확인

---

## 10. 작업 진행 방식
- `기능정의서.md` §14 **마일스톤 순서(M1→M6)**대로 진행. 한 번에 전부 만들지 말 것.
- 페이지는 **섹션 컴포넌트 단위**로 작성 후 조립.
- 불확실하거나 기획서에 없는 결정이 필요하면 **임의 진행하지 말고 질문**한다.
- DB 스키마 변경 시: `schema.ts` 수정 → `drizzle-kit generate` → `wrangler d1 migrations apply`. 수동 SQL 편집 금지.

---

## 11. 주요 명령어 (확정 후 package.json에 반영)
```
npm run dev           # 로컬 개발 (Next + wrangler 바인딩)
npm run build         # 빌드
npm run preview       # @opennextjs/cloudflare 프리뷰
npm run deploy        # Cloudflare 배포
npm run db:generate   # drizzle 마이그레이션 생성
npm run db:migrate    # D1 마이그레이션 적용
```