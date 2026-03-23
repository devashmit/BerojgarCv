import type { CVData } from '@/types/cv'

export const defaultCVData: CVData = {
  personal: {
    fullName: 'Arjun Sharma',
    jobTitle: 'Software Engineer',
    email: 'arjun.sharma@gmail.com',
    phone: '+977-9841234567',
    address: 'Kathmandu',
    province: 'Bagmati Province',
    linkedin: 'linkedin.com/in/arjunsharma',
    github: 'github.com/arjunsharma',
    summary: 'Results-driven software engineer with 3+ years building scalable web applications for fintech and healthcare sectors. Proven track record delivering high-performance systems serving 50,000+ daily users. Passionate about clean architecture and team mentorship.',
    citizenshipNo: '30-01-77-00000',
    dateOfBirth: '1999-03-15',
    nationality: 'Nepali',
  },
  experience: [{
    id: 'exp-default-1',
    title: 'Software Engineer',
    company: 'Cotiviti Nepal Pvt. Ltd.',
    location: 'Sanepa, Lalitpur',
    startDate: '01/2022',
    endDate: 'Present',
    currentJob: true,
    bullets: [
      'Architected REST APIs in Node.js serving 50,000+ daily active users at 99.9% uptime',
      'Reduced page load time 40% through Redis caching and database query optimization',
      'Mentored 3 junior engineers and led sprint planning for a 6-person agile team',
    ],
  }],
  education: [{
    id: 'edu-default-1',
    degree: 'B.E. Computer Engineering',
    institution: 'Tribhuvan University, IOE',
    location: 'Pulchowk, Lalitpur',
    startYear: '2017',
    endYear: '2021',
    grade: 'First Division — 78.4%',
  }],
  skills: {
    technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
    soft: ['Team Leadership', 'System Design', 'Agile/Scrum'],
  },
  languages: [
    { language: 'Nepali', proficiency: 'Native' },
    { language: 'English', proficiency: 'Professional' },
  ],
  certifications: ['AWS Certified Developer – Associate'],
  references: [],
  referencesOnRequest: true,
}
