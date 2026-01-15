import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  UIMessage,
  validateUIMessages,
} from 'ai'
import { docsAgentTools, type DocsAgentToolName } from '@/ai-assistant/lib/ai-tools'
import { getDefaultSystemPrompt } from '@/ai-assistant/lib/ai-prompts'
import { siteConfig } from '@/lib/site-config'

export const maxDuration = 30

// Type for our messages with tools
type DocsAgentMessage = UIMessage<never, unknown, typeof docsAgentTools>

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Get optional config from request
    const { messages: rawMessages, config } = body
    
    // Validate messages with our tool schemas
    const messages = await validateUIMessages<DocsAgentMessage>({
      messages: rawMessages,
      tools: docsAgentTools,
    })
    
    // Build system prompt
    const systemPrompt = config?.systemPrompt || getDefaultSystemPrompt(
      siteConfig?.name || 'Documentation',
      siteConfig?.description || 'technical documentation'
    )
    
    // Stream the response
    const result = streamText({
      model: config?.model || 'openai/gpt-4o-mini',
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      tools: docsAgentTools,
      // Stop after 5 steps to prevent infinite loops
      stopWhen: stepCountIs(5),
    })
    
    return result.toUIMessageStreamResponse({
      onFinish: (options) => {
        // Optional: Log completion for analytics
        if (process.env.NODE_ENV === 'development') {
          console.log('[AI Assistant] Response completed', {
            steps: options.steps,
            usage: options.usage,
          })
        }
      },
    })
  } catch (error) {
    console.error('[AI Assistant] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
