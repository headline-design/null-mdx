"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import type { ContentItem } from "@/lib/content"

interface DocsMobileNavProps {
  navigation: { section: string; items: ContentItem[] }[]
}

export function DocsMobileNav({ navigation }: DocsMobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex h-(--mobile-menu-height) w-full items-center gap-x-2 text-gray-1000">          <Menu className="mr-1.5 h-4 w-4" />
          Menu
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-border/40 bg-background p-0">
        <SheetTitle className="sr-only">Documentation Navigation</SheetTitle>
        <nav className="p-6">
          <div className="space-y-6">
            {navigation.map((section) => (
              <div key={section.section}>
                <h4 className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/40">
                  {section.section}
                </h4>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const href = `/docs/${item.slug}`
                    const isActive = pathname === href

                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block py-1.5 text-[14px] transition-colors duration-100",
                            isActive ? "font-medium text-primary" : "text-foreground/60 hover:text-foreground",
                          )}
                        >
                          {item.meta.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
