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
                        className={cn("text-foreground/80 font-medium data-[active=true]:bg-muted data-[active=true]:text-foreground hover:bg-muted focus:bg-muted hover:text-foreground focus:text-foreground focus-visible:ring-ring/50 flex-col gap-1 rounded-md px-2 py-1 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                          item.activated ? "flex" : "hidden"
                        )}
                      >
                        {item.label}
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
              <button
                className="focus:border-input focus-visible:border-input disabled:border-input border-input hover:border-input focus-visible:ring-offset-background outline-none has-[focus-visible]:ring-2 inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border font-medium transition focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:ring-0 [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0 bg-secondary text-foreground hover:bg-muted focus:bg-muted focus-visible:bg-muted px-3 text-sm has-[>kbd]:gap-2 has-[>svg]:px-2 has-[>kbd]:pr-[6px] rounded-lg md:hidden size-7"
                aria-label="Open menu"
                type="button"
              >
                <svg height="16" strokeLinejoin="round" style={{ color: "currentColor" }} viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M1.75 4H1V5.5H1.75H14.25H15V4H14.25H1.75ZM1.75 10.5H1V12H1.75H14.25H15V10.5H14.25H1.75Z" fill="currentColor"></path></svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-0">
              <div className="flex flex-col gap-4 p-4 pt-12">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {siteConfig.nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm transition-colors",
                        pathname === item.href ||
                          (pathname.startsWith(item.href + "/") &&
                            !(item.href === "/docs" && pathname.startsWith("/docs/api")))
                          ? "font-medium text-foreground bg-accent"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
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
