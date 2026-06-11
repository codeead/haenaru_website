# 해나루 종합설비 홈페이지

설비 시공 전문 업체 홈페이지. 기술 스택 및 프로젝트 규칙은 [CLAUDE.md](./CLAUDE.md), 기능 명세는
[기능정의서.md](./기능정의서.md)를 참조한다.

## 시작하기

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인.

## 주요 명령어

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 로컬 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | OpenNext + Wrangler로 Cloudflare 환경 프리뷰 |
| `npm run deploy` | Cloudflare에 배포 |
| `npm run lint` | ESLint |
| `npm run cf-typegen` | `wrangler.jsonc` 변경 후 Cloudflare 바인딩 타입 재생성 |
| `npm run db:generate` | Drizzle 마이그레이션 생성 |
| `npm run db:migrate:local` | 로컬 D1에 마이그레이션 적용 |
| `npm run db:migrate:remote` | 원격 D1에 마이그레이션 적용 |

## 배포 전 준비 (Cloudflare)

1. `npx wrangler login`
2. `npx wrangler d1 create mechanical-website-db` → `wrangler.jsonc`의 `database_id`에 반영
3. `npx wrangler r2 bucket create mechanical-website-photos`
4. `npx wrangler r2 bucket create mechanical-website-opennext-cache`
5. `.dev.vars.example`을 `.dev.vars`로 복사 후 값 채우기 (커밋 금지)
6. 운영 환경 변수는 `wrangler secret put <NAME>`으로 등록
