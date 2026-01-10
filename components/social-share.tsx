"use client"

import { Twitter, Linkedin, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"

interface SocialShareProps {
    title: string
    url: string
}

export function SocialShare({ title, url }: SocialShareProps) {
    const encodedTitle = encodeURIComponent(title)
    const encodedUrl = encodeURIComponent(url)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard")
    }

    return (
        <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/30">Share Article</span>
            <div className="flex gap-2.5">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-muted/5 hover:bg-muted/10 transition-all active:scale-[0.98]"
                    title="Share on X"
                >
                    <Twitter className="h-4 w-4 text-foreground/60" />
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-muted/5 hover:bg-muted/10 transition-all active:scale-[0.98]"
                    title="Share on LinkedIn"
                >
                    <Linkedin className="h-4 w-4 text-foreground/60" />
                </a>
                <button
                    onClick={copyToClipboard}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-muted/5 hover:bg-muted/10 transition-all active:scale-[0.98]"
                    title="Copy link"
                >
                    <LinkIcon className="h-4 w-4 text-foreground/60" />
                </button>
            </div>
        </div>
    )
}
