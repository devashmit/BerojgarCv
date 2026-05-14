'use client'

import { useCVStore } from '@/store/cvStore'
import { User, GraduationCap, Briefcase, Zap, Globe, Award, Users } from 'lucide-react'

const TABS = [
  { id: 'personal',       label: 'To-do',      icon: User },
  { id: 'education',      label: 'Education',  icon: GraduationCap },
  { id: 'experience',     label: 'Experience', icon: Briefcase },
  { id: 'skills',         label: 'Skills',     icon: Zap },
  { id: 'languages',      label: 'Language',   icon: Globe },
  { id: 'certifications', label: 'Achieve.',   icon: Award },
  { id: 'references',     label: 'Reference',  icon: Users },
]

export function SectionTabs() {
  const { activeSection, setActiveSection, cvData } = useCVStore()

  const hasData = (id: string) => {
    switch (id) {
      case 'personal':       return !!cvData.personal.fullName || !!cvData.personal.email
      case 'education':      return cvData.education.length > 0
      case 'experience':     return cvData.experience.length > 0
      case 'skills':         return cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0
      case 'languages':      return cvData.languages.length > 0
      case 'certifications': return cvData.certifications.length > 0
      case 'references':     return cvData.references.length > 0
      default:               return false
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 w-full px-2">
      {TABS.map(tab => {
        const isActive = tab.id === activeSection
        const filled   = hasData(tab.id)
        const Icon     = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            title={tab.label}
            className="relative flex flex-col items-center justify-center w-full rounded-xl transition-all"
            style={{
              padding: '10px 4px',
              background: isActive ? '#2563EB' : 'transparent',
              color: isActive ? '#FFFFFF' : '#9CA3AF',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = '#F3F4F6'
                ;(e.currentTarget as HTMLElement).style.color = '#374151'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = '#9CA3AF'
              }
            }}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[10px] font-semibold mt-1.5 leading-tight text-center tracking-wide">
              {tab.label}
            </span>
            {filled && !isActive && (
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-green-500" />
            )}
          </button>
        )
      })}
    </div>
  )
}
