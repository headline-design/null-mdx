import { NextResponse } from "next/server"
import { getAllContent } from "@/lib/content"

const staticPages = [
  {
    slug: "design",
    title: "Design System",
    description: "Browse UI templates and design patterns for docs and blog pages",
    type: "page" as const,
    path: "/design",
  },
  {
    slug: "design/docs-entry",
    title: "Docs Entry Template",
    description: "A polished documentation landing page with search, quick links, and categorized sections",
    type: "page" as const,
    path: "/design/docs-entry",
  },
  {
    slug: "design/blog-entry",
    title: "Blog Entry Template",
    description: "A full-featured blog landing with featured posts, categories, and newsletter signup",
    type: "page" as const,
    path: "/design/blog-entry",
  },
  {
    slug: "assets",
    title: "Assets Manager",
    description: "Upload, manage, and copy asset URLs for use in your content",
    type: "page" as const,
    path: "/assets",
  },
  {
    slug: "about",
    title: "About",
    description: "Learn more about this project and its features",
    type: "page" as const,
    path: "/about",
  },
]

export async function GET() {
  const blogPosts = getAllContent("blog")
  const docs = getAllContent("docs")

  const results = [
    ...staticPages,
    ...blogPosts.map((post) => ({
      slug: post.slug,
      title: post.meta.title,
      description: post.meta.description,
      type: "blog" as const,
      path: `/blog/${post.slug}`,
    })),
    ...docs.map((doc) => ({
      slug: doc.slug,
      title: doc.meta.title,
      description: doc.meta.description,
      type: "docs" as const,
      path: `/docs/${doc.slug}`,
    })),
  ]

  return NextResponse.json(results)
}
