'use client'

import { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function TagInput({ tags, onChange, placeholder = 'Type skill + Enter', className }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = inputValue.trim()
      if (val && !tags.includes(val)) {
        onChange([...tags, val])
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  const removeTag = (tag: string) => {
    onChange(tags.filter(t => t !== tag))
  }

  return (
    <div className={cn(
      "flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 transition-all",
      className
    )}>
      <AnimatePresence>
        {tags.map((tag) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-100 text-amber-900 rounded-full text-sm font-medium"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="p-0.5 hover:bg-amber-200/50 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] outline-none bg-transparent text-sm py-1"
      />
    </div>
  )
}
