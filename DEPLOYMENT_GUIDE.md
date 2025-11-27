# Cloudflare Pages 배포 가이드

## 1. 사전 준비

### 도메인 구매 및 설정
1. `itpage.kr` 도메인 구매 (가비아, 후이즈, 카페24 등)
2. 도메인 네임서버를 Cloudflare로 변경

### Cloudflare 계정 생성
1. [Cloudflare](https://dash.cloudflare.com/sign-up) 회원가입
2. 무료 플랜 선택

## 2. Cloudflare Pages 프로젝트 생성

### 방법 1: GitHub 연동 (권장)

1. **GitHub 저장소 생성**
   ```bash
   # 프로젝트를 GitHub에 푸시
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mirek.git
   git push -u origin main
   ```

2. **Cloudflare Pages에서 프로젝트 연결**
   - Cloudflare 대시보드 → Pages → Create a project
   - GitHub 저장소 선택
   - Build settings:
     - Build command: (없음 - 정적 사이트)
     - Build output directory: `sites/site-001` (각 사이트별로 프로젝트 생성)

### 방법 2: 직접 업로드

1. Cloudflare Pages → Create a project → Upload assets
2. `sites/site-001` 폴더를 압축하여 업로드
3. 프로젝트 이름: `site-001`

## 3. 서브도메인 설정

각 사이트마다 별도의 Cloudflare Pages 프로젝트를 생성하고, 서브도메인을 연결합니다.

### 예시: site-001.itpage.kr 설정

1. **Cloudflare Pages 프로젝트 생성**
   - 프로젝트 이름: `site-001`
   - 배포 완료 후 Custom domain 추가

2. **Custom domain 설정**
   - Pages 프로젝트 → Custom domains → Set up a custom domain
   - 도메인 입력: `site-001.itpage.kr`
   - Cloudflare가 자동으로 DNS 레코드 생성

3. **DNS 확인**
   - Cloudflare DNS → Records에서 자동 생성된 CNAME 확인
   - `site-001.itpage.kr` → `site-001.pages.dev` (CNAME)

## 4. 배포 프로세스

### 자동 배포 (GitHub 연동 시)
- GitHub에 푸시하면 자동으로 배포됨
- 각 브랜치/폴더별로 별도 프로젝트 생성 가능

### 수동 배포
- Cloudflare Pages → 프로젝트 → Upload assets
- 또는 Wrangler CLI 사용

## 5. 여러 사이트 배포 전략

### 옵션 1: 각 사이트별로 별도 프로젝트 (권장)
- `site-001.itpage.kr` → `sites/site-001` 폴더
- `site-002.itpage.kr` → `sites/site-002` 폴더
- 각각 별도의 Cloudflare Pages 프로젝트로 생성

### 옵션 2: 단일 프로젝트 + 라우팅
- 하나의 프로젝트에서 여러 사이트 관리
- `_routes.json` 파일로 라우팅 설정

## 6. 배포 스크립트 예시

각 사이트를 개별 프로젝트로 배포하는 스크립트:

```bash
#!/bin/bash
# deploy-all.sh

SITES_DIR="sites"
for site_dir in $SITES_DIR/*/; do
    site_name=$(basename $site_dir)
    echo "Deploying $site_name..."
    # Cloudflare Pages CLI로 배포
    # wrangler pages deploy $site_dir --project-name=$site_name
done
```

## 7. 비용 요약

- **도메인**: `itpage.kr` 연간 약 15,000-20,000원
- **호스팅**: Cloudflare Pages 무료
- **서브도메인**: 무제한 무료
- **총 비용**: 연간 약 15,000-20,000원 (월 약 1,250-1,667원)

## 8. 참고사항

- Cloudflare Pages는 무료 플랜으로도 충분합니다
- 자동 SSL 인증서 제공
- 글로벌 CDN 포함
- 사이트 수 제한 없음
- 월 요청 수 제한 없음 (무료 플랜)

## 9. 다음 단계

1. Cloudflare 계정 생성
2. 도메인 구매 및 Cloudflare에 추가
3. 첫 번째 사이트 배포 테스트
4. 나머지 사이트들 순차적으로 배포

