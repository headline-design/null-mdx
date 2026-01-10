"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export const CodeTabsList = (props: ComponentProps<typeof TabsList>) => (
    <TabsList
        {...props}
        className={cn(
            "w-full justify-start rounded-none border-b bg-muted/20 px-3 text-muted-foreground h-10 p-0",
            props.className
        )}
    >
        {props.children}
    </TabsList>
)

export const CodeTabsTrigger = ({
    children,
    ...props
}: ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
        {...props}
        className={cn(
            "group relative h-10 px-3 py-2 text-[13px] font-medium data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none transition-colors hover:text-foreground",
            props.className
        )}
    >
        <div className="absolute inset-x-0 bottom-0 h-px bg-foreground opacity-0 group-data-[state=active]:opacity-100 transition-opacity" />
        {children}
    </TabsTrigger>
)

export const CodeTabs = ({
    ref,
    ...props
}: ComponentProps<typeof Tabs>) => (
    <Tabs
        {...props}
        className={cn(
            "overflow-hidden rounded-md border border-border/40 bg-background my-8",
            props.className
        )}
    >
        {props.children}
    </Tabs>
)

export const CodeTabsContent = (props: ComponentProps<typeof TabsContent>) => (
    <TabsContent
        {...props}
        className={cn(
            "mt-0 [&>div]:my-0 [&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-none [&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-none",
            props.className
        )}
    />
)
