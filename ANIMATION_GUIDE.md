# 애니메이션 효과 가이드

프로젝트에 추가된 애니메이션 효과들을 설명하고 사용 방법을 안내합니다.

## 🎨 추가된 애니메이션 효과

### 1. 자동 적용 애니메이션 (바로 사용 가능)

다음 요소들은 자동으로 애니메이션이 적용됩니다:

- **히어로 이미지**: 페이드인 효과
- **섹션 컨텐츠**: 스크롤 시 페이드인 업 효과
- **서비스 카드**: 호버 시 확대 및 그림자 효과
- **링크 카드**: 호버 시 확대 및 그림자 효과
- **버튼**: 호버 시 리플 효과 및 상승 애니메이션
- **헤더**: 스크롤 시 배경색 변화
- **로고**: 호버 시 확대 효과
- **메뉴 아이템**: 호버 시 밑줄 애니메이션

### 2. 수동 적용 애니메이션 클래스

HTML 요소에 클래스를 추가하여 원하는 애니메이션을 적용할 수 있습니다:

#### 기본 애니메이션 클래스

```html
<!-- 페이드인 -->
<div class="fade-in">내용</div>

<!-- 아래에서 위로 페이드인 -->
<div class="fade-in-up">내용</div>

<!-- 위에서 아래로 페이드인 -->
<div class="fade-in-down">내용</div>

<!-- 왼쪽에서 슬라이드 -->
<div class="slide-in-left">내용</div>

<!-- 오른쪽에서 슬라이드 -->
<div class="slide-in-right">내용</div>

<!-- 확대 효과 -->
<div class="scale-in">내용</div>
```

#### 스크롤 애니메이션

스크롤 시 요소가 화면에 나타날 때 애니메이션이 실행됩니다:

```html
<div class="animate-on-scroll">스크롤 시 나타나는 내용</div>
```

## 📝 사용 예시

### 템플릿 파일에 애니메이션 적용하기

`template/index.hbs` 파일을 수정하여 원하는 위치에 애니메이션 클래스를 추가하세요:

```handlebars
<!-- 예시: 섹션에 스크롤 애니메이션 추가 -->
<section class="service-section">
    <div class="container animate-on-scroll">
        <h2 class="fade-in-up">서비스 안내</h2>
        <div class="service-grid">
            <div class="service-card scale-in">
                <!-- 카드 내용 -->
            </div>
        </div>
    </div>
</section>
```

## 🎯 주요 애니메이션 효과 상세 설명

### 1. 버튼 애니메이션 (`.btn`)

- **호버 시**: 
  - 리플 효과 (원형 확장)
  - 위로 살짝 이동
  - 그림자 효과

### 2. 카드 애니메이션 (`.service-card`, `.link-card`)

- **호버 시**:
  - 위로 5px 이동
  - 1.02배 확대
  - 그림자 강화

### 3. 헤더 애니메이션 (`header`)

- **스크롤 시**:
  - 100px 이상 스크롤하면 배경색이 반투명으로 변경
  - 그림자 효과 강화
  - 클래스: `.scrolled` 자동 추가

### 4. 메뉴 아이템 애니메이션 (`.main-nav ul li a`)

- **호버 시**:
  - 밑줄이 가운데에서 양쪽으로 확장
  - 활성 메뉴에도 밑줄 표시

### 5. 히어로 이미지 애니메이션 (`.hero-image-section`)

- **페이지 로드 시**: 페이드인 효과
- **호버 시**: 이미지 확대 (1.05배)

## ⚙️ 커스터마이징

### 애니메이션 속도 변경

`template/css/style.css` 파일에서 애니메이션 속도를 조정할 수 있습니다:

```css
/* 예시: 애니메이션 속도를 더 빠르게 */
.fade-in-up {
    animation: fadeInUp 0.5s ease-out; /* 0.8s → 0.5s */
}
```

### 새로운 애니메이션 추가

`template/css/style.css` 파일에 새로운 키프레임 애니메이션을 추가할 수 있습니다:

```css
@keyframes myAnimation {
    from {
        opacity: 0;
        transform: rotate(0deg);
    }
    to {
        opacity: 1;
        transform: rotate(360deg);
    }
}

.my-custom-animation {
    animation: myAnimation 1s ease-out;
}
```

## 🔧 고급 설정

### Intersection Observer 옵션 변경

`template/js/main.js` 파일에서 스크롤 애니메이션의 감지 옵션을 변경할 수 있습니다:

```javascript
const observerOptions = {
    threshold: 0.1,        // 요소가 10% 보일 때 트리거
    rootMargin: '0px 0px -50px 0px'  // 감지 영역 조정
};
```

- `threshold`: 요소가 얼마나 보여야 트리거할지 (0.0 ~ 1.0)
- `rootMargin`: 감지 영역을 조정 (CSS margin 형식)

## 📱 반응형 고려사항

모든 애니메이션은 모바일에서도 정상 작동합니다. 다만, 성능을 위해 모바일에서는 일부 애니메이션을 비활성화할 수 있습니다:

```css
@media (max-width: 768px) {
    .service-card:hover {
        transform: none; /* 모바일에서 호버 효과 제거 */
    }
}
```

## 🎨 애니메이션 효과 목록

| 클래스 이름 | 효과 | 지속 시간 |
|------------|------|----------|
| `.fade-in` | 페이드인 | 0.8s |
| `.fade-in-up` | 아래에서 위로 페이드인 | 0.8s |
| `.fade-in-down` | 위에서 아래로 페이드인 | 0.8s |
| `.slide-in-left` | 왼쪽에서 슬라이드 | 0.8s |
| `.slide-in-right` | 오른쪽에서 슬라이드 | 0.8s |
| `.scale-in` | 확대 효과 | 0.6s |
| `.animate-on-scroll` | 스크롤 시 나타남 | 0.6s |

## 🚀 테스트 방법

1. 사이트 생성:
   ```bash
   npm run generate config/site-001.json sites/site-001
   ```

2. 로컬 서버 실행:
   ```bash
   npm run serve
   ```

3. 브라우저에서 확인:
   - 페이지 로드 시 애니메이션 확인
   - 스크롤 시 요소들이 나타나는지 확인
   - 호버 효과 확인
   - 버튼 클릭 시 리플 효과 확인

## 💡 팁

1. **과도한 애니메이션 피하기**: 모든 요소에 애니메이션을 적용하면 오히려 산만해 보일 수 있습니다.

2. **성능 고려**: 복잡한 애니메이션은 성능에 영향을 줄 수 있으므로 간단하게 유지하세요.

3. **접근성**: `prefers-reduced-motion` 미디어 쿼리를 사용하여 애니메이션을 선호하지 않는 사용자를 고려할 수 있습니다:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

## 🐛 문제 해결

### 애니메이션이 작동하지 않을 때

1. 브라우저 개발자 도구에서 콘솔 에러 확인
2. CSS 파일이 올바르게 로드되었는지 확인
3. JavaScript 파일이 올바르게 로드되었는지 확인
4. 브라우저 캐시 클리어 (`Ctrl+Shift+R` 또는 `Cmd+Shift+R`)

### 애니메이션이 너무 빠르거나 느릴 때

CSS 파일에서 `animation` 속성의 시간 값을 조정하세요.

## 📚 참고 자료

- [CSS Animations MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

