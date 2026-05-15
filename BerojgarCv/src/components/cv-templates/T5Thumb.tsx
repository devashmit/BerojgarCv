// T5 Nova Sidebar — two-column, narrow light sidebar (~28%), green accent headings
// Hand-crafted 119 × 168 px miniature. No props, no CVData dependency.
export function T5Thumb() {
  const GREEN = '#2D6A4F'

  return (
    <div
      className="overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm flex flex-col"
      style={{ width: 119, height: 168 }}
    >
      {/* ── Thin green top border ── */}
      <div style={{ height: 2, background: GREEN, flexShrink: 0 }} />

      {/* ── Two-column body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left sidebar (~28% = ~33px), very light neutral background ── */}
        <div
          className="flex flex-col shrink-0"
          style={{ width: 33, background: '#F8FAF9', borderRight: '1px solid #E5EDE9', padding: '5px 4px 4px' }}
        >
          {/* Name lines */}
          <div style={{ height: 3, width: 24, background: '#1a1a1a', marginBottom: 1.5 }} />
          <div style={{ height: 2, width: 18, background: '#6B7280', marginBottom: 5 }} />

          {/* Contact section label */}
          <div style={{ height: 2, width: 20, background: GREEN, marginBottom: 2 }} />

          {/* Contact lines */}
          {[22, 20, 18].map((w, i) => (
            <div
              key={i}
              style={{ height: 1.5, width: w, background: '#9CA3AF', marginBottom: 1.5 }}
            />
          ))}

          {/* Gap */}
          <div style={{ height: 4 }} />

          {/* Skills section label */}
          <div style={{ height: 2, width: 16, background: GREEN, marginBottom: 2 }} />

          {/* Skill text lines */}
          {[20, 16, 18, 14, 20].map((w, i) => (
            <div
              key={i}
              style={{ height: 1.5, width: w, background: '#9CA3AF', marginBottom: 1.5 }}
            />
          ))}
        </div>

        {/* ── Right main column ── */}
        <div className="flex flex-col flex-1" style={{ padding: '5px 5px 4px' }}>

          {/* Section 1 — Experience */}
          <div style={{ marginBottom: 5 }}>
            {/* Green section heading bar */}
            <div style={{ height: 2.5, width: 36, background: GREEN, marginBottom: 2 }} />

            {/* Entry 1 */}
            <div style={{ marginBottom: 3 }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
                <div style={{ height: 2.5, width: 44, background: '#1F2937' }} />
                <div style={{ height: 2, width: 14, background: '#D1D5DB' }} />
              </div>
              <div style={{ height: 2, width: 32, background: '#6B7280', marginBottom: 1 }} />
              <div style={{ height: 1.5, background: '#E5E7EB', marginBottom: 0.5 }} />
              <div style={{ height: 1.5, width: '85%', background: '#E5E7EB' }} />
            </div>

            {/* Entry 2 */}
            <div>
              <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
                <div style={{ height: 2.5, width: 38, background: '#1F2937' }} />
                <div style={{ height: 2, width: 14, background: '#D1D5DB' }} />
              </div>
              <div style={{ height: 2, width: 28, background: '#6B7280', marginBottom: 1 }} />
              <div style={{ height: 1.5, background: '#E5E7EB' }} />
            </div>
          </div>

          {/* Section 2 — Education */}
          <div style={{ marginBottom: 5 }}>
            {/* Green section heading bar */}
            <div style={{ height: 2.5, width: 28, background: GREEN, marginBottom: 2 }} />

            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 40, background: '#1F2937' }} />
              <div style={{ height: 2, width: 14, background: '#D1D5DB' }} />
            </div>
            <div style={{ height: 2, width: 30, background: '#6B7280' }} />
          </div>

          {/* Section 3 — Projects */}
          <div>
            {/* Green section heading bar */}
            <div style={{ height: 2.5, width: 28, background: GREEN, marginBottom: 2 }} />

            <div style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 44, background: '#1F2937', marginBottom: 1 }} />
              <div style={{ height: 1.5, background: '#E5E7EB', marginBottom: 0.5 }} />
              <div style={{ height: 1.5, width: '75%', background: '#E5E7EB' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
