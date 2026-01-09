import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { getOptimizedImageUrl } from "@/lib/supabase/storage"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Info, AlertTriangle, AlertCircle, CheckCircle2, Link2 } from "lucide-react"

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

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode
  type?: "info" | "warning" | "error" | "success"
}) {
  const styles = {
    info: "border-blue-500/10 bg-blue-500/[0.03] dark:bg-blue-400/[0.05] text-blue-900 dark:text-blue-100",
    warning: "border-amber-500/10 bg-amber-500/[0.03] dark:bg-amber-400/[0.05] text-amber-900 dark:text-amber-100",
    error: "border-red-500/10 bg-red-500/[0.03] dark:bg-red-400/[0.05] text-red-900 dark:text-red-100",
    success: "border-emerald-500/10 bg-emerald-500/[0.03] dark:bg-emerald-400/[0.05] text-emerald-900 dark:text-emerald-100",
  }

  const icons = {
    info: <Info className="h-4 w-4 text-blue-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  }

  return (
    <div className={cn("my-6 flex gap-3.5 rounded-xl border p-4 shadow-sm/5 not-prose", styles[type])}>
      <div className="shrink-0 mt-0.5">{icons[type]}</div>
      <div className="text-[14px] leading-relaxed [&>p]:leading-relaxed [&>p:first-child]:my-0 not-prose">{children}</div>
    </div>
  )
}

function InlineCode({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="relative rounded-md bg-muted/40 px-[0.35rem] py-[0.1rem] font-mono text-[0.9em] font-medium text-foreground/90 border border-border/10 not-prose"
      {...props}
    >
      {children}
    </code>
  )
}

function Steps({ children }: { children: React.ReactNode }) {
  return <div className="ml-4 my-10 border-l border-border/40 pl-8 space-y-10 [counter-reset:step] not-prose">{children}</div>
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative [counter-increment:step] before:absolute before:-left-[44px] before:top-0 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-full before:bg-background before:border before:border-border before:text-[10px] before:font-bold before:text-foreground/50 before:shadow-sm before:content-[counter(step)] transition-all hover:before:border-primary/50 hover:before:text-primary not-prose">
      {children}
    </div>
  )
}

export function useMDXComponents(components: any): any {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="mt-6 mb-10 scroll-m-20 text-4xl font-extrabold tracking-tighter text-foreground lg:text-5xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="group flex whitespace-pre-wrap -ml-4 pl-4 mt-16 mb-6 scroll-m-20 border-b border-border/40 pb-3 text-2xl font-bold tracking-tight text-foreground/90 first:mt-0"
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
      <h3 className="group flex whitespace-pre-wrap -ml-4 pl-4 mt-10 mb-4 scroll-m-20 text-xl font-bold tracking-tight text-foreground/80" {...props}>
        <a href={`#${props.id}`} className="absolute -ml-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" aria-label="Link to section">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/20 hover:text-primary transition-colors">
            <Link2 className="h-4 w-4" />
          </div>
        </a>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="mt-8 mb-4 scroll-m-20 text-lg font-bold tracking-tight text-foreground/70" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="leading-relaxed mb-6 text-foreground/70 text-[15.5px]" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-6 ml-6 list-disc space-y-2.5 marker:text-foreground/20" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2.5 marker:text-foreground/20" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed text-foreground/70 pl-1" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-8 border-l-2 border-primary/30 bg-muted/5 px-6 py-4 italic text-muted-foreground/80 rounded-r-lg"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => <hr className="my-14 border-border/30" {...props} />,
    table: ({ children, ...props }) => (
      <div className="my-8 w-full overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm/5">
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px] not-prose" {...props}>
            {children}
          </table>
        </div>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border-b border-border/50 bg-muted/20 px-4 py-3 text-left align-middle font-semibold text-foreground/60 uppercase tracking-widest text-[10px]" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-b border-border/30 p-4 align-middle text-foreground/70 last:border-0" {...props}>
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
    Steps,
    Step,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    ...components,
  }
}
