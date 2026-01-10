import { notFound } from "next/navigation"
import { MDXContent } from "@/components/mdx-content"
import { getAllContent, getContentBySlug } from "@/lib/content"
import { BlogPagination } from "@/components/blog-pagination"
import { Author } from "@/components/author"
import { AskAI } from "@/components/ask-ai"
import { SocialShare } from "@/components/social-share"
import { NewsletterCTA } from "@/components/newsletter-cta"
import { calculateReadingTime } from "@/lib/utils/reading-time"
import { siteConfig, isAIEnabled } from "@/lib/site-config"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Clock } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllContent("blog")
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getContentBySlug("blog", slug)

  if (!post) return {}

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      authors: [siteConfig.author.name],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getContentBySlug("blog", slug)
  const allPosts = getAllContent("blog")

  if (!post) {
    notFound()
  }

  // Get related posts (exclude current)
  // For now just get latest 2 that aren't the current one
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = allPosts[currentIndex + 1]
  const nextPost = allPosts[currentIndex - 1]

  const relPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3)

  const readingTime = calculateReadingTime(post.content)
  const fullUrl = `${siteConfig.url}/blog/${slug}`

  return (
    <>
      <main className="mx-auto w-full max-w-[1200px] px-6 py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-12">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate">{post.meta.tags?.[0] || "Article"}</span>
          </nav>

          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              {post.meta.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed mb-10 font-medium tracking-tight">
              {post.meta.description}
            </p>

            <div className="flex items-center gap-3 py-6 border-y border-border/10 mb-10">
              <div className="h-6 w-6 rounded-lg bg-foreground flex items-center justify-center text-[10px] font-bold text-background rotate-45">
                <span className="-rotate-45 font-bold">▲</span>
              </div>
              <span className="text-[13px] font-bold uppercase tracking-wider text-foreground">{post.meta.author || siteConfig.author.name}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4 border-b border-border/10 text-[13px] font-bold uppercase tracking-widest text-muted-foreground/40">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 opacity-40" />
                  {readingTime}
                </span>
                {isAIEnabled() && <AskAI />}
              </div>
              <div>
                Last updated {post.meta.date ? new Date(post.meta.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
              </div>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none mb-24">
            <MDXContent source={post.content} />
          </div>

          <BlogPagination
            prev={prevPost ? { title: prevPost.meta.title, slug: prevPost.slug } : undefined}
            next={nextPost ? { title: nextPost.meta.title, slug: nextPost.slug } : undefined}
          />

          <div className="pt-16 border-t border-border/10 space-y-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
              <Author />
              <SocialShare title={post.meta.title} url={fullUrl} />
            </div>
            <NewsletterCTA />
          </div>
        </div>
      </main>
    </>
  )
}
