import { NextRequest } from 'next/server'
import { getAllContent, getDocsNavigation } from '@/lib/content'
import type { DocSearchResult } from '@/ai-assistant/types/ai-types'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q')?.toLowerCase() || ''
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    
    // Gather all content
    const blogPosts = getAllContent('blog')
    const docsNav = getDocsNavigation()
    
    // Flatten docs into searchable array
    const allDocs = docsNav.flatMap(section => 
      section.items.map(item => ({
        slug: item.slug,
        title: item.meta.title,
        description: item.meta.description,
        content: item.content,
        path: `/docs/${item.slug}`,
        type: 'docs' as const,
        section: section.section,
      }))
    )
    
    // Convert blog posts to searchable format
    const allBlog = blogPosts.map(post => ({
      slug: post.slug,
      title: post.meta.title,
      description: post.meta.description,
      content: post.content,
      path: `/blog/${post.slug}`,
      type: 'blog' as const,
    }))
    
    // Combine all content
    const allContent = [...allDocs, ...allBlog]
    
    // If no query, return all content (for initial load)
    if (!query) {
      const results: DocSearchResult[] = allContent.slice(0, limit).map(item => ({
        slug: item.slug,
        title: item.title,
        description: item.description,
        content: item.content.slice(0, 300),
        path: item.path,
        type: item.type,
      }))
      
      return Response.json(results)
    }
    
    // Score and filter content
    const scoredResults = allContent
      .map(item => {
        let score = 0
        const lowerTitle = item.title.toLowerCase()
        const lowerDesc = (item.description || '').toLowerCase()
        const lowerContent = item.content.toLowerCase()
        
        // Title match is highest priority
        if (lowerTitle.includes(query)) {
          score += 100
          // Exact match bonus
          if (lowerTitle === query) score += 50
          // Starts with bonus
          if (lowerTitle.startsWith(query)) score += 25
        }
        
        // Description match
        if (lowerDesc.includes(query)) {
          score += 50
        }
        
        // Content match
        if (lowerContent.includes(query)) {
          score += 25
          // Count occurrences (max 10 for scoring)
          const matches = (lowerContent.match(new RegExp(query, 'g')) || []).length
          score += Math.min(matches * 5, 50)
        }
        
        // Slug match
        if (item.slug.toLowerCase().includes(query)) {
          score += 30
        }
        
        return { ...item, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
    
    // Format results
    const results: DocSearchResult[] = scoredResults.map(item => {
      // Find relevant snippet from content
      let snippet = item.content.slice(0, 300)
      const queryIndex = item.content.toLowerCase().indexOf(query)
      if (queryIndex > 50) {
        // Show context around the match
        const start = Math.max(0, queryIndex - 50)
        const end = Math.min(item.content.length, queryIndex + 200)
        snippet = '...' + item.content.slice(start, end) + '...'
      }
      
      return {
        slug: item.slug,
        title: item.title,
        description: item.description,
        content: snippet,
        path: item.path,
        type: item.type,
        score: item.score,
      }
    })
    
    return Response.json(results)
  } catch (error) {
    console.error('[AI Assistant Search] Error:', error)
    return Response.json([], { status: 500 })
  }
}
