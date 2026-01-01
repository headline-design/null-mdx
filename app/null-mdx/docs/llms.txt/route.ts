import { getAllContent, getDocsNavigation } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

export async function GET() {
  const blogPosts = getAllContent("blog")
  const docsNav = getDocsNavigation()

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

This file provides an index of all content on this site for AI agents and LLMs.

## Blog Posts

${blogPosts
      .map(
        (post) =>
          `- [${post.meta.title}](${siteConfig.url}/blog/${post.slug}): ${post.meta.description || "No description"}`,
      )
      .join("\n")}

## Documentation

${docsNav
      .map(
        (section) => `### ${section.section}

${section.items
            .map(
              (item) =>
                `- [${item.meta.title}](${siteConfig.url}/docs/${item.slug}): ${item.meta.description || "No description"}`,
            )
            .join("\n")}`,
      )
      .join("\n\n")}

## API Endpoints

- RSS Feed: ${siteConfig.url}/feed.xml
- Search API: ${siteConfig.url}/null-mdx/api/search
- This file: ${siteConfig.url}/llms.txt
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
