'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Lock, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { DhakaTexture, DiamondMark } from '@/components/dhaka'
import { AuthGateModal } from '@/components/ui/AuthGateModal'
import { useToast } from '@/components/ui/Toast'

// --- LOCAL ATS CALCULATOR ---
const ACTION_VERBS = [
  'Led', 'Built', 'Developed', 'Designed', 'Managed', 'Created',
  'Increased', 'Reduced', 'Improved', 'Implemented', 'Launched', 'Delivered',
  'Architected', 'Mentored', 'Optimised', 'Spearheaded', 'Streamlined', 'Negotiated'
]

function calcDemoATS(name: string, summary: string, bullet: string, template: string): number {
  let score = 30
  if (name.trim().length > 2) score += 15
  const words = summary.trim().split(/\s+/).filter(Boolean).length
  if (words >= 20) score += 15
  else if (words >= 10) score += 8
  
  if (ACTION_VERBS.some(v => bullet.trim().startsWith(v))) score += 20
  if (template === 'ats') score += 12
  
  return Math.min(score, 98)
}

// --- PREVIEW COMPONENTS ---

function ATSPreview({ name, jobTitle, summary, bullet }: { name: string, jobTitle: string, summary: string, bullet: string }) {
  return (
    <div style={{ color: '#000', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase' }}>{name || 'YOUR NAME'}</div>
        <div style={{ fontSize: 9, marginTop: 4 }}>
          {jobTitle || 'Job Title'} | email@example.com | +977-9800000000 | linkedin.com/in/profile
        </div>
      </div>

      <div style={{ borderTop: '1.5px solid #000', paddingTop: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Summary</div>
        <div style={{ fontSize: 9, lineHeight: 1.5 }}>
          {summary || 'Professional summary goes here...'}
        </div>
      </div>

      <div style={{ borderTop: '1.5px solid #000', paddingTop: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Experience</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontWeight: 700 }}>
          <span>{jobTitle || 'Job Title'}</span>
          <span>Jan 2022 - Present</span>
        </div>
        <div style={{ fontSize: 9, fontStyle: 'italic', marginBottom: 4 }}>Example Company Ltd., Kathmandu</div>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 9, lineHeight: 1.5 }}>
          <li>{bullet || 'Experience bullet point goes here...'}</li>
        </ul>
      </div>

      <div style={{ borderTop: '1.5px solid #000', paddingTop: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Skills</div>
        <div style={{ fontSize: 9 }}>
          React | Node.js | TypeScript | PostgreSQL | AWS | Docker | System Architecture
        </div>
      </div>
    </div>
  )
}

function NPPreview({ name, jobTitle, summary, bullet }: { name: string, jobTitle: string, summary: string, bullet: string }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif' }}>
      <div style={{ background: '#C0392B', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '-24px -24px 16px', color: '#FFF' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 800 }}>{name || 'YOUR NAME'}</div>
            <div style={{ fontSize: 9, color: '#F1C40F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{jobTitle || 'Job Title'}</div>
          </div>
          <div style={{ fontSize: 8, marginTop: 6, opacity: 0.9 }}>
            email@example.com · +977-9800000000 · Kathmandu, Nepal
          </div>
        </div>
        <div style={{ width: 44, height: 54, border: '1.5px solid #F1C40F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#F1C40F', background: 'rgba(0,0,0,0.2)' }}>
          Photo
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <div style={{ width: 6, height: 6, background: '#F1C40F', transform: 'rotate(45deg)' }} />
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#111' }}>Professional Summary</div>
        </div>
        <div style={{ height: 1.5, background: 'linear-gradient(90deg, #C0392B, transparent)', marginBottom: 6 }} />
        <div style={{ fontSize: 9, lineHeight: 1.6, color: '#333' }}>
          {summary || 'Professional summary goes here...'}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <div style={{ width: 6, height: 6, background: '#F1C40F', transform: 'rotate(45deg)' }} />
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#111' }}>Work Experience</div>
        </div>
        <div style={{ height: 1.5, background: 'linear-gradient(90deg, #C0392B, transparent)', marginBottom: 6 }} />
        
        <div style={{ fontSize: 10, fontWeight: 700, color: '#111' }}>{jobTitle || 'Job Title'}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#666', marginBottom: 6 }}>
          <span>Example Company Ltd.</span>
          <span>Jan 2022 - Present</span>
        </div>
        <div style={{ display: 'flex', gap: 6, fontSize: 9, color: '#333', lineHeight: 1.5 }}>
          <span style={{ color: '#C0392B', fontWeight: 'bold' }}>›</span>
          <span>{bullet || 'Experience bullet point goes here...'}</span>
        </div>
      </div>
    </div>
  )
}

function JPPreview({ name, jobTitle, bullet }: { name: string, jobTitle: string, bullet: string }) {
  return (
    <div style={{ fontFamily: '"Noto Serif JP", serif', color: '#111' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #111', paddingBottom: 4, marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.5em' }}>履歴書</div>
        <div style={{ fontSize: 8 }}>令和7年3月21日現在</div>
      </div>

      <div style={{ display: 'flex', border: '0.5px solid #999', marginBottom: 16 }}>
        <div style={{ flex: 1, padding: 8, borderRight: '0.5px solid #999' }}>
          <div style={{ fontSize: 7, color: '#555', marginBottom: 2 }}>ふりがな</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{name || '名前'}</div>
        </div>
        <div style={{ width: 64, height: 84, borderLeft: '1px solid #DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#999', background: '#FAFAFA' }}>
          写真
        </div>
      </div>

      <div style={{ border: '0.5px solid #999' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 30px 1fr', background: '#DC143C', color: '#FFF', fontSize: 9, textAlign: 'center', borderBottom: '0.5px solid #999' }}>
          <div style={{ padding: '4px 0', borderRight: '0.5px solid #FF99AA' }}>年</div>
          <div style={{ padding: '4px 0', borderRight: '0.5px solid #FF99AA' }}>月</div>
          <div style={{ padding: '4px 0' }}>学歴・職歴</div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '40px 30px 1fr', fontSize: 9, borderBottom: '0.5px solid #999', textAlign: 'center' }}>
          <div style={{ padding: '6px 0', borderRight: '0.5px solid #999' }}>2022</div>
          <div style={{ padding: '6px 0', borderRight: '0.5px solid #999' }}>1</div>
          <div style={{ padding: '6px 8px', textAlign: 'left' }}>
            {jobTitle || '役職'} として入社
            <div style={{ marginTop: 4, fontSize: 8, color: '#444' }}>{bullet || '職務内容...'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LiveBuilderDemo() {
  const [name, setName] = useState('Arjun Sharma')
  const [jobTitle, setJobTitle] = useState('Software Engineer')
  const [summary, setSummary] = useState('Results-driven engineer with 3+ years building scalable fintech systems serving 50,000+ daily users.')
  const [bullet, setBullet] = useState('Architected REST APIs serving 50k daily users at 99.9% uptime')
  const [template, setTemplate] = useState<'ats' | 'np' | 'jp'>('ats')
  const [market, setMarket] = useState<'np' | 'global' | 'jp'>('global')
  const [aiState, setAiState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [atsScore, setAtsScore] = useState(72)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const toast = useToast()

  // Recalculate ATS on every input change
  useEffect(() => {
    setAtsScore(calcDemoATS(name, summary, bullet, template))
  }, [name, summary, bullet, template])

  const handleMarketClick = (selectedMarket: 'np' | 'global' | 'jp') => {
    setMarket(selectedMarket)
    if (selectedMarket === 'np') setTemplate('np')
    if (selectedMarket === 'global') setTemplate('ats')
    if (selectedMarket === 'jp') setTemplate('jp')
  }

  const handleAIImprove = async () => {
    setAiState('loading')
    try {
      const res = await fetch('/api/ai/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet, jobTitle, isJapanese: template === 'jp' }),
      })
      if (!res.ok) throw new Error()
      const { improved } = await res.json()
      setBullet(improved)
      setAiState('success')
      toast.success('Bullet improved! Sign in to save your full CV.')
      setTimeout(() => setAiState('idle'), 1500)
    } catch {
      setAiState('error')
      toast.error('AI unavailable. Please try again.')
      setTimeout(() => setAiState('idle'), 2000)
    }
  }

  const atsColor = atsScore >= 85 ? '#3D8A4A' : atsScore >= 60 ? '#C47C1A' : '#B53A2A'
  const atsBg = atsScore >= 85 ? 'rgba(61,138,74,0.15)' : atsScore >= 60 ? 'rgba(196,124,26,0.15)' : 'rgba(181,58,42,0.15)'
  const atsBorder = atsScore >= 85 ? 'rgba(61,138,74,0.35)' : atsScore >= 60 ? 'rgba(196,124,26,0.35)' : 'rgba(181,58,42,0.35)'

  const MARKETS = [
    {
      id: 'np',
      topBarGradient: 'linear-gradient(90deg, #C0392B, #E8A020)',
      flagEmoji: '🇳🇵',
      flagBg: 'rgba(192,57,43,0.12)',
      badgeText: '🇳🇵 NP',
      badgeColor: '#E8A020',
      badgeBg: 'rgba(192,57,43,0.15)',
      badgeBorder: 'rgba(192,57,43,0.30)',
      title: 'Nepal & Gulf',
      subtitle: 'Visual formats for local HR and Gulf agencies',
      accentColor: '#E8A020',
      bullets: ['Strong visual headers', 'Photo-optional block', 'Multi-column layout']
    },
    {
      id: 'global',
      topBarGradient: 'linear-gradient(90deg, #1A3A5C, #378ADD)',
      flagEmoji: '🌐',
      flagBg: 'rgba(26,58,92,0.20)',
      badgeText: '🌐 ATS',
      badgeColor: '#378ADD',
      badgeBg: 'rgba(26,58,92,0.20)',
      badgeBorder: 'rgba(55,138,221,0.25)',
      title: 'Remote & Global',
      subtitle: 'ATS-optimised for international roles',
      accentColor: '#378ADD',
      bullets: ['Zero tables policy', 'AI keyword hierarchy', 'Single-column clean']
    },
    {
      id: 'jp',
      topBarGradient: 'linear-gradient(90deg, #DC143C, #8B0000)',
      flagEmoji: '🇯🇵',
      flagBg: 'rgba(220,20,60,0.10)',
      badgeText: '🇯🇵 JP',
      badgeColor: '#DC143C',
      badgeBg: 'rgba(220,20,60,0.12)',
      badgeBorder: 'rgba(220,20,60,0.30)',
      title: 'Japan 履歴書',
      subtitle: 'JIS S 5504 standard for Japanese corporate hiring',
      accentColor: '#DC143C',
      bullets: ['0.5px JIS grid', 'Furigana support', 'Exact kanji format']
    }
  ]

  return (
    <section style={{
      background: 'var(--ground-deep)',
      padding: '96px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <DhakaTexture opacity={0.03} />
      
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        {/* SECTION LABEL + HEADING */}
        <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'center', marginBottom:16 }}>
          <div style={{ height:1, width:36, background:'linear-gradient(90deg, transparent, var(--dhaka-gold))' }} />
          <DiamondMark size={8} color="var(--dhaka-amber)" />
          <span style={{ fontFamily:'var(--font-jakarta)', fontWeight:700, fontSize:10,
            color:'var(--dhaka-amber)', letterSpacing:'0.22em', textTransform:'uppercase' }}>
            Try It Now — No Sign-In Required
          </span>
          <DiamondMark size={8} color="var(--dhaka-amber)" />
          <div style={{ height:1, width:36, background:'linear-gradient(90deg, var(--dhaka-gold), transparent)' }} />
        </div>

        <h2 style={{ fontFamily:'var(--font-fraunces)', fontWeight:900,
          fontSize:'clamp(32px, 5vw, 52px)', color:'var(--text-bright)',
          textAlign:'center', margin:'0 0 6px', lineHeight:1.1 }}>
          See Your CV{' '}
          <em style={{ color:'var(--dhaka-amber)', fontStyle:'italic' }}>Come Alive.</em>
        </h2>

        <p style={{ fontFamily:'var(--font-jakarta)', fontWeight:300, fontSize:15,
          color:'var(--text-muted)', textAlign:'center', lineHeight:1.7,
          maxWidth:480, margin:'16px auto 40px' }}>
          Type below. Your CV updates in real time. Switch markets to see the right format.
        </p>

        {/* MARKET CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {MARKETS.map((card) => {
            const isActive = market === card.id
            return (
              <div 
                key={card.id}
                onClick={() => handleMarketClick(card.id as 'np' | 'global' | 'jp')}
                style={{
                  background: isActive ? 'var(--ground-lift)' : 'var(--ground-mid)',
                  border: isActive ? '1px solid var(--dhaka-crimson)' : '1px solid var(--ground-rim)',
                  borderRadius: 12,
                  padding: 20,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 200ms ease, background 200ms ease, box-shadow 200ms ease',
                  boxShadow: isActive
                    ? '0 0 0 1px rgba(192,57,43,0.20), 0 0 24px rgba(192,57,43,0.10)'
                    : 'none',
                }}
              >
                <div style={{ height:3, borderRadius:2, marginBottom:16, background: card.topBarGradient }} />

                <span style={{ position:'absolute', top:14, right:14, fontSize:9,
                  fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase',
                  padding:'3px 8px', borderRadius:999,
                  background: card.badgeBg, border: `1px solid ${card.badgeBorder}`,
                  color: card.badgeColor }}>
                  {card.badgeText}
                </span>

                <div style={{ width:36, height:36, borderRadius:8, marginBottom:12,
                  background: card.flagBg, display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:20 }}>
                  {card.flagEmoji}
                </div>

                <div style={{ fontFamily:'var(--font-jakarta)', fontWeight:700,
                  fontSize:15, color:'var(--text-bright)', margin:'0 0 4px' }}>
                  {card.title}
                </div>

                <div style={{ fontFamily:'var(--font-jakarta)', fontWeight:400,
                  fontSize:11, color:'var(--text-muted)', margin:'0 0 14px', lineHeight:1.5 }}>
                  {card.subtitle}
                </div>

                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex',
                  flexDirection:'column', gap:6 }}>
                  {card.bullets.map((b, i) => (
                    <li key={i} style={{ fontFamily:'var(--font-jakarta)', fontSize:11,
                      color: i === 0 ? card.accentColor : 'var(--text-body)',
                      display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{ width:5, height:5, background:'currentColor',
                        transform:'rotate(45deg)', flexShrink:0, opacity: i === 0 ? 1 : 0.6 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* TWO-COLUMN EDITOR LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6 items-start">
          
          {/* LEFT COLUMN — Form Panel */}
          <div style={{
            background: 'var(--ground-ink)',
            border: '1px solid var(--ground-rim)',
            borderRadius: 14,
            overflow: 'hidden',
          }}>
            <div style={{
              background: 'var(--ground-mid)',
              borderBottom: '1px solid var(--ground-rim)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily:'var(--font-jakarta)', fontWeight:700,
                fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase',
                color:'var(--text-muted)' }}>
                Your Details
              </span>
              <div style={{
                background: atsBg, border: `1px solid ${atsBorder}`, color: atsColor,
                padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}>
                ATS SCORE: {atsScore}
              </div>
            </div>

            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>FULL NAME</label>
                <input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Arjun Sharma" 
                  style={{ background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: 'var(--r-sm)', color: 'var(--text-bright)', fontFamily: 'var(--font-jakarta)', fontSize: 13, padding: '9px 12px', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 150ms ease, box-shadow 150ms ease' }} 
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,135,12,0.60)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,135,12,0.10)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--ground-rim)'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>JOB TITLE</label>
                <input 
                  value={jobTitle} 
                  onChange={e => setJobTitle(e.target.value)} 
                  placeholder="Software Engineer" 
                  style={{ background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: 'var(--r-sm)', color: 'var(--text-bright)', fontFamily: 'var(--font-jakarta)', fontSize: 13, padding: '9px 12px', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 150ms ease, box-shadow 150ms ease' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,135,12,0.60)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,135,12,0.10)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--ground-rim)'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>PROFESSIONAL SUMMARY</label>
                <textarea 
                  rows={4} 
                  value={summary} 
                  onChange={e => setSummary(e.target.value)}
                  placeholder="Write your professional summary..." 
                  style={{ background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: 'var(--r-sm)', color: 'var(--text-bright)', fontFamily: 'var(--font-jakarta)', fontSize: 13, padding: '9px 12px', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 150ms ease, box-shadow 150ms ease', resize: 'none' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,135,12,0.60)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,135,12,0.10)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--ground-rim)'; e.currentTarget.style.boxShadow = 'none' }}
                />
                <span style={{ fontFamily:'var(--font-mono)', fontSize:10, textAlign:'right', display:'block',
                  marginTop:4,
                  color: summary.length > 200 ? 'var(--error)'
                       : summary.length > 180 ? 'var(--dhaka-amber)'
                       : 'var(--text-ghost)' }}>
                  {summary.length} / 200
                </span>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:8, margin:'4px 0' }}>
                <div style={{ flex:1, height:1, background:'var(--ground-rim)' }} />
                <span style={{ fontFamily:'var(--font-jakarta)', fontWeight:700, fontSize:9,
                  letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-ghost)' }}>
                  Experience Bullet
                </span>
                <div style={{ flex:1, height:1, background:'var(--ground-rim)' }} />
              </div>

              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <input style={{ flex:1, background: 'var(--ground-mid)', border: '1px solid var(--ground-rim)', borderRadius: 'var(--r-sm)', color: 'var(--text-bright)', fontFamily: 'var(--font-jakarta)', fontSize: 13, padding: '9px 12px', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 150ms ease, box-shadow 150ms ease' }} value={bullet}
                  onChange={e => setBullet(e.target.value)}
                  placeholder="Led a team to deliver..." 
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,135,12,0.60)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,135,12,0.10)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--ground-rim)'; e.currentTarget.style.boxShadow = 'none' }}
                />

                <button onClick={handleAIImprove} disabled={aiState === 'loading'}
                  style={{
                    width:32, height:32, flexShrink:0, borderRadius:6,
                    background: 'rgba(192,57,43,0.12)',
                    border: '1px solid rgba(192,57,43,0.25)',
                    cursor: aiState === 'loading' ? 'not-allowed' : 'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition: 'background 150ms ease',
                  }}>
                  {aiState === 'idle'    && <span style={{ color:'var(--dhaka-amber)', fontSize:13 }}>✦</span>}
                  {aiState === 'loading' && <Loader2 size={13} style={{ color:'var(--text-muted)', animation:'spin 0.8s linear infinite' }} />}
                  {aiState === 'success' && <CheckCircle2 size={13} style={{ color:'#3D8A4A' }} />}
                  {aiState === 'error'   && <XCircle size={13} style={{ color:'var(--error)' }} />}
                </button>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>TEMPLATE STYLE</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {[
                    { id:'np',  label:'🇳🇵 Nepal Photo' },
                    { id:'ats', label:'ATS Clean'      },
                    { id:'jp',  label:'🇯🇵 Rirekisho'  },
                  ].map(t => (
                    <button key={t.id}
                      onClick={() => setTemplate(t.id as typeof template)}
                      style={{
                        fontFamily:'var(--font-jakarta)', fontWeight:600, fontSize:11,
                        padding:'4px 12px', borderRadius:999, cursor:'pointer',
                        border: template === t.id ? 'none' : '1px solid var(--ground-rim)',
                        background: template === t.id ? 'var(--dhaka-crimson)' : 'transparent',
                        color: template === t.id ? 'var(--text-bright)' : 'var(--text-muted)',
                        transition: 'all 150ms ease',
                      }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ATS SCORE BOX */}
              <div style={{
                display:'flex', alignItems:'center', gap:16,
                background:'var(--ground-mid)', borderRadius:10,
                padding:'14px 16px', border:'1px solid var(--ground-rim)',
                marginTop: 6
              }}>
                <svg width={64} height={64} viewBox="0 0 64 64" style={{ flexShrink:0 }}>
                  <circle cx={32} cy={32} r={26} fill="none"
                    stroke="var(--ground-lift)" strokeWidth={5} />
                  <motion.circle
                    cx={32} cy={32} r={26} fill="none"
                    stroke={atsColor}
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray={163.4}
                    animate={{ strokeDashoffset: 163.4 * (1 - atsScore / 100) }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    transform="rotate(-90 32 32)"
                  />
                  <text x={32} y={37} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fontWeight={500}
                    fill={atsColor}>
                    {atsScore}%
                  </text>
                </svg>

                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                  {[
                    { label:'Name & email filled',        met: name.trim().length > 2 },
                    { label:'Summary 20+ words',          met: summary.split(/\s+/).filter(Boolean).length >= 20 },
                    { label:'Bullet starts with verb',    met: ACTION_VERBS.some(v => bullet.trim().startsWith(v)) },
                  ].map(req => (
                    <div key={req.label} style={{
                      display:'flex', alignItems:'center', gap:8,
                      fontFamily:'var(--font-jakarta)', fontSize:11,
                      color: req.met ? '#3D8A4A' : 'var(--text-muted)',
                    }}>
                      <div style={{
                        width:8, height:8, borderRadius:'50%', flexShrink:0,
                        background: req.met ? '#3D8A4A' : 'transparent',
                        border: `1.5px solid ${req.met ? '#3D8A4A' : 'var(--text-muted)'}`,
                      }} />
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN — Live Preview Panel */}
          <div style={{
            background: '#161616',
            borderRadius: 14,
            border: '1px solid #2A2A2A',
            padding: 20,
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
          }} className="md:min-h-[520px]">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontFamily:'var(--font-jakarta)', fontWeight:700, fontSize:10,
                letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-ghost)' }}>
                Live Preview
              </span>
              <div style={{ display:'flex', alignItems:'center', gap:5,
                fontFamily:'var(--font-jakarta)', fontSize:10, fontWeight:600,
                color:'#3D8A4A', letterSpacing:'0.08em' }}>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes pulseAuth {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.35; }
                  }
                `}} />
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#3D8A4A',
                  animation:'pulseAuth 1.8s ease-in-out infinite' }} />
                LIVE
              </div>
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: 4,
              flex: 1,
              padding: 24,
              boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)',
              overflow: 'hidden',
              minHeight: 440,
            }}>
              {template === 'ats' && <ATSPreview name={name} jobTitle={jobTitle} summary={summary} bullet={bullet} />}
              {template === 'np'  && <NPPreview  name={name} jobTitle={jobTitle} summary={summary} bullet={bullet} />}
              {template === 'jp'  && <JPPreview  name={name} jobTitle={jobTitle} bullet={bullet} />}
            </div>
          </div>
        </div>

        {/* LOCK STRIP */}
        <div style={{
          background: 'rgba(192,57,43,0.08)',
          border: '1px solid rgba(192,57,43,0.20)',
          borderRadius: 10,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
          gap: 12,
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontFamily:'var(--font-jakarta)', fontWeight:600,
              fontSize:13, color:'var(--text-bright)' }}>
              Want all 7 templates, full CV sections, and PDF export?
            </div>
            <div style={{ fontFamily:'var(--font-jakarta)', fontWeight:300,
              fontSize:11, color:'var(--text-muted)', marginTop:3 }}>
              Free forever · No credit card · Photo always optional
            </div>
          </div>
          <button onClick={() => setAuthModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, var(--dhaka-crimson) 0%, var(--dhaka-deep) 100%)',
              border: 'none', borderRadius:'var(--r-md)', padding:'8px 18px',
              fontFamily:'var(--font-jakarta)', fontWeight:700, fontSize:12,
              color:'var(--text-bright)', cursor:'pointer', whiteSpace:'nowrap',
              flexShrink:0, boxShadow:'0 4px 16px rgba(192,57,43,0.30)',
            }}>
            Create Free Account →
          </button>
        </div>

      </div>

      <AuthGateModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </section>
  )
}
