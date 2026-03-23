import type { CVData } from '@/types/cv'
import { ACTION_VERBS } from './actionVerbs'

export function calculateATS(cvData: CVData, templateId: string): number {
  let score = 0

  // Template ATS friendliness bonus
  if (templateId === 't3') score += 20
  else if (['t4', 't6'].includes(templateId)) score += 15
  else if (templateId === 't5') score += 10

  // Contact information completeness
  if (cvData.personal.fullName.trim()) score += 5
  if (cvData.personal.email.trim()) score += 5
  if (cvData.personal.phone.trim()) score += 5

  // Summary depth
  const wordCount = cvData.personal.summary.split(' ').filter(Boolean).length
  if (wordCount >= 40) score += 10
  else if (wordCount >= 20) score += 5

  // Experience with bullets
  if (cvData.experience.length >= 1) {
    if (cvData.experience[0].bullets.length >= 2) score += 15
    else score += 7
  }

  // Education present
  if (cvData.education.length >= 1) score += 5

  // Skills breadth
  if (cvData.skills.technical.length >= 5) score += 10
  else if (cvData.skills.technical.length >= 3) score += 5

  // Photo strategy — ATS-only templates penalized for photos, photo templates rewarded
  const isPhotoTemplate = ['t1', 't2', 't7'].includes(templateId)
  if (isPhotoTemplate && cvData.personal.photo) score += 5
  if (!isPhotoTemplate && !cvData.personal.photo) score += 5

  // Action verb usage in bullets
  const allBullets = cvData.experience.flatMap(e => e.bullets)
  const verbCount = allBullets.filter(b =>
    ACTION_VERBS.some(v => b.trim().startsWith(v))
  ).length
  if (verbCount >= 3) score += 10
  else if (verbCount >= 1) score += 5

  return Math.min(score, 100)
}
