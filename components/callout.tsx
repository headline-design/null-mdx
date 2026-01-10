"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Info, AlertCircle, CheckCircle2 } from "lucide-react"
import type React from "react"

interface CalloutProps {
    children: React.ReactNode
    title?: string
    type?: "info" | "warning" | "error" | "success"
    className?: string
}

export function Callout({
    children,
    title,
    type = "info",
    className
}: CalloutProps) {
    const styles = {
        info: "border-blue-500/10 bg-blue-500/[0.03] text-blue-900 dark:text-blue-100",
        warning: "border-amber-500/10 bg-amber-500/[0.03] text-amber-900 dark:text-amber-100",
        error: "border-red-500/10 bg-red-500/[0.03] text-red-900 dark:text-red-100",
        success: "border-emerald-500/10 bg-emerald-500/[0.03] text-emerald-900 dark:text-emerald-100",
    }

    const icons = {
        info: <Info className="h-4 w-4 text-blue-500" />,
        warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        error: <AlertCircle className="h-4 w-4 text-red-500" />,
        success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    }

    return (
        <div className={cn(
            "my-6 flex flex-col gap-2 rounded-lg border p-4 shadow-sm/5 text-sm",
            styles[type],
            className
        )}>
            <div className="flex items-center gap-2">
                {icons[type]}
                {title && <span className="font-semibold">{title}</span>}
            </div>
            <div className="pl-6 text-[14px] leading-relaxed [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
                {children}
            </div>
        </div>
    )
}
