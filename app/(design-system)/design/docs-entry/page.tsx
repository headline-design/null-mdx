import Link from "next/link"
import { Search, ArrowRight, BookOpen, Zap, Code, Palette, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { title: "Installation", description: "Get up and running in minutes", href: "#", icon: Zap },
  { title: "Components", description: "Explore the component library", href: "#", icon: Code },
  { title: "Theming", description: "Customize colors and styles", href: "#", icon: Palette },
  { title: "Configuration", description: "Advanced setup options", href: "#", icon: Settings },
]

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Project Structure", href: "#" },
      { title: "Configuration", href: "#" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Routing", href: "#" },
      { title: "Data Fetching", href: "#" },
      { title: "Rendering", href: "#" },
      { title: "Styling", href: "#" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Components", href: "#" },
      { title: "Hooks", href: "#" },
      { title: "Utilities", href: "#" },
      { title: "Types", href: "#" },
    ],
  },
]

export default function DocsEntryPage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Documentation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
                Everything you need to build amazing products
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive guides, API references, and examples to help you get started and master the platform.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search documentation..." className="pl-12 h-12 text-base" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 border-b border-border">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-12">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-semibold text-foreground mb-4">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-border">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Need help?</h3>
                  <p className="text-sm text-muted-foreground">Join our community or contact support</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Join Discord</Button>
                <Button>Contact Support</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
