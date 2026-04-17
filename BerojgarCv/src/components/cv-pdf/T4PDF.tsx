// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const DARK = '#0A192F'

const s = StyleSheet.create({
  page: { backgroundColor: '#fff', padding: 0, fontFamily: 'Helvetica', fontSize: 10 },
  topBorder: { height: 4, backgroundColor: DARK },
  header: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 40, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: DARK, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 },
  jobTitle: { fontSize: 10.5, color: '#888', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  contactText: { fontSize: 9, color: '#555' },
  body: { padding: 40, paddingTop: 28, flexDirection: 'column', gap: 20 },
  section: { marginBottom: 0 },
  sectionHeadRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: DARK, textTransform: 'uppercase', letterSpacing: 1.2 },
  sectionLine: { flex: 1, height: 1, backgroundColor: '#ccc' },
  sectionLineAccent: { width: 32, height: 1, backgroundColor: DARK },
  expTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: DARK },
  expMeta: { fontSize: 9.5, color: '#555', marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  dateBadge: { fontSize: 8.5, color: DARK, fontFamily: 'Helvetica-Bold', backgroundColor: '#f0f0f0', paddingHorizontal: 6, paddingVertical: 2 },
  bullet: { flexDirection: 'row', gap: 5, marginTop: 3 },
  bulletArrow: { fontSize: 10, color: DARK, width: 10 },
  bulletText: { fontSize: 9.5, color: '#555', flex: 1, lineHeight: 1.45 },
  pill: { backgroundColor: DARK, color: '#fff', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2, fontSize: 9 },
  softPill: { backgroundColor: '#f0f0f0', color: DARK, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2, fontSize: 9, borderWidth: 0.5, borderColor: '#ddd' },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  summaryText: { fontSize: 10, color: '#555', lineHeight: 1.5 },
  projectName: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: DARK },
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <View style={s.sectionHeadRow}>
        <Text style={s.sectionTitle}>{title}</Text>
        <View style={{ flex: 1, height: 1, position: 'relative' }}>
          <View style={{ height: 1, backgroundColor: '#ccc', flex: 1 }} />
          <View style={{ position: 'absolute', left: 0, top: 0, width: 32, height: 1, backgroundColor: DARK }} />
        </View>
      </View>
      {children}
    </View>
  )
}

export function T4PDF({ cvData }: { cvData: CVData }) {
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
        <View style={s.topBorder} />
        <View style={s.header}>
          {personal.fullName ? <Text style={s.name}>{personal.fullName}</Text> : null}
          {personal.jobTitle ? <Text style={s.jobTitle}>{personal.jobTitle}</Text> : null}
          <View style={s.contactRow}>{contacts.map((c, i) => <Text key={i} style={s.contactText}>{c}</Text>)}</View>
        </View>

        <View style={s.body}>
          {personal.summary?.trim() ? <Text style={s.summaryText}>{personal.summary}</Text> : null}

          {hasExp ? (
            <Section title="Professional Experience">
              {experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 14 }}>
                  <View style={s.row}>
                    <Text style={s.expTitle}>{exp.title}</Text>
                    <Text style={s.dateBadge}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</Text>
                  </View>
                  <Text style={s.expMeta}>{exp.company}{exp.company && exp.location ? ` · ${exp.location}` : ''}</Text>
                  {exp.bullets.filter(b => b.trim()).map((b, j) => (
                    <View key={j} style={s.bullet}>
                      <Text style={s.bulletArrow}>▸</Text>
                      <Text style={s.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </Section>
          ) : null}

          {hasEdu ? (
            <Section title="Education">
              {education.map((edu, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.expTitle}>{edu.degree}</Text>
                    <Text style={s.expMeta}>{edu.institution}{edu.institution && edu.location ? ` · ${edu.location}` : ''}</Text>
                    {edu.grade ? <Text style={{ fontSize: 9, color: '#888', marginTop: 2 }}>Grade: {edu.grade}</Text> : null}
                  </View>
                  <Text style={s.dateBadge}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</Text>
                </View>
              ))}
            </Section>
          ) : null}

          {hasProj ? (
            <Section title="Projects">
              {projects!.map((proj, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={s.projectName}>{proj.name}{proj.technologies.length > 0 ? ` — ${proj.technologies.join(', ')}` : ''}</Text>
                  {proj.description ? (
                    <View style={s.bullet}>
                      <Text style={s.bulletArrow}>▸</Text>
                      <Text style={s.bulletText}>{proj.description}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </Section>
          ) : null}

          {hasTech ? (
            <Section title="Technical Skills">
              <View style={s.pillRow}>{skills.technical.map((sk, i) => <Text key={i} style={s.pill}>{sk}</Text>)}</View>
            </Section>
          ) : null}

          {hasSoft ? (
            <Section title="Soft Skills">
              <View style={s.pillRow}>{skills.soft.map((sk, i) => <Text key={i} style={s.softPill}>{sk}</Text>)}</View>
            </Section>
          ) : null}

          {hasCerts ? (
            <Section title="Certifications">
              {certifications.map((c, i) => <Text key={i} style={{ fontSize: 9.5, color: '#444', marginBottom: 3 }}>• {c}</Text>)}
            </Section>
          ) : null}

          {hasLangs ? (
            <Section title="Languages">
              <View style={s.pillRow}>
                {languages.map((l, i) => <Text key={i} style={s.softPill}>{l.language}{l.proficiency ? ` · ${l.proficiency}` : ''}</Text>)}
              </View>
            </Section>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}
