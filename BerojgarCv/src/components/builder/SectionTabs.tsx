'use client'

import { useCVStore } from '@/store/cvStore'
import { User, GraduationCap, Briefcase, Zap, Globe, Award, Users } from 'lucide-react'

const TABS = [
  { id: 'personal', label: 'About', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'languages', label: 'Language', icon: Globe },
  { id: 'certifications', label: 'Trainings', icon: Award },
  { id: 'references', label: 'Reference', icon: Users },
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
    <div className="flex flex-col w-full gap-1 items-center overflow-y-auto no-scrollbar">
      {TABS.map(tab => {
        const isActive = tab.id === activeSection
        const dataFilled = hasData(tab.id)
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            title={tab.label}
            className={`
              relative flex flex-col items-center justify-center w-[68px] h-[64px] rounded-xl transition-all
              ${isActive
                ? 'bg-green-50 text-green-700'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}
            `}
          >
            <Icon size={20} />
            <span className="text-[9px] font-bold tracking-wide mt-1 leading-tight text-center">{tab.label}</span>
            {dataFilled && !isActive && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-400" />
            )}
          </button>
        )
      })}
    </div>
  )
}
