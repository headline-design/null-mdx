"use client"

import { Copy, MessageSquare, HelpCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface DocsRightSidebarProps {
  headings: TocItem[]
  activeId: string
  relatedLinks?: { label: string; href: string }[]
}

export function DocsRightSidebar({ headings, activeId }: DocsRightSidebarProps) {
  if (headings.length === 0) return null

  return (
    <aside
      id="null-toc"
      className="sticky top-[calc(3.5rem+32px)] hidden h-fit shrink-0 flex-col gap-2.5 overflow-x-hidden p-2 md:w-[256px] xl:flex 2xl:w-72"
    >
      <div className="relative min-h-0 text-sm ms-px overflow-auto scrollbar-hide py-3">
        <h3 className="inline-flex items-center gap-x-1.5 text-sm font-medium mb-2.5 text-foreground">
          <svg height="16" strokeLinejoin="round" style={{ width: "12px", height: "12px", color: "currentColor" }} viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM1 7H1.75H9.25H10V8.5H9.25H1.75H1V7ZM1 12H1.75H11.25H12V13.5H11.25H1.75H1V12Z" fill="currentColor"></path></svg>
          On this page
        </h3>
        <ul className="flex flex-col gap-y-2.5 text-sm text-muted-foreground">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                "transition-colors hover:text-foreground",
                heading.level === 3 && "pl-3"
              )}
            >
              <a
                data-active={activeId === heading.id}
                href={`#${heading.id}`}
                className="data-[active=true]:text-primary data-[active=true]:font-medium transition-colors"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
