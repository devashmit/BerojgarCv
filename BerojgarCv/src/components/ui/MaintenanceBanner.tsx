import { isEnabled } from '@/lib/featureFlags'

// Server component — reads flag at request time
export async function MaintenanceBanner() {
  const maintenance = await isEnabled('maintenance_mode')
  if (!maintenance) return null

  return (
    <div style={{
      width: '100%',
      padding: '10px 16px',
      background: 'rgba(181,58,42,0.15)',
      borderBottom: '1px solid rgba(181,58,42,0.4)',
      textAlign: 'center',
      fontSize: '13px',
      fontWeight: 600,
      color: '#B53A2A',
      zIndex: 9999,
    }}>
      🔧 We are currently performing maintenance. Some features may be unavailable.
    </div>
  )
}
