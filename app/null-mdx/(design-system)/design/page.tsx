"use client"

import * as React from "react"
import { Installer } from "@/components/installer"
import { TypeTable } from "@/components/type-table"
import { CodeTabs, CodeTabsList, CodeTabsTrigger, CodeTabsContent } from "@/components/code-tabs"
import { Mermaid } from "@/components/mermaid"
import { AskAI } from "@/components/ask-ai"
import { Video } from "@/components/video"
import { ChevronRight, FileText, BookOpen, ArrowRight, Layout, Palette, Type, Box, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { isAIEnabled } from "@/lib/site-config"

const templates = [
  {
    title: "Documentation Entry",
    description: "A polished landing page for documentation with search, quick links, and categorized navigation.",
    href: "/docs", // Updated to actual docs route
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Blog Entry",
    description: "A full-featured blog landing with featured posts, category filters, and newsletter signup.",
    href: "/blog", // Updated to actual blog route
    icon: FileText,
    color: "bg-purple-500/10 text-purple-500",
  },
]

export default function DesignPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Design System</span>
        </nav>

        <header className="mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Null MDX Design System
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Visual Language
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-medium tracking-tight">
            A collection of premium components and patterns used to build the null-mdx experience.
          </p>
        </header>

        <section className="space-y-32">
          {/* Page Templates Section */}
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Page Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <Link
                  key={template.href}
                  href={template.href}
                  className="group relative block p-8 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300 active:scale-[0.99]"
                >
                  <div className="flex flex-col gap-6">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110", template.color)}>
                      <template.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                        {template.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Installer Section */}
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8">Installer</h2>
            <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
              A minimalist command-line snippet utility with copy-to-clipboard functionality and toast notifications.
            </p>
            <Installer command="pnpm add @null-mdx/core" />
          </div>

          {/* TypeTable Section */}
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8 flex items-center gap-2">
              <Type className="w-4 h-4" />
              TypeTable
            </h2>
            <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
              Structured documentation for props and interfaces with high-contrast typography and responsive layout.
            </p>
            <TypeTable
              type={{
                command: {
                  type: "string",
                  description: "The command to be displayed and copied.",
                  default: '""',
                },
                title: {
                  type: "string",
                  description: "Optional title for the component header.",
                },
              }}
            />
          </div>

          {/* CodeTabs Section */}
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8">CodeTabs</h2>
            <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
              Sleek, border-bottom tabs for displaying multiple code variants, languages, or snippets in a compact view.
            </p>
            <CodeTabs defaultValue="next">
              <CodeTabsList>
                <CodeTabsTrigger value="next">Next.js</CodeTabsTrigger>
                <CodeTabsTrigger value="vite">Vite</CodeTabsTrigger>
                <CodeTabsTrigger value="remix">Remix</CodeTabsTrigger>
              </CodeTabsList>
              <CodeTabsContent value="next">
                <pre className="p-4 bg-muted/20 text-[13px] font-mono rounded-lg">npx create-next-app@latest</pre>
              </CodeTabsContent>
              <CodeTabsContent value="vite">
                <pre className="p-4 bg-muted/20 text-[13px] font-mono rounded-lg">npm create vite@latest</pre>
              </CodeTabsContent>
              <CodeTabsContent value="remix">
                <pre className="p-4 bg-muted/20 text-[13px] font-mono rounded-lg">npx create-remix@latest</pre>
              </CodeTabsContent>
            </CodeTabs>
          </div>

          {/* Mermaid Section */}
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Mermaid Diagrams
            </h2>
            <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
              Dynamic rendering of technical diagrams and flowcharts directly within MDX content.
            </p>
            <Mermaid chart={`
graph LR
    A[Input] --> B(Process)
    B --> C{Decision}
    C -->|Yes| D[Result]
    C -->|No| E[Retry]
                        `} />
          </div>

          {/* Video Section */}
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Premium Video Player
            </h2>
            <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
              A Null MDX-styled responsive video wrapper with custom controls and premium overlays for MDX content.
            </p>
            <Video
              src="https://framerusercontent.com/assets/7mDToL9pLp2q8L9D4L1.mp4"
              caption="Demonstrating the premium video component with custom controls."
            />
          </div>

          {/* AskAI Section */}
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8">AI Assistant Overlay</h2>
            <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
              A sophisticated chat dialog designed for contextual AI interactions across the blog and docs.
            </p>
            <div className="flex items-center gap-4 p-8 border border-dashed border-border/40 rounded-2xl bg-muted/5">
              {isAIEnabled() && <AskAI />}
              <span className="text-sm font-medium text-muted-foreground/60 uppercase tracking-widest text-[11px]">Click to launch context-aware bot</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
