'use client'

import { Sparkles, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AIAssistantConfig } from '../types/ai-types'

interface AIChatTriggerProps {
  onClick: () => void
  config: Required<AIAssistantConfig>
  variant?: 'fab' | 'button' | 'minimal'
  className?: string
}

export function AIChatTrigger({ 
  onClick, 
  config, 
  variant = 'fab',
  className 
}: AIChatTriggerProps) {
  if (variant === 'fab') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'fixed z-40 flex items-center justify-center rounded-full shadow-lg',
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90 hover:scale-105',
          'transition-all duration-200',
          'h-14 w-14',
          config.ui.position === 'bottom-right' && 'bottom-6 right-6',
          config.ui.position === 'bottom-left' && 'bottom-6 left-6',
          className
        )}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    )
  }
  
  if (variant === 'button') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 rounded-lg px-4 py-2',
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
          'transition-colors text-sm font-medium',
          className
        )}
      >
        <Sparkles className="h-4 w-4" />
        Ask AI
      </button>
    )
  }
  
  // Minimal variant - just an icon button
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg',
        'text-muted-foreground hover:text-foreground hover:bg-muted',
        'transition-colors',
        className
      )}
      aria-label="Open AI Assistant"
    >
      <MessageSquare className="h-5 w-5" />
    </button>
  )
}

// Search-bar style trigger that fits into existing search UI
interface AIChatSearchTriggerProps {
  onClick: () => void
  className?: string
}

export function AIChatSearchTrigger({ onClick, className }: AIChatSearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2',
        'text-sm text-muted-foreground',
        'hover:bg-muted hover:text-foreground hover:border-border',
        'transition-colors w-full max-w-sm',
        className
      )}
    >
      <Sparkles className="h-4 w-4 text-primary" />
      <span className="flex-1 text-left">Ask AI about the docs...</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
        <span>⌘</span>
        <span>K</span>
      </kbd>
    </button>
  )
}
