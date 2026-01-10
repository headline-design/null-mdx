import { MetadataRoute } from "next"
import { getAllContent } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
    const blogPosts = getAllContent("blog")
    const docs = getAllContent("docs")

    const blogEntries = blogPosts.map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: post.meta.date ? new Date(post.meta.date) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }))

    const docEntries = docs.map((doc) => ({
        url: `${siteConfig.url}/docs/${doc.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }))

    const staticPages = [
        "",
        "/blog",
        "/docs",
        "/design",
        "/assets",
        "/about",
    ].map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
        priority: route === "" ? 1.0 : 0.9,
    }))

    return [...staticPages, ...docEntries, ...blogEntries]
}
