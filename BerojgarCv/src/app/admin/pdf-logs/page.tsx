import { PDFLogTable } from '@/components/admin/PDFLogTable'

export const metadata = { title: 'PDF Logs — Admin' }

export default function AdminPDFLogsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '24px' }}>PDF Logs</h1>
      <PDFLogTable />
    </div>
  )
}
