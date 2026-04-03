import { CVTable } from '@/components/admin/CVTable'

export const metadata = { title: 'CVs — Admin' }

export default function AdminCVsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '24px' }}>All CVs</h1>
      <CVTable />
    </div>
  )
}
