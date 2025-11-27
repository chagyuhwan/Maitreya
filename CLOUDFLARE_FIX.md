# Cloudflare Pages 배포 문제 해결

## 문제: 배포된 사이트와 로컬 서버 화면이 다름

### 원인 분석

로컬에서는 `npm run serve`가 `sites/site-001` 폴더를 루트로 서빙하지만,
Cloudflare Pages 배포 시 경로 설정이 다를 수 있습니다.

### 해결 방법

#### 1. Cloudflare Pages 설정 확인 (가장 중요!)

**Settings → Builds & deployments**에서 확인:

```
Project name: site-001
Production branch: main
Framework preset: None (또는 Plain HTML)
Build command: (비워두기)
Build output directory: sites/site-001  ← 이게 핵심!
Root directory: (비워두기)
```

**⚠️ 중요**: Build output directory가 `sites/site-001`로 설정되어 있어야 합니다!

#### 2. 배포 구조 확인

Cloudflare Pages는 Build output directory의 내용을 루트(`/`)로 배포합니다.

**올바른 구조:**
```
GitHub 저장소 루트/
├── sites/
│   └── site-001/          ← 이 폴더 내용이 배포됨
│       ├── index.html
│       ├── css/
│       ├── images/
│       └── ...
```

**배포 후 구조:**
```
배포된 사이트 루트 (/)
├── index.html
├── css/
├── images/
└── ...
```

#### 3. 파일 경로 확인

현재 파일들이 절대 경로(`/css/style.css`, `/images/1.jpeg`)를 사용하고 있으므로,
Build output directory가 올바르게 설정되면 정상 작동해야 합니다.

#### 4. 재배포 방법

1. **설정 수정 후 재배포**
   - Build output directory를 `sites/site-001`로 설정
   - Save 클릭 → 자동 재배포

2. **수동 재배포**
   - Deployments → 최신 배포의 "..." → Retry deployment

3. **GitHub 푸시로 트리거**
   ```bash
   git commit --allow-empty -m "Fix deployment"
   git push origin main
   ```

#### 5. 배포 로그 확인

Cloudflare Pages → 프로젝트 → Deployments → 배포 클릭 → Build logs

확인 사항:
- ✅ Build output directory가 올바르게 인식되었는지
- ✅ `index.html` 파일이 배포되었는지
- ✅ `css/style.css` 파일이 배포되었는지
- ✅ `images/` 폴더가 배포되었는지
- ❌ 에러 메시지가 있는지

#### 6. 브라우저에서 확인

배포된 사이트에서 개발자 도구(F12) → Network 탭:
- CSS 파일이 로드되는지 확인
- 이미지 파일이 로드되는지 확인
- 404 에러가 있는지 확인

#### 7. 테스트 방법

배포된 사이트 URL에서 직접 확인:
- `https://site-001.itpage.kr/css/style.css` (접근 가능해야 함)
- `https://site-001.itpage.kr/images/1.jpeg` (접근 가능해야 함)

### 빠른 체크리스트

- [ ] Build output directory: `sites/site-001`
- [ ] Build command: (비워두기)
- [ ] Root directory: (비워두기)
- [ ] 배포 로그에 에러 없음
- [ ] CSS 파일 로드 확인
- [ ] 이미지 파일 로드 확인

### 추가 팁

만약 여전히 문제가 있다면:
1. Cloudflare Pages 캐시 삭제
2. 브라우저 캐시 삭제
3. 시크릿 모드에서 확인
4. 다른 브라우저에서 확인

