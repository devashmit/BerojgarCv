import { CVData } from '@/types/cv'
import { MapPin, Phone, Mail, Linkedin, Github } from 'lucide-react'
import Image from 'next/image'

export function T2HimalayaModern({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData

  const hasExperience = experience.length > 0
  const hasEducation = education.length > 0
  const hasTechSkills = skills.technical.length > 0
  const hasSoftSkills = skills.soft.length > 0
  const hasLanguages = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProjects = projects && projects.length > 0

  const Mountains = () => (
    <svg className="absolute bottom-0 w-full left-0 opacity-[0.07]" viewBox="0 0 195 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 120L45 50L90 100L140 20L195 110V120H0Z" fill="white"/>
      <path d="M0 120L30 80L80 120H0Z" fill="white" fillOpacity="0.5"/>
    </svg>
  )

  function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div>
        <h3 className="text-blue-200 uppercase font-bold text-[9pt] tracking-[0.12em] mb-3 border-b border-white/15 pb-1.5">{title}</h3>
        {children}
      </div>
    )
  }

  function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section>
        <h3 className="text-[#1A3A5C] font-bold uppercase tracking-[0.12em] text-[10.5pt] border-b-2 border-gray-200 pb-1.5 mb-4">{title}</h3>
        {children}
      </section>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-[10pt] leading-[1.5] font-sans text-neutral-800 flex mx-auto shrink-0 relative overflow-hidden"
      style={{ fontFamily: '"Inter", "Roboto", system-ui, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <div className="w-[210px] bg-[#1A3A5C] shrink-0 flex flex-col pt-10 text-white pb-10 relative overflow-hidden">

        {/* Avatar */}
        <div className="px-6 flex flex-col items-center mb-8 z-10">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-[3px] border-white/20 mb-5 bg-white/5 flex items-center justify-center relative">
            {personal.photo ? (
              <Image src={personal.photo} alt="Profile" fill className="object-cover" />
            ) : (
              <div className="w-[80px] h-[80px] rounded-full border border-dashed border-white/40" />
            )}
          </div>
          {personal.fullName && <h2 className="text-[13pt] font-bold text-center leading-tight mb-1.5 tracking-wide">{personal.fullName}</h2>}
          {personal.jobTitle && <p className="text-blue-200 text-center font-medium text-[9.5pt]">{personal.jobTitle}</p>}
        </div>

        <div className="px-6 flex flex-col gap-6 flex-1 z-10">

          {/* Contact */}
          <SideSection title="Contact">
            <div className="space-y-2.5 text-[9pt] font-light text-blue-50">
              {personal.email && <div className="flex items-start gap-2.5"><Mail size={13} className="text-blue-300 shrink-0 mt-0.5" /><span className="break-all">{personal.email}</span></div>}
              {personal.phone && <div className="flex items-center gap-2.5"><Phone size={13} className="text-blue-300 shrink-0" /><span>{personal.phone}</span></div>}
              {personal.address && <div className="flex items-start gap-2.5"><MapPin size={13} className="text-blue-300 shrink-0 mt-0.5" /><span>{personal.address}</span></div>}
              {personal.linkedin && <div className="flex items-center gap-2.5"><Linkedin size={13} className="text-blue-300 shrink-0" /><span className="break-all">{personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</span></div>}
              {personal.github && <div className="flex items-center gap-2.5"><Github size={13} className="text-blue-300 shrink-0" /><span className="break-all">{personal.github.replace(/https?:\/\/(www\.)?/, '')}</span></div>}
            </div>
          </SideSection>

          {/* Technical Skills */}
          {hasTechSkills && (
            <SideSection title="Technical Skills">
              <div className="flex flex-wrap gap-1.5">
                {skills.technical.map((skill, i) => (
                  <span key={i} className="bg-white/10 text-white text-[8.5pt] px-2 py-0.5 rounded-sm border border-white/10">{skill}</span>
                ))}
              </div>
            </SideSection>
          )}

          {/* Soft Skills */}
          {hasSoftSkills && (
            <SideSection title="Soft Skills">
              <div className="flex flex-wrap gap-1.5">
                {skills.soft.map((skill, i) => (
                  <span key={i} className="bg-blue-300/20 text-blue-100 text-[8.5pt] px-2 py-0.5 rounded-sm border border-blue-200/20">{skill}</span>
                ))}
              </div>
            </SideSection>
          )}

          {/* Languages */}
          {hasLanguages && (
            <SideSection title="Languages">
              <ul className="space-y-2 text-[9pt]">
                {languages.map((lang, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-medium">{lang.language}</span>
                    {lang.proficiency && <span className="text-blue-300 text-[8.5pt] opacity-90">{lang.proficiency}</span>}
                  </li>
                ))}
              </ul>
            </SideSection>
          )}

          {/* Certifications */}
          {hasCerts && (
            <SideSection title="Certifications">
              <ul className="space-y-1.5 text-[8.5pt] text-blue-50/90">
                {certifications.map((cert, i) => (
                  <li key={i} className="text-justify flex gap-1.5"><span className="text-blue-300 mt-0.5 shrink-0">▸</span>{cert}</li>
                ))}
              </ul>
            </SideSection>
          )}
        </div>

        <Mountains />
      </div>

      {/* ── Main Content ──────────────────────────────────── */}
      <div className="flex-1 px-[36px] py-[40px] flex flex-col gap-[22px] relative bg-slate-50/50">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1A3A5C] to-[#3A7CA5]" />

        {/* Summary */}
        {personal.summary?.trim() && (
          <p className="text-justify text-gray-700 leading-relaxed text-[10.5pt]">{personal.summary}</p>
        )}

        {/* Experience */}
        {hasExperience && (
          <MainSection title="Work Experience">
            <div className="flex flex-col gap-[18px]">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute w-[9px] h-[9px] rounded-full bg-[#1A3A5C] -left-[5px] top-[5px] border-2 border-white" />
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-[11pt] text-gray-900">{exp.title}</h4>
                    <span className="text-gray-500 font-medium text-[9pt] shrink-0 ml-2">
                      {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[#3A7CA5] font-semibold text-[10pt] mb-2">
                    {exp.company}{exp.company && exp.location ? <span className="text-gray-400 font-normal"> · {exp.location}</span> : null}
                  </div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
                      {exp.bullets.filter(b => b.trim()).map((bullet, j) => <li key={j} className="text-justify">{bullet.replace(/^[\—\-\•\.\s]+/, "")}</li>)}
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
            <div className="flex flex-col gap-[14px]">
              {education.map((edu, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute w-[9px] h-[9px] rounded-full bg-[#1A3A5C] -left-[5px] top-[5px] border-2 border-white" />
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-[11pt] text-gray-900">{edu.degree}</h4>
                    <span className="text-gray-500 font-medium text-[9pt] shrink-0 ml-2">{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                  </div>
                  <div className="text-[#3A7CA5] font-semibold text-[10pt]">
                    {edu.institution}{edu.institution && edu.location ? <span className="text-gray-400 font-normal"> · {edu.location}</span> : null}
                  </div>
                  {edu.grade && <div className="text-gray-600 mt-0.5 text-[9.5pt]">Grade: {edu.grade}</div>}
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
                      <span className="text-gray-500 font-normal text-[9.5pt] italic">{proj.technologies.join(', ')}</span>
                    )}
                  </div>
                  {proj.description && <p className="text-justify text-gray-700 text-[10pt]">{proj.description}</p>}
                  {proj.link && <div className="text-[#3A7CA5] text-[9pt] mt-0.5">{proj.link}</div>}
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  )
}
