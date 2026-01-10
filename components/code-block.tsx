"use client"

import type React from "react"
import { CopyButton } from "./copy-button"
import { cn } from "@/lib/utils"
import { Terminal, FileCode } from "lucide-react"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  children,
  className,
  filename,
  showLineNumbers = true,
  ...props
}: CodeBlockProps & React.HTMLAttributes<HTMLPreElement>) {

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
    <figure className={cn(
      "group relative my-6 overflow-hidden rounded-lg border bg-[#0d1117] text-[13px] shadow-sm",
      "not-prose" // Prevent typography styles from messing it up
    )}>
      {(displayTitle || language) && (
        <div className="flex items-center justify-between border-b border-border/10 bg-white/[0.02] px-3 py-2">
          <div className="flex items-center gap-2">
            {filename ? <FileCode className="h-3.5 w-3.5 text-muted-foreground/50" /> : <Terminal className="h-3.5 w-3.5 text-muted-foreground/50" />}
            <span className="text-[12px] font-medium text-muted-foreground/70">
              {displayTitle || language}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton text={text} className="h-6 w-6 opacity-50 hover:opacity-100 hover:bg-white/5" />
          </div>
        </div>
      )}

      {!displayTitle && !language && (
        <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton text={text} className="h-7 w-7 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10" />
        </div>
      )}

      <div className={cn(
        "relative overflow-hidden",
        showLineNumbers && "with-line-numbers"
      )}>
        <pre
          className={cn(
            "overflow-x-auto p-4 font-mono leading-relaxed scrollbar-thin",
            "bg-transparent !bg-none text-[13px]",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </figure>
  )
}
