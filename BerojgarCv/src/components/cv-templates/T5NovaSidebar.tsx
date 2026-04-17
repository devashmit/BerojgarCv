import { CVData } from '@/types/cv'
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'

export function T5NovaSidebar({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData

  const hasExperience = experience.length > 0
  const hasEducation = education.length > 0
  const hasTechSkills = skills.technical.length > 0
  const hasSoftSkills = skills.soft.length > 0
  const hasLanguages = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProjects = projects && projects.length > 0

  const initials = personal.fullName
    ? personal.fullName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')
    : '?'

  const profDots = (prof: string) => {
    const map: Record<string, number> = { Native: 5, Fluent: 4, Professional: 3, Conversational: 2, Basic: 1 }
    return map[prof] ?? 2
  }

  function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div>
        <h3 className="uppercase tracking-[0.15em] text-[8.5pt] text-[#A5C9B3] mb-3 font-bold">{title}</h3>
        {children}
      </div>
    )
  }

  function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section>
        <h3 className="text-[#2D4739] font-bold uppercase tracking-[0.12em] text-[11pt] mb-4 flex items-center gap-3">
          <span className="w-5 h-[2px] bg-[#2D4739] shrink-0" /> {title}
        </h3>
        {children}
      </section>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-[10pt] font-sans text-neutral-800 flex mx-auto shrink-0"
      style={{ fontFamily: '"Inter", "Roboto", system-ui, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <div className="w-[200px] bg-[#2D4739] shrink-0 text-white p-8 pt-10 flex flex-col gap-7">

        {/* Avatar initials */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-4 shadow-lg">
            <span className="text-[18pt] font-bold tracking-widest">{initials}</span>
          </div>
          {personal.fullName && (
            <h2 className="text-[13pt] font-bold leading-tight mb-1.5 uppercase text-center">{personal.fullName}</h2>
          )}
          {personal.jobTitle && (
            <p className="text-[#A5C9B3] text-[8.5pt] text-center pb-5 border-b border-white/10 w-full text-center">{personal.jobTitle}</p>
          )}
        </div>

        {/* Contact */}
        <SideSection title="Contact">
          <ul className="space-y-2.5 text-[9pt] font-light">
            {personal.email && <li className="flex items-start gap-2"><Mail size={11} className="text-[#A5C9B3] shrink-0 mt-0.5" /><span className="break-all">{personal.email}</span></li>}
            {personal.phone && <li className="flex items-center gap-2"><Phone size={11} className="text-[#A5C9B3] shrink-0" /><span>{personal.phone}</span></li>}
            {personal.address && <li className="flex items-start gap-2"><MapPin size={11} className="text-[#A5C9B3] shrink-0 mt-0.5" /><span>{personal.address}</span></li>}
            {personal.linkedin && <li className="flex items-center gap-2"><Linkedin size={11} className="text-[#A5C9B3] shrink-0" /><span className="break-all">{personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</span></li>}
            {personal.github && <li className="flex items-center gap-2"><Github size={11} className="text-[#A5C9B3] shrink-0" /><span className="break-all">{personal.github.replace(/https?:\/\/(www\.)?/, '')}</span></li>}
          </ul>
        </SideSection>

        {/* Technical Skills */}
        {hasTechSkills && (
          <SideSection title="Technical Skills">
            <div className="flex flex-wrap gap-1.5">
              {skills.technical.map(s => (
                <span key={s} className="bg-white/10 px-2 py-0.5 text-[8.5pt] rounded-full border border-white/10">{s}</span>
              ))}
            </div>
          </SideSection>
        )}

        {/* Soft Skills */}
        {hasSoftSkills && (
          <SideSection title="Soft Skills">
            <div className="flex flex-wrap gap-1.5">
              {skills.soft.map(s => (
                <span key={s} className="bg-white/5 px-2 py-0.5 text-[8.5pt] rounded-full border border-[#A5C9B3]/30 text-[#A5C9B3]">{s}</span>
              ))}
            </div>
          </SideSection>
        )}

        {/* Languages */}
        {hasLanguages && (
          <SideSection title="Languages">
            <ul className="space-y-2.5 text-[9pt]">
              {languages.map((l, i) => (
                <li key={i} className="flex flex-col gap-1">
                  <span className="font-light">{l.language}</span>
                  <div className="flex gap-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map(d => (
                      <div key={d} className={`w-1.5 h-1.5 rounded-full ${d <= profDots(l.proficiency) ? 'bg-[#A5C9B3]' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </SideSection>
        )}

        {/* Certifications */}
        {hasCerts && (
          <SideSection title="Certifications">
            <ul className="space-y-1.5 text-[8.5pt] text-white/80">
              {certifications.map((c, i) => (
                <li key={i} className="flex gap-1.5"><span className="text-[#A5C9B3] shrink-0">▸</span>{c}</li>
              ))}
            </ul>
          </SideSection>
        )}
      </div>

      {/* ── Main Column ──────────────────────────────────── */}
      <div className="flex-1 px-[36px] py-[40px] relative flex flex-col gap-[22px]">
        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#2D4739] to-[#6EB38A]" />

        {/* Summary */}
        {personal.summary?.trim() && (
          <div className="italic text-gray-600 text-[10.5pt] leading-relaxed border-l-4 border-[#A5C9B3] pl-4 py-1">
            <p>{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <MainSection title="Work Experience">
            <div className="flex flex-col gap-[18px] ml-8">
              {experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-8 top-1.5 w-3 h-3 border-2 border-[#2D4739] rounded-full bg-white" />
                  <h4 className="font-bold text-[11pt] text-gray-900 leading-none mb-1">{exp.title}</h4>
                  <div className="text-[#2D4739] font-semibold text-[10pt] mb-1">{exp.company}</div>
                  <div className="text-gray-500 text-[8.5pt] uppercase tracking-wider font-medium mb-2">
                    {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-[10pt] leading-relaxed">
                      {exp.bullets.filter(b => b.trim()).map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Education */}
        {hasEducation && (
          <MainSection title="Education">
            <div className="flex flex-col gap-[14px] ml-8">
              {education.map(edu => (
                <div key={edu.id} className="relative">
                  <div className="absolute -left-8 top-1.5 w-3 h-3 border-2 border-[#2D4739] rounded-full bg-white" />
                  <h4 className="font-bold text-[11pt] text-gray-900 leading-none mb-1">{edu.degree}</h4>
                  <div className="text-[#2D4739] font-semibold text-[10pt] mb-1">{edu.institution}</div>
                  <div className="text-gray-500 text-[8.5pt] uppercase tracking-wider font-medium">
                    {edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}{edu.location ? ` · ${edu.location}` : ''}
                  </div>
                  {edu.grade && <div className="text-gray-600 mt-1 text-[10pt]">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Projects */}
        {hasProjects && (
          <MainSection title="Projects">
            <div className="flex flex-col gap-[14px]">
              {projects!.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="font-bold text-[11pt] text-gray-900">{proj.name}</h4>
                    {proj.technologies.length > 0 && (
                      <span className="text-gray-500 text-[9pt] italic">{proj.technologies.join(', ')}</span>
                    )}
                  </div>
                  {proj.description && <p className="text-gray-700 text-[10pt]">{proj.description}</p>}
                  {proj.link && <div className="text-[#2D4739] text-[9pt] mt-0.5">{proj.link}</div>}
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  )
}
