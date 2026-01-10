"use client"

import { cn } from "@/lib/utils"

interface TypeTableProps {
    type: Record<string, {
        type: string
        description?: string
        default?: string
    }>
}

export function TypeTable({ type }: TypeTableProps) {
    return (
        <div className="my-8 overflow-x-auto rounded-md border border-border/40 bg-background/50">
            <table className="w-full text-left font-mono text-[13px]">
                <thead>
                    <tr className="border-b border-border/40 bg-muted/20">
                        <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted-foreground/60 w-1/4">Prop</th>
                        <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted-foreground/60 w-1/4">Type</th>
                        <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted-foreground/60">Description</th>
                        <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-muted-foreground/60 w-1/6">Default</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                    {Object.entries(type).map(([name, info]) => (
                        <tr key={name} className="group hover:bg-muted/10 transition-colors">
                            <td className="px-4 py-3 font-bold text-foreground">{name}</td>
                            <td className="px-4 py-3 text-primary/80">{info.type}</td>
                            <td className="px-4 py-3 text-muted-foreground leading-relaxed">{info.description}</td>
                            <td className="px-4 py-3 text-muted-foreground/50">{info.default || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
