'use client'

interface DhakaBorderProps {
  height?: number
  className?: string
}

export function DhakaBorder({ height = 8, className = '' }: DhakaBorderProps) {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        width="100%"
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="dhaka-border-tile"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            {/* Deep crimson base */}
            <rect width="16" height="16" fill="var(--dhaka-deep)" />
            {/* Tessellating gold diamonds */}
            <polygon
              points="8,0 16,8 8,16 0,8"
              fill="none"
              stroke="var(--dhaka-gold)"
              strokeWidth="0.8"
            />
            {/* Inner crimson diamond */}
            <polygon
              points="8,3 13,8 8,13 3,8"
              fill="var(--dhaka-crimson)"
              opacity="0.7"
            />
            {/* Center gold dot */}
            <circle cx="8" cy="8" r="1" fill="var(--dhaka-gold)" opacity="0.9" />
            {/* Corner dots */}
            <circle cx="0" cy="0" r="0.8" fill="var(--dhaka-gold)" opacity="0.5" />
            <circle cx="16" cy="0" r="0.8" fill="var(--dhaka-gold)" opacity="0.5" />
            <circle cx="0" cy="16" r="0.8" fill="var(--dhaka-gold)" opacity="0.5" />
            <circle cx="16" cy="16" r="0.8" fill="var(--dhaka-gold)" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dhaka-border-tile)" />
      </svg>
    </div>
  )
}
