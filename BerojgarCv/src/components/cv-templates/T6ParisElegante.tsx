import { CVData } from '@/types/cv'

export function T6ParisElegante({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData
  const GOLD = '#C19A6B'
  const BG = '#FAF7F4'

  const contacts = [
    personal.email, personal.phone, personal.address,
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''),
    personal.website?.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean) as string[]

  function Section({ title, children, small }: { title: string; children: React.ReactNode; small?: boolean }) {
    return (
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: small ? 10 : 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: GOLD, borderBottom: `1px solid #E5DFD5`, paddingBottom: 5, marginBottom: 12 }}>{title}</h2>
        {children}
      </div>
    )
  }

  return (
    <div id="cv-preview-root" style={{ fontFamily: '"Georgia", "Times New Roman", serif', fontSize: 13, color: '#333', background: BG, width: 794, minHeight: 1123, padding: '48px 56px', boxSizing: 'border-box' as const, position: 'relative' }}>
      {/* Gold top/bottom borders */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        {personal.fullName && <h1 style={{ fontSize: 26, fontWeight: 700, color: '#2C2C2C', margin: '0 0 6px', lineHeight: 1.2, letterSpacing: '0.05em' }}>{personal.fullName}</h1>}
        {personal.jobTitle && <p style={{ fontSize: 12, color: GOLD, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px' }}>{personal.jobTitle}</p>}
        {/* Ornament */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.5, margin: '12px 0' }}>
          <div style={{ width: 56, height: 1, background: GOLD }} />
          <div style={{ width: 8, height: 8, transform: 'rotate(45deg)', border: `1px solid ${GOLD}` }} />
          <div style={{ width: 56, height: 1, background: GOLD }} />
        </div>
        {contacts.length > 0 && (
          <div style={{ fontSize: 10.5, color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 0' }}>
            {contacts.map((c, i) => (
              <span key={i}>{i > 0 && <span style={{ color: GOLD, margin: '0 10px' }}>·</span>}{c}</span>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {personal.summary?.trim() && (
        <p style={{ fontSize: 12.5, color: '#555', lineHeight: 1.7, textAlign: 'justify', fontStyle: 'italic', padding: '12px 16px', margin: '16px 0' }}>{personal.summary}</p>
      )}

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: 40, marginTop: 8 }}>
        {/* Left — main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {experience.length > 0 && (
            <Section title="Professional Experience">
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#2C2C2C', margin: '0 0 3px' }}>{exp.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontStyle: 'italic', color: '#666', marginBottom: 6 }}>
                    <span>{exp.company}{exp.location ? `, ${exp.location}` : ''}</span>
                    <span style={{ color: GOLD, fontStyle: 'normal', fontWeight: 500, marginLeft: 8, whiteSpace: 'nowrap' }}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul style={{ margin: '0 0 0 16px', padding: 0, fontSize: 12.5, color: '#444' }}>
                      {exp.bullets.filter(b => b.trim()).map((b, j) => <li key={j} style={{ marginBottom: 4, lineHeight: 1.6, textAlign: 'justify' }}>{b.replace(/^[\—\-\•\.\s]+/, '')}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education">
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: '#2C2C2C', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontStyle: 'italic', color: '#666' }}>
                    <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                    <span style={{ color: GOLD, fontStyle: 'normal', fontWeight: 500, marginLeft: 8, whiteSpace: 'nowrap' }}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                  </div>
                  {edu.grade && <div style={{ fontSize: 11, color: '#777', marginTop: 2 }}>Grade: {edu.grade}</div>}
                </div>
              ))}
            </Section>
          )}

          {projects && projects.length > 0 && (
            <Section title="Projects">
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <strong style={{ fontSize: 13, color: '#2C2C2C' }}>{proj.name}</strong>
                  {proj.technologies.length > 0 && <span style={{ fontSize: 11.5, color: '#888', fontStyle: 'italic' }}> · {proj.technologies.join(', ')}</span>}
                  {proj.description && <p style={{ fontSize: 12.5, color: '#444', lineHeight: 1.6, margin: '4px 0 0', textAlign: 'justify' }}>{proj.description}</p>}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right — secondary */}
        <div style={{ width: 185, flexShrink: 0 }}>
          {skills.technical.length > 0 && (
            <Section title="Technical Skills" small>
              {skills.technical.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#444', marginBottom: 4 }}>{s}</div>)}
            </Section>
          )}
          {skills.soft.length > 0 && (
            <Section title="Soft Skills" small>
              {skills.soft.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#444', marginBottom: 4 }}>{s}</div>)}
            </Section>
          )}
          {languages.length > 0 && (
            <Section title="Languages" small>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#2C2C2C' }}>{l.language}</div>
                  {l.proficiency && <div style={{ fontSize: 11, color: GOLD, fontStyle: 'italic' }}>{l.proficiency}</div>}
                </div>
              ))}
            </Section>
          )}
          {certifications.length > 0 && (
            <Section title="Certifications" small>
              {certifications.map((c, i) => <div key={i} style={{ fontSize: 12, color: '#444', marginBottom: 5, lineHeight: 1.5 }}>· {c}</div>)}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}
