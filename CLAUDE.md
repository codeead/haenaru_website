# CLAUDE.md — 프로젝트 규칙 (해나루 종합설비 홈페이지)

> Claude Code는 **작업 시작 전 이 파일을 먼저 읽고, 모든 규칙을 준수**한다.
> 상세 기능은 `기능정의서.md` 참조. 이 파일은 **구조·경로·네이밍·가드레일**을 정의한다.

---

## 1. 프로젝트 한 줄 요약

충남 당진 지역 설비 회사(배관·보일러·난방 등)의 홍보/시공사례 홈페이지. **완전 정적 사이트**로 **GitHub Pages**(도메인 `haenarueng.com`)에 배포한다. 서버/DB/백엔드가 없고 **관리자 화면(CMS)도 없다** — 수리 이력·사진·연락처는 개발자가 레포에 직접 커밋해서 관리한다(`docs/시공사례-올리는법.md`). 문의는 전화(`tel:`) + 카카오톡 채널 링크(버튼)로만 받는다 — 웹 폼·DB·이메일 발송 없음. 개인정보처리방침 페이지도 없음(폼/추적이 없어 불필요).

---

## 2. 기술 스택 (버전 고정)

- 임의로 메이저 버전을 올리지 말 것. `package.json`에 명시된 버전 유지.
- 핵심: **Astro**(정적 출력, `output: "static"`), **Tailwind v4**(`@tailwindcss/vite`), **Astro Content Collections**(zod 스키마), **Astro 내장 이미지 최적화**(`astro:assets`, `sharp`), **@astrojs/sitemap**.
- UI 프레임워크(React/Vue 등)는 쓰지 않는다 — 순수 Astro 컴포넌트 + 필요한 곳만 `<script>` 바닐라 JS.
- **새 의존성 추가 금지(가드레일 §9).** 추가가 필요하면 먼저 사유를 설명하고 승인받는다.

---

## 3. 폴더 구조 (이 트리를 따른다)

```
.
├─ CLAUDE.md
├─ 기능정의서.md
├─ astro.config.mjs
├─ tsconfig.json
├─ .github/workflows/deploy.yml   # push → build → GitHub Pages 배포
├─ docs/
│   ├─ 시공사례-올리는법.md         # 수리 이력 추가 방법 (폴더+index.md 규격)
│   └─ 배포-설정-가이드.md          # 평소 배포 + GitHub Pages/DNS 최초 설정
├─ public/
│   ├─ favicon.png
│   ├─ og-image.png
│   ├─ robots.txt
│   └─ CNAME                     # 커스텀 도메인 (haenarueng.com)
└─ src/
    ├─ content.config.ts         # Astro Content Collections 스키마 (works)
    ├─ content/
    │   ├─ works/<slug>/index.md + 같은 폴더의 사진 파일들   # 수리 이력
    │   ├─ site/config.json      # 회사 기본 정보 싱글턴
    │   ├─ services.ts           # 서비스 카테고리 (코드로 관리, 자주 안 바뀜)
    │   └─ about.ts              # 회사소개 본문 (코드로 관리)
    ├─ assets/
    │   ├─ brand/                # symbol.png, wordmark.png (실제 로고)
    │   └─ hero/                 # 히어로 배경 사진
    ├─ layouts/
    │   └─ BaseLayout.astro
    ├─ components/
    │   ├─ Header.astro / Footer.astro
    │   ├─ KakaoChannelButton.astro   # 카카오 채널 링크 or 전화 버튼 (config 값에 따라 자동 전환)
    │   ├─ WorkCard.astro
    │   └─ sections/              # 페이지 섹션 블록 (HeroCarousel, RepairHistory …)
    ├─ pages/                     # 라우트 = 파일 (Astro 파일 기반 라우팅)
    ├─ lib/
    │   └─ site.ts                # site/config.json 타입 접근자
    └─ styles/
        ├─ tokens.css             # 브랜드 컬러 기반 디자인 토큰 (Tailwind @theme inline)
        └─ globals.css
```

