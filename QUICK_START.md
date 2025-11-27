# 빠른 시작 가이드

## 1단계: 프로젝트 설정

```bash
cd /Users/chagyuhwan/Desktop/static-site-generator
npm install
```

## 2단계: 첫 번째 사이트 생성

### 설정 파일 생성
```bash
cp config/site-template.json config/site-001.json
```

### 설정 파일 편집
`config/site-001.json` 파일을 열어서 사이트 정보를 수정하세요.

### 사이트 생성
```bash
npm run generate config/site-001.json sites/site-001
```

## 3단계: 결과 확인

`sites/site-001/index.html` 파일을 브라우저로 열어보세요.

## 4단계: 여러 사이트 생성

### 설정 파일 여러 개 생성
```bash
# 40개 설정 파일 생성 예시
for i in {1..40}; do
  cp config/site-template.json config/site-$(printf "%03d" $i).json
done
```

### 각 설정 파일 편집
각 JSON 파일을 열어서 사이트별 정보를 입력하세요.

### 모든 사이트 생성
```bash
npm run generate:all
```

## 5단계: 배포 (준비 중)

```bash
npm run deploy:all
```

## 💡 팁

- 설정 파일은 JSON 형식을 정확히 지켜야 합니다.
- 이미지 파일은 `sites/[site-id]/images/` 디렉토리에 넣으세요.
- 템플릿을 수정하면 모든 사이트에 반영됩니다.
