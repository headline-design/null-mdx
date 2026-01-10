'use client'

import { cn } from '@/lib/utils'

interface GridBackgroundProps {
    className?: string
    children?: React.ReactNode
    dotSize?: number
    dotSpacing?: number
    fadeEdges?: boolean
}

export function GridBackground({
    className,
    children,
    dotSize = 1.5,
    dotSpacing = 32,
    fadeEdges = true,
}: GridBackgroundProps) {
    return (
        <div className={cn('relative', className)}>
            {/* Grid Pattern */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.15) ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
                    maskImage: fadeEdges
                        ? 'radial-gradient(ellipse 100% 80% at 50% 40%, black 50%, transparent 100%)'
                        : undefined,
                    WebkitMaskImage: fadeEdges
                        ? 'radial-gradient(ellipse 100% 80% at 50% 40%, black 50%, transparent 100%)'
                        : undefined,
                }}
            />

            {/* Gradient Overlay for depth */}
            {fadeEdges && (
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background: 'radial-gradient(ellipse 70% 60% at 50% 30%, hsl(var(--primary) / 0.08), transparent 80%)',
                    }}
                />
            )}

            {children}
        </div>
    )
}
