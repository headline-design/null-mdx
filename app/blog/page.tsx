
import { getAllContent } from "@/lib/content"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
}

export default function BlogPage() {
  const posts = getAllContent("blog")

  return (
    <>
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
          <header className="mb-12">
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] md:text-[32px]">Writing</h1>
            <p className="mt-2 text-[15px] text-foreground/60">Thoughts on code, design, and building products.</p>
          </header>

          {posts.length > 0 ? (
            <div className="space-y-0 divide-y divide-border/40">
              {posts.map((post) => (
                <article key={post.slug} className="group py-5 first:pt-0">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-[17px] font-medium text-foreground/90 transition-colors duration-100 group-hover:text-primary">
                        {post.meta.title}
                      </h2>
                      <time className="shrink-0 text-[13px] tabular-nums text-foreground/40">
                        {post.meta.date
                          ? new Date(post.meta.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : ""}
                      </time>
                    </div>
                    {post.meta.description && (
                      <p className="mt-1.5 text-[14px] leading-relaxed text-foreground/50 line-clamp-2">
                        {post.meta.description}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border/40 py-16 text-center">
              <p className="text-[14px] text-foreground/50">
                No posts yet. Add .mdx files to content/blog/ to get started.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
