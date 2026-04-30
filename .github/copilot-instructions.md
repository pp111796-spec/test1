# 결정꾼 (Decision Maker) - Copilot 커스터마이징 가이드

## 프로젝트 개요
결정을 어려워하는 사람들을 위한 심리학 기반 의사결정 보조 웹앱입니다.

**핵심 기능:**
- 사용자의 고민을 입력받아 심리학적으로 분석
- 최적의 선택지 제시 및 근거 설명
- 관련 심리학 개념 제공
- 빠르고 직관적인 UI/UX

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # 메인 페이지 (입력/결과)
│   ├── layout.tsx               # 루트 레이아웃
│   ├── globals.css              # 전역 스타일
│   └── api/
│       └── analyze-decision/
│           └── route.ts         # 의사결정 분석 API
├── components/                  # React 컴포넌트
│   ├── DecisionForm.tsx         # 고민 입력 폼
│   ├── ResultCard.tsx           # 결과 표시 카드
│   └── LoadingAnimation.tsx     # 로딩 애니메이션
└── lib/
    └── psychology-engine.ts     # 심리학 분석 엔진 (핵심 로직)
```

## 핵심 코드 위치

### 1. 의사결정 분석 엔진
**파일:** `src/lib/psychology-engine.ts`
**역할:** 
- 고민의 유형 분류
- 심리학 개념 적용
- 최적 선택지 제시
- 신뢰도 계산

### 2. API 엔드포인트
**파일:** `src/app/api/analyze-decision/route.ts`
**역할:** POST 요청을 받아 분석 엔진 호출

### 3. 프론트엔드
**메인 컴포넌트:** `src/app/page.tsx`
**역할:** 상태 관리, 컴포넌트 조율

## 개발 흐름

1. **사용자 입력** → `DecisionForm.tsx`
2. **API 호출** → `route.ts` → `psychology-engine.ts`
3. **분석 수행** → 고민 유형 감지, 심리학 개념 적용
4. **결과 반환** → `ResultCard.tsx`에서 표시

## 주요 기능 구현

### 의사결정 유형 분류
`detectDecisionType()` 함수로 자동 분류:
- Career (직업/경력)
- Relationship (관계)
- Education (교육)
- Financial (재정)
- Life-change (인생의 큰 변화)
- Other (기타)

### 심리학 개념
포함된 개념들:
- 만족 vs 최대화 이론
- 손실회피
- 기회비용
- 확인 편향
- 후회 최소화
- 예감 활용

## 커스터마이징 가이드

### 심리학 개념 추가
`src/lib/psychology-engine.ts`의 `psychologyFrameworks` 객체에 추가:

```typescript
const psychologyFrameworks = {
  decision_making: [
    {
      name: '새로운 개념',
      explanation: '설명...'
    }
  ]
}
```

### 고민 유형별 조언 추가
`adviceTemplates` 객체에 새 유형 추가:

```typescript
custom_type: [
  {
    decision: '추천 선택지',
    reasoning: '근거...'
  }
]
```

### 색상 테마 변경
`src/globals.css`와 `tailwind.config.ts`에서 색상 조정

## 기술 스택

- **프레임워크:** Next.js 15, React 18
- **언어:** TypeScript
- **스타일:** Tailwind CSS
- **상태관리:** React Hooks
- **API:** Next.js API Routes

## 실행 명령어

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드
npm start            # 프로덕션 서버
npm run lint         # ESLint 실행
```

## 테스트할 고민 예시

1. 직업/경력 결정
2. 관계 문제 해결
3. 교육/진로 선택
4. 재정 결정
5. 인생의 큰 변화

## 주의사항

1. **API 응답 형식 유지**
   - `decision`, `reasoning`, `psychologyConcepts`, `confidence`, `alternatives` 필수

2. **TypeScript 타입 정의**
   - 새 기능 추가시 적절한 타입 정의 필요

3. **에러 처리**
   - 모든 async 함수에 try-catch 구현

4. **성능**
   - 분석 시간 2-3초 이내 유지

## 향후 확장 가능성

- OpenAI API 통합
- 사용자 데이터 저장 (DB)
- 고급 심리학 테스트
- 사용자 피드백 시스템
- 모바일 앱 버전

---

**개발 팁:** `SETUP_GUIDE.md`에서 상세한 설치 및 실행 방법을 참고하세요.
