import { T1PDF } from './T1PDF'
import { T2PDF } from './T2PDF'
import { T3PDF } from './T3PDF'
import { T4PDF } from './T4PDF'
import { T5PDF } from './T5PDF'
import { T6PDF } from './T6PDF'
import { T7PDF } from './T7PDF'

export const PDF_MAP: Record<string, React.ComponentType<{ cvData: any }>> = {
  t1: T1PDF,
  t2: T2PDF,
  t3: T3PDF,
  t4: T4PDF,
  t5: T5PDF,
  t6: T6PDF,
  t7: T7PDF,
}

export function getPDFComponent(id: string) {
  return PDF_MAP[id] ?? PDF_MAP.t3
}
