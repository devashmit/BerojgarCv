// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', borderTop: 4, borderBottom: 3, borderColor: '#0A192F' },
  header: { paddingVertical: 35, paddingHorizontal: 40, borderBottom: 1, borderBottomColor: '#f3f4f6', alignItems: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', letterSpacing: 3, textTransform: 'uppercase', color: '#0A192F', marginBottom: 8 },
  title: { fontSize: 11, color: '#6b7280', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', fontSize: 9, color: '#4b5563' },
  
  body: { padding: 40, paddingTop: 30, flex: 1 },
  summary: { fontSize: 10, lineHeight: 1.5, color: '#374151', paddingBottom: 20 },
  
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 11, color: '#0A192F', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, marginRight: 15 },
  sectionLine: { flex: 1, backgroundColor: '#d1d5db', height: 1, position: 'relative' },
  sectionLineDark: { position: 'absolute', left: 0, top: 0, width: 40, height: 1, backgroundColor: '#0A192F' },
  
  item: { marginBottom: 15 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 },
  itemTitle: { fontSize: 11.5, fontWeight: 'bold', color: '#0A192F' },
  itemDateRow: { flexDirection: 'row', alignItems: 'center' },
  itemDateWrap: { backgroundColor: '#f3f4f6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  itemDate: { fontSize: 8.5, color: '#0A192F', fontWeight: 'bold' },
  itemSub: { fontSize: 10.5, color: '#374151', fontWeight: 'medium', marginBottom: 6 },
  itemLoc: { fontSize: 10.5, color: '#9ca3af', fontWeight: 'normal' },
  
  bulletList: { paddingLeft: 6 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { fontSize: 10, color: '#0A192F', width: 12 },
  bulletText: { fontSize: 10, flex: 1, lineHeight: 1.4, color: '#4b5563' },

  eduRow: { flexDirection: 'row' },
  eduLeft: { flex: 1, paddingRight: 20 },
  eduRight: { width: 120, alignItems: 'flex-end' },

  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillPillDark: { backgroundColor: '#0A192F', color: '#ffffff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 2, fontSize: 9 },
  skillPillLight: { backgroundColor: '#f3f4f6', color: '#0A192F', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 2, fontSize: 9, border: 1, borderColor: '#e5e7eb' },
})

export function T4PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const contacts = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName}</Text>
          <Text style={styles.title}>{personal.jobTitle}</Text>
          <View style={styles.contactRow}>
            {contacts.map((c, i) => (
              <Text key={i}>{c}{i < contacts.length - 1 ? '   •   ' : ''}</Text>
            ))}
          </View>
        </View>

        <View style={styles.body}>
          {personal.summary && <Text style={styles.summary}>{personal.summary}</Text>}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              <View style={styles.sectionLine}><View style={styles.sectionLineDark}/></View>
            </View>
            
            {experience.map(exp => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <View style={styles.itemDateRow}>
                    <View style={styles.itemDateWrap}>
                      <Text style={styles.itemDate}>{exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.itemSub}>{exp.company} <Text style={styles.itemLoc}>| {exp.location}</Text></Text>
                
                <View style={styles.bulletList}>
                  {exp.bullets.map((b, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>▸</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.sectionLine}><View style={styles.sectionLineDark}/></View>
            </View>

            {education.map(edu => (
              <View key={edu.id} style={[styles.item, styles.eduRow]}>
                <View style={styles.eduLeft}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={[styles.itemSub, {marginTop: 2}]}>{edu.institution} <Text style={styles.itemLoc}>| {edu.location}</Text></Text>
                  {edu.grade && <Text style={{fontSize: 9, color: '#6b7280', marginTop: 2}}>Grade: {edu.grade}</Text>}
                </View>
                <View style={styles.eduRight}>
                  <View style={styles.itemDateWrap}>
                    <Text style={styles.itemDate}>{edu.startYear} – {edu.endYear}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Core Competencies</Text>
              <View style={styles.sectionLine}><View style={styles.sectionLineDark}/></View>
            </View>
            <View style={styles.skillsWrap}>
              {skills.technical.map((s, i) => <Text key={`tech-${i}`} style={styles.skillPillDark}>{s}</Text>)}
              {skills.soft.map((s, i) => <Text key={`soft-${i}`} style={styles.skillPillLight}>{s}</Text>)}
              {languages.map((l, i) => <Text key={`lang-${i}`} style={styles.skillPillLight}>{l.language} ({l.proficiency})</Text>)}
            </View>
          </View>
          
        </View>

      </Page>
    </Document>
  )
}
