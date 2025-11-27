# 미륵복전미륵불 - 정적 웹사이트 생성기

정적 웹사이트를 자동으로 생성하고 배포하는 도구입니다.

## 설치

```bash
npm install
```

## 사용법

### 사이트 생성

```bash
# 단일 사이트 생성
npm run generate site-001

# 모든 사이트 생성
npm run generate:all
```

### 로컬 서버 실행

```bash
# 단일 사이트 미리보기
npm run serve

# 모든 사이트 미리보기
npm run serve:all
```

### Cloudflare Pages 배포

```bash
# 단일 사이트 배포
npm run deploy:cloudflare site-001

# 모든 사이트 배포
npm run deploy:cloudflare:all
```

## 프로젝트 구조

```
mirek/
├── config/          # 사이트 설정 파일
├── template/        # Handlebars 템플릿
├── sites/           # 생성된 사이트들
├── scripts/         # 생성 및 배포 스크립트
└── package.json
```

## Cloudflare Pages 배포

자세한 배포 가이드는 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)를 참고하세요.

### 빠른 시작

1. Cloudflare 계정 생성 및 로그인
2. Wrangler CLI 설치: `npm install -g wrangler`
3. Wrangler 로그인: `wrangler login`
4. 사이트 배포: `npm run deploy:cloudflare site-001`

## 라이선스

MIT
