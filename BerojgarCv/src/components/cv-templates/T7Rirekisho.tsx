import { CVData } from '@/types/cv'
import Image from 'next/image'

export function T7Rirekisho({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const toJpYear = (dateStr: string) => {
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
    const match = dateStr.match(/(\d{1,2})\/\d{4}/)
    if (match) return `${parseInt(match[1])}月`
    return ''
  }

  return (
    <div className="bg-white min-h-[297mm] w-[210mm] text-[10pt] font-serif text-black flex flex-col mx-auto shrink-0 shadow-lg p-12" style={{ fontFamily: '"Noto Serif JP", serif' }}>
      
      {/* Title */}
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-[24pt] font-semibold tracking-widest text-[#2C2C2C]">履歴書</h1>
        <div className="text-[10pt] text-gray-600">
          {new Date().getFullYear()}年 {new Date().getMonth() + 1}月 {new Date().getDate()}日 現在
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left Info Block */}
        <div className="flex-1 border-[0.5px] border-[#999] flex flex-col text-[10.5pt]">
          
          <div className="flex border-b-[0.5px] border-[#999] h-12">
            <div className="w-16 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9]">ふりがな</div>
            <div className="flex-1 flex items-center px-4">{personal.nameFurigana || ''}</div>
          </div>
          
          <div className="flex border-b-[0.5px] border-[#999] h-20">
            <div className="w-16 flex justify-center pt-2 border-r-[0.5px] border-[#999] bg-[#f9f9f9]">氏名</div>
            <div className="flex-1 px-4 flex flex-col justify-center">
              <span className="text-[20pt] font-semibold tracking-widest">{personal.fullName}</span>
            </div>
          </div>

          <div className="flex border-b-[0.5px] border-[#999] h-12">
            <div className="w-24 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9]">生年月日</div>
            <div className="flex-1 flex items-center px-4">
              {personal.dateOfBirth ? `${toJpYear(personal.dateOfBirth)} ${toJpMonth(personal.dateOfBirth)}` : '年 月 日'} 生
            </div>
            <div className="w-20 border-l-[0.5px] border-[#999] flex items-center justify-center bg-[#f9f9f9]">性別</div>
            <div className="w-20 flex items-center justify-center"></div>
          </div>

        </div>

        {/* Photo Box */}
        <div className="w-[70px] h-[90px] border-[0.5px] border-[#999] flex items-center justify-center shrink-0 relative">
          {personal.photo ? (
            <Image src={personal.photo} alt="写真" fill className="object-cover" />
          ) : (
            <span className="text-[#DC143C] font-semibold text-[11pt]">写真必須</span>
          )}
        </div>
      </div>

      {/* Address & Contact */}
      <div className="border-[0.5px] border-[#999] border-t-0 flex flex-col text-[10.5pt] mb-6">
        <div className="flex border-b-[0.5px] border-[#999] h-8">
          <div className="w-16 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9]">ふりがな</div>
          <div className="flex-1 flex items-center px-4"></div>
        </div>
        <div className="flex border-b-[0.5px] border-[#999] min-h-[4rem]">
          <div className="w-16 flex justify-center pt-2 border-r-[0.5px] border-[#999] bg-[#f9f9f9]">現住所</div>
          <div className="flex-1 px-4 pt-2">
            <div>〒</div>
            <div className="mt-1">{personal.address}</div>
          </div>
        </div>
        <div className="flex border-b-[0.5px] border-[#999] h-12">
          <div className="w-24 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9]">電話番号</div>
          <div className="flex-1 flex items-center px-4 border-r-[0.5px] border-[#999]">{personal.phone}</div>
          <div className="w-24 flex items-center justify-center border-r-[0.5px] border-[#999] bg-[#f9f9f9]">Email</div>
          <div className="flex-1 flex items-center px-4 tracking-tighter text-[9.5pt]">{personal.email}</div>
        </div>
      </div>

      {/* History Table */}
      <h2 className="text-[#DC143C] font-semibold text-[11pt] bg-red-50 py-1 px-3 border-l-4 border-[#DC143C] mb-2 tracking-widest">学歴・職歴</h2>
      <div className="border-[0.5px] border-[#999] flex flex-col text-[10.5pt] mb-6">
        <div className="flex border-b-[0.5px] border-[#999] h-8 bg-[#f9f9f9]">
          <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center">年</div>
          <div className="w-12 border-r-[0.5px] border-[#999] flex items-center justify-center">月</div>
          <div className="flex-1 flex items-center justify-center tracking-[1em]">学歴・職歴</div>
        </div>
        
        <div className="flex border-b-[0.5px] border-[#999] h-8 items-center justify-center font-semibold tracking-[2em]">学歴</div>
        {education.map(edu => (
          <div key={edu.id} className="flex border-b-[0.5px] border-[#999] min-h-[2rem]">
            <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center">{toJpYear(edu.startYear)}</div>
            <div className="w-12 border-r-[0.5px] border-[#999] flex items-center justify-center">{toJpMonth(edu.startYear) || '4月'}</div>
            <div className="flex-1 px-4 flex items-center">{edu.institution} {edu.degree} 入学</div>
          </div>
        ))}
        {education.map(edu => (
          <div key={`grad-${edu.id}`} className="flex border-b-[0.5px] border-[#999] min-h-[2rem]">
            <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center">{toJpYear(edu.endYear)}</div>
            <div className="w-12 border-r-[0.5px] border-[#999] flex items-center justify-center">{toJpMonth(edu.endYear) || '3月'}</div>
            <div className="flex-1 px-4 flex items-center">{edu.institution} {edu.degree} 卒業</div>
          </div>
        ))}

        <div className="flex border-b-[0.5px] border-[#999] h-8 items-center justify-center font-semibold tracking-[2em]">職歴</div>
        {experience.map(exp => (
          <div key={exp.id} className="flex border-b-[0.5px] border-[#999] min-h-[2rem]">
            <div className="w-20 border-r-[0.5px] border-[#999] flex items-center justify-center">{toJpYear(exp.startDate)}</div>
            <div className="w-12 border-r-[0.5px] border-[#999] flex items-center justify-center">{toJpMonth(exp.startDate)}</div>
            <div className="flex-1 px-4 flex flex-col py-2 justify-center">
              <div>{exp.company} 入社</div>
              {exp.title && <div className="text-[9.5pt] text-gray-600 pl-4 mt-1">{exp.title}</div>}
              {exp.currentJob && <div className="mt-1">現在に至る</div>}
            </div>
          </div>
        ))}
        <div className="flex border-b-[0.5px] border-[#999] h-8 items-center pr-12 justify-end tracking-widest text-[9.5pt]">以上</div>
      </div>

      {/* Qualifications & Skills */}
      <h2 className="text-[#DC143C] font-semibold text-[11pt] bg-red-50 py-1 px-3 border-l-4 border-[#DC143C] mb-2 tracking-widest mt-auto">免許・資格・スキル等</h2>
      <div className="border-[0.5px] border-[#999] flex flex-col text-[10.5pt]">
        <div className="flex border-b-[0.5px] border-[#999] h-8 bg-[#f9f9f9]">
          <div className="w-32 border-r-[0.5px] border-[#999] flex items-center justify-center">免許・資格</div>
          <div className="flex-1 px-4 flex items-center">
            {cvData.certifications.length > 0 ? cvData.certifications.join(' / ') : '特になし'}
          </div>
        </div>
        <div className="flex border-b-[0.5px] border-[#999] h-8 bg-[#f9f9f9]">
          <div className="w-32 border-r-[0.5px] border-[#999] flex items-center justify-center">語学力 (JLPT等)</div>
          <div className="flex-1 px-4 flex items-center">
            {languages.map(l => `${l.language} (${l.proficiency})`).join(' / ')}
            {personal.jlptLevel && personal.jlptLevel !== 'None' ? ` / 日本語能力試験 ${personal.jlptLevel}` : ''}
          </div>
        </div>
        <div className="flex min-h-[3rem] bg-[#f9f9f9]">
          <div className="w-32 border-r-[0.5px] border-[#999] flex items-center justify-center py-2 text-center text-[9pt]">特技・趣味・<br/>得意科目など</div>
          <div className="flex-1 px-4 py-2 bg-white">
            <div className="text-[9.5pt]">【技術スキル】 {skills.technical.join(', ')}</div>
            <div className="text-[9.5pt] mt-1">【ソフトスキル】 {skills.soft.join(', ')}</div>
          </div>
        </div>
      </div>

    </div>
  )
}
