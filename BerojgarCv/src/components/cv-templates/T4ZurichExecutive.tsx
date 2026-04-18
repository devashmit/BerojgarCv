import { CVData } from '@/types/cv'
import { MapPin, Phone, Mail, Linkedin, Globe } from 'lucide-react'

export function T4ZurichExecutive({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData

  const hasExperience = experience.length > 0
  const hasEducation = education.length > 0
  const hasTechSkills = skills.technical.length > 0
  const hasSoftSkills = skills.soft.length > 0
  const hasLanguages = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProjects = projects && projects.length > 0

  const contacts = [
    { icon: <Mail size={11} />, text: personal.email },
    { icon: <Phone size={11} />, text: personal.phone },
    { icon: <MapPin size={11} />, text: personal.address },
    { icon: <Linkedin size={11} />, text: personal.linkedin?.replace(/https?:\/\/(www\.)?/, '') },
    { icon: <Globe size={11} />, text: personal.website?.replace(/https?:\/\/(www\.)?/, '') },
  ].filter(c => c.text)

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-[#0A192F] font-bold uppercase tracking-[0.1em] text-[11pt] shrink-0">{title}</h2>
          <div className="flex-1 h-[1px] bg-gray-200 relative">
            <div className="absolute left-0 top-0 h-full w-10 bg-[#0A192F]" />
          </div>
        </div>
        {children}
      </section>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-[10pt] font-sans text-neutral-800 flex flex-col mx-auto shrink-0 border-t-[4px] border-[#0A192F]"
      style={{ fontFamily: '"Inter", "Roboto", system-ui, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {/* Header */}
      <div className="py-10 px-[40px] flex flex-col items-center border-b border-gray-100">
        {personal.fullName && (
          <h1 className="text-[24pt] font-bold tracking-[0.15em] uppercase text-[#0A192F] mb-2">{personal.fullName}</h1>
        )}
        {personal.jobTitle && (
          <p className="text-justify text-[11pt] text-gray-500 font-medium tracking-widest uppercase mb-4">{personal.jobTitle}</p>
        )}
        {contacts.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[9.5pt] text-gray-600">
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-[#0A192F]">{c.icon}</span>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-[40px] py-[32px] flex-1 flex flex-col gap-[22px]">

        {/* Summary */}
        {personal.summary?.trim() && (
          <p className="text-justify leading-relaxed text-gray-700 text-[10.5pt]">{personal.summary}</p>
        )}

        {/* Experience */}
        {hasExperience && (
          <Section title="Professional Experience">
            <div className="flex flex-col gap-[18px]">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[11pt] text-[#0A192F]">{exp.title}</h3>
                    <span className="text-[#0A192F] font-bold text-[9pt] bg-gray-100 px-2 py-0.5 rounded-sm shrink-0 ml-2">
                      {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-gray-700 font-medium text-[10pt] mb-2">
                    {exp.company}{exp.company && exp.location ? <span className="text-gray-400 font-normal"> · {exp.location}</span> : null}
                  </div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul className="space-y-1.5 ml-2">
                      {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 leading-relaxed text-[10pt]">
                          <span className="text-[#0A192F] text-[13px] leading-tight shrink-0 mt-[1px]">▸</span>
                          <span>{bullet.replace(/^[\—\-\•\.\s]+/, "")}</span>
                        </li>
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
                <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <div>
                    <h3 className="font-bold text-[11pt] text-[#0A192F]">{edu.degree}</h3>
                    <div className="text-gray-700 font-medium text-[10pt] mt-0.5">
                      {edu.institution}{edu.institution && edu.location ? <span className="text-gray-400 font-normal"> · {edu.location}</span> : null}
                    </div>
                    {edu.grade && <div className="text-gray-500 text-[9pt] mt-0.5">Grade: {edu.grade}</div>}
                  </div>
                  <div className="text-[#0A192F] font-bold text-[9pt] bg-gray-100 px-2 py-0.5 rounded-sm self-start">
                    {edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}
                  </div>
                </div>
              ))}
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
                    <h3 className="font-bold text-[11pt] text-[#0A192F]">{proj.name}</h3>
                    {proj.technologies.length > 0 && (
                      <span className="text-gray-500 font-normal text-[9.5pt] italic">{proj.technologies.join(', ')}</span>
                    )}
                  </div>
                  {proj.description && (
                    <div className="flex items-start gap-2 text-gray-600 text-[10pt]">
                      <span className="text-[#0A192F] text-[13px] shrink-0 mt-[1px]">▸</span>
                      <span>{proj.description}</span>
                    </div>
                  )}
                  {proj.link && <div className="text-gray-400 text-[9pt] mt-0.5 ml-5">{proj.link}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Technical Skills */}
        {hasTechSkills && (
          <Section title="Technical Skills">
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, i) => (
                <span key={i} className="bg-[#0A192F] text-white px-3 py-1 rounded-sm text-[9.5pt] shadow-sm">{skill}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Soft Skills */}
        {hasSoftSkills && (
          <Section title="Soft Skills">
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, i) => (
                <span key={i} className="bg-gray-100 text-[#0A192F] border border-gray-200 px-3 py-1 rounded-sm text-[9.5pt] shadow-sm">{skill}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {hasCerts && (
          <Section title="Certifications">
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
              {certifications.map((cert, i) => <li key={i} className="text-justify">{cert}</li>)}
            </ul>
          </Section>
        )}

        {/* Languages */}
        {hasLanguages && (
          <Section title="Languages">
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <span key={i} className="bg-gray-100 text-[#0A192F] border border-gray-200 px-3 py-1 rounded-sm text-[9.5pt]">
                  {lang.language}{lang.proficiency ? ` · ${lang.proficiency}` : ''}
                </span>
              ))}
            </div>
          </Section>
        )}

      </div>
    </div>
  )
}
