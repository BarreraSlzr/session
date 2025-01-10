'use client'

import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"

interface CardDescriptionToggleProps {
  description: string
}

export function CardDescriptionToggle({ description }: CardDescriptionToggleProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is the 'md' breakpoint in Tailwind
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsDescriptionVisible(!isMobile)
  }, [isMobile])

  // const handleTouch = () => {
  //   if (isMobile) {
  //     setIsDescriptionVisible(prev => !prev)
  //   }
  // }

  return (
    <div 
    // onTouchStart={handleTouch}
    >
      <p className={cn(
        "text-lg opacity-90 transition-all duration-300",
        isDescriptionVisible ? "block" : "hidden"
      )}>
        {description}
      </p>
    </div>
  )
}

