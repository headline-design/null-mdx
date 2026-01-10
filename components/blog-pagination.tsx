import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
    prev?: { title: string; slug: string }
    next?: { title: string; slug: string }
}

export function BlogPagination({ prev, next }: BlogPaginationProps) {
    return (
        <nav className="@container grid gap-4 mb-24 grid-cols-2 mt-20 border-t border-border/10 pt-16">
            {prev ? (
                <Link
                    href={`/blog/${prev.slug}`}
                    className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-muted/[0.02] p-6 text-sm transition-all hover:bg-muted/[0.05] hover:border-border/60 group @max-lg:col-span-full"
                >
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        Previous Article
                    </span>
                    <span className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{prev.title}</span>
                </Link>
            ) : (
                <div />
            )}
            {next ? (
                <Link
                    href={`/blog/${next.slug}`}
                    className="flex flex-col items-end gap-2 rounded-2xl border border-border/40 bg-muted/[0.02] p-6 text-sm transition-all hover:bg-muted/[0.05] hover:border-border/60 group @max-lg:col-span-full text-right"
                >
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                        Next Article
                        <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{next.title}</span>
                </Link>
            ) : (
                <div />
            )}
        </nav>
    )
}
