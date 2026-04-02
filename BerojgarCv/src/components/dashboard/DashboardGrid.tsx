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
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-amber-100">
           <div className="w-8 h-8 rotate-45 border-r-2 border-b-2 border-amber-400 opacity-60" />
           <div className="w-8 h-8 -rotate-135 border-r-2 border-b-2 border-amber-400 opacity-60 absolute" />
        </div>
        <h3 className="text-2xl font-bold font-fraunces text-white mb-2">
          Start Your First CV
        </h3>
        <p className="text-gray-400 max-w-sm mb-8">
          Join thousands of professionals in Nepal and build a certified resume in minutes.
        </p>
        <Link 
          href="/builder"
          className="flex items-center gap-2 px-8 py-3 bg-[var(--dhaka-crimson)] hover:bg-[var(--dhaka-crimson-hover)] text-white rounded-xl font-bold transition-all shadow-lg"
        >
          Build Free →
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
