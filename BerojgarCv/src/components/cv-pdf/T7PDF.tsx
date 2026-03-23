// @ts-nocheck
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'

Font.register({
  family: 'Noto Serif JP',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/notoserifjp/v30/xn71YHs72GKoTvER4Gn3b5eMRtWGkp2pKA.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/notoserifjp/v30/xn71YHs72GKoTvER4Gn3b5eMRtWGkp2pKA.ttf', fontWeight: 700 },
  ],
})

const styles = StyleSheet.create({
  page: { fontFamily: 'Noto Serif JP', padding: 40, backgroundColor: '#FFFFFF', fontSize: 10, color: '#000' },
  headerTitleWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', tracking: 2, color: '#2C2C2C' },
  headerDate: { fontSize: 10, color: '#666' },

  row: { flexDirection: 'row' },
  colNameInfo: { flex: 1, border: 0.5, borderColor: '#999', borderRight: 0 },
  photoBox: { width: 70, height: 90, border: 0.5, borderColor: '#999', justifyContent: 'center', alignItems: 'center' },
  photoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  photoMissing: { color: '#DC143C', fontSize: 10, fontWeight: 'bold' },

  infoRow1: { flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', height: 16 },
  infoLabelSmall: { width: 50, borderRight: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', fontSize: 8 },
  infoContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 6, fontSize: 10 },

  infoRow2: { flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', height: 50 },
  infoLabelBig: { width: 50, borderRight: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', paddingTop: 6, alignItems: 'center', fontSize: 10 },
  nameContent: { flex: 1, paddingHorizontal: 10, justifyContent: 'center' },
  nameText: { fontSize: 20, fontWeight: 'bold', tracking: 4 },

  infoRow3: { flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', height: 24 },
  labelBirth: { width: 80, borderRight: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', fontSize: 10 },
  contentBirth: { flex: 1, justifyContent: 'center', paddingHorizontal: 6, borderRight: 0.5, borderRightColor: '#999' },
  labelGender: { width: 40, borderRight: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', fontSize: 10 },
  contentGender: { width: 40, justifyContent: 'center', alignItems: 'center' },

  contactBlock: { border: 0.5, borderColor: '#999', borderTop: 0, marginBottom: 15 },
  addressContent: { flex: 1, padding: 6, paddingTop: 4 },
  addressText: { fontSize: 10, marginTop: 2 },
  contactRow: { flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', height: 24 },
  labelPhone: { width: 80, borderRight: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', fontSize: 10 },
  labelEmail: { width: 60, borderRight: 0.5, borderRightColor: '#999', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', fontSize: 10 },

  sectionTitleWrap: { backgroundColor: '#FEF2F2', paddingVertical: 2, paddingHorizontal: 6, borderLeft: 3, borderLeftColor: '#DC143C', marginBottom: 6 },
  sectionTitleText: { color: '#DC143C', fontWeight: 'bold', fontSize: 10, tracking: 1 },

  table: { border: 0.5, borderColor: '#999', marginBottom: 15 },
  tableCol1: { width: 60, borderRight: 0.5, borderRightColor: '#999', justifyContent: 'center', alignItems: 'center' },
  tableCol2: { width: 40, borderRight: 0.5, borderRightColor: '#999', justifyContent: 'center', alignItems: 'center' },
  tableCol3: { flex: 1, paddingHorizontal: 10, justifyContent: 'center' },
  tableHeaderItem: { flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', height: 20, backgroundColor: '#f9f9f9' },
  tableRow: { flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', minHeight: 22 },
  subHeaderRow: { height: 20, justifyContent: 'center', alignItems: 'center', borderBottom: 0.5, borderBottomColor: '#999', fontWeight: 'bold', tracking: 15 },

  qualRow: { flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', minHeight: 24, backgroundColor: '#f9f9f9' },
  qualLabel: { width: 100, borderRight: 0.5, borderRightColor: '#999', justifyContent: 'center', alignItems: 'center', fontSize: 9.5 },
  qualContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 8, backgroundColor: '#fff' },

  endText: { alignItems: 'flex-end', paddingRight: 40, height: 20, justifyContent: 'center', fontSize: 9.5, borderBottom: 0.5, borderBottomColor: '#999' }
})

export function T7PDF({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const toJpYear = (dateStr: string) => {
    const match = dateStr?.match(/\d{4}/)
    if (!match) return dateStr || ''
    const year = parseInt(match[0], 10)
    if (year >= 2019) {
      const r = year - 2018
      return `令和${r === 1 ? '元' : r}年`
    } else if (year >= 1989) {
      const h = year - 1988
      return `平成${h === 1 ? '元' : h}年`
    }
    return `${year}年`
  }

  const toJpMonth = (dateStr: string) => {
    const match = dateStr?.match(/(\d{1,2})\/\d{4}/)
    if (match) return `${parseInt(match[1])}月`
    return ''
  }

  const date = new Date()

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>履歴書</Text>
          <Text style={styles.headerDate}>{date.getFullYear()}年 {date.getMonth() + 1}月 {date.getDate()}日 現在</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.colNameInfo}>
            <View style={styles.infoRow1}>
              <View style={styles.infoLabelSmall}><Text>ふりがな</Text></View>
              <View style={styles.infoContent}><Text>{personal.nameFurigana || ''}</Text></View>
            </View>
            <View style={styles.infoRow2}>
              <View style={styles.infoLabelBig}><Text>氏名</Text></View>
              <View style={styles.nameContent}>
                <Text style={styles.nameText}>{personal.fullName}</Text>
              </View>
            </View>
            <View style={[styles.infoRow3, { borderBottom: 0 }]}>
              <View style={styles.labelBirth}><Text>生年月日</Text></View>
              <View style={styles.contentBirth}>
                <Text>{personal.dateOfBirth ? `${toJpYear(personal.dateOfBirth)} ${toJpMonth(personal.dateOfBirth)}` : '年 月 日'} 生</Text>
              </View>
              <View style={styles.labelGender}><Text>性別</Text></View>
              <View style={styles.contentGender}><Text></Text></View>
            </View>
          </View>
          <View style={styles.photoBox}>
            {personal.photo ? (
              <Image src={personal.photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.photoMissing}>写真必須</Text>
            )}
          </View>
        </View>

        <View style={styles.contactBlock}>
          <View style={styles.infoRow1}>
            <View style={styles.infoLabelSmall}><Text>ふりがな</Text></View>
            <View style={styles.infoContent}><Text></Text></View>
          </View>
          <View style={{flexDirection: 'row', borderBottom: 0.5, borderBottomColor: '#999', minHeight: 40}}>
            <View style={styles.infoLabelBig}><Text>現住所</Text></View>
            <View style={styles.addressContent}>
              <Text>〒</Text>
              <Text style={styles.addressText}>{personal.address}</Text>
            </View>
          </View>
          <View style={[styles.contactRow, { borderBottom: 0 }]}>
            <View style={styles.labelPhone}><Text>電話番号</Text></View>
            <View style={[styles.infoContent, { borderRight: 0.5, borderRightColor: '#999' }]}><Text>{personal.phone}</Text></View>
            <View style={styles.labelEmail}><Text>Email</Text></View>
            <View style={styles.infoContent}><Text>{personal.email}</Text></View>
          </View>
        </View>

        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitleText}>学歴・職歴</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderItem}>
            <View style={styles.tableCol1}><Text>年</Text></View>
            <View style={styles.tableCol2}><Text>月</Text></View>
            <View style={[styles.tableCol3, { alignItems: 'center' }]}><Text style={{tracking: 10}}>学歴・職歴</Text></View>
          </View>
          
          <View style={styles.subHeaderRow}><Text>学歴</Text></View>
          
          {education.map(edu => (
            <View key={`in-${edu.id}`} style={styles.tableRow}>
              <View style={styles.tableCol1}><Text>{toJpYear(edu.startYear)}</Text></View>
              <View style={styles.tableCol2}><Text>{toJpMonth(edu.startYear) || '4月'}</Text></View>
              <View style={styles.tableCol3}><Text>{edu.institution} {edu.degree} 入学</Text></View>
            </View>
          ))}
          {education.map(edu => (
            <View key={`out-${edu.id}`} style={styles.tableRow}>
              <View style={styles.tableCol1}><Text>{toJpYear(edu.endYear)}</Text></View>
              <View style={styles.tableCol2}><Text>{toJpMonth(edu.endYear) || '3月'}</Text></View>
              <View style={styles.tableCol3}><Text>{edu.institution} {edu.degree} 卒業</Text></View>
            </View>
          ))}

          <View style={styles.subHeaderRow}><Text>職歴</Text></View>
          {experience.map(exp => (
            <View key={exp.id} style={styles.tableRow}>
              <View style={styles.tableCol1}><Text>{toJpYear(exp.startDate)}</Text></View>
              <View style={styles.tableCol2}><Text>{toJpMonth(exp.startDate)}</Text></View>
              <View style={[styles.tableCol3, { paddingVertical: 4 }]}>
                <Text>{exp.company} 入社</Text>
                {exp.title && <Text style={{fontSize: 9, color: '#4b5563', paddingLeft: 10, marginTop: 2}}>{exp.title}</Text>}
                {exp.currentJob && <Text style={{marginTop: 2}}>現在に至る</Text>}
              </View>
            </View>
          ))}
          <View style={styles.endText}><Text style={{tracking: 2}}>以上</Text></View>
        </View>


        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitleText}>免許・資格・スキル等</Text>
        </View>

        <View style={[styles.table, { marginBottom: 0 }]}>
          <View style={styles.qualRow}>
            <View style={styles.qualLabel}><Text>免許・資格</Text></View>
            <View style={styles.qualContent}>
              <Text>{cvData.certifications.length > 0 ? cvData.certifications.join(' / ') : '特になし'}</Text>
            </View>
          </View>
          <View style={styles.qualRow}>
            <View style={styles.qualLabel}><Text>語学力 (JLPT等)</Text></View>
            <View style={styles.qualContent}>
              <Text>
                {languages.map(l => `${l.language} (${l.proficiency})`).join(' / ')}
                {personal.jlptLevel && personal.jlptLevel !== 'None' ? ` / 日本語能力試験 ${personal.jlptLevel}` : ''}
              </Text>
            </View>
          </View>
          <View style={[styles.qualRow, { minHeight: 45, borderBottom: 0 }]}>
            <View style={styles.qualLabel}><Text style={{textAlign: 'center', lineHeight: 1.4}}>特技・趣味・{'\n'}得意科目など</Text></View>
            <View style={[styles.qualContent, { paddingVertical: 6 }]}>
              <Text style={{lineHeight: 1.4}}>【技術スキル】 {skills.technical.join(', ')}</Text>
              <Text style={{marginTop: 2, lineHeight: 1.4}}>【ソフトスキル】 {skills.soft.join(', ')}</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  )
}
