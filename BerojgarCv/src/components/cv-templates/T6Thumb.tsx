// T6 Paris Élégante — single-column, off-white bg, centered serif name, gold separator lines
// Hand-crafted 119 × 168 px miniature. No props, no CVData dependency.
export function T6Thumb() {
  const GOLD = '#C9B99A'
  const DARK = '#2C2C2C'
  const MID  = '#6B6B6B'
  const LIGHT = '#9CA3AF'

  return (
    <div
      className="overflow-hidden pointer-events-none border border-gray-200 shadow-sm"
      style={{ width: 119, height: 168, background: '#FAFAF8', fontFamily: 'Georgia, serif' }}
    >
      {/* ── Header: centered name + title + ornament + contact ── */}
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 8, paddingRight: 8 }}
      >
        {/* Name bar — centered, bold serif */}
        <div style={{ height: 5, width: 56, background: DARK, marginBottom: 2 }} />
        {/* Title / subtitle */}
        <div style={{ height: 2, width: 38, background: MID, marginBottom: 3 }} />

        {/* Gold ornament separator — thin line with center dot */}
        <div className="flex items-center" style={{ width: '100%', marginBottom: 3 }}>
          <div style={{ flex: 1, height: 0.5, background: GOLD }} />
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: GOLD, margin: '0 3px' }} />
          <div style={{ flex: 1, height: 0.5, background: GOLD }} />
        </div>

        {/* Contact row — pipe-separated */}
        <div className="flex items-center" style={{ gap: 2, marginBottom: 1 }}>
          <div style={{ height: 1.5, width: 14, background: LIGHT }} />
          <div style={{ height: 2.5, width: 0.5, background: GOLD }} />
          <div style={{ height: 1.5, width: 18, background: LIGHT }} />
          <div style={{ height: 2.5, width: 0.5, background: GOLD }} />
          <div style={{ height: 1.5, width: 14, background: LIGHT }} />
        </div>
      </div>

      {/* ── Sections ── */}
      <div style={{ paddingLeft: 8, paddingRight: 8 }}>

        {/* Section 1 — Experience */}
        <div style={{ marginBottom: 5 }}>
          {/* Small-caps heading bar */}
          <div style={{ height: 2.5, width: 36, background: DARK, marginBottom: 1.5 }} />
          {/* Gold separator */}
          <div style={{ height: 0.5, background: GOLD, marginBottom: 3 }} />

          {/* Entry 1 */}
          <div style={{ marginBottom: 3 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 44, background: DARK }} />
              <div style={{ height: 2, width: 14, background: GOLD }} />
            </div>
            <div style={{ height: 2, width: 32, background: MID, marginBottom: 1 }} />
            <div style={{ height: 1.5, background: LIGHT, marginBottom: 0.5 }} />
            <div style={{ height: 1.5, width: '80%', background: LIGHT }} />
          </div>

          {/* Entry 2 */}
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
              <div style={{ height: 2.5, width: 38, background: DARK }} />
              <div style={{ height: 2, width: 14, background: GOLD }} />
            </div>
            <div style={{ height: 2, width: 28, background: MID, marginBottom: 1 }} />
            <div style={{ height: 1.5, background: LIGHT }} />
          </div>
        </div>

        {/* Section 2 — Education */}
        <div style={{ marginBottom: 5 }}>
          {/* Small-caps heading bar */}
          <div style={{ height: 2.5, width: 28, background: DARK, marginBottom: 1.5 }} />
          {/* Gold separator */}
          <div style={{ height: 0.5, background: GOLD, marginBottom: 3 }} />

          <div className="flex justify-between items-center" style={{ marginBottom: 1 }}>
            <div style={{ height: 2.5, width: 42, background: DARK }} />
            <div style={{ height: 2, width: 14, background: GOLD }} />
          </div>
          <div style={{ height: 2, width: 30, background: MID }} />
        </div>

        {/* Section 3 — Skills */}
        <div>
          {/* Small-caps heading bar */}
          <div style={{ height: 2.5, width: 22, background: DARK, marginBottom: 1.5 }} />
          {/* Gold separator */}
          <div style={{ height: 0.5, background: GOLD, marginBottom: 3 }} />

          <div style={{ height: 1.5, width: 86, background: LIGHT }} />
        </div>

      </div>
    </div>
  )
}
