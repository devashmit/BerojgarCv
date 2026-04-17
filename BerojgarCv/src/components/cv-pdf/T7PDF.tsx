// @ts-nocheck
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

// Note: In a real PDF, you need to register a Japanese font for React-PDF to actually render Japanese characters.
// For example:
// Font.register({ family: 'Noto Serif JP', src: 'https://fonts.gstatic.com/ea/notoserifjapanese/v6/NotoSerifJP-Regular.otf' });
// Here we use the default sans-serif but note that typical usage in React-PDF requires font registration.

const s = StyleSheet.create({
  page: { backgroundColor: '#fff', padding: 32, fontFamily: 'Helvetica', fontSize: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 },
  pageTitle: { fontSize: 24, paddingVertical: 2 },
  dateText: { fontSize: 10, color: '#666' },

  topBlock: { flexDirection: 'row', marginBottom: 14, gap: 10 },
  leftSection: { flex: 1, borderWidth: 0.5, borderColor: '#999', flexDirection: 'column' },

  row: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#999', minHeight: 24 },
  rowNoBorder: { flexDirection: 'row', flex: 1 },
  labelCol: { width: 65, borderRightWidth: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center', padding: 2 },
  labelText: { fontSize: 9, textAlign: 'center' },
  valCol: { flex: 1, paddingHorizontal: 8, justifyContent: 'center' },
  valText: { fontSize: 10 },
  largeValText: { fontSize: 16, paddingVertical: 4 },

  photoBox: { width: 70, height: 90, borderWidth: 0.5, borderColor: '#999', alignItems: 'center', justifyContent: 'center', shrink: 0 },
  photoText: { fontSize: 10, color: '#dc143c', textAlign: 'center' },

  addressBlock: { borderWidth: 0.5, borderColor: '#999', marginBottom: 18, borderTopWidth: 0 },
  
  sectionTitleBox: { backgroundColor: '#fff0f0', paddingVertical: 4, paddingHorizontal: 8, borderLeftWidth: 4, borderLeftColor: '#dc143c', marginBottom: 6 },
  sectionTitleText: { fontSize: 10.5, color: '#dc143c' },

  tableBox: { borderWidth: 0.5, borderColor: '#999', marginBottom: 18 },
  tHeadRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#999', backgroundColor: '#f9f9f9', minHeight: 20 },
  tYearCol: { width: 60, borderRightWidth: 0.5, borderRightColor: '#999', alignItems: 'center', justifyContent: 'center' },
  tMonthCol: { width: 35, borderRightWidth: 0.5, borderRightColor: '#999', alignItems: 'center', justifyContent: 'center' },
  tHeadText: { fontSize: 9 },

  tSubHeadRow: { alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.5, borderBottomColor: '#999', backgroundColor: '#fafafa', minHeight: 20 },
  tSubHeadText: { fontSize: 9.5, letterSpacing: 10 },

  tBodyRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#999', minHeight: 24 },
  tValCol: { flex: 1, paddingHorizontal: 8, justifyContent: 'center', paddingVertical: 4 },
  tValTextPrimary: { fontSize: 9.5 },
  tValTextSub: { fontSize: 9, color: '#666', paddingLeft: 10, marginTop: 2 },

  tEndRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#999', minHeight: 24, alignItems: 'center', justifyContent: 'flex-end', paddingRight: 30 },
  
  qualRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#999', minHeight: 28 },
  qualLabelCol: { width: 85, borderRightWidth: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center', padding: 2 },
})

export function T7PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications } = cvData

  const toJpYear = (dateStr: string) => {
    if (!dateStr) return '    '
    const match = dateStr.match(/\d{4}/)
    if (!match) return dateStr
    return `${match[0]}` // keeping simple for PDF without Japanese fonts
  }

  const toJpMonth = (dateStr: string) => {
    if (!dateStr) return '  '
    const match = dateStr.match(/(\d{1,2})\/\d{4}/) || dateStr.match(/\d{4}-(\d{2})/)
    if (match) return `${parseInt(match[1])}`
    return ''
  }

  const hasEdu = education.length > 0
  const hasExp = experience.length > 0
  const hasCerts = certifications.length > 0
  const hasLangs = languages.length > 0
  const hasTech = skills.technical.length > 0
  const hasSoft = skills.soft.length > 0

  const certText = hasCerts ? certifications.join(' / ') : 'None'
  const langText = hasLangs
    ? languages.map(l => `${l.language} (${l.proficiency})`).join(' / ') +
      (personal.jlptLevel && personal.jlptLevel !== 'None' ? ` / JLPT ${personal.jlptLevel}` : '')
    : 'None'

  const today = new Date()

  return (
    <Document>
      <Page size="A4" style={s.page}>
        
        <View style={s.headerRow}>
          <Text style={s.pageTitle}>Resume / Rirekisho</Text>
          <Text style={s.dateText}>{today.getFullYear()}-{today.getMonth() + 1}-{today.getDate()}</Text>
        </View>

        <View style={s.topBlock}>
          <View style={s.leftSection}>
            <View style={{ ...s.row, minHeight: 20 }}>
              <View style={s.labelCol}><Text style={s.labelText}>Furigana</Text></View>
              <View style={s.valCol}><Text style={{ fontSize: 9 }}>{personal.nameFurigana || ''}</Text></View>
            </View>
            <View style={{ ...s.row, minHeight: 46 }}>
              <View style={s.labelCol}><Text style={s.labelText}>Name</Text></View>
              <View style={s.valCol}><Text style={s.largeValText}>{personal.fullName || ''}</Text></View>
            </View>
            <View style={{ ...s.row, minHeight: 30, borderBottomWidth: 0 }}>
              <View style={s.labelCol}><Text style={s.labelText}>Date of Birth</Text></View>
              <View style={s.valCol}>
                <Text style={s.valText}>{personal.dateOfBirth ? `${toJpYear(personal.dateOfBirth)}-${toJpMonth(personal.dateOfBirth)}` : ''}</Text>
              </View>
              <View style={{ ...s.labelCol, width: 50, borderLeftWidth: 0.5, borderLeftColor: '#999' }}>
                <Text style={s.labelText}>Gender</Text>
              </View>
              <View style={{ width: 40 }} />
            </View>
          </View>
          <View style={s.photoBox}>
            <Text style={s.photoText}>Photo</Text>
          </View>
        </View>

        <View style={s.addressBlock}>
          <View style={{ ...s.row, minHeight: 20 }}>
            <View style={s.labelCol}><Text style={s.labelText}>Furigana</Text></View>
            <View style={s.valCol}><Text style={{ fontSize: 9 }}></Text></View>
          </View>
          <View style={{ ...s.row, minHeight: 36 }}>
            <View style={s.labelCol}><Text style={s.labelText}>Address</Text></View>
            <View style={{ ...s.valCol, paddingVertical: 4 }}>
              <Text style={s.valText}>{personal.address || ''}</Text>
            </View>
          </View>
          <View style={{ ...s.rowNoBorder, minHeight: 28 }}>
            <View style={s.labelCol}><Text style={s.labelText}>Phone</Text></View>
            <View style={{ ...s.valCol, borderRightWidth: 0.5, borderRightColor: '#999' }}>
              <Text style={s.valText}>{personal.phone || ''}</Text>
            </View>
            <View style={{ ...s.labelCol, width: 50 }}><Text style={s.labelText}>Email</Text></View>
            <View style={s.valCol}><Text style={s.valText}>{personal.email || ''}</Text></View>
          </View>
        </View>

        <View style={s.sectionTitleBox}>
          <Text style={s.sectionTitleText}>Education &amp; Employment History</Text>
        </View>

        <View style={s.tableBox}>
          <View style={s.tHeadRow}>
            <View style={s.tYearCol}><Text style={s.tHeadText}>Year</Text></View>
            <View style={s.tMonthCol}><Text style={s.tHeadText}>Month</Text></View>
            <View style={{ ...s.valCol, alignItems: 'center' }}><Text style={s.tHeadText}>History</Text></View>
          </View>

          {hasEdu ? (
            <View style={s.tSubHeadRow}>
              <Text style={s.tSubHeadText}>Education</Text>
            </View>
          ) : null}

          {education.map(edu => (
            <React.Fragment key={edu.id}>
              <View style={s.tBodyRow}>
                <View style={s.tYearCol}><Text style={s.tValTextPrimary}>{toJpYear(edu.startYear)}</Text></View>
                <View style={s.tMonthCol}><Text style={s.tValTextPrimary}>{toJpMonth(edu.startYear) || '04'}</Text></View>
                <View style={s.tValCol}><Text style={s.tValTextPrimary}>{edu.institution} {edu.degree} - Enrolled</Text></View>
              </View>
              <View style={s.tBodyRow}>
                <View style={s.tYearCol}><Text style={s.tValTextPrimary}>{toJpYear(edu.endYear)}</Text></View>
                <View style={s.tMonthCol}><Text style={s.tValTextPrimary}>{toJpMonth(edu.endYear) || '03'}</Text></View>
                <View style={s.tValCol}><Text style={s.tValTextPrimary}>{edu.institution} {edu.degree} - Graduated</Text></View>
              </View>
            </React.Fragment>
          ))}

          {hasExp ? (
            <View style={s.tSubHeadRow}>
              <Text style={s.tSubHeadText}>Employment</Text>
            </View>
          ) : null}

          {experience.map(exp => (
            <View key={exp.id} style={s.tBodyRow}>
              <View style={s.tYearCol}><Text style={s.tValTextPrimary}>{toJpYear(exp.startDate)}</Text></View>
              <View style={s.tMonthCol}><Text style={s.tValTextPrimary}>{toJpMonth(exp.startDate)}</Text></View>
              <View style={s.tValCol}>
                <Text style={s.tValTextPrimary}>{exp.company} - Joined</Text>
                {exp.title ? <Text style={s.tValTextSub}>{exp.title}</Text> : null}
              </View>
            </View>
          ))}
          
          <View style={s.tEndRow}>
            <Text style={{ fontSize: 9.5 }}>---</Text>
          </View>
        </View>

        <View style={s.sectionTitleBox}>
          <Text style={s.sectionTitleText}>Qualifications &amp; Skills</Text>
        </View>

        <View style={{ ...s.tableBox, marginBottom: 0 }}>
          <View style={s.qualRow}>
            <View style={s.qualLabelCol}><Text style={s.labelText}>Certifications</Text></View>
            <View style={s.valCol}><Text style={s.tValTextPrimary}>{certText}</Text></View>
          </View>
          <View style={s.qualRow}>
            <View style={s.qualLabelCol}><Text style={s.labelText}>Languages</Text></View>
            <View style={s.valCol}><Text style={s.tValTextPrimary}>{langText}</Text></View>
          </View>
          <View style={{ ...s.qualRow, minHeight: 45, borderBottomWidth: 0 }}>
            <View style={s.qualLabelCol}><Text style={s.labelText}>Skills</Text></View>
            <View style={s.valCol}>
              {hasTech ? <Text style={{ ...s.tValTextPrimary, marginBottom: 2 }}>[Tech] {skills.technical.join(', ')}</Text> : null}
              {hasSoft ? <Text style={s.tValTextPrimary}>[Soft] {skills.soft.join(', ')}</Text> : null}
              {!hasTech && !hasSoft ? <Text style={{ fontSize: 9, color: '#999' }}>None provided</Text> : null}
            </View>
          </View>
        </View>

      </Page>
    </Document>
  )
}
