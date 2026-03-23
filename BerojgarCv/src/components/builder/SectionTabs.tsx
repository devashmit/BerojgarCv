'use client'

import { useCVStore } from '@/store/cvStore'
import { User, GraduationCap, Briefcase, Zap, Globe, Award, Users } from 'lucide-react'

const TABS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'references', label: 'References', icon: Users },
]

export function SectionTabs() {
  const { activeSection, setActiveSection, cvData } = useCVStore()

  const hasData = (sectionId: string) => {
    switch (sectionId) {
      case 'personal': return !!cvData.personal.fullName || !!cvData.personal.email
      case 'education': return cvData.education.length > 0
      case 'experience': return cvData.experience.length > 0
      case 'skills': return cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0
      case 'languages': return cvData.languages.length > 0
      case 'certifications': return cvData.certifications.length > 0
      case 'references': return cvData.references.length > 0
      default: return false
    }
  }

  return (
    <div className="w-full shrink-0 border-b border-gray-100 bg-white">
      <div className="flex overflow-x-auto no-scrollbar scroll-smooth p-2 gap-1 items-center px-4 w-full">
        {TABS.map(tab => {
          const isActive = tab.id === activeSection
          const dataExists = hasData(tab.id)
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`
                group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap shrink-0
                ${isActive 
                  ? 'bg-red-50 text-[var(--dhaka-crimson)]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon size={16} className={`${isActive ? 'text-[var(--dhaka-crimson)]' : 'text-gray-400 group-hover:text-gray-600'}`} />
              
              <span className="hidden sm:inline md:hidden lg:inline">{tab.label}</span>
              <span className="inline sm:hidden md:inline lg:hidden">{tab.label.slice(0, 4)}</span>

              {dataExists && !isActive && (
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-500" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
