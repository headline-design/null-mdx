import { getAllContent } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

export async function GET() {
  const posts = getAllContent("blog")

  const feedItems = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`
      const pubDate = post.meta.date ? new Date(post.meta.date).toUTCString() : new Date().toUTCString()

      return `
    <item>
      <title><![CDATA[${post.meta.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.meta.description || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.meta.author ? `<author>${post.meta.author}</author>` : ""}
    </item>`
    })
    .join("")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
