'use client'

import { useState, useCallback, useEffect } from 'react'
import useSWR from 'swr'
import type { DocSearchResult } from '../types/ai-types'

interface UseAISearchOptions {
  searchApiUrl?: string
  debounceMs?: number
  minQueryLength?: number
}

const defaultOptions: Required<UseAISearchOptions> = {
  searchApiUrl: '/api/ai-assistant/search',
  debounceMs: 300,
  minQueryLength: 2,
}

// Fetcher for SWR
const fetcher = async (url: string): Promise<DocSearchResult[]> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Search failed')
  return response.json()
}

export function useAISearch(options: UseAISearchOptions = {}) {
  const config = { ...defaultOptions, ...options }
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  
  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, config.debounceMs)
    
    return () => clearTimeout(timer)
  }, [query, config.debounceMs])
  
  // Determine if we should search
  const shouldSearch = debouncedQuery.length >= config.minQueryLength
  const searchUrl = shouldSearch
    ? `${config.searchApiUrl}?q=${encodeURIComponent(debouncedQuery)}`
    : null
  
  // Use SWR for caching and deduplication
  const { data: results, error, isLoading, mutate } = useSWR<DocSearchResult[]>(
    searchUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000, // Don't re-fetch same query within 5s
    }
  )
  
  // Preload all docs on mount for initial suggestions
  const { data: allDocs } = useSWR<DocSearchResult[]>(
    config.searchApiUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  
  // Search function for manual triggering
  const search = useCallback((newQuery: string) => {
    setQuery(newQuery)
  }, [])
  
  // Clear search
  const clear = useCallback(() => {
    setQuery('')
    setDebouncedQuery('')
  }, [])
  
  // Force refresh results
  const refresh = useCallback(() => {
    mutate()
  }, [mutate])
  
  return {
    // State
    query,
    results: results || [],
    allDocs: allDocs || [],
    isLoading,
    error: error?.message || null,
    
    // Actions
    search,
    setQuery,
    clear,
    refresh,
    
    // Computed
    hasResults: (results?.length || 0) > 0,
    isSearching: query.length > 0,
  }
}

export type UseAISearchReturn = ReturnType<typeof useAISearch>