> **콘텐츠(텍스트·카테고리·회사 정보)는 컴포넌트 코드에 하드코딩하지 말고 `src/content/`에 둔다.**
> 수리 이력처럼 계속 늘어나는 데이터는 `src/content/works/<slug>/`에, 회사 정보는 `src/content/site/config.json` 한 곳에 모은다 — 전화번호를 고치려고 컴포넌트를 뒤지는 일이 없어야 한다. 서비스 카테고리처럼 거의 안 바뀌는 것만 코드 파일(`services.ts`)로 둔다.

---

## 4. 네이밍 컨벤션

| 대상 | 규칙 | 예 |
|---|---|---|
| 라우트 파일 | kebab-case | `services.astro`, `works/[id].astro` |
| 컴포넌트 파일/이름 | PascalCase | `WorkCard.astro`, `HeroCarousel.astro` |
| 유틸/라이브러리 | camelCase 함수 | `lib/site.ts` |
| 타입/인터페이스 | PascalCase | `SiteConfig` |
| 콘텐츠 컬렉션 frontmatter 필드 | camelCase | `workedAt`, `locationRegion` |
| CSS 토큰 | `--color-…`, `--radius-…` | `--color-primary` |
| 수리 이력 폴더 슬러그 | `{연도}-{월}-{설명}` | `2025-03-boiler-replace` |

---

## 5. 파일 경로 규칙

- **새 페이지** → `src/pages/<route>.astro` (Astro 파일 기반 라우팅).
- **재사용 UI 조각** → `src/components/`.
- **페이지 섹션 블록**(Hero, 수리 이력 그리드 등) → `src/components/sections/`. 페이지는 섹션을 조립만 한다.
- **정적 텍스트/카테고리/회사 정보** → `src/content/`. (컴포넌트에 박지 않는다.)
- **수리 이력 스키마**(`src/content.config.ts`)를 바꾸면 이미 등록된 `src/content/works/*/index.md`도 함께 고쳐야 한다 — zod 검증에서 빌드가 깨진다.
- **정적 자산**(로고·히어로 사진) → `src/assets/` (Astro가 빌드 시 자동 리사이즈/최적화). **수리 이력 사진은 해당 항목 폴더(`src/content/works/<slug>/`)에 같이 둔다.**
- **임시/스크래치 파일 금지**: 루트에 무작위 파일 만들지 말 것.

### import alias

- `tsconfig.json`에 `@/*` → `src/*` 설정. **상대경로 `../../..` 남발 금지, `@/`로 import.**

---

## 6. 환경변수 규칙

- 이 프로젝트는 현재 빌드에 필요한 시크릿이 없다(백엔드/API 키 없음). Kakao 연동은 JS SDK가 아니라 **`site/config.json`에 적어둔 순수 링크**(`kakaoChannelUrl`)로 처리하므로 API 키가 필요 없다.
- 향후 실제로 API 키가 필요한 기능(예: 지도 임베드로 전환 등)을 추가할 경우에만 `.env`/GitHub Actions secrets 사용을 검토하고, 이 문서에 규칙을 추가한다.
- **어떤 경우에도 계좌번호·주민등록번호 등 민감정보는 레포에 커밋하지 않는다.** (`명함.jpeg`는 `.gitignore` 처리됨)

---

## 7. 코딩 컨벤션

- **TypeScript strict.** `any` 지양, 콘텐츠 컬렉션 스키마는 zod로 검증.
- 상호작용이 필요한 곳만 `<script>` 바닐라 JS 사용 (모바일 메뉴 토글, 히어로 캐러셀 등). React 등 UI 프레임워크를 새로 끌어오지 않는다.
- 이미지는 항상 `astro:assets`의 `<Image />`를 통해서만 다룬다 (자동 최적화/리사이즈를 놓치지 않기 위함). `public/`에 사용자 콘텐츠 이미지를 직접 넣지 않는다.
- 주석은 "왜"를 적는다. 자명한 코드 설명 주석 금지.
- 커밋은 작은 단위, 명확한 메시지.

