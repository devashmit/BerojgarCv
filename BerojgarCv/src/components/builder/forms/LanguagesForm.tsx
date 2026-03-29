import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { GripVertical, X, Plus } from 'lucide-react'
import { LanguageProficiency } from '@/types/cv'

const PROFICIENCIES: LanguageProficiency[] = [
  'Native', 'Fluent', 'Professional', 'Conversational', 'Basic'
]

export function LanguagesForm() {
  const { cvData, addLanguage, updateLanguage, removeLanguage } = useCVStore()
  const { languages } = cvData

  return (
    <div className="p-6 space-y-4 pb-24">
      {languages.map((lang, index) => (
        <div key={index} className="flex gap-2 isolate group relative">
          <div className="relative flex-1 group focus-within:z-10 flex gap-0 rounded-md overflow-hidden bg-white border border-slate-200">
            <div className="absolute left-2 inset-y-0 flex items-center justify-center text-slate-300 cursor-grab z-10 w-4">
              <GripVertical size={14} />
            </div>
            
            <input
               value={lang.language}
               onChange={e => updateLanguage(index, 'language', e.target.value)}
               className="flex-1 pl-8 pr-3 py-2 text-sm outline-none transition-all placeholder:text-slate-400"
               placeholder="e.g. Nepali, English"
            />
            
            <div className="w-[1px] bg-slate-200 my-1"></div>
            
            <select
               value={lang.proficiency}
               onChange={e => updateLanguage(index, 'proficiency', e.target.value)}
               className="w-[140px] px-3 py-2 text-sm text-slate-600 outline-none bg-slate-50 border-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
            >
              {PROFICIENCIES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => removeLanguage(index)}
            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors self-center shrink-0"
            title="Remove Language"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      
      <button
        onClick={addLanguage}
        className="w-full py-3 mt-4 border-2 border-dashed border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add Language
      </button>
    </div>
  )
}
