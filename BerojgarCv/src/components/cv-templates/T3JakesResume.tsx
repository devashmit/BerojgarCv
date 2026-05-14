import { CVData } from '@/types/cv'

export function T3JakesResume({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, projects, languages, certifications } = cvData

  const contacts = [
    personal.phone,
    personal.email,
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''),
    personal.github?.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean) as string[]

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section style={{ marginBottom: 20 }}>
        <h2 style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          borderBottom: '1.5px solid #000',
          paddingBottom: 3,
          marginBottom: 10,
        }}>
          {title}
        </h2>
        {children}
      </section>
    )
  }

  return (
    <div
      id="cv-preview-root"
      style={{
        fontFamily: '"Calibri", "Inter", Arial, sans-serif',
        fontSize: 11,
        color: '#000',
        background: '#fff',
        width: 794,
        minHeight: 1123,
        padding: '48px 56px',
        boxSizing: 'border-box',
        lineHeight: 1.5,
      }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {personal.fullName && (
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.2 }}>
            {personal.fullName}
          </h1>
        )}
        {contacts.length > 0 && (
          <div style={{ fontSize: 10, color: '#444', marginBottom: 3 }}>
            {contacts.join(' | ')}
          </div>
        )}
        {personal.address && (
          <div style={{ fontSize: 10, color: '#444' }}>{personal.address}</div>
        )}
      </div>

      {/* ── Summary ── */}
      {personal.summary?.trim() && (
        <Section title="Professional Summary">
          <p style={{ fontSize: 10.5, textAlign: 'justify', color: '#222', margin: 0 }}>
            {personal.summary}
          </p>
        </Section>
      )}

      {/* ── Education ── */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: i < education.length - 1 ? 12 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 11 }}>
                <span>{edu.institution}</span>
                <span>{edu.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: 10.5, color: '#333' }}>
                <span>{edu.degree}{edu.grade ? `, ${edu.grade}` : ''}</span>
                <span>{edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}</span>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* ── Experience ── */}
      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < experience.length - 1 ? 14 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 11 }}>
                <span>{exp.title}</span>
                <span>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: 10.5, color: '#333', marginBottom: 5 }}>
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              {exp.bullets.filter(b => b.trim()).length > 0 && (
                <ul style={{ margin: '0 0 0 18px', padding: 0, fontSize: 10.5 }}>
                  {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                    <li key={j} style={{ marginBottom: 3, textAlign: 'justify' }}>
                      {bullet.replace(/^[\—\-\•\.\s]+/, '')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── Projects ── */}
      {projects && projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: i < projects.length - 1 ? 10 : 0 }}>
              <div style={{ fontWeight: 700, fontSize: 11 }}>
                {proj.name}
                {proj.technologies.length > 0 && (
                  <span style={{ fontWeight: 400, fontStyle: 'italic', fontSize: 10.5 }}> | {proj.technologies.join(', ')}</span>
                )}
              </div>
              {proj.description && (
                <ul style={{ margin: '3px 0 0 18px', padding: 0, fontSize: 10.5 }}>
                  <li>{proj.description}</li>
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── Skills & Qualifications ── */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || languages.length > 0 || certifications.length > 0) && (
        <Section title="Skills &amp; Qualifications">
          <div style={{ fontSize: 10.5, lineHeight: 1.7 }}>
            {skills.technical.length > 0 && (
              <div><strong>Technical:</strong> {skills.technical.join(' · ')}</div>
            )}
            {skills.soft.length > 0 && (
              <div><strong>Soft Skills:</strong> {skills.soft.join(' · ')}</div>
            )}
            {languages.length > 0 && (
              <div><strong>Languages:</strong> {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' · ')}</div>
            )}
            {certifications.length > 0 && (
              <div><strong>Certifications:</strong> {certifications.join(' · ')}</div>
            )}
          </div>
        </Section>
      )}
    </div>
  )
}
