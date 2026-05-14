import { CVData } from '@/types/cv'
import Image from 'next/image'

export function T1DhakaHeritage({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects, references } = cvData

  const s = {
    wrap: { fontFamily: '"Georgia", "Times New Roman", serif', fontSize: 14, color: '#1a1a1a', background: '#fff', width: 794, minHeight: 1123, boxSizing: 'border-box' as const },
    header: { background: '#fff', borderBottom: '3px solid #1A2744', padding: '36px 56px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 },
    name: { fontSize: 22, fontWeight: 700, color: '#1A2744', margin: '0 0 4px', lineHeight: 1.2 },
    jobTitle: { fontSize: 13, color: '#444', margin: '0 0 10px', fontWeight: 400 },
    contactLine: { fontSize: 11, color: '#555', lineHeight: 1.8 },
    photoBox: { width: 80, height: 96, border: '1px dashed #1A2744', background: '#f8f8f8', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' as const, position: 'relative' as const },
    body: { padding: '32px 56px 40px' },
    sectionHead: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, borderBottom: '1.5px solid #1A2744', paddingBottom: 4 },
    sectionTitle: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#1A2744', margin: 0 },
    section: { marginBottom: 22 },
    entryTitle: { fontSize: 13, fontWeight: 700, color: '#111' },
    entryMeta: { fontSize: 11.5, color: '#C0392B', fontWeight: 600 },
    entryDate: { fontSize: 11, color: '#666' },
    bullet: { fontSize: 12, color: '#333', lineHeight: 1.6, marginBottom: 3 },
    body2: { fontSize: 12, color: '#333', lineHeight: 1.6 },
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={s.section}>
        <div style={s.sectionHead}>
          <h2 style={s.sectionTitle}>{title}</h2>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div id="cv-preview-root" style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        <div style={{ flex: 1 }}>
          {personal.fullName && <h1 style={s.name}>{personal.fullName}</h1>}
          {personal.jobTitle && <p style={s.jobTitle}>{personal.jobTitle}</p>}
          <div style={s.contactLine}>
            {[personal.email, personal.phone, personal.address, personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''), personal.github?.replace(/https?:\/\/(www\.)?/, '')].filter(Boolean).join('  ·  ')}
          </div>
        </div>
        <div style={s.photoBox}>
          {personal.photo
            ? <Image src={personal.photo} alt="Profile" fill style={{ objectFit: 'cover' }} />
            : <span style={{ fontSize: 10, color: '#aaa' }}>Photo</span>}
        </div>
      </div>

      {/* Body */}
      <div style={s.body}>
        {personal.summary?.trim() && (
          <Section title="Professional Summary">
            <p style={{ ...s.body2, textAlign: 'justify' }}>{personal.summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Work Experience">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={s.entryTitle}>{exp.title}</span>
                  <span style={s.entryDate}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ ...s.entryMeta, marginBottom: 6 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul style={{ margin: '0 0 0 18px', padding: 0 }}>
                    {exp.bullets.filter(b => b.trim()).map((b, j) => (
                      <li key={j} style={s.bullet}>{b.replace(/^[\—\-\•\.\s]+/, '')}</li>
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
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={s.entryTitle}>{edu.degree}</span>
                  <span style={s.entryDate}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                </div>
                <div style={s.entryMeta}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</div>
                {edu.grade && <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Grade: {edu.grade}</div>}
              </div>
            ))}
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section title="Projects">
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ ...s.entryTitle, marginBottom: 4 }}>
                  {proj.name}{proj.technologies.length > 0 ? <span style={{ fontWeight: 400, fontStyle: 'italic', fontSize: 12, color: '#555' }}> · {proj.technologies.join(', ')}</span> : null}
                </div>
                {proj.description && <p style={{ ...s.body2, textAlign: 'justify' }}>{proj.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <Section title="Skills">
            {skills.technical.length > 0 && <div style={s.body2}><strong>Technical:</strong> {skills.technical.join(' · ')}</div>}
            {skills.soft.length > 0 && <div style={s.body2}><strong>Soft Skills:</strong> {skills.soft.join(' · ')}</div>}
          </Section>
        )}

        {languages.length > 0 && (
          <Section title="Languages">
            <div style={s.body2}>{languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join('  ·  ')}</div>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {references.map((ref, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{ref.name}</div>
                  {ref.title && <div style={{ fontSize: 11.5, color: '#555' }}>{ref.title}</div>}
                  {ref.contact && <div style={{ fontSize: 11, color: '#777' }}>{ref.contact}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {cvData.referencesOnRequest && references.length === 0 && (
          <p style={{ fontSize: 11, color: '#999', fontStyle: 'italic', marginTop: 8 }}>References available upon request.</p>
        )}
      </div>
    </div>
  )
}
