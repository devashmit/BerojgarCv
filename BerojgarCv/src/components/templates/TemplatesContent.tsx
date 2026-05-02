'use client'

import { DhakaBorder } from '@/components/dhaka'
import { T1Thumb } from '@/components/cv-templates/T1Thumb'
import { T2Thumb } from '@/components/cv-templates/T2Thumb'
import { T3Thumb } from '@/components/cv-templates/T3Thumb'
import { T4Thumb } from '@/components/cv-templates/T4Thumb'
import { T5Thumb } from '@/components/cv-templates/T5Thumb'
import { T6Thumb } from '@/components/cv-templates/T6Thumb'
import { T7Thumb } from '@/components/cv-templates/T7Thumb'
import { ArrowRight, Sparkles, Building2, Globe } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const ALL_TEMPLATES = [
  { id: 't1', thumb: T1Thumb, name: 'Dhaka Heritage', region: 'Nepal & Gulf', ats: 72, icon: Building2, desc: 'Classic structural elements with a bold header. Excellent for traditional corporate roles and regional agencies.' },
  { id: 't2', thumb: T2Thumb, name: 'Himalaya Modern', region: 'Nepal & Creative', ats: 65, icon: Sparkles, desc: 'A modern two-column sidebar layout featuring graphical skill bars and contact icons.' },
  { id: 't3', thumb: T3Thumb, name: "Jake's Resume", region: 'International ATS', ats: 98, icon: Globe, desc: 'The gold standard. Zero color, zero tables. Parses flawlessly into every major Application Tracking System globally.' },
  { id: 't4', thumb: T4Thumb, name: 'Zürich Executive', region: 'International ATS', ats: 92, icon: Globe, desc: 'Extremely clean, highly legible font sizes with subtle horizontal separating lines. Professional and parser-friendly.' },
  { id: 't5', thumb: T5Thumb, name: 'Nova Sidebar', region: 'Creative & Startups', ats: 58, icon: Sparkles, desc: 'Design-centric with a distinct geometric avatar. May face issues parsing in older rigid corporate systems.' },
  { id: 't6', thumb: T6Thumb, name: 'Paris Élégante', region: 'Creative & Design', ats: 55, icon: Sparkles, desc: 'Sophisticated typography on an off-white canvas. Favored by the design, fashion, and hospitality industries.' },
  { id: 't7', thumb: T7Thumb, name: 'Rirekisho (JIS)', region: 'Japan', ats: 100, icon: Building2, desc: 'A flawless digital reproduction of the JIS S 5504 standard Japanese resume format. Perfect grid alignment.' },
]

export function TemplatesContent() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
      <DhakaBorder height={4} className="fixed top-0 w-full z-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-fraunces text-gray-900 mb-6 tracking-tight">
            Engineered for <span className="text-[var(--dhaka-crimson)]">impact</span>
          </h1>
          <p className="text-xl text-gray-600 font-inter">
            Select an optimized format and simply drop in your data. Our engine handles the typesetting and pixel-perfect PDF rendering.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_TEMPLATES.map(tpl => {
            const Thumb = tpl.thumb
            const isHovered = hovered === tpl.id
            const RegionIcon = tpl.icon

            let atsColor = 'bg-red-100 text-red-700 border-red-200'
            if (tpl.ats >= 85) atsColor = 'bg-green-100 text-green-700 border-green-200'
            else if (tpl.ats >= 60) atsColor = 'bg-amber-100 text-amber-700 border-amber-200'

            return (
              <div 
                key={tpl.id}
                onMouseEnter={() => setHovered(tpl.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Thumb Visuals */}
                <div className="bg-[#F3F4F6] flex justify-center items-start h-[220px] shrink-0 border-b border-gray-200 overflow-hidden relative pt-6">
                  <div className="shadow-lg" style={{ transform: 'scale(1.55)', transformOrigin: 'top center' }}>
                    <Thumb />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-fraunces text-gray-900 leading-tight">{tpl.name}</h3>
                    <div className={`px-2 py-1 rounded text-[10px] font-mono tracking-wide font-bold border ${atsColor} whitespace-nowrap ml-2`}>
                      ATS {tpl.ats}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-4 uppercase tracking-wider">
                    <RegionIcon size={12} /> {tpl.region}
                  </div>
                  
                  <p className="text-sm text-gray-600 font-inter mb-6 leading-relaxed flex-1">
                    {tpl.desc}
                  </p>

                  <Link 
                    href={`/builder?template=${tpl.id}`}
                    className="w-full py-3 px-4 bg-gray-900 hover:bg-[var(--dhaka-crimson)] text-white font-semibold text-center rounded-xl transition-colors flex justify-center items-center gap-2 group/btn"
                  >
                    Use this template
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>

                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none border-2 border-[var(--dhaka-crimson)] rounded-2xl opacity-100 transition-opacity" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
