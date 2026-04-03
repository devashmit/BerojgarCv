import { FeatureFlagList } from '@/components/admin/FeatureFlagList'

export const metadata = { title: 'Feature Flags — Admin' }

export default function AdminFlagsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '24px', color: 'var(--text-bright)', marginBottom: '8px' }}>Feature Flags</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Toggles take effect within 30 seconds site-wide.</p>
      <FeatureFlagList />
    </div>
  )
}
