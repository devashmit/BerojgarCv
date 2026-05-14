'use client'

import React, { useState } from 'react'
import { useCVStore } from '@/store/cvStore'
import { X, Plus } from 'lucide-react'

const inputCls = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"

export function CertificationsForm() {
  const { cvData, addCertification, updateCertification, removeCertification, setActiveSection } = useCVStore()
  const { certifications } = cvData
  const [newCert, setNewCert] = useState('')

  const handleAdd = () => {
    if (newCert.trim()) {
      addCertification(newCert.trim())
      setNewCert('')
    }
  }

  return (
    <div className="px-8 py-6 flex flex-col gap-4 pb-10">
      {certifications.map((cert, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={cert}
            onChange={e => updateCertification(index, e.target.value)}
            className={`${inputCls} flex-1`}
          />
          <button
            onClick={() => removeCertification(index)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
          >
            <X size={15} />
          </button>
        </div>
      ))}

      {/* Add new */}
      <div className="flex gap-2">
        <input
          value={newCert}
          onChange={e => setNewCert(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="e.g. AWS Certified Developer, Google Analytics..."
          className={`${inputCls} flex-1`}
        />
        <button
          onClick={handleAdd}
          disabled={!newCert.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <button onClick={() => setActiveSection('languages')} className="px-5 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">← Back</button>
        <button onClick={() => setActiveSection('references')} className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">Continue →</button>
      </div>
    </div>
  )
}
