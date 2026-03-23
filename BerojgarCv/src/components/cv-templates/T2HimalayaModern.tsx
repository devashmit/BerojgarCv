import { CVData } from '@/types/cv'
import { MapPin, Phone, Mail, Linkedin, Github } from 'lucide-react'
import Image from 'next/image'

export function T2HimalayaModern({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const Mountains = () => (
    <svg className="absolute bottom-0 w-full left-0 opacity-[0.08]" viewBox="0 0 195 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 120L45 50L90 100L140 20L195 110V120H0Z" fill="white"/>
      <path d="M0 120L30 80L80 120H0Z" fill="white" fillOpacity="0.5"/>
    </svg>
  )

  const skillLevel = (index: number) => {
    // Generate a pseudo-random looking but deterministic width between 60% and 95%
    const widths = ['w-[95%]', 'w-[85%]', 'w-[75%]', 'w-[90%]', 'w-[80%]']
    return widths[index % widths.length]
  }

  return (
    <div className="bg-white min-h-[297mm] w-[210mm] text-[10pt] leading-snug font-sans text-neutral-800 flex mx-auto shrink-0 shadow-lg relative overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-[195px] bg-[#1A3A5C] shrink-0 flex flex-col pt-10 text-white pb-10 relative">
        <div className="px-6 flex flex-col items-center mb-10 z-10">
          <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-[3px] border-white/20 mb-6 bg-white/5 flex items-center justify-center relative">
             {personal.photo ? (
                <Image src={personal.photo} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-[90px] h-[90px] rounded-full border border-dashed border-white/50" />
              )}
          </div>
          <h2 className="text-xl font-bold text-center leading-tight mb-2 tracking-wide uppercase">{personal.fullName}</h2>
          <p className="text-blue-200 text-center font-medium text-sm">{personal.jobTitle}</p>
        </div>

        <div className="px-6 flex flex-col gap-8 flex-1 z-10">
          <div className="space-y-4 text-xs font-light text-blue-50">
            {personal.email && (
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <span className="break-all">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-300 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-3">
                <Linkedin size={16} className="text-blue-300 shrink-0" />
                <span className="truncate">{personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-blue-200 uppercase font-bold text-xs tracking-wider mb-4 border-b border-white/20 pb-2">Technical Skills</h3>
            <div className="space-y-3">
              {skills.technical.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{skill}</span>
                  </div>
                  <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full bg-blue-300 rounded-full ${skillLevel(i)}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-blue-200 uppercase font-bold text-xs tracking-wider mb-4 border-b border-white/20 pb-2">Languages</h3>
            <ul className="space-y-2 text-xs">
              {languages.map((lang, i) => (
                <li key={i} className="flex flex-col">
                  <span>{lang.language}</span>
                  <span className="text-blue-300 opacity-80">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Mountains />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 pt-12 flex flex-col relative bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1A3A5C] to-[#3A7CA5]" />

        {personal.summary && (
          <div className="mb-10 text-gray-700 leading-relaxed text-[10.5pt]">
            <p>{personal.summary}</p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          <section>
            <h3 className="text-[#1A3A5C] font-bold uppercase tracking-widest text-[11pt] border-b-2 border-gray-200 pb-2 mb-4">Experience</h3>
            <div className="flex flex-col gap-6">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-gray-200 -ml-[2px]">
                  <div className="absolute w-[10px] h-[10px] rounded-full bg-[#1A3A5C] -left-[6px] top-[4px] border-2 border-white" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[11pt] text-gray-900">{exp.title}</h4>
                    <span className="text-gray-500 font-medium text-[9pt]">
                      {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[#3A7CA5] font-semibold text-[10pt] mb-2">
                    {exp.company} <span className="text-gray-400 font-normal">| {exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[#1A3A5C] font-bold uppercase tracking-widest text-[11pt] border-b-2 border-gray-200 pb-2 mb-4">Education</h3>
            <div className="flex flex-col gap-5">
              {education.map((edu, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-gray-200 -ml-[2px]">
                  <div className="absolute w-[10px] h-[10px] rounded-full bg-[#1A3A5C] -left-[6px] top-[4px] border-2 border-white" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[11pt] text-gray-900">{edu.degree}</h4>
                    <span className="text-gray-500 font-medium text-[9pt]">{edu.startYear} – {edu.endYear}</span>
                  </div>
                  <div className="text-[#3A7CA5] font-semibold text-[10pt]">
                    {edu.institution} <span className="text-gray-400 font-normal">| {edu.location}</span>
                  </div>
                  {edu.grade && <div className="text-gray-600 mt-1">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </section>

          {cvData.certifications.length > 0 && (
            <section>
              <h3 className="text-[#1A3A5C] font-bold uppercase tracking-widest text-[11pt] border-b-2 border-gray-200 pb-2 mb-4">Certifications</h3>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-gray-800">
                {cvData.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
              </ul>
            </section>
          )}
        </div>
      </div>

    </div>
  )
}
