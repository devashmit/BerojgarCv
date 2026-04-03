import { ReportQueue } from '@/components/admin/ReportQueue'

export const metadata = { title: 'Reports — Admin' }

export default function AdminReportsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '24px' }}>Flagged Reports</h1>
      <ReportQueue />
    </div>
  )
}
