import { siteConfig } from "@/lib/site-config"
import { Github, Twitter } from "lucide-react"

interface AuthorProps {
    name?: string
    email?: string
    bio?: string
}

export function Author({ name, email, bio }: AuthorProps) {
    const { author } = siteConfig
    const displayName = name || author.name
    const displayEmail = email || author.email
    const displayBio = bio || "Passionate about building elegant and performant web applications. Dedicated to sharing knowledge and best practices in the developer community."

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-xl shadow-sm">
                        {displayName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-[17px] font-bold text-foreground leading-tight">{displayName}</h3>
                        <p className="text-[13px] font-medium text-muted-foreground/60">{displayEmail}</p>
                    </div>
                </div>
                <p className="text-[15px] text-foreground/70 leading-relaxed max-w-xl">
                    {displayBio}
                </p>
                <div className="flex gap-4">
                    {author.twitter && (
                        <a href={siteConfig.social.twitter} className="group flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted-foreground/60 hover:text-primary transition-colors">
                            <Twitter className="h-4 w-4" />
                            Twitter
                        </a>
                    )}
                    {author.github && (
                        <a href={siteConfig.social.github} className="group flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-muted-foreground/60 hover:text-primary transition-colors">
                            <Github className="h-4 w-4" />
                            Github
                        </a>
                    )}
                </div>
            </div>
            <div className="md:w-px md:h-24 bg-border/20 hidden md:block" />
            <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/30">Verified Identity</span>
                <div className="px-4 py-2 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[12px] font-bold text-green-500/80 uppercase tracking-tighter">Null Resident</span>
                </div>
            </div>
        </div>
    )
}
