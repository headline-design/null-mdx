"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

const COPY_TIMEOUT = 2000

type InstallerProps = {
    command: string
    className?: string
}

export const Installer = ({ command, className }: InstallerProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(command)
        toast.success("Copied to clipboard")
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, COPY_TIMEOUT)
    }

    const Icon = copied ? CheckIcon : CopyIcon

    return (
        <div className={cn("my-6", className)}>
            <InputGroup className="h-10 bg-muted/20 font-mono shadow-none border-border/40 rounded-md overflow-hidden">
                <InputGroupAddon>
                    <InputGroupText className="font-normal text-muted-foreground/50 px-3">
                        $
                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                    readOnly
                    value={command}
                    className="border-none bg-transparent focus-visible:ring-0 text-[13px]"
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        aria-label="Copy"
                        onClick={handleCopy}
                        size="icon-sm"
                        variant="ghost"
                        className="h-8 w-8 mr-1 hover:bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy"
                    >
                        <Icon className="size-3.5" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
