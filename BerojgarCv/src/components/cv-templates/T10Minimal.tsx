import { CVData } from '@/types/cv'
import React from 'react'

export function T10Minimal({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, projects, languages, certifications } = cvData

  const hasExperience = experience.length > 0
  const hasEducation = education.length > 0
  const hasTechSkills = skills.technical.length > 0
  const hasSoftSkills = skills.soft.length > 0
  const hasLanguages = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProjects = projects && projects.length > 0

  const contacts = [
    personal.phone,
    personal.email,
    personal.linkedin && personal.linkedin.replace(/https?:\/\/(www\.)?/, ''),
    personal.github && personal.github.replace(/https?:\/\/(www\.)?/, ''),
    personal.address
  ].filter(Boolean) as string[]

  function SectionTitle({ title }: { title: string }) {
    return (
      <div className="w-1/4 shrink-0 pr-6">
        <h2 className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#F97316] mt-1">{title}</h2>
      </div>
    )
  }

  function Row({ title, children, isLast = false }: { title: string; children: React.ReactNode; isLast?: boolean }) {
    return (
      <div className={`flex flex-row py-6 ${isLast ? '' : 'border-b border-gray-100'}`}>
        <SectionTitle title={title} />
        <div className="w-3/4 flex flex-col gap-4">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-gray-800 flex flex-col mx-auto shrink-0 px-[60px] py-[80px] print:w-full print:h-auto print:m-0"
      style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontSize: '9.5pt', lineHeight: 1.6 }}
    >
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-[2.5rem] font-light text-black tracking-tight leading-none mb-4">{personal.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-gray-400 text-[9pt]">
          {contacts.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {/* Summary */}
        {personal.summary?.trim() && (
          <Row title="Profile">
            <p className="text-gray-600 leading-relaxed text-justify">{personal.summary}</p>
          </Row>
        )}

        {/* Experience */}
        {hasExperience && (
          <Row title="Experience">
            {experience.map((exp, i) => (
              <div key={i} className={i !== experience.length - 1 ? 'mb-6' : ''}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[11pt] font-medium text-black">{exp.company}</h3>
                  <span className="text-[8.5pt] text-gray-400 uppercase tracking-wider">{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-[9.5pt] text-gray-500 mb-2 italic">{exp.title}</div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="list-none space-y-1.5 text-gray-600">
                    {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                      <li key={j} className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1 h-1 bg-gray-300 rounded-full" />
                        {bullet.replace(/^[\—\-\•\.\s]+/, "")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Row>
        )}

        {/* Education */}
        {hasEducation && (
          <Row title="Education">
            {education.map((edu, i) => (
              <div key={i} className={i !== education.length - 1 ? 'mb-4' : ''}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[11pt] font-medium text-black">{edu.institution}</h3>
                  <span className="text-[8.5pt] text-gray-400 uppercase tracking-wider">{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                </div>
                <div className="text-[9.5pt] text-gray-500">{edu.degree}{edu.grade ? ` • ${edu.grade}` : ''}</div>
              </div>
            ))}
          </Row>
        )}

        {/* Skills & Other */}
        {(hasTechSkills || hasSoftSkills || hasLanguages || hasCerts) && (
          <Row title="Details" isLast={true}>
            <div className="grid grid-cols-2 gap-6">
              {hasTechSkills && (
                <div>
                  <h4 className="text-[9pt] font-bold text-gray-900 mb-2 uppercase tracking-wide">Technical</h4>
                  <p className="text-gray-600">{skills.technical.join(', ')}</p>
                </div>
              )}
              {hasSoftSkills && (
                <div>
                  <h4 className="text-[9pt] font-bold text-gray-900 mb-2 uppercase tracking-wide">Soft Skills</h4>
                  <p className="text-gray-600">{skills.soft.join(', ')}</p>
                </div>
              )}
              {hasLanguages && (
                <div>
                  <h4 className="text-[9pt] font-bold text-gray-900 mb-2 uppercase tracking-wide">Languages</h4>
                  <p className="text-gray-600">{languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}</p>
                </div>
              )}
              {hasCerts && (
                <div>
                  <h4 className="text-[9pt] font-bold text-gray-900 mb-2 uppercase tracking-wide">Certifications</h4>
                  <p className="text-gray-600">{certifications.join(', ')}</p>
                </div>
              )}
            </div>
          </Row>
        )}
      </div>
    </div>
  )
}
