"use client"

import { ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  showAfter?: number
  className?: string
}

export function ScrollToTop({ showAfter = 300, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
        className
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}