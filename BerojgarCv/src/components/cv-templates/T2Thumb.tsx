// T2 Himalaya Modern — two-column, narrow blue sidebar, main content right
// Hand-crafted 119 × 168 px miniature. No props, no CVData dependency.
export function T2Thumb() {
  const BLUE = '#2B6CB0'

  return (
    <div
      className="overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm flex"
      style={{ width: 119, height: 168 }}
    >
      {/* ── Left sidebar (~27% = ~32px) — blue background ── */}
      <div
        className="flex flex-col items-center shrink-0"
        style={{ width: 32, background: BLUE, padding: '6px 3px 4px' }}
      >
        {/* Photo circle placeholder */}
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.20)',
            border: '1px solid rgba(255,255,255,0.45)',
            marginBottom: 4,
          }}
        />

        {/* Name lines */}
        <div style={{ height: 2.5, width: 22, background: '#fff', marginBottom: 1.5 }} />
        <div style={{ height: 2, width: 16, background: 'rgba(255,255,255,0.60)', marginBottom: 5 }} />

        {/* Divider */}
        <div style={{ width: '100%', height: 0.5, background: 'rgba(255,255,255,0.30)', marginBottom: 4 }} />

        {/* Contact rows — dot + line */}
        <div className="flex flex-col w-full" style={{ gap: 2, marginBottom: 4 }}>
          {[22, 18, 20].map((w, i) => (
            <div key={i} className="flex items-center" style={{ gap: 1.5 }}>
              <div
                style={{
                  width: 2.5,
                  height: 2.5,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.65)',
                  flexShrink: 0,
                }}
              />
              <div style={{ height: 1.5, width: w, background: 'rgba(255,255,255,0.70)' }} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 0.5, background: 'rgba(255,255,255,0.30)', marginBottom: 3 }} />

        {/* Skills label */}
        <div style={{ height: 2, width: 18, background: 'rgba(255,255,255,0.85)', marginBottom: 2 }} />

        {/* Skill text lines */}
        {[20, 16, 18, 14].map((w, i) => (
          <div
            key={i}
            style={{ height: 1.5, width: w, background: 'rgba(255,255,255,0.50)', marginBottom: 1.5 }}
          />
        ))}
      </div>

      {/* ── Right main column ── */}
      <div className="flex flex-col flex-1" style={{ padding: '5px 5px 4px' }}>
        {/* Summary section */}
        <div style={{ marginBottom: 5 }}>
          {/* Section heading bar */}
          <div style={{ height: 2.5, width: 28, background: BLUE, marginBottom: 2 }} />
          {/* Body lines */}
          <div style={{ height: 1.5, background: '#D1D5DB', marginBottom: 1 }} />
          <div style={{ height: 1.5, width: '80%', background: '#D1D5DB' }} />
        </div>

        {/* Experience section */}
        <div style={{ marginBottom: 5 }}>
          {/* Section heading bar */}
          <div style={{ height: 2.5, width: 36, background: BLUE, marginBottom: 2 }} />

          {/* Entry 1 */}
          <div style={{ marginBottom: 3 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 44, background: '#374151' }} />
              <div style={{ height: 2, width: 14, background: '#D1D5DB' }} />
            </div>
            <div style={{ height: 2, width: 32, background: '#6B7280', marginBottom: 1 }} />
            <div style={{ height: 1.5, background: '#E5E7EB', marginBottom: 0.5 }} />
            <div style={{ height: 1.5, width: '85%', background: '#E5E7EB' }} />
          </div>

          {/* Entry 2 */}
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 38, background: '#374151' }} />
              <div style={{ height: 2, width: 14, background: '#D1D5DB' }} />
            </div>
            <div style={{ height: 2, width: 28, background: '#6B7280', marginBottom: 1 }} />
            <div style={{ height: 1.5, background: '#E5E7EB', marginBottom: 0.5 }} />
            <div style={{ height: 1.5, width: '75%', background: '#E5E7EB' }} />
          </div>
        </div>

        {/* Education section */}
        <div>
          {/* Section heading bar */}
          <div style={{ height: 2.5, width: 30, background: BLUE, marginBottom: 2 }} />
          <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
            <div style={{ height: 2.5, width: 40, background: '#374151' }} />
            <div style={{ height: 2, width: 14, background: '#D1D5DB' }} />
          </div>
          <div style={{ height: 2, width: 32, background: '#6B7280' }} />
        </div>
      </div>
    </div>
  )
}
