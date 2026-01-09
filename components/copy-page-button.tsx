"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyPageButtonProps {
  content: string
  className?: string
}

export function CopyPageButton({ content, className }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy page markdown to clipboard"}
      className={cn(
        "text-sm text-muted-foreground hover:bg-muted/50 flex cursor-pointer items-center gap-2 rounded-full px-2 py-2 font-medium transition-colors duration-100 md:py-1.5 md:pl-2.5",
        className
      )}
    >
      <span className="shrink-0">
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </span>
      <span className="max-md:hidden">{copied ? "Copied!" : "Copy page"}</span>
    </button>
  )
}