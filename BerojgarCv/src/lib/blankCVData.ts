import type { CVData } from '@/types/cv'

/**
 * Blank CV used as initial state for every new authenticated session.
 * New users ALWAYS start here — never with another user's data.
 */
export const blankCVData: CVData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    province: 'Bagmati Province',
    linkedin: '',
    github: '',
    website: '',
    summary: '',
    citizenshipNo: '',
    dateOfBirth: '',
    nationality: '',
    expectedSalaryNPR: undefined,
    photo: undefined,
    nameKana: '',
    nameFurigana: '',
    jlptLevel: 'None',
    visaType: '',
    nearestStation: '',
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
  },
  languages: [],
  certifications: [],
  projects: [],
  references: [],
  referencesOnRequest: false,
}
