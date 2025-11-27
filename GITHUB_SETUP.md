# GitHub 레포지토리 설정 가이드

## 1. Git 저장소 초기화 및 푸시

```bash
# 프로젝트 디렉토리로 이동
cd /Users/chagyuhwan/Desktop/mirek

# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 미륵복전미륵불 정적 웹사이트 생성기"

# GitHub 원격 저장소 추가
git remote add origin https://github.com/chagyuhwan/Maitreya.git

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 2. Cloudflare Pages와 GitHub 연동

### 방법 1: Cloudflare 대시보드에서 설정 (권장)

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com 접속
   - Pages → Create a project 클릭

2. **GitHub 저장소 연결**
   - "Connect to Git" 선택
   - GitHub 계정 인증
   - `chagyuhwan/Maitreya` 저장소 선택

3. **프로젝트 설정**
   - Project name: `site-001` (첫 번째 사이트)
   - Production branch: `main`
   - Build command: (비워두기 - 정적 사이트)
   - Build output directory: `sites/site-001`

4. **배포**
   - "Save and Deploy" 클릭
   - 자동으로 배포 시작

5. **서브도메인 설정**
   - 배포 완료 후 → Custom domains → Set up a custom domain
   - `site-001.itpage.kr` 입력
   - Cloudflare가 자동으로 DNS 레코드 생성

### 방법 2: 각 사이트별로 별도 프로젝트 생성

각 사이트마다 별도의 Cloudflare Pages 프로젝트를 생성합니다:

1. `site-001` → Build output directory: `sites/site-001`
2. `site-002` → Build output directory: `sites/site-002`
3. ... (각 사이트마다 반복)

각 프로젝트에 해당하는 서브도메인을 연결합니다:
- `site-001.itpage.kr`
- `site-002.itpage.kr`
- ...

## 3. 자동 배포 설정

GitHub에 푸시하면 자동으로 배포됩니다:

```bash
# 변경사항 커밋 및 푸시
git add .
git commit -m "사이트 업데이트"
git push origin main
```

Cloudflare Pages가 자동으로 변경사항을 감지하고 재배포합니다.

## 4. 여러 사이트 동시 배포

각 사이트를 별도 프로젝트로 생성하면:
- GitHub에 한 번 푸시하면
- 각 Cloudflare Pages 프로젝트가 자동으로 감지하여
- 해당 사이트만 재배포됩니다

## 5. 참고사항

- GitHub 저장소는 공개 또는 비공개 모두 가능합니다
- Cloudflare Pages는 무료 플랜으로 충분합니다
- 서브도메인은 무제한으로 생성 가능합니다
- 각 사이트는 독립적으로 배포됩니다

