'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { X, Plus } from 'lucide-react'
import { LanguageProficiency } from '@/types/cv'

const PROFICIENCIES: LanguageProficiency[] = ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic']

const inputCls = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
const labelCls = "block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1"

export function LanguagesForm() {
  const { cvData, addLanguage, updateLanguage, removeLanguage, setActiveSection } = useCVStore()
  const { languages } = cvData

  return (
    <div className="px-8 py-6 flex flex-col gap-5 pb-10">
      {languages.map((lang, index) => (
        <div className="grid grid-cols-2 gap-4 relative">
          <div>
            <label className={labelCls}>Language</label>
            <input
              value={lang.language}
              onChange={e => updateLanguage(index, 'language', e.target.value)}
              placeholder="e.g. Nepali, English"
              className={inputCls}
            />
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className={labelCls}>Proficiency</label>
              <select
                value={lang.proficiency}
                onChange={e => updateLanguage(index, 'proficiency', e.target.value)}
                className={inputCls}
              >
                {PROFICIENCIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button
              onClick={() => removeLanguage(index)}
              className="mb-0.5 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-md text-sm font-semibold text-gray-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} />
        Add Language
      </button>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <button onClick={() => setActiveSection('skills')} className="px-5 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">← Back</button>
        <button onClick={() => setActiveSection('certifications')} className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">Continue →</button>
      </div>
    </div>
  )
}
