'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { PhotoUpload } from '@/components/ui/PhotoUpload'
import { NepalProvince, JLPTLevel } from '@/types/cv'
import { Bold, Italic, Underline, List, Link } from 'lucide-react'

const PROVINCES: NepalProvince[] = [
  'Koshi Province', 'Madhesh Province', 'Bagmati Province',
  'Gandaki Province', 'Lumbini Province', 'Karnali Province',
  'Sudurpashchim Province',
]
const JLPT_LEVELS: JLPTLevel[] = ['None', 'N5', 'N4', 'N3', 'N2', 'N1']

const inputCls = "w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5"

export function PersonalForm() {
  const { cvData, templateId, updatePersonal, setActiveSection } = useCVStore()
  const { personal } = cvData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updatePersonal(e.target.name as any, e.target.value)
  }

  return (
    <div className="px-8 py-6 flex flex-col gap-6 pb-10">

      {/* Photo upload */}
      <div>
        <p className={labelCls}>Photo <span className="normal-case font-normal text-gray-400">(Optional)</span></p>
        <PhotoUpload
          value={personal.photo}
          onChange={url => updatePersonal('photo', url)}
          onRemove={() => updatePersonal('photo', undefined)}
        />
      </div>

      {/* Row 1: First Name + Last Name */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>First Name</label>
          <input name="fullName" value={personal.fullName} onChange={handleChange} placeholder="Abhishek Kumar" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Last Name</label>
          <input name="lastName" value={(personal as any).lastName || ''} onChange={handleChange} placeholder="Dev" className={inputCls} />
        </div>
      </div>

      {/* Designation */}
      <div>
        <label className={labelCls}>Designation</label>
        <input name="jobTitle" value={personal.jobTitle} onChange={handleChange} placeholder="Software Engineer" className={inputCls} />
      </div>

      {/* Address + City */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Address</label>
          <input name="address" value={personal.address} onChange={handleChange} placeholder="Duhabi-9, Sunsari" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>City / Province</label>
          <select name="province" value={personal.province} onChange={handleChange} className={inputCls}>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Email</label>
          <input name="email" type="email" value={personal.email} onChange={handleChange} placeholder="devvv026@gmail.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input name="phone" value={personal.phone} onChange={handleChange} placeholder="9762719660" className={inputCls} />
        </div>
      </div>

      {/* LinkedIn + GitHub */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>LinkedIn URL</label>
          <input name="linkedin" value={personal.linkedin} onChange={handleChange} placeholder="linkedin.com/in/username" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>GitHub / Website</label>
          <input name="github" value={personal.github || ''} onChange={handleChange} placeholder="github.com/username" className={inputCls} />
        </div>
      </div>

      {/* Summary */}
      <div>
        <label className={labelCls}>Summary</label>
        {/* Rich text toolbar */}
        <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border border-gray-300 border-b-0 rounded-t-md">
          {[
            { icon: Bold, title: 'Bold' },
            { icon: Italic, title: 'Italic' },
            { icon: Underline, title: 'Underline' },
            { icon: List, title: 'List' },
            { icon: Link, title: 'Link' },
          ].map(({ icon: Icon, title }) => (
            <button key={title} type="button" title={title}
              className="p-1.5 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors">
              <Icon size={13} />
            </button>
          ))}
        </div>
        <textarea
          name="summary"
          value={personal.summary}
          onChange={handleChange}
          rows={5}
          placeholder="Results-driven professional with a proven track record..."
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-b-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        />
      </div>

      {/* Add Social Link */}
      <button type="button" className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1 w-fit -mt-2">
        + Add Social Link
      </button>

      {/* Regional fields */}
      <div className="border-t border-gray-100 pt-5">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Nepal &amp; Gulf Details</p>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Citizenship Number</label>
            <input name="citizenshipNo" value={personal.citizenshipNo || ''} onChange={handleChange} placeholder="30-01-77-00000" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Expected Salary (NPR)</label>
            <input name="expectedSalaryNPR" type="number" value={personal.expectedSalaryNPR || ''} onChange={handleChange} placeholder="40000" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Date of Birth</label>
            <input name="dateOfBirth" type="date" value={personal.dateOfBirth || ''} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Nationality</label>
            <input name="nationality" value={personal.nationality || ''} onChange={handleChange} placeholder="Nepali" className={inputCls} />
          </div>
        </div>
      </div>

      {/* Japan fields */}
      {templateId === 't7' && (
        <div className="border border-red-100 bg-red-50 rounded-lg p-5">
          <p className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-4">Japan (Rirekisho) Fields</p>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Name Furigana</label>
              <input name="nameFurigana" value={personal.nameFurigana || ''} onChange={handleChange} placeholder="ふりがな" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Name Katakana</label>
              <input name="nameKana" value={personal.nameKana || ''} onChange={handleChange} placeholder="カタカナ" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Visa Type</label>
              <input name="visaType" value={personal.visaType || ''} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>JLPT Level</label>
              <select name="jlptLevel" value={personal.jlptLevel || ''} onChange={handleChange} className={inputCls}>
                {JLPT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Back + Continue */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button type="button"
          className="px-6 py-2.5 rounded-md border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button type="button" onClick={() => setActiveSection('education')}
          className="px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
          Continue to Education →
        </button>
      </div>
    </div>
  )
}
