import React from 'react'
import { T1DhakaHeritage } from './T1DhakaHeritage'
import { T2HimalayaModern } from './T2HimalayaModern'
import { T3JakesResume } from './T3JakesResume'
import { T4ZurichExecutive } from './T4ZurichExecutive'
import { T5NovaSidebar } from './T5NovaSidebar'
import { T6ParisElegante } from './T6ParisElegante'
import { T7Rirekisho } from './T7Rirekisho'
import { T8Classic } from './T8Classic'
import { T9Modern } from './T9Modern'
import { T10Minimal } from './T10Minimal'

import { T1Thumb } from './T1Thumb'
import { T2Thumb } from './T2Thumb'
import { T3Thumb } from './T3Thumb'
import { T4Thumb } from './T4Thumb'
import { T5Thumb } from './T5Thumb'
import { T6Thumb } from './T6Thumb'
import { T7Thumb } from './T7Thumb'
import { T8Thumb } from './T8Thumb'
import { T9Thumb } from './T9Thumb'
import { T10Thumb } from './T10Thumb'

export const TEMPLATE_MAP: Record<string, React.ComponentType<{ cvData: any }>> = {
  t1: T1DhakaHeritage,
  t2: T2HimalayaModern,
  t3: T3JakesResume,
  t4: T4ZurichExecutive,
  t5: T5NovaSidebar,
  t6: T6ParisElegante,
  t7: T7Rirekisho,
  t8: T8Classic,
  t9: T9Modern,
  t10: T10Minimal,
}

export const THUMB_MAP: Record<string, React.ComponentType> = {
  t1: T1Thumb,
  t2: T2Thumb,
  t3: T3Thumb,
  t4: T4Thumb,
  t5: T5Thumb,
  t6: T6Thumb,
  t7: T7Thumb,
  t8: T8Thumb,
  t9: T9Thumb,
  t10: T10Thumb,
}

export function getTemplateComponent(id: string) {
  return TEMPLATE_MAP[id] ?? TEMPLATE_MAP.t3
}
