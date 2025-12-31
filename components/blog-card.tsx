import Link from "next/link"
import Image from "next/image"
import { getOptimizedImageUrl } from "@/lib/supabase/storage"
import { cn } from "@/lib/utils"
import type { ContentItem } from "@/lib/content"

interface BlogCardProps {
  post: ContentItem
  featured?: boolean
}

export function BlogCard({ post, featured }: BlogCardProps) {
  const { slug, meta } = post

  const imageUrl = meta.image
    ? meta.image.startsWith("http") || meta.image.startsWith("/")
      ? meta.image
      : getOptimizedImageUrl(meta.image, { width: featured ? 1200 : 600 })
    : null

  return (
    <article className={featured ? "col-span-full" : ""}>
      <Link href={`/blog/${slug}`} className="group block">
        {imageUrl && (
          <div
            className={cn(
              "relative mb-4 overflow-hidden rounded-lg border border-border/30 bg-muted/20",
              featured ? "aspect-[2/1]" : "aspect-video",
            )}
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={meta.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="space-y-2">
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/40">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2
            className={cn(
              "font-semibold leading-[1.2] tracking-[-0.01em] text-foreground/90 transition-colors duration-100 group-hover:text-primary",
              featured ? "text-[22px] md:text-[26px]" : "text-[17px]",
            )}
          >
            {meta.title}
          </h2>

          {meta.description && (
            <p
              className={cn(
                "leading-relaxed text-foreground/50 line-clamp-2",
                featured ? "text-[15px]" : "text-[14px]",
              )}
            >
              {meta.description}
            </p>
          )}

          <time className="block text-[13px] text-foreground/40">
            {meta.date
              ? new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </time>
        </div>
      </Link>
    </article>
  )
}
