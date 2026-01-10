import Link from "next/link"
import { SiteLogo, siteConfig } from "@/lib/site-config"

function FooterSection({ title, links }: { title: string; links: { label: string; href: string; icon?: React.ReactNode }[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">{title}</h2>
      <ul className="flex flex-col gap-y-3">
        {links.map((link) => (
          <li key={link.label} className="w-fit">
            <a
              className="inline-flex items-center gap-x-2 text-[14px] text-muted-foreground/60 transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.icon || null}
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative z-50 border-t border-border/20 bg-muted/5">
      <div className="mx-auto max-w-[90rem] px-6 py-16 md:px-8 lg:py-24">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-6">
            <a className="flex items-center gap-2 group" href="/">
              <SiteLogo height={42} width={42} className="flex-shrink-0 transition-transform group-hover:scale-105" />
              <span className="text-[18px] font-bold tracking-tighter">{siteConfig.name}</span>
            </a>
            <p className="max-w-[280px] text-[14px] leading-relaxed text-muted-foreground/60">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-4 lg:gap-x-20">
            {siteConfig.footer.sections.map((section) => (
              <FooterSection key={section.title} title={section.title} links={section.links} />
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-[12px] text-muted-foreground/40">
            © {new Date().getFullYear()} {siteConfig.name}. Shared with intent.
          </p>
          <div className="flex items-center gap-6">
            {/* Social links could go here if they weren't in the sections */}
          </div>
        </div>
      </div>
    </footer>
  )
}
