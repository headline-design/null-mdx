"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface BlogTOCProps {
    source: string
}

interface Heading {
    id: string
    text: string
    level: number
}

export function BlogTableOfContents({ source }: BlogTOCProps) {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        // Parse headings from source
        const lines = source.split("\n")
        const extractedHeadings: Heading[] = []

        // Regex to match ## and ### headings
        const headingRegex = /^(#{2,3})\s+(.+)$/

        const generateSlug = (text: string) => {
            return text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/^-+|-+$/g, "")
        }

        lines.forEach((line) => {
            const match = line.match(headingRegex)
            if (match) {
                const level = match[1].length
                const text = match[2].trim()
                const id = generateSlug(text)
                extractedHeadings.push({ id, text, level })
            }
        })

        setHeadings(extractedHeadings)
    }, [source])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "-100px 0px -66% 0px" }
        )

        headings.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) {
        return null
    }

    return (
        <nav className="space-y-4">
            <h3 className="font-bold text-foreground tracking-tight text-sm uppercase text-muted-foreground/70">On this page</h3>
            <ul className="space-y-3 text-[14px]">
                {headings.map((heading) => (
                    <li key={heading.id} className={cn("pl-0 border-l-2 transition-colors",
                        activeId === heading.id ? "border-primary" : "border-transparent",
                        heading.level === 3 ? "ml-4" : ""
                    )}>
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block leading-snug transition-colors pl-3",
                                activeId === heading.id
                                    ? "font-medium text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                })
                                setActiveId(heading.id)
                                window.history.pushState(null, "", `#${heading.id}`)
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
