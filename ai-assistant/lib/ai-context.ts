import type { DocSource, DocSearchResult } from '../types/ai-types'

// Extract context from the current page (client-side)
export function extractPageContext(): {
  path: string
  title: string
  headings: string[]
  content: string
} {
  if (typeof window === 'undefined') {
    return { path: '', title: '', headings: [], content: '' }
  }
  
  const path = window.location.pathname
  const title = document.title || document.querySelector('h1')?.textContent || ''
  
  // Extract all headings for structure
  const headingElements = document.querySelectorAll('h1, h2, h3, h4')
  const headings = Array.from(headingElements).map(h => h.textContent || '')
  
  // Extract main content (try common content selectors)
  const contentSelectors = [
    'main',
    'article',
    '[role="main"]',
    '.prose',
    '.content',
    '.mdx-content',
  ]
  
  let content = ''
  for (const selector of contentSelectors) {
    const element = document.querySelector(selector)
    if (element) {
      content = element.textContent || ''
      break
    }
  }
  
  // Trim content to reasonable size for context
  const maxLength = 4000
  if (content.length > maxLength) {
    content = content.slice(0, maxLength) + '...'
  }
  
  return { path, title, headings, content }
}

// Format sources for display in chat
export function formatSourcesForDisplay(sources: DocSource[]): string {
  if (sources.length === 0) return ''
  
  const uniqueSources = sources.filter((s, i, arr) => 
    arr.findIndex(x => x.path === s.path) === i
  )
  
  return uniqueSources
    .slice(0, 3)
    .map(s => `- [${s.title}](${s.path})`)
    .join('\n')
}

// Convert search results to context string for the AI
export function searchResultsToContext(results: DocSearchResult[]): string {
  if (results.length === 0) {
    return 'No relevant documentation found.'
  }
  
  return results
    .map((r, i) => {
      const snippet = r.content.slice(0, 500).replace(/\n+/g, ' ').trim()
      return `[${i + 1}] ${r.title} (${r.path})\n${r.description || ''}\n${snippet}...`
    })
    .join('\n\n---\n\n')
}

// Build context injection for messages
export function buildContextInjection(
  currentPage?: { title: string; path: string; content: string },
  recentSources?: DocSource[]
): string {
  const parts: string[] = []
  
  if (currentPage && currentPage.path) {
    parts.push(`## Current Page Context
Title: ${currentPage.title}
Path: ${currentPage.path}
Content Preview: ${currentPage.content.slice(0, 1000)}...`)
  }
  
  if (recentSources && recentSources.length > 0) {
    parts.push(`## Recent Sources Referenced
${recentSources.map(s => `- ${s.title}: ${s.snippet}`).join('\n')}`)
  }
  
  return parts.join('\n\n')
}

// Parse tool outputs to extract sources
export function extractSourcesFromToolOutputs(parts: unknown[]): DocSource[] {
  const sources: DocSource[] = []
  
  for (const part of parts) {
    if (typeof part === 'object' && part !== null) {
      const p = part as Record<string, unknown>
      // Check for searchDocs tool output
      if (p.type === 'tool-searchDocs' && p.state === 'output-available') {
        const output = p.output as { sources?: DocSource[] }
        if (output?.sources) {
          sources.push(...output.sources)
        }
      }
    }
  }
  
  return sources
}

// Generate suggested questions based on context
export function generateSuggestedQuestions(
  pageTitle?: string,
  pageHeadings?: string[]
): string[] {
  const suggestions: string[] = []
  
  if (pageTitle) {
    suggestions.push(`What is ${pageTitle}?`)
    suggestions.push(`How do I get started with ${pageTitle}?`)
  }
  
  if (pageHeadings && pageHeadings.length > 0) {
    // Pick interesting headings to turn into questions
    const interestingHeadings = pageHeadings
      .filter(h => h.length > 5 && h.length < 50)
      .slice(1, 4) // Skip the first (usually title) and take up to 3
    
    for (const heading of interestingHeadings) {
      suggestions.push(`Tell me more about ${heading.toLowerCase()}`)
    }
  }
  
  // Default suggestions if we have nothing
  if (suggestions.length === 0) {
    suggestions.push(
      'What can I learn from these docs?',
      'Where should I start?',
      'What are the key concepts?'
    )
  }
  
  return suggestions.slice(0, 4)
}
