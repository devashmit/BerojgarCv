import React, { useState } from 'react'
import { useCVStore } from '@/store/cvStore'
import { GripVertical, X, Plus, Sparkles, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

export function ExperienceForm() {
  const { cvData, templateId, addExperience, updateExperience, removeExperience, addBullet, updateBullet, removeBullet } = useCVStore()
  const { experience } = cvData
  const toast = useToast()

  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({})
  const [aiSuccess, setAiSuccess] = useState<Record<string, boolean>>({})
  const [aiError, setAiError] = useState<Record<string, boolean>>({})

  const handleImproveBullet = async (expId: string, bulletIndex: number, currentText: string, jobTitle: string) => {
    if (!currentText.trim()) return

    const key = `${expId}-${bulletIndex}`
    setAiLoading(prev => ({ ...prev, [key]: true }))
    setAiSuccess(prev => ({ ...prev, [key]: false }))
    setAiError(prev => ({ ...prev, [key]: false }))

    try {
      const res = await fetch('/api/ai/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: currentText,
          jobTitle: jobTitle,
          isJapanese: templateId === 't7'
        })
      })

      if (res.status === 429) {
        toast.error('Rate limit reached. Sign in for more AI improvements.')
        setAiError(prev => ({ ...prev, [key]: true }))
        return
      }

      if (!res.ok) throw new Error('AI failed')

      const data = await res.json()
      updateBullet(expId, bulletIndex, data.improved)
      
      setAiSuccess(prev => ({ ...prev, [key]: true }))
      toast.success('Bullet improved successfully')
      
      setTimeout(() => {
        setAiSuccess(prev => ({ ...prev, [key]: false }))
      }, 1500)

    } catch (err) {
      setAiError(prev => ({ ...prev, [key]: true }))
      toast.error('AI unavailable. Please try again.')
      
      setTimeout(() => {
        setAiError(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } finally {
      setAiLoading(prev => ({ ...prev, [key]: false }))
    }
  }

  return (
    <div className="p-6 space-y-6 pb-24">
      {experience.map((exp, index) => (
        <div key={exp.id} className="relative bg-slate-50 border border-slate-200 rounded-lg p-4 group">
          {/* Controls */}
          <div className="absolute left-2 top-4 text-slate-400 cursor-grab hover:text-slate-600">
            <GripVertical size={16} />
          </div>
          <button 
            onClick={() => removeExperience(exp.id)}
            className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <X size={16} />
          </button>

          <div className="pl-6 pt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Job Title</label>
                <input 
                  value={exp.title}
                  onChange={e => updateExperience(exp.id, 'title', e.target.value)}
                  placeholder="Software Engineer"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Company</label>
                <input 
                  value={exp.company}
                  onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Tech Corp Inc."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</label>
                <input 
                  value={exp.location}
                  onChange={e => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="Kathmandu"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <div className="space-y-1.5 w-full sm:flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                  <input 
                    value={exp.startDate}
                    onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm font-mono focus:border-amber-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5 w-full sm:flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                    End Date
                  </label>
                  <input 
                    value={exp.endDate}
                    onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="MM/YYYY"
                    disabled={exp.currentJob}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm font-mono focus:border-amber-500 outline-none transition-colors disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end">
                <label className="flex items-center gap-2 text-xs text-slate-600 font-medium cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={exp.currentJob}
                    onChange={e => {
                      updateExperience(exp.id, 'currentJob', e.target.checked)
                      if (e.target.checked) {
                        updateExperience(exp.id, 'endDate', 'Present')
                      } else if (exp.endDate === 'Present') {
                        updateExperience(exp.id, 'endDate', '') // Clear it out if unchecking
                      }
                    }}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  I currently work here
                </label>
            </div>

            {/* Bullets Sub-section */}
            <div className="mt-4 pt-4 border-t border-slate-200/60">
              <div className="flex items-center gap-2 mb-3">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0L8 4L4 8L0 4L4 0Z" fill="var(--dhaka-amber)"/>
                </svg>
                <h4 className="text-xs font-bold text-slate-700 tracking-wider uppercase">Experience Bullets</h4>
              </div>

              <div className="space-y-2">
                {exp.bullets.map((bullet, bIndex) => {
                  const key = `${exp.id}-${bIndex}`
                  const isLoading = aiLoading[key]
                  const isSuccess = aiSuccess[key]
                  const isError = aiError[key]
                  
                  return (
                    <div key={bIndex} className="flex gap-2 isolate group/bullet relative">
                      <div className="relative flex-1 group focus-within:z-10 bg-white">
                        <textarea
                           value={bullet}
                           onChange={e => updateBullet(exp.id, bIndex, e.target.value)}
                           className="w-full pl-8 pr-10 py-2 border border-slate-200 rounded-md text-sm outline-none resize-none transition-all leading-relaxed focus:ring-2 focus:ring-[rgba(192,57,43,0.15)] focus:border-transparent min-h-[40px] focus:min-h-[80px]"
                           placeholder="Describe your achievement..."
                           rows={1}
                        />
                        <div className="absolute left-2 inset-y-0 flex items-center justify-center text-slate-300 group-hover/bullet:text-slate-400 cursor-grab">
                          <GripVertical size={14} />
                        </div>
                        
                        {/* AI Improve Button Overlay */}
                        <div className="absolute right-2 bottom-2">
                          <button
                            onClick={() => handleImproveBullet(exp.id, bIndex, bullet, exp.title)}
                            disabled={isLoading || !bullet.trim()}
                            title="AI Rewrite"
                            className={`
                              flex items-center justify-center w-7 h-7 rounded-sm transition-all
                              ${isLoading ? 'bg-amber-50' : 
                                isSuccess ? 'bg-green-50' :
                                isError ? 'bg-red-50' :
                                bullet.trim() ? 'bg-amber-100 hover:bg-amber-200 hover:scale-105 shadow-sm' : 'bg-slate-100 opacity-50 cursor-not-allowed'}
                            `}
                          >
                            {isLoading ? <Loader2 size={14} className="text-amber-500 animate-spin" /> :
                             isSuccess ? <CheckCircle2 size={14} className="text-green-600" /> :
                             isError ? <XCircle size={14} className="text-red-500" /> :
                             <Sparkles size={14} className={bullet.trim() ? 'text-amber-600' : 'text-slate-400'} />}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeBullet(exp.id, bIndex)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors self-start shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )
                })}
                
                <button
                  onClick={() => addBullet(exp.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-2 py-1.5 rounded-md transition-colors w-max mt-1"
                >
                  <Plus size={14} />
                  Add Bullet
                </button>
              </div>
            </div>

          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 mt-4 border-2 border-dashed border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add Experience
      </button>
    </div>
  )
}
