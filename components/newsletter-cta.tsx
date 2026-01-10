"use client"

import * as React from "react"
import { toast } from "sonner"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsletterCTAProps {
    className?: string
    variant?: "default" | "minimal"
}

export function NewsletterCTA({ className, variant = "default" }: NewsletterCTAProps) {
    const [email, setEmail] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        toast.success("Welcome to the digest!")
        setEmail("")
        setIsSubmitting(false)
    }

    if (variant === "minimal") {
        return (
            <div className={cn("max-w-xl mx-auto text-center", className)}>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Stay updated</h2>
                <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
                    Get the latest articles, design tips, and template updates delivered directly to your inbox. No spam, ever.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 h-11 bg-muted/20 border border-border/40 rounded-xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/20 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-11 px-8 bg-foreground text-background font-bold uppercase tracking-widest text-[11px] rounded-xl hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>
                <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground/40 font-bold">
                    Join 2,000+ developers reading Sora's weekly digest.
                </p>
            </div>
        )
    }

    return (
        <div className={cn("relative overflow-hidden rounded-2xl border border-border/40 bg-muted/[0.02] p-8 md:p-12", className)}>
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight">Join the stream.</h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                        Occasional updates on engineering, design, and AI. No noise, just signal.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 flex-1 rounded-xl border border-border/40 bg-background/50 px-4 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/20"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-11 flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-[11px] font-bold uppercase tracking-widest text-background transition-all hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-50"
                    >
                        <span>Subscribe</span>
                        <Send className="h-3.5 w-3.5" />
                    </button>
                </form>
            </div>
            {/* Visual flare */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-50" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-30" />
        </div>
    )
}
