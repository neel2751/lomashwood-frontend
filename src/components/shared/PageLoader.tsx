import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface PageLoaderProps {
  className?: string
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
  text?: string
}

export function PageLoader({
  className,
  size = "md",
  fullScreen = true,
  text = "Loading...",
}: PageLoaderProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }

  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    )
  }

  return content
}