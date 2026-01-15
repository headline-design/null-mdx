'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useChat } from '@ai-sdk/react'
import type { Message } from 'ai'
import type { DocSource, AIAssistantConfig } from '../types/ai-types'
import { mergeConfig } from '../lib/ai-config'
import { extractPageContext } from '../lib/ai-context'

interface UseAIChatOptions {
  config?: AIAssistantConfig
  onOpen?: () => void
  onClose?: () => void
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const config = mergeConfig(options.config)
  const [isOpen, setIsOpen] = useState(false)
  const [sources, setSources] = useState<DocSource[]>([])
  const [currentPageContext, setCurrentPageContext] = useState<{
    path: string
    title: string
    headings: string[]
    content: string
  } | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Set up the chat with AI SDK
  const {
    messages,
    append,
    setMessages,
    status,
    error,
    addToolResult,
  } = useChat({
    api: '/api/ai-assistant/chat',
    
    // Handle client-side tools
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getPageContext') {
        // Return the current page context
        const context = currentPageContext || extractPageContext()
        return JSON.stringify({
          title: context.title,
          path: context.path,
          description: '',
          headings: context.headings,
          content: context.content.slice(0, 2000),
        })
      }
      
      if (toolCall.toolName === 'askConfirmation') {
        // This will be handled by the UI component
        // The component will call addToolResult when user responds
        return undefined
      }
    },
  })
  
  // Extract sources from messages for citations
  useEffect(() => {
    const allSources: DocSource[] = []
    for (const message of messages) {
      if (message.role === 'assistant' && message.toolInvocations) {
        for (const invocation of message.toolInvocations) {
          if (invocation.toolName === 'searchDocs' && invocation.state === 'result' && invocation.result) {
            const result = invocation.result as { sources?: DocSource[] }
            if (result.sources) {
              allSources.push(...result.sources)
            }
          }
        }
      }
    }
    setSources(allSources)
  }, [messages])
  
  // Update page context when chat opens
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      setCurrentPageContext(extractPageContext())
    }
  }, [isOpen])
  
  // Keyboard shortcut handler
  useEffect(() => {
    if (config.ui.trigger === 'cmd-k' || config.ui.trigger === 'both') {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Cmd/Ctrl + K to open
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }
        // Escape to close
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false)
        }
      }
      
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [config.ui.trigger, isOpen])
  
  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      options.onOpen?.()
    } else {
      options.onClose?.()
    }
  }, [isOpen, options])
  
  // Open the chat
  const open = useCallback(() => setIsOpen(true), [])
  
  // Close the chat
  const close = useCallback(() => setIsOpen(false), [])
  
  // Toggle the chat
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  
  // Check if chat is ready to send
  const isReady = status === 'ready' || status === 'awaiting'
  
  // Send a message
  const send = useCallback((text: string) => {
    if (!text.trim() || !isReady) return
    append({ role: 'user', content: text })
  }, [append, isReady])
  
  // Clear chat history
  const clear = useCallback(() => {
    setMessages([])
    setSources([])
  }, [setMessages])
  
  // Handle confirmation tool responses
  const handleConfirmation = useCallback((toolCallId: string, confirmed: boolean) => {
    addToolResult({
      toolCallId,
      result: confirmed ? 'User confirmed' : 'User declined',
    })
  }, [addToolResult])
  
  return {
    // State
    isOpen,
    messages,
    status,
    error,
    sources,
    config,
    currentPageContext,
    
    // Refs
    inputRef,
    
    // Actions
    open,
    close,
    toggle,
    send,
    clear,
    handleConfirmation,
    addToolResult,
  }
}

export type UseAIChatReturn = ReturnType<typeof useAIChat>
