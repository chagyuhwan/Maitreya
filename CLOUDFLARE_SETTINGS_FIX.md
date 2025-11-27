# Cloudflare Pages 설정 수정 가이드

## 현재 설정 확인

이미지에서 확인한 설정:
- Build output directory: `sites/site-001` ✅ (앞의 `/`는 UI 표시일 수 있음)
- Root directory: `/` ❌ (이게 문제!)

## 문제점

**Root directory가 `/`로 설정되어 있으면:**
- 저장소 루트를 의미하므로 올바릅니다
- 하지만 빈 값이나 `.`로 설정하는 것이 더 명확합니다

## 수정 방법

### Root directory 수정:

1. **Root directory (advanced)** 섹션에서
2. **Path** 필드를 확인
3. 현재: `/` 또는 비어있음
4. 변경: (비워두기) 또는 `.` 입력

### 최종 올바른 설정:

```
Framework preset: None
Build command: (비워두기)
Build output directory: sites/site-001  (앞의 /는 UI 표시)
Root directory: (비워두기) 또는 .  ← 이게 핵심!
```

## 다른 가능한 원인

만약 Root directory를 수정해도 문제가 있다면:

### 1. 배포 로그 확인
- Deployments → 최신 배포 → Build logs
- 어떤 파일들이 배포되었는지 확인
- `index.html`이 루트에 있는지 확인

### 2. 배포된 파일 구조 확인
배포된 사이트에서 직접 확인:
- `https://site-001.itpage.kr/index.html` (접근 가능해야 함)
- `https://site-001.itpage.kr/css/style.css` (접근 가능해야 함)
- `https://site-001.itpage.kr/images/1.jpeg` (접근 가능해야 함)

### 3. 캐시 문제
- Cloudflare Pages 캐시 삭제
- 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
- 시크릿 모드에서 확인

### 4. GitHub 저장소 구조 확인
GitHub에서 확인:
- `sites/site-001/index.html` 파일이 있는지
- `sites/site-001/css/style.css` 파일이 있는지
- 최신 커밋이 푸시되었는지

## 디버깅 방법

### 배포 로그에서 확인할 것:
1. Build output directory가 올바르게 인식되었는지
2. 어떤 파일들이 배포되었는지
3. 에러 메시지가 있는지

### 배포된 사이트에서 확인할 것:
1. 개발자 도구(F12) → Network 탭
2. 페이지 로드 시 어떤 파일들이 요청되는지
3. 404 에러가 있는지
4. CSS/이미지 파일이 로드되는지

## 빠른 해결책

1. **Root directory를 비우거나 `.`로 설정**
2. **Save 클릭**
3. **자동 재배포 대기**
4. **배포 완료 후 확인**
