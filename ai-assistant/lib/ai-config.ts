import type { AIAssistantConfig } from '../types/ai-types'

// Default configuration for the AI Docs Assistant
export const defaultConfig: Required<AIAssistantConfig> = {
  // Model - uses Vercel AI Gateway by default
  model: 'openai/gpt-4o-mini',
  
  // System prompt optimized for documentation assistance
  systemPrompt: '', // Will use getDefaultSystemPrompt() if empty
  
  // Feature flags
  enableSearch: true,
  enableCitations: true,
  enableSuggestions: true,
  
  // Content sources
  contentSources: {
    llmsTxt: '/llms.txt',
    searchApi: '/api/ai-assistant/search',
  },
  
  // Custom tools placeholder
  customTools: {},
  
  // UI configuration
  ui: {
    position: 'bottom-right',
    trigger: 'both',
    theme: 'inherit',
    title: 'Documentation Assistant',
    placeholder: 'Ask about the docs...',
    welcomeMessage: 'Hi! I can help you navigate the documentation, explain concepts, and find what you need. What would you like to know?',
  },
  
  // Branding
  branding: {
    name: 'Docs AI',
    logo: '',
    accentColor: '',
  },
}

// Merge user config with defaults
export function mergeConfig(userConfig?: AIAssistantConfig): Required<AIAssistantConfig> {
  if (!userConfig) return defaultConfig
  
  return {
    model: userConfig.model ?? defaultConfig.model,
    systemPrompt: userConfig.systemPrompt ?? defaultConfig.systemPrompt,
    enableSearch: userConfig.enableSearch ?? defaultConfig.enableSearch,
    enableCitations: userConfig.enableCitations ?? defaultConfig.enableCitations,
    enableSuggestions: userConfig.enableSuggestions ?? defaultConfig.enableSuggestions,
    contentSources: {
      ...defaultConfig.contentSources,
      ...userConfig.contentSources,
    },
    customTools: {
      ...defaultConfig.customTools,
      ...userConfig.customTools,
    },
    ui: {
      ...defaultConfig.ui,
      ...userConfig.ui,
    },
    branding: {
      ...defaultConfig.branding,
      ...userConfig.branding,
    },
  }
}

// Create a context provider value
export function createConfigContext(config: AIAssistantConfig) {
  return mergeConfig(config)
}
