'use client'

import { DhakaBorder, DhakaTexture } from '@/components/dhaka'
import { Check, Camera, CameraOff, Globe, Sparkles, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export function WhoIsItFor() {
  return (
    <section className="py-32 bg-[var(--ground-ink)] relative overflow-hidden" id="who-is-it-for">
      <DhakaTexture opacity={0.05} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-fraunces text-[var(--text-bright)] mb-6">
              Tailored for the <span className="text-[var(--dhaka-amber)] italic">Global</span> Nepali
            </h2>
            <p className="text-lg text-[var(--text-body)] font-jakarta font-light leading-relaxed">
              We understand that different markets have different rules. 
              Our engine adapts your data to meet <span className="text-[var(--dhaka-gold)] font-medium">local expectations</span> anywhere in the world.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Nepal & Gulf Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[var(--ground-mid)] bg-opacity-40 backdrop-blur-xl rounded-3xl shadow-[var(--shadow-card)] border border-[var(--ground-rim)] flex flex-col relative overflow-hidden group hover:border-[var(--dhaka-amber)] transition-all duration-500"
          >
            <DhakaBorder height={6} className="absolute top-0 w-full left-0 opacity-40" />
            <div className="p-8 pt-12 flex flex-col flex-1">
              <div className="w-12 h-12 rounded-2xl bg-[var(--ground-ink)] border border-[var(--ground-rim)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <MapPin size={24} className="text-[var(--dhaka-amber)]" />
              </div>
              <h3 className="text-2xl font-bold font-fraunces text-[var(--text-bright)] mb-3">Nepal & Gulf</h3>
              <p className="text-[var(--text-muted)] text-sm mb-8 font-jakarta leading-relaxed">Traditional visual formats preferred by local HR and regional agencies.</p>
              
              <ul className="space-y-5 mb-10 flex-1">
                {[
                  "Strong visual headers & borders",
                  "Emphasis on personal details",
                  "Compact multi-column layouts"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-sm text-[var(--text-body)] font-jakarta">
                    <Check size={18} className="text-[var(--dhaka-amber)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-2 bg-[var(--dhaka-amber)] bg-opacity-10 text-[var(--dhaka-amber)] font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl w-fit border border-[var(--dhaka-amber)] border-opacity-20">
                <Camera size={14} /> Photo Optional
              </div>
            </div>
          </motion.div>

          {/* International ATS Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-[var(--ground-mid)] bg-opacity-60 backdrop-blur-2xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-[var(--ground-rim)] flex flex-col relative overflow-hidden group hover:border-[var(--success)] transition-all duration-500 scale-105 z-20"
          >
            <div className="absolute top-0 w-full left-0 h-1.5 bg-[var(--success)] opacity-60" />
            <div className="p-8 pt-12 flex flex-col flex-1">
              <div className="w-12 h-12 rounded-2xl bg-[var(--ground-ink)] border border-[var(--ground-rim)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Globe size={24} className="text-[var(--success)]" />
              </div>
              <h3 className="text-2xl font-bold font-fraunces text-[var(--text-bright)] mb-3">Remote & Global</h3>
              <p className="text-[var(--text-muted)] text-sm mb-8 font-jakarta leading-relaxed">Machine-readable formats designed to rank #1 in international ATS bots.</p>
              
              <ul className="space-y-5 mb-10 flex-1">
                {[
                  "Zero tables, zero graphics",
                  "AI-optimized keyword hierarchy",
                  "Single-column standard parsing"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-sm text-[var(--text-body)] font-jakarta">
                    <Check size={18} className="text-[var(--success)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-2 bg-[var(--success)] bg-opacity-10 text-[var(--success)] font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl w-fit border border-[var(--success)] border-opacity-20">
                <CameraOff size={14} /> Strictly No Photo
              </div>
            </div>
          </motion.div>

          {/* Japan Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[var(--ground-mid)] bg-opacity-40 backdrop-blur-xl rounded-3xl shadow-[var(--shadow-card)] border border-[var(--ground-rim)] flex flex-col relative overflow-hidden group hover:border-[var(--dhaka-crimson)] transition-all duration-500"
          >
            <div className="absolute top-0 w-full left-0 h-1.5 bg-gradient-to-r from-[var(--dhaka-crimson)] to-[var(--dhaka-deep)] opacity-60" />
            <div className="p-8 pt-12 flex flex-col flex-1">
              <div className="w-12 h-12 rounded-2xl bg-[var(--ground-ink)] border border-[var(--ground-rim)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={24} className="text-[var(--dhaka-crimson)]" />
              </div>
              <h3 className="text-2xl font-bold font-fraunces text-[var(--text-bright)] mb-3">Japan (履歴書)</h3>
              <p className="text-[var(--text-muted)] text-sm mb-8 font-jakarta leading-relaxed">Specially built JIS S 5504 standard for Japanese corporate life.</p>
              
              <ul className="space-y-5 mb-10 flex-1">
                {[
                  "Exact 0.5px JIS grid reproduction",
                  "Automatic Era (Reiwa) conversion",
                  "Noto Serif JP typography"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-sm text-[var(--text-body)] font-jakarta">
                    <Check size={18} className="text-[var(--dhaka-crimson)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-2 bg-[var(--dhaka-crimson)] bg-opacity-10 text-[var(--dhaka-crimson)] font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl w-fit border border-[var(--dhaka-crimson)] border-opacity-20">
                <Camera size={14} /> Photo Mandatory
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
