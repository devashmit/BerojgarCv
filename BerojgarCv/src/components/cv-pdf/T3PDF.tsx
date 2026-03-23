// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40 },
  header: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  contacts: { fontSize: 10, color: '#000' },
  
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', borderBottom: 1.5, borderBottomColor: '#000', paddingBottom: 2, marginBottom: 8 },
  
  itemBox: { marginBottom: 8 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  boldText: { fontSize: 11, fontWeight: 'bold' },
  italicText: { fontSize: 10.5, fontStyle: 'italic' },
  dateText: { fontSize: 10.5 },
  
  bulletList: { paddingLeft: 15, marginTop: 4 },
  bullet: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { fontSize: 10, width: 10 },
  bulletText: { fontSize: 10, flex: 1, lineHeight: 1.4 },

  skillRow: { fontSize: 10.5, marginBottom: 3, lineHeight: 1.5 }
})

export function T3PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, projects } = cvData

  const contacts = [
    personal.phone, personal.email, 
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''), 
    personal.github?.replace(/https?:\/\/(www\.)?/, '')
  ].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName}</Text>
          <Text style={styles.contacts}>{contacts.join('  |  ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, i) => (
            <View key={i} style={styles.itemBox}>
              <View style={styles.itemRow}>
                <Text style={styles.boldText}>{edu.institution}</Text>
                <Text style={styles.boldText}>{edu.location}</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.italicText}>{edu.degree}{edu.grade ? `, ${edu.grade}` : ''}</Text>
                <Text style={styles.italicText}>{edu.startYear} – {edu.endYear}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.itemBox}>
              <View style={styles.itemRow}>
                <Text style={styles.boldText}>{exp.title}</Text>
                <Text style={styles.dateText}>{exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.italicText}>{exp.company}</Text>
                <Text style={styles.italicText}>{exp.location}</Text>
              </View>
              <View style={styles.bulletList}>
                {exp.bullets.map((b, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.itemBox}>
                <View style={styles.itemRow}>
                  <Text style={styles.boldText}>{proj.name} <Text style={{fontWeight: 'normal', fontStyle: 'italic', fontSize: 10}}>| {proj.technologies.join(', ')}</Text></Text>
                </View>
                <View style={styles.bulletList}>
                  <View style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{proj.description}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skillRow}><Text style={styles.boldText}>Technical Skills: </Text>{skills.technical.join(' | ')}</Text>
          <Text style={styles.skillRow}><Text style={styles.boldText}>Soft Skills: </Text>{skills.soft.join(' | ')}</Text>
          {cvData.languages.length > 0 && (
            <Text style={styles.skillRow}><Text style={styles.boldText}>Languages: </Text>{cvData.languages.map(l => l.language).join(' | ')}</Text>
          )}
        </View>

      </Page>
    </Document>
  )
}
