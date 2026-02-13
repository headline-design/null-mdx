import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
    prev?: { title: string; slug: string }
    next?: { title: string; slug: string }
}

export function BlogPagination({ prev, next }: BlogPaginationProps) {
    return (
        <nav className="@container grid gap-4 pb-6 grid-cols-2 mt-12 border-t pt-8">
            {prev ? (
                <Link
                    href={`/blog/${prev.slug}`}
                    className="flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-muted/80 hover:text-fd-accent-foreground @max-lg:col-span-full"
                >
                    <span className="flex items-center gap-1 text-muted-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </span>
                    <span className="font-medium text-foreground">{prev.title}</span>
                </Link>
            ) : (
                <div />
            )}
            {next ? (
                <Link
                    href={`/blog/${next.slug}`}
                    className="flex flex-col items-end gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-muted/80 hover:text-fd-accent-foreground @max-lg:col-span-full"
                >
                    <span className="flex items-center gap-1 text-muted-foreground">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-foreground">{next.title}</span>
                </Link>
            ) : (
                <div />
            )}
        </nav>
    )
}
