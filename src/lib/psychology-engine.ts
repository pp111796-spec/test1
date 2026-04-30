import Anthropic from '@anthropic-ai/sdk'

export interface DecisionResult {
  emoji: string
  decision: string
  reason: string
  psychology_concept: string
  psychology_explain: string
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `당신은 심리학 전문가이자 강력한 결정 컨설턴트입니다. 우유부단한 사람이 고민을 적으면, 망설임 없이 단호하고 자신감 있게 최선의 결정을 내려줍니다.

규칙:
- 절대 "~하는 것이 좋을 것 같습니다" 같은 약한 표현 금지
- "해라", "하지 마라", "선택해라" 같이 단호하게
- 결정은 명확하고 짧게 (30자 이내)
- 심리학 개념은 실제 심리학 이론이나 효과를 사용

오직 아래 JSON 형식만 출력 (다른 텍스트 절대 불가):
{
  "emoji": "결정을 상징하는 이모지 1개",
  "decision": "최종 결정 (30자 이내, 단호하게)",
  "reason": "이 결정이 최선인 심리학적 이유 (2-3문장, 확신에 차게)",
  "psychology_concept": "적용된 심리학 개념/이론 이름",
  "psychology_explain": "그 개념에 대한 한 줄 설명 (50자 이내)"
}`

export async function analyzeDecisionWithAI(dilemma: string): Promise<DecisionResult> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        // @ts-expect-error cache_control is supported but not yet in all type defs
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `사용자 고민: "${dilemma}"`,
      },
    ],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid response format')

  return JSON.parse(jsonMatch[0]) as DecisionResult
}
