// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const GOLD = '#C19A6B'
const CREAM = '#FAF7F4'
const DARK = '#2C2C2C'

const s = StyleSheet.create({
  page: { backgroundColor: CREAM, padding: 40, fontFamily: 'Times-Roman', fontSize: 10 },
  topLine: { height: 2, backgroundColor: GOLD, marginHorizontal: -40, marginTop: -40, marginBottom: 24, opacity: 0.7 },
  bottomLine: { height: 2, backgroundColor: GOLD, marginHorizontal: -40, marginTop: 24, opacity: 0.7 },
  header: { alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 22, fontFamily: 'Times-Bold', color: DARK, letterSpacing: 1, marginBottom: 5 },
  jobTitle: { fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  ornamentLine: { height: 0.5, backgroundColor: GOLD, width: 40 },
  ornamentDiamond: { width: 5, height: 5, transform: 'rotate(45deg)', borderWidth: 0.5, borderColor: GOLD },
  ornamentRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: 8, opacity: 0.6 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  contactText: { fontSize: 8.5, color: '#555', textTransform: 'uppercase', letterSpacing: 0.5 },
  body: { flexDirection: 'row', gap: 30, marginTop: 10 },
  leftCol: { flex: 1 },
  rightCol: { width: 145 },
  section: { marginBottom: 16 },
  leftSectionTitle: { fontSize: 10, fontFamily: 'Times-Bold', color: GOLD, textTransform: 'uppercase', letterSpacing: 1.2, borderBottomWidth: 0.5, borderBottomColor: '#E5DFD5', paddingBottom: 4, marginBottom: 8 },
  rightSectionTitle: { fontSize: 9, fontFamily: 'Times-Bold', color: GOLD, textTransform: 'uppercase', letterSpacing: 1.2, borderBottomWidth: 0.5, borderBottomColor: '#E5DFD5', paddingBottom: 3, marginBottom: 7 },
  expTitle: { fontSize: 11, fontFamily: 'Times-Bold', color: DARK },
  expMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2, marginBottom: 6 },
  expMetaText: { fontSize: 9.5, fontStyle: 'italic', color: '#666' },
  expDate: { fontSize: 9.5, color: GOLD, fontFamily: 'Times-Roman' },
  bullet: { flexDirection: 'row', gap: 5, marginTop: 2 },
  bulletDash: { fontSize: 10, color: GOLD, width: 10, fontFamily: 'Times-Bold' },
  bulletText: { fontSize: 9.5, color: '#444', flex: 1, lineHeight: 1.45 },
  summaryText: { fontSize: 10.5, color: '#444', lineHeight: 1.5, fontStyle: 'italic', textAlign: 'center', marginBottom: 16 },
  listItem: { fontSize: 9.5, color: '#444', marginBottom: 3 },
  langName: { fontSize: 10, fontFamily: 'Times-Bold', color: DARK, marginBottom: 1 },
  langProf: { fontSize: 9, color: GOLD, fontStyle: 'italic', marginBottom: 4 },
  projectTitle: { fontSize: 10.5, fontFamily: 'Times-Bold', color: DARK },
  projectMeta: { fontSize: 9, color: '#666', fontStyle: 'italic', marginBottom: 3 },
})

export function T6PDF({ cvData }: { cvData: CVData }) {
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
        <View style={s.topLine} />

        <View style={s.header}>
          {personal.fullName ? <Text style={s.name}>{personal.fullName}</Text> : null}
          {personal.jobTitle ? <Text style={s.jobTitle}>{personal.jobTitle}</Text> : null}
          <View style={s.ornamentRow}>
            <View style={s.ornamentLine} /><View style={s.ornamentDiamond} /><View style={s.ornamentLine} />
          </View>
          <View style={s.contactRow}>{contacts.map((c, i) => <Text key={i} style={s.contactText}>{i > 0 ? `  ·  ${c}` : c}</Text>)}</View>
        </View>

        {personal.summary?.trim() ? <Text style={s.summaryText}>"{personal.summary}"</Text> : null}

        <View style={s.body}>
          {/* Left col */}
          <View style={s.leftCol}>
            {hasExp ? (
              <View style={s.section}>
                <Text style={s.leftSectionTitle}>Expérience Professionnelle</Text>
                {experience.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 14 }}>
                    <Text style={s.expTitle}>{exp.title}</Text>
                    <View style={s.expMeta}>
                      <Text style={s.expMetaText}>{exp.company}{exp.company && exp.location ? `, ${exp.location}` : ''}</Text>
                      <Text style={s.expDate}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</Text>
                    </View>
                    {exp.bullets.filter(b => b.trim()).map((b, j) => (
                      <View key={j} style={s.bullet}>
                        <Text style={s.bulletDash}>—</Text>
                        <Text style={s.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ) : null}

            {hasEdu ? (
              <View style={s.section}>
                <Text style={s.leftSectionTitle}>Formation</Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={s.expTitle}>{edu.degree}</Text>
                    <View style={s.expMeta}>
                      <Text style={s.expMetaText}>{edu.institution}{edu.institution && edu.location ? `, ${edu.location}` : ''}</Text>
                      <Text style={s.expDate}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</Text>
                    </View>
                    {edu.grade ? <Text style={{ fontSize: 9, color: '#666' }}>Grade: {edu.grade}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null}

            {hasProj ? (
              <View style={s.section}>
                <Text style={s.leftSectionTitle}>Projets</Text>
                {projects!.map((proj, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={s.projectTitle}>{proj.name}</Text>
                    {proj.technologies.length > 0 ? <Text style={s.projectMeta}>{proj.technologies.join(', ')}</Text> : null}
                    {proj.description ? (
                      <View style={s.bullet}>
                        <Text style={s.bulletDash}>—</Text>
                        <Text style={s.bulletText}>{proj.description}</Text>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          {/* Right col */}
          <View style={s.rightCol}>
            {hasTech ? (
              <View style={s.section}>
                <Text style={s.rightSectionTitle}>Compétences Techniques</Text>
                {skills.technical.map((sk, i) => <Text key={i} style={s.listItem}>— {sk}</Text>)}
              </View>
            ) : null}

            {hasSoft ? (
              <View style={s.section}>
                <Text style={s.rightSectionTitle}>Soft Skills</Text>
                {skills.soft.map((sk, i) => <Text key={i} style={s.listItem}>— {sk}</Text>)}
              </View>
            ) : null}

            {hasLangs ? (
              <View style={s.section}>
                <Text style={s.rightSectionTitle}>Langues</Text>
                {languages.map((l, i) => (
                  <View key={i} style={{ marginBottom: 5 }}>
                    <Text style={s.langName}>{l.language}</Text>
                    {l.proficiency ? <Text style={s.langProf}>{l.proficiency}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null}

            {hasCerts ? (
              <View style={s.section}>
                <Text style={s.rightSectionTitle}>Certifications</Text>
                {certifications.map((c, i) => <Text key={i} style={s.listItem}>— {c}</Text>)}
              </View>
            ) : null}
          </View>
        </View>

        <View style={s.bottomLine} />
      </Page>
    </Document>
  )
}
