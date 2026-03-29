import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { GripVertical, X, Plus } from 'lucide-react'

export function EducationForm() {
  const { cvData, addEducation, updateEducation, removeEducation } = useCVStore()
  const { education } = cvData

  return (
    <div className="p-6 space-y-4 pb-24">
      {education.map((edu, index) => (
        <div key={edu.id} className="relative bg-slate-50 border border-slate-200 rounded-lg p-4 group">
          {/* Controls */}
          <div className="absolute left-2 top-4 text-slate-400 cursor-grab hover:text-slate-600">
            <GripVertical size={16} />
          </div>
          <button 
            onClick={() => removeEducation(edu.id)}
            className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <X size={16} />
          </button>

          {/* Form Fields */}
          <div className="pl-6 pt-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Degree / Major</label>
                <input 
                  value={edu.degree}
                  onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="B.E. Computer Engineering"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Institution</label>
                <input 
                  value={edu.institution}
                  onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="Tribhuvan University"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</label>
                <input 
                  value={edu.location}
                  onChange={e => updateEducation(edu.id, 'location', e.target.value)}
                  placeholder="Kathmandu"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Year</label>
                <input 
                  value={edu.startYear}
                  onChange={e => updateEducation(edu.id, 'startYear', e.target.value)}
                  placeholder="2017"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm font-mono focus:border-amber-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End Year</label>
                <input 
                  value={edu.endYear}
                  onChange={e => updateEducation(edu.id, 'endYear', e.target.value)}
                  placeholder="2021"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm font-mono focus:border-amber-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Grade / GPA <span className="text-[8px] font-normal normal-case text-slate-400">(Optional)</span></label>
              <input 
                value={edu.grade}
                onChange={e => updateEducation(edu.id, 'grade', e.target.value)}
                placeholder="3.8 / 4.0"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-3 mt-4 border-2 border-dashed border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add Education
      </button>
    </div>
  )
}
