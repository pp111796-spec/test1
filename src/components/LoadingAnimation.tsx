'use client'

import { useState, useEffect } from 'react'

const STEPS = [
  '상황 파악 중...',
  '심리학적 패턴 분석 중...',
  '편향 검토 중...',
  '최적 결정 도출 중...',
  '결과 정리 중...',
]

export default function LoadingAnimation() {
  const [stepIndex, setStepIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setStepIndex((i) => (i + 1) % STEPS.length)
        setVisible(true)
      }, 250)
    }, 950)

    return () => clearInterval(interval)
  }, [])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{ background: 'var(--bg)' }}
    >
      <div className="spinner" />

      <div className="text-center">
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          심리학적 분석
        </p>
        <p
          style={{
            color: 'var(--text)',
            fontSize: '20px',
            fontWeight: 700,
            minHeight: '30px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          {STEPS[stepIndex]}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'block',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  )
}
