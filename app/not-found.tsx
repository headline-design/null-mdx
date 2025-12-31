import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* Void symbol */}
        <div className="mb-8 flex justify-center">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted-foreground/30"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M15 7L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <p className="mb-2 text-[13px] font-medium uppercase tracking-wider text-primary">404</p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mb-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Perhaps it's still in the void.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button asChild variant="outline" size="sm" className="h-9 bg-transparent">
            <a href="/">Go home</a>
          </Button>
          <Button asChild size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="/docs">Read docs</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
