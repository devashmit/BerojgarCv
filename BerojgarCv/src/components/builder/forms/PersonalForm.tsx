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
  const { cvData, updatePersonal } = useCVStore()
  const { personal } = cvData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updatePersonal(name as any, value)
  }

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Photo & Basic Info Row */}
      <div className="flex gap-8 items-start">
        <PhotoUpload 
          value={personal.photo}
          onChange={(url) => updatePersonal('photo', url)}
          onRemove={() => updatePersonal('photo', undefined)}
        />
        
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
              <input 
                name="fullName"
                value={personal.fullName}
                onChange={handleChange}
                placeholder="Arjun Sharma"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Job Title</label>
              <input 
                name="jobTitle"
                value={personal.jobTitle}
                onChange={handleChange}
                placeholder="Software Engineer"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <input 
                name="email"
                type="email"
                value={personal.email}
                onChange={handleChange}
                placeholder="arjun@example.com"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
              <input 
                name="phone"
                value={personal.phone}
                onChange={handleChange}
                placeholder="+977-9800000000"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address & Socials */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Location</h3>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Street Address</label>
            <input 
              name="address"
              value={personal.address}
              onChange={handleChange}
              placeholder="Baneshwor, Kathmandu"
              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Province</label>
            <select 
              name="province"
              value={personal.province}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors bg-white"
            >
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Social Links</h3>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LinkedIn URL</label>
            <input 
              name="linkedin"
              value={personal.linkedin}
              onChange={handleChange}
              placeholder="linkedin.com/in/arjun"
              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">GitHub or Website</label>
            <input 
              name="github"
              value={personal.github}
              onChange={handleChange}
              placeholder="github.com/arjun"
              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Professional Summary</label>
        <textarea 
          name="summary"
          value={personal.summary}
          onChange={handleChange}
          rows={4}
          placeholder="Briefly describe your career background and key achievements..."
          className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors resize-none"
        />
        <div className="flex justify-end">
          <span className={`text-[10px] font-mono ${personal.summary.length > 400 ? 'text-red-500' : 'text-slate-400'}`}>
            {personal.summary.length} / 400
          </span>
        </div>
      </div>

      {/* Advanced / Regional Fields Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
           <div className="h-[1px] flex-1 bg-slate-100"></div>
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Regional Details</span>
           <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
           <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date of Birth</label>
              <input 
                name="dateOfBirth"
                type="date"
                value={personal.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
           </div>
           <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nationality</label>
              <input 
                name="nationality"
                value={personal.nationality}
                onChange={handleChange}
                placeholder="Nepali"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
           </div>
           <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Visa Type <span className="text-[8px] lowercase font-normal">(Japan)</span></label>
              <input 
                name="visaType"
                value={personal.visaType}
                onChange={handleChange}
                placeholder="Engineer / Specialist"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
           </div>
        </div>

        {/* Japan Specific Name Row */}
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name Furigana <span className="text-[8px] lowercase font-normal">(Japan)</span></label>
              <input 
                name="nameFurigana"
                value={personal.nameFurigana}
                onChange={handleChange}
                placeholder="アジュアン シャルマ"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
              />
           </div>
           <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">JLPT Level <span className="text-[8px] lowercase font-normal">(Japan)</span></label>
              <select 
                name="jlptLevel"
                value={personal.jlptLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors bg-white"
              >
                {JLPT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
           </div>
        </div>
      </div>
    </div>
  )
}
