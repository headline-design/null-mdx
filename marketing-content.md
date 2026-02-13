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
9. [Hero Image Prompt](#hero-image-prompt)
10. [Key Links Reference](#key-links-reference)

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

**Standalone 5 (Short Banger):**

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
> - Multi-Zone ready for proxy integration with parent apps
> - Built-in design system viewer
> - Supabase-powered asset management (optional)
>
> **Tech Stack:** Next.js 16, Tailwind CSS v4, shadcn/ui, next-mdx-remote, Shiki, Supabase
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

- **Asset Management**: Optional Supabase integration for media uploads and management.

- **Design System Viewer**: A built-in design system page at `/design` that showcases all available components.

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
> Toggle between documentation mode and blog mode with a single config change. Get full-text search, auto-generated Table of Contents, RSS feeds, LLMs.txt for AI discoverability, and Multi-Zone support for embedding into larger applications.
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
7. **Built-in Features Deep Dive**: Search, ToC, RSS, LLMs.txt, design system
8. **Getting Started**: Fork it, configure it, deploy it
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

---

*Last updated: February 2026*
