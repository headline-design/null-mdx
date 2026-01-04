# Null MDX - Marketing Content

> Marketing deliverables for promoting the Null MDX v0 template

**Template Link**: https://v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F  
**GitHub**: https://github.com/null-dev/null-mdx  
**Live Demo**: https://null-mdx.vercel.app
**Related Project**: [null-proxy](https://github.com/null-dev/null-proxy) - Parent application for multi-zone integration

---

## Table of Contents

1. [Technical Context](#technical-context)
2. [v0 Template Description](#v0-template-description)
3. [X (Twitter) Posts](#x-twitter-posts)
4. [LinkedIn Posts](#linkedin-posts)
5. [Vercel Community Forum Blog Post](#vercel-community-forum-blog-post)
6. [Product Hunt Launch Copy](#product-hunt-launch-copy)
7. [Dev.to / Hashnode Article](#devto--hashnode-article)
8. [Newsletter Announcement](#newsletter-announcement)
9. [Video Script (YouTube/Loom)](#video-script-youtubeloom)

---

## Technical Context

### v0's New VM Environment

Null MDX is built specifically for **v0's new VM-based execution environment**. Unlike traditional browser-based playgrounds, v0's VM provides:

- **Full Node.js runtime** - Server-side code actually runs on the server
- **Real file system access** - MDX files are read and compiled at build/request time
- **True SSR/RSC support** - React Server Components work as intended
- **Native npm package support** - Complex dependencies like `shiki` and `next-mdx-remote` work seamlessly

This is why Null MDX can offer **real MDX compilation**—something impossible in browser-only environments. The template leverages v0's VM to run `next-mdx-remote` server-side, enabling true MDX-to-React transformation with full plugin support.

### Relationship with null-proxy

**null-proxy** is the companion parent application that demonstrates multi-zone integration:

```
┌─────────────────────────────────────────────────────────────┐
│                       null-proxy                             │
│                   (Parent Application)                       │
│                                                              │
│   next.config.mjs:                                          │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ rewrites: [                                          │   │
│   │   { source: '/docs/:path*',                         │   │
│   │     destination: 'null-mdx.vercel.app/null-mdx/...' │   │
│   │   }                                                  │   │
│   │ ]                                                    │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                 │
└────────────────────────────│─────────────────────────────────┘
                             │ rewrites
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                       null-mdx                               │
│                 (Documentation/Blog App)                     │
│                                                              │
│   All routes under /null-mdx/*:                             │
│   - /null-mdx/docs/*                                        │
│   - /null-mdx/blog/*                                        │
│   - /null-mdx/api/*                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Why this architecture?**

1. **Independent deployments** - Update docs without touching the main app
2. **Separate concerns** - Content team can work in isolation
3. **Performance isolation** - Docs traffic doesn't affect main app
4. **Flexible scaling** - Scale docs and main app independently

### Next.js Config Rewrites

The magic happens in the parent app's `next.config.mjs`:

```js
// null-proxy/next.config.mjs
export default {
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite /docs to Null MDX deployment
        {
          source: '/docs',
          destination: 'https://null-mdx.vercel.app/null-mdx/docs',
        },
        {
          source: '/docs/:path*',
          destination: 'https://null-mdx.vercel.app/null-mdx/docs/:path*',
        },
        // Rewrite /blog to Null MDX deployment
        {
          source: '/blog',
          destination: 'https://null-mdx.vercel.app/null-mdx/blog',
        },
        {
          source: '/blog/:path*',
          destination: 'https://null-mdx.vercel.app/null-mdx/blog/:path*',
        },
      ],
    }
  },
}
```

**Key design decisions:**

- All Null MDX routes live under `/null-mdx/*` to avoid conflicts
- Root navigation links use `<a>` tags (not `<Link>`) for proper zone transitions
- The `isDemo` config determines whether to show the landing page or redirect

---

## v0 Template Description

### Short Description (280 chars)

```
The first v0 template with real MDX support—powered by v0's new VM environment. Build production-ready documentation and blogs with server-side MDX rendering, syntax highlighting, and multi-zone architecture. Works with null-proxy for seamless integration.
```

### Long Description

```
Null MDX is a production-ready Next.js 16 template designed for content-heavy sites. Built specifically for v0's new VM-based execution environment, it's the first template to offer true server-side MDX compilation.

Why "Null"? Start from nothing, with zero assumptions. No opinionated styling you'll fight against. No bloated features you'll rip out. Just a clean, minimal foundation that scales with your needs.

**What Makes Null MDX Unique:**

- Real MDX Support - Server-side MDX rendering via next-mdx-remote, only possible thanks to v0's VM environment running actual Node.js
- Dual-Mode Architecture - Toggle between docs and blog mode with a single config change
- Multi-Zone Ready - Designed to work with null-proxy or any parent app via Next.js rewrites. All routes under /null-mdx/* for clean integration
- v0 VM Native - Leverages v0's full server-side capabilities: RSC, file system access, and npm packages like Shiki that require Node.js

**How It Works with null-proxy:**

Deploy Null MDX separately, add rewrites in your parent app, and your docs appear seamlessly integrated while remaining independently maintainable.

**Tech Stack:**
Next.js 16 (App Router) | Tailwind CSS v4 | shadcn/ui | Shiki | Supabase | Vercel

Perfect for: Developer documentation, technical blogs, product docs, knowledge bases, and any content-focused site.
```

---

## X (Twitter) Posts

### Launch Announcement

```
Introducing Null MDX—the first v0 template with real MDX support.

Built for v0's new VM environment. Actual server-side MDX compilation. Not a workaround.

→ Server-side rendering via next-mdx-remote
→ Shiki syntax highlighting
→ Multi-zone ready (works with null-proxy)

v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F
```

### Feature Thread (1/6)

```
Why v0's new VM environment changes everything for documentation—and how Null MDX takes advantage of it. 🧵

v0 used to be browser-only. Great for UI, but limited for server-side features.

The new VM environment? Full Node.js runtime. Real file system. True SSR.
```

### Feature Thread (2/6)

```
This is why Null MDX can offer REAL MDX compilation.

next-mdx-remote runs server-side
Shiki highlights code at build time
rehype/remark plugins actually work

None of this was possible in browser-only v0.
```

### Feature Thread (3/6)

```
The architecture is designed for multi-zone setups.

Null MDX = your docs/blog app (deployed separately)
null-proxy = your parent app (with rewrites)

Users see: yoursite.com/docs
Behind the scenes: null-mdx.vercel.app/null-mdx/docs
```

### Feature Thread (4/6)

```
Why subroutes matter:

All Null MDX routes live under /null-mdx/*

This means:
- No route conflicts with your main app
- Clean rewrite rules
- Easy to reason about what lives where
```

### Feature Thread (5/6)

```
The rewrite config is simple:

// next.config.mjs (parent app)
rewrites: [{
  source: '/docs/:path*',
  destination: 'https://null-mdx.vercel.app/null-mdx/docs/:path*'
}]

Your docs are now part of your site. Separately deployed. Independently scaled.
```

### Feature Thread (6/6)

```
Try it yourself:

Template: v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F
GitHub: github.com/null-dev/null-mdx

Built for v0's VM. Ready for multi-zone.

Start from nothing. Build everything. ∅
```

### VM Environment Focus Post

```
v0's new VM environment is underrated.

It's not just "v0 but faster"—it's a fundamentally different runtime.

Null MDX proves it: real MDX compilation, Shiki highlighting, server-side content loading.

Things that were impossible before? Now they just work.

v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F
```

### Multi-Zone Post

```
Hot take: Your docs should be a separate deployment.

Null MDX + null-proxy = multi-zone documentation architecture

- Deploy docs independently
- Update without touching main app
- Scale separately
- Same domain, different apps

Next.js rewrites make it seamless.

v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F
```

---

## LinkedIn Posts

### Professional Launch Announcement

```
Excited to share Null MDX—the first v0 template with real MDX support.

This template showcases what's now possible with v0's new VM-based execution environment. Unlike browser-only playgrounds, v0 now runs actual Node.js server-side, enabling features that were previously impossible:

→ Server-side MDX compilation via next-mdx-remote
→ Shiki syntax highlighting (requires Node.js)
→ Full React Server Components support
→ Real file system access for content loading

The architecture is designed for multi-zone deployments:

Null MDX handles your docs and blog as a separate deployment. Your parent application (like null-proxy) uses Next.js rewrites to integrate them seamlessly. Users see yoursite.com/docs, but behind the scenes it's a separate, independently-deployed application.

Why does this matter?

1. Update documentation without touching your main codebase
2. Scale docs and app traffic independently  
3. Content teams can work in isolation
4. Cleaner separation of concerns

As a v0 Ambassador, I'm excited about what the new VM environment enables. Null MDX is proof that v0 isn't just for UI prototypes anymore—it's a full development platform.

Try it: https://v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F

#NextJS #Vercel #v0 #Documentation #DeveloperTools
```

### Technical Deep Dive Post

```
Let's talk about Next.js multi-zone architecture and why it matters for documentation.

The traditional approach: docs live in your main monorepo. Every typo fix requires a full redeploy of your entire application.

The multi-zone approach: docs are a separate Next.js app, integrated via rewrites.

I built Null MDX to demonstrate this pattern on v0.

How it works:

1. Null MDX deploys as a standalone app at null-mdx.vercel.app
2. All routes live under /null-mdx/* (avoids conflicts)
3. Your parent app adds rewrites:

```js
// next.config.mjs
rewrites: [{
  source: '/docs/:path*',
  destination: 'https://null-mdx.vercel.app/null-mdx/docs/:path*'
}]
```

4. Users see yoursite.com/docs—completely seamless

Key insight: Root navigation links must use <a> tags, not <Link>. Client-side routing breaks across zones; full page navigation is required.

This pattern is production-ready. I've seen it used at scale by teams who need to:
- Update docs without CI pipelines for the main app
- Give content teams their own deployment workflow
- Isolate traffic and scaling concerns

Null MDX makes this architecture accessible in v0.

Check it out: https://v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F

What's your approach to documentation architecture?
```

---

## Vercel Community Forum Blog Post

### Title: Null MDX: Building Real MDX Documentation in v0's New VM Environment

```markdown
# Null MDX: Building Real MDX Documentation in v0's New VM Environment

Hey Vercel community!

I'm excited to share **Null MDX**—the first v0 template with real MDX support, built specifically for v0's new VM-based execution environment.

## What's Different About v0's VM Environment?

If you've been using v0 for a while, you might remember the browser-only days. Great for UI components, but limited when it came to server-side features.

The new VM environment changes everything:

- **Full Node.js runtime**: Server-side code actually runs on a server
- **Real file system access**: Read MDX files at build time, not runtime hacks
- **True RSC support**: React Server Components work as designed
- **Native npm packages**: Complex dependencies like Shiki that require Node.js now work

This is why Null MDX can offer **true MDX compilation**. We're running `next-mdx-remote` server-side, with full `rehype` and `remark` plugin support. Not a workaround—the real thing.

## The Multi-Zone Architecture

Null MDX is designed to work with **null-proxy** or any parent application using Next.js rewrites.

### The Pattern

```
Your Main App (null-proxy)          Null MDX
─────────────────────────           ─────────
yoursite.com                        null-mdx.vercel.app
    │                                   │
    ├── /                              ├── /null-mdx/
    ├── /app                           ├── /null-mdx/docs
    ├── /pricing                       ├── /null-mdx/blog
    └── /docs/* ──rewrites──────────►  └── /null-mdx/docs/*
```

### How Rewrites Work

In your parent app's `next.config.mjs`:

```js
export default {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/docs',
          destination: 'https://null-mdx.vercel.app/null-mdx/docs',
        },
        {
          source: '/docs/:path*',
          destination: 'https://null-mdx.vercel.app/null-mdx/docs/:path*',
        },
      ],
    }
  },
}
```

Users visit `yoursite.com/docs`—Vercel rewrites to Null MDX transparently.

### Why Subroutes?

All Null MDX routes live under `/null-mdx/*`. This is intentional:

1. **No conflicts**: Your main app's routes won't collide
2. **Clear ownership**: Easy to understand what lives where
3. **Simple rewrites**: The destination paths are predictable

### The `<a>` vs `<Link>` Decision

One gotcha with multi-zone: client-side routing breaks across zone boundaries.

That's why Null MDX uses native `<a>` tags for root navigation (`/`, `/docs`, `/blog`). When you click these links, you get a full page navigation—which is what you need when crossing zone boundaries.

## Key Features

| Feature | How It Works |
|---------|--------------|
| **Server-side MDX** | `next-mdx-remote` runs in v0's VM |
| **Shiki highlighting** | Node.js-powered syntax themes |
| **Dual mode** | Toggle docs/blog via config |
| **Search** | Full-text search, ⌘K shortcut |
| **AI Assistant** | Built-in "Ask AI" for queries |
| **RSS/LLMs.txt** | Auto-generated feeds |

## Try It Out

**Template**: [v0.app/templates/null-mdx-UMPAmCipNKt](https://v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F)

**GitHub**: [github.com/null-dev/null-mdx](https://github.com/null-dev/null-mdx)

**Related**: [null-proxy](https://github.com/null-dev/null-proxy) - Example parent app with rewrites

## What's Next?

I'm actively developing Null MDX and would love feedback. Roadmap includes:
- Versioned documentation
- i18n support
- More syntax themes

As a v0 Ambassador, I'm committed to building templates that showcase what's possible with v0's evolving platform. The VM environment opens doors that weren't there before—Null MDX is just the beginning.

Questions? Drop a comment below!

Start from nothing. Build everything. ∅
```

---

## Product Hunt Launch Copy

### Tagline (60 chars max)

```
Real MDX support for v0, powered by the new VM runtime
```

### Short Description (260 chars)

```
Null MDX brings true MDX compilation to v0's new VM environment. Multi-zone ready with null-proxy integration. Server-side rendering, Shiki highlighting, docs & blog modes. The documentation template that grows with your project.
```

### Full Description

```
Hey Product Hunt!

Null MDX is the first v0 template to leverage v0's new VM-based execution environment for **real MDX support**.

**Why this matters:**

v0's new VM runs actual Node.js server-side. This isn't a browser workaround—it's true server-side MDX compilation with:
- next-mdx-remote for MDX rendering
- Shiki for beautiful syntax highlighting
- Full rehype/remark plugin support

**Multi-Zone Architecture:**

Null MDX is designed to work with **null-proxy** or any parent application:

1. Deploy Null MDX separately
2. Add rewrites in your parent app's next.config.mjs
3. Users see yoursite.com/docs, served from your Null MDX deployment

```js
// Parent app rewrites
source: '/docs/:path*',
destination: 'https://null-mdx.vercel.app/null-mdx/docs/:path*'
```

**Why this architecture?**
- Update docs without redeploying your main app
- Scale docs traffic independently
- Content teams get their own deployment workflow
- Cleaner separation of concerns

**Features:**
- Dual mode (docs or blog)
- Full-text search with ⌘K
- AI assistant for doc queries
- Auto-generated RSS and LLMs.txt
- Design system viewer

**Built with:**
Next.js 16 | Tailwind CSS v4 | shadcn/ui | Shiki | v0 VM

As a v0 Ambassador, I built Null MDX to showcase what's now possible with v0's new capabilities.

Try it free and deploy in minutes.

∅ Start from nothing. Build everything.
```

### Maker Comment

```
Hey everyone!

Quick context on why I built this:

v0 recently shipped a VM-based execution environment. Unlike the browser-only days, v0 now runs real Node.js server-side. This unlocks features that were impossible before.

Null MDX is proof of concept: true server-side MDX compilation in a v0 template.

The multi-zone architecture (working with null-proxy) is something I'm particularly excited about. Your docs can be a separate deployment, integrated seamlessly via Next.js rewrites. Update docs without touching your main app.

As a v0 Ambassador, I wanted to build something that showcases these new capabilities. Null MDX is the result.

Happy to answer questions about the architecture or help with setup!
```

---

## Dev.to / Hashnode Article

### Title: How v0's New VM Environment Enables Real MDX Support (Building Null MDX)

```markdown
# How v0's New VM Environment Enables Real MDX Support

v0 by Vercel has evolved. The new VM-based execution environment isn't just faster—it's a fundamentally different runtime that enables features previously impossible.

I built **Null MDX** to demonstrate what's now possible. Here's the technical deep dive.

## The Old Limitation

v0's original browser-based environment was great for UI components but had significant constraints:

- No real file system access
- Client-side only execution
- Limited npm package support (no Node.js-specific packages)
- No true Server Components

This meant documentation tools like `next-mdx-remote` couldn't work. MDX requires server-side compilation—you need to read `.mdx` files and transform them to React components.

## What the VM Environment Changes

v0's new VM provides:

```
┌─────────────────────────────────────────┐
│           v0 VM Environment             │
├─────────────────────────────────────────┤
│ ✓ Full Node.js runtime                  │
│ ✓ Real file system access               │
│ ✓ Server-side execution                 │
│ ✓ True RSC support                      │
│ ✓ Native npm packages (Shiki, etc.)     │
└─────────────────────────────────────────┘
```

This is why Null MDX can do what it does.

## How Null MDX Works

### MDX Compilation

```tsx
// components/mdx-content.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/mdx-components'

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote 
      source={source} 
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [rehypePrettyCode, { theme: 'github-dark' }],
            rehypeSlug,
            rehypeAutolinkHeadings,
          ],
        },
      }}
    />
  )
}
```

This runs **server-side in v0's VM**. The MDX is compiled to React components at request time, with full plugin support.

### Content Loading

```tsx
// lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getDocBySlug(slug: string) {
  const filePath = path.join(process.cwd(), 'content/docs', `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return { frontmatter: data, content }
}
```

Real `fs` access. Real `path.join`. Not polyfills—the actual Node.js APIs.

## Multi-Zone Architecture with null-proxy

Null MDX is designed to work as part of a multi-zone setup:

### The Architecture

```
┌────────────────────────────────────────────────────┐
│                  null-proxy                         │
│              (Parent Application)                   │
│                                                     │
│  Routes:           Rewrites:                        │
│  /                 /docs/* → null-mdx/null-mdx/docs/*  │
│  /app              /blog/* → null-mdx/null-mdx/blog/*  │
│  /pricing                                           │
└────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│                   null-mdx                          │
│            (Documentation/Blog App)                 │
│                                                     │
│  Routes (all under /null-mdx/):                    │
│  /null-mdx/docs/*                                  │
│  /null-mdx/blog/*                                  │
│  /null-mdx/api/*                                   │
└────────────────────────────────────────────────────┘
```

### Rewrite Configuration

```js
// null-proxy/next.config.mjs
export default {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/docs',
          destination: 'https://null-mdx.vercel.app/null-mdx/docs',
        },
        {
          source: '/docs/:path*',
          destination: 'https://null-mdx.vercel.app/null-mdx/docs/:path*',
        },
      ],
    }
  },
}
```

### Why Subroutes?

All Null MDX routes live under `/null-mdx/*`. This prevents route collisions and makes the rewrite rules predictable.

### Navigation Across Zones

One gotcha: Next.js `<Link>` components use client-side routing, which breaks across zone boundaries.

Solution: Use native `<a>` tags for root routes:

```tsx
// For cross-zone navigation
<a href="/docs">Docs</a>

// For same-zone navigation
<Link href="/docs/getting-started">Getting Started</Link>
```

## Try It Yourself

**Template**: [v0.app/templates/null-mdx-UMPAmCipNKt](https://v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F)

**GitHub**: 
- [null-mdx](https://github.com/null-dev/null-mdx)
- [null-proxy](https://github.com/null-dev/null-proxy)

## What This Means for v0

The VM environment transforms what's possible in v0:

- **Documentation sites** with real MDX
- **Server-side data fetching** without API routes
- **Complex npm packages** that require Node.js
- **Multi-zone architectures** for enterprise setups

Null MDX is just one example. I'm excited to see what the community builds.

Start from nothing. Build everything. ∅
```

---

## Newsletter Announcement

### Subject Lines (A/B test)

```
A: v0's new VM runtime enables real MDX—here's proof
B: Introducing Null MDX: multi-zone documentation for v0
C: The documentation architecture your team actually needs
```

### Body

```
Hey [First Name],

Big update: v0 now has a VM-based execution environment. This isn't just faster—it's a fundamentally different runtime.

I built **Null MDX** to showcase what this enables: real server-side MDX compilation in a v0 template.

**What's new:**

→ **True MDX support** - next-mdx-remote runs server-side, not client-side hacks
→ **Shiki highlighting** - Node.js-powered syntax themes that actually look good
→ **Multi-zone ready** - Designed to work with null-proxy via Next.js rewrites

**The multi-zone architecture:**

Deploy Null MDX separately. Add rewrites in your parent app. Users see yoursite.com/docs—served from your Null MDX deployment.

```js
// Your parent app
rewrites: [{
  source: '/docs/:path*',
  destination: 'https://null-mdx.vercel.app/null-mdx/docs/:path*'
}]
```

Update docs without touching your main codebase. Scale independently. Content teams get their own workflow.

**Try it:**
[v0.app/templates/null-mdx-UMPAmCipNKt](https://v0.app/templates/null-mdx-UMPAmCipNKt?ref=L1II0F)

As a v0 Ambassador, I'm excited about what the VM environment enables. This is just the beginning.

Cheers,
[Your Name]

P.S. - Check out null-proxy on GitHub for a complete example of the multi-zone setup.
```

---

## Video Script (YouTube/Loom)

### 4-Minute Demo: Null MDX + v0 VM + Multi-Zone Architecture

```
[INTRO - 0:00-0:30]

v0 just shipped something big: a VM-based execution environment.

This isn't just "v0 but faster." It's a full Node.js runtime that enables features that were impossible before.

Today I'll show you Null MDX—a template I built to prove what's now possible. Real MDX compilation. Multi-zone architecture. Production-ready documentation.

[v0 VM EXPLANATION - 0:30-1:15]

First, let's talk about what changed.

Old v0: browser-only. Great for UI, but no server-side code. You couldn't run things like next-mdx-remote or Shiki because they need Node.js.

New v0: actual VM. Real file system. Real Node.js. True server components.

[Show code: fs.readFileSync, MDXRemote server component]

See this? This is reading MDX files from the file system and compiling them server-side. In v0. For real.

[MULTI-ZONE ARCHITECTURE - 1:15-2:30]

Now here's where it gets interesting: multi-zone architecture.

[Show diagram]

Null MDX doesn't have to be your only app. It's designed to work alongside a parent application.

[Show null-proxy next.config.mjs]

Your parent app—like null-proxy—adds rewrites. Users visit yoursite.com/docs. Behind the scenes, that's served by Null MDX.

[Show browser: navigate from main site to docs]

See? Seamless. But these are two different deployments. Two different repos. Independent scaling.

Why does this matter?

1. Update docs without redeploying your whole app
2. Content teams get their own workflow
3. Scale docs traffic separately

[KEY FEATURES - 2:30-3:30]

Quick tour of what you get:

[Show docs mode]
Documentation mode: sidebar navigation, table of contents, search.

[Show blog mode]
Flip the config: blog mode. Chronological posts, author info, tags.

[Show search]
Full-text search with Command-K.

[Show syntax highlighting]
Shiki syntax highlighting—because code should look good.

[Show LLMs.txt]
Even an LLMs.txt for AI crawlers.

[GETTING STARTED - 3:30-4:00]

Try it yourself:

[Show v0 template page]

One click to use. Deploy to Vercel. Edit the config. Add your content.

If you want multi-zone, check out null-proxy on GitHub for a complete example.

Links in the description.

Start from nothing. Build everything.
```

---

## Social Media Assets Checklist

### Required Visuals

- [ ] Template preview screenshot (light mode)
- [ ] Template preview screenshot (dark mode)
- [ ] Architecture diagram (null-proxy + null-mdx)
- [ ] Code snippet graphic: rewrite configuration
- [ ] v0 VM vs browser comparison graphic
- [ ] Feature grid (search, AI, RSS, etc.)

### Video Assets

- [ ] 60-second teaser for Twitter/LinkedIn
- [ ] 4-minute full demo for YouTube
- [ ] GIF: multi-zone navigation demo
- [ ] GIF: mode switching (docs → blog)

### Copy Variants

- [ ] 280-char version (Twitter)
- [ ] 500-char version (LinkedIn preview)
- [ ] 1000-char version (full LinkedIn)
- [ ] 2000-char version (blog intro)
