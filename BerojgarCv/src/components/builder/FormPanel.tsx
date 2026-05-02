'use client'

import { useCVStore } from '@/store/cvStore'
import { motion, AnimatePresence } from 'framer-motion'
import { PersonalForm } from './forms/PersonalForm'
import { EducationForm } from './forms/EducationForm'
import { ExperienceForm } from './forms/ExperienceForm'
import { SkillsForm } from './forms/SkillsForm'
import { LanguagesForm } from './forms/LanguagesForm'
import { CertificationsForm } from './forms/CertificationsForm'
import { ReferencesForm } from './forms/ReferencesForm'

export function FormPanel() {
  const { activeSection } = useCVStore()

  // Capitalize section name for the placeholder text
  const sectionTitleMap: Record<string, { title: string, subtitle: string }> = {
    'personal': { title: 'About yourself', subtitle: 'Fill out your primary information.' },
    'education': { title: 'Education', subtitle: 'Add your educational background.' },
    'experience': { title: 'Work Experience', subtitle: 'List your professional experience.' },
    'skills': { title: 'Skills', subtitle: 'List your technical and soft skills.' },
    'languages': { title: 'Languages', subtitle: 'What languages do you speak?' },
    'certifications': { title: 'Trainings / Certifications', subtitle: 'Add any relevant trainings or certificates.' },
    'references': { title: 'References', subtitle: 'Add your professional references.' },
  }

  const currentText = sectionTitleMap[activeSection] || { title: activeSection, subtitle: '' }

  return (
    <div className="flex flex-col h-full bg-white w-full">
      {/* Section header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <h1 className="text-xl font-bold text-slate-900 leading-tight">
          {currentText.title}
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          {currentText.subtitle}
        </p>
      </div>

      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="w-full"
          >
            {activeSection === 'personal' && <PersonalForm />}
            {activeSection === 'education' && <EducationForm />}
            {activeSection === 'experience' && <ExperienceForm />}
            {activeSection === 'skills' && <SkillsForm />}
            {activeSection === 'languages' && <LanguagesForm />}
            {activeSection === 'certifications' && <CertificationsForm />}
            {activeSection === 'references' && <ReferencesForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
