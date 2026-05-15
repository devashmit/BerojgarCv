import { CVData } from '@/types/cv'
import React from 'react'

export function T8Classic({ cvData }: { cvData: CVData }) {
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

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section className="mb-6 print:mb-6">
        <h2 className="uppercase font-bold text-[12pt] border-b border-[#333333] pb-1 mb-3 tracking-widest text-[#222222]">{title}</h2>
        {children}
      </section>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-[#333333] flex flex-col mx-auto shrink-0 px-[76px] py-[76px] print:p-0 print:w-full print:h-auto"
      style={{ fontFamily: 'var(--font-lora), serif', fontSize: '10pt', lineHeight: 1.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        {personal.fullName && <h1 className="text-[2rem] font-bold mb-2 text-black leading-tight" style={{ fontFamily: 'var(--font-fraunces), serif' }}>{personal.fullName}</h1>}
        {contacts.length > 0 && (
          <div className="text-[10pt] text-[#444444]">{contacts.join('  •  ')}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {/* Summary */}
        {personal.summary?.trim() && (
          <Section title="Professional Summary">
            <p className="text-justify">{personal.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {hasExperience && (
          <Section title="Professional Experience">
            {experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between font-bold text-[11pt] text-black">
                  <span>{exp.title}</span>
                  <span className="font-normal text-[10pt]">{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between italic text-[10pt] mb-2">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="list-disc list-outside ml-6 space-y-1">
                    {exp.bullets.filter(b => b.trim()).map((bullet, j) => <li key={j} className="text-justify pl-1">{bullet.replace(/^[\—\-\•\.\s]+/, "")}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {hasEducation && (
          <Section title="Education">
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between font-bold text-[11pt] text-black">
                  <span>{edu.institution}</span>
                  <span className="font-normal text-[10pt]">{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                </div>
                <div className="flex justify-between text-[10pt]">
                  <span>{edu.degree}{edu.grade ? `, ${edu.grade}` : ''}</span>
                  <span className="italic">{edu.location}</span>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {hasProjects && (
          <Section title="Projects">
            {projects!.map((proj, i) => (
              <div key={i} className="mb-3">
                <div className="font-bold text-[11pt] text-black">
                  {proj.name}
                  {proj.technologies.length > 0 && (
                    <span className="font-normal italic text-[10pt] text-[#555] ml-2">({proj.technologies.join(', ')})</span>
                  )}
                </div>
                {proj.description && (
                  <p className="mt-1">{proj.description}</p>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {(hasTechSkills || hasSoftSkills || hasLanguages || hasCerts) && (
          <Section title="Additional Information">
            <div className="space-y-1.5">
              {hasTechSkills && <div><strong>Technical Skills:</strong> {skills.technical.join(', ')}</div>}
              {hasSoftSkills && <div><strong>Soft Skills:</strong> {skills.soft.join(', ')}</div>}
              {hasLanguages && <div><strong>Languages:</strong> {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}</div>}
              {hasCerts && <div><strong>Certifications:</strong> {certifications.join(', ')}</div>}
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}
