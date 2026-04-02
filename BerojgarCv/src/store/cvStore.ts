'use client'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { calculateATS } from '@/lib/atsCalculator'
import { defaultCVData } from '@/lib/defaultCVData'
import type { CVData, EducationEntry, ExperienceEntry, LanguageEntry, ReferenceEntry } from '@/types/cv'

interface CVStore {
  cvData: CVData
  templateId: string
  activeSection: string
  cvId: string | null
  shareId: string | null
  atsScore: number
  isDirty: boolean
  isSaving: boolean

  updatePersonal: (field: keyof CVData['personal'], value: string | number | boolean | undefined) => void
  setTemplate: (id: string) => void
  setActiveSection: (section: string) => void

  addEducation: () => void
  updateEducation: (id: string, field: keyof EducationEntry, value: string) => void
  removeEducation: (id: string) => void
  reorderEducation: (from: number, to: number) => void

  addExperience: () => void
  updateExperience: (id: string, field: keyof ExperienceEntry, value: string | boolean) => void
  removeExperience: (id: string) => void
  reorderExperience: (from: number, to: number) => void

  addBullet: (expId: string) => void
  updateBullet: (expId: string, index: number, value: string) => void
  removeBullet: (expId: string, index: number) => void

  addSkill: (type: 'technical' | 'soft', skill: string) => void
  removeSkill: (type: 'technical' | 'soft', skill: string) => void

  addLanguage: () => void
  updateLanguage: (index: number, field: keyof LanguageEntry, value: string) => void
  removeLanguage: (index: number) => void

  addCertification: (cert: string) => void
  updateCertification: (index: number, value: string) => void
  removeCertification: (index: number) => void

  addReference: () => void
  updateReference: (id: string, field: keyof ReferenceEntry, value: string) => void
  removeReference: (id: string) => void
  toggleReferencesOnRequest: () => void

  saveToDB: () => Promise<void>
  loadFromDB: (cvId: string) => Promise<void>
}

// ATS score must stay in sync with data — recalculate after every mutation
function recalc(state: CVStore) {
  state.atsScore = calculateATS(state.cvData, state.templateId)
  state.isDirty = true
}

