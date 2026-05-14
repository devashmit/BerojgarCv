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

const SECTION_META: Record<string, { title: string; subtitle: string }> = {
  personal:       { title: 'About yourself',           subtitle: 'Fill out your primary information.' },
  education:      { title: 'Education',                subtitle: 'Add your educational background.' },
  experience:     { title: 'Work Experience',          subtitle: 'List your professional experience.' },
  skills:         { title: 'Skills',                   subtitle: 'List your technical and soft skills.' },
  languages:      { title: 'Languages',                subtitle: 'What languages do you speak?' },
  certifications: { title: 'Trainings & Certifications', subtitle: 'Add relevant certificates and courses.' },
  references:     { title: 'References',               subtitle: 'Add your professional references.' },
}

export function FormPanel() {
  const { activeSection } = useCVStore()
  const meta = SECTION_META[activeSection] ?? { title: activeSection, subtitle: '' }

  return (
    <div className="flex flex-col h-full bg-white w-full overflow-hidden">
      {/* Section header — blue title like SajiloCV */}
      <div className="px-8 pt-7 pb-4 shrink-0 border-b border-gray-100">
        <h1 className="text-2xl font-bold leading-tight" style={{ color: '#2563EB' }}>
          {meta.title}
        </h1>
        <p className="text-sm text-gray-400 mt-1">{meta.subtitle}</p>
      </div>

      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="w-full"
          >
            {activeSection === 'personal'       && <PersonalForm />}
            {activeSection === 'education'      && <EducationForm />}
            {activeSection === 'experience'     && <ExperienceForm />}
            {activeSection === 'skills'         && <SkillsForm />}
            {activeSection === 'languages'      && <LanguagesForm />}
            {activeSection === 'certifications' && <CertificationsForm />}
            {activeSection === 'references'     && <ReferencesForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
