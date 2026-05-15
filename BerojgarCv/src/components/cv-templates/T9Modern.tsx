import { CVData } from '@/types/cv'
import React from 'react'

export function T9Modern({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, projects, languages, certifications } = cvData

  const hasExperience = experience.length > 0
  const hasEducation = education.length > 0
  const hasTechSkills = skills.technical.length > 0
  const hasSoftSkills = skills.soft.length > 0
  const hasLanguages = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProjects = projects && projects.length > 0

  function SectionTitle({ title }: { title: string }) {
    return (
      <div className="mb-4">
        <h2 className="uppercase font-bold text-[13pt] text-gray-800 tracking-wide">{title}</h2>
        <div className="w-8 h-1 bg-indigo-500 mt-1"></div>
      </div>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-gray-800 flex mx-auto shrink-0 print:w-full print:h-auto print:m-0"
      style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontSize: '10pt', lineHeight: 1.5 }}
    >
      {/* LEFT SIDEBAR (30%) */}
      <div className="w-[30%] bg-indigo-600 text-white p-[32px] flex flex-col gap-8 print:bg-indigo-600 print:text-white" style={{ backgroundColor: '#4F46E5', color: '#ffffff' }}>
        
        {/* Photo & Name */}
        <div className="flex flex-col gap-4 text-center items-center">
          {personal.photo && (
            <img src={personal.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400" />
          )}
          <div>
            <h1 className="text-[22pt] font-extrabold leading-none mb-2">{personal.fullName}</h1>
            <div className="text-[11pt] font-medium text-indigo-200">{personal.jobTitle}</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 text-[9.5pt]">
          <h2 className="text-[12pt] font-bold border-b border-indigo-400 pb-1 uppercase tracking-wide">Contact</h2>
          {personal.phone && <div>📞 {personal.phone}</div>}
          {personal.email && <div>✉️ {personal.email}</div>}
          {personal.address && <div>📍 {personal.address}</div>}
          {personal.linkedin && <div>🔗 {personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</div>}
          {personal.github && <div>💻 {personal.github.replace(/https?:\/\/(www\.)?/, '')}</div>}
        </div>

        {/* Skills */}
        {(hasTechSkills || hasSoftSkills) && (
          <div className="flex flex-col gap-3 text-[9.5pt]">
            <h2 className="text-[12pt] font-bold border-b border-indigo-400 pb-1 uppercase tracking-wide">Skills</h2>
            {hasTechSkills && (
              <div className="flex flex-wrap gap-2">
                {skills.technical.map(s => <span key={s} className="bg-indigo-700 px-2 py-1 rounded text-xs">{s}</span>)}
              </div>
            )}
            {hasSoftSkills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.soft.map(s => <span key={s} className="bg-indigo-700/50 px-2 py-1 rounded text-xs border border-indigo-500">{s}</span>)}
              </div>
            )}
          </div>
        )}

        {/* Languages */}
        {hasLanguages && (
          <div className="flex flex-col gap-2 text-[9.5pt]">
            <h2 className="text-[12pt] font-bold border-b border-indigo-400 pb-1 uppercase tracking-wide">Languages</h2>
            {languages.map(l => (
              <div key={l.language} className="flex justify-between">
                <span>{l.language}</span>
                <span className="text-indigo-200">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* RIGHT CONTENT (70%) */}
      <div className="w-[70%] p-[40px] flex flex-col gap-8 bg-white">
        
        {/* Summary */}
        {personal.summary?.trim() && (
          <section>
            <SectionTitle title="Profile" />
            <p className="text-gray-600 text-justify leading-relaxed">{personal.summary}</p>
          </section>
        )}

        {/* Experience */}
        {hasExperience && (
          <section>
            <SectionTitle title="Experience" />
            <div className="flex flex-col gap-6">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[12pt] font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-[9.5pt] font-bold text-indigo-600">{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[10pt] font-semibold text-gray-500 mb-2">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600">
                      {exp.bullets.filter(b => b.trim()).map((bullet, j) => <li key={j} className="pl-1">{bullet.replace(/^[\—\-\•\.\s]+/, "")}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasEducation && (
          <section>
            <SectionTitle title="Education" />
            <div className="flex flex-col gap-4">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[11pt] font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-[9.5pt] font-bold text-indigo-600">{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                  </div>
                  <div className="text-[10pt] font-semibold text-gray-500">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</div>
                  {edu.grade && <div className="text-[9.5pt] text-gray-500 mt-1">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {hasCerts && (
          <section>
            <SectionTitle title="Certifications" />
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600">
              {certifications.map((cert, i) => <li key={i}>{cert}</li>)}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
