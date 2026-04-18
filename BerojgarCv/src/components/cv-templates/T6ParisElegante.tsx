import { CVData } from '@/types/cv'

export function T6ParisElegante({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData

  const hasExperience = experience.length > 0
  const hasEducation = education.length > 0
  const hasTechSkills = skills.technical.length > 0
  const hasSoftSkills = skills.soft.length > 0
  const hasLanguages = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProjects = projects && projects.length > 0

  const contacts = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin && personal.linkedin.replace(/https?:\/\/(www\.)?/, ''),
    personal.website && personal.website.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean) as string[]

  const Ornament = () => (
    <div className="flex items-center justify-center gap-2 opacity-50 my-4">
      <div className="w-14 h-[1px] bg-[#C19A6B]" />
      <div className="w-2 h-2 rotate-45 border border-[#C19A6B]" />
      <div className="w-14 h-[1px] bg-[#C19A6B]" />
    </div>
  )

  function LeftSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section>
        <h2 className="text-[#C19A6B] font-bold uppercase tracking-[0.12em] text-[10.5pt] border-b border-[#E5DFD5] pb-1.5 mb-3.5">
          {title}
        </h2>
        {children}
      </section>
    )
  }

  function RightSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section>
        <h2 className="text-[#C19A6B] font-bold uppercase tracking-[0.12em] text-[9.5pt] border-b border-[#E5DFD5] pb-1.5 mb-3">
          {title}
        </h2>
        {children}
      </section>
    )
  }

  return (
    <div
      className="bg-[#FAF7F4] w-[794px] min-h-[1123px] text-[10pt] font-serif text-[#333333] flex flex-col mx-auto shrink-0 px-[56px] py-[48px] relative"
      style={{ fontFamily: '"Georgia", "Noto Serif", serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {/* Thin gold top border */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C19A6B] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C19A6B] to-transparent" />

      {/* Header */}
      <div className="text-center mb-2">
        {personal.fullName && (
          <h1 className="text-[24pt] font-bold text-[#2C2C2C] tracking-wide mb-1 leading-tight">{personal.fullName}</h1>
        )}
        {personal.jobTitle && (
          <p className="text-justify text-[11pt] text-[#C19A6B] font-medium tracking-[0.2em] uppercase">{personal.jobTitle}</p>
        )}
        <Ornament />
        {contacts.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9pt] text-[#555] tracking-wider uppercase">
            {contacts.map((c, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="mr-3 text-[#C19A6B]">·</span>}
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {personal.summary?.trim() && (
        <div className="text-justify leading-relaxed text-[10.5pt] text-[#444] my-5 italic px-4">
          <p>{personal.summary}</p>
        </div>
      )}

      <div className="absolute left-[40px] right-[240px] top-0 bottom-0 pointer-events-none" />

      {/* Two-column body */}
      <div className="flex gap-10 flex-1">

        {/* Left — main content */}
        <div className="flex-1 flex flex-col gap-[20px] min-w-0">

          {hasExperience && (
            <LeftSection title="Expérience Professionnelle">
              <div className="flex flex-col gap-[16px]">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="mb-1.5">
                      <h3 className="font-bold text-[12pt] text-[#2C2C2C]">{exp.title}</h3>
                      <div className="flex justify-between items-baseline text-[10pt] italic text-[#666]">
                        <span>{exp.company}{exp.company && exp.location ? `, ${exp.location}` : ''}</span>
                        <span className="text-[#C19A6B] font-medium not-italic shrink-0 ml-2">
                          {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.bullets.filter(b => b.trim()).length > 0 && (
                      <ul className="list-disc list-outside pl-4 space-y-1.5 mt-2">
                        {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                          <li key={i} className="text-justify text-[#444] leading-relaxed pl-1 marker:text-[#C19A6B]">
                            {bullet.replace(/^[—\-\•\.\s]+/, '')}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </LeftSection>
          )}

          {hasEducation && (
            <LeftSection title="Formation">
              <div className="flex flex-col gap-[14px]">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[11pt] text-[#2C2C2C]">{edu.degree}</h3>
                    <div className="flex justify-between items-baseline text-[10pt] italic text-[#666]">
                      <span>{edu.institution}{edu.institution && edu.location ? `, ${edu.location}` : ''}</span>
                      <span className="text-[#C19A6B] font-medium not-italic shrink-0 ml-2">{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                    </div>
                    {edu.grade && <div className="text-[#555] mt-0.5 text-[9.5pt]">Grade: {edu.grade}</div>}
                  </div>
                ))}
              </div>
            </LeftSection>
          )}

          {hasProjects && (
            <LeftSection title="Projets">
              <div className="flex flex-col gap-[14px]">
                {projects!.map(proj => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-bold text-[11pt] text-[#2C2C2C]">{proj.name}</h3>
                      {proj.technologies.length > 0 && (
                        <span className="text-[#666] italic text-[9.5pt]">{proj.technologies.join(', ')}</span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-justify text-[#444] leading-relaxed mt-1">
                        {proj.description.replace(/^[—\-\•\.\s]+/, '')}
                      </p>
                    )}
                    {proj.link && <div className="text-[#C19A6B] text-[9pt] mt-0.5 ml-4">{proj.link}</div>}
                  </div>
                ))}
              </div>
            </LeftSection>
          )}
        </div>

        {/* Right — secondary: ~200px */}
        <div className="w-[190px] shrink-0 flex flex-col gap-[18px]">

          {hasTechSkills && (
            <RightSection title="Compétences Techniques">
              <ul className="space-y-1">
                {skills.technical.map(s => <li key={s} className="text-justify text-[#444] text-[9.5pt]">{s}</li>)}
              </ul>
            </RightSection>
          )}

          {hasSoftSkills && (
            <RightSection title="Soft Skills">
              <ul className="space-y-1">
                {skills.soft.map(s => <li key={s} className="text-justify text-[#444] text-[9.5pt]">{s}</li>)}
              </ul>
            </RightSection>
          )}

          {hasLanguages && (
            <RightSection title="Langues">
              <ul className="space-y-2.5">
                {languages.map(l => (
                  <li key={l.language}>
                    <div className="text-[#2C2C2C] font-bold text-[10pt]">{l.language}</div>
                    {l.proficiency && <div className="text-[#C19A6B] italic text-[9pt]">{l.proficiency}</div>}
                  </li>
                ))}
              </ul>
            </RightSection>
          )}

          {hasCerts && (
            <RightSection title="Certifications">
              <ul className="list-disc list-outside pl-3 space-y-1.5 marker:text-[#C19A6B]">
                {certifications.map(c => (
                  <li key={c} className="text-justify text-[#444] leading-snug text-[9.5pt] pl-1">{c}</li>
                ))}
              </ul>
            </RightSection>
          )}

        </div>
      </div>
    </div>
  )
}
