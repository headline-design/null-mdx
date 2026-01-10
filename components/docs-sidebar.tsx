"use client"

import type React from "react"

import { useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { ContentItem } from "@/lib/content"

interface DocsSidebarProps {
  navigation: { section: string; items: ContentItem[] }[]
}

export function DocsSidebar({ navigation }: DocsSidebarProps) {
  const pathname = usePathname()
  const activeRef = useRef<HTMLAnchorElement>(null)

  // Auto scroll to active item
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center", behavior: "instant" })
    }
  }, [])

  return (
    <div className="text-sidebar-foreground group peer hidden md:block" data-state="expanded" data-collapsible="" data-variant="sidebar" data-side="left">
      <div className="inset-y-0 z-10 hidden w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l sticky left-auto top-[calc(var(--nav-height)+32px)] h-[calc(100svh-var(--nav-height)-64px)] justify-self-end border-none">
        <div data-sidebar="sidebar" className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow">
          <div dir="ltr" className="overflow-hidden h-full relative">
            <div className="size-full overflow-y-auto overflow-x-hidden scrollbar-hide mask-linear-gradient">
              <div data-sidebar="content" className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
                <div data-sidebar="group" className="relative flex w-full min-w-0 flex-col p-2 px-6">
                  <nav className="w-full min-w-0 flex flex-col gap-y-8 py-3">
                    {navigation.map((section) => (
                      <div key={section.section}>
                        <div data-sidebar="group-label" className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-4 px-3">
                          {section.section}
                        </div>
                        <ul className="flex flex-col gap-1">
                          {section.items.map((item) => {
                            const href = `/docs/${item.slug}`
                            const isActive = pathname === href
                            return (
                              <li key={item.slug} data-sidebar="menu-item" className="group/menu-item relative">
                                <Link
                                  href={href}
                                  className={cn(
                                    "flex h-9 w-full items-center justify-between rounded-xl px-3 text-[13.5px] transition-all duration-300",
                                    isActive
                                      ? "font-bold text-primary bg-primary/[0.03] ring-1 ring-primary/20 shadow-sm"
                                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                                  )}
                                >
                                  <span className="truncate">{item.meta.title}</span>
                                  {isActive && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-in fade-in zoom-in" />
                                  )}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
