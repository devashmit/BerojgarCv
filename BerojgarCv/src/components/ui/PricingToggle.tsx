'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface PricingToggleProps {
  isAnnual: boolean
  onToggle: (val: boolean) => void
}

export function PricingToggle({ isAnnual, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center gap-6 mb-12">
      <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>
        Monthly
      </span>
      
      <button
        onClick={() => onToggle(!isAnnual)}
        className="w-16 h-8 bg-gray-800 rounded-full p-1 relative flex items-center"
      >
        <motion.div
          animate={{ x: isAnnual ? 32 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-6 h-6 bg-[var(--dhaka-amber)] rounded-full shadow-lg z-10"
        />
        <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
           <div className="w-1 h-1 rounded-full bg-gray-700" />
           <div className="w-1 h-1 rounded-full bg-gray-700" />
        </div>
      </button>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold transition-colors ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
          Annual
        </span>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20"
        >
          Save 30%
        </motion.span>
      </div>
    </div>
  )
}
