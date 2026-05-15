// T1 Dhaka Heritage — single-column, white background, dark navy accent
// Hand-crafted 119 × 168 px miniature. No props, no CVData dependency.
export function T1Thumb() {
  return (
    <div
      className="overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm"
      style={{ width: 119, height: 168, fontFamily: 'Georgia, serif' }}
    >
      {/* ── Header ── white bg, dark navy bottom border, photo placeholder top-right */}
      <div
        className="flex justify-between items-start px-[6px] pt-[6px] pb-[4px]"
        style={{ borderBottom: '1.5px solid #1A2744' }}
      >
        {/* Name + title + contact lines */}
        <div>
          {/* Name bar */}
          <div style={{ height: 5, width: 52, background: '#1A2744', marginBottom: 2 }} />
          {/* Job title bar */}
          <div style={{ height: 3, width: 36, background: '#444', marginBottom: 3 }} />
          {/* Contact row */}
          <div className="flex items-center gap-[2px]">
            <div style={{ height: 2, width: 18, background: '#666' }} />
            <div style={{ height: 2, width: 2, background: '#999' }} />
            <div style={{ height: 2, width: 22, background: '#666' }} />
          </div>
        </div>

        {/* Photo placeholder — top-right, ~14 × 18 px */}
        <div
          className="shrink-0 bg-gray-50"
          style={{
            width: 14,
            height: 18,
            border: '1px dashed #1A2744',
          }}
        />
      </div>

      {/* ── Body — three sections ── */}
      <div className="px-[6px] py-[4px] flex flex-col gap-[5px]">
        {/* Section 1 — Experience (4 entry rows) */}
        <div>
          <div className="flex items-center gap-[2px] mb-[2px]">
            <div style={{ width: 2, height: 5, background: '#1A2744' }} />
            <div style={{ height: 3, width: 28, background: '#1A2744' }} />
          </div>
          {[40, 36, 44, 38].map((w, i) => (
            <div key={i} className="flex justify-between items-center mb-[1px]">
              <div style={{ height: 2, width: w, background: '#9CA3AF' }} />
              {i === 0 && <div style={{ height: 2, width: 16, background: '#D1D5DB' }} />}
            </div>
          ))}
        </div>

        {/* Section 2 — Education (3 entry rows) */}
        <div>
          <div className="flex items-center gap-[2px] mb-[2px]">
            <div style={{ width: 2, height: 5, background: '#1A2744' }} />
            <div style={{ height: 3, width: 24, background: '#1A2744' }} />
          </div>
          {[38, 32, 40].map((w, i) => (
            <div key={i} className="flex justify-between items-center mb-[1px]">
              <div style={{ height: 2, width: w, background: '#9CA3AF' }} />
              {i === 0 && <div style={{ height: 2, width: 16, background: '#D1D5DB' }} />}
            </div>
          ))}
        </div>

        {/* Section 3 — Skills (2 entry rows) */}
        <div>
          <div className="flex items-center gap-[2px] mb-[2px]">
            <div style={{ width: 2, height: 5, background: '#1A2744' }} />
            <div style={{ height: 3, width: 20, background: '#1A2744' }} />
          </div>
          {[44, 36].map((w, i) => (
            <div key={i} className="mb-[1px]">
              <div style={{ height: 2, width: w, background: '#9CA3AF' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
