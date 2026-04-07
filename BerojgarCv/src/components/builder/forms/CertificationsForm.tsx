'use client'

import React, { useState } from 'react'
import { useCVStore } from '@/store/cvStore'
import { GripVertical, X, Plus } from 'lucide-react'

export function CertificationsForm() {
  const { cvData, addCertification, updateCertification, removeCertification } = useCVStore()
  const { certifications } = cvData

  const [newCert, setNewCert] = useState('')

  const handleAdd = () => {
    if (newCert.trim()) {
      addCertification(newCert.trim())
      setNewCert('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="p-6 space-y-4 pb-24">
      {/* Existing Certs */}
      {certifications.map((cert, index) => (
        <div key={index} className="flex gap-2 isolate group relative">
          <div className="relative flex-1 group focus-within:z-10 bg-white">
            <input
               value={cert}
               onChange={e => updateCertification(index, e.target.value)}
               className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-md text-sm outline-none transition-all focus:ring-2 focus:ring-[rgba(192,57,43,0.15)] focus:border-transparent"
               placeholder="AWS Certified Developer – Associate"
            />
            <div className="absolute left-2 inset-y-0 flex items-center justify-center text-slate-300 cursor-grab z-10 w-4">
              <GripVertical size={14} />
            </div>
          </div>

          <button
            onClick={() => removeCertification(index)}
            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors self-center shrink-0"
            title="Remove Certification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      
      {/* Add New Cert row */}
      <div className="flex gap-2 isolate mt-4">
        <div className="relative flex-1">
          <input
             value={newCert}
             onChange={e => setNewCert(e.target.value)}
             onKeyDown={handleKeyDown}
             className="w-full pl-3 pr-3 py-2 border border-amber-200 bg-amber-50 rounded-md text-sm outline-none transition-all focus:ring-2 focus:ring-[rgba(192,57,43,0.15)] focus:border-transparent placeholder:text-amber-700/50"
             placeholder="Type a certification and press Enter..."
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!newCert.trim()}
          className="px-4 py-2 bg-amber-600 text-white font-semibold rounded-md text-sm hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-1.5"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

    </div>
  )
}
