import { T1DhakaHeritage } from './T1DhakaHeritage'
import { T2HimalayaModern } from './T2HimalayaModern'
import { T3JakesResume } from './T3JakesResume'
import { T4ZurichExecutive } from './T4ZurichExecutive'
import { T5NovaSidebar } from './T5NovaSidebar'
import { T6ParisElegante } from './T6ParisElegante'
import { T7Rirekisho } from './T7Rirekisho'

export const TEMPLATE_MAP: Record<string, React.ComponentType<{ cvData: any }>> = {
  t1: T1DhakaHeritage,
  t2: T2HimalayaModern,
  t3: T3JakesResume,
  t4: T4ZurichExecutive,
  t5: T5NovaSidebar,
  t6: T6ParisElegante,
  t7: T7Rirekisho,
}

export function getTemplateComponent(id: string) {
  return TEMPLATE_MAP[id] ?? TEMPLATE_MAP.t3
}
