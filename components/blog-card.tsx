import Link from "next/link"
import Image from "next/image"
import { getOptimizedImageUrl } from "@/lib/supabase/storage"
import { cn } from "@/lib/utils"
import type { ContentItem } from "@/lib/content"
import { ArrowUpRight } from "lucide-react"

import { calculateReadingTime } from "@/lib/utils/reading-time"

interface BlogCardProps {
  post: ContentItem
  featured?: boolean
  minimal?: boolean
}

export function BlogCard({ post, featured, minimal }: BlogCardProps) {
  const { slug, meta, content } = post
  const readingTime = calculateReadingTime(content)

  const imageUrl = meta.image
    ? meta.image.startsWith("http") || meta.image.startsWith("/")
      ? meta.image
      : getOptimizedImageUrl(meta.image, { width: featured ? 1200 : 800 })
    : null

  if (minimal) {
    return (
      <Link href={`/blog/${slug}`} className="group flex items-start gap-4">
        {imageUrl && (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border/40 bg-muted/30">
            <Image
              src={imageUrl}
              alt={meta.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors line-clamp-2">
            {meta.title}
          </h3>
          <time className="text-xs text-muted-foreground/60">{
            meta.date ? new Date(meta.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""
          }</time>
        </div>
      </Link>
    )
  }

  return (
    <article className="group flex flex-col h-full bg-background transition-colors hover:bg-muted/[0.03]">
      <Link href={`/blog/${slug}`} className="flex flex-col p-10 h-full relative">
        <div className="flex items-start justify-between mb-16">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted/10 p-2 text-foreground/80">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={meta.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full opacity-40">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            )}
          </div>
          <time className="text-sm font-medium text-muted-foreground/40" dateTime={meta.date}>
            {meta.date ? new Date(meta.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
          </time>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-foreground transition-colors leading-tight">
            {meta.title}
          </h2>
          <p className="text-[15px] text-muted-foreground/60 leading-relaxed line-clamp-4">
            {meta.description}
          </p>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
            {post.meta.author?.charAt(0) || "N"}
          </div>
          <span className="text-[13px] font-medium text-muted-foreground/80">
            {post.meta.author || "Null Team"}
          </span>
        </div>
      </Link>
    </article>
  )
}
