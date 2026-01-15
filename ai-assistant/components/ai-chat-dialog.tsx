'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, Sparkles, Trash2, ArrowUp, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AIChatMessages } from './ai-chat-messages'
import { AIChatSuggestions } from './ai-chat-suggestions'
import type { UseAIChatReturn } from '../hooks/use-ai-chat'
import { generateSuggestedQuestions } from '../lib/ai-context'

interface AIChatDialogProps {
  chat: UseAIChatReturn
  className?: string
}

export function AIChatDialog({ chat, className }: AIChatDialogProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const {
    isOpen,
    close,
    messages,
    status,
    config,
    sources,
    send,
    clear,
    handleConfirmation,
    currentPageContext,
  } = chat
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])
  
  // Focus textarea when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isOpen])
  
  const isReady = status === 'ready' || status === 'awaiting'
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !isReady) return
    send(input)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  
  const handleSuggestionClick = (suggestion: string) => {
    send(suggestion)
  }
  
  const suggestions = generateSuggestedQuestions(
    currentPageContext?.title,
    currentPageContext?.headings
  )
  
  const isLoading = status === 'streaming' || status === 'submitted' || status === 'awaiting'
  const showWelcome = messages.length === 0
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed z-50 flex flex-col bg-popover text-popover-foreground shadow-2xl',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            // Desktop: centered dialog
            'sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
            'sm:w-full sm:max-w-2xl sm:h-[600px] sm:max-h-[80vh] sm:rounded-xl sm:border',
            // Mobile: full screen bottom sheet
            'left-0 right-0 bottom-0 top-auto h-[85vh] rounded-t-xl border-t',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">{config.ui.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {isLoading ? 'Thinking...' : 'Ask me anything'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clear}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={close}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
            {showWelcome ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{config.ui.title}</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  {config.ui.welcomeMessage}
                </p>
                <AIChatSuggestions
                  suggestions={suggestions}
                  onSelect={handleSuggestionClick}
                />
              </div>
            ) : (
              <>
                <AIChatMessages
                  messages={messages}
                  sources={sources}
                  onConfirmation={handleConfirmation}
                  isLoading={isLoading}
                />
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Input */}
          <div className="border-t border-border/50 p-4 shrink-0">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={config.ui.placeholder}
                disabled={!isReady}
                rows={1}
                className={cn(
                  'w-full resize-none rounded-xl border border-border/50 bg-muted/30 px-4 py-3 pr-12',
                  'text-sm placeholder:text-muted-foreground/60',
                  'focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'scrollbar-hide'
                )}
              />
              <button
                type="submit"
                disabled={!input.trim() || !isReady}
                className={cn(
                  'absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-lg',
                  'bg-primary text-primary-foreground',
                  'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-colors'
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground/50">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span>
                <kbd className="rounded bg-muted/50 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
                {' '}to toggle
              </span>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
