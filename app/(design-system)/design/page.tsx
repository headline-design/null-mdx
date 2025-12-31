import Link from "next/link"
import { FileText, BookOpen, ArrowRight, Layout, Palette, Type, Box } from "lucide-react"

const templates = [
  {
    title: "Documentation Entry",
    description: "A polished landing page for documentation with search, quick links, and categorized navigation.",
    href: "/design/docs-entry",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Blog Entry",
    description: "A full-featured blog landing with featured posts, category filters, and newsletter signup.",
    href: "/design/blog-entry",
    icon: FileText,
    color: "bg-purple-500/10 text-purple-500",
  },
]

const components = [
  { name: "Buttons", icon: Box },
  { name: "Typography", icon: Type },
  { name: "Colors", icon: Palette },
  { name: "Layouts", icon: Layout },
]

export default function DesignPage() {
  return (
    <>
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <header className="mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              Design System
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-4">
              UI Templates & Components
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Pre-built, production-ready templates and components for building high-quality documentation and blogs.
            </p>
          </header>

          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Layout className="w-5 h-5 text-primary" />
              Page Templates
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {templates.map((template) => (
                <Link
                  key={template.href}
                  href={template.href}
                  className="group relative block p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.99]"
                >
                  <div className="flex flex-col gap-6">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", template.color)}>
                      <template.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                        {template.title}
                        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed italic line-clamp-2">
                        "{template.description}"
                      </p>
                    </div>
                  </div>
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              UI Kit Concepts
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {components.map((comp) => (
                <div key={comp.name} className="p-6 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-not-allowed grayscale opacity-60">
                  <comp.icon className="w-5 h-5 mb-3 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">{comp.name}</span>
                  <div className="mt-1 text-[10px] uppercase tracking-tighter text-muted-foreground/50">Coming Soon</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
