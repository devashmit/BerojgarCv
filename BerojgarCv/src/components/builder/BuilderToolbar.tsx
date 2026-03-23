'use client'

import { useCVStore } from '@/store/cvStore'
import { UserButton } from '@clerk/nextjs'
import { DhakaLogo } from '@/components/dhaka'
import { DhakaBorder } from '@/components/dhaka'
import { ATSBadge } from '../ui/ATSBadge'
import { Palette, Link2, Download } from 'lucide-react'
import { useState } from 'react'
import { TemplateSwitcherModal } from '../ui/TemplateSwitcherModal'

const TEMPLATE_NAMES: Record<string, string> = {
  t1: 'Dhaka Heritage',
  t2: 'Himalaya Modern',
  t3: "Jake's Resume",
  t4: 'Zürich Executive',
  t5: 'Nova Sidebar',
  t6: 'Paris Élégante',
  t7: 'Rirekisho (JIS)',
}

export function BuilderToolbar() {
  const { templateId, atsScore, isSaving } = useCVStore()
  const [showSwitcher, setShowSwitcher] = useState(false)

  return (
    <>
      <div className="w-full bg-white border-b border-gray-200 flex flex-col shrink-0">
        <DhakaBorder height={3} />
        
        <div className="h-[53px] px-4 md:px-6 flex justify-between items-center bg-white z-20">
          
          {/* Left */}
          <div className="flex items-center gap-6">
            <DhakaLogo size={24} />
            <div className="hidden sm:block w-[1px] h-6 bg-gray-200" />
            <UserButton />
          </div>

          {/* Center */}
          <div className="hidden flex-1 md:flex justify-center items-center gap-4">
            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 tracking-wide">
              {TEMPLATE_NAMES[templateId]}
            </div>
            <ATSBadge score={atsScore} />
            {isSaving && (
              <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider ml-2 animate-pulse">
                Saving...
              </span>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setShowSwitcher(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Palette size={16} />
              <span className="hidden lg:inline">Templates</span>
            </button>
            <button 
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-not-allowed opacity-50"
              title="Coming in Phase 4"
            >
              <Link2 size={16} />
              <span className="hidden lg:inline">Share</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[var(--dhaka-crimson)] hover:bg-[var(--dhaka-crimson-hover)] text-white rounded-lg transition-colors cursor-not-allowed opacity-50 shadow-sm"
              title="Coming in Phase 3"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>

        </div>
      </div>

      <TemplateSwitcherModal isOpen={showSwitcher} onClose={() => setShowSwitcher(false)} />
    </>
  )
}
