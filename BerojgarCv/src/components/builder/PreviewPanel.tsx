'use client'

import { useCVStore } from '@/store/cvStore'
import { getTemplateComponent } from '../cv-templates'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const A4_WIDTH_PX = 794
const A4_HEIGHT_PX = 1123

export function PreviewPanel({ isMobile }: { isMobile?: boolean }) {
  const { cvData, templateId } = useCVStore()
  const TemplateComponent = getTemplateComponent(templateId)

  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.75)

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const scaleByWidth = (containerWidth - 48) / A4_WIDTH_PX
      const scaleByHeight = (containerHeight - 64) / A4_HEIGHT_PX
      setScale(Math.min(scaleByWidth, scaleByHeight, 1))
    }

    updateScale()
    const ro = new ResizeObserver(updateScale)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const scaledWidth = A4_WIDTH_PX * scale
  const scaledHeight = A4_HEIGHT_PX * scale

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto no-scrollbar flex justify-center items-start py-8"
    >
      {/* Shrink-wrapper: takes up exactly the scaled footprint so the page centres correctly */}
      <div style={{ width: scaledWidth, height: scaledHeight, flexShrink: 0 }}>
        <div
          style={{
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <motion.div
            key={templateId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-white w-[794px] min-h-[1123px]"
          >
            <TemplateComponent cvData={cvData} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
