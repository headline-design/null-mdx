"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Send } from "lucide-react"

export function NewsletterCTA() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        toast.success("Thanks for subscribing!")
        setEmail("")
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/30 p-8 md:p-10">
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-md space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">Stay in the loop</h3>
                    <p className="text-muted-foreground">
                        Get the latest articles and updates delivered straight to your inbox. No spam, ever.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-10 flex-1 rounded-lg border border-border/40 bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                        type="submit"
                        className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <span>Subscribe</span>
                        <Send className="h-3.5 w-3.5" />
                    </button>
                </form>
            </div>
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        </div>
    )
}
