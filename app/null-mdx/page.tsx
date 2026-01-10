import { getAllContent } from "@/lib/content"
import { siteConfig, isBlogMode, isDemoMode } from "@/lib/site-config"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { redirect } from "next/navigation"
import { Footer } from "@/components/footer"
import { GridBackground } from "@/components/ui/grid-background"

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
      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1080px]">
          {/* Hero Section - Refined in Grid */}
          <GridBackground>
            <section className="px-6 py-20 md:px-12 md:py-32 lg:py-40">
              <div className="max-w-3xl">
                {/* Badge - Refined */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 transition-colors hover:border-primary/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-[13px] font-medium tracking-tight text-primary/80">
                    The first v0 template with real MDX support
                  </span>
                </div>

                <h1 className="text-balance text-[42px] font-bold leading-[1.05] tracking-[-0.04em] md:text-[56px] lg:text-[80px] text-foreground">
                  {siteConfig.tagline}
                </h1>
                <p className="mt-8 text-[18px] leading-[1.6] text-muted-foreground/80 md:text-[21px] max-w-xl">
                  {siteConfig.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {isBlogMode() ? (
                    <>
                      <a
                        href="/blog"
                        className="h-11 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-[14px] font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-sm shadow-primary/20"
                      >
                        Read the blog
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="/about"
                        className="h-11 inline-flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-6 py-2.5 text-[14px] font-medium text-foreground/70 transition-all duration-200 hover:bg-muted/80 hover:text-foreground active:scale-[0.98]"
                      >
                        About
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="/docs"
                        className="h-11 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-[14px] font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-sm shadow-primary/20"
                      >
                        Get started
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <Link
                        href={siteConfig.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 inline-flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-6 py-2.5 text-[14px] font-medium text-foreground/70 transition-all duration-200 hover:bg-muted/80 hover:text-foreground active:scale-[0.98]"
                      >
                        GitHub
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </section>
          </GridBackground>

          <div className="grid divide-y border-y sm:border-x">
            {/* Features section - Upgraded to Vercel Grid */}
            <section className="bg-muted/[0.02]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-b border-border/40">
                <div className="group p-8 md:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md group-hover:shadow-primary/5 mb-6">
                    <span className="text-[18px] font-mono font-bold text-primary">//</span>
                  </div>
                  <h3 className="text-[18px] font-bold tracking-tight mb-3">Real MDX Support</h3>
                  <p className="text-[15px] leading-[1.6] text-muted-foreground/70">
                    Render actual markdown files with full component support. No more hardcoded strings.
                  </p>
                </div>

                <div className="group p-8 md:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md group-hover:shadow-primary/5 mb-6">
                    <span className="text-[18px] font-mono font-bold text-primary">01</span>
                  </div>
                  <h3 className="text-[18px] font-bold tracking-tight mb-3">Blog + Docs Unified</h3>
                  <p className="text-[15px] leading-[1.6] text-muted-foreground/70">
                    A cohesive engine for your documentation and engineering blog. Truly unified.
                  </p>
                </div>

                <div className="group p-8 md:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md group-hover:shadow-primary/5 mb-6">
                    <SupabaseIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-[18px] font-bold tracking-tight mb-3">Cloud Native</h3>
                  <p className="text-[15px] leading-[1.6] text-muted-foreground/70">
                    Built-in asset management with Supabase and edge-ready performance.
                  </p>
                </div>

                <a href="/design" className="group p-8 md:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-md group-hover:shadow-primary/10 mb-6">
                    <span className="text-[18px] font-mono font-bold text-primary">UI</span>
                  </div>
                  <h3 className="text-[18px] font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                    Design System
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-muted-foreground/70">
                    Pre-built components and layouts inspired by the world's best engineering blogs.
                  </p>
                </a>
              </div>
            </section>

            {/* Integrations Section */}
            <section className="bg-muted/[0.01]">
              <div className="px-8 py-12 md:px-12 md:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                  <div className="max-w-md">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-3">
                      Powered by
                    </h2>
                    <p className="text-[15px] font-medium text-muted-foreground leading-relaxed">
                      Built on a foundation of industry-leading technologies for maximum performance and reliability.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/40 border border-border/40 overflow-hidden rounded-xl">
                  {[
                    { name: "Next.js", icon: "▲" },
                    { name: "React", icon: "⚛" },
                    { name: "Tailwind", icon: "≋" },
                    { name: "Supabase", icon: "⚡" },
                    { name: "Lucide", icon: "✧" },
                    { name: "Geist", icon: "G" }
                  ].map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center justify-center p-8 bg-background hover:bg-muted/30 transition-colors group">
                      <div className="text-2xl mb-3 opacity-40 group-hover:opacity-100 transition-opacity font-mono">
                        {tech.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recent Writing Section in Grid */}
            {recentPosts.length > 0 && (
              <section className="px-8 py-20 md:px-12">
                <div className="mb-12 flex items-baseline justify-between">
                  <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/50">
                    Recent Writing
                  </h2>
                  <a
                    href="/blog"
                    className="group flex items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View full feed
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                <div className="divide-y divide-border/10 -mx-4 md:-mx-8">
                  {recentPosts.map((post) => (
                    <article key={post.slug} className="group px-4 md:px-8 py-6 transition-all duration-300 hover:bg-muted/30 first:pt-0 last:pb-0">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-[18px] font-bold text-foreground/90 transition-colors duration-200 group-hover:text-primary">
                            {post.meta.title}
                          </h3>
                          <time className="shrink-0 text-[13px] font-mono text-muted-foreground/40 font-bold">
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
                          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground/60 line-clamp-2 max-w-3xl group-hover:text-muted-foreground/80 transition-colors">
                            {post.meta.description}
                          </p>
                        )}
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
