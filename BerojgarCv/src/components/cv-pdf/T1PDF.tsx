// @ts-nocheck
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

// Note: In a real app we would load fonts for standard text, but standard helvetica works for basic English
// We map standard styles.

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF' },
  header: { 
    backgroundColor: '#C0392B',
    borderTop: 3, borderBottom: 3, borderColor: '#D4AF37',
    padding: 30, flexDirection: 'row', justifyContent: 'space-between',
    color: '#FFFFFF'
  },
  headerLeft: { flex: 1 },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  title: { fontSize: 14, color: '#D4AF37', marginBottom: 12 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', fontSize: 10, opacity: 0.9 },
  photoBox: { width: 70, height: 85, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 20 },
  photoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  
  body: { padding: 30, paddingRight: 40, flex: 1 },
  summary: { fontSize: 10, lineHeight: 1.5, marginBottom: 20 },
  
  section: { marginBottom: 15 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 12, color: '#C0392B', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: 8 },
  diamond: { width: 6, height: 6, backgroundColor: '#D4AF37', transform: 'rotate(45deg)' },
  
  item: { marginBottom: 10 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemTitle: { fontSize: 11, fontWeight: 'bold', color: '#111' },
  itemDate: { fontSize: 9, color: '#666' },
  itemSub: { fontSize: 10, color: '#C0392B', marginBottom: 4 },
  itemSubLight: { color: '#666' },
  bulletList: { paddingLeft: 10, marginTop: 4 },
  bullet: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { fontSize: 10, width: 10 },
  bulletText: { fontSize: 10, flex: 1, lineHeight: 1.4, color: '#333' },

  twoCol: { flexDirection: 'row', gap: 20 },
  colMain: { flex: 1 },
  colSide: { width: 150 },
  
  skillTitle: { fontSize: 10, fontWeight: 'bold', marginTop: 4 },
  skillText: { fontSize: 10, color: '#333', lineHeight: 1.5 },
})

export function T1PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications } = cvData

  const contacts = [personal.email, personal.phone, personal.address, personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''), personal.github?.replace(/https?:\/\/(www\.)?/, '')].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{personal.fullName}</Text>
            <Text style={styles.title}>{personal.jobTitle}</Text>
            <View style={styles.contactRow}>
              {contacts.map((c, i) => <Text key={i}>{c}{i < contacts.length - 1 ? '  |  ' : ''}</Text>)}
            </View>
          </View>
          <View style={styles.photoBox}>
            {personal.photo && <Image src={personal.photo} style={styles.photoImg} />}
          </View>
        </View>

        <View style={styles.body}>
          {personal.summary && <Text style={styles.summary}>{personal.summary}</Text>}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.diamond} />
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>
            {experience.map(exp => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <Text style={styles.itemDate}>{exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}</Text>
                </View>
                <Text style={styles.itemSub}>{exp.company} <Text style={styles.itemSubLight}>| {exp.location}</Text></Text>
                <View style={styles.bulletList}>
                  {exp.bullets.map((b, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.diamond} />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {education.map(edu => (
              <View key={edu.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>{edu.startYear} – {edu.endYear}</Text>
                </View>
                <Text style={styles.itemSub}>{edu.institution} <Text style={styles.itemSubLight}>| {edu.location}</Text></Text>
                {edu.grade && <Text style={{fontSize: 9, color: '#666', marginTop: 2}}>Grade: {edu.grade}</Text>}
              </View>
            ))}
          </View>

          <View style={styles.twoCol}>
            <View style={styles.colMain}>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.diamond} />
                  <Text style={styles.sectionTitle}>Skills</Text>
                </View>
                <Text style={styles.skillTitle}>Technical:</Text>
                <Text style={styles.skillText}>{skills.technical.join(', ')}</Text>
                <Text style={styles.skillTitle}>Soft Skills:</Text>
                <Text style={styles.skillText}>{skills.soft.join(', ')}</Text>
              </View>
            </View>
            <View style={styles.colSide}>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.diamond} />
                  <Text style={styles.sectionTitle}>Languages</Text>
                </View>
                {languages.map((l, i) => (
                  <Text key={i} style={styles.skillText}>{l.language} ({l.proficiency})</Text>
                ))}
              </View>
            </View>
          </View>
          
          {certifications.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.diamond} />
                <Text style={styles.sectionTitle}>Certifications</Text>
              </View>
              <View style={styles.bulletList}>
                {certifications.map((c, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        </View>
      </Page>
    </Document>
  )
}
