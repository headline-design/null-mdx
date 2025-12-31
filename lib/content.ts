import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content")

export interface ContentMeta {
  title: string
  description?: string
  date?: string
  author?: string
  authorEmail?: string
  authorBio?: string
  image?: string
  tags?: string[]
  draft?: boolean
  order?: number
}

export interface ContentItem {
  slug: string
  meta: ContentMeta
  content: string
}

function getContentPath(type: "blog" | "docs") {
  return path.join(CONTENT_DIR, type)
}

export function getAllContent(type: "blog" | "docs"): ContentItem[] {
  const contentPath = getContentPath(type)

  if (!fs.existsSync(contentPath)) {
    return []
  }

  const files = fs.readdirSync(contentPath).filter((f) => f.endsWith(".mdx"))

  const items = files.map((file) => {
    const filePath = path.join(contentPath, file)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      slug: file.replace(".mdx", ""),
      meta: data as ContentMeta,
      content,
    }
  })

  // Filter drafts in production
  const filtered = process.env.NODE_ENV === "production" ? items.filter((item) => !item.meta.draft) : items

  // Sort by date for blog, by order for docs
  if (type === "blog") {
    return filtered.sort((a, b) => {
      const dateA = new Date(a.meta.date || 0)
      const dateB = new Date(b.meta.date || 0)
      return dateB.getTime() - dateA.getTime()
    })
  }

  return filtered.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))
}

export function getContentBySlug(type: "blog" | "docs", slug: string): ContentItem | null {
  const contentPath = getContentPath(type)
  const filePath = path.join(contentPath, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    meta: data as ContentMeta,
    content,
  }
}

// For docs: get navigation structure from folders
export function getDocsNavigation(): { section: string; items: ContentItem[] }[] {
  const docsPath = getContentPath("docs")

  if (!fs.existsSync(docsPath)) {
    return []
  }

  const entries = fs.readdirSync(docsPath, { withFileTypes: true })
  const sections: { section: string; items: ContentItem[] }[] = []

  // Root level docs
  const rootFiles = entries.filter((e) => e.isFile() && e.name.endsWith(".mdx"))
  if (rootFiles.length > 0) {
    sections.push({
      section: "Getting Started",
      items: rootFiles
        .map((file) => {
          const filePath = path.join(docsPath, file.name)
          const fileContent = fs.readFileSync(filePath, "utf8")
          const { data, content } = matter(fileContent)
          return {
            slug: file.name.replace(".mdx", ""),
            meta: data as ContentMeta,
            content,
          }
        })
        .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0)),
    })
  }

  // Subdirectories as sections
  const folders = entries.filter((e) => e.isDirectory())
  for (const folder of folders) {
    const folderPath = path.join(docsPath, folder.name)
    const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".mdx"))

    const items = files
      .map((file) => {
        const filePath = path.join(folderPath, file)
        const fileContent = fs.readFileSync(filePath, "utf8")
        const { data, content } = matter(fileContent)
        return {
          slug: `${folder.name}/${file.replace(".mdx", "")}`,
          meta: data as ContentMeta,
          content,
        }
      })
      .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))

    if (items.length > 0) {
      sections.push({
        section: folder.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        items,
      })
    }
  }

  return sections
}
