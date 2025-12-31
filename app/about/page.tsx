import { siteConfig } from "@/lib/site-config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} - ${siteConfig.tagline}`,
}

export default function AboutPage() {
  return (
    <>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
          <div className="space-y-12">
            {/* Hero */}
            <div className="space-y-5">
              <h1 className="text-[32px] font-semibold tracking-[-0.02em] md:text-[40px]">About Null</h1>
              <p className="text-[18px] leading-[1.7] text-foreground/80">
                The first v0 template built for the new VM-based architecture. Real MDX, real files, real power.
              </p>
            </div>

            {/* Story */}
            <div className="space-y-5">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/40">The Story</h2>
              <div className="space-y-4 text-[16px] leading-[1.8] text-foreground/70">
                <p>
                  In programming,{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[14px] text-foreground/90">null</code>{" "}
                  represents the void - the absence before creation. It's the blank state from which everything begins.
                </p>
                <p>
                  We chose this name because Null is the first. The first v0 template to support real markdown files.
                  The first to bridge the gap between documentation and blogging. The first to truly embrace the new
                  VM-based model.
                </p>
                <p>
                  Built with Next.js, MDX, and Supabase Storage, Null represents a new paradigm: content as code,
                  rendered on demand, with the flexibility to switch between documentation and blog modes with a single
                  config change.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-5">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/40">
                What Makes Null Different
              </h2>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-foreground/70">
                <li className="flex gap-3">
                  <span className="text-primary">//</span>
                  <span>Real MDX files - not hardcoded content or mock data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">//</span>
                  <span>Unified docs and blog in one template</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">//</span>
                  <span>Supabase Storage integration for assets</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">//</span>
                  <span>AI-native with llms.txt endpoint</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">//</span>
                  <span>RSS feed, search, and full accessibility</span>
                </li>
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-5 border-t border-border/40 pt-8">
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-foreground/50 transition-colors duration-100 hover:text-foreground"
                >
                  Twitter
                </a>
              )}
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-foreground/50 transition-colors duration-100 hover:text-foreground"
                >
                  GitHub
                </a>
              )}
              {siteConfig.author.email && (
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-[14px] text-foreground/50 transition-colors duration-100 hover:text-foreground"
                >
                  Contact
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
