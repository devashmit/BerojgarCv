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
    <div className="flex flex-col h-full bg-white relative px-8 py-10 w-full max-w-[800px] mx-auto">
      
      {/* Dynamic Massive Header Area */}
      <div className="mb-10 shrink-0">
        <h1 className="text-4xl font-extrabold text-blue-500 tracking-tight mb-2">
          {currentText.title}
        </h1>
        <p className="text-slate-500 font-medium">
          {currentText.subtitle}
        </p>
      </div>
      
      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full absolute inset-0"
          >
            <div className="w-full h-full pb-32">
              {activeSection === 'personal' && <PersonalForm />}
              {activeSection === 'education' && <EducationForm />}
              {activeSection === 'experience' && <ExperienceForm />}
              {activeSection === 'skills' && <SkillsForm />}
              {activeSection === 'languages' && <LanguagesForm />}
              {activeSection === 'certifications' && <CertificationsForm />}
              {activeSection === 'references' && <ReferencesForm />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
