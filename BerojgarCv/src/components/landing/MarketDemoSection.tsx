'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export function MarketDemoSection() {
  
  return (
    <section className="bg-[#100D0A] pt-32 pb-16 overflow-hidden relative font-jakarta" id="market-demo">
      {/* Very faint background grids or textures could be placed here if desired */}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 border border-[#3e2e1a] bg-[#23170a] rounded-full px-4 py-1.5 shadow-lg shadow-amber-900/10"
          >
            <span className="w-6 h-6 rounded-full bg-[#f59e0b] text-[#5b3e04] text-[11px] font-bold flex items-center justify-center shrink-0 tracking-widest font-mono">NP</span>
            <span className="text-[#f59e0b] text-sm font-semibold tracking-wide">साहाय्योगी टाइप इन्जिन · Sahayogi Type Engine</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight shadow-sm font-jakarta"
          >
            तपाईंको बजारको लागि<br/>
            <span className="text-[#f59e0b] italic font-serif opacity-90">सही फर्म्याट ।</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#8e877e] text-lg lg:text-xl max-w-2xl font-jakarta leading-relaxed"
          >
            हाम्रो AI तपाईंको CV लाई स्थानीय नियोक्ताहरूको अपेक्षा अनुसार ढालछ — काठमाडौं, टोकियो, वा दुबईमा होस् ।
          </motion.p>
        </div>

        {/* Market Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-[#645c53] font-mono text-[11px] font-bold tracking-[0.25em] uppercase">बजार छान्नुस् · SELECT MARKET</span>
          <div className="flex-1 h-[1px] bg-[#2a241e]"></div>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          
          {/* Card 1: Nepal & Gulf */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-[#2a241e] bg-[#14100c] rounded-2xl p-7 relative overflow-hidden group hover:border-[#473623] transition-colors shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#473623]"></div>
            
            <div className="text-white font-bold text-2xl mb-7 tracking-wider">NP</div>
            <h3 className="text-xl font-bold text-white mb-3">Nepal & Gulf</h3>
            <p className="text-[#847c72] text-[15px] mb-8 leading-relaxed font-jakarta">
              Traditional visual formats preferred by local HR and Gulf agencies.
            </p>
            
            <div className="space-y-3 flex flex-col items-start">
              <span className="inline-block px-3 py-1 bg-[#231a0e] text-[#d97706] text-xs font-mono font-medium rounded-lg border border-[#3e2e1a]">
                • Strong visual headers
              </span>
              <span className="inline-block px-3 py-1 bg-[#231a0e] text-[#d97706] text-xs font-mono font-medium rounded-lg border border-[#3e2e1a]">
                • Personal detail block
              </span>
              <span className="inline-block px-3 py-1 bg-[#231a0e] text-[#d97706] text-xs font-mono font-medium rounded-lg border border-[#3e2e1a]">
                • Multi-column layout
              </span>
            </div>
          </motion.div>

          {/* Card 2: Remote & Global */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="border border-[#2a241e] bg-[#14100c] rounded-2xl p-7 relative overflow-hidden group hover:border-[#451a1a] transition-colors shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 to-blue-500"></div>
            
            <div className="text-2xl mb-7">🌍</div>
            <h3 className="text-xl font-bold text-white mb-3">Remote & Global</h3>
            <p className="text-[#847c72] text-[15px] mb-8 leading-relaxed font-jakarta">
              ATS-optimised, machine-readable formats for international roles.
            </p>
            
            <div className="space-y-3 flex flex-col items-start">
              <span className="inline-block px-3 py-1 bg-[#1f1010] text-[#ef4444] text-xs font-mono font-medium rounded-lg border border-[#3d1a1a]">
                • Zero tables policy
              </span>
              <span className="inline-block px-3 py-1 bg-[#1f1010] text-[#ef4444] text-xs font-mono font-medium rounded-lg border border-[#3d1a1a]">
                • AI keyword hierarchy
              </span>
              <span className="inline-block px-3 py-1 bg-[#1f1010] text-[#ef4444] text-xs font-mono font-medium rounded-lg border border-[#3d1a1a]">
                • Single-column clean
              </span>
            </div>
          </motion.div>

          {/* Card 3: Japan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border border-[#2a241e] bg-[#14100c] rounded-2xl p-7 relative overflow-hidden group hover:border-[#473623] transition-colors shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#d6b054]"></div>
            
            <div className="text-[#e2e2e2] font-bold text-2xl mb-7 font-serif tracking-wider">JP</div>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">Japan <span className="font-medium text-lg">履歴書</span></h3>
            <p className="text-[#847c72] text-[15px] mb-8 leading-relaxed font-jakarta">
              JIS S 5504 standard required by Japanese corporate hiring.
            </p>
            
            <div className="space-y-3 flex flex-col items-start">
              <span className="inline-block px-3 py-1 bg-[#231e13] text-[#d6b054] text-xs font-mono font-medium rounded-lg border border-[#3d3319]">
                • 0.5px JIS grid
              </span>
              <span className="inline-block px-3 py-1 bg-[#231e13] text-[#d6b054] text-xs font-mono font-medium rounded-lg border border-[#3d3319]">
                • Furigana support
              </span>
              <span className="inline-block px-3 py-1 bg-[#231e13] text-[#d6b054] text-xs font-mono font-medium rounded-lg border border-[#3d3319]">
                • Exact kanji format
              </span>
            </div>
          </motion.div>
        </div>



        {/* Bottom CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-[#2a241e] bg-[#1a130c] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-8 shadow-2xl relative overflow-hidden"
        >
           {/* Faint metallic gradient */}
           <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5c3c1e] to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-br from-[#d97706]/5 to-transparent pointer-events-none"></div>

           <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left z-10 md:max-w-xl lg:max-w-2xl">
             <div className="w-14 h-14 bg-[#2f1813] border border-[#4a2b25] rounded-2xl flex items-center justify-center shrink-0 text-[#fca5a5] shadow-inner mt-1">
               <Sparkles size={24} className="fill-current opacity-80" />
             </div>
             <div>
               <h3 className="text-white font-bold text-xl md:text-2xl mb-2 tracking-tight">पूर्ण सुइट अनलक गर्नुहोस् · Unlock Full Suite</h3>
               <p className="text-[#a1998f] text-[15px] leading-relaxed">
                 Cloud storage, <span className="text-[#d97706] font-semibold">7+ export formats</span>, unlimited AI rewrites, and cover letter generator — all in one plan.
               </p>
             </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10 shrink-0">
             <Link href="/templates" className="px-7 py-3.5 rounded-xl border border-[#3e2e1a] text-[#847c72] hover:text-white hover:border-[#d97706] hover:bg-[#23170a] transition-all text-center font-bold tracking-wide shadow-sm text-sm">
               View Templates &darr;
             </Link>
             <Link href="/?sign-in=true" className="px-7 py-3.5 rounded-xl border border-[#4a2b25] text-white bg-[#2f1813] hover:bg-[#3a1d17] hover:border-[#5a3b35] transition-all text-center font-bold tracking-wide shadow-xl text-sm whitespace-nowrap group">
               Build Free <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
             </Link>
           </div>
        </motion.div>

      </div>
    </section>
  )
}
