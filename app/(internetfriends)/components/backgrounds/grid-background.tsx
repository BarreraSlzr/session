interface GridBackgroundProps {
  size?: number
  className?: string
}

export function GridBackground({ size = 0.23, className = "" }: GridBackgroundProps) {
  return (
    <div 
      className={`absolute inset-0 opacity-20 mix-blend-overlay ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, #000 2px, transparent 2px),
          linear-gradient(to bottom, #000 2px, transparent 2px)
        `,
        backgroundSize: `${size}rem ${size}rem`
      }}
    />
  )
}

