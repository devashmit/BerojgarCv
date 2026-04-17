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
    if (!dateStr) return '　月'
    const match = dateStr.match(/(\d{1,2})\/\d{4}/) || dateStr.match(/\d{4}-(\d{2})/)
    if (match) return `${parseInt(match[1])}月`
    return ''
  }

  const Row = ({ label, children, height = 'h-12' }: { label: string; children: React.ReactNode; height?: string }) => (
    <div className={`flex border-b-[0.5px] border-[#999] ${height}`}>
      <div className="w-20 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt] text-center leading-tight px-1">
        {label}
      </div>
      <div className="flex-1 flex items-center px-3 text-[10pt]">{children}</div>
    </div>
  )

  const hasEdu = education.length > 0
  const hasExp = experience.length > 0
  const hasCerts = certifications.length > 0
  const hasLangs = languages.length > 0
  const hasTech = skills.technical.length > 0
  const hasSoft = skills.soft.length > 0

  const certText = hasCerts ? certifications.join(' / ') : '特になし'
  const langText = hasLangs
    ? languages.map(l => `${l.language} (${l.proficiency})`).join(' / ') +
      (personal.jlptLevel && personal.jlptLevel !== 'None' ? ` / 日本語能力試験 ${personal.jlptLevel}` : '')
    : '特になし'

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] text-[10pt] text-black flex flex-col mx-auto shrink-0 px-[32px] py-[32px]"
      style={{ fontFamily: '"Noto Serif JP", "Noto Serif", serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {/* Title row */}
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-[24pt] font-semibold tracking-widest text-[#2C2C2C]">履歴書</h1>
        <div className="text-[10pt] text-gray-600">
          {new Date().getFullYear()}年 {new Date().getMonth() + 1}月 {new Date().getDate()}日 現在
        </div>
      </div>

      {/* Name + photo block */}
      <div className="flex gap-3 mb-0">
        <div className="flex-1 border-[0.5px] border-[#999] flex flex-col">

          {/* Furigana */}
          {personal.nameFurigana ? (
            <Row label="ふりがな" height="h-8">
              <span className="text-[9.5pt]">{personal.nameFurigana}</span>
            </Row>
          ) : (
            <div className="h-8 border-b-[0.5px] border-[#999] flex">
              <div className="w-20 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt]">ふりがな</div>
              <div className="flex-1" />
            </div>
          )}

          {/* Full Name */}
          <div className="flex border-b-[0.5px] border-[#999] min-h-[64px]">
            <div className="w-20 flex justify-center pt-2 border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt]">氏名</div>
            <div className="flex-1 px-3 flex flex-col justify-center">
              <span className="text-[18pt] font-semibold tracking-widest">{personal.fullName || '　'}</span>
            </div>
          </div>

          {/* DOB + gender */}
          <div className="flex border-b-[0.5px] border-[#999] h-12">
            <div className="w-20 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt]">生年月日</div>
            <div className="flex-1 flex items-center px-3 text-[9.5pt]">
              {personal.dateOfBirth
                ? `${toJpYear(personal.dateOfBirth)} ${toJpMonth(personal.dateOfBirth)} 生`
                : '　　年　月　日 生'}
            </div>
            <div className="w-16 border-l-[0.5px] border-[#999] flex items-center justify-center bg-[#f9f9f9] text-[9pt]">性別</div>
            <div className="w-12 flex items-center justify-center text-[9pt]" />
          </div>
        </div>

        {/* Photo */}
        <div className="w-[70px] h-[90px] border-[0.5px] border-[#999] flex items-center justify-center shrink-0 relative">
          {personal.photo ? (
            <Image src={personal.photo} alt="写真" fill className="object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-0.5">
              <span className="text-[#DC143C] font-semibold text-[9pt] text-center leading-tight">写真<br/>必須</span>
            </div>
          )}
        </div>
      </div>

      {/* Address + contact */}
      <div className="border-[0.5px] border-[#999] border-t-0 flex flex-col mb-5">
        <div className="flex border-b-[0.5px] border-[#999] h-8">
          <div className="w-20 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt]">ふりがな</div>
          <div className="flex-1 flex items-center px-3 text-[9.5pt]">{personal.nameFurigana ? '' : ''}</div>
        </div>
        <div className="flex border-b-[0.5px] border-[#999] min-h-[56px]">
          <div className="w-20 flex justify-center pt-2 border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt]">現住所</div>
          <div className="flex-1 px-3 pt-2 text-[9.5pt]">
            <div>〒</div>
            <div className="mt-1">{personal.address || '　'}</div>
          </div>
        </div>
        <div className="flex h-10">
          <div className="w-24 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt]">電話番号</div>
          <div className="flex-1 flex items-center px-3 border-r-[0.5px] border-[#999] text-[9.5pt]">{personal.phone || '　'}</div>
          <div className="w-16 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9] text-[9pt]">Email</div>
          <div className="flex-1 flex items-center px-3 text-[9pt] break-all">{personal.email || '　'}</div>
        </div>
      </div>

      {/* History table */}
      <h2 className="text-[#DC143C] font-semibold text-[10.5pt] bg-red-50 py-1 px-3 border-l-4 border-[#DC143C] mb-1.5 tracking-widest">学歴・職歴</h2>
      <div className="border-[0.5px] border-[#999] flex flex-col mb-5">
        {/* Header row */}
        <div className="flex border-b-[0.5px] border-[#999] h-8 bg-[#f9f9f9] text-[9pt]">
          <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center">年</div>
          <div className="w-10 border-r-[0.5px] border-[#999] flex items-center justify-center">月</div>
          <div className="flex-1 flex items-center justify-center tracking-[0.5em]">学歴・職歴</div>
        </div>

        {/* Education section header */}
        {hasEdu && (
          <div className="flex border-b-[0.5px] border-[#999] h-8 items-center justify-center font-semibold tracking-[2em] text-[9.5pt] bg-[#fafafa]">学歴</div>
        )}
        {education.map(edu => (
          <React.Fragment key={edu.id}>
            <div className="flex border-b-[0.5px] border-[#999] min-h-[2rem]">
              <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center text-[9pt]">{toJpYear(edu.startYear)}</div>
              <div className="w-10 border-r-[0.5px] border-[#999] flex items-center justify-center text-[9pt]">{toJpMonth(edu.startYear) || '4月'}</div>
              <div className="flex-1 px-3 flex items-center text-[9.5pt]">{edu.institution} {edu.degree} 入学</div>
            </div>
            <div className="flex border-b-[0.5px] border-[#999] min-h-[2rem]">
              <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center text-[9pt]">{toJpYear(edu.endYear)}</div>
              <div className="w-10 border-r-[0.5px] border-[#999] flex items-center justify-center text-[9pt]">{toJpMonth(edu.endYear) || '3月'}</div>
              <div className="flex-1 px-3 flex items-center text-[9.5pt]">{edu.institution} {edu.degree} 卒業</div>
            </div>
          </React.Fragment>
        ))}

        {/* Experience section header */}
        {hasExp && (
          <div className="flex border-b-[0.5px] border-[#999] h-8 items-center justify-center font-semibold tracking-[2em] text-[9.5pt] bg-[#fafafa]">職歴</div>
        )}
        {experience.map(exp => (
          <div key={exp.id} className="flex border-b-[0.5px] border-[#999] min-h-[2rem]">
            <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center text-[9pt]">{toJpYear(exp.startDate)}</div>
            <div className="w-10 border-r-[0.5px] border-[#999] flex items-center justify-center text-[9pt]">{toJpMonth(exp.startDate)}</div>
            <div className="flex-1 px-3 flex flex-col py-1.5 justify-center text-[9.5pt]">
              <div>{exp.company} 入社</div>
              {exp.title && <div className="text-[9pt] text-gray-600 pl-3 mt-0.5">{exp.title}</div>}
              {exp.currentJob && <div className="mt-0.5">現在に至る</div>}
            </div>
          </div>
        ))}
        <div className="flex border-b-[0.5px] border-[#999] h-8 items-center pr-10 justify-end tracking-widest text-[9.5pt]">以上</div>
      </div>

      {/* Qualifications & Skills */}
      <h2 className="text-[#DC143C] font-semibold text-[10.5pt] bg-red-50 py-1 px-3 border-l-4 border-[#DC143C] mb-1.5 tracking-widest">免許・資格・スキル等</h2>
      <div className="border-[0.5px] border-[#999] flex flex-col">
        <div className="flex border-b-[0.5px] border-[#999] min-h-[2.5rem]">
          <div className="w-28 border-r-[0.5px] border-[#999] flex items-center justify-center bg-[#f9f9f9] text-[9pt] text-center px-1">免許・資格</div>
          <div className="flex-1 px-3 flex items-center text-[9.5pt] flex-wrap">{certText}</div>
        </div>
        <div className="flex border-b-[0.5px] border-[#999] min-h-[2.5rem]">
          <div className="w-28 border-r-[0.5px] border-[#999] flex items-center justify-center bg-[#f9f9f9] text-[9pt] text-center px-1">語学力</div>
          <div className="flex-1 px-3 flex items-center text-[9.5pt] flex-wrap">{langText}</div>
        </div>
        <div className="flex min-h-[3.5rem]">
          <div className="w-28 border-r-[0.5px] border-[#999] flex items-center justify-center bg-[#f9f9f9] text-[9pt] text-center px-1 py-2 leading-tight">特技・趣味・<br/>得意科目など</div>
          <div className="flex-1 px-3 py-2 bg-white text-[9.5pt]">
            {hasTech && <div>【技術スキル】 {skills.technical.join(', ')}</div>}
            {hasSoft && <div className="mt-1">【ソフトスキル】 {skills.soft.join(', ')}</div>}
            {!hasTech && !hasSoft && <div className="text-gray-400">記入してください</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

