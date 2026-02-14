# Null MDX & Null Proxy - Marketing Content Deliverables

> Compiled marketing assets for promoting the Null ecosystem of v0 templates.
> Author context: v0 Ambassador promoting v0 templates.

---

## Table of Contents

1. [X (Twitter) Posts](#x-twitter-posts)
2. [LinkedIn Posts](#linkedin-posts)
3. [v0 Template Descriptions](#v0-template-descriptions)
4. [GitHub README Badges & Highlights](#github-readme-badges--highlights)
5. [Vercel Community Forum Blog Post](#vercel-community-forum-blog-post)
6. [Product Hunt / Launch Copy](#product-hunt--launch-copy)
7. [Dev.to / Hashnode Article Outline](#devto--hashnode-article-outline)
8. [Newsletter / Email Announcement](#newsletter--email-announcement)
9. [LinkedIn Long-Form Article](#linkedin-long-form-article)
10. [X Long-Form Article](#x-long-form-article)
11. [Hero Image Prompt](#hero-image-prompt)
12. [Key Links Reference](#key-links-reference)

---

## X (Twitter) Posts

### Launch Thread (Null MDX)

**Post 1 (Hook):**

> Introducing Null MDX - the first v0 template with real MDX support.
>
> Documentation and blog in a single Next.js 16 template. Server-side markdown compilation, syntax highlighting, full component support.
>
> Built entirely inside v0's new sandbox VM.
>
> Thread:

**Post 2 (The Problem):**

> Every docs template I tried in v0 had the same problem: no real markdown support.
>
> You'd get hardcoded strings or static JSON. No MDX compilation. No syntax highlighting. No custom components.
>
> The new v0 VM changed everything. It runs a real Node.js environment. That means real compilers, real build tools, real MDX.

**Post 3 (What It Does):**

> What Null MDX gives you:
>
> - Server-side MDX rendering via next-mdx-remote
> - Syntax highlighting with Shiki + rehype-pretty-code
> - GitHub Flavored Markdown with remark-gfm
> - Docs mode + Blog mode (toggle with one config)
> - Full-text search, Table of Contents, RSS, LLMs.txt
> - Optional Supabase asset management (inspired by Lee Robinson's approach to object storage at Cursor)
> - Multi-Zone ready architecture

**Post 4 (The Innovation):**

> Why this matters: v0's new sandbox-based runtime runs full Linux VMs.
>
> That means Null MDX compiles actual .mdx files server-side, runs Shiki for syntax highlighting, and processes remark/rehype plugins - all live inside v0.
>
> This was impossible before Feb 2026. Now it's a template you can fork in seconds.

**Post 5 (Null Proxy):**

> It gets better. Null Proxy is the companion template - a Multi-Zone gateway that routes your landing page, docs, and blog under one domain.
>
> Two apps. One URL. Zero config friction.
>
> Null Proxy: v0.app/templates/null-proxy-4PQrDpMpnP5
> Null MDX: v0.app/templates/null-mdx-OSVvIj4RBu8

**Post 6 (CTA):**

> Start from nothing. Build everything.
>
> Null MDX: https://v0.app/templates/null-mdx-OSVvIj4RBu8
> Null Proxy: https://v0.app/templates/null-proxy-4PQrDpMpnP5
>
> Live: https://null-mdx.vercel.app
> GitHub: https://github.com/headline-design/null-mdx
>
> Built for the v0 community. MIT licensed.

---

### Standalone Posts (Rotate Throughout the Week)

**Standalone 1 (Technical Flex):**

> v0's new VM runs full Node.js environments. So I built a template that compiles MDX server-side, runs Shiki for syntax highlighting, and processes remark/rehype plugins - all live inside v0's sandbox.
>
> Null MDX. The first v0 template with real markdown compilation.
>
> https://v0.app/templates/null-mdx-OSVvIj4RBu8

**Standalone 2 (Use Case):**

> Need docs for your open source project? Or a dev blog? Or both?
>
> Null MDX does all three. Toggle between docs and blog mode with a single config change. Full MDX support, syntax highlighting, search, RSS.
>
> Fork it on v0 in 30 seconds: https://v0.app/templates/null-mdx-OSVvIj4RBu8

**Standalone 3 (Multi-Zone Angle):**

> Two v0 templates. One unified domain.
>
> Null Proxy handles your landing page and routes. Null MDX handles your docs and blog. Next.js Multi-Zones connects them transparently.
>
> This is what modern content architecture looks like.
>
> https://null-proxy.vercel.app

**Standalone 4 (Ambassador Angle):**

> As a v0 ambassador, my job is to push what's possible.
>
> The new v0 sandbox runs real Linux VMs with full Node.js. That means compilers, build tools, and runtime plugins work natively.
>
> Null MDX is proof. Real MDX compilation. Real syntax highlighting. Real template.
>
> https://v0.app/templates/null-mdx-OSVvIj4RBu8

**Standalone 5 (Supabase Asset Management):**

> Lee Robinson spent $56K on CMS CDN costs at Cursor. His solution? Drop the CMS, build a simple asset manager on object storage.
>
> Null MDX ships with that pattern built-in. Optional Supabase Storage integration with a drag-and-drop upload GUI, optimized image serving, and immutable caching.
>
> No CMS markup. No vendor CDN. Just object storage + a few API routes.
>
> https://v0.app/templates/null-mdx-OSVvIj4RBu8

**Standalone 6 (Short Banger):**

> The new v0 runs full VMs.
>
> So I built a docs template that actually compiles markdown.
>
> https://v0.app/templates/null-mdx-OSVvIj4RBu8

---

## LinkedIn Posts

### LinkedIn Post 1 (Professional Launch)

> **I just shipped the first v0 template with real MDX support.**
>
> When Vercel launched the new v0 in February 2026, they didn't just update the UI. They rebuilt the entire runtime from the ground up. v0 now runs full sandbox-based Linux VMs with real Node.js environments.
>
> That architectural shift made something new possible: templates that run actual compilers and build tools inside v0's sandbox.
>
> Null MDX is the result. It's a production-ready Next.js 16 template for documentation and blog sites that compiles real .mdx files server-side using next-mdx-remote, Shiki syntax highlighting, and the full remark/rehype plugin ecosystem.
>
> What's included:
> - Dual-mode architecture (docs + blog, toggle with one config)
> - Server-side MDX rendering with full component support
> - Syntax highlighting via Shiki and rehype-pretty-code
> - Full-text search with keyboard shortcuts
> - Auto-generated Table of Contents with scroll tracking
> - RSS feed and LLMs.txt for AI discoverability
> - Multi-Zone ready for integration with parent applications
>
> I also built Null Proxy, a companion template that serves as a Multi-Zone gateway - routing landing pages, docs, and blog content under a single domain using Next.js rewrites.
>
> Both templates are MIT licensed and available on v0 and GitHub.
>
> Null MDX: https://v0.app/templates/null-mdx-OSVvIj4RBu8
> Null Proxy: https://v0.app/templates/null-proxy-4PQrDpMpnP5
> Live demo: https://null-mdx.vercel.app
>
> #v0 #Vercel #NextJS #MDX #OpenSource #DevTools #Documentation

### LinkedIn Post 2 (Thought Leadership)

> **The new v0 isn't a chatbot. It's a development environment.**
>
> I've been building v0 templates as an ambassador since v0 went GA, and the February 2026 rebuild fundamentally changed what's possible.
>
> The old v0 generated code. The new v0 runs code. It imports GitHub repos, pulls environment variables, runs full Linux VMs with Node.js, and pushes commits through proper git workflows.
>
> To test the limits, I built Null MDX - a documentation template that compiles actual MDX files server-side. It runs Shiki for syntax highlighting, processes remark and rehype plugins, and serves fully rendered markdown with custom React components.
>
> None of this was possible in the old v0. The sandbox VM architecture makes it real.
>
> Then I built Null Proxy on top of it - a Multi-Zone gateway that routes multiple Next.js applications under one domain. Two v0 templates working together as a production content system.
>
> This is what "vibe coding" looks like when it grows up. Not demos. Production software.
>
> Links in the comments.
>
> #v0 #Vercel #WebDevelopment #NextJS #AI #DeveloperTools

---

## v0 Template Descriptions

### Null MDX - Template Description

> **Null MDX - Start from nothing. Build everything.**
>
> The first v0 template with real MDX support. A production-ready Next.js 16 template for documentation sites, developer blogs, or both.
>
> **Key Features:**
> - Real server-side MDX compilation via next-mdx-remote
> - Syntax highlighting with Shiki and rehype-pretty-code
> - Dual-mode architecture: toggle between docs and blog with one config change
> - Full-text search with keyboard shortcuts (Cmd+K)
> - Auto-generated Table of Contents with scroll tracking
> - Reading progress indicator for long-form content
> - RSS feed generation and LLMs.txt for AI discoverability
> - Multi-Zone ready for integration with parent applications
> - Built-in design system viewer
> - Optional Supabase Storage integration for asset management - inspired by Lee Robinson's approach at Cursor, where he replaced a $56K/year CMS CDN with simple object storage and a lightweight upload GUI
>
> **Tech Stack:** Next.js 16, Tailwind CSS v4, shadcn/ui, next-mdx-remote, Shiki, Supabase (optional)
>
> **Note on Supabase:** The Supabase integration is fully optional. Without it, Null MDX gracefully falls back to serving images from the local `/images/` directory. When enabled, you get a full asset management pipeline: drag-and-drop uploads, optimized image rendering via Supabase Storage, immutable CDN caching, and a visual asset manager at `/assets`. Just add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your environment.
>
> **Companion Template:** Pair with Null Proxy for a complete Multi-Zone content system with unified routing under a single domain.

### Null Proxy - Template Description

> **Null Proxy - Route everything through one domain.**
>
> The Multi-Zone gateway for the Null ecosystem. A Next.js routing layer that transparently proxies requests to external applications under a single, clean domain.
>
> **Key Features:**
> - Next.js Multi-Zone routing with transparent rewrites
> - Landing page with modern, minimal design
> - Automatic static asset proxying with proper asset prefixes
> - Server Actions and origin handling configured for production
> - AI agent context file (proxy-context.md) for cross-repo intelligence
>
> **Designed For:** Unifying landing pages, documentation, and blog content served from separate Next.js applications under one domain. Deploy your content on Null MDX, route it through Null Proxy, and give users a seamless single-domain experience.
>
> **Tech Stack:** Next.js 16, Tailwind CSS v4, shadcn/ui
>
> **Companion Template:** Pair with Null MDX for a complete documentation and blog system with real MDX support.

---

## GitHub README Badges & Highlights

### Suggested Badges for Null MDX README

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fheadline-design%2Fnull-mdx)
[![Use v0 Template](https://img.shields.io/badge/v0-Use%20Template-000000?style=for-the-badge&logo=vercel)](https://v0.app/templates/null-mdx-OSVvIj4RBu8)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://null-mdx.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
```

### Suggested Badges for Null Proxy README

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fheadline-design%2Fnull-proxy)
[![Use v0 Template](https://img.shields.io/badge/v0-Use%20Template-000000?style=for-the-badge&logo=vercel)](https://v0.app/templates/null-proxy-4PQrDpMpnP5)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://null-proxy.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
```

### GitHub Social Preview Description

> Null MDX: The first v0 template with real MDX support. Documentation and blog, unified. Built on Next.js 16, Tailwind CSS v4, and shadcn/ui.

---

## Vercel Community Forum Blog Post

### Title: "Building the First v0 Template with Real MDX Compilation"

---

**Introduction**

When Vercel shipped the new v0 in February 2026, they didn't just polish the interface - they rebuilt the entire runtime. The headline was clear: v0 now runs sandbox-based Linux VMs with full Node.js environments. For most people, that meant better code generation. For me, it meant a question: can we finally build a documentation template that compiles real markdown?

The answer is Null MDX.

**The Problem with Docs Templates**

Every documentation template I tried in v0 had the same limitation: no real MDX support. Content was hardcoded in JSX, stored as JSON, or rendered with basic markdown parsers that couldn't handle components, syntax highlighting, or the plugin ecosystem that makes MDX powerful.

The reason was simple: the old v0 runtime couldn't run compilers. MDX compilation requires next-mdx-remote (or a similar compiler), Shiki or Prism for syntax highlighting, and remark/rehype plugins for processing. These are Node.js packages that need a real runtime to execute.

**How the New v0 VM Makes It Possible**

The new v0 is fundamentally different. As Vercel described in their announcement, the new sandbox-based runtime can "import any GitHub repo and automatically pull environment variables and configurations." Every prompt generates production-ready code in a real environment.

This means v0's sandbox runs an actual Node.js process. It installs dependencies. It executes build tools. It runs compilers. And critically for Null MDX, it compiles .mdx files server-side using the full next-mdx-remote pipeline:

1. **MDX Compilation**: next-mdx-remote reads .mdx files from the content directory and compiles them to React components at request time
2. **Syntax Highlighting**: Shiki processes code blocks with full language grammars, producing accurate, theme-aware highlighted code
3. **Plugin Pipeline**: remark-gfm enables GitHub Flavored Markdown (tables, strikethrough, autolinks), rehype-pretty-code handles code block formatting, and rehype-slug/rehype-autolink-headings generate navigable anchor links
4. **Custom Components**: MDX components like Callout, Steps, and Tabs are mapped to React components and rendered server-side

All of this runs live inside v0. You can open the template, edit an .mdx file, and see compiled, syntax-highlighted, component-rich documentation render in the preview pane.

**What Null MDX Includes**

Null MDX is a production-ready Next.js 16 template designed for content-heavy sites. Here's what ships out of the box:

- **Dual-Mode Architecture**: Toggle between `docs` mode (sidebar navigation, ordered sections) and `blog` mode (chronological posts, author attribution, tags) with a single config change in `lib/site-config.tsx`.

- **Full-Text Search**: A built-in search system with keyboard shortcut support (Cmd+K) that indexes all content at build time.

- **Table of Contents**: Auto-generated from headings with real-time scroll tracking, so readers always know where they are in long documents.

- **Reading Progress**: A visual progress indicator for long-form content.

- **RSS Feed**: Auto-generated at `/blog/feed.xml` for syndication.

- **LLMs.txt**: An AI-friendly content index at `/docs/llms.txt`, making your documentation discoverable by AI agents and language models.

- **Design System Viewer**: A built-in design system page at `/design` that showcases all available components.

**Optional Supabase Asset Management (Inspired by Lee Robinson at Cursor)**

One of the features I'm most proud of is the optional Supabase Storage integration. The inspiration came directly from Lee Robinson's blog post about migrating cursor.com off its CMS (leerob.com/agents).

In that post, Lee describes how Cursor was spending $56,848 on CMS CDN usage after just a few months. The fix was straightforward: host assets in object storage and build a simple GUI for managing them. As Lee put it: "This took only 3 or 4 prompts with the agent to get something decent and workable."

Null MDX ships with exactly that pattern, pre-built. Here's what the Supabase integration provides:

1. **Asset API** (`/api/null-mdx/assets`): A full CRUD API for Supabase Storage. Upload files via multipart form data, list assets sorted by creation date, delete by path. Timestamped filenames prevent collisions. Files are cached with `Cache-Control: max-age=31536000` (1 year, immutable).

2. **Individual Asset Serving** (`/api/null-mdx/assets/[name]`): A proxy route that downloads files from Supabase Storage and serves them with proper MIME types. Supports images (JPEG, PNG, GIF, WebP, SVG), PDFs, and video (MP4, WebM). Responses are marked `immutable` for aggressive CDN caching.

3. **Optimized Image Rendering**: The `getOptimizedImageUrl` utility generates Supabase's image transformation URLs with configurable width and quality parameters. Blog cards and MDX image components use this automatically - meaning every image in your content is optimized without manual intervention.

4. **Asset Manager UI** (`/assets`): A full drag-and-drop upload interface with grid view, one-click URL copying, and deletion. This is the "simple GUI on top of object storage" that Lee described building for Cursor.

5. **Graceful Fallback**: The entire Supabase layer is optional. If `NEXT_PUBLIC_SUPABASE_URL` is not set, all image helpers fall back to serving from the local `/images/` directory. The template works identically either way - Supabase just gives you cloud storage and optimization when you need it.

The key insight from Lee's post applies perfectly here: the cost of the CMS abstraction is rarely worth it for developer-focused content sites. Your content is already code (MDX files in a git repo). Your assets should be in simple, cheap object storage. And the GUI for managing them should be something you can build in a few prompts - or in Null MDX's case, something that ships out of the box.

**Multi-Zone Architecture with Null Proxy**

Null MDX is designed to be one half of a complete system. The companion template, Null Proxy, serves as a Multi-Zone gateway that routes requests from a single domain to multiple Next.js applications.

Here's the architecture:

```
User Browser
    |
    v
Null Proxy (Landing Page + Router)
    |
    |-- /           -> Local landing page
    |-- /docs/*     -> Null MDX (Documentation)
    |-- /blog/*     -> Null MDX (Blog)
    |-- /about      -> Null MDX (About)
    v
Null MDX (Content Engine)
```

This means you deploy Null MDX as your content engine, deploy Null Proxy as your public-facing gateway, and users see a single, unified domain. The proxy handles all routing transparently via Next.js rewrites, and static assets are served correctly through the `assetPrefix` configuration.

Why two repositories? Separation of concerns. Your marketing landing page and your documentation content can be owned by different teams, deployed independently, and scaled separately. Update your docs without touching the landing page. Redesign the landing page without rebuilding the docs.

**The "Null" Philosophy**

The name reflects the design philosophy: start from nothing, with zero assumptions. No opinionated styling to fight against. No bloated features to rip out. Just a clean, minimal foundation that scales with your needs.

Every piece of Null MDX is intentional. The styling uses Tailwind CSS v4 and shadcn/ui, so you get a modern component library without lock-in. The content structure uses standard .mdx files in a `content/` directory, so there's no proprietary format. The configuration is a single TypeScript file, so there's no hidden complexity.

**Getting Started**

You can fork either template directly from v0:

- **Null MDX**: [v0.app/templates/null-mdx-OSVvIj4RBu8](https://v0.app/templates/null-mdx-OSVvIj4RBu8)
- **Null Proxy**: [v0.app/templates/null-proxy-4PQrDpMpnP5](https://v0.app/templates/null-proxy-4PQrDpMpnP5)

Or clone from GitHub:

- **Null MDX**: [github.com/headline-design/null-mdx](https://github.com/headline-design/null-mdx)
- **Null Proxy**: [github.com/headline-design/null-proxy](https://github.com/headline-design/null-proxy)

Live demos:

- **Null MDX**: [null-mdx.vercel.app](https://null-mdx.vercel.app)
- **Null Proxy**: [null-proxy.vercel.app](https://null-proxy.vercel.app)

Both templates are MIT licensed and built for the v0 community.

**What's Next**

This is just the beginning of the Null ecosystem. The combination of v0's new VM capabilities and Next.js Multi-Zones opens up patterns that weren't possible before. Imagine a suite of templates - each responsible for a different concern - all composable under a single domain through Null Proxy.

Documentation, blog, changelog, API reference, marketing site. Each built independently. Each deployable independently. All unified through one routing layer.

Start from nothing. Build everything.

---

## Product Hunt / Launch Copy

### Tagline

> The first v0 template with real MDX support. Documentation and blog, unified.

### Description

> Null MDX is a production-ready Next.js 16 template that brings real MDX compilation to v0 for the first time. Made possible by v0's new sandbox VM architecture, it compiles actual .mdx files server-side with Shiki syntax highlighting, remark/rehype plugins, and custom React components.
>
> Toggle between documentation mode and blog mode with a single config change. Get full-text search, auto-generated Table of Contents, RSS feeds, LLMs.txt for AI discoverability, and Multi-Zone support for embedding into larger applications. Optionally connect Supabase for a full asset management pipeline with drag-and-drop uploads, optimized image rendering, and immutable CDN caching - inspired by Lee Robinson's approach to replacing expensive CMS CDNs with simple object storage at Cursor.
>
> Pair it with Null Proxy, the companion gateway template, for a complete Multi-Zone content system under a single domain.
>
> Built on Next.js 16, Tailwind CSS v4, and shadcn/ui. MIT licensed.

### Maker Comment

> I built Null MDX because every docs template I tried in v0 had the same problem: no real markdown support. The new v0 runs full Linux VMs, which means compilers and build tools actually work. So I built a template that takes full advantage of that. Real MDX compilation. Real syntax highlighting. Real plugin pipeline. All running inside v0's sandbox. Would love your feedback.

---

## Dev.to / Hashnode Article Outline

### Title: "How v0's New VM Architecture Made Real MDX Templates Possible"

**Outline:**

1. **Hook**: Why every docs template in v0 was limited before February 2026
2. **Context**: What changed with v0's new sandbox-based runtime (reference Vercel blog post)
3. **The Technical Challenge**: MDX compilation requires next-mdx-remote, Shiki, remark/rehype - all need a real Node.js runtime
4. **How Null MDX Works**: Walk through the compilation pipeline
   - Reading .mdx files from the content directory
   - Server-side compilation with next-mdx-remote
   - Syntax highlighting via Shiki and rehype-pretty-code
   - Custom component mapping (Callout, Steps, Tabs)
   - GitHub Flavored Markdown with remark-gfm
5. **The Dual-Mode Architecture**: How one template serves both docs and blog
6. **Multi-Zone Composition with Null Proxy**: How two templates create a complete content system
   - Next.js Multi-Zones explained
   - The routing architecture
   - Asset prefix handling
   - Why separation of concerns matters
7. **Optional Supabase Asset Management**: Inspired by Lee Robinson's $56K CMS lesson at Cursor
   - The "content is just code" philosophy extends to assets
   - Full CRUD API for Supabase Storage with optimized image rendering
   - Drag-and-drop asset manager UI
   - Graceful fallback to local `/images/` when Supabase isn't configured
   - Why cheap object storage beats CMS CDN pricing every time
8. **Built-in Features Deep Dive**: Search, ToC, RSS, LLMs.txt, design system
9. **Getting Started**: Fork it, configure it, deploy it
9. **What This Means for v0 Templates**: The VM unlocks a new class of templates that require real build tools

**Suggested Tags:** #v0 #nextjs #mdx #vercel #webdev #documentation #opensource

---

## Newsletter / Email Announcement

### Subject Line Options

- "The first v0 template that compiles real markdown"
- "Null MDX: Documentation + Blog in one v0 template"
- "What's possible now that v0 runs full VMs"

### Email Body

> **Null MDX is live.**
>
> It's the first v0 template with real MDX support - server-side markdown compilation, Shiki syntax highlighting, and the full remark/rehype plugin ecosystem. All running inside v0's new sandbox VM.
>
> **What it does:**
> - Compiles actual .mdx files with next-mdx-remote
> - Toggles between docs mode and blog mode with one config change
> - Includes full-text search, Table of Contents, RSS, and LLMs.txt
> - Ships with a built-in design system viewer
> - Optional Supabase Storage integration for asset management (inspired by Lee Robinson's object-storage-over-CMS approach at Cursor - works without Supabase too)
>
> **The bigger picture:**
> Null Proxy is the companion template - a Multi-Zone gateway that routes your landing page, docs, and blog under one domain. Two apps. One URL. Deploy independently.
>
> **Try it:**
> - Fork Null MDX on v0: https://v0.app/templates/null-mdx-OSVvIj4RBu8
> - Fork Null Proxy on v0: https://v0.app/templates/null-proxy-4PQrDpMpnP5
> - See the live demo: https://null-mdx.vercel.app
> - Star on GitHub: https://github.com/headline-design/null-mdx
>
> Both templates are MIT licensed. Built for the v0 community.

---

## LinkedIn Long-Form Article

### Title: "The Infrastructure Decision Behind Every Documentation Site (And Why Most Teams Get It Wrong)"

---

Last year, Lee Robinson published a post about migrating cursor.com off its headless CMS. The numbers were striking: $56,848 in CDN costs after just a few months, a content workflow that required non-engineers to learn a proprietary editor, and a stack of abstraction layers between the people writing docs and the people reading them.

His conclusion was simple. Content is code. Treat it that way.

That post crystallized something I had been thinking about for a while. As a v0 ambassador building templates for Vercel's AI-native development platform, I kept running into the same architectural gap: every documentation solution available in v0 treated content as a second-class citizen. Hardcoded JSX strings. Static JSON blobs. Basic markdown parsers that couldn't handle the component model that modern documentation requires.

The problem wasn't v0. The problem was that real documentation compilation requires a real runtime - and until February 2026, that runtime didn't exist inside v0.

**What Changed**

When Vercel shipped the new v0, they rebuilt the runtime from the ground up. The platform now runs sandbox-based Linux VMs with full Node.js environments. That's not a marketing line - it's a material infrastructure change. It means v0 can install npm packages, execute build tools, and run compilers. The same compilers that power documentation sites like the Next.js docs, the Tailwind docs, and the Stripe docs.

This is the gap I wanted to close.

**Null MDX: The Architecture**

Null MDX is a Next.js 16 template that compiles real MDX files server-side. MDX - if you're not familiar - is Markdown with JSX support. It lets you write documentation in plain markdown while embedding interactive React components inline. It's the format behind most of the best developer documentation on the web.

The compilation pipeline runs entirely at request time inside v0's sandbox:

1. next-mdx-remote reads .mdx files from a standard content directory and compiles them to React components
2. Shiki processes code blocks with full language grammars for accurate, theme-aware syntax highlighting
3. remark and rehype plugins handle GitHub Flavored Markdown, heading anchors, and code formatting
4. Custom MDX components (callouts, step wizards, tabbed interfaces) are mapped and rendered server-side

The result is documentation that looks and behaves like a polished product - because it is one.

**The Dual-Mode Problem**

One of the more interesting architectural decisions was supporting both documentation and blog formats in a single template. These are different content models: docs are hierarchical (sections, pages, ordering), blogs are chronological (dates, authors, tags). Most teams end up with two separate systems.

Null MDX handles this with a single configuration toggle. The same MDX compilation pipeline, the same component library, the same deployment - just a different content model applied at the routing layer. Switch from `docs` to `blog` in one line of config.

For teams that need both (and most developer-facing companies do), this eliminates an entire class of infrastructure decisions.

**The Asset Management Question**

Lee Robinson's post about Cursor's CMS costs resonated because it exposed a pattern I see constantly: teams paying for content management complexity they don't need.

When your content is MDX files in a Git repository, you don't need a CMS. What you might need is a place to put images and media. Null MDX includes an optional Supabase Storage integration for exactly this purpose:

- A full CRUD API for uploading, listing, and deleting assets
- Optimized image rendering with configurable width and quality parameters
- A visual asset manager with drag-and-drop upload
- Immutable CDN caching (1-year cache headers)

The key word is "optional." If you don't configure Supabase, the template serves images from a local directory. No errors. No degraded experience. Just a different storage backend. This is the kind of progressive enhancement that production infrastructure requires - it works at every scale, from a side project to a company docs site.

**Multi-Zone Composition**

The companion template, Null Proxy, solves the last major architectural problem: domain unification. It's a Next.js routing layer that proxies requests to multiple applications under a single domain.

Your marketing site, your documentation, and your blog can be separate codebases, deployed independently, owned by different teams - but presented to users as one seamless experience. This is the Multi-Zone pattern that Next.js supports natively, packaged as a template you can deploy in minutes.

The separation of concerns here is meaningful for organizations:

- Marketing can ship landing page changes without touching docs
- Engineering can update documentation without a marketing deploy
- Content can publish blog posts without coordinating with either team
- Each app scales independently based on its own traffic patterns

**Why This Matters Beyond Templates**

The larger point is about what v0 has become. It's no longer a code generation tool. It's a development environment that runs real software. The fact that you can open Null MDX in v0, edit an MDX file, and see compiled, syntax-highlighted documentation render live - that's not a demo. That's a workflow.

For engineering leaders evaluating documentation infrastructure, the calculus has changed. The build-versus-buy decision now has a third option: fork a production-ready template in an AI-native environment and customize it to your needs. No vendor lock-in. No CMS subscription. No CDN markup. Just code, in a Git repo, compiled by a real runtime.

Start from nothing. Build everything.

---

**Links:**
- Null MDX template: https://v0.app/templates/null-mdx-OSVvIj4RBu8
- Null Proxy template: https://v0.app/templates/null-proxy-4PQrDpMpnP5
- Live demo: https://null-mdx.vercel.app
- GitHub: https://github.com/headline-design/null-mdx
- Lee Robinson's post on content infrastructure: https://leerob.com/agents

#ContentInfrastructure #DevTools #NextJS #Vercel #v0 #Documentation #Engineering #OpenSource

---

## X Long-Form Article

### Format: X Long Post (Notes / Article)

### Title: "I built a docs template that actually compiles markdown inside v0. Here's the whole story."

---

I've been building v0 templates for a while now. As an ambassador, my whole thing is pushing the edges of what you can build inside v0. Most of the time that means finding where the platform breaks - and then figuring out whether the limitation is real or just something nobody has tried yet.

For months, the limitation was MDX.

Every docs template in v0 was faking it. Hardcoded content in JSX. JSON files pretending to be markdown. Maybe a basic parser that could handle bold and headers but choked on anything real. No syntax highlighting. No custom components. No plugin pipeline. Nothing that would actually ship as a documentation site.

The reason was obvious if you thought about it: MDX compilation needs a real Node.js runtime. next-mdx-remote, Shiki, remark, rehype - these aren't browser packages. They need a server. They need `fs`. They need to actually execute.

The old v0 couldn't do that. It generated code. It didn't run it.

Then February 2026 happened.

**The VM changes everything**

Vercel rebuilt v0 from scratch. The new version runs sandbox-based Linux VMs. Real Node.js. Real npm. Real file systems. They described it as being able to "import any GitHub repo and automatically pull environment variables and configurations."

That's not a small change. That's a category change.

The moment I read the announcement I knew what to build. A docs template that runs the full MDX compilation pipeline - server-side, inside v0's sandbox, with zero compromises.

**What Null MDX actually does**

Here's the pipeline that runs on every page load:

1. next-mdx-remote reads `.mdx` files from `/content`
2. remark-gfm processes GitHub Flavored Markdown (tables, strikethrough, autolinks, task lists)
3. Shiki tokenizes code blocks with full language grammars and outputs theme-aware highlighted HTML via rehype-pretty-code
4. rehype-slug and rehype-autolink-headings generate anchor links for every heading
5. Custom MDX components (Callout, Steps, Tabs, FileTree) get mapped and rendered server-side
6. The compiled output is a fully interactive React component tree

All of this happens in v0's preview pane. Edit an `.mdx` file, save, watch it compile and render. It's wild.

**One template, two modes**

The thing I'm probably most proud of architecturally: Null MDX does both docs and blog.

Docs mode gives you sidebar navigation, section ordering, hierarchical content structure. Blog mode gives you chronological posts, author cards, tag filtering, reading time estimates. Same compilation pipeline. Same components. Same deployment. One config toggle.

```tsx
// lib/site-config.tsx
siteType: "docs" // or "blog" - that's it
```

Every feature works in both modes. Search, Table of Contents, RSS, reading progress, LLMs.txt. You pick the content model that fits and the template adapts.

**The Supabase thing (a Lee Robinson story)**

So Lee Robinson wrote this post about migrating cursor.com off its CMS. The punchline: Cursor was spending $56K on CMS CDN costs. Fifty-six thousand dollars. For serving images on a docs site.

His fix was dead simple. Object storage. A basic upload GUI. A few API routes. Done.

I read that and thought: this should ship in the template.

Null MDX has an optional Supabase Storage integration. Optional is the key word. Don't set the env vars and everything falls back to a local `/images/` directory. Set them and you get:

- Full CRUD API at `/api/null-mdx/assets` (upload, list, delete)
- Individual asset serving with proper MIME types and 1-year immutable caching
- `getOptimizedImageUrl` that generates Supabase image transform URLs with width/quality params
- A drag-and-drop asset manager UI at `/assets` with grid view, copy URL, delete

Blog cards and MDX image components use the optimized URLs automatically. Zero manual image optimization. The "simple GUI on top of object storage" that Lee described building in a few prompts - Null MDX ships it out of the box.

**Multi-Zone: two templates, one domain**

This is where it gets architecturally interesting.

Null MDX is the content engine. It compiles MDX and serves docs/blog pages. But it's not meant to be your entire site. That's where Null Proxy comes in.

```
User hits your-domain.com
         |
    Null Proxy
    |    |    |
    /    /docs  /blog
    |    |       |
  Landing  Null MDX  Null MDX
  Page    (docs mode) (blog mode)
```

Null Proxy is a separate Next.js app that handles routing. It serves your landing page locally and proxies `/docs/*` and `/blog/*` requests to Null MDX via Next.js rewrites. Users see one domain. You deploy two apps. Update docs without touching the landing page. Redesign the landing page without rebuilding docs.

This is the Next.js Multi-Zone pattern, but packaged as something you can actually deploy in minutes instead of spending a week configuring rewrites and asset prefixes.

**The "null" philosophy**

I named it Null MDX because the whole point is starting from zero. No opinions about your design. No bloated feature set to disable. No proprietary content format to learn.

Your content is `.mdx` files in a folder. Your config is one TypeScript file. Your styling is Tailwind v4 + shadcn/ui. Everything is standard. Everything is swappable. Nothing is locked in.

The template is a foundation, not a product. Build on top of it or tear it apart - either way, it's MIT licensed and it's yours.

**What this means for v0**

The bigger thing here isn't Null MDX specifically. It's what the new v0 VM enables.

Before February 2026, v0 templates were limited to what you could do without a real runtime. Now? Any npm package that runs on Node.js can run in v0. Compilers. Bundlers. Image processors. Database clients. The full ecosystem.

Null MDX is proof of concept for that shift. The first template that requires a real compilation runtime and actually gets one. I don't think it'll be the last.

If you're building v0 templates: the constraints are gone. Build the thing you thought wasn't possible. It probably is now.

---

Null MDX: https://v0.app/templates/null-mdx-OSVvIj4RBu8
Null Proxy: https://v0.app/templates/null-proxy-4PQrDpMpnP5
Live: https://null-mdx.vercel.app
GitHub: https://github.com/headline-design/null-mdx

---

## Hero Image Prompt (for Nano Banana)

Use the following prompts with **Nano Banana** (or Nano Banana Pro) to generate hero imagery for the blog post, social cards, and template previews. Each prompt is designed for the Null MDX / Null Proxy ecosystem aesthetic.

### Primary Hero Prompt (Recommended - Blog Post Banner)

> A sleek, dark-mode developer workspace floating in a void. At the center is a glowing transparent editor window showing MDX syntax highlighted in cool whites and soft blues against a near-black background. Behind the editor, faintly visible, is an abstract node graph representing a compilation pipeline - interconnected dots and lines spreading outward like a constellation. Subtle light rays pass through the editor as if the code is being compiled in real-time. The overall aesthetic is ultra-minimal, monochromatic with slight blue accents. The vibe is futuristic developer tooling - clean, precise, powerful. No text overlays. No people. Cinematic composition, wide 16:9 aspect ratio, shallow depth of field.

### Alternate Prompt A (Abstract Architecture)

> An isometric view of a minimal black architecture - two interconnected structures representing a proxy layer and a content engine. The first structure is a slim, monolith-like gateway emitting thin routing lines outward. The second is a more complex crystalline form with visible internal layers, representing MDX compilation stages (parsing, transforming, rendering). The structures are connected by a single luminous bridge. The entire scene sits on a reflective dark surface. Color palette is strictly monochrome - deep blacks, charcoal grays, and bright white edge lighting. The feel is architectural, technical, and premium. No text. No logos. Clean isometric perspective, 4K.

### Alternate Prompt B (Split Composition - MDX + Proxy)

> A split-screen composition divided by a thin glowing vertical line. On the left side, a dark minimal representation of raw markdown and JSX code fragments floating in space, slightly blurred and chaotic. On the right side, the same content rendered as a beautiful, clean web page with sharp typography and structured layout - organized and polished. The transition from left to right tells the story of compilation: chaos becoming order, raw becoming rendered. The palette is black background with white and light gray elements. The dividing line pulses with a subtle white glow. Wide format, editorial, abstract. No UI chrome, no browser frames. 16:9, photorealistic lighting on the rendered side.

### Alternate Prompt C (The VM Concept)

> A dark, atmospheric visualization of a sandboxed virtual machine. A translucent cube floats in empty space, its edges defined by thin white wireframe lines. Inside the cube, visible through the semi-transparent walls, are layered horizontal planes representing different compilation stages - each plane slightly illuminated with a soft glow. Small particle effects drift between the layers like data being processed. Outside the cube, the void is pure black with faint grid lines receding into infinity. The image communicates containment, processing, and precision. It feels like looking into the core of a running system. Monochrome palette, white-on-black, with minimal blue accent lighting inside the cube. Centered composition, 4K, cinematic.

### Alternate Prompt D (Minimal Typographic)

> A stark black background with a single line of beautifully rendered monospaced code in bright white: the characters ".mdx" at the center, large and sharp. Radiating from the text are extremely fine concentric circles, like ripples from a drop of water, getting progressively fainter as they expand outward. The circles are perfectly geometric and precise. Scattered between the rings are tiny, barely-visible fragments of JSX and markdown syntax. The image is dead simple but striking - it communicates that everything starts from this one file extension. No color except white on black. Perfectly centered. Ultra-high resolution, vector-crisp.

### Generation Settings

| Setting | Recommended Value |
|---------|-------------------|
| **Model** | Nano Banana Pro (V2) preferred |
| **Style** | Photorealistic or Digital Art |
| **Aspect Ratio** | 16:9 for blog hero, 1.91:1 for OG cards, 1:1 for thumbnails |
| **Resolution** | 4K (3840x2160) for blog, 1200x630 for social cards |
| **Negative Prompt** | text, watermark, logo, people, hands, bright colors, gradients, noise, grain |

### Output Usage

- **Blog Post Header**: Primary prompt at 16:9 or 2:1 wide banner
- **Open Graph / Social Cards (X/LinkedIn)**: Any prompt cropped to 1200x630px
- **GitHub Social Preview**: Crop to 1280x640px for repository card
- **Product Hunt Gallery**: 1270x760px for carousel images
- **v0 Template Thumbnail**: 1:1 square crop for template listing
- Generate multiple variations and pick the one with the cleanest composition - Nano Banana Pro's editing mode can refine details after initial generation

---

## Key Links Reference

| Asset | URL |
|-------|-----|
| **Null MDX v0 Template** | https://v0.app/templates/null-mdx-OSVvIj4RBu8 |
| **Null Proxy v0 Template** | https://v0.app/templates/null-proxy-4PQrDpMpnP5 |
| **Null MDX Live Demo** | https://null-mdx.vercel.app |
| **Null Proxy Live Demo** | https://null-proxy.vercel.app |
| **Null MDX GitHub** | https://github.com/headline-design/null-mdx |
| **Null Proxy GitHub** | https://github.com/headline-design/null-proxy |
| **Vercel "New v0" Blog Post** | https://vercel.com/blog/introducing-the-new-v0 |
| **Lee Robinson - Coding Agents & Complexity Budgets** | https://leerob.com/agents |

---

*Last updated: February 2026*
