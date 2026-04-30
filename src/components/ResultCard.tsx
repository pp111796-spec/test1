'use client'

import { useState, useEffect } from 'react'
import TextScramble from './TextScramble'
import type { DecisionResult } from '@/lib/psychology-engine'

interface ResultCardProps {
  result: DecisionResult
  onReset: () => void
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 550),   // scramble 시작
      setTimeout(() => setPhase(2), 2300),  // reason 카드
      setTimeout(() => setPhase(3), 2800),  // psychology 카드
      setTimeout(() => setPhase(4), 3500),  // retry 버튼
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start px-6 py-16"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-xl">

        {/* Badge */}
        <p className="result-badge">⚡ 결정 완료</p>

        {/* Emoji */}
        <span className="verdict-emoji">{result.emoji}</span>

        {/* Decision text — scramble reveal */}
        <div className="verdict-text">
          {phase >= 1 && <TextScramble text={result.decision} />}
        </div>

        {/* Divider */}
        {phase >= 2 && <div className="divider" />}

        {/* Reason */}
        {phase >= 2 && (
          <div className="result-card slide-up">
            <div className="card-label">왜 이 결정인가</div>
            <div className="card-text">{result.reason}</div>
          </div>
        )}

        {/* Psychology */}
        {phase >= 3 && (
          <div className="result-card psych-card slide-up">
            <div className="card-label">적용된 심리학 개념</div>
            <div className="psych-concept">{result.psychology_concept}</div>
            <div className="psych-explain">{result.psychology_explain}</div>
          </div>
        )}

        {/* Retry */}
        {phase >= 4 && (
          <button onClick={onReset} className="retry-btn fade-in">
            ↩ 다시 결정하기
          </button>
        )}
      </div>
    </main>
  )
}
