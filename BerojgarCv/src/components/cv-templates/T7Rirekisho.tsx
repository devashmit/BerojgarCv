import React from 'react'
import { CVData } from '@/types/cv'
import Image from 'next/image'

export function T7Rirekisho({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications } = cvData

  const toJpYear = (dateStr: string) => {
    if (!dateStr) return '　　年'
    const match = dateStr.match(/\d{4}/)
    if (!match) return dateStr
    const year = parseInt(match[0], 10)
    if (year >= 2019) return `令和${year - 2018 === 1 ? '元' : year - 2018}年`
    if (year >= 1989) return `平成${year - 1988 === 1 ? '元' : year - 1988}年`
    return `${year}年`
  }

  const toJpMonth = (dateStr: string) => {
    if (!dateStr) return '　月'
    const m = dateStr.match(/(\d{1,2})\/\d{4}/) || dateStr.match(/\d{4}-(\d{2})/)
    return m ? `${parseInt(m[1])}月` : ''
  }

  const border = '0.5px solid #999'
  const cellBg = '#F9F9F9'
  const labelStyle: React.CSSProperties = { fontSize: 11, background: cellBg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: border, padding: '4px 6px', textAlign: 'center', lineHeight: 1.4, flexShrink: 0 }
  const cellStyle: React.CSSProperties = { fontSize: 12, display: 'flex', alignItems: 'center', padding: '4px 10px', flex: 1 }
  const sectionHead: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: '#DC143C', background: '#FFF5F5', padding: '5px 12px', borderLeft: '4px solid #DC143C', marginBottom: 6, letterSpacing: '0.1em' }

  const certText = certifications.length > 0 ? certifications.join(' / ') : '特になし'
  const langText = languages.length > 0
    ? languages.map(l => `${l.language} (${l.proficiency})`).join(' / ') +
      (personal.jlptLevel && personal.jlptLevel !== 'None' ? ` / JLPT ${personal.jlptLevel}` : '')
    : '特になし'

  return (
    <div
      id="cv-preview-root"
      style={{ fontFamily: '"Noto Serif JP", "Noto Serif", serif', fontSize: 12, color: '#000', background: '#fff', width: 794, minHeight: 1123, padding: '32px 36px', boxSizing: 'border-box' as const }}
    >
      {/* Title + date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '0.2em', margin: 0 }}>履歴書</h1>
        <div style={{ fontSize: 11, color: '#555' }}>
          {new Date().getFullYear()}年 {new Date().getMonth() + 1}月 {new Date().getDate()}日 現在
        </div>
      </div>

      {/* Name + photo */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 0 }}>
        <div style={{ flex: 1, border }}>
          {/* Furigana */}
          <div style={{ display: 'flex', borderBottom: border, minHeight: 30 }}>
            <div style={{ ...labelStyle, width: 72 }}>ふりがな</div>
            <div style={{ ...cellStyle, fontSize: 11 }}>{personal.nameFurigana || ''}</div>
          </div>
          {/* Name */}
          <div style={{ display: 'flex', borderBottom: border, minHeight: 60 }}>
            <div style={{ ...labelStyle, width: 72, alignItems: 'flex-start', paddingTop: 8 }}>氏名</div>
            <div style={{ ...cellStyle, fontSize: 20, fontWeight: 600, letterSpacing: '0.15em' }}>{personal.fullName || '　'}</div>
          </div>
          {/* DOB */}
          <div style={{ display: 'flex', minHeight: 40 }}>
            <div style={{ ...labelStyle, width: 72 }}>生年月日</div>
            <div style={{ ...cellStyle, fontSize: 11 }}>
              {personal.dateOfBirth ? `${toJpYear(personal.dateOfBirth)} ${toJpMonth(personal.dateOfBirth)} 生` : '　　年　月　日 生'}
            </div>
            <div style={{ ...labelStyle, width: 52, borderLeft: border }}>性別</div>
            <div style={{ ...cellStyle, width: 48, flex: 'none' }} />
          </div>
        </div>
        {/* Photo */}
        <div style={{ width: 72, height: 92, border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          {personal.photo
            ? <Image src={personal.photo} alt="写真" fill style={{ objectFit: 'cover' }} />
            : <span style={{ fontSize: 10, color: '#DC143C', fontWeight: 600, textAlign: 'center', lineHeight: 1.4 }}>写真<br/>必須</span>}
        </div>
      </div>

      {/* Address + contact */}
      <div style={{ border, borderTop: 'none', marginBottom: 16 }}>
        <div style={{ display: 'flex', borderBottom: border, minHeight: 28 }}>
          <div style={{ ...labelStyle, width: 72 }}>ふりがな</div>
          <div style={{ ...cellStyle, fontSize: 11 }} />
        </div>
        <div style={{ display: 'flex', borderBottom: border, minHeight: 52 }}>
          <div style={{ ...labelStyle, width: 72, alignItems: 'flex-start', paddingTop: 8 }}>現住所</div>
          <div style={{ ...cellStyle, flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
            <div style={{ fontSize: 11 }}>〒</div>
            <div style={{ fontSize: 12 }}>{personal.address || '　'}</div>
          </div>
        </div>
        <div style={{ display: 'flex', minHeight: 38 }}>
          <div style={{ ...labelStyle, width: 80 }}>電話番号</div>
          <div style={{ ...cellStyle, borderRight: border }}>{personal.phone || '　'}</div>
          <div style={{ ...labelStyle, width: 52 }}>Email</div>
          <div style={{ ...cellStyle, fontSize: 11 }}>{personal.email || '　'}</div>
        </div>
      </div>

      {/* Education & Work History */}
      <div style={sectionHead}>学歴・職歴</div>
      <div style={{ border, marginBottom: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', borderBottom: border, minHeight: 30, background: cellBg }}>
          <div style={{ ...labelStyle, width: 72 }}>年</div>
          <div style={{ ...labelStyle, width: 40 }}>月</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, letterSpacing: '0.3em' }}>学歴・職歴</div>
        </div>

        {education.length > 0 && (
          <div style={{ display: 'flex', borderBottom: border, minHeight: 30, alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', fontSize: 11, letterSpacing: '1.5em' }}>学歴</div>
        )}
        {education.map((edu, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', borderBottom: border, minHeight: 32 }}>
              <div style={{ ...labelStyle, width: 72 }}>{toJpYear(edu.startYear)}</div>
              <div style={{ ...labelStyle, width: 40 }}>{toJpMonth(edu.startYear) || '4月'}</div>
              <div style={{ ...cellStyle }}>{edu.institution} {edu.degree} 入学</div>
            </div>
            <div style={{ display: 'flex', borderBottom: border, minHeight: 32 }}>
              <div style={{ ...labelStyle, width: 72 }}>{toJpYear(edu.endYear)}</div>
              <div style={{ ...labelStyle, width: 40 }}>{toJpMonth(edu.endYear) || '3月'}</div>
              <div style={{ ...cellStyle }}>{edu.institution} {edu.degree} 卒業</div>
            </div>
          </React.Fragment>
        ))}

        {experience.length > 0 && (
          <div style={{ display: 'flex', borderBottom: border, minHeight: 30, alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', fontSize: 11, letterSpacing: '1.5em' }}>職歴</div>
        )}
        {experience.map((exp, i) => (
          <div key={i} style={{ display: 'flex', borderBottom: border, minHeight: 36 }}>
            <div style={{ ...labelStyle, width: 72 }}>{toJpYear(exp.startDate)}</div>
            <div style={{ ...labelStyle, width: 40 }}>{toJpMonth(exp.startDate)}</div>
            <div style={{ ...cellStyle, flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              <div>{exp.company} 入社</div>
              {exp.title && <div style={{ fontSize: 11, color: '#555', paddingLeft: 12 }}>{exp.title}</div>}
              {exp.currentJob && <div>現在に至る</div>}
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', borderBottom: border, minHeight: 30, alignItems: 'center', justifyContent: 'flex-end', paddingRight: 40, fontSize: 11, letterSpacing: '0.2em' }}>以上</div>
      </div>

      {/* Qualifications */}
      <div style={sectionHead}>免許・資格・スキル等</div>
      <div style={{ border }}>
        <div style={{ display: 'flex', borderBottom: border, minHeight: 38 }}>
          <div style={{ ...labelStyle, width: 96 }}>免許・資格</div>
          <div style={{ ...cellStyle, flexWrap: 'wrap' }}>{certText}</div>
        </div>
        <div style={{ display: 'flex', borderBottom: border, minHeight: 38 }}>
          <div style={{ ...labelStyle, width: 96 }}>語学力</div>
          <div style={{ ...cellStyle, flexWrap: 'wrap' }}>{langText}</div>
        </div>
        <div style={{ display: 'flex', minHeight: 52 }}>
          <div style={{ ...labelStyle, width: 96, flexDirection: 'column', gap: 2, lineHeight: 1.5 }}>
            <span>特技・趣味</span><span>得意科目</span>
          </div>
          <div style={{ ...cellStyle, flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            {skills.technical.length > 0 && <div>【技術】 {skills.technical.join(', ')}</div>}
            {skills.soft.length > 0 && <div>【ソフト】 {skills.soft.join(', ')}</div>}
            {skills.technical.length === 0 && skills.soft.length === 0 && <div style={{ color: '#aaa' }}>記入してください</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
