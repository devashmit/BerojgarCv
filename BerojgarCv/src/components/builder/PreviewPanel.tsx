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
      // Safe boundary calculation
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      
      // Calculate scale factoring in generous padding
      const scaleByWidth = (containerWidth - 64) / A4_WIDTH_PX
      const scaleByHeight = (containerHeight - 64) / A4_HEIGHT_PX
      
      // Min scale 0.2, Max scale 1.1 
      setScale(Math.max(0.2, Math.min(scaleByWidth, scaleByHeight, 1.1)))
    }

    updateScale()
    const ro = new ResizeObserver(updateScale)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-start py-8 pb-32"
    >
      {/* 
        Instead of a shrink-wrapper that causes layout engine clipping bugs,
        calculate the outer explicit bounding box and allow overflow visible 
      */}
      <div 
        style={{ 
          width: A4_WIDTH_PX * scale, 
          height: A4_HEIGHT_PX * scale,
          flexShrink: 0
        }}
        className="relative"
      >
        <div
          style={{
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="absolute top-0 left-0"
        >
          <motion.div
            key={templateId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-white overflow-hidden"
            style={{ width: A4_WIDTH_PX, minHeight: A4_HEIGHT_PX }}
          >
            <TemplateComponent cvData={cvData} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
