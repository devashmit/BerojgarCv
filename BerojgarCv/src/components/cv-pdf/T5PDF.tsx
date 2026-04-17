// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const GREEN = '#2D4739'
const LG = '#A5C9B3'

const s = StyleSheet.create({
  page: { backgroundColor: '#fff', flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10 },
  sidebar: { width: 158, backgroundColor: GREEN, color: '#fff', padding: 18, flexDirection: 'column', gap: 14 },
  sideLabel: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: LG, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 5 },
  name: { fontSize: 13, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', color: '#fff', marginBottom: 3 },
  jobTitle: { fontSize: 8.5, color: LG, textAlign: 'center', marginBottom: 8 },
  initials: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 8 },
  initialsText: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#fff' },
  contactItem: { fontSize: 8, color: 'rgba(255,255,255,0.85)', marginBottom: 3 },
  pill: { backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10, marginBottom: 3, fontSize: 8, color: '#fff' },
  softPill: { backgroundColor: 'rgba(165,201,179,0.2)', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10, marginBottom: 3, fontSize: 8, color: LG },
  langDot: { width: 5, height: 5, borderRadius: 2.5, marginRight: 2 },
  main: { flex: 1, padding: 26, paddingTop: 30 },
  topStrip: { height: 5, marginHorizontal: -26, marginTop: -30, marginBottom: 18, backgroundColor: GREEN },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: GREEN, textTransform: 'uppercase', letterSpacing: 1, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  expTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111' },
  expMeta: { fontSize: 9.5, color: GREEN, fontFamily: 'Helvetica-Bold', marginTop: 1 },
  dateLine: { fontSize: 8.5, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2, marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  bullet: { flexDirection: 'row', gap: 5, marginTop: 2 },
  bulletDot: { fontSize: 9, width: 8 },
  bulletText: { fontSize: 9.5, color: '#444', flex: 1, lineHeight: 1.45 },
  summaryText: { fontSize: 10, color: '#555', lineHeight: 1.5, borderLeftWidth: 3, borderLeftColor: LG, paddingLeft: 8, marginBottom: 16, fontStyle: 'italic' },
  projectName: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111' },
})

function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <View><Text style={s.sideLabel}>{title}</Text>{children}</View>
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>— {title}</Text>
      {children}
    </View>
  )
}

export function T5PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, certifications, projects, languages } = cvData
  const hasExp = experience.length > 0
  const hasEdu = education.length > 0
  const hasTech = skills.technical.length > 0
  const hasSoft = skills.soft.length > 0
  const hasCerts = certifications.length > 0
  const hasProj = projects && projects.length > 0
  const hasLangs = languages.length > 0
  const initials = personal.fullName ? personal.fullName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('') : '?'
  const contacts = [personal.email, personal.phone, personal.address, personal.linkedin?.replace(/https?:\/\/(www\.)?/, '')].filter(Boolean)

  const profDots = (prof: string) => { const m: Record<string, number> = { Native: 5, Fluent: 4, Professional: 3, Conversational: 2, Basic: 1 }; return m[prof] ?? 2 }

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.sidebar}>
          <View style={s.initials}><Text style={s.initialsText}>{initials}</Text></View>
          {personal.fullName ? <Text style={s.name}>{personal.fullName}</Text> : null}
          {personal.jobTitle ? <Text style={s.jobTitle}>{personal.jobTitle}</Text> : null}

          <SideSection title="Contact">
            {contacts.map((c, i) => <Text key={i} style={s.contactItem}>{c}</Text>)}
          </SideSection>

          {hasTech ? <SideSection title="Technical Skills">{skills.technical.map((sk, i) => <Text key={i} style={s.pill}>{sk}</Text>)}</SideSection> : null}
          {hasSoft ? <SideSection title="Soft Skills">{skills.soft.map((sk, i) => <Text key={i} style={s.softPill}>{sk}</Text>)}</SideSection> : null}

          {hasLangs ? (
            <SideSection title="Languages">
              {languages.map((l, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={s.contactItem}>{l.language}</Text>
                  <View style={{ flexDirection: 'row', gap: 2, marginTop: 2 }}>
                    {[1,2,3,4,5].map(d => (
                      <View key={d} style={{ ...s.langDot, backgroundColor: d <= profDots(l.proficiency) ? LG : 'rgba(255,255,255,0.2)' }} />
                    ))}
                  </View>
                </View>
              ))}
            </SideSection>
          ) : null}

          {hasCerts ? (
            <SideSection title="Certifications">
              {certifications.map((c, i) => <Text key={i} style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', marginBottom: 3 }}>▸ {c}</Text>)}
            </SideSection>
          ) : null}
        </View>

        <View style={s.main}>
          <View style={s.topStrip} />
          {personal.summary?.trim() ? <Text style={s.summaryText}>{personal.summary}</Text> : null}

          {hasExp ? (
            <MainSection title="Work Experience">
              {experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 14, paddingLeft: 8 }}>
                  <Text style={s.expTitle}>{exp.title}</Text>
                  <Text style={s.expMeta}>{exp.company}</Text>
                  <Text style={s.dateLine}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}{exp.location ? ` · ${exp.location}` : ''}</Text>
                  {exp.bullets.filter(b => b.trim()).map((b, j) => (
                    <View key={j} style={s.bullet}>
                      <Text style={s.bulletDot}>•</Text>
                      <Text style={s.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </MainSection>
          ) : null}

          {hasEdu ? (
            <MainSection title="Education">
              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 12, paddingLeft: 8 }}>
                  <Text style={s.expTitle}>{edu.degree}</Text>
                  <Text style={s.expMeta}>{edu.institution}</Text>
                  <Text style={s.dateLine}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}{edu.location ? ` · ${edu.location}` : ''}</Text>
                  {edu.grade ? <Text style={{ fontSize: 9.5, color: '#666' }}>Grade: {edu.grade}</Text> : null}
                </View>
              ))}
            </MainSection>
          ) : null}

          {hasProj ? (
            <MainSection title="Projects">
              {projects!.map((proj, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={s.projectName}>{proj.name}{proj.technologies.length > 0 ? ` — ${proj.technologies.join(', ')}` : ''}</Text>
                  {proj.description ? <Text style={{ fontSize: 9.5, color: '#444', marginTop: 2 }}>{proj.description}</Text> : null}
                </View>
              ))}
            </MainSection>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}
