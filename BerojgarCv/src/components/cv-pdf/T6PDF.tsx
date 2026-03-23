// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const styles = StyleSheet.create({
  page: { backgroundColor: '#FAF7F4', padding: 40, flexDirection: 'column' },
  
  header: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 26, fontWeight: 'bold', color: '#2C2C2C', marginBottom: 6, letterSpacing: 1 },
  title: { fontSize: 10.5, color: '#C19A6B', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3 },
  
  ornamentWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 15, opacity: 0.6 },
  ornLine: { width: 50, height: 1, backgroundColor: '#C19A6B' },
  ornDiamond: { width: 6, height: 6, border: 1, borderColor: '#C19A6B', marginHorizontal: 8, transform: 'rotate(45deg)' },

  contactRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', fontSize: 9, color: '#555555', textTransform: 'uppercase', letterSpacing: 1 },
  contactSeparator: { color: '#C19A6B', marginHorizontal: 12 },

  summary: { textAlign: 'center', fontSize: 10.5, fontStyle: 'italic', color: '#444444', lineHeight: 1.5, marginBottom: 25, paddingHorizontal: 30 },

  layout: { flexDirection: 'row', gap: 35 },
  leftCol: { flex: 1 },
  rightCol: { width: 160 },

  section: { marginBottom: 25 },
  sectionTitleWrap: { borderBottom: 1, borderBottomColor: '#E5DFD5', paddingBottom: 6, marginBottom: 12 },
  sectionTitle: { fontSize: 10.5, fontWeight: 'bold', color: '#C19A6B', textTransform: 'uppercase', letterSpacing: 2 },

  item: { marginBottom: 15 },
  itemTitle: { fontSize: 11.5, fontWeight: 'bold', color: '#2C2C2C', marginBottom: 2 },
  itemMetaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  itemLoc: { fontSize: 9.5, fontStyle: 'italic', color: '#666666' },
  itemDate: { fontSize: 9.5, fontWeight: 'bold', color: '#C19A6B' },

  bulletList: { paddingLeft: 0 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { fontSize: 10, color: '#C19A6B', fontWeight: 'bold', width: 14 },
  bulletText: { fontSize: 10, flex: 1, color: '#444444', lineHeight: 1.4 },

  sideBlock: { marginBottom: 10 },
  sideTitle: { fontSize: 9, textTransform: 'uppercase', color: '#666666', letterSpacing: 1, marginBottom: 4 },
  sideTextList: { marginBottom: 12 },
  sideText: { fontSize: 9.5, color: '#444444', marginBottom: 2 },

  langRow: { marginBottom: 8 },
  langName: { fontSize: 9.5, fontWeight: 'bold', color: '#2C2C2C', marginBottom: 2 },
  langProf: { fontSize: 8.5, fontStyle: 'italic', color: '#C19A6B' },

  certItem: { fontSize: 9.5, color: '#444444', marginBottom: 4 }
})

export function T6PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const contacts = [
    personal.email,
    personal.phone,
    personal.address,
    personal.linkedin?.replace(/https?:\/\/(www\.)?/, '')
  ].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName}</Text>
          <Text style={styles.title}>{personal.jobTitle}</Text>
          
          <View style={styles.ornamentWrap}>
            <View style={styles.ornLine} />
            <View style={styles.ornDiamond} />
            <View style={styles.ornLine} />
          </View>

          <View style={styles.contactRow}>
            {contacts.map((c, i) => (
              <Text key={i}>
                {i > 0 && <Text style={styles.contactSeparator}>  ·  </Text>}
                {c}
              </Text>
            ))}
          </View>
        </View>

        {personal.summary && <Text style={styles.summary}>{personal.summary}</Text>}

        <View style={styles.layout}>
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
              </View>
              {experience.map(exp => (
                <View key={exp.id} style={styles.item}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <View style={styles.itemMetaRow}>
                    <Text style={styles.itemLoc}>{exp.company}, {exp.location}</Text>
                    <Text style={styles.itemDate}>{exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}</Text>
                  </View>
                  <View style={styles.bulletList}>
                    {exp.bullets.map((b, i) => (
                      <View key={i} style={styles.bullet}>
                        <Text style={styles.bulletPoint}>—</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>Formation</Text>
              </View>
              {education.map(edu => (
                <View key={edu.id} style={styles.item}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <View style={styles.itemMetaRow}>
                    <Text style={styles.itemLoc}>{edu.institution}, {edu.location}</Text>
                    <Text style={styles.itemDate}>{edu.startYear} – {edu.endYear}</Text>
                  </View>
                  {edu.grade && <Text style={{fontSize: 9, color: '#555', marginTop: 2}}>Grade: {edu.grade}</Text>}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.section}>
              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>Compétences</Text>
              </View>
              <View style={styles.sideBlock}>
                <Text style={styles.sideTitle}>Technical</Text>
                <View style={styles.sideTextList}>
                  {skills.technical.map(s => <Text key={s} style={styles.sideText}>{s}</Text>)}
                </View>
              </View>
              <View style={styles.sideBlock}>
                <Text style={styles.sideTitle}>Soft Skills</Text>
                <View style={styles.sideTextList}>
                  {skills.soft.map(s => <Text key={s} style={styles.sideText}>{s}</Text>)}
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>Langues</Text>
              </View>
              {languages.map(l => (
                <View key={l.language} style={styles.langRow}>
                  <Text style={styles.langName}>{l.language}</Text>
                  <Text style={styles.langProf}>{l.proficiency}</Text>
                </View>
              ))}
            </View>

            {cvData.certifications.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleWrap}>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                </View>
                {cvData.certifications.map(c => <Text key={c} style={styles.certItem}>— {c}</Text>)}
              </View>
            )}
          </View>
        </View>

      </Page>
    </Document>
  )
}
