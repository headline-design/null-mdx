import { tool } from 'ai'
import { z } from 'zod'
import type { DocSearchResult, DocSource } from '../types/ai-types'

// Search documentation tool - server-executed
export const searchDocsTool = tool({
  description: 'Search the documentation for relevant pages and content. Use this when users ask about specific topics, features, or concepts.',
  parameters: z.object({
    query: z.string().describe('The search query - keywords, concepts, or questions'),
    limit: z.number().optional().default(5).describe('Maximum number of results to return'),
  }),
  execute: async ({ query, limit = 5 }) => {
    try {
      // Get the base URL from environment or construct it
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000'
      
      const response = await fetch(`${baseUrl}/api/ai-assistant/search?q=${encodeURIComponent(query)}&limit=${limit}`)
      
      if (!response.ok) {
        return {
          results: [],
          sources: [],
          totalCount: 0,
          error: 'Search failed',
        }
      }
      
      const results: DocSearchResult[] = await response.json()
      
      // Convert to sources for citations
      const sources: DocSource[] = results.map((r, i) => ({
        title: r.title,
        path: r.path,
        snippet: r.description || r.content.slice(0, 150) + '...',
        relevance: 1 - (i * 0.1),
      }))
      
      return {
        results,
        sources,
        totalCount: results.length,
      }
    } catch (error) {
      return {
        results: [],
        sources: [],
        totalCount: 0,
        error: error instanceof Error ? error.message : 'Search failed',
      }
    }
  },
})

// Get current page context tool - client-executed (no execute function = requires client result)
export const getPageContextTool = tool({
  description: 'Get information about the current documentation page the user is viewing. Use this when users ask "what is this page about?" or reference "this page".',
  parameters: z.object({
    includeContent: z.boolean().optional().default(true).describe('Whether to include the page content'),
  }),
})

// Suggest navigation tool - server-executed
export const suggestNavigationTool = tool({
  description: 'Suggest related documentation pages or next steps for the user. Use this to help users discover relevant content.',
  parameters: z.object({
    currentPage: z.string().optional().describe('The page the user is currently on'),
    topic: z.string().optional().describe('The topic or concept the user is interested in'),
    intent: z.enum(['related', 'deeper', 'overview', 'next-steps']).default('related').describe('What kind of suggestions to provide'),
  }),
  execute: async ({ currentPage, topic, intent }) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000'
      
      const searchQuery = topic || currentPage || ''
      const response = await fetch(`${baseUrl}/api/ai-assistant/search?q=${encodeURIComponent(searchQuery)}&limit=5`)
      
      if (!response.ok) {
        return { suggestions: [], intent, error: 'Navigation lookup failed' }
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
      
      return { suggestions, intent }
    } catch (error) {
      return {
        suggestions: [],
        intent,
        error: error instanceof Error ? error.message : 'Failed to get suggestions',
      }
    }
  },
})

// Confirmation tool for sensitive actions - client-executed (no execute function)
export const askConfirmationTool = tool({
  description: 'Ask the user for confirmation before performing an action. Use sparingly.',
  parameters: z.object({
    message: z.string().describe('The confirmation message to show the user'),
    actionDescription: z.string().describe('Description of what will happen if confirmed'),
  }),
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
