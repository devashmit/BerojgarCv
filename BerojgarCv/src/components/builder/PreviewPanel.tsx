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
  const [zoomLevel, setZoomLevel] = useState(1) // 1 = auto, can be set to 0.75, 1, 1.25
  const [debouncedCvData, setDebouncedCvData] = useState(cvData)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCvData(cvData), 300)
    return () => clearTimeout(timer)
  }, [cvData])

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      
      if (zoomLevel !== 1 && zoomLevel !== 0) { // Using 0 internally for auto
         setScale(zoomLevel)
         return
      }

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
  }, [zoomLevel])

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center bg-[#1E293B] rounded-full border border-white/10 shadow-xl overflow-hidden text-sm font-semibold text-slate-300">
        <button onClick={() => setZoomLevel(0.75)} className={`px-4 py-2 hover:bg-white/10 transition-colors ${zoomLevel === 0.75 ? 'bg-white/10 text-white' : ''}`}>75%</button>
        <div className="w-px h-4 bg-white/10" />
        <button onClick={() => setZoomLevel(1)} className={`px-4 py-2 hover:bg-white/10 transition-colors ${zoomLevel === 1 ? 'bg-white/10 text-white' : ''}`}>100%</button>
        <div className="w-px h-4 bg-white/10" />
        <button onClick={() => setZoomLevel(1.25)} className={`px-4 py-2 hover:bg-white/10 transition-colors ${zoomLevel === 1.25 ? 'bg-white/10 text-white' : ''}`}>125%</button>
      </div>

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
            id="cv-preview-root"
            key={templateId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-white overflow-hidden"
            style={{ width: A4_WIDTH_PX, minHeight: A4_HEIGHT_PX }}
          >
            <TemplateComponent cvData={debouncedCvData} />
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  )
}
