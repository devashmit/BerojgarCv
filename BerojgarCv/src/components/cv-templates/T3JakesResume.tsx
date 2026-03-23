import { CVData } from '@/types/cv'

export function T3JakesResume({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, skills, projects } = cvData

  const contacts = [
    personal.phone,
    personal.email,
    personal.linkedin && personal.linkedin.replace(/https?:\/\/(www\.)?/, ''),
    personal.github && personal.github.replace(/https?:\/\/(www\.)?/, ''),
  ].filter(Boolean)

  return (
    <div className="bg-white min-h-[297mm] w-[210mm] text-[11pt] font-serif text-black flex flex-col mx-auto shrink-0 shadow-lg p-12">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-[22pt] font-bold mb-1">{personal.fullName}</h1>
        <div className="text-[10pt]">
          {contacts.join(' | ')}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* Education */}
        <section>
          <h2 className="uppercase font-bold text-[12pt] border-b-[1.5px] border-black pb-[2px] mb-2">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between font-bold">
                <span>{edu.institution}</span>
                <span>{edu.location}</span>
              </div>
              <div className="flex justify-between italic">
                <span>{edu.degree}{edu.grade ? `, ${edu.grade}` : ''}</span>
                <span>{edu.startYear} – {edu.endYear}</span>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="uppercase font-bold text-[12pt] border-b-[1.5px] border-black pb-[2px] mb-2">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between font-bold">
                <span>{exp.title}</span>
                <span>{exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}</span>
              </div>
              <div className="flex justify-between italic mb-1 text-[10.5pt]">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt]">
                {exp.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {projects && projects.length > 0 && (
          <section>
            <h2 className="uppercase font-bold text-[12pt] border-b-[1.5px] border-black pb-[2px] mb-2">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="mb-2">
                <div className="font-bold flex gap-2 items-baseline">
                  <span>{proj.name}</span>
                  {proj.technologies && <span className="font-normal italic text-[10pt]">| {proj.technologies.join(', ')}</span>}
                </div>
                <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt] mt-0.5">
                  <li>{proj.description}</li>
                </ul>
              </div>
            ))}
          </section>
        )}

        <section>
          <h2 className="uppercase font-bold text-[12pt] border-b-[1.5px] border-black pb-[2px] mb-2">Skills</h2>
          <div className="text-[10.5pt] leading-relaxed">
            <div><strong>Technical Skills:</strong> {skills.technical.join(' | ')}</div>
            <div><strong>Soft Skills:</strong> {skills.soft.join(' | ')}</div>
            {cvData.languages.length > 0 && (
              <div><strong>Languages:</strong> {cvData.languages.map(l => l.language).join(' | ')}</div>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
