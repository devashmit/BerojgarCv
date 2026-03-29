import React from 'react'
import { useCVStore } from '@/store/cvStore'
import { GripVertical, X, Plus } from 'lucide-react'

export function ReferencesForm() {
  const { cvData, addReference, updateReference, removeReference, toggleReferencesOnRequest } = useCVStore()
  const { references, referencesOnRequest } = cvData

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* On Request Toggle */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Available upon request</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Hide detailed references and show a standard phrase instead.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={referencesOnRequest}
            onChange={toggleReferencesOnRequest}
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
        </label>
      </div>

      <div className={`space-y-4 transition-opacity duration-300 ${referencesOnRequest ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        {references.map((ref, index) => (
          <div key={ref.id} className="relative bg-slate-50 border border-slate-200 rounded-lg p-4 group">
            <div className="absolute left-2 top-4 text-slate-400 cursor-grab hover:text-slate-600">
              <GripVertical size={16} />
            </div>
            <button 
              onClick={() => removeReference(ref.id)}
              className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <X size={16} />
            </button>

            <div className="pl-6 pt-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</label>
                  <input 
                    value={ref.name}
                    onChange={e => updateReference(ref.id, 'name', e.target.value)}
                    placeholder="Sita Khadka"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title / Position</label>
                  <input 
                    value={ref.title}
                    onChange={e => updateReference(ref.id, 'title', e.target.value)}
                    placeholder="Engineering Manager"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contact Info (Email or Phone)</label>
                <input 
                  value={ref.contact}
                  onChange={e => updateReference(ref.id, 'contact', e.target.value)}
                  placeholder="sita@example.com, +977-9800000000"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addReference}
          className="w-full py-3 mt-4 border-2 border-dashed border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add Reference
        </button>
      </div>
    </div>
  )
}
