"use client"

import type React from "react"
import { CopyButton } from "./copy-button"
import { cn } from "@/lib/utils"
import { Terminal } from "lucide-react"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  filename?: string
}

export function CodeBlock({ children, className, filename, ...props }: CodeBlockProps & React.HTMLAttributes<HTMLPreElement>) {
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node
    if (typeof node === "number") return String(node)
    if (!node) return ""
    if (Array.isArray(node)) return node.map(getTextContent).join("")
    if (typeof node === "object" && "props" in node) {
      //@ts-ignore
      return getTextContent(node.props.children)
    }
    return ""
  }

  const text = getTextContent(children)
  const language = className?.match(/language-(\w+)/)?.[1]
  const displayTitle = filename || (props as any).title

  if (!text || text.trim() === "") {
    return null
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-[#0d1117] text-[13px] shadow-sm transition-all hover:shadow-md">
      {(displayTitle || language) && (
        <div className="flex items-center justify-between border-b border-white/[0.04] bg-white/[0.02] px-4 py-2">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span className="text-[11px] font-semibold text-muted-foreground/60 tracking-tight">
              {displayTitle || language}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton text={text} className="h-6 w-6 opacity-30 hover:opacity-100 transition-opacity bg-transparent hover:bg-white/5 border-none" />
          </div>
        </div>
      )}
      {!displayTitle && !language && (
        <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton text={text} className="h-7 w-7 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10" />
        </div>
      )}
      <div className="relative">
        <pre
          className={cn(
            "overflow-x-auto p-4 font-mono leading-relaxed scrollbar-thin selection:bg-white/10 not-prose",
            "bg-transparent !bg-none",

            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}
