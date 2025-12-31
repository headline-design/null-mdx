import Link from "next/link"
import Image from "next/image"
import { getOptimizedImageUrl } from "@/lib/supabase/storage"
import { cn } from "@/lib/utils"
import type { ContentItem } from "@/lib/content"

import { calculateReadingTime } from "@/lib/utils/reading-time"

interface BlogCardProps {
  post: ContentItem
  featured?: boolean
}

export function BlogCard({ post, featured }: BlogCardProps) {
  const { slug, meta, content } = post
  const readingTime = calculateReadingTime(content)

  const imageUrl = meta.image
    ? meta.image.startsWith("http") || meta.image.startsWith("/")
      ? meta.image
      : getOptimizedImageUrl(meta.image, { width: featured ? 1200 : 600 })
    : null

  return (
    <article className={featured ? "col-span-full mb-8" : ""}>
      <Link href={`/blog/${slug}`} className="group block">
        {imageUrl && (
          <div
            className={cn(
              "relative mb-5 overflow-hidden rounded-2xl border border-border/30 bg-muted/20 transition-all duration-300 group-hover:border-border/60",
              featured ? "aspect-[21/9]" : "aspect-[16/10]",
            )}
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={meta.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {featured && (
              <div className="absolute left-6 top-6">
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
                  Latest
                </span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2
            className={cn(
              "font-bold leading-tight tracking-tight text-foreground/90 transition-colors duration-200 group-hover:text-primary",
              featured ? "text-3xl md:text-4xl" : "text-xl",
            )}
          >
            {meta.title}
          </h2>

          {meta.description && (
            <p
              className={cn(
                "leading-relaxed text-muted-foreground line-clamp-2 transition-colors group-hover:text-foreground/80",
                featured ? "text-lg max-w-2xl" : "text-[15px]",
              )}
            >
              {meta.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-sm text-muted-foreground/60 transition-colors group-hover:text-muted-foreground/80">
            <time dateTime={meta.date}>
              {meta.date
                ? new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : ""}
            </time>
            <span className="text-muted-foreground/30">·</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
