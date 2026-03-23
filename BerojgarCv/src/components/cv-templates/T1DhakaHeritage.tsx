import { CVData } from '@/types/cv'
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from 'lucide-react'
import Image from 'next/image'

export function T1DhakaHeritage({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages, certifications, references } = cvData

  const Diamond = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0L12 6L6 12L0 6L6 0Z" fill="#D4AF37"/>
    </svg>
  )

  return (
    <div className="bg-white min-h-[297mm] w-[210mm] text-[10pt] leading-snug font-sans text-neutral-800 flex flex-col mx-auto shrink-0 shadow-lg">
      <div className="w-full bg-[#C0392B] text-white pt-8 pb-6 px-12 border-t-[3px] border-b-[3px] border-[#D4AF37] flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-wide uppercase mb-2">{personal.fullName}</h1>
          <p className="text-[#D4AF37] text-lg font-medium mb-3">{personal.jobTitle}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-light text-white/90">
            {personal.email && (
              <span className="flex items-center gap-1.5"><Mail size={14}/> {personal.email}</span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1.5"><Phone size={14}/> {personal.phone}</span>
            )}
            {personal.address && (
              <span className="flex items-center gap-1.5"><MapPin size={14}/> {personal.address}</span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1.5"><Linkedin size={14}/> {personal.linkedin}</span>
            )}
            {personal.github && (
              <span className="flex items-center gap-1.5"><Github size={14}/> {personal.github}</span>
            )}
          </div>
        </div>
        
        <div className="w-[90px] h-[110px] bg-white/10 shrink-0 ml-6 flex items-center justify-center border border-white/30 overflow-hidden relative">
          {personal.photo ? (
            <Image src={personal.photo} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="w-[80px] h-[100px] border border-dashed border-white/50" />
          )}
        </div>
      </div>

      <div className="p-12 pt-8 flex-1 flex flex-col gap-6">
        {personal.summary && (
          <div>
            <p className="text-justify leading-relaxed">{personal.summary}</p>
          </div>
        )}

        <Section title="Experience">
          <div className="flex flex-col gap-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[11pt] text-gray-900">{exp.title}</h3>
                  <span className="text-gray-500 text-[9pt] font-medium">
                    {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[#C0392B] font-medium text-[10pt] mb-1.5">
                  {exp.company} <span className="text-gray-500 font-normal">| {exp.location}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="flex flex-col gap-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[11pt] text-gray-900">{edu.degree}</h3>
                  <span className="text-gray-500 text-[9pt] font-medium">{edu.startYear} – {edu.endYear}</span>
                </div>
                <div className="text-[#C0392B] font-medium text-[10pt]">
                  {edu.institution} <span className="text-gray-500 font-normal">| {edu.location}</span>
                </div>
                {edu.grade && <div className="text-gray-600 mt-0.5">Grade: {edu.grade}</div>}
              </div>
            ))}
          </div>
        </Section>

        <div className="flex gap-8">
          <div className="flex-1 shrink-0">
            <Section title="Skills">
              <div className="mb-3">
                <span className="font-semibold text-gray-800">Technical: </span>
                <span className="text-gray-700 leading-relaxed">{skills.technical.join(', ')}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Soft Skills: </span>
                <span className="text-gray-700 leading-relaxed">{skills.soft.join(', ')}</span>
              </div>
            </Section>
          </div>

          <div className="w-[180px] shrink-0">
            <Section title="Languages">
              <ul className="space-y-1.5">
                {languages.map((lang, i) => (
                  <li key={i} className="flex justify-between">
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        {certifications.length > 0 && (
          <Section title="Certifications">
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 mt-2">
              {certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  )

  function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Diamond />
          <h2 className="text-[#C0392B] font-bold uppercase tracking-widest text-[11pt]">{title}</h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#C0392B] to-transparent ml-2 opacity-50" />
        </div>
        {children}
      </section>
    )
  }
}
