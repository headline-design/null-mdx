import { tool } from 'ai'
import { z } from 'zod'
import type { DocSearchResult, DocSource } from '../types/ai-types'

// Search documentation tool - server-executed with streaming output
export const searchDocsTool = tool({
  description: 'Search the documentation for relevant pages and content. Use this when users ask about specific topics, features, or concepts.',
  inputSchema: z.object({
    query: z.string().describe('The search query - keywords, concepts, or questions'),
    limit: z.number().optional().default(5).describe('Maximum number of results to return'),
  }),
  async *execute({ query, limit = 5 }) {
    yield { state: 'loading' as const }
    
    try {
      // This will call the search API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/ai-assistant/search?q=${encodeURIComponent(query)}&limit=${limit}`)
      
      if (!response.ok) {
        throw new Error('Search failed')
      }
      
      const results: DocSearchResult[] = await response.json()
      
      // Convert to sources for citations
      const sources: DocSource[] = results.map((r, i) => ({
        title: r.title,
        path: r.path,
        snippet: r.description || r.content.slice(0, 150) + '...',
        relevance: 1 - (i * 0.1), // Simple relevance scoring based on position
      }))
      
      yield {
        state: 'ready' as const,
        results,
        sources,
        totalCount: results.length,
      }
    } catch (error) {
      yield {
        state: 'ready' as const,
        results: [],
        sources: [],
        totalCount: 0,
        error: error instanceof Error ? error.message : 'Search failed',
      }
    }
  },
})

// Get current page context tool - client-executed
export const getPageContextTool = tool({
  description: 'Get information about the current documentation page the user is viewing. Use this when users ask "what is this page about?" or reference "this page".',
  inputSchema: z.object({
    path: z.string().optional().describe('The current page path (auto-detected if not provided)'),
  }),
  outputSchema: z.object({
    title: z.string(),
    path: z.string(),
    description: z.string().optional(),
    headings: z.array(z.string()),
    content: z.string(),
  }),
})

// Suggest navigation tool - server-executed
export const suggestNavigationTool = tool({
  description: 'Suggest related documentation pages or next steps for the user. Use this to help users discover relevant content.',
  inputSchema: z.object({
    currentPage: z.string().optional().describe('The page the user is currently on'),
    topic: z.string().optional().describe('The topic or concept the user is interested in'),
    intent: z.enum(['related', 'deeper', 'overview', 'next-steps']).default('related').describe('What kind of suggestions to provide'),
  }),
  async *execute({ currentPage, topic, intent }) {
    yield { state: 'loading' as const }
    
    try {
      const searchQuery = topic || currentPage || ''
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/ai-assistant/search?q=${encodeURIComponent(searchQuery)}&limit=5`)
      
      if (!response.ok) {
        throw new Error('Navigation lookup failed')
      }
      
      const results: DocSearchResult[] = await response.json()
      
      // Filter out current page if provided
      const suggestions = results
        .filter(r => r.path !== currentPage)
        .slice(0, 3)
        .map(r => ({
          title: r.title,
          path: r.path,
          description: r.description || '',
          reason: getNavigationReason(intent, r),
        }))
      
      yield {
        state: 'ready' as const,
        suggestions,
        intent,
      }
    } catch (error) {
      yield {
        state: 'ready' as const,
        suggestions: [],
        error: error instanceof Error ? error.message : 'Failed to get suggestions',
      }
    }
  },
})

// Confirmation tool for sensitive actions - client-executed
export const askConfirmationTool = tool({
  description: 'Ask the user for confirmation before performing an action. Use sparingly.',
  inputSchema: z.object({
    message: z.string().describe('The confirmation message to show the user'),
    actionDescription: z.string().describe('Description of what will happen if confirmed'),
  }),
  outputSchema: z.string(),
})

// Helper function to generate navigation reasons
function getNavigationReason(intent: string, result: DocSearchResult): string {
  switch (intent) {
    case 'deeper':
      return `Dive deeper into ${result.title}`
    case 'overview':
      return `Get an overview of ${result.title}`
    case 'next-steps':
      return `Continue learning with ${result.title}`
    case 'related':
    default:
      return `Related: ${result.title}`
  }
}

// Export all tools as a collection
export const docsAgentTools = {
  searchDocs: searchDocsTool,
  getPageContext: getPageContextTool,
  suggestNavigation: suggestNavigationTool,
  askConfirmation: askConfirmationTool,
} as const

// Tool names for type safety
export type DocsAgentToolName = keyof typeof docsAgentTools
