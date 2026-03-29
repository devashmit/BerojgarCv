'use client'

import { useCVStore } from '@/store/cvStore'
import { SectionTabs } from './SectionTabs'
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
  const sectionName = activeSection.charAt(0).toUpperCase() + activeSection.slice(1)

  return (
    <div className="flex flex-col h-full bg-white relative">
      <SectionTabs />
      
      <div className="flex-1 overflow-y-auto w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full absolute inset-0"
          >
            <div className="w-full">
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
