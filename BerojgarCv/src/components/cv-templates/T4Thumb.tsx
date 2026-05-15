// T4 Zürich Executive — single-column, white background, bold name block, thin gray separators
// Hand-crafted 119 × 168 px miniature. No props, no CVData dependency.
export function T4Thumb() {
  return (
    <div
      className="overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm"
      style={{ width: 119, height: 168, fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* ── Header: bold name + job title + contact line ── */}
      <div style={{ paddingTop: 7, paddingLeft: 8, paddingRight: 8, paddingBottom: 4 }}>
        {/* Name — bold, thick bar */}
        <div style={{ height: 5, width: 54, background: '#000', marginBottom: 2 }} />
        {/* Job title — lighter weight */}
        <div style={{ height: 3, width: 38, background: '#555', marginBottom: 3 }} />
        {/* Contact line — plain text, single row */}
        <div className="flex items-center" style={{ gap: 3 }}>
          <div style={{ height: 1.5, width: 18, background: '#666' }} />
          <div style={{ height: 1.5, width: 1, background: '#bbb' }} />
          <div style={{ height: 1.5, width: 22, background: '#666' }} />
          <div style={{ height: 1.5, width: 1, background: '#bbb' }} />
          <div style={{ height: 1.5, width: 16, background: '#666' }} />
        </div>
      </div>

      {/* ── Thin 0.5px gray separator ── */}
      <div style={{ height: 0.5, background: '#ccc', marginLeft: 8, marginRight: 8, marginBottom: 4 }} />

      {/* ── Sections ── */}
      <div style={{ paddingLeft: 8, paddingRight: 8 }}>

        {/* Section 1 — Summary */}
        <div style={{ marginBottom: 5 }}>
          {/* Section heading: short dark accent bar + extending gray line */}
          <div className="flex items-center" style={{ gap: 3, marginBottom: 2 }}>
            <div style={{ height: 2.5, width: 30, background: '#000' }} />
            <div style={{ flex: 1, height: 0.5, background: '#ccc' }} />
          </div>
          {/* Summary text lines */}
          <div style={{ height: 1.5, width: 95, background: '#9CA3AF', marginBottom: 1 }} />
          <div style={{ height: 1.5, width: 80, background: '#9CA3AF' }} />
        </div>

        {/* Thin 0.5px separator */}
        <div style={{ height: 0.5, background: '#ccc', marginBottom: 4 }} />

        {/* Section 2 — Experience */}
        <div style={{ marginBottom: 5 }}>
          {/* Section heading */}
          <div className="flex items-center" style={{ gap: 3, marginBottom: 2 }}>
            <div style={{ height: 2.5, width: 38, background: '#000' }} />
            <div style={{ flex: 1, height: 0.5, background: '#ccc' }} />
          </div>

          {/* Entry 1 */}
          <div style={{ marginBottom: 3 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 44, background: '#111' }} />
              {/* Date chip in gray */}
              <div style={{ height: 2, width: 18, background: '#888', borderRadius: 1 }} />
            </div>
            <div style={{ height: 2, width: 32, background: '#555', marginBottom: 1.5 }} />
            <div style={{ height: 1.5, width: 88, background: '#9CA3AF', marginBottom: 1 }} />
            <div style={{ height: 1.5, width: 72, background: '#9CA3AF' }} />
          </div>

          {/* Entry 2 */}
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 38, background: '#111' }} />
              <div style={{ height: 2, width: 18, background: '#888', borderRadius: 1 }} />
            </div>
            <div style={{ height: 2, width: 28, background: '#555', marginBottom: 1.5 }} />
            <div style={{ height: 1.5, width: 80, background: '#9CA3AF' }} />
          </div>
        </div>

        {/* Thin 0.5px separator */}
        <div style={{ height: 0.5, background: '#ccc', marginBottom: 4 }} />

        {/* Section 3 — Education */}
        <div style={{ marginBottom: 5 }}>
          {/* Section heading */}
          <div className="flex items-center" style={{ gap: 3, marginBottom: 2 }}>
            <div style={{ height: 2.5, width: 34, background: '#000' }} />
            <div style={{ flex: 1, height: 0.5, background: '#ccc' }} />
          </div>
          <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
            <div style={{ height: 2.5, width: 46, background: '#111' }} />
            <div style={{ height: 2, width: 18, background: '#888', borderRadius: 1 }} />
          </div>
          <div style={{ height: 2, width: 36, background: '#555' }} />
        </div>

        {/* Thin 0.5px separator */}
        <div style={{ height: 0.5, background: '#ccc', marginBottom: 4 }} />

        {/* Section 4 — Skills */}
        <div>
          {/* Section heading */}
          <div className="flex items-center" style={{ gap: 3, marginBottom: 2 }}>
            <div style={{ height: 2.5, width: 22, background: '#000' }} />
            <div style={{ flex: 1, height: 0.5, background: '#ccc' }} />
          </div>
          <div style={{ height: 1.5, width: 90, background: '#9CA3AF' }} />
        </div>

      </div>
    </div>
  )
}
