'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { GripVertical, X, Plus, GraduationCap } from 'lucide-react'

const inputCls = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
const labelCls = "block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1"

export function EducationForm() {
  const { cvData, addEducation, updateEducation, removeEducation, setActiveSection } = useCVStore()
  const { education } = cvData

  return (
    <div className="px-8 py-6 space-y-5 pb-10">
      {education.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
            <GraduationCap size={22} className="text-indigo-400" />
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">No education added yet</p>
          <p className="text-xs text-gray-400 mb-4">Add your degrees, diplomas, or courses.</p>
        </div>
      )}

      {education.map((edu) => (
        <div key={edu.id} className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          {/* Drag handle */}
          <div className="absolute left-2.5 top-4 text-gray-300 cursor-grab hover:text-gray-500">
            <GripVertical size={15} />
          </div>
          {/* Remove */}
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute right-2.5 top-2.5 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={15} />
          </button>

          <div className="pl-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Degree / Major</label>
                <input value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} placeholder="B.E. Computer Engineering" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Institution</label>
                <input value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} placeholder="Tribhuvan University" className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Location</label>
                <input value={edu.location} onChange={e => updateEducation(edu.id, 'location', e.target.value)} placeholder="Kathmandu" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Start Year</label>
                <input value={edu.startYear} onChange={e => updateEducation(edu.id, 'startYear', e.target.value)} placeholder="2017" className={`${inputCls} font-mono`} />
              </div>
              <div>
                <label className={labelCls}>End Year</label>
                <input value={edu.endYear} onChange={e => updateEducation(edu.id, 'endYear', e.target.value)} placeholder="2021" className={`${inputCls} font-mono`} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Grade / GPA <span className="normal-case font-normal text-gray-400">(optional)</span></label>
              <input value={edu.grade} onChange={e => updateEducation(edu.id, 'grade', e.target.value)} placeholder="3.8 / 4.0 or First Division" className={inputCls} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-md text-sm font-semibold text-gray-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} />
        Add Education
      </button>

      {/* Nav */}
      <div className="flex justify-between pt-3 border-t border-gray-100">
        <button onClick={() => setActiveSection('personal')} className="px-5 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">← Back</button>
        <button onClick={() => setActiveSection('experience')} className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">Continue →</button>
      </div>
    </div>
  )
}
