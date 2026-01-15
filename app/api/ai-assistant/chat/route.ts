import { streamText } from 'ai'
import type { Message } from 'ai'
import { docsAgentTools } from '@/ai-assistant/lib/ai-tools'
import { getDefaultSystemPrompt } from '@/ai-assistant/lib/ai-prompts'
import { siteConfig } from '@/lib/site-config'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Get optional config from request
    const { messages, config } = body as { messages: Message[], config?: { systemPrompt?: string; model?: string } }
    
    // Build system prompt
    const systemPrompt = config?.systemPrompt || getDefaultSystemPrompt(
      siteConfig?.name || 'Documentation',
      siteConfig?.description || 'technical documentation'
    )
    
    // Stream the response
    const result = streamText({
      model: config?.model || 'openai/gpt-4o-mini',
      system: systemPrompt,
      messages,
      tools: docsAgentTools,
      maxSteps: 5, // Stop after 5 steps to prevent infinite loops
    })
    
    return result.toDataStreamResponse()
  } catch (error) {
    console.error('[AI Assistant] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
