# 해나루 종합설비 홈페이지

충남 당진 지역 설비 시공 전문 업체(해나루 종합설비) 홍보/시공사례 홈페이지. **완전 정적 사이트**로 GitHub Pages(`haenarueng.com`)에 배포한다. 관리자 화면(CMS)은 없고, 콘텐츠는 레포에 직접 커밋해서 관리한다.

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

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드해서 GitHub Pages에 배포한다 (1~2분 소요). push 전에 `npm run build`를 한 번 돌려보면 실패를 로컬에서 먼저 잡을 수 있다.

- 평소 배포 절차 + 최초 1회 설정(Pages 활성화, Spaceship DNS, 커스텀 도메인): [docs/배포-설정-가이드.md](./docs/배포-설정-가이드.md)
- 시공사례 추가 방법: [docs/시공사례-올리는법.md](./docs/시공사례-올리는법.md)
