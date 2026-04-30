'use client'

import { useState } from 'react'
import DecisionForm from '@/components/DecisionForm'
import LoadingAnimation from '@/components/LoadingAnimation'
import ResultCard from '@/components/ResultCard'
import type { DecisionResult } from '@/lib/psychology-engine'

type AppState = 'input' | 'loading' | 'result'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('input')
  const [result, setResult] = useState<DecisionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (dilemma: string) => {
    setAppState('loading')
    setError(null)

    try {
      const res = await fetch('/api/analyze-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dilemma }),
      })

      if (!res.ok) throw new Error('분석 실패')

      const data = await res.json()
      setResult(data)
      setAppState('result')
    } catch {
      setError('결정 생성 중 오류가 발생했습니다. 다시 시도해주세요.')
      setAppState('input')
    }
  }

  const handleReset = () => {
    setResult(null)
    setAppState('input')
  }

  return (
    <>
      {appState === 'input' && <DecisionForm onSubmit={handleSubmit} error={error} />}
      {appState === 'loading' && <LoadingAnimation />}
      {appState === 'result' && result && <ResultCard result={result} onReset={handleReset} />}
    </>
  )
}
