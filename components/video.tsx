"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoProps {
    src: string
    poster?: string
    caption?: string
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    className?: string
}

export function Video({
    src,
    poster,
    caption,
    autoplay = false,
    loop = true,
    muted = true,
    className
}: VideoProps) {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(autoplay)
    const [isMuted, setIsMuted] = React.useState(muted)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <figure className={cn("my-8 space-y-3", className)}>
            <div className="relative group aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-black/5 flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    autoPlay={autoplay}
                    loop={loop}
                    muted={muted}
                    playsInline
                    className="h-full w-full object-cover"
                    onClick={togglePlay}
                />

                {/* Play Overlay */}
                {!isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer transition-all group-hover:bg-black/30"
                        onClick={togglePlay}
                    >
                        <div className="h-16 w-16 rounded-full bg-background/90 flex items-center justify-center shadow-2xl scale-110">
                            <Play className="h-6 w-6 text-foreground fill-foreground ml-1" />
                        </div>
                    </div>
                )}

                {/* Controls Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={togglePlay}
                            className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition-colors"
                        >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-foreground" />}
                        </button>
                        <button
                            onClick={toggleMute}
                            className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition-colors"
                        >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                    </div>
                    <div className="h-9 px-4 rounded-full bg-background/80 backdrop-blur-md flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Sora Media Player
                    </div>
                </div>
            </div>
            {caption && (
                <figcaption className="text-center text-[13px] text-muted-foreground/60 font-medium">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
