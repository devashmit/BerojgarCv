'use client'

interface DhakaLogoProps {
  size?: number
}

export function DhakaLogo({ size = 32 }: DhakaLogoProps) {
  const svgSize = size * 1.25

  return (
    <div className="flex items-center gap-2">
      {/* Diamond logomark */}
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 — outermost diamond */}
        <polygon
          points="20,2 38,20 20,38 2,20"
          fill="none"
          stroke="var(--dhaka-gold)"
          strokeWidth="1.5"
        />
        {/* Layer 2 */}
        <polygon
          points="20,7 33,20 20,33 7,20"
          fill="var(--dhaka-crimson)"
          opacity="0.2"
        />
        {/* Layer 3 */}
        <polygon
          points="20,12 28,20 20,28 12,20"
          fill="var(--dhaka-crimson)"
          opacity="0.5"
        />
        {/* Layer 4 — innermost diamond, solid */}
        <polygon
          points="20,15 25,20 20,25 15,20"
          fill="var(--dhaka-crimson)"
        />
      </svg>

      {/* Wordmark */}
      <div className="flex items-baseline gap-0.5" style={{ lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-devanagari)',
            color: 'var(--dhaka-amber)',
            fontSize: `${size * 0.5}px`,
            fontWeight: 400,
          }}
        >
          बेरोजगार
        </span>
        <span
          style={{
            fontFamily: 'var(--font-fraunces)',
            color: 'var(--text-bright)',
            fontSize: `${size * 0.55}px`,
            fontWeight: 800,
          }}
        >
          CV
        </span>
      </div>
    </div>
  )
}
