import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DocsPaginationProps {
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}

export function DocsPagination({ prev, next }: DocsPaginationProps) {
  return (
    <div className="@container grid gap-4 pb-12 grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-muted/[0.02] p-6 text-sm transition-all hover:bg-muted/[0.05] hover:border-border/60 group @max-lg:col-span-full"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary transition-colors">
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </span>
          <span className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex flex-col items-end gap-2 rounded-2xl border border-border/40 bg-muted/[0.02] p-6 text-sm transition-all hover:bg-muted/[0.05] hover:border-border/60 group @max-lg:col-span-full text-right"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary transition-colors">
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
