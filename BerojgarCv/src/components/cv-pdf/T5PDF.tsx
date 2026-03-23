// @ts-nocheck
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
  sidebar: { width: 180, backgroundColor: '#2D4739', color: '#FFFFFF', padding: 25, paddingTop: 40 },
  main: { flex: 1, padding: 35, paddingTop: 40, position: 'relative' },
  
  initialBox: { width: 60, height: 60, backgroundColor: 'rgba(255,255,255,0.1)', border: 1, borderColor: 'rgba(255,255,255,0.2)', alignSelf: 'center', marginBottom: 25, transform: 'rotate(45deg)', justifyContent: 'center', alignItems: 'center' },
  initialText: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', transform: 'rotate(-45deg)' },
  
  name: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 6, textTransform: 'uppercase' },
  title: { fontSize: 10, color: '#A5C9B3', textAlign: 'center', marginBottom: 30, paddingBottom: 20, borderBottom: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  
  sideSection: { marginBottom: 25 },
  sideTitle: { fontSize: 9, fontWeight: 'bold', uppercase: true, color: '#A5C9B3', marginBottom: 10, letterSpacing: 1 },
  contactItem: { flexDirection: 'row', marginBottom: 8 },
  contactDot: { fontSize: 8, color: '#A5C9B3', width: 10 },
  contactText: { fontSize: 8.5, color: '#FFFFFF', flex: 1 },

  skillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  skillPill: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10, border: 1, borderColor: 'rgba(255,255,255,0.05)', fontSize: 8 },

  langItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  langText: { fontSize: 9, color: '#FFFFFF' },
  langDots: { flexDirection: 'row', gap: 2 },
  langDotFill: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#A5C9B3' },
  langDotEmpty: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)' },

  topLineBg: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, backgroundColor: '#6EB38A' },
  
  summaryBox: { borderLeft: 3, borderLeftColor: '#A5C9B3', paddingLeft: 12, paddingVertical: 2, marginBottom: 25 },
  summaryText: { fontSize: 10, color: '#4b5563', fontStyle: 'italic', lineHeight: 1.5 },

  mainSection: { marginBottom: 25 },
  mainSecTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  mainSecLine: { width: 20, height: 2, backgroundColor: '#2D4739', marginRight: 10 },
  mainSecTitle: { fontSize: 11, fontWeight: 'bold', color: '#2D4739', textTransform: 'uppercase', letterSpacing: 1 },

  itemWrap: { marginBottom: 18, marginLeft: 30, position: 'relative' },
  itemDot: { position: 'absolute', left: -34, top: 4, width: 8, height: 8, borderRadius: 4, border: 2, borderColor: '#2D4739', backgroundColor: '#FFFFFF' },
  itemTitle: { fontSize: 11.5, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  itemCompany: { fontSize: 10, fontWeight: 'bold', color: '#2D4739', marginBottom: 2 },
  itemMeta: { fontSize: 8.5, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' },
  
  bulletList: { paddingLeft: 10 },
  bullet: { flexDirection: 'row', marginBottom: 4 },
  bulletPoint: { width: 10, fontSize: 10, color: '#4b5563' },
  bulletText: { flex: 1, fontSize: 10, color: '#374151', lineHeight: 1.4 },
})

export function T5PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const initials = personal.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.sidebar}>
          <View style={styles.initialBox}>
            <Text style={styles.initialText}>{initials}</Text>
          </View>
          
          <Text style={styles.name}>{personal.fullName}</Text>
          <Text style={styles.title}>{personal.jobTitle}</Text>

          <View style={styles.sideSection}>
            <Text style={styles.sideTitle}>Contact</Text>
            {personal.email && (
              <View style={styles.contactItem}><Text style={styles.contactDot}>•</Text><Text style={styles.contactText}>{personal.email}</Text></View>
            )}
            {personal.phone && (
              <View style={styles.contactItem}><Text style={styles.contactDot}>•</Text><Text style={styles.contactText}>{personal.phone}</Text></View>
            )}
            {personal.address && (
              <View style={styles.contactItem}><Text style={styles.contactDot}>•</Text><Text style={styles.contactText}>{personal.address}</Text></View>
            )}
            {personal.linkedin && (
              <View style={styles.contactItem}><Text style={styles.contactDot}>•</Text><Text style={styles.contactText}>{personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}</Text></View>
            )}
          </View>

          <View style={styles.sideSection}>
            <Text style={styles.sideTitle}>Skills</Text>
            <View style={styles.skillWrap}>
              {skills.technical.map(s => <Text key={s} style={styles.skillPill}>{s}</Text>)}
            </View>
          </View>

          <View style={styles.sideSection}>
            <Text style={styles.sideTitle}>Languages</Text>
            {languages.map(l => {
              const score = l.proficiency === 'Native' ? 5 : l.proficiency === 'Fluent' ? 4 : l.proficiency === 'Professional' ? 3 : 2
              return (
                <View key={l.language} style={styles.langItem}>
                  <Text style={styles.langText}>{l.language}</Text>
                  <View style={styles.langDots}>
                     {[1,2,3,4,5].map(d => <View key={d} style={d <= score ? styles.langDotFill : styles.langDotEmpty} />)}
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.topLineBg} />

          {personal.summary && (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>{personal.summary}</Text>
            </View>
          )}

          <View style={styles.mainSection}>
            <View style={styles.mainSecTitleRow}>
              <View style={styles.mainSecLine} />
              <Text style={styles.mainSecTitle}>Experience</Text>
            </View>

            {experience.map(exp => (
              <View key={exp.id} style={styles.itemWrap}>
                <View style={styles.itemDot} />
                <Text style={styles.itemTitle}>{exp.title}</Text>
                <Text style={styles.itemCompany}>{exp.company}</Text>
                <Text style={styles.itemMeta}>{exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate} | {exp.location}</Text>
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

          <View style={styles.mainSection}>
            <View style={styles.mainSecTitleRow}>
              <View style={styles.mainSecLine} />
              <Text style={styles.mainSecTitle}>Education</Text>
            </View>

            {education.map(edu => (
              <View key={edu.id} style={styles.itemWrap}>
                <View style={styles.itemDot} />
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemCompany}>{edu.institution}</Text>
                <Text style={styles.itemMeta}>{edu.startYear} – {edu.endYear} | {edu.location}</Text>
                {edu.grade && <Text style={{fontSize: 9.5, color: '#4b5563', marginTop: 2}}>Grade: {edu.grade}</Text>}
              </View>
            ))}
          </View>

        </View>
      </Page>
    </Document>
  )
}
