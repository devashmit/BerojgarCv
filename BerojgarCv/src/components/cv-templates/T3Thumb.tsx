// T3 Jake's Resume — strict single-column, black/white, section heading + HR, bullet rows
// Hand-crafted 119 × 168 px miniature. No props, no CVData dependency.
export function T3Thumb() {
  return (
    <div
      className="overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm"
      style={{ width: 119, height: 168, fontFamily: 'Georgia, serif' }}
    >
      {/* ── Header: centered bold name bar + pipe-separated contact row ── */}
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: 7, paddingBottom: 4, paddingLeft: 8, paddingRight: 8 }}
      >
        {/* Name bar — centered, bold/thick */}
        <div style={{ height: 5, width: 58, background: '#000', marginBottom: 3 }} />

        {/* Contact row — pipe-separated: item | item | item */}
        <div className="flex items-center" style={{ gap: 2 }}>
          <div style={{ height: 1.5, width: 16, background: '#555' }} />
          <div style={{ height: 3, width: 1, background: '#888' }} />
          <div style={{ height: 1.5, width: 20, background: '#555' }} />
          <div style={{ height: 3, width: 1, background: '#888' }} />
          <div style={{ height: 1.5, width: 16, background: '#555' }} />
          <div style={{ height: 3, width: 1, background: '#888' }} />
          <div style={{ height: 1.5, width: 14, background: '#555' }} />
        </div>
      </div>

      {/* ── Sections ── */}
      <div style={{ paddingLeft: 8, paddingRight: 8 }}>

        {/* Section 1 — EDUCATION */}
        <div style={{ marginBottom: 5 }}>
          {/* Heading bar + full-width 0.5px HR */}
          <div style={{ height: 3, width: 34, background: '#000', marginBottom: 1 }} />
          <div style={{ height: 0.5, background: '#000', marginBottom: 3 }} />
          {/* Entry: title + date on same line, subtitle below */}
          <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
            <div style={{ height: 2.5, width: 46, background: '#222' }} />
            <div style={{ height: 2, width: 16, background: '#888' }} />
          </div>
          <div style={{ height: 2, width: 36, background: '#666', marginBottom: 1 }} />
        </div>

        {/* Section 2 — EXPERIENCE */}
        <div style={{ marginBottom: 5 }}>
          {/* Heading bar + full-width 0.5px HR */}
          <div style={{ height: 3, width: 42, background: '#000', marginBottom: 1 }} />
          <div style={{ height: 0.5, background: '#000', marginBottom: 3 }} />

          {/* Entry 1 */}
          <div style={{ marginBottom: 3 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 44, background: '#222' }} />
              <div style={{ height: 2, width: 16, background: '#888' }} />
            </div>
            <div style={{ height: 2, width: 32, background: '#666', marginBottom: 1.5 }} />
            {/* Bullet rows */}
            {[48, 40].map((w, i) => (
              <div key={i} className="flex items-center" style={{ gap: 2, marginBottom: 1 }}>
                <span style={{ fontSize: 4, color: '#000', lineHeight: 1, flexShrink: 0 }}>▸</span>
                <div style={{ height: 1.5, width: w, background: '#9CA3AF' }} />
              </div>
            ))}
          </div>

          {/* Entry 2 */}
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 38, background: '#222' }} />
              <div style={{ height: 2, width: 16, background: '#888' }} />
            </div>
            <div style={{ height: 2, width: 28, background: '#666', marginBottom: 1.5 }} />
            {[44].map((w, i) => (
              <div key={i} className="flex items-center" style={{ gap: 2, marginBottom: 1 }}>
                <span style={{ fontSize: 4, color: '#000', lineHeight: 1, flexShrink: 0 }}>▸</span>
                <div style={{ height: 1.5, width: w, background: '#9CA3AF' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 — SKILLS */}
        <div>
          {/* Heading bar + full-width 0.5px HR */}
          <div style={{ height: 3, width: 26, background: '#000', marginBottom: 1 }} />
          <div style={{ height: 0.5, background: '#000', marginBottom: 3 }} />
          {/* Skills as a single wide line */}
          <div style={{ height: 1.5, width: 86, background: '#9CA3AF' }} />
        </div>

      </div>
    </div>
  )
}
