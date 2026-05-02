'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { PhotoUpload } from '@/components/ui/PhotoUpload'
import { NepalProvince, JLPTLevel } from '@/types/cv'

const PROVINCES: NepalProvince[] = [
  'Koshi Province', 'Madhesh Province', 'Bagmati Province',
  'Gandaki Province', 'Lumbini Province', 'Karnali Province',
  'Sudurpashchim Province',
]

const JLPT_LEVELS: JLPTLevel[] = ['None', 'N5', 'N4', 'N3', 'N2', 'N1']

export function PersonalForm() {
  const { cvData, templateId, updatePersonal, setActiveSection } = useCVStore()
  const { personal } = cvData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updatePersonal(name as any, value)
  }

  const inputClass = "w-full text-sm py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
  const labelClass = "text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block"

  return (
    <div className="px-6 py-5 flex flex-col gap-5 pb-8">

      {/* Photo */}
      <div className="flex justify-center">
        <PhotoUpload
          value={personal.photo}
          onChange={(url) => updatePersonal('photo', url)}
          onRemove={() => updatePersonal('photo', undefined)}
        />
      </div>

      {/* Basic info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelClass}>Full Name</label>
          <input name="fullName" value={personal.fullName} onChange={handleChange} placeholder="Arjun Sharma" className={inputClass} />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Job Title / Designation</label>
          <input name="jobTitle" value={personal.jobTitle} onChange={handleChange} placeholder="Software Engineer" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" value={personal.email} onChange={handleChange} placeholder="arjun@email.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input name="phone" value={personal.phone} onChange={handleChange} placeholder="+977-9841234567" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input name="address" value={personal.address} onChange={handleChange} placeholder="Kathmandu, Nepal" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Province</label>
          <select name="province" value={personal.province} onChange={handleChange} className={inputClass}>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>LinkedIn URL</label>
          <input name="linkedin" value={personal.linkedin} onChange={handleChange} placeholder="linkedin.com/in/arjunsharma" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>GitHub / Website</label>
          <input name="github" value={personal.github || ''} onChange={handleChange} placeholder="github.com/arjunsharma" className={inputClass} />
        </div>
      </div>

      {/* Summary */}
      <div>
        <label className={labelClass}>Professional Summary</label>
        <textarea
          name="summary"
          value={personal.summary}
          onChange={handleChange}
          rows={4}
          placeholder="Results-driven professional with a proven track record..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Regional fields */}
      <div className="border-t border-slate-100 pt-4">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Regional / Gulf Fields</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Citizenship Number</label>
            <input name="citizenshipNo" value={personal.citizenshipNo || ''} onChange={handleChange} placeholder="00-00-00-00000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expected Salary (NPR)</label>
            <input name="expectedSalaryNPR" type="number" value={personal.expectedSalaryNPR || ''} onChange={handleChange} placeholder="40000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input name="dateOfBirth" type="date" value={personal.dateOfBirth || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Nationality</label>
            <input name="nationality" value={personal.nationality || ''} onChange={handleChange} placeholder="Nepali" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Japan-specific fields */}
      {templateId === 't7' && (
        <div className="border border-red-100 bg-red-50 rounded-lg p-4">
          <h3 className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-3">Japan (Rirekisho) Fields</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name Furigana</label>
              <input name="nameFurigana" value={personal.nameFurigana || ''} onChange={handleChange} placeholder="ふりがな" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Name Katakana</label>
              <input name="nameKana" value={personal.nameKana || ''} onChange={handleChange} placeholder="カタカナ" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Visa Type</label>
              <input name="visaType" value={personal.visaType || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>JLPT Level</label>
              <select name="jlptLevel" value={personal.jlptLevel || ''} onChange={handleChange} className={inputClass}>
                {JLPT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div className="flex justify-end pt-2 border-t border-slate-100">
        <button
          onClick={() => setActiveSection('education')}
          className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition-colors"
        >
          Continue to Education →
        </button>
      </div>
    </div>
  )
}
