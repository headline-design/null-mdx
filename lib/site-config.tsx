// Site configuration - toggle between 'blog' and 'docs' mode
export type SiteMode = "blog" | "docs"

function NullLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M15 7L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export const siteConfig = {
  mode: "docs" as SiteMode,

  // Brand identity
  name: "Null MDX",
  tagline: "Start from nothing. Build everything.",
  description: "The first v0 template with real MDX support. Documentation and blog, unified.",
  url: "https://null.dev",
  logo: <NullLogo />,

  // Author info (used in blog mode)
  author: {
    name: "Null Team",
    email: "hello@null.dev",
    twitter: "@nulldev",
    github: "null-dev",
  },

  // Social links
  social: {
    twitter: "https://twitter.com/nulldev",
    github: "https://github.com/null-dev",
  },

  // When false, the root page redirects to /docs or /blog based on mode
  isDemo: true,

  topNav: [
    { label: "Docs", href: "/docs", activated: true },
    { label: "Blog", href: "/blog", activated: true },
    { label: "API", href: "/docs/api", activated: true },
  ],

  nav: [
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "API", href: "/docs/api/overview" },
    { label: "About", href: "/about" },
    { label: "Design", href: "/design" },
  ],
}

export function isBlogMode() {
  return siteConfig.mode === "blog"
}

export function isDocsMode() {
  return siteConfig.mode === "docs"
}

export function isDemoMode() {
  return siteConfig.isDemo
}
