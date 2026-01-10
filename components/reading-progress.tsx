"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ReadingProgress() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        )
      }
    }

    window.addEventListener("scroll", updateScrollCompletion)
    return () => window.removeEventListener("scroll", updateScrollCompletion)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className={cn(
          "h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_15px_rgba(var(--primary),0.5)]",
          completion === 0 && "opacity-0"
        )}
        style={{ width: `${completion}%` }}
      />
    </div>
  )
}
