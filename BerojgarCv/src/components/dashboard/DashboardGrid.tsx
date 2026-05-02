'use client'

import React, { useState } from 'react'
import { DashboardCard } from './DashboardCard'
import { useToast } from '../ui/Toast'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface DashboardGridProps {
  initialCvs: any[]
}

export function DashboardGrid({ initialCvs }: DashboardGridProps) {
  const [cvs, setCvs] = useState(initialCvs)
  const toast = useToast()

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/cv/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      
      setCvs(prev => prev.filter(cv => cv.id !== id))
      toast.success('CV deleted successfully.')
    } catch {
      toast.error('Failed to delete CV. Please try again.')
    }
  }

  const handleUpdateTitle = async (id: string, newTitle: string) => {
    try {
      const res = await fetch(`/api/cv/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      })
      if (!res.ok) throw new Error()
      
      setCvs(prev => prev.map(cv => cv.id === id ? { ...cv, title: newTitle } : cv))
      toast.success('Title updated.')
    } catch {
      toast.error('Failed to update title.')
      // No need to revert UI if it's already updated locally, 
      // but in a more robust app we'd handle optimistic updates.
    }
  }

  if (cvs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        {/* Illustration */}
        <div className="w-24 h-24 rounded-3xl bg-red-50 border border-red-100 flex items-center justify-center mb-6 shadow-sm">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="6" y="4" width="28" height="34" rx="3" fill="#FEE2E2" stroke="#C0392B" strokeWidth="1.5"/>
            <rect x="11" y="11" width="18" height="2" rx="1" fill="#C0392B" opacity="0.5"/>
            <rect x="11" y="16" width="14" height="2" rx="1" fill="#C0392B" opacity="0.3"/>
            <rect x="11" y="21" width="16" height="2" rx="1" fill="#C0392B" opacity="0.3"/>
            <rect x="11" y="26" width="10" height="2" rx="1" fill="#C0392B" opacity="0.3"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Create your first CV
        </h3>
        <p className="text-gray-500 max-w-xs mb-8 text-sm leading-relaxed">
          Choose from 7 professional templates and build a job-ready resume in minutes.
        </p>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          style={{ background: 'linear-gradient(135deg, #C0392B 0%, #922B21 100%)' }}
        >
          <Plus size={16} />
          Build Free
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {/* New CV card */}
      <Link
        href="/builder"
        className="group flex flex-col items-center justify-center h-[260px] rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#C0392B] hover:bg-red-50/30 transition-all duration-200 cursor-pointer"
      >
        <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-red-100 flex items-center justify-center mb-3 transition-colors">
          <Plus size={22} className="text-gray-400 group-hover:text-[#C0392B] transition-colors" />
        </div>
        <p className="text-sm font-bold text-gray-400 group-hover:text-[#C0392B] transition-colors">New CV</p>
      </Link>

      {cvs.map(cv => (
        <DashboardCard
          key={cv.id}
          cv={cv}
          onDelete={handleDelete}
          onUpdateTitle={handleUpdateTitle}
        />
      ))}
    </div>
  )
}
