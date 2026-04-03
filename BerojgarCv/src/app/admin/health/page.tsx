import { HealthStatus } from '@/components/admin/HealthStatus'

export const metadata = { title: 'System Health — Admin' }

export default function AdminHealthPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '8px' }}>System Health</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Live status checks for all external services.</p>
      <HealthStatus />
    </div>
  )
}
