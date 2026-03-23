// @ts-nocheck
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
  sidebar: { width: 170, backgroundColor: '#1A3A5C', color: '#fff', paddingTop: 40, paddingHorizontal: 20 },
  main: { flex: 1, backgroundColor: '#F8FAFC', padding: 30, paddingTop: 40 },
  
  photoBox: { width: 90, height: 90, borderRadius: 45, marginBottom: 20, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  photoImg: { width: '100%', height: '100%', borderRadius: 45, objectFit: 'cover' },
  name: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 6, textTransform: 'uppercase' },
  title: { fontSize: 11, color: '#BFDBFE', textAlign: 'center', marginBottom: 30 },
  
  contactItem: { fontSize: 9, marginBottom: 8, color: '#EFF6FF' },
  
  sideHeading: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#BFDBFE', marginBottom: 10, marginTop: 25, borderBottom: 1, borderBottomColor: 'rgba(255,255,255,0.2)', paddingBottom: 4 },
  skillItem: { marginBottom: 6 },
  skillName: { fontSize: 9, marginBottom: 3 },
  skillBarBg: { height: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 },
  skillBarFill: { height: 3, backgroundColor: '#93C5FD', borderRadius: 2 },
  langItem: { fontSize: 9, marginBottom: 4 },
  langProf: { color: '#93C5FD', fontSize: 8 },

  mainLine: { height: 3, backgroundColor: '#3A7CA5', position: 'absolute', top: 0, left: 0, right: 0 },
  summary: { fontSize: 10, lineHeight: 1.5, color: '#333', marginBottom: 25 },
  
  sectionHeading: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', color: '#1A3A5C', borderBottom: 2, borderBottomColor: '#E2E8F0', paddingBottom: 4, marginBottom: 15 },
  itemBox: { marginBottom: 15, paddingLeft: 10, borderLeft: 2, borderLeftColor: '#E2E8F0' },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontSize: 11, fontWeight: 'bold', color: '#111' },
  itemDate: { fontSize: 9, color: '#666' },
  itemSub: { fontSize: 10, color: '#3A7CA5', fontWeight: 'bold', marginBottom: 4 },
  itemSubLight: { color: '#888', fontWeight: 'normal' },
  bulletList: { marginTop: 4 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { fontSize: 10, width: 12, color: '#555' },
  bulletText: { fontSize: 10, flex: 1, lineHeight: 1.4, color: '#333' }
})

export function T2PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const contacts = [personal.email, personal.phone, personal.address, personal.linkedin?.replace(/https?:\/\/(www\.)?/, '')].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.photoBox}>
            {personal.photo && <Image src={personal.photo} style={styles.photoImg} />}
          </View>
          <Text style={styles.name}>{personal.fullName}</Text>
          <Text style={styles.title}>{personal.jobTitle}</Text>

          <View style={{marginTop: 10}}>
            {contacts.map((c, i) => <Text key={i} style={styles.contactItem}>{c}</Text>)}
          </View>

          <Text style={styles.sideHeading}>Technical Skills</Text>
          {skills.technical.map((skill, i) => (
            <View key={i} style={styles.skillItem}>
              <Text style={styles.skillName}>{skill}</Text>
              <View style={styles.skillBarBg}>
                <View style={[styles.skillBarFill, { width: `${75 + (i % 3) * 10}%` }]} />
              </View>
            </View>
          ))}

          <Text style={styles.sideHeading}>Languages</Text>
          {languages.map((l, i) => (
            <View key={i} style={{marginBottom: 6}}>
              <Text style={styles.langItem}>{l.language}</Text>
              <Text style={styles.langProf}>{l.proficiency}</Text>
            </View>
          ))}
        </View>

        <View style={styles.main}>
          <View style={styles.mainLine} />
          
          {personal.summary && <Text style={styles.summary}>{personal.summary}</Text>}

          <Text style={styles.sectionHeading}>Experience</Text>
          {experience.map(exp => (
            <View key={exp.id} style={styles.itemBox}>
              <View style={styles.itemTop}>
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

          <Text style={styles.sectionHeading}>Education</Text>
          {education.map(edu => (
            <View key={edu.id} style={styles.itemBox}>
              <View style={styles.itemTop}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemDate}>{edu.startYear} – {edu.endYear}</Text>
              </View>
              <Text style={styles.itemSub}>{edu.institution} <Text style={styles.itemSubLight}>| {edu.location}</Text></Text>
              {edu.grade && <Text style={{fontSize: 9, color: '#666', marginTop: 2}}>Grade: {edu.grade}</Text>}
            </View>
          ))}

          {cvData.certifications.length > 0 && (
            <>
              <Text style={styles.sectionHeading}>Certifications</Text>
              <View style={styles.bulletList}>
                {cvData.certifications.map((c, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

        </View>
      </Page>
    </Document>
  )
}
