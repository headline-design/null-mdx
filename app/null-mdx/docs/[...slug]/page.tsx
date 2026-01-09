import { notFound } from "next/navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsMobileNav } from "@/components/docs-mobile-nav"
import { DocsRightSidebar } from "@/components/docs-right-sidebar"
import { TableOfContents } from "@/components/table-of-contents"
import { MDXContent } from "@/components/mdx-content"
import { getAllContent, getContentBySlug, getDocsNavigation } from "@/lib/content"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CopyPageButton } from "@/components/copy-page-button"

interface DocsPageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const docs = getAllContent("docs")
  return docs.map((doc) => ({ slug: doc.slug.split("/") }))
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params
  const slugPath = slug.join("/")
  const doc = getContentBySlug("docs", slugPath)

  if (!doc) return {}

  return {
    title: doc.meta.title,
    description: doc.meta.description,
  }
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params
  const slugPath = slug.join("/")

  // Handle fumadocs-specific segment requests gracefully
  // The proxy site (Fumadocs) sends these to discover navigation, but this app uses custom sidebar logic.
  if (slugPath.includes(".segments") || slugPath.endsWith("_tree.segment.rsc")) {
    return null
  }

  const doc = getContentBySlug("docs", slugPath)
  const navigation = getDocsNavigation()

  if (!doc) {
    notFound()
  }

  const allDocs = navigation.flatMap((section) => section.items)
  const currentIndex = allDocs.findIndex((d) => d.slug === slugPath)
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

  const currentSection = navigation.find((section) => section.items.some((item) => item.slug === slugPath))

  return (
    <>

      <div
        id="null-docs-layout"
        className="mx-auto mb-16 grid w-full max-w-(--breakpoint-xl) grid-cols-1 gap-x-6 md:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]"
      >
        <DocsSidebar navigation={navigation} />

        <main className="bg-sidebar relative flex min-h-svh flex-1 flex-col peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">


          <div className="group/collapsible absolute top-0 isolate z-10 block w-full border-b bg-sidebar px-4 text-base md:hidden">
            <DocsMobileNav navigation={navigation} />
          </div>

          <div className="[&_h1]:text-heading-40 flex w-full flex-row gap-x-6 [&_article]:mt-(--mobile-menu-height) md:[&_article]:mt-0 md:[&_article]:px-0 [&_h1]:mb-0 [&_h1]:tracking-tight!">
            <div className="grid w-full max-w-3xl grid-cols-1 gap-10 px-0 md:pr-4 xl:mx-auto xl:px-0">
              <div id="null-page" className="flex w-full min-w-0 flex-col" style={{ "--fd-tocnav-height": "0px" } as any}>
                <article className="flex w-full flex-1 flex-col gap-6 px-4 md:px-6 pt-8 md:pt-12 xl:px-12 xl:mx-auto max-w-[1120px]">
                  <div className="flex flex-col justify-between items-start gap-4">
                    <div className="flex flex-row justify-between items-center w-full gap-4">
                      <h1 className="text-3xl font-semibold">{doc.meta.title}</h1>
                      <div className="shrink-0">
                        <CopyPageButton content={doc.content} />
                      </div>
                    </div>
                    {doc.meta.description && (
                      <p className="text-lg mb-0 text-muted-foreground">{doc.meta.description}</p>
                    )}
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <MDXContent source={doc.content} />
                  </div>

                  <nav className="@container grid gap-4 pb-6 grid-cols-2">
                    {prevDoc ? (
                      <Link
                        href={`/docs/${prevDoc.slug}`}
                        className="flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-muted/80 hover:text-fd-accent-foreground @max-lg:col-span-full"
                      >
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </span>
                        <span className="font-medium text-foreground">{prevDoc.meta.title}</span>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {nextDoc ? (
                      <Link
                        href={`/docs/${nextDoc.slug}`}
                        className="flex flex-col items-end gap-2 rounded-lg border p-4 text-sm transition-colors hover:bg-muted/80 hover:text-fd-accent-foreground @max-lg:col-span-full"
                      >
                        <span className="flex items-center gap-1 text-muted-foreground">
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-foreground">{nextDoc.meta.title}</span>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </nav>
                </article>

              </div>

            </div>
            <DocsRightSidebar headings={[]} activeId="" />
            <div className="hidden xl:block">
              <TableOfContents content={doc.content} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
