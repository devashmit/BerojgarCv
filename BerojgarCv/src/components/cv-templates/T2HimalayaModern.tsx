import { CVData } from '@/types/cv'
import Image from 'next/image'

export function T2HimalayaModern({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData

  const SIDEBAR_W = 210
  // Req 6.4: single accent color #2B6CB0 (soft blue) for section heading text only
  const ACCENT = '#2B6CB0'
  const SIDEBAR_BG = '#1A3A5C'

  function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#93C5FD', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 5, marginBottom: 10 }}>{title}</h3>
        {children}
      </div>
    )
  }

  function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={{ marginBottom: 22 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, borderBottom: `2px solid #E5E7EB`, paddingBottom: 5, marginBottom: 14 }}>{title}</h3>
        {children}
      </div>
    )
  }

  return (
    <div id="cv-preview-root" style={{ fontFamily: '"Inter", Arial, sans-serif', fontSize: 13, color: '#1a1a1a', background: '#fff', width: 794, minHeight: 1123, display: 'flex', boxSizing: 'border-box' as const }}>

      {/* Sidebar */}
      <div style={{ width: SIDEBAR_W, background: SIDEBAR_BG, color: '#fff', flexShrink: 0, padding: '36px 20px 36px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Photo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.25)', marginBottom: 12, background: 'rgba(255,255,255,0.1)', position: 'relative', flexShrink: 0 }}>
            {personal.photo
              ? <Image src={personal.photo} alt="Profile" fill style={{ objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.4)' }} />}
          </div>
          {personal.fullName && <h2 style={{ fontSize: 14, fontWeight: 700, textAlign: 'center', lineHeight: 1.3, margin: '0 0 4px' }}>{personal.fullName}</h2>}
          {personal.jobTitle && <p style={{ fontSize: 10.5, color: '#93C5FD', textAlign: 'center', margin: 0 }}>{personal.jobTitle}</p>}
        </div>

        {/* Contact */}
        <SideSection title="Contact">
          <div style={{ fontSize: 10.5, color: '#DBEAFE', lineHeight: 1.8 }}>
            {personal.email && <div>✉ {personal.email}</div>}
            {personal.phone && <div>☎ {personal.phone}</div>}
            {personal.address && <div>⌂ {personal.address}</div>}
            {personal.linkedin && <div>in {personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</div>}
            {personal.github && <div>⌥ {personal.github.replace(/https?:\/\/(www\.)?/, '')}</div>}
          </div>
        </SideSection>

        {skills.technical.length > 0 && (
          <SideSection title="Technical Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.technical.map((s, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 3, border: '1px solid rgba(255,255,255,0.15)' }}>{s}</span>
              ))}
            </div>
          </SideSection>
        )}

        {skills.soft.length > 0 && (
          <SideSection title="Soft Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.soft.map((s, i) => (
                <span key={i} style={{ background: 'rgba(147,197,253,0.2)', color: '#BFDBFE', fontSize: 10, padding: '2px 8px', borderRadius: 3 }}>{s}</span>
              ))}
            </div>
          </SideSection>
        )}

        {languages.length > 0 && (
          <SideSection title="Languages">
            {languages.map((l, i) => (
              <div key={i} style={{ fontSize: 10.5, marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{l.language}</div>
                {l.proficiency && <div style={{ fontSize: 10, color: '#93C5FD' }}>{l.proficiency}</div>}
              </div>
            ))}
          </SideSection>
        )}

        {certifications.length > 0 && (
          <SideSection title="Certifications">
            {certifications.map((c, i) => (
              <div key={i} style={{ fontSize: 10.5, color: '#DBEAFE', marginBottom: 5, lineHeight: 1.5 }}>▸ {c}</div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '36px 40px', background: '#FAFBFC', borderTop: `3px solid ${SIDEBAR_BG}` }}>
        {personal.summary?.trim() && (
          <p style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.65, textAlign: 'justify', marginBottom: 22 }}>{personal.summary}</p>
        )}

        {experience.length > 0 && (
          <MainSection title="Work Experience">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: `2px solid #E5E7EB`, position: 'relative' }}>
                <div style={{ position: 'absolute', width: 9, height: 9, borderRadius: '50%', background: SIDEBAR_BG, left: -5, top: 5, border: '2px solid #fff' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <strong style={{ fontSize: 13, color: '#111' }}>{exp.title}</strong>
                  <span style={{ fontSize: 11, color: '#6B7280', marginLeft: 8, whiteSpace: 'nowrap' }}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: 12, color: '#374151', fontWeight: 600, marginBottom: 6 }}>{exp.company}{exp.location ? <span style={{ color: '#9CA3AF', fontWeight: 400 }}> · {exp.location}</span> : null}</div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul style={{ margin: '0 0 0 16px', padding: 0, fontSize: 12, color: '#4B5563' }}>
                    {exp.bullets.filter(b => b.trim()).map((b, j) => <li key={j} style={{ marginBottom: 3, lineHeight: 1.55 }}>{b.replace(/^[\—\-\•\.\s]+/, '')}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education">
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid #E5E7EB`, position: 'relative' }}>
                <div style={{ position: 'absolute', width: 9, height: 9, borderRadius: '50%', background: SIDEBAR_BG, left: -5, top: 5, border: '2px solid #fff' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <strong style={{ fontSize: 13, color: '#111' }}>{edu.degree}</strong>
                  <span style={{ fontSize: 11, color: '#6B7280', marginLeft: 8, whiteSpace: 'nowrap' }}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</span>
                </div>
                <div style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{edu.institution}{edu.location ? <span style={{ color: '#9CA3AF', fontWeight: 400 }}> · {edu.location}</span> : null}</div>
                {edu.grade && <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Grade: {edu.grade}</div>}
              </div>
            ))}
          </MainSection>
        )}

        {projects && projects.length > 0 && (
          <MainSection title="Projects">
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <strong style={{ fontSize: 13, color: '#111' }}>{proj.name}</strong>
                {proj.technologies.length > 0 && <span style={{ fontSize: 11.5, color: '#6B7280', fontStyle: 'italic' }}> · {proj.technologies.join(', ')}</span>}
                {proj.description && <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.55, margin: '4px 0 0', textAlign: 'justify' }}>{proj.description}</p>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  )
}
