"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import type { ContentItem } from "@/lib/content"

interface BlogSidebarProps {
    posts: ContentItem[]
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentTag = searchParams.get("tag")
    const activeRef = useRef<HTMLAnchorElement>(null)

    // Group posts by year
    const groupedPosts = posts.reduce((acc, post) => {
        const year = post.meta.date ? new Date(post.meta.date).getFullYear().toString() : "Unknown"
        if (!acc[year]) acc[year] = []
        acc[year].push(post)
        return acc
    }, {} as Record<string, ContentItem[]>)

    const years = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a))

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
                                    <header className="mb-4 mt-2">
                                        <h2 className="text-sm font-semibold text-foreground px-2">Writing</h2>
                                    </header>
                                    <nav className="w-full min-w-0 flex flex-col gap-y-8 py-3">
                                        <div>
                                            <div data-sidebar="group-label" className="text-foreground flex h-auto w-full items-center px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-100 mb-2.5">
                                                Topics
                                            </div>
                                            <ul className="flex flex-col gap-1">
                                                <li>
                                                    <Link
                                                        href="/blog"
                                                        className={cn(
                                                            "flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-muted/50 hover:text-foreground",
                                                            !currentTag ? "font-medium text-foreground bg-accent" : "text-muted-foreground"
                                                        )}
                                                    >
                                                        All Posts
                                                    </Link>
                                                </li>
                                                {["Introduction", "Tech", "AI", "Design"].map((topic) => {
                                                    const isActive = currentTag?.toLowerCase() === topic.toLowerCase()
                                                    return (
                                                        <li key={topic} className="group/menu-item relative">
                                                            <Link
                                                                href={`/blog?tag=${topic.toLowerCase()}`}
                                                                className={cn(
                                                                    "flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-muted/50 hover:text-foreground",
                                                                    isActive ? "font-medium text-foreground bg-accent" : "text-muted-foreground"
                                                                )}
                                                            >
                                                                {topic}
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>

                                        {years.map((year) => (
                                            <div key={year}>
                                                <div data-sidebar="group-label" className="text-foreground flex h-auto w-full items-center px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-100 mb-2.5">
                                                    {year}
                                                </div>
                                                <ul className="flex flex-col gap-1">
                                                    {groupedPosts[year].map((post) => {
                                                        const href = `/blog/${post.slug}`
                                                        const isActive = pathname === href
                                                        return (
                                                            <li key={post.slug} data-sidebar="menu-item" className="group/menu-item relative">
                                                                <Link
                                                                    href={href}
                                                                    ref={isActive ? activeRef : null}
                                                                    className={cn(
                                                                        "flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-muted/50 hover:text-foreground",
                                                                        isActive ? "font-medium text-foreground bg-accent" : "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <span className="truncate">{post.meta.title}</span>
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
