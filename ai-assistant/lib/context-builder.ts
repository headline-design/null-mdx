/**
 * Context Builder
 * 
 * Builds rich context for AI conversations based on:
 * - Current page content
 * - Search results
 * - Conversation history
 * - Site structure
 */

import type { DocSearchResult, DocSource } from '../types/ai-types'

export interface ConversationContext {
  currentPage?: {
    title: string
    path: string
    content: string
    headings: string[]
  }
  relevantDocs: DocSearchResult[]
  recentTopics: string[]
  siteSummary?: string
}

/**
 * Build context from the current conversation and page
 */
export function buildConversationContext(options: {
  currentPage?: { title: string; path: string; content: string; headings?: string[] }
  searchResults?: DocSearchResult[]
  conversationHistory?: { role: string; content: string }[]
  maxTokens?: number
}): ConversationContext {
  const { currentPage, searchResults = [], conversationHistory = [], maxTokens = 4000 } = options
  
  // Extract recent topics from conversation
  const recentTopics = extractTopicsFromHistory(conversationHistory)
  
  // Trim content to fit token budget
  const relevantDocs = searchResults.slice(0, 5).map(doc => ({
    ...doc,
    content: doc.content.slice(0, 500),
  }))
  
  return {
    currentPage: currentPage ? {
      ...currentPage,
      content: currentPage.content.slice(0, 2000),
      headings: currentPage.headings || [],
    } : undefined,
    relevantDocs,
    recentTopics,
  }
}

/**
 * Extract topics from conversation history
 */
function extractTopicsFromHistory(
  history: { role: string; content: string }[]
): string[] {
  const topics: string[] = []
  
  for (const message of history.slice(-10)) {
    if (message.role === 'user') {
      // Extract key nouns/phrases from user messages
      const words = message.content
        .toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 3)
      topics.push(...words.slice(0, 3))
    }
  }
  
  // Deduplicate and limit
  return [...new Set(topics)].slice(0, 10)
}

/**
 * Format context as a string for the AI system prompt
 */
export function formatContextForPrompt(context: ConversationContext): string {
  const parts: string[] = []
  
  if (context.currentPage) {
    parts.push(`## Current Page
Title: ${context.currentPage.title}
Path: ${context.currentPage.path}
${context.currentPage.headings.length > 0 ? `Sections: ${context.currentPage.headings.join(', ')}` : ''}

Content Preview:
${context.currentPage.content.slice(0, 1500)}`)
  }
  
  if (context.relevantDocs.length > 0) {
    parts.push(`## Relevant Documentation
${context.relevantDocs.map((doc, i) => 
  `[${i + 1}] ${doc.title} (${doc.path})\n${doc.description || doc.content.slice(0, 200)}`
).join('\n\n')}`)
  }
  
  if (context.recentTopics.length > 0) {
    parts.push(`## Topics Discussed
${context.recentTopics.join(', ')}`)
  }
  
  return parts.join('\n\n---\n\n')
}

/**
 * Build sources list from context
 */
export function buildSourcesFromContext(context: ConversationContext): DocSource[] {
  const sources: DocSource[] = []
  
  // Add current page as a source
  if (context.currentPage) {
    sources.push({
      title: context.currentPage.title,
      path: context.currentPage.path,
      snippet: context.currentPage.content.slice(0, 150) + '...',
      relevance: 1.0,
    })
  }
  
  // Add relevant docs as sources
  for (const doc of context.relevantDocs) {
    sources.push({
      title: doc.title,
      path: doc.path,
      snippet: doc.description || doc.content.slice(0, 150) + '...',
      relevance: doc.score ? doc.score / 100 : 0.5,
    })
  }
  
  return sources
}

/**
 * Estimate token count for content (rough approximation)
 */
export function estimateTokenCount(text: string): number {
  // Rough estimate: ~4 characters per token on average
  return Math.ceil(text.length / 4)
}

/**
 * Trim content to fit within token budget
 */
export function trimToTokenBudget(content: string, maxTokens: number): string {
  const estimated = estimateTokenCount(content)
  if (estimated <= maxTokens) {
    return content
  }
  
  // Trim to approximate character count
  const targetChars = maxTokens * 4
  return content.slice(0, targetChars) + '...'
}
