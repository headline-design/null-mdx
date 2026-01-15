/**
 * Documentation Indexer
 * 
 * Utilities for indexing and caching documentation content
 * for fast AI-assisted search and retrieval.
 */

import type { DocSearchResult } from '../types/ai-types'

// Cache for indexed content
let indexCache: DocSearchResult[] | null = null
let lastIndexTime: number = 0
const INDEX_TTL = 60 * 1000 // 1 minute cache

/**
 * Fetch and index all documentation from the search API
 */
export async function indexDocumentation(
  searchApiUrl: string = '/api/ai-assistant/search'
): Promise<DocSearchResult[]> {
  // Return cached if fresh
  if (indexCache && Date.now() - lastIndexTime < INDEX_TTL) {
    return indexCache
  }
  
  try {
    const response = await fetch(searchApiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch documentation index')
    }
    
    const results: DocSearchResult[] = await response.json()
    indexCache = results
    lastIndexTime = Date.now()
    
    return results
  } catch (error) {
    console.error('[Docs Indexer] Error indexing documentation:', error)
    return indexCache || []
  }
}

/**
 * Clear the documentation cache
 */
export function clearDocumentationCache(): void {
  indexCache = null
  lastIndexTime = 0
}

/**
 * Search indexed documentation locally (faster than API for repeated searches)
 */
export function searchIndexedDocs(
  query: string,
  index: DocSearchResult[],
  limit: number = 5
): DocSearchResult[] {
  if (!query.trim()) {
    return index.slice(0, limit)
  }
  
  const lowerQuery = query.toLowerCase()
  
  return index
    .map(doc => {
      let score = 0
      const lowerTitle = doc.title.toLowerCase()
      const lowerContent = doc.content.toLowerCase()
      const lowerDesc = (doc.description || '').toLowerCase()
      
      // Title matches
      if (lowerTitle.includes(lowerQuery)) {
        score += 100
        if (lowerTitle === lowerQuery) score += 50
        if (lowerTitle.startsWith(lowerQuery)) score += 25
      }
      
      // Description matches
      if (lowerDesc.includes(lowerQuery)) {
        score += 50
      }
      
      // Content matches
      if (lowerContent.includes(lowerQuery)) {
        score += 25
      }
      
      return { ...doc, score }
    })
    .filter(doc => (doc.score || 0) > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, limit)
}

/**
 * Extract keywords from documentation for better search
 */
export function extractKeywords(content: string): string[] {
  // Remove markdown syntax
  const cleaned = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/[#*_~>-]/g, '') // Remove markdown symbols
    .toLowerCase()
  
  // Extract words
  const words = cleaned.match(/\b[a-z]{3,}\b/g) || []
  
  // Count frequency
  const frequency: Record<string, number> = {}
  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1
  }
  
  // Filter common words and sort by frequency
  const stopWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
    'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'from',
    'this', 'that', 'with', 'they', 'will', 'would', 'there', 'their',
    'what', 'about', 'which', 'when', 'make', 'like', 'time', 'just',
    'know', 'take', 'into', 'year', 'your', 'some', 'could', 'them',
    'than', 'then', 'look', 'only', 'come', 'over', 'such', 'also',
  ])
  
  return Object.entries(frequency)
    .filter(([word]) => !stopWords.has(word))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word]) => word)
}

/**
 * Generate a content summary for AI context
 */
export function generateContentSummary(docs: DocSearchResult[]): string {
  const sections: string[] = []
  
  // Group by type
  const byType = docs.reduce((acc, doc) => {
    const type = doc.type || 'docs'
    if (!acc[type]) acc[type] = []
    acc[type].push(doc)
    return acc
  }, {} as Record<string, DocSearchResult[]>)
  
  for (const [type, items] of Object.entries(byType)) {
    sections.push(`## ${type.charAt(0).toUpperCase() + type.slice(1)}`)
    sections.push(
      items
        .slice(0, 10)
        .map(item => `- ${item.title}: ${item.description || 'No description'}`)
        .join('\n')
    )
  }
  
  return sections.join('\n\n')
}
