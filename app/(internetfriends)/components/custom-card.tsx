import { cn } from "@/lib/utils"
import { GridBackground } from "./grid-background"
import { CardDescriptionToggle } from "./card-description-toggle"

interface CustomCardProps {
  subtitle: string
  title: string
  description?: string
  className?: string
  gridSize?: number
  showGrid?: boolean
  children?: React.ReactNode
  cta?: React.ReactNode
}

export function CustomCard({
  subtitle,
  title,
  description,
  className,
  gridSize = 20,
  showGrid = true,
  children,
  cta,
}: CustomCardProps) {
  return (
    <div 
      className={cn(
        "sm:p-6 p-2 md:p-8 rounded-md relative overflow-hidden transition-all duration-300",
        className
      )}
    >
      {showGrid && <GridBackground size={gridSize} />}
      <div className="space-y-2 sm:space-y-4 relative z-10">
        <p className="text-sm font-medium opacity-80">{subtitle}</p>
        <h2 className="text-3xl font-bold leading-tight">{title}</h2>
        {description && <CardDescriptionToggle description={description} />}
        {children}
        {cta && <div className="mt-6">{cta}</div>}
      </div>
    </div>
  )
}

