'use client'

interface DhakaTextureProps {
  opacity?: number
}

export function DhakaTexture({ opacity = 0.04 }: DhakaTextureProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dhaka-texture-tile"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            {/* Diamond outline */}
            <polygon
              points="16,2 30,16 16,30 2,16"
              fill="none"
              stroke="var(--dhaka-gold)"
              strokeWidth="0.5"
            />
            {/* Center dot */}
            <circle cx="16" cy="16" r="1" fill="var(--dhaka-gold)" />
            {/* Crosshair lines */}
            <line x1="16" y1="0" x2="16" y2="32" stroke="var(--dhaka-gold)" strokeWidth="0.3" />
            <line x1="0" y1="16" x2="32" y2="16" stroke="var(--dhaka-gold)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dhaka-texture-tile)" />
      </svg>
    </div>
  )
}
