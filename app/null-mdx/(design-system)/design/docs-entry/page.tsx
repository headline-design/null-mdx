import Link from "next/link"
import { Search, ArrowRight, BookOpen, Zap, Code, Palette, Settings, Users, Sparkles, Terminal, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { title: "Installation", description: "Get up and running in minutes.", href: "/docs/installation", icon: Zap, color: "text-amber-500" },
  { title: "MDX Support", description: "Write documentation in powerful MDX.", href: "/docs/mdx-support", icon: Code, color: "text-blue-500" },
  { title: "Theming", description: "Full control over your brand identity.", href: "/docs/introduction", icon: Palette, color: "text-purple-500" },
  { title: "Deployment", description: "Ship to production with zero friction.", href: "/docs/getting-started", icon: Sparkles, color: "text-emerald-500" },
]

const highlights = [
  { title: "Core Concepts", icon: Cpu, items: ["Routing", "Data Fetching", "Rendering", "Optimization"] },
  { title: "API Reference", icon: Terminal, items: ["Components", "Hooks", "Utilities", "Types"] },
]

export default function DocsEntryPage() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border/40 bg-muted/10">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-8">
              <BookOpen className="w-3.5 h-3.5" />
              Documentation
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
              The foundation for <span className="text-primary italic">exceptional</span> products.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl italic">
              "Every great feature begins with world-class documentation. Start building with our comprehensive guides and developer-first components."
            </p>
            <div className="relative max-w-2xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search the documentation..."
                className="pl-12 h-14 text-lg bg-background/50 backdrop-blur-sm border-border/60 focus:border-primary/50 transition-all rounded-2xl shadow-xl shadow-primary/5"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex gap-1.5 transition-opacity group-focus-within:opacity-0">
                <kbd className="h-6 px-1.5 rounded border border-border bg-muted flex items-center text-[10px] font-medium text-muted-foreground">⌘</kbd>
                <kbd className="h-6 px-1.5 rounded border border-border bg-muted flex items-center text-[10px] font-medium text-muted-foreground">K</kbd>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Quick Links */}
      <section className="py-20 border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group p-6 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card hover:border-primary/40 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]"
              >
                <div className={cn("w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", link.color)}>
                  <link.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{link.description}"
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High-Level Topics */}
      <section className="py-24 bg-muted/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {highlights.map((section) => (
              <div key={section.title} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <Link
                      key={item}
                      href="/docs/introduction"
                      className="group flex items-center justify-between p-4 rounded-xl border border-border/40 bg-background hover:border-primary/40 transition-all"
                    >
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden p-8 md:p-16 rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Building something great?</h2>
                <p className="text-lg text-primary-foreground/80 italic mb-0 leading-relaxed">
                  "Join thousands of developers building the future of the web with Null MDX. Get support, share ideas, and ship faster together."
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button size="lg" variant="secondary" className="h-14 px-8 font-bold shadow-lg">
                  Join Discord
                </Button>
                <Button size="lg" className="h-14 px-8 font-bold border-2 border-primary-foreground bg-transparent hover:bg-white/10">
                  Quick Start Guide
                </Button>
              </div>
            </div>
            {/* Flourishes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
