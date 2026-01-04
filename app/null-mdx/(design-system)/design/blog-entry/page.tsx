import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const categories = ["All", "Engineering", "Design", "Product", "General"]

import { getAllContent } from "@/lib/content"

export default function BlogEntryPage() {
  const allPosts = getAllContent("blog")
  const featuredPost = allPosts[0]
  const recentPosts = allPosts.slice(1, 3)
  const categories = ["All", "Introduction", "Tech", "AI", "Design"]
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-12 pb-24">
      <header className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          The Blog
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl mb-6">
          Insights from the edge.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
          "Deep dives into software engineering, product design, and the future of web development."
        </p>

        <nav className="mt-12 flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide py-3">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                i === 0
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* Featured Post */}
      <section className="mb-24">
        <Link href={`/blog/${featuredPost.slug}`} className="group block relative">
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-border/40 shadow-2xl mb-10">
            <Image
              src={featuredPost.meta.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
              alt={featuredPost.meta.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <Badge className="mb-4 bg-primary text-primary-foreground border-none px-3 py-1">Feature</Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {featuredPost.meta.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="font-bold text-white">{featuredPost.meta.author}</span>
                <span className="opacity-40">·</span>
                <span>{featuredPost.meta.date}</span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Posts Grid */}
      <section className="grid sm:grid-cols-2 gap-x-12 gap-y-20 mb-24">
        {recentPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-6">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/30 bg-muted/20 shadow-sm">
              <Image
                src={post.meta.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
                alt={post.meta.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.meta.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {post.meta.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-base leading-relaxed italic opacity-80">
                {post.meta.description}
              </p>
              <div className="flex items-center gap-3 text-[13px] text-muted-foreground/50 font-medium">
                <span>{post.meta.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Newsletter */}
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-muted/30 p-10 md:p-16">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-md">
              <h3 className="text-3xl font-extrabold mb-3">Join the inner circle</h3>
              <p className="text-lg text-muted-foreground italic mb-0 leading-relaxed">
                "The best of our writing, delivered directly to your inbox every month."
              </p>
            </div>
            <form className="flex w-full max-w-sm gap-3">
              <Input type="email" placeholder="you@example.com" className="h-12 bg-background rounded-xl border-border/60" />
              <Button size="lg" className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20">Subscribe</Button>
            </form>
          </div>
          {/* Background flourish */}
          <div className="absolute -right-24 -top-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
        </div>
      </section>
    </main>
  )
}
