import { CVData } from '@/types/cv'

export function T6ParisElegante({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const contacts = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin && personal.linkedin.replace(/https?:\/\/(www\.)?/, '')
  ].filter(Boolean)

  const Ornament = () => (
    <div className="flex items-center justify-center gap-2 opacity-60 my-5">
      <div className="w-16 h-[1px] bg-[#C19A6B]" />
      <div className="w-2 h-2 rotate-45 border border-[#C19A6B]" />
      <div className="w-16 h-[1px] bg-[#C19A6B]" />
    </div>
  )

  return (
    <div className="bg-[#FAF7F4] min-h-[297mm] w-[210mm] text-[10pt] font-serif text-[#333333] flex flex-col mx-auto shrink-0 shadow-lg p-14 relative selection:bg-[#C19A6B] selection:text-white">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-[28pt] font-bold text-[#2C2C2C] tracking-wide mb-2" style={{ fontFamily: 'Noto Serif, serif' }}>
          {personal.fullName}
        </h1>
        <p className="text-[12pt] text-[#C19A6B] font-medium tracking-[0.2em] uppercase">{personal.jobTitle}</p>
        
        <Ornament />
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[9.5pt] text-[#555] tracking-wider uppercase">
          {contacts.map((c, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-4 text-[#C19A6B] text-[1.2em]">·</span>}
              {c}
            </span>
          ))}
        </div>
      </div>

      {personal.summary && (
        <div className="text-center leading-relaxed text-[11pt] text-[#444] mb-8 max-w-2xl mx-auto italic px-6">
          <p>{personal.summary}</p>
        </div>
      )}

      {/* Two-column Layout for body */}
      <div className="flex gap-12 flex-1">
        
        {/* Left Column - Main Content (Experience & Education) */}
        <div className="flex-1 flex flex-col gap-8">
          
          <Section title="Expérience Professionnelle">
            <div className="flex flex-col gap-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="mb-2">
                    <h3 className="font-bold text-[13pt] text-[#2C2C2C] mb-0.5">{exp.title}</h3>
                    <div className="flex justify-between items-baseline text-[10.5pt] italic text-[#666]">
                      <span>{exp.company}, {exp.location}</span>
                      <span className="text-[#C19A6B] font-medium not-italic">{exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#444] leading-relaxed">
                        <span className="text-[#C19A6B] font-bold mt-[1px]">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Formation">
            <div className="flex flex-col gap-5">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[12pt] text-[#2C2C2C] mb-0.5">{edu.degree}</h3>
                  <div className="flex justify-between items-baseline text-[10.5pt] italic text-[#666]">
                    <span>{edu.institution}, {edu.location}</span>
                    <span className="text-[#C19A6B] font-medium not-italic">{edu.startYear} – {edu.endYear}</span>
                  </div>
                  {edu.grade && <div className="text-[#555] mt-1 text-[9.5pt]">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </Section>

        </div>

        {/* Right Column - Secondary Content (Skills, Languages) */}
        <div className="w-[200px] shrink-0 flex flex-col gap-8">
          
          <Section title="Compétences">
            <div className="flex flex-col gap-3">
              <div>
                <strong className="block text-[10pt] uppercase text-[#666] tracking-wider mb-2">Technical</strong>
                <ul className="space-y-1">
                  {skills.technical.map(s => <li key={s} className="text-[#444]">{s}</li>)}
                </ul>
              </div>
              <div className="mt-2">
                <strong className="block text-[10pt] uppercase text-[#666] tracking-wider mb-2">Soft Skills</strong>
                <ul className="space-y-1">
                  {skills.soft.map(s => <li key={s} className="text-[#444]">{s}</li>)}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Langues">
            <ul className="space-y-3">
              {languages.map(l => (
                <li key={l.language}>
                  <div className="text-[#2C2C2C] font-bold mb-0.5">{l.language}</div>
                  <div className="text-[#C19A6B] italic text-[9.5pt]">{l.proficiency}</div>
                </li>
              ))}
            </ul>
          </Section>

          {cvData.certifications.length > 0 && (
            <Section title="Certifications">
              <ul className="space-y-2">
                {cvData.certifications.map(c => (
                  <li key={c} className="text-[#444] leading-snug">— {c}</li>
                ))}
              </ul>
            </Section>
          )}

        </div>

      </div>

    </div>
  )

  function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
      <section>
        <h2 className="text-[#C19A6B] font-bold uppercase tracking-[0.15em] text-[11pt] border-b border-[#E5DFD5] pb-2 mb-4">
          {title}
        </h2>
        {children}
      </section>
    )
  }
}
