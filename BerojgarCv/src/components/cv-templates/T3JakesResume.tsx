import { CVData } from '@/types/cv'

// Req 3: Jake's Resume — strict ATS single-column, black/white, ▸ bullets, pipe-separated contacts
export function T3JakesResume({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, projects, languages, certifications } = cvData

  // Req 3.3: contact details pipe-separated, no icons
  const contacts = [
    personal.phone,
    personal.email,
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''),
    personal.github?.replace(/https?:\/\/(www\.)?/, ''),
    personal.website?.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean) as string[]

  // Req 3.4: bold uppercase heading + full-width 1px solid black rule
  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section style={{ marginBottom: 18 }}>
        <div style={{ marginBottom: 6 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            color: '#000000',
            marginBottom: 2,
          }}>
            {title}
          </div>
          {/* Full-width 1px solid black horizontal rule */}
          <div style={{ borderBottom: '1px solid #000000', width: '100%' }} />
        </div>
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
        color: '#000000',
        background: '#ffffff',
        width: 794,
        minHeight: 1123,
        // Req 3.11: 0.5–0.75 inch margins (48px ≈ 0.5in)
        padding: '48px 54px',
        boxSizing: 'border-box' as const,
        lineHeight: 1.5,
      }}
    >
      {/* Req 3.2: Name centered, bold, ~18–20pt */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        {personal.fullName && (
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.2,
            marginBottom: 5,
          }}>
            {personal.fullName}
          </div>
        )}
        {/* Req 3.3: single line, pipe-separated, NO icons, all black */}
        {contacts.length > 0 && (
          <div style={{ fontSize: 10.5, color: '#000000' }}>
            {contacts.join(' | ')}
          </div>
        )}
        {personal.address && (
          <div style={{ fontSize: 10.5, color: '#000000', marginTop: 2 }}>
            {personal.address}
          </div>
        )}
      </div>

      {/* Req 3.8: Section order: Education → Experience → Projects → Technical Skills */}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: i < education.length - 1 ? 10 : 0 }}>
              {/* Institution left, dates right-aligned (Req 3.9) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: 11, color: '#000000' }}>
                <span>{edu.institution}</span>
                <span style={{ fontWeight: 400, fontSize: 10.5 }}>
                  {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontStyle: 'italic', fontSize: 10.5, color: '#000000' }}>
                <span>{edu.degree}{edu.grade ? `, ${edu.grade}` : ''}</span>
                <span style={{ fontStyle: 'normal' }}>{edu.location}</span>
              </div>
              {edu.description?.trim() && (
                <div style={{ fontSize: 10.5, color: '#000000', marginTop: 2 }}>{edu.description}</div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < experience.length - 1 ? 12 : 0 }}>
              {/* Role title left, dates right-aligned on same line (Req 3.9) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: 11, color: '#000000' }}>
                <span>{exp.title}</span>
                <span style={{ fontWeight: 400, fontSize: 10.5 }}>
                  {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}
                </span>
              </div>
              {/* Company left, location right */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontStyle: 'italic', fontSize: 10.5, color: '#000000', marginBottom: 4 }}>
                <span>{exp.company}</span>
                <span style={{ fontStyle: 'normal' }}>{exp.location}</span>
              </div>
              {/* Req 3.5: ▸ character bullets — NO <ul>/<li>, NO SVG */}
              {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', fontSize: 10.5, color: '#000000', marginBottom: 2 }}>
                  <span style={{ marginRight: 6, flexShrink: 0, lineHeight: 1.5 }}>▸</span>
                  <span style={{ textAlign: 'justify' as const }}>
                    {bullet.replace(/^[\u2014\u2013\-\u2022\.\s]+/, '')}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: i < projects.length - 1 ? 10 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: 11, color: '#000000' }}>
                <span>
                  {proj.name}
                  {proj.technologies.length > 0 && (
                    <span style={{ fontWeight: 400, fontStyle: 'italic', fontSize: 10.5 }}>
                      {' '}| {proj.technologies.join(', ')}
                    </span>
                  )}
                </span>
                {proj.link && (
                  <span style={{ fontWeight: 400, fontSize: 10, fontStyle: 'normal' }}>
                    {proj.link.replace(/https?:\/\/(www\.)?/, '')}
                  </span>
                )}
              </div>
              {proj.description?.trim() && (
                <div style={{ display: 'flex', alignItems: 'flex-start', fontSize: 10.5, color: '#000000', marginTop: 2 }}>
                  <span style={{ marginRight: 6, flexShrink: 0, lineHeight: 1.5 }}>▸</span>
                  <span>{proj.description}</span>
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Req 3.8: Technical Skills — last section */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || languages.length > 0 || certifications.length > 0) && (
        <Section title="Technical Skills">
          <div style={{ fontSize: 10.5, color: '#000000', lineHeight: 1.7 }}>
            {skills.technical.length > 0 && (
              <div><strong>Languages &amp; Frameworks:</strong> {skills.technical.join(', ')}</div>
            )}
            {skills.soft.length > 0 && (
              <div><strong>Soft Skills:</strong> {skills.soft.join(', ')}</div>
            )}
            {languages.length > 0 && (
              <div><strong>Languages:</strong> {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}</div>
            )}
            {certifications.length > 0 && (
              <div><strong>Certifications:</strong> {certifications.join(', ')}</div>
            )}
          </div>
        </Section>
      )}
    </div>
  )
}
