"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { SearchDialog } from "./search-dialog"

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
        className="focus:border-input focus-visible:border-input disabled:border-input border-input hover:border-input focus-visible:ring-offset-background outline-none has-[focus-visible]:ring-2 inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border font-medium transition focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:ring-0 [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0 bg-secondary text-foreground hover:bg-muted focus:bg-muted focus-visible:bg-muted px-3 text-sm has-[>kbd]:gap-2 has-[>svg]:px-2 has-[>kbd]:pr-[6px] rounded-lg hover:text-foreground! h-7 group hidden font-normal text-muted-foreground md:flex" aria-label="Search…">
        <div className="text-start pr-3">Search…</div>
        <kbd className="group-hover:border-input flex h-5 w-fit items-center justify-center px-2 gap-2 rounded-[6px] border border-border font-sans text-xs"><span>/</span></kbd>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
