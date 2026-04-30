'use client'

import { useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#@$%'

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function safeChar(c: string): string {
  if (c === '&') return '&amp;'
  if (c === '<') return '&lt;'
  if (c === '>') return '&gt;'
  return c
}

interface TextScrambleProps {
  text: string
  onComplete?: () => void
  className?: string
  style?: React.CSSProperties
}

export default function TextScramble({ text, onComplete, className, style }: TextScrambleProps) {
  const [html, setHtml] = useState('')
  const frameRef = useRef(0)
  const rafRef = useRef<number>()
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!text) return

    interface QueueItem {
      to: string
      start: number
      end: number
      char?: string
    }

    const queue: QueueItem[] = []

    for (let i = 0; i < text.length; i++) {
      const start = Math.floor(Math.random() * 18)
      const end = start + Math.floor(Math.random() * 22) + 12
      queue.push({ to: text[i], start, end })
    }

    frameRef.current = 0

    const update = () => {
      let output = ''
      let complete = 0

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i]

        if (frameRef.current >= item.end) {
          complete++
          output += safeChar(item.to)
        } else if (frameRef.current >= item.start) {
          const c = !item.char || Math.random() < 0.28 ? randomChar() : item.char
          queue[i].char = c
          output += `<span style="color:#FF2D55;opacity:0.8">${c}</span>`
        }
      }

      setHtml(output)

      if (complete < queue.length) {
        frameRef.current++
        rafRef.current = requestAnimationFrame(update)
      } else {
        onCompleteRef.current?.()
      }
    }

    rafRef.current = requestAnimationFrame(update)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text])

  return (
    <span
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
