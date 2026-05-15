import { CVData } from '@/types/cv'
import Image from 'next/image'

// Req 5: Dhaka Heritage — Nepal & Gulf market template
// Single-column, no sidebars, Times New Roman/Georgia serif, deep navy accents only
export function T1DhakaHeritage({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects, references } = cvData

  const s = {
    // Req 5.1: single-column, no sidebars; Req 5.7: Times New Roman/Georgia 11pt; Req 5.9: 0.5–0.75in margins
    wrap: {
      fontFamily: '"Times New Roman", "Georgia", serif',
      fontSize: 11,
      color: '#1a1a1a',
      background: '#fff',
      width: 794,
      minHeight: 1123,
      boxSizing: 'border-box' as const,
      padding: '48px 54px',
    },
    // Req 5.2: bold name ~16pt, job title below; Req 5.3: single thin accent line, NO large colored background
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 20,
      marginBottom: 0,
    },
    headerLeft: {
      flex: 1,
    },
    // Req 5.2: bold name ~16pt
    name: {
      fontSize: 22,
      fontWeight: 700,
      color: '#1a1a1a',
      margin: '0 0 4px',
      lineHeight: 1.2,
    },
    // Req 5.2: job title below name
    jobTitle: {
      fontSize: 13,
      color: '#333333',
      margin: '0 0 8px',
      fontWeight: 400,
    },
    contactLine: {
      fontSize: 10.5,
      color: '#333333',
      lineHeight: 1.7,
      margin: '0 0 10px',
    },
    // Req 5.3: single thin accent line in deep navy — NO large colored background block
    accentLine: {
      borderTop: '1.5px solid #1A2744',
      margin: '12px 0 20px',
    },
    // Req 5.6: photo placeholder in top-right of header area
    photoBox: {
      width: 80,
      height: 96,
      border: '1px dashed #1A2744',
      background: '#f8f8f8',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden' as const,
      position: 'relative' as const,
    },
    // Req 5.6: Gulf/Nepal-specific fields block
    gulfFields: {
      fontSize: 10.5,
      color: '#333333',
      lineHeight: 1.7,
      marginBottom: 4,
    },
    // Req 5.5: section headings bold, left-aligned, max 2px solid dark navy left-border accent
    // NO borderBottom on section headings
    section: {
      marginBottom: 20,
    },
    sectionHead: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 8,
      paddingLeft: 8,
      borderLeft: '2px solid #1A2744',
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
      color: '#1a1a1a',
      margin: 0,
    },
    // Req 5.4: body text black/dark gray, NO colored body text
    entryTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: '#111111',
    },
    // Req 5.4: removed red #C0392B — now dark gray
    entryMeta: {
      fontSize: 11,
      color: '#333333',
      fontWeight: 600,
    },
    entryDate: {
      fontSize: 10.5,
      color: '#555555',
    },
    // Req 5.7: 11pt body text; Req 5.4: dark gray
    bullet: {
      fontSize: 11,
      color: '#1a1a1a',
      lineHeight: 1.6,
      marginBottom: 3,
    },
    body2: {
      fontSize: 11,
      color: '#333333',
      lineHeight: 1.6,
    },
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={s.section}>
        {/* Req 5.5: left-border accent, NO borderBottom */}
        <div style={s.sectionHead}>
          <h2 style={s.sectionTitle}>{title}</h2>
        </div>
        {children}
      </div>
    )
  }

  // Req 5.6: collect Gulf/Nepal-specific fields
  const gulfFieldPairs: [string, string][] = []
  if (personal.nationality) gulfFieldPairs.push(['Nationality', personal.nationality])
  if (personal.dateOfBirth) gulfFieldPairs.push(['Date of Birth', personal.dateOfBirth])
  if (personal.visaType) gulfFieldPairs.push(['Visa Status', personal.visaType])
  if (personal.expectedSalaryNPR) gulfFieldPairs.push(['Expected Salary', `NPR ${personal.expectedSalaryNPR.toLocaleString()}`])

  return (
    <div id="cv-preview-root" style={s.wrap}>
      {/* Header — Req 5.2, 5.3, 5.6: name, title, contact, photo placeholder, NO colored background block */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          {personal.fullName && <h1 style={s.name}>{personal.fullName}</h1>}
          {personal.jobTitle && <p style={s.jobTitle}>{personal.jobTitle}</p>}
          <div style={s.contactLine}>
            {[
              personal.email,
              personal.phone,
              personal.address,
              personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''),
              personal.github?.replace(/https?:\/\/(www\.)?/, ''),
              personal.website?.replace(/https?:\/\/(www\.)?/, ''),
            ].filter(Boolean).join('  ·  ')}
          </div>
          {/* Req 5.6: Gulf/Nepal-specific fields inline in header */}
          {gulfFieldPairs.length > 0 && (
            <div style={s.gulfFields}>
              {gulfFieldPairs.map(([label, value]) => (
                <span key={label} style={{ marginRight: 16 }}>
                  <strong>{label}:</strong> {value}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Req 5.6: photo placeholder top-right */}
        <div style={s.photoBox}>
          {personal.photo
            ? <Image src={personal.photo} alt="Profile" fill style={{ objectFit: 'cover' }} />
            : <span style={{ fontSize: 10, color: '#aaa', textAlign: 'center' as const }}>Photo</span>}
        </div>
      </div>

      {/* Req 5.3: single thin accent line in deep navy — replaces any large colored header block */}
      <div style={s.accentLine} />

      {/* Body — Req 5.1: single-column, no sidebars */}
      <div>
        {personal.summary?.trim() && (
          <Section title="Professional Summary">
            <p style={{ ...s.body2, textAlign: 'justify', margin: 0 }}>{personal.summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Work Experience">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={s.entryTitle}>{exp.title}</span>
                  <span style={s.entryDate}>
                    {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}
                  </span>
                </div>
                {/* Req 5.4: entryMeta now dark gray, NOT red */}
                <div style={{ ...s.entryMeta, marginBottom: 5 }}>
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul style={{ margin: '0 0 0 18px', padding: 0 }}>
                    {exp.bullets.filter(b => b.trim()).map((b, j) => (
                      <li key={j} style={s.bullet}>{b.replace(/^[\u2014\-\u2022\.\s]+/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

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
                <div style={s.entryMeta}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</div>
                {edu.grade && <div style={{ fontSize: 10.5, color: '#555555', marginTop: 2 }}>Grade: {edu.grade}</div>}
                {edu.description && <p style={{ ...s.body2, margin: '4px 0 0' }}>{edu.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section title="Projects">
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ ...s.entryTitle, marginBottom: 3 }}>
                  {proj.name}
                  {proj.technologies.length > 0 && (
                    <span style={{ fontWeight: 400, fontStyle: 'italic', fontSize: 11, color: '#555555' }}>
                      {' '}· {proj.technologies.join(', ')}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p style={{ ...s.body2, textAlign: 'justify', margin: 0 }}>{proj.description}</p>
                )}
                {proj.link && (
                  <div style={{ fontSize: 10.5, color: '#333333', marginTop: 2 }}>{proj.link.replace(/https?:\/\/(www\.)?/, '')}</div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Req 5.8: NO graphical skill rating elements — plain text only */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <Section title="Skills">
            {skills.technical.length > 0 && (
              <div style={s.body2}><strong>Technical:</strong> {skills.technical.join(' · ')}</div>
            )}
            {skills.soft.length > 0 && (
              <div style={{ ...s.body2, marginTop: 4 }}><strong>Soft Skills:</strong> {skills.soft.join(' · ')}</div>
            )}
          </Section>
        )}

        {languages.length > 0 && (
          <Section title="Languages">
            <div style={s.body2}>
              {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join('  ·  ')}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            <ul style={{ margin: '0 0 0 18px', padding: 0 }}>
              {certifications.map((c, i) => <li key={i} style={s.bullet}>{c}</li>)}
            </ul>
          </Section>
        )}

        {references.length > 0 && (
          <Section title="References">
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 24 }}>
              {references.map((ref, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{ref.name}</div>
                  {ref.title && <div style={{ fontSize: 11, color: '#555555' }}>{ref.title}</div>}
                  {ref.contact && <div style={{ fontSize: 10.5, color: '#666666' }}>{ref.contact}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {cvData.referencesOnRequest && references.length === 0 && (
          <p style={{ fontSize: 10.5, color: '#888888', fontStyle: 'italic', marginTop: 8 }}>
            References available upon request.
          </p>
        )}
      </div>
    </div>
  )
}
