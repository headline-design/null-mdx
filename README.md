# Null MDX

> Start from nothing. Build everything.

The first v0 template with real MDX support. Documentation and blog, unified.

## What is Null MDX?

Null MDX is a production-ready Next.js 16 template designed for content-heavy sites. Whether you're building technical documentation, a developer blog, or both—Null MDX provides a unified foundation that just works.

### Why "Null"?

The name reflects our philosophy: **start from nothing, with zero assumptions**. No opinionated styling you'll fight against. No bloated features you'll rip out. Just a clean, minimal foundation that scales with your needs.

## What Makes Null MDX Unique

### Real MDX Support in v0

Unlike other templates, Null MDX brings true MDX compilation to v0 projects:

- **Server-side MDX rendering** via `next-mdx-remote`
- **Syntax highlighting** with Shiki and `rehype-pretty-code`
- **GitHub Flavored Markdown** with `remark-gfm`
- **Auto-linked headings** for easy navigation
- **Custom components** mapped to MDX elements

### Dual-Mode Architecture

Toggle between `docs` and `blog` mode with a single config change:

```tsx
// lib/site-config.tsx
export const siteConfig = {
  mode: "docs" as SiteMode, // or "blog"
  // ...
}
```

- **Docs Mode**: Sidebar navigation, nested sections, ordered content
- **Blog Mode**: Chronological posts, author attribution, tags

### Multi-Zone Ready

Null MDX is designed to work as part of a larger Next.js multi-zone architecture:

- **Subroute architecture**: All content lives under `/null-mdx/*` for easy proxy integration
- Root links use `<a>` tags for proper zone navigation
- No client-side routing interference with rewrites
- Perfect for embedding docs/blog into an existing site via rewrites

### Built-in Features

| Feature | Description |
|---------|-------------|
| **Search** | Full-text search across all content with keyboard shortcuts |
| **AI Assistant** | Integrated "Ask AI" button for documentation queries |
| **Table of Contents** | Auto-generated from headings with scroll tracking |
| **Reading Progress** | Visual progress indicator for long-form content |
| **RSS Feed** | Auto-generated at `/null-mdx/blog/feed.xml` |
| **LLMs.txt** | AI-friendly content index at `/null-mdx/docs/llms.txt` |
| **Asset Management** | Supabase-powered media uploads |
| **Design System** | Built-in design system viewer at `/null-mdx/design` |

## Project Structure

```
null-mdx/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Root redirect
│   ├── not-found.tsx           # 404 page
│   ├── feed.xml/               # Global RSS feed
│   ├── llms.txt/               # Global LLMs.txt
│   └── null-mdx/               # <-- All template routes live here
│       ├── page.tsx            # Landing/demo page
│       ├── (design-system)/    # Design system routes
│       │   └── design/         # /null-mdx/design
│       ├── about/              # /null-mdx/about
│       ├── api/                # API routes
│       │   ├── search/         # Search endpoint
│       │   └── assets/         # Asset upload/management
│       ├── assets/             # /null-mdx/assets (asset manager UI)
│       ├── blog/               # Blog section
│       │   ├── page.tsx        # /null-mdx/blog (index)
│       │   ├── [slug]/         # /null-mdx/blog/:slug
│       │   └── feed.xml/       # /null-mdx/blog/feed.xml
│       └── docs/               # Documentation section
│           ├── page.tsx        # /null-mdx/docs (index)
│           ├── [...slug]/      # /null-mdx/docs/:path
│           └── llms.txt/       # /null-mdx/docs/llms.txt
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── ...                     # MDX & layout components
├── content/
│   ├── blog/                   # Blog posts (.mdx)
│   └── docs/                   # Documentation (.mdx)
│       └── guides/             # Nested doc sections
├── lib/
│   ├── content.ts              # Content loading utilities
│   ├── site-config.tsx         # Site configuration
│   └── supabase/               # Supabase clients
└── public/                     # Static assets
```

## Route Structure

All template routes are nested under `/null-mdx/` to enable easy integration with parent applications via rewrites:

| Route | Description |
|-------|-------------|
| `/null-mdx` | Landing page (demo mode) or redirect |
| `/null-mdx/docs` | Documentation index |
| `/null-mdx/docs/:slug` | Documentation pages |
| `/null-mdx/docs/llms.txt` | AI-friendly docs index |
| `/null-mdx/blog` | Blog index |
| `/null-mdx/blog/:slug` | Blog posts |
| `/null-mdx/blog/feed.xml` | Blog RSS feed |
| `/null-mdx/about` | About page |
| `/null-mdx/design` | Design system viewer |
| `/null-mdx/assets` | Asset management UI |

### Multi-Zone Integration

To integrate Null MDX into a parent application, add rewrites in your parent app's `next.config.mjs`:

```js
// Parent app next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: 'https://your-null-mdx-deployment.vercel.app/null-mdx/docs/:path*',
      },
      {
        source: '/blog/:path*', 
        destination: 'https://your-null-mdx-deployment.vercel.app/null-mdx/blog/:path*',
      },
    ]
  },
}
```

## Quick Start

### 1. Configure Your Site

Edit `lib/site-config.tsx`:

```tsx
export const siteConfig = {
  mode: "docs",              // "docs" or "blog"
  name: "Your Site",
  tagline: "Your tagline",
  description: "Your description",
  url: "https://yoursite.com",
  isDemo: false,             // Set to false for production
  // ...
}
```

### 2. Add Content

Create MDX files in `content/docs/` or `content/blog/`:

```mdx
---
title: Getting Started
description: Learn how to get started
order: 1
---

# Getting Started

Your content here...
```

### 3. Organize Documentation

For nested documentation sections, create folders:

```
content/docs/
├── getting-started.mdx     # /null-mdx/docs/getting-started
├── installation.mdx        # /null-mdx/docs/installation
└── guides/
    ├── configuration.mdx   # /null-mdx/docs/guides/configuration
    └── writing-content.mdx # /null-mdx/docs/guides/writing-content
```

## Configuration Options

### Site Config

| Option | Type | Description |
|--------|------|-------------|
| `mode` | `"docs" \| "blog"` | Primary content mode |
| `name` | `string` | Site name |
| `tagline` | `string` | Short tagline |
| `description` | `string` | SEO description |
| `url` | `string` | Production URL |
| `logo` | `ReactNode` | Logo component |
| `isDemo` | `boolean` | Show demo landing page |
| `nav` | `array` | Navigation items |
| `author` | `object` | Author info (blog mode) |
| `social` | `object` | Social links |

### Content Frontmatter

```mdx
---
title: Page Title          # Required
description: Page desc     # Optional, used for SEO
date: 2024-01-15          # Required for blog posts
author: John Doe          # Optional
image: /og-image.png      # Optional, OG image
tags: [next, mdx]         # Optional, for filtering
draft: true               # Optional, hides in production
order: 1                  # Optional, for docs ordering
---
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **MDX**: next-mdx-remote + rehype/remark plugins
- **Syntax Highlighting**: Shiki
- **Database**: Supabase (optional, for assets)
- **Deployment**: Vercel

## Environment Variables

Required for asset management:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## License

MIT

---

Built with care for the v0 community.
