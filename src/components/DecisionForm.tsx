'use client'

import { useState, useRef, useEffect } from 'react'

interface DecisionFormProps {
  onSubmit: (dilemma: string) => void
  error: string | null
}

const EXAMPLES = [
  '오늘 술자리 갈까 말까',
  '지금 이 회사 퇴직할지 말지',
  '남자친구한테 먼저 연락할지 말지',
  '유학 갈지 국내에 남을지',
]

export default function DecisionForm({ onSubmit, error }: DecisionFormProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    if (text.trim()) onSubmit(text.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit()
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="logo-text">
            DE<span style={{ color: 'var(--primary)' }}>CIDE</span>
          </h1>
          <p className="tagline">고민은 그만. 결정은 AI에게.</p>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={300}
          placeholder={'지금 고민이 뭐야? 짧게 써봐.\n예) 오늘 술자리 갈지 말지, 퇴직할지 말지...'}
          className="decision-textarea"
        />

        <div
          className="flex justify-between items-center mt-2 mb-4"
          style={{ color: 'var(--muted)', fontSize: '12px' }}
        >
          <span>Ctrl+Enter로도 제출</span>
          <span>{text.length}/300</span>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!text.trim()} className="decide-btn">
          결정해줘! →
        </button>

        {/* Error */}
        {error && (
          <p
            style={{
              marginTop: '16px',
              color: 'var(--primary)',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            {error}
          </p>
        )}

        {/* Examples */}
        <div className="mt-10">
          <p
            style={{
              color: 'var(--muted)',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            예시 고민
          </p>
          <div className="grid grid-cols-2 gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setText(ex)}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--muted)',
                  padding: '10px 14px',
                  fontSize: '13px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                  lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#555'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
