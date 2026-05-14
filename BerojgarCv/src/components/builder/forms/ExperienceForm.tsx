'use client'

import React, { useState, useEffect } from 'react'
import { useCVStore } from '@/store/cvStore'
import { GripVertical, X, Plus, Sparkles, Loader2, CheckCircle2, XCircle, Briefcase } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

const inputCls = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
const labelCls = "block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1"

export function ExperienceForm() {
  const { cvData, templateId, addExperience, updateExperience, removeExperience, addBullet, updateBullet, removeBullet, setActiveSection } = useCVStore()
  const { experience } = cvData
  const toast = useToast()
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({})
  const [aiSuccess, setAiSuccess] = useState<Record<string, boolean>>({})
  const [aiError, setAiError] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/api/flags').then(r => r.json()).then(data => {
      setAiEnabled(data.ai_improvement_enabled ?? true)
    }).catch(() => {})
  }, [])

  const handleImproveBullet = async (expId: string, bulletIndex: number, currentText: string, jobTitle: string) => {
    if (!currentText.trim()) return
    const key = `${expId}-${bulletIndex}`
    setAiLoading(p => ({ ...p, [key]: true }))
    setAiSuccess(p => ({ ...p, [key]: false }))
    setAiError(p => ({ ...p, [key]: false }))
    try {
      const res = await fetch('/api/ai/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet: currentText, jobTitle, isJapanese: templateId === 't7' }),
      })
      if (res.status === 429) { toast.error('Rate limit reached.'); setAiError(p => ({ ...p, [key]: true })); return }
      if (!res.ok) throw new Error()
      const data = await res.json()
      updateBullet(expId, bulletIndex, data.improved)
      setAiSuccess(p => ({ ...p, [key]: true }))
      toast.success('Bullet improved!')
      setTimeout(() => setAiSuccess(p => ({ ...p, [key]: false })), 1500)
    } catch {
      setAiError(p => ({ ...p, [key]: true }))
      toast.error('AI unavailable. Try again.')
      setTimeout(() => setAiError(p => ({ ...p, [key]: false })), 2000)
    } finally {
      setAiLoading(p => ({ ...p, [key]: false }))
    }
  }

  return (
    <div className="px-8 py-6 space-y-5 pb-10">
      {experience.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
            <Briefcase size={22} className="text-indigo-400" />
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">No experience added yet</p>
          <p className="text-xs text-gray-400 mb-4">Add your work history, internships, or freelance work.</p>
        </div>
      )}

      {experience.map((exp) => (
        <div key={exp.id} className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="absolute left-2.5 top-4 text-gray-300 cursor-grab hover:text-gray-500">
            <GripVertical size={15} />
          </div>
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute right-2.5 top-2.5 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={15} />
          </button>

          <div className="pl-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Job Title</label>
                <input value={exp.title} onChange={e => updateExperience(exp.id, 'title', e.target.value)} placeholder="Software Engineer" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Company</label>
                <input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Tech Corp Inc." className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Location</label>
                <input value={exp.location} onChange={e => updateExperience(exp.id, 'location', e.target.value)} placeholder="Kathmandu" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Start Date</label>
                <input value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="01/2022" className={`${inputCls} font-mono`} />
              </div>
              <div>
                <label className={labelCls}>End Date</label>
                <input
                  value={exp.currentJob ? 'Present' : exp.endDate}
                  onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                  placeholder="12/2024"
                  disabled={exp.currentJob}
                  className={`${inputCls} font-mono disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer select-none w-fit">
              <input
                type="checkbox"
                checked={exp.currentJob}
                onChange={e => {
                  updateExperience(exp.id, 'currentJob', e.target.checked)
                  if (e.target.checked) updateExperience(exp.id, 'endDate', 'Present')
                  else if (exp.endDate === 'Present') updateExperience(exp.id, 'endDate', '')
                }}
                className="w-3.5 h-3.5 rounded accent-indigo-500 cursor-pointer"
              />
              Currently working here
            </label>

            {/* Bullets */}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Achievements / Bullets</p>
              <div className="space-y-2">
                {exp.bullets.map((bullet, bIndex) => {
                  const key = `${exp.id}-${bIndex}`
                  const isLoading = aiLoading[key]
                  const isSuccess = aiSuccess[key]
                  const isError = aiError[key]
                  return (
                    <div key={bIndex} className="flex gap-2">
                      <div className="relative flex-1">
                        <textarea
                          value={bullet}
                          onChange={e => updateBullet(exp.id, bIndex, e.target.value)}
                          placeholder="Describe your achievement with impact..."
                          rows={2}
                          className="w-full pl-3 pr-10 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none leading-relaxed"
                        />
                        {aiEnabled && (
                          <button
                            onClick={() => handleImproveBullet(exp.id, bIndex, bullet, exp.title)}
                            disabled={isLoading || !bullet.trim()}
                            title="AI Improve"
                            className={`absolute right-2 bottom-2 w-6 h-6 rounded flex items-center justify-center transition-all ${
                              isLoading ? 'bg-blue-50' :
                              isSuccess ? 'bg-green-50' :
                              isError ? 'bg-red-50' :
                              bullet.trim() ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100 opacity-40 cursor-not-allowed'
                            }`}
                          >
                            {isLoading ? <Loader2 size={12} className="text-indigo-500 animate-spin" /> :
                             isSuccess ? <CheckCircle2 size={12} className="text-green-600" /> :
                             isError ? <XCircle size={12} className="text-red-500" /> :
                             <Sparkles size={12} className={bullet.trim() ? 'text-blue-600' : 'text-gray-400'} />}
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => removeBullet(exp.id, bIndex)}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start mt-1 shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={() => addBullet(exp.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 rounded-lg transition-colors"
                >
                  <Plus size={13} /> Add Bullet
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-md text-sm font-semibold text-gray-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} />
        Add Experience
      </button>

      <div className="flex justify-between pt-3 border-t border-gray-100">
        <button onClick={() => setActiveSection('education')} className="px-5 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">← Back</button>
        <button onClick={() => setActiveSection('skills')} className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">Continue →</button>
      </div>
    </div>
  )
}
