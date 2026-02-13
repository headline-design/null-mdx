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
        <div className="flex flex-col gap-4 rounded-xl border border-border/40 bg-muted/30 p-6">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {displayName.charAt(0)}
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-foreground">{displayName}</h3>
                    <p className="text-xs text-muted-foreground">{displayEmail}</p>
                </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
                {displayBio}
            </p>
            <div className="flex gap-3">
                {author.twitter && (
                    <a href={siteConfig.social.twitter} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="h-4 w-4" />
                    </a>
                )}
                {author.github && (
                    <a href={siteConfig.social.github} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="h-4 w-4" />
                    </a>
                )}
            </div>
        </div>
    )
}
