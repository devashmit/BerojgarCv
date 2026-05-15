// T7 Rirekisho (JIS) — full-bleed bordered grid, Japanese resume layout
// Hand-crafted 119 × 168 px miniature. No props, no CVData dependency.
export function T7Thumb() {
  const BORDER = '0.5px solid #555'
  const LABEL_BG = '#F5F5F5'
  const DARK = '#1A1A1A'
  const MID = '#555555'
  const LIGHT = '#999999'

  return (
    <div
      className="overflow-hidden pointer-events-none"
      style={{
        width: 119,
        height: 168,
        background: '#FFFFFF',
        fontFamily: 'sans-serif',
        border: BORDER,
        boxSizing: 'border-box',
      }}
    >
      {/* ── Title + date row ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2px 4px 1px 4px',
          borderBottom: BORDER,
        }}
      >
        {/* 履歴書 title bar */}
        <div style={{ height: 3, width: 22, background: DARK }} />
        {/* Date — right-aligned */}
        <div style={{ height: 1.5, width: 28, background: LIGHT }} />
      </div>

      {/* ── Name + photo row ── */}
      <div style={{ display: 'flex', borderBottom: BORDER }}>
        {/* Left: furigana + name + DOB/gender */}
        <div style={{ flex: 1, borderRight: BORDER }}>
          {/* Furigana row */}
          <div
            style={{
              display: 'flex',
              borderBottom: BORDER,
              minHeight: 7,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 16,
                background: LABEL_BG,
                borderRight: BORDER,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ height: 1, width: 10, background: LIGHT }} />
            </div>
            <div style={{ flex: 1, padding: '1px 2px' }}>
              <div style={{ height: 1, width: 24, background: LIGHT }} />
            </div>
          </div>
          {/* Name row */}
          <div
            style={{
              display: 'flex',
              borderBottom: BORDER,
              minHeight: 11,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 16,
                background: LABEL_BG,
                borderRight: BORDER,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ height: 1.5, width: 8, background: MID }} />
            </div>
            <div style={{ flex: 1, padding: '2px 3px' }}>
              <div style={{ height: 3, width: 38, background: DARK }} />
            </div>
          </div>
          {/* DOB + gender row */}
          <div
            style={{
              display: 'flex',
              minHeight: 8,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 16,
                background: LABEL_BG,
                borderRight: BORDER,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ height: 1, width: 10, background: LIGHT }} />
            </div>
            <div style={{ flex: 1, padding: '1px 2px' }}>
              <div style={{ height: 1.5, width: 28, background: MID }} />
            </div>
            {/* Gender cell */}
            <div
              style={{
                width: 14,
                borderLeft: BORDER,
                background: LABEL_BG,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ height: 1, width: 8, background: LIGHT }} />
            </div>
            <div style={{ width: 10, height: '100%' }} />
          </div>
        </div>
        {/* Photo box — dashed border */}
        <div
          style={{
            width: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <div
            style={{
              width: 13,
              height: 17,
              border: '1px dashed #888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#D1D5DB',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Address / contact row ── */}
      <div style={{ borderBottom: BORDER }}>
        {/* Furigana for address */}
        <div
          style={{
            display: 'flex',
            borderBottom: BORDER,
            minHeight: 6,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 16,
              background: LABEL_BG,
              borderRight: BORDER,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ height: 1, width: 10, background: LIGHT }} />
          </div>
          <div style={{ flex: 1, padding: '1px 2px' }}>
            <div style={{ height: 1, width: 20, background: LIGHT }} />
          </div>
        </div>
        {/* Address */}
        <div
          style={{
            display: 'flex',
            borderBottom: BORDER,
            minHeight: 9,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 16,
              background: LABEL_BG,
              borderRight: BORDER,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ height: 1.5, width: 8, background: MID }} />
          </div>
          <div style={{ flex: 1, padding: '1px 3px' }}>
            <div style={{ height: 1.5, width: 50, background: MID }} />
          </div>
        </div>
        {/* Phone + email */}
        <div
          style={{
            display: 'flex',
            minHeight: 7,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 16,
              background: LABEL_BG,
              borderRight: BORDER,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ height: 1, width: 10, background: LIGHT }} />
          </div>
          <div style={{ flex: 1, padding: '1px 2px', borderRight: BORDER }}>
            <div style={{ height: 1.5, width: 26, background: MID }} />
          </div>
          <div
            style={{
              width: 14,
              background: LABEL_BG,
              borderRight: BORDER,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ height: 1, width: 8, background: LIGHT }} />
          </div>
          <div style={{ flex: 1, padding: '1px 2px' }}>
            <div style={{ height: 1.5, width: 22, background: MID }} />
          </div>
        </div>
      </div>

      {/* ── Education & Work History table ── */}
      <div style={{ borderBottom: BORDER }}>
        {/* Section header */}
        <div
          style={{
            background: LABEL_BG,
            borderBottom: BORDER,
            padding: '1px 3px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ height: 2, width: 40, background: MID }} />
        </div>
        {/* Column header row: year | month | content */}
        <div style={{ display: 'flex', borderBottom: BORDER, background: LABEL_BG }}>
          <div
            style={{
              width: 14,
              borderRight: BORDER,
              padding: '1px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ height: 1.5, width: 8, background: MID }} />
          </div>
          <div
            style={{
              width: 10,
              borderRight: BORDER,
              padding: '1px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ height: 1.5, width: 6, background: MID }} />
          </div>
          <div
            style={{
              flex: 1,
              padding: '1px 2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ height: 1.5, width: 30, background: MID }} />
          </div>
        </div>
        {/* History rows */}
        {[
          { yearW: 20, contentW: 44 },
          { yearW: 20, contentW: 52 },
          { yearW: 20, contentW: 38 },
          { yearW: 20, contentW: 48 },
          { yearW: 20, contentW: 42 },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              borderBottom: i < 4 ? BORDER : 'none',
              minHeight: 6,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 14,
                borderRight: BORDER,
                height: '100%',
                padding: '1px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ height: 1.5, width: row.yearW * 0.5, background: LIGHT }} />
            </div>
            <div
              style={{
                width: 10,
                borderRight: BORDER,
                height: '100%',
                padding: '1px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ height: 1.5, width: 5, background: LIGHT }} />
            </div>
            <div style={{ flex: 1, padding: '1px 2px' }}>
              <div style={{ height: 1.5, width: row.contentW, background: DARK }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Self-PR box ── */}
      <div>
        {/* Header */}
        <div
          style={{
            background: LABEL_BG,
            borderBottom: BORDER,
            padding: '1px 3px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ height: 2, width: 32, background: MID }} />
        </div>
        {/* Lines */}
        <div style={{ padding: '2px 3px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <div style={{ height: 1, background: '#E5E7EB' }} />
          <div style={{ height: 1, width: '90%', background: '#E5E7EB' }} />
          <div style={{ height: 1, width: '80%', background: '#E5E7EB' }} />
        </div>
      </div>
    </div>
  )
}
