'use client'

import { motion } from 'framer-motion'

interface ThangkaMandalaProps {
  size?: number
  color?: string
  animate?: boolean
  reverse?: boolean
}

export function ThangkaMandala({
  size = 200,
  color = 'var(--dhaka-gold)',
  animate = true,
  reverse = false,
}: ThangkaMandalaProps) {
  const center = size / 2
  const petalCount = 12

  function generatePetals(ringRadius: number, petalLength: number, petalWidth: number) {
    const petals = []
    for (let i = 0; i < petalCount; i++) {
      const angle = (i * 360) / petalCount
      const rad = (angle * Math.PI) / 180
      const x = center + ringRadius * Math.cos(rad)
      const y = center + ringRadius * Math.sin(rad)

      // Elongated diamond petal
      const tipX = center + (ringRadius + petalLength) * Math.cos(rad)
      const tipY = center + (ringRadius + petalLength) * Math.sin(rad)
      const baseX = center + (ringRadius - petalLength * 0.3) * Math.cos(rad)
      const baseY = center + (ringRadius - petalLength * 0.3) * Math.sin(rad)
      const perpRad = rad + Math.PI / 2
      const lx = x + petalWidth * Math.cos(perpRad)
      const ly = y + petalWidth * Math.sin(perpRad)
      const rx = x - petalWidth * Math.cos(perpRad)
      const ry = y - petalWidth * Math.sin(perpRad)

      petals.push(
        <polygon
          key={`petal-${ringRadius}-${i}`}
          points={`${tipX.toFixed(3)},${tipY.toFixed(3)} ${lx.toFixed(3)},${ly.toFixed(3)} ${baseX.toFixed(3)},${baseY.toFixed(3)} ${rx.toFixed(3)},${ry.toFixed(3)}`}
          fill={color}
          opacity="0.6"
          suppressHydrationWarning
        />
      )
    }
    return petals
  }

  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      suppressHydrationWarning
    >
      {/* Ring 1 — outer */}
      {generatePetals(size * 0.38, size * 0.1, size * 0.025)}
      {/* Ring 2 — middle */}
      {generatePetals(size * 0.28, size * 0.07, size * 0.02)}
      {/* Ring 3 — inner */}
      {generatePetals(size * 0.18, size * 0.05, size * 0.015)}
      {/* Center circle */}
      <circle cx={center} cy={center} r={size * 0.04} fill={color} opacity="0.8" />
    </svg>
  )

  if (!animate) {
    return <div className="pointer-events-none">{svgContent}</div>
  }

  return (
    <motion.div
      className="pointer-events-none"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {svgContent}
    </motion.div>
  )
}
