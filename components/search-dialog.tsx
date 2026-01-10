"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  FileText,
  Book,
  Layout,
  ImageIcon,
  Info,
  Search,
  Plus,
  Moon,
  Sun,
  Monitor,
  Home,
  Sparkles,
  ArrowRight,
  Loader2
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { isAIEnabled } from "@/lib/site-config"

interface SearchResult {
  slug: string
  title: string
  description?: string
  type: "blog" | "docs" | "page"
  path: string
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [recent, setRecent] = React.useState<SearchResult[]>([])

  // Load initial data and recent searches
  React.useEffect(() => {
    if (open) {
      setLoading(true)
      fetch("/api/null-mdx/search")
        .then((res) => res.json())
        .then((data) => {
          setResults(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))

      const saved = localStorage.getItem("null_mdx_recent_searches")
      if (saved) {
        try {
          setRecent(JSON.parse(saved).slice(0, 3))
        } catch (e) {
          console.error("Failed to load recent searches", e)
        }
      }
    }
  }, [open])

  const runCommand = React.useCallback((command: () => void) => {
    onOpenChange(false)
    command()
  }, [onOpenChange])

  const handleSelect = React.useCallback((result: SearchResult) => {
    // Save to recent
    const newRecent = [result, ...recent.filter(r => r.path !== result.path)].slice(0, 3)
    setRecent(newRecent)
    localStorage.setItem("null_mdx_recent_searches", JSON.stringify(newRecent))

    runCommand(() => router.push(result.path))
  }, [router, runCommand, recent])

  const filteredResults = results.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description?.toLowerCase().includes(query.toLowerCase())
  )

  const pageResults = filteredResults.filter((r) => r.type === "page")
  const docsResults = filteredResults.filter((r) => r.type === "docs")
  const blogResults = filteredResults.filter((r) => r.type === "blog")

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="scrollbar-thin">
        <CommandEmpty className="py-12 text-center">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
              <p className="text-sm font-medium text-muted-foreground/60">Searching the indices...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Search className="h-8 w-8 text-muted-foreground/20" />
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/40">No results found</p>
              <p className="text-xs text-muted-foreground/30">Try a different keyword or browse actions.</p>
            </div>
          )}
        </CommandEmpty>

        {/* AI Action */}
        {query.length > 0 && isAIEnabled() && (
          <CommandGroup heading="Intelligence">
            <CommandItem
              value={`ask-ai-${query}`}
              onSelect={() => {
                runCommand(() => {
                  window.dispatchEvent(new CustomEvent('open-ask-ai', { detail: { query } }))
                })
              }}
              className="py-3 text-primary"
            >
              <Sparkles className="mr-3 h-4 w-4" />
              <span>Ask AI about "{query}"</span>
              <CommandShortcut className="text-primary/40">AI</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        )}

        {/* Recent Items */}
        {query.length === 0 && recent.length > 0 && (
          <CommandGroup heading="Recent">
            {recent.map((item) => (
              <CommandItem
                key={item.path}
                onSelect={() => handleSelect(item)}
                className="py-3"
              >
                <Info className="mr-3 h-4 w-4 opacity-40" />
                <span>{item.title}</span>
                <CommandShortcut className="opacity-40">Recent</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Pages */}
        {pageResults.length > 0 && (
          <CommandGroup heading="Navigation">
            {pageResults.map((result) => (
              <CommandItem
                key={result.path}
                onSelect={() => handleSelect(result)}
                className="py-3"
              >
                <Layout className="mr-3 h-4 w-4 opacity-40" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{result.title}</span>
                  {result.description && <span className="text-[11px] text-muted-foreground/60">{result.description}</span>}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Docs */}
        {docsResults.length > 0 && (
          <CommandGroup heading="Documentation">
            {docsResults.map((result) => (
              <CommandItem
                key={result.path}
                onSelect={() => handleSelect(result)}
                className="py-3"
              >
                <Book className="mr-3 h-4 w-4 opacity-40" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{result.title}</span>
                  {result.description && <span className="text-[11px] text-muted-foreground/60">{result.description}</span>}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Blog */}
        {blogResults.length > 0 && (
          <CommandGroup heading="Blog">
            {blogResults.map((result) => (
              <CommandItem
                key={result.path}
                onSelect={() => handleSelect(result)}
                className="py-3"
              >
                <FileText className="mr-3 h-4 w-4 opacity-40" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{result.title}</span>
                  {result.description && <span className="text-[11px] text-muted-foreground/60">{result.description}</span>}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandSeparator />

        {/* Actions */}
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))} className="py-3">
            <Home className="mr-3 h-4 w-4 opacity-40" />
            <span>Go to Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))} className="py-3">
            <Sun className="mr-3 h-4 w-4 opacity-40" />
            <span>Switch to Light Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))} className="py-3">
            <Moon className="mr-3 h-4 w-4 opacity-40" />
            <span>Switch to Dark Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))} className="py-3">
            <Monitor className="mr-3 h-4 w-4 opacity-40" />
            <span>System Theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
