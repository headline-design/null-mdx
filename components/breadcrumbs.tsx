import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbsProps {
  items: { label: string; href?: string }[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-[13px]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/40" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground/70 transition-colors duration-100 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/90">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
