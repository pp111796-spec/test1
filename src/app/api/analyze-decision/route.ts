import { NextRequest, NextResponse } from 'next/server'
import { analyzeDecisionWithAI } from '@/lib/psychology-engine'

export async function POST(request: NextRequest) {
  try {
    const { dilemma } = await request.json()

    if (!dilemma || dilemma.trim().length === 0) {
      return NextResponse.json(
        { error: '고민을 입력해주세요' },
        { status: 400 }
      )
    }

    const result = await analyzeDecisionWithAI(dilemma)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Decision analysis error:', error)
    return NextResponse.json(
      { error: '분석 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
