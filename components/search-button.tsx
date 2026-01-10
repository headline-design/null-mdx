"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { SearchDialog } from "./search-dialog"
import { Kbd } from "./ui/kbd"

export function SearchButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative flex h-9 w-full items-center justify-between rounded-xl border border-border/40 bg-muted/20 px-3 text-sm text-muted-foreground/60 transition-all hover:bg-muted/40 hover:text-foreground md:w-64"
        aria-label="Search"
      >
        <div className="flex items-center gap-2.5">
          <Search className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="font-medium tracking-tight whitespace-nowrap text-xs hidden sm:block">Search or type a command...</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
          <Kbd className="bg-background/80 border-border/40 text-[10px] h-4.5 min-w-[18px] px-1 font-bold">⌘</Kbd>
          <Kbd className="bg-background/80 border-border/40 text-[10px] h-4.5 min-w-[18px] px-1 font-bold">K</Kbd>
        </div>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
