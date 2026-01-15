'use client'

import { User, Bot, Search, Navigation, AlertCircle, Check, X, Loader2, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Message } from 'ai'
import type { DocSource } from '../types/ai-types'

interface AIChatMessagesProps {
  messages: Message[]
  sources: DocSource[]
  onConfirmation: (toolCallId: string, confirmed: boolean) => void
  isLoading?: boolean
}

export function AIChatMessages({ 
  messages, 
  sources, 
  onConfirmation, 
  isLoading 
}: AIChatMessagesProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          sources={sources}
          onConfirmation={onConfirmation}
        />
      ))}
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Thinking...
          </div>
        </div>
      )}
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  sources: DocSource[]
  onConfirmation: (toolCallId: string, confirmed: boolean) => void
}

function MessageBubble({ message, sources, onConfirmation }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
      )}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4 text-primary" />
        )}
      </div>
      
      <div className={cn(
        'flex flex-col gap-2 max-w-[85%]',
        isUser && 'items-end'
      )}>
        {/* Text content */}
        {message.content && (
          <div className={cn(
            'rounded-xl px-4 py-2.5 text-sm',
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted/50 text-foreground'
          )}>
            <MessageContent content={message.content} />
          </div>
        )}
        
        {/* Tool invocations */}
        {message.toolInvocations?.map((toolInvocation) => (
          <ToolInvocationPart
            key={toolInvocation.toolCallId}
            toolInvocation={toolInvocation}
            onConfirmation={onConfirmation}
          />
        ))}
      </div>
    </div>
  )
}

// Render markdown-like content
function MessageContent({ content }: { content: string }) {
  // Simple markdown rendering for common patterns
  const lines = content.split('\n')
  
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        // Code blocks
        if (line.startsWith('```')) {
          return null // Handle separately if needed
        }
        
        // Inline code
        const processedLine = line.replace(
          /`([^`]+)`/g,
          '<code class="rounded bg-black/10 px-1.5 py-0.5 text-xs font-mono">$1</code>'
        )
        
        // Bold
        const withBold = processedLine.replace(
          /\*\*([^*]+)\*\*/g,
          '<strong class="font-semibold">$1</strong>'
        )
        
        // Links
        const withLinks = withBold.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-primary underline underline-offset-2 hover:text-primary/80" target="_blank" rel="noopener">$1</a>'
        )
        
        if (!line.trim()) {
          return <br key={i} />
        }
        
        // List items
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={i} className="flex gap-2">
              <span className="text-muted-foreground">•</span>
              <span dangerouslySetInnerHTML={{ __html: withLinks.slice(2) }} />
            </div>
          )
        }
        
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: withLinks }} />
        )
      })}
    </div>
  )
}

interface ToolInvocationPartProps {
  toolInvocation: {
    toolCallId: string
    toolName: string
    args: unknown
    state: 'partial-call' | 'call' | 'result'
    result?: unknown
  }
  onConfirmation: (toolCallId: string, confirmed: boolean) => void
}

function ToolInvocationPart({ toolInvocation, onConfirmation }: ToolInvocationPartProps) {
  const { toolName, args, state, result, toolCallId } = toolInvocation
  const input = args as Record<string, unknown>
  const output = result as Record<string, unknown> | undefined
  
  switch (toolName) {
    case 'searchDocs':
      return <SearchToolPart state={state} input={input} output={output} />
    case 'suggestNavigation':
      return <NavigationToolPart state={state} output={output} />
    case 'askConfirmation':
      return (
        <ConfirmationToolPart
          state={state}
          input={input}
          output={output}
          toolCallId={toolCallId}
          onConfirmation={onConfirmation}
        />
      )
    case 'getPageContext':
      return <PageContextToolPart state={state} />
    default:
      return null
  }
}

// Search tool part
function SearchToolPart({ 
  state, 
  input, 
  output 
}: { 
  state: string
  input: Record<string, unknown>
  output?: Record<string, unknown>
}) {
  if (state === 'partial-call' || state === 'call') {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span>Searching for "{input?.query as string}"...</span>
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    )
  }
  
  if (state === 'result' && output) {
    const results = (output.results || []) as Array<{ path: string; title: string; description?: string }>
    const count = (output.totalCount || results.length) as number
    
    if (count === 0) {
      return (
        <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span>No results found for "{input?.query as string}"</span>
        </div>
      )
    }
    
    return (
      <div className="rounded-lg border border-border/50 bg-muted/20 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2 text-xs text-muted-foreground">
          <Search className="h-3 w-3" />
          <span>Found {count} result{count !== 1 ? 's' : ''}</span>
        </div>
        <div className="divide-y divide-border/30">
          {results.slice(0, 3).map((result, i: number) => (
            <a
              key={i}
              href={result.path}
              className="flex items-start gap-2 px-3 py-2 hover:bg-muted/30 transition-colors"
            >
              <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{result.title}</div>
                {result.description && (
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {result.description}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }
  
  return null
}

// Navigation tool part
function NavigationToolPart({ 
  state, 
  output 
}: { 
  state: string
  output?: Record<string, unknown>
}) {
  if (state === 'partial-call' || state === 'call') {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
        <Navigation className="h-4 w-4" />
        <span>Finding related pages...</span>
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    )
  }
  
  if (state === 'result' && output) {
    const suggestions = (output.suggestions || []) as Array<{ path: string; title: string; reason: string }>
    
    if (suggestions.length === 0) {
      return null
    }
    
    return (
      <div className="rounded-lg border border-border/50 bg-muted/20 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2 text-xs text-muted-foreground">
          <Navigation className="h-3 w-3" />
          <span>Related pages</span>
        </div>
        <div className="divide-y divide-border/30">
          {suggestions.map((suggestion, i: number) => (
            <a
              key={i}
              href={suggestion.path}
              className="flex items-start gap-2 px-3 py-2 hover:bg-muted/30 transition-colors"
            >
              <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-sm font-medium">{suggestion.title}</div>
                <div className="text-xs text-muted-foreground">{suggestion.reason}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }
  
  return null
}

// Confirmation tool part
function ConfirmationToolPart({ 
  state,
  input,
  output,
  toolCallId,
  onConfirmation 
}: { 
  state: string
  input: Record<string, unknown>
  output?: Record<string, unknown>
  toolCallId: string
  onConfirmation: (toolCallId: string, confirmed: boolean) => void 
}) {
  if (state === 'call') {
    return (
      <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
        <p className="text-sm mb-3">{input?.message as string}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onConfirmation(toolCallId, true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Check className="h-4 w-4" />
            Yes
          </button>
          <button
            onClick={() => onConfirmation(toolCallId, false)}
            className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            <X className="h-4 w-4" />
            No
          </button>
        </div>
      </div>
    )
  }
  
  if (state === 'result') {
    const confirmed = String(output).includes('confirmed')
    return (
      <div className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
        confirmed ? 'bg-primary/10 text-primary' : 'bg-muted/30 text-muted-foreground'
      )}>
        {confirmed ? (
          <>
            <Check className="h-4 w-4" />
            <span>Confirmed</span>
          </>
        ) : (
          <>
            <X className="h-4 w-4" />
            <span>Declined</span>
          </>
        )}
      </div>
    )
  }
  
  return null
}

// Page context tool part
function PageContextToolPart({ state }: { state: string }) {
  if (state === 'partial-call' || state === 'call') {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        <span>Reading current page...</span>
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    )
  }
  
  // Don't show output - it's just context for the AI
  return null
}
