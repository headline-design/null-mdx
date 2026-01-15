'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useAIChat, type UseAIChatReturn } from '../hooks/use-ai-chat'
import { AIChatDialog } from './ai-chat-dialog'
import { AIChatTrigger } from './ai-chat-trigger'
import type { AIAssistantConfig } from '../types/ai-types'

// Context for accessing the AI chat from anywhere
const AIAssistantContext = createContext<UseAIChatReturn | null>(null)

// Hook to access the AI assistant context
export function useAIAssistant() {
  const context = useContext(AIAssistantContext)
  if (!context) {
    throw new Error('useAIAssistant must be used within AIAssistantProvider')
  }
  return context
}

interface AIAssistantProviderProps {
  children: ReactNode
  config?: AIAssistantConfig
  showTrigger?: boolean
  triggerVariant?: 'fab' | 'button' | 'minimal'
}

/**
 * AIAssistantProvider
 * 
 * Wrap your app or layout with this provider to enable the AI assistant.
 * It provides:
 * - A floating chat dialog
 * - Optional trigger button (FAB, button, or minimal)
 * - Keyboard shortcut support (Cmd+K)
 * - Context access via useAIAssistant() hook
 * 
 * @example
 * ```tsx
 * // In your layout.tsx or _app.tsx
 * import { AIAssistantProvider } from '@/ai-assistant'
 * 
 * export default function Layout({ children }) {
 *   return (
 *     <AIAssistantProvider
 *       config={{
 *         ui: {
 *           title: 'My Docs AI',
 *           welcomeMessage: 'How can I help you today?'
 *         }
 *       }}
 *     >
 *       {children}
 *     </AIAssistantProvider>
 *   )
 * }
 * ```
 */
export function AIAssistantProvider({
  children,
  config,
  showTrigger = true,
  triggerVariant = 'fab',
}: AIAssistantProviderProps) {
  const chat = useAIChat({ config })
  
  const shouldShowTrigger = showTrigger && 
    (chat.config.ui.trigger === 'button' || chat.config.ui.trigger === 'both')
  
  return (
    <AIAssistantContext.Provider value={chat}>
      {children}
      
      {/* Floating trigger button */}
      {shouldShowTrigger && !chat.isOpen && (
        <AIChatTrigger
          onClick={chat.open}
          config={chat.config}
          variant={triggerVariant}
        />
      )}
      
      {/* Chat dialog */}
      <AIChatDialog chat={chat} />
    </AIAssistantContext.Provider>
  )
}

/**
 * Standalone AI Assistant component for embedding in specific places
 * Use this if you don't want to wrap your entire app
 */
interface AIAssistantStandaloneProps {
  config?: AIAssistantConfig
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AIAssistantStandalone({
  config,
  defaultOpen = false,
}: AIAssistantStandaloneProps) {
  const chat = useAIChat({ config })
  
  // Open by default if specified
  if (defaultOpen && !chat.isOpen) {
    chat.open()
  }
  
  return <AIChatDialog chat={chat} />
}
