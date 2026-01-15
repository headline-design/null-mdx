/**
 * AI Assistant for Documentation Sites
 * 
 * A drop-in AI-powered assistant for documentation websites.
 * Provides semantic search, contextual answers, and navigation help.
 * 
 * @example
 * ```tsx
 * // 1. Wrap your app with the provider
 * import { AIAssistantProvider } from '@/ai-assistant'
 * 
 * export default function Layout({ children }) {
 *   return (
 *     <AIAssistantProvider
 *       config={{
 *         ui: {
 *           title: 'My Docs AI',
 *           welcomeMessage: 'How can I help you?'
 *         }
 *       }}
 *     >
 *       {children}
 *     </AIAssistantProvider>
 *   )
 * }
 * 
 * // 2. Use the hook anywhere to control the assistant
 * import { useAIAssistant } from '@/ai-assistant'
 * 
 * function MyComponent() {
 *   const { open, isOpen } = useAIAssistant()
 *   return <button onClick={open}>Ask AI</button>
 * }
 * ```
 */

// Main provider and hook
export { AIAssistantProvider, useAIAssistant, AIAssistantStandalone } from './components/ai-assistant-provider'

// UI Components
export { AIChatDialog } from './components/ai-chat-dialog'
export { AIChatMessages } from './components/ai-chat-messages'
export { AIChatSuggestions } from './components/ai-chat-suggestions'
export { AIChatTrigger, AIChatSearchTrigger } from './components/ai-chat-trigger'
export { AICitation, AICitationList } from './components/ai-citation'

// Hooks
export { useAIChat } from './hooks/use-ai-chat'
export { useAISearch } from './hooks/use-ai-search'

// Configuration
export { defaultConfig, mergeConfig, createConfigContext } from './lib/ai-config'
export { getDefaultSystemPrompt, SUGGESTION_PROMPT, SEARCH_SUMMARY_PROMPT } from './lib/ai-prompts'

// Tools (for extending)
export { docsAgentTools, searchDocsTool, getPageContextTool, suggestNavigationTool, askConfirmationTool } from './lib/ai-tools'

// Context utilities
export { 
  extractPageContext, 
  formatSourcesForDisplay, 
  searchResultsToContext,
  buildContextInjection,
  generateSuggestedQuestions 
} from './lib/ai-context'

// Documentation indexing
export { 
  indexDocumentation, 
  clearDocumentationCache, 
  searchIndexedDocs,
  extractKeywords,
  generateContentSummary 
} from './lib/docs-indexer'

// Context building
export {
  buildConversationContext,
  formatContextForPrompt,
  buildSourcesFromContext,
  estimateTokenCount,
  trimToTokenBudget
} from './lib/context-builder'

// Types
export type {
  DocsAgentMessage,
  DocsAgentDataTypes,
  DocSource,
  DocSearchResult,
  AIAssistantConfig,
  AIChatState,
  ToolState,
  SearchToolInput,
  SearchToolOutput,
  NavigationToolInput,
  NavigationToolOutput,
  CodeToolInput,
  CodeToolOutput,
} from './types/ai-types'

export type { UseAIChatReturn } from './hooks/use-ai-chat'
export type { UseAISearchReturn } from './hooks/use-ai-search'
export type { DocsAgentToolName } from './lib/ai-tools'
