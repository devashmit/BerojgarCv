'use client'

interface DiamondStepProps {
  number: string
}

export function DiamondStep({ number }: DiamondStepProps) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer diamond — stroke only, gold */}
      <polygon
        points="40,4 76,40 40,76 4,40"
        fill="none"
        stroke="var(--dhaka-gold)"
        strokeWidth="1.5"
      />
      {/* Inner diamond — filled ground-mid */}
      <polygon
        points="40,14 66,40 40,66 14,40"
        fill="var(--ground-mid)"
      />
      {/* Step number */}
      <text
        x="40"
        y="40"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--dhaka-amber)"
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontWeight: 900,
          fontSize: '22px',
        }}
      >
        {number}
      </text>
    </svg>
  )
}
