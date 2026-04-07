'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { TagInput } from '@/components/ui/TagInput'

export function SkillsForm() {
  const { cvData, addSkill, removeSkill } = useCVStore()
  const { technical, soft } = cvData.skills

  return (
    <div className="p-6 space-y-8 pb-24">
      {/* Technical Skills */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            Technical Skills
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Programming languages, frameworks, tools, and technical concepts.
          </p>
        </div>
        
        <TagInput 
          tags={technical}
          onChange={(newTags) => {
            // Find added
            const added = newTags.find(t => !technical.includes(t))
            if (added) addSkill('technical', added)
            // Find removed
            const removed = technical.find(t => !newTags.includes(t))
            if (removed) removeSkill('technical', removed)
          }}
          placeholder="e.g. React, Docker, Python + Enter"
          className="bg-slate-50 border-slate-200 py-3"
        />
      </div>

      <div className="h-[1px] bg-slate-100 w-full" />

      {/* Soft Skills */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            Soft Skills
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Interpersonal skills, leadership, communication, and work habits.
          </p>
        </div>
        
        <TagInput 
          tags={soft}
          onChange={(newTags) => {
            // Find added
            const added = newTags.find(t => !soft.includes(t))
            if (added) addSkill('soft', added)
            // Find removed
            const removed = soft.find(t => !newTags.includes(t))
            if (removed) removeSkill('soft', removed)
          }}
          placeholder="e.g. Team Leadership, Agile/Scrum + Enter"
          className="bg-slate-50 border-slate-200 py-3"
        />
      </div>
    </div>
  )
}
