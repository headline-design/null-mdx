import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DocsPaginationProps {
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}

export function DocsPagination({ prev, next }: DocsPaginationProps) {
  return (
    <div className="@container grid gap-4 pb-6 grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-muted/80 hover:text-fd-accent-foreground @max-lg:col-span-full"
        >
          <ChevronLeft className="h-4 w-4" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="font-medium text-foreground">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-muted/80 hover:text-fd-accent-foreground @max-lg:col-span-full"
        >
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="font-medium text-foreground">{next.title}</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
