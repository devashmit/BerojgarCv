// T5 Nova Sidebar — two-column, narrow left sidebar (28%), green accent headings only
export function T5Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm flex flex-col">
      {/* Thin green top border */}
      <div className="h-[2px] w-full bg-[#2D6A4F]" />

      <div className="flex flex-1">
        {/* Narrow sidebar ~28% */}
        <div className="w-[33px] bg-[#F8FAF9] border-r border-gray-100 px-[4px] py-[5px] flex flex-col gap-[3px] shrink-0">
          {/* Name */}
          <div className="h-[3px] w-[24px] bg-[#1a1a1a] mb-[1px]" />
          <div className="h-[2px] w-[18px] bg-gray-400 mb-[3px]" />
          {/* Contact */}
          <div className="h-[2px] w-[20px] bg-[#2D6A4F] mb-[1px]" />
          {[22, 20, 18].map((w, i) => (
            <div key={i} className="h-[1.5px] bg-gray-400 mb-[1px]" style={{ width: w }} />
          ))}
          {/* Skills */}
          <div className="h-[2px] w-[16px] bg-[#2D6A4F] mt-[2px] mb-[1px]" />
          {[20, 16, 18, 14, 20].map((w, i) => (
            <div key={i} className="h-[1.5px] bg-gray-400 mb-[1px]" style={{ width: w }} />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 px-[5px] py-[5px] flex flex-col gap-[4px]">
          {[
            { label: 36, entries: [{ title: 44, sub: 32, date: true, lines: [48, 40] }, { title: 38, sub: 28, date: true, lines: [44] }] },
            { label: 28, entries: [{ title: 40, sub: 30, date: true, lines: [] }] },
            { label: 28, entries: [{ title: 44, sub: 0, date: false, lines: [48, 36] }] },
          ].map((sec, i) => (
            <div key={i}>
              <div className="h-[2.5px] bg-[#2D6A4F] mb-[1.5px]" style={{ width: sec.label }} />
              {sec.entries.map((entry, j) => (
                <div key={j} className="mb-[2px]">
                  <div className="flex justify-between">
                    <div className="h-[2.5px] bg-gray-800" style={{ width: entry.title }} />
                    {entry.date && <div className="h-[2px] w-[14px] bg-gray-400" />}
                  </div>
                  {entry.sub > 0 && <div className="h-[2px] bg-gray-500 mb-[1px]" style={{ width: entry.sub }} />}
                  {entry.lines.map((lw, k) => (
                    <div key={k} className="h-[1.5px] bg-gray-300 mb-[0.5px]" style={{ width: lw }} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
