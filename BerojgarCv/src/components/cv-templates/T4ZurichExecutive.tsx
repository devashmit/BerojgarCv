import { CVData } from '@/types/cv'
import { MapPin, Phone, Mail, Linkedin, Globe } from 'lucide-react'

export function T4ZurichExecutive({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const contacts = [
    { icon: <Mail size={12} />, text: personal.email, id: 'email' },
    { icon: <Phone size={12} />, text: personal.phone, id: 'phone' },
    { icon: <MapPin size={12} />, text: personal.address, id: 'address' },
    { icon: <Linkedin size={12} />, text: personal.linkedin?.replace(/https?:\/\/(www\.)?/, ''), id: 'linkedin' },
    { icon: <Globe size={12} />, text: personal.website?.replace(/https?:\/\/(www\.)?/, ''), id: 'website' }
  ].filter(c => c.text)

  return (
    <div className="bg-white min-h-[297mm] w-[210mm] text-[10pt] font-sans text-neutral-800 flex flex-col mx-auto shrink-0 shadow-lg relative border-t-[4px] border-b-[3px] border-[#0A192F]">
      
      {/* Header */}
      <div className="py-10 px-12 flex flex-col items-center border-b border-gray-100">
        <h1 className="text-[28pt] font-bold tracking-[0.2em] uppercase text-[#0A192F] mb-3">{personal.fullName}</h1>
        <p className="text-[12pt] text-gray-500 font-medium tracking-widest uppercase mb-5">{personal.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {contacts.map(c => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="text-[#0A192F]">{c.icon}</span>
              <span>{c.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-12 pt-8 flex-1 flex flex-col gap-7">
        
        {personal.summary && (
          <div className="text-justify leading-relaxed text-gray-700 text-[10.5pt]">
            <p>{personal.summary}</p>
          </div>
        )}

        <Section title="Professional Experience">
          <div className="flex flex-col gap-6">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[11.5pt] text-[#0A192F]">{exp.title}</h3>
                  <span className="text-[#0A192F] font-bold text-[9pt] bg-gray-100 px-2 py-0.5 rounded-sm">
                    {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-gray-700 font-medium text-[10.5pt] mb-2.5">
                  {exp.company} <span className="text-gray-400 font-normal">| {exp.location}</span>
                </div>
                <ul className="space-y-1.5 ml-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 leading-relaxed text-[10pt]">
                      <span className="text-[#0A192F] text-[14px] leading-tight shrink-0 mt-[1px]">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="flex flex-col gap-4">
            {education.map(edu => (
              <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                <div>
                  <h3 className="font-bold text-[11pt] text-[#0A192F]">{edu.degree}</h3>
                  <div className="text-gray-700 font-medium text-[10pt] mt-0.5">
                    {edu.institution} <span className="text-gray-400 font-normal">| {edu.location}</span>
                  </div>
                  {edu.grade && <div className="text-gray-500 text-[9pt] mt-1">Grade: {edu.grade}</div>}
                </div>
                <div className="text-[#0A192F] font-bold text-[9pt] bg-gray-100 px-2 py-0.5 rounded-sm">
                  {edu.startYear} – {edu.endYear}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Core Competencies">
          <div className="flex flex-wrap gap-2 text-[9.5pt]">
            {skills.technical.map((skill, i) => (
              <span key={`tech-${i}`} className="bg-[#0A192F] text-white px-3 py-1 rounded-sm shadow-sm">{skill}</span>
            ))}
            {skills.soft.map((skill, i) => (
              <span key={`soft-${i}`} className="bg-gray-100 text-[#0A192F] border border-gray-200 px-3 py-1 rounded-sm shadow-sm">{skill}</span>
            ))}
            {languages.map((lang, i) => (
              <span key={`lang-${i}`} className="bg-gray-100 text-[#0A192F] border border-gray-200 px-3 py-1 rounded-sm shadow-sm">
                {lang.language} ({lang.proficiency})
              </span>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )

  function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
      <section>
        <div className="flex items-center gap-4 mb-5">
          <h2 className="text-[#0A192F] font-bold uppercase tracking-widest text-[12pt] shrink-0">{title}</h2>
          <div className="flex-1 h-[1px] bg-gray-300 relative">
            <div className="absolute left-0 top-0 h-full w-12 bg-[#0A192F]" />
          </div>
        </div>
        {children}
      </section>
    )
  }
}
