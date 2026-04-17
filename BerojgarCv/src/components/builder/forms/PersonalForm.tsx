'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { PhotoUpload } from '@/components/ui/PhotoUpload'
import { NepalProvince, JLPTLevel } from '@/types/cv'

const PROVINCES: NepalProvince[] = [
  'Koshi Province', 'Madhesh Province', 'Bagmati Province',
  'Gandaki Province', 'Lumbini Province', 'Karnali Province',
  'Sudurpashchim Province'
]

const JLPT_LEVELS: JLPTLevel[] = ['None', 'N5', 'N4', 'N3', 'N2', 'N1']

export function PersonalForm() {
  const { cvData, templateId, updatePersonal, setActiveSection } = useCVStore()
  const { personal } = cvData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updatePersonal(name as any, value)
  }

  // Common input styling matching the reference UI
  const inputClass = "w-full text-sm py-3 px-4 bg-slate-100 hover:bg-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-md border border-transparent transition-all"
  const labelClass = "text-xs font-semibold text-slate-400 mb-1.5 block"

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-8 items-start">
        <PhotoUpload 
          value={personal.photo}
          onChange={(url) => updatePersonal('photo', url)}
          onRemove={() => updatePersonal('photo', undefined)}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        <div>
           <label className={labelClass}>First Name / Full Name</label>
           <input 
             name="fullName"
             value={personal.fullName}
             onChange={handleChange}
             placeholder="Abhishek Kumar"
             className={inputClass}
           />
        </div>
        <div>
           <label className={labelClass}>Last Name (Optional if already in full)</label>
           <input 
             placeholder="Dev"
             className={inputClass}
           />
        </div>
        <div className="col-span-2">
           <label className={labelClass}>Designation</label>
           <input 
             name="jobTitle"
             value={personal.jobTitle}
             onChange={handleChange}
             placeholder="Accountant"
             className={inputClass}
           />
        </div>

        <div>
           <label className={labelClass}>Address (Street, Province)</label>
           <input 
             name="address"
             value={personal.address}
             onChange={handleChange}
             placeholder="Duhabi-9, Sunsari"
             className={inputClass}
           />
        </div>
        <div>
           <label className={labelClass}>City / Region</label>
           <select 
             name="province"
             value={personal.province}
             onChange={handleChange}
             className={inputClass}
           >
             {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
           </select>
        </div>

        <div>
           <label className={labelClass}>Email</label>
           <input 
             name="email"
             type="email"
             value={personal.email}
             onChange={handleChange}
             placeholder="devvv026@gmail.com"
             className={inputClass}
           />
        </div>
        <div>
           <label className={labelClass}>Phone</label>
           <input 
             name="phone"
             value={personal.phone}
             onChange={handleChange}
             placeholder="9762719660"
             className={inputClass}
           />
        </div>
      </div>

      <div>
        <label className={labelClass}>Summary</label>
        {/* Mock Rich Toolbar for matching aesthetic */}
        <div className="flex items-center gap-2 mb-2 p-1 bg-slate-50 border border-slate-100 rounded-md w-fit">
           <button className="px-2 py-1 hover:bg-slate-200 rounded text-slate-700 font-bold">B</button>
           <button className="px-2 py-1 hover:bg-slate-200 rounded text-slate-700 italic">I</button>
           <button className="px-2 py-1 hover:bg-slate-200 rounded text-slate-700 underline">U</button>
           <div className="w-px h-4 bg-slate-300 mx-1"></div>
           <button className="px-2 py-1 hover:bg-slate-200 rounded text-slate-700 font-mono text-xs">🔗</button>
        </div>
        <textarea 
          name="summary"
          value={personal.summary}
          onChange={handleChange}
          rows={4}
          placeholder="Results-driven professional with a proven track record..."
          className={`${inputClass} resize-none mb-1`}
        />
      </div>

      <button className="text-blue-500 font-semibold text-sm flex items-center justify-start gap-1 w-max hover:text-blue-700">
        <span className="text-lg leading-none">+</span> Add Social Link
      </button>

      {/* Advanced region */}
      <div className="mt-8 border-t border-slate-100 pt-8">
        <h3 className="text-sm font-bold text-slate-600 mb-6">Regional Settings (ATS & Special Templates)</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
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

        {templateId === 't7' && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-6 p-4 bg-[#FFF0F0] border border-red-100 rounded-lg">
             <div>
                <label className={labelClass}>Name Furigana <span className="lowercase font-normal/60">(Japan)</span></label>
                <input name="nameFurigana" value={personal.nameFurigana || ''} onChange={handleChange} placeholder="ふりがな" className="w-full text-sm py-2.5 px-3 bg-white rounded border border-slate-200 outline-none focus:border-red-400" />
             </div>
             <div>
                <label className={labelClass}>Name Katakana <span className="lowercase font-normal/60">(Japan)</span></label>
                <input name="nameKana" value={personal.nameKana || ''} onChange={handleChange} placeholder="カタカナ" className="w-full text-sm py-2.5 px-3 bg-white rounded border border-slate-200 outline-none focus:border-red-400" />
             </div>
             <div>
                <label className={labelClass}>Visa Type</label>
                <input name="visaType" value={personal.visaType || ''} onChange={handleChange} className="w-full text-sm py-2.5 px-3 bg-white rounded border border-slate-200 outline-none" />
             </div>
             <div>
                <label className={labelClass}>JLPT Level</label>
                <select name="jlptLevel" value={personal.jlptLevel || ''} onChange={handleChange} className="w-full text-sm py-2.5 px-3 bg-white rounded border border-slate-200 outline-none">
                  {JLPT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
             </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100 pb-10">
         <button className="px-6 py-2.5 rounded border border-slate-300 text-slate-600 font-bold text-sm bg-white hover:bg-slate-50 hover:text-slate-800 transition-colors">
            Back
         </button>
         <button 
           onClick={() => setActiveSection('education')}
           className="px-6 py-2.5 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition-colors shadow-sm"
         >
            Continue to Education &gt;
         </button>
      </div>

    </div>
  )
}
