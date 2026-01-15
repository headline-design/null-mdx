'use client'

import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIChatSuggestionsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

export function AIChatSuggestions({ 
  suggestions, 
  onSelect, 
  className 
}: AIChatSuggestionsProps) {
  if (suggestions.length === 0) return null
  
  return (
    <div className={cn('flex flex-wrap justify-center gap-2', className)}>
      {suggestions.map((suggestion, i) => (
        <button
          key={i}
          onClick={() => onSelect(suggestion)}
          className={cn(
            'flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2',
            'text-sm text-muted-foreground hover:bg-muted hover:text-foreground',
            'transition-colors'
          )}
        >
          <MessageSquare className="h-3 w-3" />
          {suggestion}
        </button>
      ))}
    </div>
  )
}
