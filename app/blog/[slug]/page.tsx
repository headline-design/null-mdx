
import { notFound } from "next/navigation"
import { MDXContent } from "@/components/mdx-content"
import { getAllContent, getContentBySlug } from "@/lib/content"
import { BlogPagination } from "@/components/blog-pagination"
import { Author } from "@/components/author"
import { SocialShare } from "@/components/social-share"
import { NewsletterCTA } from "@/components/newsletter-cta"
import { calculateReadingTime } from "@/lib/utils/reading-time"
import { siteConfig } from "@/lib/site-config"
import type { Metadata } from "next"

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

  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const readingTime = calculateReadingTime(post.content)
  const fullUrl = `${siteConfig.url}/blog/${slug}`

  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-4 pt-12 pb-24">
        <article className="flex w-full flex-col gap-8">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-balance">
              {post.meta.title}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/40 pb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20">
                  {siteConfig.author.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">{post.meta.author || siteConfig.author.name}</span>
                  <span className="text-[12px] opacity-60">Author</span>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-border/40" />
              <div className="flex flex-col">
                <time dateTime={post.meta.date} className="font-medium text-foreground">
                  {post.meta.date && new Date(post.meta.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-[12px] opacity-60">Published</span>
              </div>
              <div className="h-8 w-[1px] bg-border/40" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{readingTime}</span>
                <span className="text-[12px] opacity-60">Reading Time</span>
              </div>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-p:leading-relaxed prose-p:text-lg">
            <MDXContent source={post.content} />
          </div>

          <div className="mt-16 flex flex-col gap-12 pt-12 border-t border-border/40">
            <SocialShare title={post.meta.title} url={fullUrl} />
            <Author
              name={post.meta.author}
              email={post.meta.authorEmail}
              bio={post.meta.authorBio}
            />
            <NewsletterCTA />
          </div>

          <BlogPagination
            prev={prevPost ? { title: prevPost.meta.title, slug: prevPost.slug } : undefined}
            next={nextPost ? { title: nextPost.meta.title, slug: nextPost.slug } : undefined}
          />

          {post.meta.tags && post.meta.tags.length > 0 && (
            <footer className="mt-12 flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted"
                >
                  {tag}
                </span>
              ))}
            </footer>
          )}
        </article>
      </main>
    </>
  )
}
