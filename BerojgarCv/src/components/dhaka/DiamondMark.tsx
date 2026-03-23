'use client'

interface DiamondMarkProps {
  size?: number
  color?: string
}

export function DiamondMark({ size = 12, color = 'var(--dhaka-gold)' }: DiamondMarkProps) {
  const half = size / 2
  const outerPoints = `${half},0 ${size},${half} ${half},${size} 0,${half}`
  const midScale = 0.65
  const midOffset = half * (1 - midScale)
  const midSize = size * midScale
  const midHalf = midSize / 2
  const midPoints = `${(midOffset + midHalf).toFixed(3)},${midOffset.toFixed(3)} ${(midOffset + midSize).toFixed(3)},${(midOffset + midHalf).toFixed(3)} ${(midOffset + midHalf).toFixed(3)},${(midOffset + midSize).toFixed(3)} ${midOffset.toFixed(3)},${(midOffset + midHalf).toFixed(3)}`
  const innerScale = 0.3
  const innerOffset = half * (1 - innerScale)
  const innerSize = size * innerScale
  const innerHalf = innerSize / 2
  const innerPoints = `${(innerOffset + innerHalf).toFixed(3)},${innerOffset.toFixed(3)} ${(innerOffset + innerSize).toFixed(3)},${(innerOffset + innerHalf).toFixed(3)} ${(innerOffset + innerHalf).toFixed(3)},${(innerOffset + innerSize).toFixed(3)} ${innerOffset.toFixed(3)},${(innerOffset + innerHalf).toFixed(3)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      suppressHydrationWarning
    >
      {/* Outer — stroke only */}
      <polygon
        points={outerPoints}
        fill="none"
        stroke={color}
        strokeWidth="1"
        suppressHydrationWarning
      />
      {/* Mid — 30% opacity fill */}
      <polygon
        points={midPoints}
        fill={color}
        opacity="0.3"
        suppressHydrationWarning
      />
      {/* Inner — solid fill */}
      <polygon
        points={innerPoints}
        fill={color}
        suppressHydrationWarning
      />
    </svg>
  )
}