export const useCVStore = create<CVStore>()(
  immer((set, get) => ({
    cvData: defaultCVData,
    templateId: 't3',
    activeSection: 'personal',
    cvId: null,
    shareId: null,
    atsScore: 0,
    isDirty: false,
    isSaving: false,

    updatePersonal: (field, value) => set(state => {
      (state.cvData.personal as Record<string, unknown>)[field] = value
      recalc(state)
    }),

    setTemplate: (id) => set(state => {
      state.templateId = id
      recalc(state)
    }),

    setActiveSection: (section) => set(state => {
      state.activeSection = section
    }),

    // Education
    addEducation: () => set(state => {
      state.cvData.education.push({
        id: crypto.randomUUID(),
        degree: '', institution: '', location: '',
        startYear: '', endYear: '', grade: '',
      })
      recalc(state)
    }),

    updateEducation: (id, field, value) => set(state => {
      const entry = state.cvData.education.find(e => e.id === id)
      if (entry) {
        (entry as Record<string, unknown>)[field] = value
        recalc(state)
      }
    }),

    removeEducation: (id) => set(state => {
      state.cvData.education = state.cvData.education.filter(e => e.id !== id)
      recalc(state)
    }),

    reorderEducation: (from, to) => set(state => {
      const [item] = state.cvData.education.splice(from, 1)
      state.cvData.education.splice(to, 0, item)
      recalc(state)
    }),

    // Experience
    addExperience: () => set(state => {
      state.cvData.experience.push({
        id: crypto.randomUUID(),
        title: '', company: '', location: '',
        startDate: '', endDate: '', currentJob: false,
        bullets: [''],
      })
      recalc(state)
    }),

    updateExperience: (id, field, value) => set(state => {
      const entry = state.cvData.experience.find(e => e.id === id)
      if (entry) {
        (entry as Record<string, unknown>)[field] = value
        recalc(state)
      }
    }),

    removeExperience: (id) => set(state => {
      state.cvData.experience = state.cvData.experience.filter(e => e.id !== id)
      recalc(state)
    }),

    reorderExperience: (from, to) => set(state => {
      const [item] = state.cvData.experience.splice(from, 1)
      state.cvData.experience.splice(to, 0, item)
      recalc(state)
    }),

    // Bullets
    addBullet: (expId) => set(state => {
      const exp = state.cvData.experience.find(e => e.id === expId)
      if (exp) {
        exp.bullets.push('')
        recalc(state)
      }
    }),

    updateBullet: (expId, index, value) => set(state => {
      const exp = state.cvData.experience.find(e => e.id === expId)
      if (exp && index < exp.bullets.length) {
        exp.bullets[index] = value
        recalc(state)
      }
    }),

    removeBullet: (expId, index) => set(state => {
      const exp = state.cvData.experience.find(e => e.id === expId)
      if (exp) {
        exp.bullets.splice(index, 1)
        recalc(state)
      }
    }),

    // Skills
    addSkill: (type, skill) => set(state => {
      if (!state.cvData.skills[type].includes(skill)) {
        state.cvData.skills[type].push(skill)
        recalc(state)
      }
    }),

    removeSkill: (type, skill) => set(state => {
      state.cvData.skills[type] = state.cvData.skills[type].filter(s => s !== skill)
      recalc(state)
    }),

    // Languages
    addLanguage: () => set(state => {
      state.cvData.languages.push({ language: '', proficiency: 'Basic' })
      recalc(state)
    }),

    updateLanguage: (index, field, value) => set(state => {
      if (index < state.cvData.languages.length) {
        (state.cvData.languages[index] as Record<string, unknown>)[field] = value
        recalc(state)
      }
    }),

    removeLanguage: (index) => set(state => {
      state.cvData.languages.splice(index, 1)
      recalc(state)
    }),

    // Certifications
    addCertification: (cert) => set(state => {
      state.cvData.certifications.push(cert)
      recalc(state)
    }),

    updateCertification: (index, value) => set(state => {
      if (index >= 0 && index < state.cvData.certifications.length) {
        state.cvData.certifications[index] = value
        recalc(state)
      }
    }),

    removeCertification: (index) => set(state => {
      state.cvData.certifications.splice(index, 1)
      recalc(state)
    }),

    // References
    addReference: () => set(state => {
      state.cvData.references.push({
        id: crypto.randomUUID(),
        name: '', title: '', contact: '',
      })
      recalc(state)
    }),

    updateReference: (id, field, value) => set(state => {
      const entry = state.cvData.references.find(r => r.id === id)
      if (entry) {
        (entry as Record<string, unknown>)[field] = value
        recalc(state)
      }
    }),

    removeReference: (id) => set(state => {
      state.cvData.references = state.cvData.references.filter(r => r.id !== id)
      recalc(state)
    }),

    toggleReferencesOnRequest: () => set(state => {
      state.cvData.referencesOnRequest = !state.cvData.referencesOnRequest
      recalc(state)
    }),

    // DB stubs — wired to API routes in Phase 4
    saveToDB: async () => {
      set(state => { state.isSaving = true })
      const { cvData, templateId, cvId } = get()
      try {
        const res = await fetch('/api/cv/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cvData,
            templateId,
            cvId,
            title: (cvData.personal as any).fullName || 'My CV',
          }),
        })
        const data = await res.json()
        set(state => {
          state.cvId = data.cvId
          state.shareId = data.shareId
          state.isDirty = false
          state.isSaving = false
        })
      } catch {
        set(state => { state.isSaving = false })
        // Toast shown by the component that triggered saveToDB
      }
    },

    loadFromDB: async (cvId: string) => {
      const res = await fetch(`/api/cv/${cvId}`)
      const data = await res.json()
      set(state => {
        state.cvData = data.cvData
        state.templateId = data.templateId
        state.cvId = cvId
        state.shareId = data.shareId
        state.atsScore = calculateATS(data.cvData, data.templateId)
        state.isDirty = false
      })
    },
  }))
)
