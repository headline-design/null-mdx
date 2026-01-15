import type { Message } from 'ai'

// Re-export Message type for convenience
export type DocsAgentMessage = Message

// Custom data types for streaming
export interface DocsAgentDataTypes {
  sources?: DocSource[]
  suggestedQuestions?: string[]
}

// Documentation source for citations
export interface DocSource {
  title: string
  path: string
  snippet: string
  relevance: number
}

// Search result from documentation
export interface DocSearchResult {
  slug: string
  title: string
  description?: string
  content: string
  path: string
  type: 'docs' | 'blog' | 'page'
  score?: number
}

// Configuration for the AI Assistant
export interface AIAssistantConfig {
  // Model configuration
  model?: string
  
  // System prompt customization
  systemPrompt?: string
  
  // Feature flags
  enableSearch?: boolean
  enableCitations?: boolean
  enableSuggestions?: boolean
  
  // Content sources
  contentSources?: {
    llmsTxt?: string
    searchApi?: string
  }
  
  // Custom tools (extend base tools)
  customTools?: Record<string, unknown>
  
  // UI customization
  ui?: {
    position?: 'bottom-right' | 'bottom-left' | 'center'
    trigger?: 'button' | 'cmd-k' | 'both'
    theme?: 'inherit' | 'light' | 'dark'
    title?: string
    placeholder?: string
    welcomeMessage?: string
  }
  
  // Branding
  branding?: {
    name?: string
    logo?: string
    accentColor?: string
  }
}

// Chat state for the hook
export interface AIChatState {
  isOpen: boolean
  isLoading: boolean
  error: string | null
  sources: DocSource[]
}

// Tool output states
export type ToolState = 'input-streaming' | 'input-available' | 'output-available' | 'output-error'

// Search tool input/output
export interface SearchToolInput {
  query: string
  limit?: number
}

export interface SearchToolOutput {
  state: 'loading' | 'ready'
  results?: DocSearchResult[]
  totalCount?: number
}

// Navigation tool input/output
export interface NavigationToolInput {
  currentPage?: string
  intent: 'related' | 'next' | 'previous' | 'home'
}

export interface NavigationToolOutput {
  state: 'loading' | 'ready'
  suggestions?: Array<{
    title: string
    path: string
    reason: string
  }>
}

// Code explanation tool
export interface CodeToolInput {
  code: string
  language?: string
  context?: string
}

export interface CodeToolOutput {
  state: 'loading' | 'ready'
  explanation?: string
  relatedDocs?: DocSource[]
}
