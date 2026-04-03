interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  error?: boolean
}

export function StatCard({ label, value, sub, error }: StatCardProps) {
  return (
    <div style={{
      background: 'var(--ground-deep)',
      border: `1px solid ${error ? 'var(--error)' : 'var(--ground-rim)'}`,
      borderRadius: '12px',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    }}>
      <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </p>
      <p style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-fraunces)', color: error ? 'var(--error)' : 'var(--text-bright)', lineHeight: 1 }}>
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</p>
      )}
    </div>
  )
}
