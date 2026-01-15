'use client'

import { ExternalLink, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DocSource } from '../types/ai-types'

interface AICitationProps {
  source: DocSource
  index?: number
  variant?: 'inline' | 'block'
  className?: string
}

export function AICitation({ 
  source, 
  index, 
  variant = 'inline',
  className 
}: AICitationProps) {
  if (variant === 'inline') {
    return (
      <a
        href={source.path}
        className={cn(
          'inline-flex items-center gap-1 rounded px-1.5 py-0.5',
          'bg-primary/10 text-primary text-xs font-medium',
          'hover:bg-primary/20 transition-colors',
          className
        )}
        title={source.title}
      >
        {index !== undefined && (
          <span className="text-[10px]">[{index + 1}]</span>
        )}
        {source.title}
        <ExternalLink className="h-3 w-3" />
      </a>
    )
  }
  
  return (
    <a
      href={source.path}
      className={cn(
        'flex items-start gap-2 rounded-lg border border-border/50 bg-muted/20 p-3',
        'hover:bg-muted/30 transition-colors group',
        className
      )}
    >
      <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {index !== undefined && (
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">
              {index + 1}
            </span>
          )}
          <span className="text-sm font-medium group-hover:text-primary transition-colors">
            {source.title}
          </span>
        </div>
        {source.snippet && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {source.snippet}
          </p>
        )}
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}

interface AICitationListProps {
  sources: DocSource[]
  className?: string
}

export function AICitationList({ sources, className }: AICitationListProps) {
  // Deduplicate sources by path
  const uniqueSources = sources.filter((s, i, arr) => 
    arr.findIndex(x => x.path === s.path) === i
  )
  
  if (uniqueSources.length === 0) return null
  
  return (
    <div className={cn('space-y-2', className)}>
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Sources
      </div>
      <div className="space-y-2">
        {uniqueSources.slice(0, 5).map((source, i) => (
          <AICitation key={source.path} source={source} index={i} variant="block" />
        ))}
      </div>
    </div>
  )
}
