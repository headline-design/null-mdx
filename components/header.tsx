"use client"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { SearchButton } from "./search-button"

export function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      id="null-nav"
      className={cn(
        "items-center w-full sticky top-0 z-40 flex justify-between px-3 sm:px-2 border-b transition-colors duration-150 h-[51px] bg-sidebar",
        isScrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="hidden">HEADER_UPDATED</div>
      <div className="flex w-full mx-auto xl:px-0">
        <div className="flex items-center gap-x-2 pr-2.5">
          <a data-testid="header-logo" className="px-1 py-1" href="/">
            <span className="sr-only">Home</span>
            {siteConfig.logo}
          </a>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <div className="hidden md:flex flex-1 items-center gap-4 justify-between">
            <nav aria-label="Main" className="group/navigation-menu absolute pointer-events-none [&>*]:pointer-events-auto inset-x-0 flex justify-center">
              <div style={{ position: 'relative' }}>
                <ul className="group flex flex-1 list-none items-center justify-center gap-1">
                  {siteConfig.topNav.map((item) => (
                    <li key={item.href} className="relative">
                      <a
                        href={item.href}
                        data-active={pathname === item.href}
                        className={cn(
                          "relative text-sm font-medium transition-colors gap-1",
                          pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/")
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                          item.activated ? "flex" : "hidden"
                        )}
                      >
                        {item.label}
                        {pathname === item.href && (
                          <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-foreground rounded-full" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <div className="ml-auto flex gap-2 items-center"></div>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[350px] bg-background/95 backdrop-blur-xl border-l border-border/40 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 px-6 h-[51px] border-b border-border/20">
                  <div className="scale-75 origin-left">
                    {siteConfig.logo}
                  </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-8" aria-label="Mobile navigation">
                  <div>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-6">Main Menu</h2>
                    <div className="flex flex-col gap-2">
                      {siteConfig.nav.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/")
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center justify-between group rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                              isActive
                                ? "bg-primary/[0.03] text-primary ring-1 ring-primary/20 shadow-sm"
                                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                            )}
                          >
                            {item.label}
                            {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-in fade-in zoom-in" />}
                          </a>
                        )
                      })}
                    </div>
                  </div>

                  {siteConfig.topNav && siteConfig.topNav.length > 0 && (
                    <div>
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-6">Explore</h2>
                      <div className="flex flex-col gap-2">
                        {siteConfig.topNav.filter(i => i.activated).map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center justify-between group rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                                isActive
                                  ? "bg-primary/[0.03] text-primary ring-1 ring-primary/20 shadow-sm"
                                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                              )}
                            >
                              {item.label}
                              {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-in fade-in zoom-in" />}
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </nav>

                <div className="p-6 border-t border-border/10 bg-muted/[0.02]">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[12px] font-medium text-muted-foreground/50">
                      © {new Date().getFullYear()} Null MDX
                    </p>
                    <div className="flex gap-2">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-2">
          {/*Search Button matching visual */}
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
