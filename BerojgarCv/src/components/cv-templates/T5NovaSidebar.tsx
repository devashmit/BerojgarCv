import { CVData } from '@/types/cv'

export function T5NovaSidebar({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, projects } = cvData
  const ACCENT = '#2D6A4F'

  const initials = personal.fullName
    ? personal.fullName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')
    : '?'

  function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: ACCENT, marginBottom: 7, borderBottom: `1px solid #D1E8DC`, paddingBottom: 4 }}>{title}</h3>
        {children}
      </div>
    )
  }

  function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={{ marginBottom: 22 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 20, height: 2, background: ACCENT, flexShrink: 0, display: 'inline-block' }} />
          {title}
        </h3>
        {children}
      </div>
    )
  }

  return (
    <div id="cv-preview-root" style={{ fontFamily: '"Inter", Arial, sans-serif', fontSize: 13, color: '#1a1a1a', background: '#fff', width: 794, minHeight: 1123, display: 'flex', boxSizing: 'border-box' as const }}>

      {/* Req 7.5: sidebar background white/very light neutral — NO dark fill */}
      <div style={{ width: 200, background: '#F8FAF9', color: '#1a1a1a', flexShrink: 0, padding: '36px 20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #E5EDE9' }}>
        {/* Req 7.2: NO geometric avatar — plain name + title text only */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
          {personal.fullName && <h2 style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, margin: '0 0 3px', color: '#1a1a1a' }}>{personal.fullName}</h2>}
          {personal.jobTitle && <p style={{ fontSize: 10, color: '#6B7280', margin: '0 0 12px', paddingBottom: 12, borderBottom: `1px solid #D1E8DC`, width: '100%' }}>{personal.jobTitle}</p>}
        </div>

        <SideSection title="Contact">
          <div style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.9 }}>
            {personal.email && <div>✉ {personal.email}</div>}
            {personal.phone && <div>☎ {personal.phone}</div>}
            {personal.address && <div>⌂ {personal.address}</div>}
            {personal.linkedin && <div>in {personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</div>}
            {personal.github && <div>⌥ {personal.github.replace(/https?:\/\/(www\.)?/, '')}</div>}
          </div>
        </SideSection>

        {skills.technical.length > 0 && (
          <SideSection title="Technical Skills">
            <div style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.8 }}>
              {skills.technical.join(', ')}
            </div>
          </SideSection>
        )}

        {skills.soft.length > 0 && (
          <SideSection title="Soft Skills">
            <div style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.8 }}>
              {skills.soft.join(', ')}
            </div>
          </SideSection>
        )}

        {languages.length > 0 && (
          <SideSection title="Languages">
            {languages.map((l, i) => (
              <div key={i} style={{ fontSize: 10.5, marginBottom: 5, color: '#374151' }}>
                <span style={{ fontWeight: 600 }}>{l.language}</span>
                {l.proficiency && <span style={{ color: '#6B7280' }}> — {l.proficiency}</span>}
              </div>
            ))}
          </SideSection>
        )}

        {certifications.length > 0 && (
          <SideSection title="Certifications">
            {certifications.map((c, i) => <div key={i} style={{ fontSize: 10.5, color: '#374151', marginBottom: 5, lineHeight: 1.5 }}>▸ {c}</div>)}
          </SideSection>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '36px 40px', position: 'relative', borderTop: `5px solid ${ACCENT}` }}>
        {personal.summary?.trim() && (
          <p style={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `4px solid #A5C9B3`, paddingLeft: 14, marginBottom: 22 }}>{personal.summary}</p>
        )}

        {experience.length > 0 && (
          <MainSection title="Work Experience">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, paddingLeft: 24, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 5, width: 12, height: 12, borderRadius: '50%', border: `2px solid ${ACCENT}`, background: '#fff' }} />
                <strong style={{ fontSize: 13, color: '#111', display: 'block', marginBottom: 2 }}>{exp.title}</strong>
                <div style={{ fontSize: 12, color: ACCENT, fontWeight: 600, marginBottom: 2 }}>{exp.company}</div>
                <div style={{ fontSize: 10.5, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                  {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}{exp.location ? ` · ${exp.location}` : ''}
                </div>
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
              <div key={i} style={{ marginBottom: 14, paddingLeft: 24, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 5, width: 12, height: 12, borderRadius: '50%', border: `2px solid ${ACCENT}`, background: '#fff' }} />
                <strong style={{ fontSize: 13, color: '#111', display: 'block', marginBottom: 2 }}>{edu.degree}</strong>
                <div style={{ fontSize: 12, color: ACCENT, fontWeight: 600, marginBottom: 2 }}>{edu.institution}</div>
                <div style={{ fontSize: 10.5, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}{edu.location ? ` · ${edu.location}` : ''}
                </div>
                {edu.grade && <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 3 }}>Grade: {edu.grade}</div>}
              </div>
            ))}
          </MainSection>
        )}

        {projects && projects.length > 0 && (
          <MainSection title="Projects">
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <strong style={{ fontSize: 13, color: '#111' }}>{proj.name}</strong>
                {proj.technologies.length > 0 && <span style={{ fontSize: 11, color: '#6B7280', fontStyle: 'italic' }}> · {proj.technologies.join(', ')}</span>}
                {proj.description && <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.55, margin: '4px 0 0', textAlign: 'justify' }}>{proj.description}</p>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  )
}
