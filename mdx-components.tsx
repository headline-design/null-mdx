import { Mermaid } from "@/components/mermaid"
import { CodeTabs, CodeTabsList, CodeTabsTrigger, CodeTabsContent } from "@/components/code-tabs"
import { Installer } from "@/components/installer"
import { TypeTable } from "@/components/type-table"
import { Video } from "@/components/video"
import Link from "next/link"
import Image from "next/image"
import { getOptimizedImageUrl } from "@/lib/supabase/storage"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Link2 } from "lucide-react"

// Custom components for MDX
function CustomLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http")

  return (
    <Link
      href={href || "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-primary decoration-primary/20 underline underline-offset-[3px] hover:decoration-primary transition-all font-medium"
      {...props}
    >
      {children}
    </Link>
  )
}

function CustomImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  //@ts-ignore
  const imageSrc = src?.startsWith("http") || src?.startsWith("/") ? src : getOptimizedImageUrl(src || "", { width: 1200 })

  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-border/50 bg-muted/10 p-1">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={imageSrc || "/placeholder.svg" as any}
          alt={alt || ""}
          width={1200 as any}
          height={630 as any}
          className="aspect-video object-cover transition-transform duration-700 hover:scale-[1.01]"
          {...props}
        />
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-[12px] text-muted-foreground/60 font-medium tracking-tight">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

function InlineCode({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="relative rounded-md bg-muted/50 px-[0.3rem] py-[0.1rem] font-mono text-[0.85em] font-medium text-foreground/80 border border-border/20 not-prose"
      {...props}
    >
      {children}
    </code>
  )
}

function Steps({ children }: { children: React.ReactNode }) {
  return <div className="ml-4 my-12 border-l border-border/20 pl-10 space-y-12 [counter-reset:step] not-prose">{children}</div>
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative [counter-increment:step] before:absolute before:-left-[53px] before:top-0 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-lg before:bg-background before:border before:border-primary/20 before:shadow-[0_0_10px_rgba(var(--primary),0.1)] before:text-[11px] before:font-bold before:text-primary before:content-[counter(step)] transition-all hover:before:border-primary hover:before:shadow-[0_0_15px_rgba(var(--primary),0.2)] not-prose">
      <div className="pt-0.5">{children}</div>
    </div>
  )
}

export function useMDXComponents(components: any): any {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="mt-8 mb-12 scroll-m-20 text-4xl font-bold tracking-tight text-foreground lg:text-5xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="group flex whitespace-pre-wrap -ml-4 pl-4 mt-16 mb-6 scroll-m-20 border-b border-border/10 pb-4 text-[30px] font-bold tracking-tight text-foreground/90 first:mt-0"
        {...props}
      >
        <a href={`#${props.id}`} className="absolute -ml-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" aria-label="Link to section">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/20 hover:text-primary transition-colors">
            <Link2 className="h-4 w-4" />
          </div>
        </a>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="group flex whitespace-pre-wrap -ml-4 pl-4 mt-12 mb-4 scroll-m-20 text-[24px] font-bold tracking-tight text-foreground/85" {...props}>
        <a href={`#${props.id}`} className="absolute -ml-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" aria-label="Link to section">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/20 hover:text-primary transition-colors">
            <Link2 className="h-4 w-4" />
          </div>
        </a>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="mt-10 mb-4 scroll-m-20 text-xl font-bold tracking-tight text-foreground/75" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="leading-[1.7] mb-8 text-foreground/70 text-[16.5px]" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-8 ml-6 list-disc space-y-3.5 marker:text-primary/40 marker:text-[0.6em] marker:align-middle" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-8 ml-6 list-decimal space-y-3.5 marker:text-foreground/30 font-medium" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed text-foreground/70 pl-2" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-10 border-l-4 border-primary/40 bg-primary/[0.03] px-8 py-6 italic text-foreground/80 rounded-r-2xl shadow-sm shadow-primary/5"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => <hr className="my-16 border-border/20" {...props} />,
    table: ({ children, ...props }) => (
      <div className="my-10 w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/[0.02] shadow-sm/5">
        <div className="overflow-x-auto">
          <table className="w-full text-[14.5px] not-prose border-collapse" {...props}>
            {children}
          </table>
        </div>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border-b border-border/10 bg-muted/20 px-6 py-4 text-left align-middle font-bold text-foreground/50 uppercase tracking-[0.2em] text-[10px]" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-b border-border/10 px-6 py-4 align-middle text-foreground/75 last:border-0 hover:bg-muted/10 transition-colors" {...props}>
        {children}
      </td>
    ),
    a: CustomLink,
    img: CustomImage,
    pre: ({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <CodeBlock className={cn("", className)} {...props as any}>{children}</CodeBlock>
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
      // rehype-pretty-code blocks don't typically have the InlineCode styling
      // We check if it's a block code by checking for a language class or if it's a child of pre
      const isBlock = className?.includes("language-") || (props as any)["data-language"]
      if (isBlock) {
        return <code className={className} {...props} />
      }
      return <InlineCode className={className} {...props} />
    },
    Callout,
    Mermaid,
    CodeTabs,
    CodeTabsList,
    CodeTabsTrigger,
    CodeTabsContent,
    Steps,
    Step,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Installer,
    TypeTable,
    Video,
    ...components,
  }
}
