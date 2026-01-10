import { getAllContent } from "@/lib/content"
import { BlogCard } from "@/components/blog-card"
import { NewsletterCTA } from "@/components/newsletter-cta"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
}

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams
  const allPosts = getAllContent("blog")

  const filteredPosts = tag
    ? allPosts.filter(post => post.meta.tags?.some(t => t.toLowerCase() === tag.toLowerCase()))
    : allPosts

  // Sort by date desc
  const sortedPosts = filteredPosts.sort((a, b) => {
    return new Date(b.meta.date as any).getTime() - new Date(a.meta.date as any).getTime()
  })

  return (
    <main className="mx-auto w-full max-w-7xl px-0 pt-16">
      <div className="px-6 md:px-10 border-b border-border/40 pb-6 mb-0">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          {tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : "Blog"}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide -ml-1 py-1">
            <Link
              href="/blog"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
                !tag
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Posts
            </Link>
            {["Engineering", "Community", "Company News", "Customers", "Changelog"].map((topic) => (
              <Link
                key={topic}
                href={`/blog?tag=${topic.toLowerCase().replace(" ", "-")}`}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
                  tag?.toLowerCase() === topic.toLowerCase().replace(" ", "-")
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {topic}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border/40">
          {sortedPosts.map((post, index) => (
            <div
              key={post.slug}
              className={cn(
                "border-border/40",
                index % 3 !== 2 ? "lg:border-r" : "",
                index % 2 !== 1 ? "md:border-r lg:border-r-inherit" : "",
                "border-b"
              )}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-10 py-32 text-center border-t border-border/40">
          <p className="text-lg text-muted-foreground mb-6">
            No posts found for this topic yet.
          </p>
          <Link href="/blog" className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90">
            View all posts
          </Link>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="px-6 py-24 md:px-10 border-t border-border/40 bg-muted/[0.01]">
        <NewsletterCTA variant="minimal" />
      </section>
    </main>
  )
}
