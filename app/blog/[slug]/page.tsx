import { notFound } from "next/navigation"

import { MDXContent } from "@/components/mdx-content"
import { getAllContent, getContentBySlug } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

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

  if (!post) {
    notFound()
  }

  return (
    <>
      <main className="flex-1">
        <article className="mx-auto max-w-[640px] px-6 py-16 md:px-8 md:py-24">
          <a
            href="/blog"
            className="mb-8 inline-flex items-center text-[13px] text-foreground/50 transition-colors duration-100 hover:text-foreground"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to blog
          </a>

          <header className="mb-10">
            <h1 className="text-balance text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[30px]">
              {post.meta.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-[13px] text-foreground/50">
              {post.meta.date && (
                <time dateTime={post.meta.date}>
                  {new Date(post.meta.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              {post.meta.author && (
                <>
                  <span className="text-foreground/30">·</span>
                  <span>{post.meta.author}</span>
                </>
              )}
            </div>
          </header>

          <div className="prose-content">
            <MDXContent source={post.content} />
          </div>

          {post.meta.tags && post.meta.tags.length > 0 && (
            <footer className="mt-14 border-t border-border/40 pt-6">
              <div className="flex flex-wrap gap-2">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/40 px-3 py-1 text-[11px] font-medium text-foreground/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </main>
    </>
  )
}
