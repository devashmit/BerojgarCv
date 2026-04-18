'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Loader2, Camera } from 'lucide-react'
import { useToast } from './Toast'
import Image from 'next/image'

interface PhotoUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
}

export function PhotoUpload({ value, onChange, onRemove }: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.')
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.')
      return
    }

    setIsUploading(true)
    
    // Process image locally via FileReader and Canvas
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new globalThis.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 400
        const MAX_HEIGHT = 500
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        const dataUrl = canvas.toDataURL(file.type, 0.8)
        onChange(dataUrl)
        setIsUploading(false)
        toast.success('Photo uploaded successfully.')
      }
      img.onerror = () => {
        setIsUploading(false)
        toast.error('Failed to read image.')
      }
      img.src = event.target?.result as string
    }
    reader.onerror = () => {
      setIsUploading(false)
      toast.error('Photo upload failed. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
        Photo <span className="text-slate-400 capitalize font-normal">(Optional)</span>
      </label>

      <div className="flex items-center gap-4">
        {/* Upload Box */}
        <div 
          onClick={value ? undefined : handleClick}
          className={`
            relative w-[60px] h-[80px] rounded border-2 border-dashed transition-all
            ${value ? 'border-transparent' : 'border-slate-200 hover:border-amber-400 cursor-pointer bg-slate-50'}
            flex flex-col items-center justify-center overflow-hidden
          `}
        >
          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-100 flex items-center justify-center"
              >
                <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
              </motion.div>
            ) : value ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full group"
              >
                <Image 
                  src={value} 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove()
                  }}
                  className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <Camera className="w-5 h-5 text-slate-400" />
                <span className="text-[8px] text-slate-400 font-bold uppercase">Upload</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Instructions */}
        {!value && !isUploading && (
          <div className="flex-1">
            <p className="text-[11px] text-slate-500 leading-tight">
              Drag and drop or click to upload. 
              <br />
              JPG or PNG, max 5MB.
            </p>
          </div>
        )}

        {value && (
          <button 
            onClick={handleClick}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Change Photo
          </button>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  )
}
