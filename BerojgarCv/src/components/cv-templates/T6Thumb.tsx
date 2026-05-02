// T6 Paris Élégante — single column, off-white bg, centered serif name, gold separator lines
export function T6Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none border border-gray-200 shadow-sm px-[8px] py-[6px] flex flex-col" style={{ background: '#FAFAF8', fontFamily: 'Georgia, serif' }}>
      {/* Centered name */}
      <div className="flex flex-col items-center mb-[3px]">
        <div className="h-[5px] w-[52px] bg-[#2C2C2C] mb-[2px]" />
        <div className="h-[2px] w-[36px] bg-[#888] mb-[2px]" />
        {/* Contact */}
        <div className="flex items-center gap-[2px] mb-[2px]">
          <div className="h-[1.5px] w-[14px] bg-[#666]" />
          <div className="h-[1.5px] w-[1px] bg-[#C9B99A]" />
          <div className="h-[1.5px] w-[18px] bg-[#666]" />
          <div className="h-[1.5px] w-[1px] bg-[#C9B99A]" />
          <div className="h-[1.5px] w-[14px] bg-[#666]" />
        </div>
        {/* Gold separator */}
        <div className="h-[0.5px] w-full bg-[#C9B99A]" />
      </div>

      {/* Sections */}
      {[
        { label: 36, entries: [{ title: 44, sub: 32, date: true, lines: [48, 40] }] },
        { label: 28, entries: [{ title: 40, sub: 30, date: true, lines: [44, 36] }] },
        { label: 20, entries: [{ title: 72, sub: 0, date: false, lines: [] }] },
        { label: 24, entries: [{ title: 60, sub: 0, date: false, lines: [] }] },
      ].map((sec, i) => (
        <div key={i} className="mb-[3px]">
          {/* Small caps heading */}
          <div className="h-[2.5px] bg-[#2C2C2C] mb-[1.5px]" style={{ width: sec.label }} />
          {/* Gold separator */}
          <div className="h-[0.5px] w-full bg-[#C9B99A] mb-[1.5px]" />
          {sec.entries.map((entry, j) => (
            <div key={j} className="mb-[1.5px]">
              <div className="flex justify-between">
                <div className="h-[2.5px] bg-[#2C2C2C]" style={{ width: entry.title }} />
                {entry.date && <div className="h-[2px] w-[14px] bg-[#C9B99A]" />}
              </div>
              {entry.sub > 0 && <div className="h-[2px] bg-[#666] mb-[1px]" style={{ width: entry.sub }} />}
              {entry.lines.map((lw, k) => (
                <div key={k} className="h-[1.5px] bg-[#999] mb-[0.5px]" style={{ width: lw }} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
