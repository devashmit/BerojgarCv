// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const C = '#C0392B'
const GOLD = '#D4AF37'

const s = StyleSheet.create({
  page: { backgroundColor: '#fff', padding: 40, fontFamily: 'Helvetica', fontSize: 10 },
  header: { backgroundColor: C, paddingTop: 22, paddingBottom: 18, paddingHorizontal: 40, borderTop: `3 solid ${GOLD}`, borderBottom: `3 solid ${GOLD}`, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: -40, marginTop: -40 },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  jobTitle: { fontSize: 11, color: GOLD, marginBottom: 8 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  contactText: { fontSize: 8.5, color: 'rgba(255,255,255,0.9)' },
  body: { paddingTop: 24 },
  section: { marginBottom: 18 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  sectionTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: C, textTransform: 'uppercase', letterSpacing: 1.2 },
  sectionLine: { flex: 1, height: 1, backgroundColor: C, opacity: 0.25 },
  expTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111' },
  expMeta: { fontSize: 9.5, color: C, fontFamily: 'Helvetica-Bold', marginTop: 1 },
  dateText: { fontSize: 9, color: '#666' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bullet: { flexDirection: 'row', gap: 5, marginTop: 2 },
  bulletDot: { fontSize: 9, color: '#555', width: 8 },
  bulletText: { fontSize: 9.5, color: '#444', flex: 1, lineHeight: 1.45 },
  bodyText: { fontSize: 10, color: '#555', lineHeight: 1.5 },
  degreeTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111' },
  instText: { fontSize: 9.5, color: C, fontFamily: 'Helvetica-Bold', marginTop: 1 },
  skillLine: { fontSize: 9.5, color: '#444', lineHeight: 1.5, marginBottom: 2 },
  projectName: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111' },
  projectMeta: { fontSize: 9, color: '#666', fontStyle: 'italic', marginTop: 1 },
  certItem: { fontSize: 9.5, color: '#444', marginBottom: 2 },
  langItem: { fontSize: 9.5, color: '#444', marginBottom: 2 },
})

function SectionHead({ title }: { title: string }) {
  return (
    <View style={s.sectionHead}>
      <View style={{ width: 8, height: 8, transform: 'rotate(45deg)', backgroundColor: GOLD }} />
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.sectionLine} />
    </View>
  )
}

export function T1PDF({ cvData }: { cvData: CVData }) {
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
        {/* Header */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            {personal.fullName ? <Text style={s.name}>{personal.fullName}</Text> : null}
            {personal.jobTitle ? <Text style={s.jobTitle}>{personal.jobTitle}</Text> : null}
            <View style={s.contactRow}>
              {contacts.map((c, i) => <Text key={i} style={s.contactText}>{c}</Text>)}
            </View>
          </View>
        </View>

        <View style={s.body}>
          {/* Summary */}
          {personal.summary?.trim() ? (
            <View style={s.section}>
              <SectionHead title="Professional Summary" />
              <Text style={s.bodyText}>{personal.summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {hasExp ? (
            <View style={s.section}>
              <SectionHead title="Work Experience" />
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
            </View>
          ) : null}

          {/* Education */}
          {hasEdu ? (
            <View style={s.section}>
              <SectionHead title="Education" />
              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={s.row}>
                    <Text style={s.degreeTitle}>{edu.degree}</Text>
                    <Text style={s.dateText}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</Text>
                  </View>
                  <Text style={s.instText}>{edu.institution}{edu.institution && edu.location ? ` · ${edu.location}` : ''}</Text>
                  {edu.grade ? <Text style={{ fontSize: 9, color: '#666', marginTop: 1 }}>Grade: {edu.grade}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {(hasTech || hasSoft) ? (
            <View style={s.section}>
              <SectionHead title="Skills" />
              {hasTech ? <Text style={s.skillLine}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Technical: </Text>{skills.technical.join(' · ')}</Text> : null}
              {hasSoft ? <Text style={s.skillLine}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Soft Skills: </Text>{skills.soft.join(' · ')}</Text> : null}
            </View>
          ) : null}

          {/* Projects */}
          {hasProj ? (
            <View style={s.section}>
              <SectionHead title="Projects" />
              {projects!.map((proj, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={s.projectName}>{proj.name}{proj.technologies.length > 0 ? ` — ${proj.technologies.join(', ')}` : ''}</Text>
                  {proj.description ? <Text style={{ fontSize: 9.5, color: '#444', marginTop: 2 }}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Certifications */}
          {hasCerts ? (
            <View style={s.section}>
              <SectionHead title="Certifications" />
              {certifications.map((c, i) => <Text key={i} style={s.certItem}>• {c}</Text>)}
            </View>
          ) : null}

          {/* Languages */}
          {hasLangs ? (
            <View style={s.section}>
              <SectionHead title="Languages" />
              <Text style={s.langItem}>{languages.map(l => `${l.language}${l.proficiency ? ` — ${l.proficiency}` : ''}`).join('   ·   ')}</Text>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}
