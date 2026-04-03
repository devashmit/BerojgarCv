'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Announcement {
  id: string
  message: string
  color: string
  startsAt: string
  endsAt: string
  freeOnly: boolean
}

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  info:    { bg: 'rgba(61,138,74,0.12)',   text: '#3D8A4A', border: 'rgba(61,138,74,0.3)' },
  warning: { bg: 'rgba(196,124,26,0.12)',  text: '#C47C1A', border: 'rgba(196,124,26,0.3)' },
  error:   { bg: 'rgba(181,58,42,0.12)',   text: '#B53A2A', border: 'rgba(181,58,42,0.3)' },
}

export function AnnouncementBanner() {
  const [banners, setBanners] = useState<Announcement[]>([])

  useEffect(() => {
    const dismissed: string[] = JSON.parse(localStorage.getItem('dismissed_announcements') || '[]')
    const now = new Date()

    fetch('/api/announcements')
      .then(r => r.json())
      .then((data: Announcement[]) => {
        if (!Array.isArray(data)) return
        const active = data.filter(a =>
          !dismissed.includes(a.id) &&
          new Date(a.startsAt) <= now &&
          new Date(a.endsAt) >= now
        )
        setBanners(active)
      })
      .catch(() => {})
  }, [])

  function dismiss(id: string) {
    const dismissed: string[] = JSON.parse(localStorage.getItem('dismissed_announcements') || '[]')
    localStorage.setItem('dismissed_announcements', JSON.stringify([...dismissed, id]))
    setBanners(prev => prev.filter(b => b.id !== id))
  }

  if (banners.length === 0) return null

  return (
    <>
      {banners.map(banner => {
        const style = COLOR_MAP[banner.color] || COLOR_MAP.info
        return (
          <div
            key={banner.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px',
              background: style.bg,
              borderBottom: `1px solid ${style.border}`,
              fontSize: '13px',
              color: style.text,
              fontWeight: 500,
            }}
          >
            <span>{banner.message}</span>
            <button
              onClick={() => dismiss(banner.id)}
              style={{ color: style.text, opacity: 0.7, padding: '2px', marginLeft: '12px', flexShrink: 0 }}
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </>
  )
}
