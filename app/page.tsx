import { getAllContent } from "@/lib/content"
import { siteConfig, isBlogMode, isDemoMode } from "@/lib/site-config"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { redirect } from "next/navigation"

function SupabaseIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M3.084 15.25c-1.664 0-2.6-1.912-1.58-3.226L10.21.806C10.794.054 12 .466 12 1.42v7.33h8.916c1.663 0 2.6 1.912 1.58 3.226L13.79 23.194c-.584.752-1.79.34-1.79-.613V15.25z"
      />
    </svg>
  )
}

export default function HomePage() {
  if (!isDemoMode()) {
    redirect(isBlogMode() ? "/blog" : "/docs")
  }

  const recentPosts = getAllContent("blog").slice(0, 5)

  return (
    <>
     

      <main className="flex-1">
        <section className="mx-auto max-w-[90rem] px-6 py-24 md:px-8 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            {/* Badge - pioneering first */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[12px] font-medium text-primary">The first v0 template with real MDX</span>
            </div>

            <h1 className="text-balance text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[48px] lg:text-[56px]">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.6] text-foreground/60 md:text-[18px]">{siteConfig.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {isBlogMode() ? (
                <>
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[14px] font-medium text-primary-foreground transition-all duration-100 hover:brightness-110"
                  >
                    Read the blog
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/about"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium text-foreground/60 transition-colors duration-100 hover:text-foreground"
                  >
                    About
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/docs"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[14px] font-medium text-primary-foreground transition-all duration-100 hover:brightness-110"
                  >
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium text-foreground/60 transition-colors duration-100 hover:text-foreground"
                  >
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features section - new */}
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-[90rem] px-6 py-16 md:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-[16px] font-mono font-bold text-primary">//</span>
                </div>
                <h3 className="text-[16px] font-semibold tracking-tight">Real MDX Support</h3>
                <p className="text-[14px] leading-[1.6] text-foreground/50">
                  First v0 template to render actual markdown files. No more hardcoded content.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-[16px] font-mono font-bold text-primary">01</span>
                </div>
                <h3 className="text-[16px] font-semibold tracking-tight">Blog + Docs Unified</h3>
                <p className="text-[14px] leading-[1.6] text-foreground/50">
                  Switch between blog and documentation modes with a single config change.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <SupabaseIcon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[16px] font-semibold tracking-tight">Supabase Storage</h3>
                <p className="text-[14px] leading-[1.6] text-foreground/50">
                  Built-in asset management with Supabase buckets for images and files.
                </p>
              </div>
              <a href="/design" className="group space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 transition-colors group-hover:bg-primary/20">
                  <span className="text-[16px] font-mono font-bold text-primary">UI</span>
                </div>
                <h3 className="text-[16px] font-semibold tracking-tight group-hover:text-primary transition-colors">
                  Design System
                </h3>
                <p className="text-[14px] leading-[1.6] text-foreground/50">
                  Pre-built landing pages for docs and blog. Copy and customize for your needs.
                </p>
              </a>
            </div>
          </div>
        </section>

        {recentPosts.length > 0 && (
          <section className="border-t border-border/40">
            <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-8">
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/40">
                  Recent Writing
                </h2>
                <a
                  href="/blog"
                  className="text-[13px] text-foreground/50 transition-colors duration-100 hover:text-foreground"
                >
                  View all
                </a>
              </div>

              <div className="divide-y divide-border/40">
                {recentPosts.map((post) => (
                  <article key={post.slug} className="group py-3.5 first:pt-0 last:pb-0">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[15px] font-medium text-foreground/90 transition-colors duration-100 group-hover:text-primary">
                          {post.meta.title}
                        </h3>
                        <time className="shrink-0 text-[13px] tabular-nums text-foreground/40">
                          {post.meta.date
                            ? new Date(post.meta.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </time>
                      </div>
                      {post.meta.description && (
                        <p className="mt-1 text-[14px] text-foreground/50 line-clamp-1">{post.meta.description}</p>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
