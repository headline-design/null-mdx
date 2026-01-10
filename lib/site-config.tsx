import { siGithub, siX } from "simple-icons/icons"

const SimpleIconsTwitterIcon = (props: React.ComponentProps<"svg">) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <title>{siX.title}</title>
    <path d={siX.path} />
  </svg>
)

const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <title>{siGithub.title}</title>
    <path d={siGithub.path} />
  </svg>
)

// Site configuration - toggle between 'blog' and 'docs' mode
export type SiteMode = "blog" | "docs"

export const SiteLogo = ({ className,
  width,
  height
}: {
  className?: string,
  width?: number,
  height?: number
}) => (
  <svg
    width={width || 28}
    height={height || 28}
    viewBox="0 0 24 24"
    className={className || "text-primary"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M15 7L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)


export const siteConfig = {
  mode: "docs" as SiteMode,

  // Brand identity
  name: "Null MDX",
  tagline: "Start from nothing. Build everything.",
  description: "The first v0 template with real MDX support. Documentation and blog, unified.",
  url: "https://null.dev",
  logo: <SiteLogo className="w-6 h-6 flex-shrink-0" />,

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

  // Feature flags
  features: {
    aiAssistant: false, // Set to true to enable Ask AI button
  },

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
  footer: {
    sections: [
      {
        title: "Product",
        links: [
          { label: "Docs", href: "/docs" },
          { label: "Blog", href: "/blog" },
          { label: "API", href: "/docs/api/overview" },
          { label: "About", href: "/about" },
          { label: "Design", href: "/design" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Docs", href: "/docs" },
          { label: "Blog", href: "/blog" },
          { label: "API", href: "/docs/api/overview" },
          { label: "About", href: "/about" },
          { label: "Design", href: "/design" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Docs", href: "/docs" },
          { label: "Blog", href: "/blog" },
          { label: "API", href: "/docs/api/overview" },
          { label: "About", href: "/about" },
          { label: "Design", href: "/design" },
        ],
      },
      {
        title: "Social",
        links: [
          { label: "Twitter", href: "https://twitter.com/nulldev", icon: <SimpleIconsTwitterIcon className="h-4 w-4 mr-1 shrink-0" /> },
          { label: "GitHub", href: "https://github.com/null-dev", icon: <GithubIcon className="h-4 w-4 mr-1 shrink-0" /> },
        ],
      },
    ],
  }
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

export function isAIEnabled() {
  return siteConfig.features.aiAssistant
}
