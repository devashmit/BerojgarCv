'use client'

import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { X, Plus } from 'lucide-react'

const inputCls = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
const labelCls = "block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1"

export function ReferencesForm() {
  const { cvData, addReference, updateReference, removeReference, toggleReferencesOnRequest, setActiveSection } = useCVStore()
  const { references, referencesOnRequest } = cvData

  return (
    <div className="px-8 py-6 flex flex-col gap-5 pb-10">

      {/* Toggle */}
      <div className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-md">
        <div>
          <p className="text-sm font-semibold text-gray-800">Available upon request</p>
          <p className="text-xs text-gray-400 mt-0.5">Show a standard phrase instead of listing contacts.</p>
        </div>
        <button
          onClick={toggleReferencesOnRequest}
          className="relative shrink-0"
          style={{ width: 40, height: 22 }}
        >
          <div
            className="w-full h-full rounded-full transition-colors"
            style={{ background: referencesOnRequest ? '#2563EB' : '#D1D5DB' }}
          />
          <span
            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
            style={{ transform: referencesOnRequest ? 'translateX(18px)' : 'translateX(0)' }}
          />
        </button>
      </div>

      {/* Reference cards */}
      <div className={`flex flex-col gap-4 transition-opacity ${referencesOnRequest ? 'opacity-40 pointer-events-none' : ''}`}>
        {references.map((ref) => (
          <div key={ref.id} className="relative border border-gray-200 rounded-md p-4 bg-white">
            <button
              onClick={() => removeReference(ref.id)}
              className="absolute right-2.5 top-2.5 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <X size={14} />
            </button>
            <div className="grid grid-cols-2 gap-3 pr-6">
              <div>
                <label className={labelCls}>Name</label>
                <input value={ref.name} onChange={e => updateReference(ref.id, 'name', e.target.value)} placeholder="Sita Khadka" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Title / Position</label>
                <input value={ref.title} onChange={e => updateReference(ref.id, 'title', e.target.value)} placeholder="Engineering Manager" className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Contact (Email or Phone)</label>
                <input value={ref.contact} onChange={e => updateReference(ref.id, 'contact', e.target.value)} placeholder="sita@example.com" className={inputCls} />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addReference}
          className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-md text-sm font-semibold text-gray-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={15} />
          Add Reference
        </button>
      </div>

      <div className="flex items-center justify-start pt-3 border-t border-gray-100">
        <button onClick={() => setActiveSection('certifications')} className="px-5 py-2 rounded-md border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">← Back</button>
      </div>
    </div>
  )
}
