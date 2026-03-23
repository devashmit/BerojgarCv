'use client'

import { useCVStore } from '@/store/cvStore'
import { getTemplateComponent } from '../cv-templates'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function PreviewPanel({ isMobile }: { isMobile?: boolean }) {
  const { cvData, templateId } = useCVStore()
  const TemplateComponent = getTemplateComponent(templateId)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!isMobile) {
      setScale(1)
      return
    }
    const updateScale = () => {
      if (containerRef.current) {
         // A4 width in pixels at standard 96dpi is 794. 
         // We do windowWidth / 794 minus a little padding
         const windowWidth = containerRef.current.clientWidth
         const padding = 32
         const availableWidth = windowWidth - padding
         const targetScale = Math.min(1, availableWidth / 794)
         setScale(targetScale)
      }
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [isMobile])

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto no-scrollbar py-8 sm:py-12 flex justify-center items-start">
      <div 
        className="origin-top" 
        style={{ transform: `scale(${scale})`, marginBottom: `${(scale - 1) * 1123}px` }}
      >
        <motion.div
           key={templateId}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
           className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-white w-[210mm] min-h-[297mm] mx-auto"
        >
          <TemplateComponent cvData={cvData} />
        </motion.div>
      </div>
    </div>
  )
}
