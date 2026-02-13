import Link from "next/link"
import { SiteLogo, siteConfig } from "@/lib/site-config"

function FooterSection({ title, links }: { title: string; links: { label: string; href: string; icon?: React.ReactNode }[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-label-14 font-medium">{title}</h2>
      <ul className="flex flex-col gap-y-2.5">
        {links.map((link) => (
          <li key={link.label} className="w-fit">
            <a
              className="inline-flex items-center gap-x-0.5 rounded-sm hover:bg-muted/50 hover:text-foreground text-muted-foreground focus-visible:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-900 text-label-14"
              href={link.href}
            >
              {link.icon}{link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative z-50 ">
      <div className="mx-auto my-12 max-w-[1400px] px-10 pt-6 pb-10">
        <div className="flex flex-col gap-x-12 justify-between w-full max-w-2xl gap-y-16 md:mx-auto md:max-w-(--breakpoint-xl) md:flex-row">
          <a className="h-fit shrink-0" href="/">
            <SiteLogo height={48} width={48} className="flex-shrink-0" />
          </a>
          <div className="grid grid-cols-2 gap-x-0 gap-y-4 md:grid-cols-4 md:gap-16 lg:gap-[108px]">
            {siteConfig.footer.sections.map((section) => (
              <FooterSection key={section.title} title={section.title} links={section.links} />
            ))}
          </div>
        </div>
      </div>
    </footer>

  )
}
