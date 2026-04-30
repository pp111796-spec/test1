import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '../globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DECIDE — 결정해줘',
  description: '결정을 어려워하는 당신을 위한 심리학 기반 AI 결정 서비스',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>
        {children}
      </body>
    </html>
  )
}
