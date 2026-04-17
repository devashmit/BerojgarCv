// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const s = StyleSheet.create({
  page: { backgroundColor: '#fff', padding: 40, fontFamily: 'Helvetica', fontSize: 10 },
  header: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  contacts: { fontSize: 9.5, color: '#444' },
  address: { fontSize: 9.5, color: '#444', marginTop: 2 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', borderBottomWidth: 1.5, borderBottomColor: '#000', paddingBottom: 2, marginBottom: 7 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  boldText: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  italicText: { fontSize: 10, fontStyle: 'italic' },
  bullet: { flexDirection: 'row', gap: 5, marginTop: 1.5 },
  bulletDot: { fontSize: 9.5, width: 10 },
  bulletText: { fontSize: 9.5, flex: 1, lineHeight: 1.4 },
  summaryText: { fontSize: 10, lineHeight: 1.5, color: '#333' },
  skillText: { fontSize: 10, marginBottom: 3, lineHeight: 1.5 },
})

export function T3PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, projects, languages, certifications } = cvData
  const hasExp = experience.length > 0
  const hasEdu = education.length > 0
  const hasTech = skills.technical.length > 0
  const hasSoft = skills.soft.length > 0
  const hasLangs = languages.length > 0
  const hasCerts = certifications.length > 0
  const hasProj = projects && projects.length > 0

  const contacts = [personal.phone, personal.email,
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''),
    personal.github?.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          {personal.fullName ? <Text style={s.name}>{personal.fullName}</Text> : null}
          {contacts.length > 0 ? <Text style={s.contacts}>{contacts.join('  |  ')}</Text> : null}
          {personal.address ? <Text style={s.address}>{personal.address}</Text> : null}
        </View>

        {personal.summary?.trim() ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Professional Summary</Text>
            <Text style={s.summaryText}>{personal.summary}</Text>
          </View>
        ) : null}

        {hasEdu ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 7 }}>
                <View style={s.row}>
                  <Text style={s.boldText}>{edu.institution}</Text>
                  <Text style={s.boldText}>{edu.location}</Text>
                </View>
                <View style={s.row}>
                  <Text style={s.italicText}>{edu.degree}{edu.grade ? `, ${edu.grade}` : ''}</Text>
                  <Text style={s.italicText}>{edu.startYear}{edu.startYear ? ' – ' : ''}{edu.endYear}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {hasExp ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={s.row}>
                  <Text style={s.boldText}>{exp.title}</Text>
                  <Text style={{ fontSize: 10 }}>{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.currentJob ? 'Present' : exp.endDate}</Text>
                </View>
                <View style={s.row}>
                  <Text style={s.italicText}>{exp.company}</Text>
                  <Text style={s.italicText}>{exp.location}</Text>
                </View>
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

        {hasProj ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Projects</Text>
            {projects!.map((proj, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={s.boldText}>
                  {proj.name}{proj.technologies.length > 0 ? `  |  ${proj.technologies.join(', ')}` : ''}
                </Text>
                {proj.description ? (
                  <View style={s.bullet}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{proj.description}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {(hasTech || hasSoft || hasLangs || hasCerts) ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Skills &amp; Qualifications</Text>
            {hasTech ? <Text style={s.skillText}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Technical: </Text>{skills.technical.join(' · ')}</Text> : null}
            {hasSoft ? <Text style={s.skillText}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Soft Skills: </Text>{skills.soft.join(' · ')}</Text> : null}
            {hasLangs ? <Text style={s.skillText}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Languages: </Text>{languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' · ')}</Text> : null}
            {hasCerts ? <Text style={s.skillText}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Certifications: </Text>{certifications.join(' · ')}</Text> : null}
          </View>
        ) : null}
      </Page>
    </Document>
  )
}
