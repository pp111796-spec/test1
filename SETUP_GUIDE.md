# 🚀 프로젝트 시작 가이드

## ✅ 설정 전 확인 사항

Node.js 설치 후 PowerShell을 **재시작**해야 합니다. 

### 1️⃣ 터미널 재시작 후 버전 확인

새 PowerShell 창에서:
```bash
node --version
npm --version
```

## 🛠️ 프로젝트 실행 방법

### 방법 1: VS Code 내장 터미널 (권장)

1. **VS Code에서 이 프로젝트 폴더 열기**
2. **Ctrl + Shift + ` 로 터미널 열기**
3. **Ctrl + Shift + B로 빌드 작업 실행** (의존성 설치)
4. **다음 명령어 실행:**
   ```bash
   npm run dev
   ```
5. **브라우저에서 `http://localhost:3000` 방문**

### 방법 2: 커맨드 라인에서 직접 실행

```bash
# 프로젝트 폴더로 이동
cd "c:\Users\user\OneDrive - 건양대학교\바탕 화면\바이브 코딩"

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📁 프로젝트 구조

```
바이브 코딩/
├── src/
│   ├── app/               # Next.js 앱 라우터
│   │   ├── page.tsx       # 메인 페이지
│   │   ├── layout.tsx     # 루트 레이아웃
│   │   ├── globals.css    # 전역 스타일
│   │   └── api/           # API 라우트
│   ├── components/        # React 컴포넌트
│   │   ├── DecisionForm.tsx
│   │   ├── ResultCard.tsx
│   │   └── LoadingAnimation.tsx
│   └── lib/               # 유틸리티 함수
│       └── psychology-engine.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .eslintrc.json
└── README.md
```

## 🎯 주요 기능 테스트

### 1. 기본 고민 입력
```
직장을 그만두고 창업할지, 계속 회사에서 일할지 고민이에요
```

### 2. 심리학 개념 확인
결과 카드에서 심리학 개념을 클릭하면 설명이 나타납니다.

### 3. 여러 고민 입력
"새로운 고민 입력하기" 버튼을 클릭하여 다른 고민을 입력할 수 있습니다.

## 🐛 트러블슈팅

### 문제: `npm: 명령어를 찾을 수 없음`
**해결책:**
1. PowerShell 재시작
2. Node.js 재설치
   ```bash
   winget uninstall OpenJS.NodeJS
   winget install OpenJS.NodeJS
   ```

### 문제: `Port 3000이 이미 사용 중입니다`
**해결책:**
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### 문제: 의존성 설치 실패
**해결책:**
```bash
# 캐시 제거 후 재시도
npm cache clean --force
npm install
```

## 📦 설치된 주요 패키지

- **React 18**: UI 라이브러리
- **Next.js 15**: 풀스택 React 프레임워크
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 CSS
- **Axios**: HTTP 클라이언트

## 🎨 개발 팁

### CSS 추가
`src/globals.css`에 추가합니다.

### 새 컴포넌트 생성
`src/components/` 폴더에 `.tsx` 파일 생성 후 메인 페이지에서 import합니다.

### API 수정
`src/app/api/analyze-decision/route.ts`를 수정합니다.

### 심리학 엔진 커스터마이징
`src/lib/psychology-engine.ts`에서 분석 로직을 수정합니다.

## 📚 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

## 💡 다음 개선 사항

- [ ] OpenAI API 통합 (더 정교한 분석)
- [ ] 사용자 히스토리 저장 (데이터베이스)
- [ ] 모바일 반응형 최적화
- [ ] 다크 모드 지원
- [ ] 결과 공유 기능
- [ ] 다국어 지원

---

**질문이 있으시면 README.md를 확인하세요!** 🚀
