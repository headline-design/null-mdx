"use client"

import * as React from "react"
import { MessageSquare, Send, X, Bot, User, Sparkles, Paperclip, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
}

const SUGGESTIONS = [
    "Summarize this article",
    "Explain the key concepts",
    "What are the main takeaways?",
    "Find related topics"
]

const PERSISTENCE_KEY = "null_mdx_ask_ai_messages"

export function AskAI() {
    const [open, setOpen] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const [input, setInput] = React.useState("")
    const [messages, setMessages] = React.useState<Message[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [isAttached, setIsAttached] = React.useState(false)

    // Handle initial mount
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Listen for global trigger
    React.useEffect(() => {
        const handleOpen = (e: any) => {
            setOpen(true)
            if (e.detail?.query) {
                setInput(e.detail.query)
                // Auto-submit for a more responsive feel
                handleSubmit(e.detail.query)
            }
        }
        window.addEventListener('open-ask-ai', handleOpen)
        return () => window.removeEventListener('open-ask-ai', handleOpen)
    }, [])

    // Load messages from localStorage on mount
    React.useEffect(() => {
        const saved = localStorage.getItem(PERSISTENCE_KEY)
        if (saved) {
            try {
                setMessages(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to load saved messages", e)
            }
        }
    }, [])

    // Save messages to localStorage when they change
    React.useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(messages))
        }
    }, [messages])

    const handleClear = () => {
        setMessages([])
        localStorage.removeItem(PERSISTENCE_KEY)
    }

    const handleSubmit = async (text?: string) => {
        const content = text || input
        if (!content.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: content
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsAttached(false)
        setIsLoading(true)

        // Mock AI response for now
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "This is a placeholder response. In a production environment, this would connect to an AI provider to answer questions about the current page content."
            }
            setMessages(prev => [...prev, aiMessage])
            setIsLoading(false)
        }, 1000)
    }

    if (!mounted) {
        return null
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 hover:text-foreground transition-colors group">
                    <svg className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    Ask AI
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0 border-border/40 overflow-hidden">
                <DialogHeader className="p-4 border-b border-border/40 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        <DialogTitle className="text-sm font-bold uppercase tracking-widest">Ask Assistant</DialogTitle>
                    </div>
                    {messages.length > 0 && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground/40 hover:text-destructive transition-colors"
                            onClick={handleClear}
                            title="Clear Chat"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </DialogHeader>

                <ScrollArea className="flex-1 p-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center pt-10">
                            <Bot className="h-10 w-10 text-muted-foreground/20 mb-4" />
                            <h3 className="text-lg font-bold tracking-tight mb-2">How can I help?</h3>
                            <p className="text-sm text-muted-foreground max-w-[280px] mb-8">
                                I can summarize this article, explain concepts, or find specific details for you.
                            </p>
                            <div className="grid grid-cols-1 gap-2 w-full max-w-[320px]">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSubmit(s)}
                                        className="text-left px-4 py-3 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/40 transition-colors text-[13px] font-medium"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((m) => (
                                <div key={m.id} className={cn(
                                    "flex gap-3",
                                    m.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}>
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center border border-border/40",
                                        m.role === "user" ? "bg-muted" : "bg-primary/5 text-primary"
                                    )}>
                                        {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                                        m.role === "user"
                                            ? "bg-foreground text-background"
                                            : "bg-muted/30 border border-border/40 text-foreground"
                                    )}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="h-8 w-8 rounded-full flex items-center justify-center border border-border/40 bg-primary/5 text-primary">
                                        <Bot className="h-4 w-4 animate-pulse" />
                                    </div>
                                    <div className="bg-muted/30 border border-border/40 rounded-2xl px-4 py-2.5">
                                        <div className="flex gap-1">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </ScrollArea>

                <div className="p-4 border-t border-border/40 bg-muted/5">
                    {isAttached && (
                        <div className="mb-3 px-3 py-2 rounded-lg bg-background border border-border/40 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
                            <span className="flex items-center gap-2">
                                <Paperclip className="h-3 w-3" />
                                page_context.md
                            </span>
                            <button onClick={() => setIsAttached(false)} className="hover:text-foreground">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                        className="relative flex flex-col border border-border/40 rounded-xl bg-background overflow-hidden focus-within:ring-1 focus-within:ring-primary/40 transition-all"
                    >
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="w-full bg-transparent px-4 py-3 pr-24 text-sm focus:outline-none resize-none h-[46px] min-h-[46px] max-h-32"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit()
                                }
                            }}
                        />
                        <div className="absolute right-1.5 bottom-1.5 flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setIsAttached(true)}
                                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground/60"
                            >
                                <Paperclip className="h-4 w-4" />
                            </button>
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!input.trim() || isLoading}
                                className="h-8 w-8 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all disabled:opacity-30"
                            >
                                <Send className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
