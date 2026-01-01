"use client"

import React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogTitle, DialogHeader, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { FileText, Book, Loader2, Search, Layout, ImageIcon, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  slug: string
  title: string
  description?: string
  type: "blog" | "docs" | "page"
  path: string // Use path directly instead of computing it
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 bottom-0 md:bottom-auto top-auto md:top-[10vh] z-50 w-full md:w-[98vw] max-w-screen-sm -translate-x-1/2 rounded-b-none md:rounded-b-lg rounded-t-lg border bg-fd-popover text-fd-popover-foreground shadow-lg data-[state=closed]:animate-fd-dialog-out data-[state=open]:animate-fd-dialog-in',
        className,
      )}
      {...props}
    >
      {children}

    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setLoading(true)
      setQuery("")
      setSelectedIndex(0)
      fetch("/api/null-mdx/search")
        .then((res) => res.json())
        .then((data) => {
          setResults(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))

      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const handleSelect = useCallback(
    (result: SearchResult) => {
      router.push(result.path)
      onOpenChange(false)
    },
    [router, onOpenChange],
  )

  const filteredResults = results.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description?.toLowerCase().includes(query.toLowerCase()) ||
      r.slug.toLowerCase().includes(query.toLowerCase()), // Also search by slug
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filteredResults.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filteredResults.length) % filteredResults.length)
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault()
        handleSelect(filteredResults[selectedIndex])
      }
    },
    [filteredResults, selectedIndex, handleSelect],
  )

  const pageResults = filteredResults.filter((r) => r.type === "page")
  const docsResults = filteredResults.filter((r) => r.type === "docs")
  const blogResults = filteredResults.filter((r) => r.type === "blog")

  const getIcon = (type: string, slug: string) => {
    if (type === "page") {
      if (slug.includes("design")) return <Layout className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
      if (slug === "assets") return <ImageIcon className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
      return <Info className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
    }
    if (type === "docs") return <Book className="h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden="true" />
    return <FileText className="h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden="true" />
  }

  let globalIndex = -1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-border/40 bg-popover p-0 shadow-2xl sm:max-w-[520px]">
        <DialogHeader className="hidden">
          <DialogTitle>Search documentation</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col" onKeyDown={handleKeyDown}>
          <div className="flex items-center border-b border-border/40 px-3">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin text-muted-foreground/50" aria-hidden="true" />
            ) : (
              <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden="true" />
            )}
            <input
              ref={inputRef}
              placeholder="Search docs, blog, pages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 flex-1 border-0 bg-transparent text-[14px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0"
            />
            <kbd className="hidden rounded bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
              ESC
            </kbd>
          </div>
          <div className="max-h-[320px] overflow-y-auto p-2">
            {filteredResults.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-muted-foreground">
                {loading ? "Loading..." : "No results found."}
              </div>
            ) : (
              <>
                {pageResults.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                      Pages
                    </div>
                    {pageResults.map((result) => {
                      globalIndex++
                      const isSelected = globalIndex === selectedIndex
                      return (
                        <button
                          key={result.path}
                          onClick={() => handleSelect(result)}
                          className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] transition-colors duration-100 ${isSelected ? "bg-accent" : "hover:bg-accent"
                            }`}
                        >
                          {getIcon(result.type, result.slug)}
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">{result.title}</span>
                            {result.description && (
                              <span className="text-[12px] text-muted-foreground/70 line-clamp-1">
                                {result.description}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
                {docsResults.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                      Documentation
                    </div>
                    {docsResults.map((result) => {
                      globalIndex++
                      const isSelected = globalIndex === selectedIndex
                      return (
                        <button
                          key={result.path}
                          onClick={() => handleSelect(result)}
                          className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] transition-colors duration-100 ${isSelected ? "bg-accent" : "hover:bg-accent"
                            }`}
                        >
                          {getIcon(result.type, result.slug)}
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">{result.title}</span>
                            {result.description && (
                              <span className="text-[12px] text-muted-foreground/70 line-clamp-1">
                                {result.description}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
                {blogResults.length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                      Blog
                    </div>
                    {blogResults.map((result) => {
                      globalIndex++
                      const isSelected = globalIndex === selectedIndex
                      return (
                        <button
                          key={result.path}
                          onClick={() => handleSelect(result)}
                          className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] transition-colors duration-100 ${isSelected ? "bg-accent" : "hover:bg-accent"
                            }`}
                        >
                          {getIcon(result.type, result.slug)}
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">{result.title}</span>
                            {result.description && (
                              <span className="text-[12px] text-muted-foreground/70 line-clamp-1">
                                {result.description}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-border/40 px-3 py-2 text-[11px] text-muted-foreground/50">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted/50 px-1 py-0.5 text-[10px]">↑</kbd>
                <kbd className="rounded bg-muted/50 px-1 py-0.5 text-[10px]">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted/50 px-1 py-0.5 text-[10px]">↵</kbd>
                <span className="ml-1">Select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted/50 px-1 py-0.5 text-[10px]">ESC</kbd>
              <span className="ml-1">Close</span>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
