# Cloudflare Pages 설정 체크리스트

## 배포 후 이전 버전이 보이는 경우 확인사항

### 1. Build Output Directory 확인

Cloudflare Pages 프로젝트 설정에서:
- **Build output directory**: `sites/site-001` (반드시 확인!)
- **Build command**: (비워두기 - 정적 사이트이므로 빌드 불필요)
- **Root directory**: (비워두기 또는 `/`)

### 2. 올바른 설정 예시

```
Project name: site-001
Production branch: main
Build command: (비워두기)
Build output directory: sites/site-001
Root directory: (비워두기)
```

### 3. 재배포 방법

#### 방법 1: 수동 재배포
1. Cloudflare Pages 대시보드 접속
2. 프로젝트 선택 → Deployments
3. 최신 배포의 "..." 메뉴 → Retry deployment

#### 방법 2: GitHub 푸시로 트리거
```bash
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

#### 방법 3: 설정 변경 후 재배포
1. 프로젝트 설정에서 Build output directory 확인
2. `sites/site-001`로 설정되어 있는지 확인
3. Save 후 자동 재배포

### 4. 캐시 문제 해결

브라우저 캐시를 지우고 확인:
- Windows: Ctrl + Shift + Delete
- Mac: Cmd + Shift + Delete
- 또는 시크릿 모드에서 확인

### 5. 확인해야 할 파일들

배포된 사이트에서 확인:
- `/images/1.jpeg` (업체소개 이미지)
- `/images/2.jpeg` (사찰안내 이미지)
- `/images/3.jpeg` (둘러보기 이미지)
- `/images/4.jpeg` (오시는길 이미지)
- 버튼 텍스트: "더 알아보기 +"
- 지도 섹션 제목: "연락처"

### 6. 문제 해결 순서

1. ✅ Build output directory가 `sites/site-001`인지 확인
2. ✅ GitHub에 최신 코드가 푸시되어 있는지 확인
3. ✅ Cloudflare Pages에서 재배포 실행
4. ✅ 브라우저 캐시 삭제 후 확인
5. ✅ 배포 로그 확인 (에러가 있는지)

### 7. 배포 로그 확인

Cloudflare Pages → 프로젝트 → Deployments → 배포 클릭 → Build logs 확인

빌드 로그에서:
- 어떤 파일들이 배포되었는지 확인
- 에러 메시지가 있는지 확인
- Build output directory가 올바르게 인식되었는지 확인

