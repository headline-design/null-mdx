
import { DocsSidebar } from "@/components/docs-sidebar"
import { getDocsNavigation } from "@/lib/content"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to use and customize this template.",
}

export default function DocsPage() {
  const navigation = getDocsNavigation()

  return (
    <>

      <div
        id="null-docs-layout"
        className="mx-auto grid w-full max-w-[var(--input)-4rem] grid-cols-1 gap-x-6 md:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]"
      >
        <DocsSidebar navigation={navigation} />

        <main className="relative flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
          <div className="flex w-full flex-row gap-x-6">
            <div className="w-full max-w-3xl px-0 md:pr-4 xl:mx-auto xl:px-0 pt-8 md:pt-12">
              <header className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Documentation</h1>
                <p className="mt-4 text-xl text-muted-foreground">
                  Everything you need to know to get started and customize this template.
                </p>
              </header>

              {navigation.length > 0 ? (
                <div className="grid gap-10 sm:grid-cols-2">
                  {navigation.map((section) => (
                    <div key={section.section} className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-foreground">
                        {section.section}
                      </h2>
                      <div className="flex flex-col gap-2">
                        {section.items.map((doc) => (
                          <Link
                            key={doc.slug}
                            href={`/docs/${doc.slug}`}
                            className="group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                          >
                            <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
                              {doc.meta.title}
                            </h3>
                            {doc.meta.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {doc.meta.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border/40 py-16 text-center">
                  <p className="text-[14px] text-foreground/50">
                    No documentation yet. Add .mdx files to content/docs/ to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
