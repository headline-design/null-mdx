import Link from "next/link"
import { FileText, BookOpen, ArrowRight } from "lucide-react"

const templates = [
  {
    title: "Documentation Entry",
    description: "A polished landing page for documentation with search, quick links, and categorized navigation.",
    href: "/design/docs-entry",
    icon: BookOpen,
  },
  {
    title: "Blog Entry",
    description: "A full-featured blog landing with featured posts, category filters, and newsletter signup.",
    href: "/design/blog-entry",
    icon: FileText,
  },
]

export default function DesignPage() {
  return (
    <>
      <main className="flex-1 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">UI Templates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Pre-built, production-ready templates for common pages. Copy and customize for your own projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Link
                key={template.href}
                href={template.href}
                className="group block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <template.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      {template.title}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h2>
                    <p className="text-muted-foreground">{template.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
