'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { TagInput } from '@/components/ui/TagInput'

export function SkillsForm() {
  const { cvData, addSkill, removeSkill, setActiveSection } = useCVStore()
  const { technical, soft } = cvData.skills

  return (
    <div className="px-8 py-6 space-y-6 pb-10">

      {/* Technical Skills */}
      <div>
        <div className="mb-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Technical Skills</p>
          <p className="text-xs text-gray-400 mt-0.5">Languages, frameworks, tools. Press Enter to add.</p>
        </div>
        <TagInput
          tags={technical}
          onChange={(newTags) => {
            const added = newTags.find(t => !technical.includes(t))
            if (added) addSkill('technical', added)
            const removed = technical.find(t => !newTags.includes(t))
            if (removed) removeSkill('technical', removed)
          }}
          placeholder="e.g. React, Node.js, Docker..."
          className="bg-white border-gray-300"
        />
      </div>

      <div className="h-px bg-gray-100" />

      {/* Soft Skills */}
      <div>
        <div className="mb-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Soft Skills</p>
          <p className="text-xs text-gray-400 mt-0.5">Leadership, communication, teamwork. Press Enter to add.</p>
        </div>
        <TagInput
          tags={soft}
          onChange={(newTags) => {
            const added = newTags.find(t => !soft.includes(t))
            if (added) addSkill('soft', added)
            const removed = soft.find(t => !newTags.includes(t))
            if (removed) removeSkill('soft', removed)
          }}
          placeholder="e.g. Team Leadership, Agile..."
          className="bg-white border-gray-300"
        />
      </div>

      <div className="flex justify-between pt-3 border-t border-gray-100">
        <button onClick={() => setActiveSection('experience')} className="px-5 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">← Back</button>
        <button onClick={() => setActiveSection('languages')} className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">Continue →</button>
      </div>
    </div>
  )
}
