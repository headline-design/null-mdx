import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-sidebar">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row md:px-8">
        <p className="text-[13px] text-foreground/40">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href="/design"
            className="text-[13px] text-foreground/40 transition-colors duration-100 hover:text-foreground"
          >
            Design System
          </a>
          <a
            href="/assets"
            className="text-[13px] text-foreground/40 transition-colors duration-100 hover:text-foreground"
          >
            Assets
          </a>
          {siteConfig.social.twitter && (
            <Link
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-foreground/40 transition-colors duration-100 hover:text-foreground"
            >
              Twitter
            </Link>
          )}
          {siteConfig.social.github && (
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-foreground/40 transition-colors duration-100 hover:text-foreground"
            >
              GitHub
            </Link>
          )}
          <Link
            href="/feed.xml"
            className="text-[13px] text-foreground/40 transition-colors duration-100 hover:text-foreground"
          >
            RSS
          </Link>
        </div>
      </div>
    </footer>
  )
}
