import { CVData } from '@/types/cv'

export function T3JakesResume({ cvData }: { cvData: CVData }) {
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
    personal.website && personal.website.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean) as string[]

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section>
        <h2 className="uppercase font-bold text-[11.5pt] border-b-[1.5px] border-black pb-[2px] mb-2.5 tracking-[0.05em]">{title}</h2>
        {children}
      </section>
    )
  }

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-[10.5pt] font-sans text-black flex flex-col mx-auto shrink-0 px-[40px] py-[40px]"
      style={{ fontFamily: '"Inter", "Roboto", system-ui, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        {personal.fullName && <h1 className="text-[22pt] font-bold mb-1.5 leading-tight">{personal.fullName}</h1>}
        {contacts.length > 0 && (
          <div className="text-[9.5pt] text-gray-600">{contacts.join(' | ')}</div>
        )}
        {personal.address && <div className="text-[9.5pt] text-gray-600 mt-0.5">{personal.address}</div>}
      </div>

      <div className="flex flex-col gap-[18px]">

        {/* Summary */}
        {personal.summary?.trim() && (
          <Section title="Professional Summary">
            <p className="text-justify leading-relaxed text-[10.5pt] text-gray-800">{personal.summary}</p>
          </Section>
        )}

        {/* Education */}
        {hasEducation && (
          <Section title="Education">
            {education.map((edu, i) => (
              <div key={i} className="mb-2.5">
                <div className="flex justify-between font-bold text-[10.5pt]">
                  <span>{edu.institution}</span>
                  <span className="text-right">{edu.location}</span>
                </div>
                <div className="flex justify-between italic text-[10pt]">
                  <span>{edu.degree}{edu.grade ? `, ${edu.grade}` : ''}</span>
                  <span>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Experience */}
        {hasExperience && (
          <Section title="Work Experience">
            {experience.map((exp, i) => (
              <div key={i} className="mb-3.5">
                <div className="flex justify-between font-bold text-[10.5pt]">
                  <span>{exp.title}</span>
                  <span className="text-right">{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between italic mb-1 text-[10pt]">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt]">
                    {exp.bullets.filter(b => b.trim()).map((bullet, j) => <li key={j} className="text-justify">{bullet.replace(/^[\—\-\•\.\s]+/, "")}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {hasProjects && (
          <Section title="Projects">
            {projects!.map((proj, i) => (
              <div key={i} className="mb-2.5">
                <div className="font-bold flex gap-2 items-baseline text-[10.5pt]">
                  <span>{proj.name}</span>
                  {proj.technologies.length > 0 && (
                    <span className="font-normal italic text-[10pt]">| {proj.technologies.join(', ')}</span>
                  )}
                  {proj.link && <span className="font-normal text-[9.5pt] text-gray-500">| {proj.link}</span>}
                </div>
                {proj.description && (
                  <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt] mt-0.5">
                    <li>{proj.description}</li>
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Skills, Certifications & Languages */}
        {(hasTechSkills || hasSoftSkills || hasLanguages || hasCerts) && (
          <Section title="Skills &amp; Qualifications">
            <div className="text-[10.5pt] leading-relaxed space-y-0.5">
              {hasTechSkills && <div><strong>Technical:</strong> {skills.technical.join(' · ')}</div>}
              {hasSoftSkills && <div><strong>Soft Skills:</strong> {skills.soft.join(' · ')}</div>}
              {hasLanguages && <div><strong>Languages:</strong> {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' · ')}</div>}
              {hasCerts && <div><strong>Certifications:</strong> {certifications.join(' · ')}</div>}
            </div>
          </Section>
        )}

      </div>
    </div>
  )
}
