"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown, ArrowUpCircle, Copy, Check, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { usePathname } from "next/navigation"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface DocsFooterProps {
    slug: string
}

export function DocsFooter({ slug }: DocsFooterProps) {
    const [isCopied, setIsCopied] = React.useState(false)
    const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false)
    const [feedbackMessage, setFeedbackMessage] = React.useState("")

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleCopyPage = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setIsCopied(true)
            toast.success("Link copied to clipboard")
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            toast.error("Failed to copy link")
        }
    }

    const handleFeedback = (type: "positive" | "negative") => {
        // Mock feedback submission
        setFeedbackSubmitted(true)
        toast.success("Thank you for your feedback!")
    }

    const editUrl = `${siteConfig.social.github}/edit/main/content/docs/${slug}.mdx`

    return (
        <footer className="mt-20 pt-8 border-t border-border/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left: Metadata Utilities */}
                <div className="flex flex-wrap items-center gap-6">
                    <a
                        href={editUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <Github className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="font-bold uppercase tracking-widest text-[11px]">Edit on GitHub</span>
                    </a>

                    <button
                        onClick={handleCopyPage}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        {isCopied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        )}
                        <span className="font-bold uppercase tracking-widest text-[11px]">Copy Link</span>
                    </button>

                    <button
                        onClick={handleScrollToTop}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowUpCircle className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="font-bold uppercase tracking-widest text-[11px]">Back to top</span>
                    </button>
                </div>

                {/* Right: Feedback */}
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50">Was this helpful?</span>
                    <div className="flex items-center gap-1.5">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="h-8 w-8 rounded-lg hover:bg-muted/50 text-muted-foreground/60 hover:text-foreground"
                                >
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-80 p-0 overflow-hidden border-border/40 rounded-xl shadow-2xl">
                                <div className="p-4 bg-muted/5 select-none">
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-1">Send Feedback</h4>
                                    <p className="text-xs text-muted-foreground">What was helpful about this page?</p>
                                </div>
                                <div className="p-4 space-y-4">
                                    <Textarea
                                        placeholder="Add more details (optional)..."
                                        className="min-h-[100px] bg-muted/20 border-border/40 rounded-lg text-sm focus:ring-1 focus:ring-primary/40 focus:border-primary/20 transition-all resize-none"
                                        value={feedbackMessage}
                                        onChange={(e) => setFeedbackMessage(e.target.value)}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="sm"
                                            className="h-8 rounded-lg font-bold uppercase tracking-widest text-[10px]"
                                            onClick={() => handleFeedback("positive")}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="h-8 w-8 rounded-lg hover:bg-muted/50 text-muted-foreground/60 hover:text-destructive transition-colors"
                                >
                                    <ThumbsDown className="h-3.5 w-3.5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-80 p-0 overflow-hidden border-border/40 rounded-xl shadow-2xl">
                                <div className="p-4 bg-muted/5 select-none">
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-1 text-destructive">Improvment needed?</h4>
                                    <p className="text-xs text-muted-foreground">How can we make this page better?</p>
                                </div>
                                <div className="p-4 space-y-4">
                                    <Textarea
                                        placeholder="Tell us what's wrong or missing..."
                                        className="min-h-[100px] bg-muted/20 border-border/40 rounded-lg text-sm focus:ring-1 focus:ring-destructive/40 focus:border-destructive/20 transition-all resize-none"
                                        value={feedbackMessage}
                                        onChange={(e) => setFeedbackMessage(e.target.value)}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="h-8 rounded-lg font-bold uppercase tracking-widest text-[10px]"
                                            onClick={() => handleFeedback("negative")}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </footer>
    )
}
