
import { getAllContent } from "@/lib/content"
import { BlogCard } from "@/components/blog-card"
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

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-4 pt-12 pb-24">
        <header className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            {tag ? `Topic: ${tag}` : "The Blog"}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl mb-6">
            {tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : "Writing & Thoughts"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
            "Deep dives into software engineering, product design, and the future of web development."
          </p>

          <nav className="mt-12 flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide py-3">
            <Link
              href="/blog"
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                !tag
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              All Posts
            </Link>
            {["Introduction", "Tech", "AI", "Design"].map((topic) => (
              <Link
                key={topic}
                href={`/blog?tag=${topic.toLowerCase()}`}
                className={cn(
                  "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  tag?.toLowerCase() === topic.toLowerCase()
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {topic}
              </Link>
            ))}
          </nav>

          {tag && (
            <div className="mt-6">
              <Link href="/blog" className="text-sm font-medium text-primary hover:underline flex items-center justify-center gap-2">
                &larr; View all posts
              </Link>
            </div>
          )}
        </header>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-2">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} featured={index === 0 && !tag} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/40 py-24 text-center">
            <p className="text-base text-muted-foreground italic mb-4">
              "No posts found for this topic yet."
            </p>
            <Link href="/blog" className="text-primary font-bold hover:underline">
              Clear filters
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
