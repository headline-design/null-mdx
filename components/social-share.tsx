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
        <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Share this post</span>
            <div className="flex gap-2">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border/40 hover:bg-muted transition-colors"
                    title="Share on X"
                >
                    <Twitter className="h-4 w-4" />
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border/40 hover:bg-muted transition-colors"
                    title="Share on LinkedIn"
                >
                    <Linkedin className="h-4 w-4" />
                </a>
                <button
                    onClick={copyToClipboard}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border/40 hover:bg-muted transition-colors"
                    title="Copy link"
                >
                    <LinkIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
