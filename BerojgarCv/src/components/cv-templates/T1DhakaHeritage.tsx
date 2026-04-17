import { CVData } from '@/types/cv'
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from 'lucide-react'
import Image from 'next/image'

export function T1DhakaHeritage({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects, references } = cvData

  const hasExperience = experience.length > 0
  const hasEducation = education.length > 0
  const hasTechSkills = skills.technical.length > 0
  const hasSoftSkills = skills.soft.length > 0
  const hasLanguages = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProjects = projects && projects.length > 0
  const hasRefs = references.length > 0

  const Diamond = () => (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M6 0L12 6L6 12L0 6L6 0Z" fill="#D4AF37"/>
    </svg>
  )

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Diamond />
          <h2 className="text-[#C0392B] font-bold uppercase tracking-widest text-[11pt]">{title}</h2>
          <div className="flex-1 h-[1.5px] bg-gradient-to-r from-[#C0392B] to-transparent ml-1 opacity-40" />
        </div>
        {children}
      </section>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-[10.5pt] leading-[1.5] font-sans text-neutral-800 flex flex-col mx-auto shrink-0"
      style={{ fontFamily: '"Inter", "Roboto", system-ui, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="w-full bg-[#C0392B] text-white pt-[40px] pb-[32px] px-[56px] border-t-[3px] border-b-[3px] border-[#D4AF37] flex justify-between items-center gap-6">
        <div className="flex-1 min-w-0">
          {personal.fullName && (
            <h1 className="text-[22pt] font-bold tracking-wide uppercase mb-1 leading-tight">{personal.fullName}</h1>
          )}
          {personal.jobTitle && (
            <p className="text-[#FFD580] text-[12pt] font-medium mb-3">{personal.jobTitle}</p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9pt] font-light text-white/90">
            {personal.email && <span className="flex items-center gap-1.5"><Mail size={12}/> {personal.email}</span>}
            {personal.phone && <span className="flex items-center gap-1.5"><Phone size={12}/> {personal.phone}</span>}
            {personal.address && <span className="flex items-center gap-1.5"><MapPin size={12}/> {personal.address}</span>}
            {personal.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={12}/> {personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</span>}
            {personal.github && <span className="flex items-center gap-1.5"><Github size={12}/> {personal.github.replace(/https?:\/\/(www\.)?/, '')}</span>}
            {personal.website && <span className="flex items-center gap-1.5"><Globe size={12}/> {personal.website.replace(/https?:\/\/(www\.)?/, '')}</span>}
          </div>
        </div>

        <div className="w-[80px] h-[96px] bg-white/10 shrink-0 flex items-center justify-center border border-white/30 overflow-hidden relative">
          {personal.photo ? (
            <Image src={personal.photo} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="w-[68px] h-[84px] border border-dashed border-white/40" />
          )}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="px-[56px] py-[40px] flex-1 flex flex-col gap-[24px]">

        {/* Summary */}
        {personal.summary?.trim() && (
          <Section title="Professional Summary">
            <p className="text-justify leading-relaxed text-[10.5pt] text-gray-700">{personal.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {hasExperience && (
          <Section title="Work Experience">
            <div className="flex flex-col gap-[16px]">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[11pt] text-gray-900">{exp.title}</h3>
                    <span className="text-gray-500 text-[9pt] font-medium shrink-0 ml-2">
                      {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[#C0392B] font-semibold text-[10pt] mb-1.5">
                    {exp.company}{exp.company && exp.location ? <span className="text-gray-500 font-normal"> · {exp.location}</span> : null}
                  </div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul className="list-disc list-outside ml-[18px] space-y-1.5 text-gray-700">
                      {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="text-justify pl-1">{bullet.replace(/^[—\-\•\.\s]+/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {hasEducation && (
          <Section title="Education">
            <div className="flex flex-col gap-[14px]">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-[11pt] text-gray-900">{edu.degree}</h3>
                    <span className="text-gray-500 text-[9pt] font-medium shrink-0 ml-2">{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                  </div>
                  <div className="text-[#C0392B] font-semibold text-[10pt]">
                    {edu.institution}{edu.institution && edu.location ? <span className="text-gray-500 font-normal"> · {edu.location}</span> : null}
                  </div>
                  {edu.grade && <div className="text-gray-600 mt-0.5 text-[9.5pt]">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skills */}
        {(hasTechSkills || hasSoftSkills) && (
          <Section title="Skills">
            <div className="flex flex-col gap-2">
              {hasTechSkills && (
                <div>
                  <span className="font-semibold text-gray-800">Technical: </span>
                  <span className="text-gray-700">{skills.technical.join(' · ')}</span>
                </div>
              )}
              {hasSoftSkills && (
                <div>
                  <span className="font-semibold text-gray-800">Soft Skills: </span>
                  <span className="text-gray-700">{skills.soft.join(' · ')}</span>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Projects */}
        {hasProjects && (
          <Section title="Projects">
            <div className="flex flex-col gap-[14px]">
              {projects!.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-bold text-[11pt] text-gray-900">{proj.name}</h3>
                    {proj.technologies.length > 0 && (
                      <span className="text-gray-500 font-normal text-[9.5pt] italic">{proj.technologies.join(', ')}</span>
                    )}
                  </div>
                  {proj.description && <p className="text-gray-700 text-[10pt]">{proj.description}</p>}
                  {proj.link && <div className="text-[#C0392B] text-[9pt] mt-0.5">{proj.link}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {hasCerts && (
          <Section title="Certifications">
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
              {certifications.map((cert, i) => <li key={i}>{cert}</li>)}
            </ul>
          </Section>
        )}

        {/* Languages */}
        {hasLanguages && (
          <Section title="Languages">
            <div className="flex flex-wrap gap-x-8 gap-y-1">
              {languages.map((lang, i) => (
                <span key={i} className="text-gray-700">
                  <span className="font-medium text-gray-800">{lang.language}</span>
                  {lang.proficiency ? ` — ${lang.proficiency}` : ''}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* References */}
        {hasRefs && (
          <Section title="References">
            <div className="flex flex-wrap gap-6">
              {references.map(ref => (
                <div key={ref.id}>
                  <div className="font-semibold text-gray-800">{ref.name}</div>
                  {ref.title && <div className="text-gray-600 text-[9.5pt]">{ref.title}</div>}
                  {ref.contact && <div className="text-gray-500 text-[9.5pt]">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {cvData.referencesOnRequest && !hasRefs && (
          <p className="text-gray-400 text-[9.5pt] italic mt-2">References available upon request.</p>
        )}
      </div>
    </div>
  )
}
