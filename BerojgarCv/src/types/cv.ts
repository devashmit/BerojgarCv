export type NepalProvince =
  | 'Koshi Province' | 'Madhesh Province' | 'Bagmati Province'
  | 'Gandaki Province' | 'Lumbini Province' | 'Karnali Province'
  | 'Sudurpashchim Province'

export type LanguageProficiency = 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic'
export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'None'

export interface EducationEntry {
  id: string; degree: string; institution: string; location: string;
  startYear: string; endYear: string; grade: string; description?: string;
}

export interface ExperienceEntry {
  id: string; title: string; company: string; location: string;
  startDate: string; endDate: string; currentJob: boolean; bullets: string[];
}

export interface LanguageEntry { language: string; proficiency: LanguageProficiency; }

export interface ProjectEntry {
  id: string; name: string; description: string; link?: string; technologies: string[];
}

export interface ReferenceEntry { id: string; name: string; title: string; contact: string; }

export interface CVData {
  personal: {
    fullName: string; jobTitle: string; email: string; phone: string;
    address: string; province: NepalProvince; linkedin: string;
    github?: string; website?: string; summary: string;
    citizenshipNo?: string; dateOfBirth?: string; nationality?: string;
    expectedSalaryNPR?: number; photo?: string;
    nameKana?: string; nameFurigana?: string; jlptLevel?: JLPTLevel;
    visaType?: string; nearestStation?: string;
  };
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: { technical: string[]; soft: string[]; };
  languages: LanguageEntry[];
  certifications: string[];
  projects?: ProjectEntry[];
  references: ReferenceEntry[];
  referencesOnRequest?: boolean;
}
