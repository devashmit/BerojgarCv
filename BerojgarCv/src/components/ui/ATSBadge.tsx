import React from 'react'

interface ATSBadgeProps {
  score: number;
  className?: string;
}

export function ATSBadge({ score, className = '' }: ATSBadgeProps) {
  let colorClass = ''
  
  if (score >= 85) {
    colorClass = 'bg-[#3D8A4A]/10 text-[#3D8A4A] border-[#3D8A4A]/30'
  } else if (score >= 60) {
    colorClass = 'bg-[#C47C1A]/10 text-[#C47C1A] border-[#C47C1A]/30'
  } else {
    colorClass = 'bg-[#B53A2A]/10 text-[#B53A2A] border-[#B53A2A]/30'
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center border rounded-md px-2.5 py-1 min-w-[56px] ${colorClass} ${className} font-mono tracking-wide`}>
      <span className="text-[10px] uppercase font-bold leading-none mb-0.5 opacity-80">ATS</span>
      <span className="text-sm font-bold leading-none">{score}</span>
    </div>
  )
}