---

## 8. 스타일/디자인 규칙

- 색상·간격·radius·폰트는 **`src/styles/tokens.css`의 CSS 변수 / Tailwind 유틸리티만** 사용. 컴포넌트에 hex/px 색상 하드코딩 금지.
- 브랜드 컬러는 실제 로고에서 추출한 값(`--color-brand-red: #f41b26`, `--color-brand-blue: #0b51db`) 기준. 로고 파일 교체 시에만 이 값을 다시 뽑는다.
- "로컬·장인" 톤 — 따뜻한 오프화이트 배경, 절제된 색 사용, 실제 로고/사진을 적극 노출. `.agents/skills/apple-design` 스킬의 여백·타이포·절제된 모션 원칙을 참고한다(단, 드래그/스프링 같은 제스처 애니메이션은 이 사이트 성격상 불필요 — 과도하게 끌어오지 않는다).
- 모바일 우선. 로고는 `src/assets/brand/`.

---

## 9. 가드레일 (하지 말 것 / 반드시 할 것)

**하지 말 것**

- ❌ 웹 문의 폼 / 문의 DB / 이메일 발송 구현 (→ 문의는 전화 + 카카오톡 채널 링크로만)
- ❌ 승인 없이 새 라이브러리/의존성 추가 (특히 React 등 UI 프레임워크, 상태관리 라이브러리)
- ❌ 계좌번호 등 민감정보를 레포/콘텐츠에 포함
- ❌ 백엔드/DB/서버리스 함수 추가 (완전 정적 유지가 원칙 — 예외가 필요하면 먼저 사유 설명 후 승인받는다)
- ❌ `public/`에 사용자 업로드 이미지를 직접 저장 (→ `src/content/works/<slug>/` 또는 `src/assets/`, Astro 이미지 파이프라인을 거치게)
- ❌ 개인정보처리방침 페이지 재도입 (폼/추적 없는 정적 사이트라 불필요 — 향후 분석 도구를 추가하게 되면 이 규칙을 재검토)
- ❌ 메이저 버전 임의 업그레이드, 폴더 구조 임의 변경

**반드시 할 것**

- ✅ 수리 이력은 **폴더 하나 = 사례 하나**(`<slug>/index.md` + 사진) 구조를 유지 — 추가할 때 코드를 건드릴 일이 없어야 한다
- ✅ 카카오톡 채널 버튼은 `kakaoChannelUrl`이 비어 있으면 전화 문의 버튼으로 자동 대체
- ✅ 이미지는 `astro:assets`를 거쳐 자동 최적화 (원본 대용량을 그대로 서빙하지 않기)
- ✅ 각 마일스톤 종료 시 `npm run build` 로컬 성공 확인
- ✅ 도메인을 바꾸면 `astro.config.mjs`·`public/CNAME`·`public/robots.txt`·`BaseLayout.astro` 네 곳을 함께 수정

---

## 10. 작업 진행 방식

- `기능정의서.md`의 진행 순서대로 진행. 한 번에 전부 만들지 말 것.
- 페이지는 **섹션 컴포넌트 단위**로 작성 후 조립.
- 불확실하거나 기획서에 없는 결정이 필요하면 **임의 진행하지 말고 질문**한다.
- 콘텐츠 스키마 변경 시: `src/content.config.ts` 수정 → 기존 `src/content/works/*/index.md`도 함께 수정 → `npm run build`로 확인.

---

## 11. 주요 명령어

```
npm run dev       # 로컬 개발 서버
npm run build     # 타입체크(astro check) + 정적 빌드
npm run preview   # 빌드 결과 로컬 미리보기
npm run check     # 타입체크만
```

배포는 `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드하여 GitHub Pages(`haenarueng.com`)에 올린다. 자세한 절차는 `docs/배포-설정-가이드.md`.
