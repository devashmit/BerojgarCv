import { CVData } from '@/types/cv'

export function T5NovaSidebar({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, languages } = cvData

  const NameInitials = () => {
    const initials = personal.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')
    return (
      <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 rotate-45 mb-8 mx-auto shadow-xl">
        <span className="text-2xl font-bold tracking-widest -rotate-45 block">{initials}</span>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-[297mm] w-[210mm] text-[10pt] font-sans text-neutral-800 flex mx-auto shrink-0 shadow-lg">
      
      {/* Sidebar */}
      <div className="w-[188px] bg-[#2D4739] shrink-0 text-white p-8 pt-12 flex flex-col">
        <NameInitials />

        <h2 className="text-xl font-bold leading-tight mb-2 uppercase text-center">{personal.fullName}</h2>
        <p className="text-[#A5C9B3] text-sm text-center mb-10 pb-6 border-b border-white/10">{personal.jobTitle}</p>

        <div className="flex flex-col gap-8">
          
          <div>
            <h3 className="uppercase tracking-widest text-[10px] text-[#A5C9B3] mb-4 font-bold">Contact</h3>
            <ul className="space-y-3 text-xs font-light">
              {personal.email && (
                <li className="flex items-baseline gap-2">
                  <span className="text-[#A5C9B3] text-[8px]">•</span> {personal.email}
                </li>
              )}
              {personal.phone && (
                <li className="flex items-baseline gap-2">
                  <span className="text-[#A5C9B3] text-[8px]">•</span> {personal.phone}
                </li>
              )}
              {personal.address && (
                <li className="flex items-baseline gap-2">
                  <span className="text-[#A5C9B3] text-[8px]">•</span> {personal.address}
                </li>
              )}
              {personal.linkedin && (
                <li className="flex items-baseline gap-2">
                  <span className="text-[#A5C9B3] text-[8px]">•</span> {personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-[10px] text-[#A5C9B3] mb-4 font-bold">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.technical.map(s => (
                <span key={s} className="bg-white/10 px-2 py-1 text-[10px] rounded-full border border-white/5">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-[10px] text-[#A5C9B3] mb-4 font-bold">Languages</h3>
            <ul className="space-y-3 text-xs">
              {languages.map((l, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="font-light">{l.language}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(d => (
                      <div key={d} className={`w-1.5 h-1.5 rounded-full ${d <= (l.proficiency === 'Native' ? 5 : l.proficiency === 'Fluent' ? 4 : l.proficiency === 'Professional' ? 3 : 2) ? 'bg-[#A5C9B3]' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Main Column */}
      <div className="flex-1 p-10 pt-12 relative flex flex-col gap-8">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#2D4739] to-[#6EB38A]" />

        {personal.summary && (
          <div className="italic text-gray-600 text-[11pt] leading-relaxed border-l-4 border-[#A5C9B3] pl-5 py-1">
            <p>{personal.summary}</p>
          </div>
        )}

        <section>
          <h3 className="text-[#2D4739] font-bold uppercase tracking-widest text-[12pt] mb-5 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#2D4739]" /> Experience
          </h3>
          <div className="flex flex-col gap-6 ml-9">
            {experience.map(exp => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-9 top-1.5 w-3 h-3 border-2 border-[#2D4739] rounded-full bg-white" />
                <h4 className="font-bold text-[12pt] text-gray-900 leading-none mb-1">{exp.title}</h4>
                <div className="text-[#2D4739] font-semibold text-[10.5pt] mb-1">{exp.company}</div>
                <div className="text-gray-500 text-[9pt] uppercase tracking-wider font-medium mb-3">
                  {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate} | {exp.location}
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-gray-700 text-[10pt] leading-relaxed">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[#2D4739] font-bold uppercase tracking-widest text-[12pt] mb-5 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#2D4739]" /> Education
          </h3>
          <div className="flex flex-col gap-5 ml-9">
            {education.map(edu => (
              <div key={edu.id} className="relative">
                <div className="absolute -left-9 top-1.5 w-3 h-3 border-2 border-[#2D4739] rounded-full bg-white" />
                <h4 className="font-bold text-[12pt] text-gray-900 leading-none mb-1">{edu.degree}</h4>
                <div className="text-[#2D4739] font-semibold text-[10.5pt] mb-1">{edu.institution}</div>
                <div className="text-gray-500 text-[9pt] uppercase tracking-wider font-medium">
                  {edu.startYear} – {edu.endYear} | {edu.location}
                </div>
                {edu.grade && <div className="text-gray-600 mt-1 text-[10pt]">Grade: {edu.grade}</div>}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
