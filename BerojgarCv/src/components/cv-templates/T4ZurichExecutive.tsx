import { CVData } from '@/types/cv'

// Req 4: Zürich Executive — single-column, sans-serif, thin separators, no colored fills
export function T4ZurichExecutive({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData

  // Req 4.3: contact details on a single line, plain text, no icon elements
  const contacts = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''),
    personal.website?.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean) as string[]

  const s = {
    // Req 4.6: Helvetica/Arial/Inter at 11pt; Req 4.10: 0.5–0.75 inch margins
    wrap: {
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      fontSize: 11,
      color: '#000000',
      background: '#ffffff',
      width: 794,
      minHeight: 1123,
      boxSizing: 'border-box' as const,
      padding: '48px 54px',
      lineHeight: 1.5,
    },
    // Req 4.2: name bold ~16pt at top
    name: {
      fontSize: 22,
      fontWeight: 700,
      color: '#000000',
      margin: '0 0 4px',
      lineHeight: 1.2,
    },
    // Req 4.2: job title in lighter weight on next line
    jobTitle: {
      fontSize: 13,
      fontWeight: 400,
      color: '#333333',
      margin: '0 0 8px',
    },
    // Req 4.3: contact line plain text
    contactLine: {
      fontSize: 10.5,
      color: '#333333',
      margin: '0 0 16px',
    },
    // Req 4.4: thin horizontal separator lines (0.5pt) between sections
    separator: {
      borderTop: '0.5px solid #cccccc',
      margin: '0 0 16px',
    },
    section: {
      marginBottom: 20,
    },
    // Req 4.5: section headings ~12pt bold, min 12px spacing above
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: '#000000',
      margin: '0 0 8px',
      paddingTop: 12,
    },
    // Req 4.7: primary content (names, titles) in black
    entryTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: '#000000',
    },
    // Req 4.7: secondary info (dates, locations) in dark gray #333333
    entryMeta: {
      fontSize: 10.5,
      color: '#333333',
      fontWeight: 400,
    },
    entryDate: {
      fontSize: 10.5,
      color: '#333333',
      fontWeight: 400,
    },
    bullet: {
      fontSize: 10.5,
      color: '#000000',
      lineHeight: 1.5,
      marginBottom: 3,
    },
    body: {
      fontSize: 10.5,
      color: '#333333',
      lineHeight: 1.6,
    },
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={s.section}>
        {/* Req 4.4: thin separator above section */}
        <div style={s.separator} />
        {/* Req 4.5: section heading ~12pt bold */}
        <h2 style={s.sectionTitle}>{title}</h2>
        {children}
      </div>
    )
  }

  return (
    <div id="cv-preview-root" style={s.wrap}>
      {/* Req 4.2: name bold ~16pt, job title lighter weight on next line */}
      {personal.fullName && <h1 style={s.name}>{personal.fullName}</h1>}
      {personal.jobTitle && <p style={s.jobTitle}>{personal.jobTitle}</p>}

      {/* Req 4.3: contact details single line, plain text, no icons */}
      {contacts.length > 0 && (
        <div style={s.contactLine}>{contacts.join('  ·  ')}</div>
      )}

      {/* Req 4.8: personal summary */}
      {personal.summary?.trim() && (
        <Section title="Professional Summary">
          <p style={{ ...s.body, textAlign: 'justify', margin: 0 }}>{personal.summary}</p>
        </Section>
      )}

      {/* Req 4.8: experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={s.entryTitle}>{exp.title}</span>
                {/* Req 4.7: dates in dark gray #333333 — NO chip backgrounds */}
                <span style={s.entryDate}>
                  {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ ...s.entryMeta, marginBottom: 5 }}>
                {exp.company}{exp.location ? ` · ${exp.location}` : ''}
              </div>
              {exp.bullets.filter(b => b.trim()).length > 0 && (
                <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
                  {exp.bullets.filter(b => b.trim()).map((b, j) => (
                    <li key={j} style={s.bullet}>{b.replace(/^[\u2014\u2013\-\u2022\.\s]+/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Req 4.8: education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={s.entryTitle}>{edu.degree}</span>
                <span style={s.entryDate}>
                  {edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}
                </span>
              </div>
              <div style={s.entryMeta}>
                {edu.institution}{edu.location ? ` · ${edu.location}` : ''}
              </div>
              {edu.grade && <div style={{ fontSize: 10.5, color: '#333333', marginTop: 2 }}>Grade: {edu.grade}</div>}
              {edu.description?.trim() && <p style={{ ...s.body, margin: '4px 0 0' }}>{edu.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ ...s.entryTitle, marginBottom: 3 }}>
                {proj.name}
                {proj.technologies.length > 0 && (
                  <span style={{ fontWeight: 400, fontStyle: 'italic', fontSize: 10.5, color: '#333333' }}>
                    {' '}· {proj.technologies.join(', ')}
                  </span>
                )}
              </div>
              {proj.description?.trim() && (
                <p style={{ ...s.body, margin: 0 }}>{proj.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Req 4.8: skills — plain text, NO colored chip backgrounds */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <Section title="Skills">
          {skills.technical.length > 0 && (
            <div style={{ ...s.body, marginBottom: 4 }}>
              <strong>Technical:</strong> {skills.technical.join(', ')}
            </div>
          )}
          {skills.soft.length > 0 && (
            <div style={s.body}>
              <strong>Soft Skills:</strong> {skills.soft.join(', ')}
            </div>
          )}
        </Section>
      )}

      {/* Req 4.8: languages */}
      {languages.length > 0 && (
        <Section title="Languages">
          <div style={s.body}>
            {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join('  ·  ')}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section title="Certifications">
          <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
            {certifications.map((c, i) => (
              <li key={i} style={s.bullet}>{c}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Req 4.8: "References available on request" note */}
      <div style={{ ...s.separator, marginTop: 8 }} />
      <p style={{ fontSize: 10, color: '#666666', fontStyle: 'italic', textAlign: 'center', margin: 0 }}>
        References available on request
      </p>
    </div>
  )
}
