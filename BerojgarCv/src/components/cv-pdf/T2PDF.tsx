// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const NAVY = '#1A3A5C'
const BLUE = '#3A7CA5'

const s = StyleSheet.create({
  page: { backgroundColor: '#fff', flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10 },
  sidebar: { width: 168, backgroundColor: NAVY, color: '#fff', padding: 20, flexDirection: 'column', gap: 16 },
  sideTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#90C4E8', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.15)', paddingBottom: 4 },
  name: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', marginBottom: 4 },
  jobTitle: { fontSize: 9, color: '#90C4E8', textAlign: 'center', marginBottom: 12 },
  contactItem: { fontSize: 8.5, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
  pill: { backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, marginBottom: 3, fontSize: 8.5, color: '#fff' },
  langItem: { fontSize: 8.5, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
  main: { flex: 1, padding: 28, paddingTop: 32 },
  topBorder: { height: 3, backgroundColor: NAVY, marginHorizontal: -28, marginTop: -32, marginBottom: 20 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: NAVY, textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1.5, borderBottomColor: '#ddd', paddingBottom: 3, marginBottom: 8 },
  expTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111' },
  expMeta: { fontSize: 9.5, color: BLUE, fontFamily: 'Helvetica-Bold', marginTop: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  dateText: { fontSize: 9, color: '#666' },
  bullet: { flexDirection: 'row', gap: 5, marginTop: 2 },
  bulletDot: { fontSize: 9, color: '#555', width: 8 },
  bulletText: { fontSize: 9.5, color: '#444', flex: 1, lineHeight: 1.45 },
  bodyText: { fontSize: 10, color: '#555', lineHeight: 1.5 },
  projectName: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111' },
})

function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text style={s.sideTitle}>{title}</Text>
      {children}
    </View>
  )
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

export function T2PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, certifications, projects, languages } = cvData
  const hasExp = experience.length > 0
  const hasEdu = education.length > 0
  const hasTech = skills.technical.length > 0
  const hasSoft = skills.soft.length > 0
  const hasCerts = certifications.length > 0
  const hasProj = projects && projects.length > 0
  const hasLangs = languages.length > 0

  const contacts = [personal.email, personal.phone, personal.address, personal.linkedin?.replace(/https?:\/\/(www\.)?/, '')].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Sidebar */}
        <View style={s.sidebar}>
          {personal.fullName ? <Text style={s.name}>{personal.fullName}</Text> : null}
          {personal.jobTitle ? <Text style={s.jobTitle}>{personal.jobTitle}</Text> : null}

          <SideSection title="Contact">
            {contacts.map((c, i) => <Text key={i} style={s.contactItem}>{c}</Text>)}
          </SideSection>

          {hasTech ? (
            <SideSection title="Technical Skills">
              {skills.technical.map((sk, i) => <Text key={i} style={s.pill}>{sk}</Text>)}
            </SideSection>
          ) : null}

          {hasSoft ? (
            <SideSection title="Soft Skills">
              {skills.soft.map((sk, i) => <Text key={i} style={s.langItem}>{sk}</Text>)}
            </SideSection>
          ) : null}

          {hasLangs ? (
            <SideSection title="Languages">
              {languages.map((l, i) => (
                <Text key={i} style={s.langItem}>{l.language}{l.proficiency ? ` · ${l.proficiency}` : ''}</Text>
              ))}
            </SideSection>
          ) : null}

          {hasCerts ? (
            <SideSection title="Certifications">
              {certifications.map((c, i) => <Text key={i} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.85)', marginBottom: 3 }}>▸ {c}</Text>)}
            </SideSection>
          ) : null}
        </View>

        {/* Main */}
        <View style={s.main}>
          <View style={s.topBorder} />

          {personal.summary?.trim() ? (
            <View style={{ marginBottom: 16 }}>
              <Text style={s.bodyText}>{personal.summary}</Text>
            </View>
          ) : null}

          {hasExp ? (
            <MainSection title="Work Experience">
              {experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <View style={s.row}>
                    <Text style={s.expTitle}>{exp.title}</Text>
                    <Text style={s.dateText}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</Text>
                  </View>
                  <Text style={s.expMeta}>{exp.company}{exp.company && exp.location ? ` · ${exp.location}` : ''}</Text>
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
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={s.row}>
                    <Text style={s.expTitle}>{edu.degree}</Text>
                    <Text style={s.dateText}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</Text>
                  </View>
                  <Text style={s.expMeta}>{edu.institution}{edu.institution && edu.location ? ` · ${edu.location}` : ''}</Text>
                  {edu.grade ? <Text style={{ fontSize: 9, color: '#666' }}>Grade: {edu.grade}</Text> : null}
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
