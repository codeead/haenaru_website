# 해나루 종합설비 홈페이지

충남 당진 지역 설비 시공 전문 업체(해나루 종합설비) 홍보/시공사례 홈페이지. **완전 정적 사이트**로 GitHub Pages에 배포하며, 수리 이력·연락처는 Decap CMS(`/admin`)로 관리한다.

기술 스택 및 프로젝트 규칙은 [CLAUDE.md](./CLAUDE.md), 기능 명세는 [기능정의서.md](./기능정의서.md)를 참조한다.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:4321](http://localhost:4321) 에서 확인.

## 주요 명령어

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 로컬 개발 서버 |
| `npm run build` | 타입체크 + 정적 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 로컬 미리보기 |
| `npm run check` | 타입체크만 |

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드해서 GitHub Pages에 배포한다. CMS(`/admin`)에서 게시하면 이 워크플로우가 자동 실행된다.

최초 1회 설정(GitHub Pages 활성화, Netlify Identity/Git Gateway, 커스텀 도메인)은 [docs/배포-설정-가이드.md](./docs/배포-설정-가이드.md) 참고.

관리자(비개발자)용 CMS 사용법은 [docs/아버지-사용가이드.md](./docs/아버지-사용가이드.md) 참고.
