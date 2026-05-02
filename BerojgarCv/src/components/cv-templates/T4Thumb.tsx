// T4 Zürich Executive — single column, sans-serif, thin separator lines, gray secondary
export function T4Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm px-[8px] py-[6px]" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="mb-[4px]">
        <div className="h-[5px] w-[52px] bg-black mb-[1.5px]" />
        <div className="h-[3px] w-[36px] bg-gray-400 mb-[2px]" />
        {/* Contact line */}
        <div className="flex items-center gap-[3px]">
          <div className="h-[1.5px] w-[16px] bg-gray-500" />
          <div className="h-[1.5px] w-[1px] bg-gray-300" />
          <div className="h-[1.5px] w-[20px] bg-gray-500" />
          <div className="h-[1.5px] w-[1px] bg-gray-300" />
          <div className="h-[1.5px] w-[16px] bg-gray-500" />
        </div>
      </div>

      {/* Thin separator */}
      <div className="h-[0.5px] w-full bg-gray-300 mb-[3px]" />

      {/* Summary */}
      <div className="mb-[3px]">
        <div className="h-[1.5px] w-full bg-gray-300 mb-[1px]" />
        <div className="h-[1.5px] w-[90%] bg-gray-300" />
      </div>

      {/* Sections */}
      {[
        { label: 40, entries: [{ title: 44, sub: 32, date: true, lines: [48, 40] }, { title: 38, sub: 28, date: true, lines: [44] }] },
        { label: 32, entries: [{ title: 40, sub: 30, date: true, lines: [] }] },
        { label: 24, entries: [{ title: 80, sub: 0, date: false, lines: [] }] },
      ].map((sec, i) => (
        <div key={i} className="mb-[3px]">
          {/* Section heading */}
          <div className="flex items-center gap-[2px] mb-[1.5px]">
            <div className="h-[2.5px] bg-black" style={{ width: sec.label }} />
            <div className="flex-1 h-[0.5px] bg-gray-200" />
          </div>
          {sec.entries.map((entry, j) => (
            <div key={j} className="mb-[2px]">
              <div className="flex justify-between">
                <div className="h-[2.5px] bg-black" style={{ width: entry.title }} />
                {entry.date && <div className="h-[2px] w-[14px] bg-[#333]" />}
              </div>
              {entry.sub > 0 && <div className="h-[2px] bg-[#333] mb-[1px]" style={{ width: entry.sub }} />}
              {entry.lines.map((lw, k) => (
                <div key={k} className="h-[1.5px] bg-gray-300 mb-[0.5px]" style={{ width: lw }} />
              ))}
            </div>
          ))}
          <div className="h-[0.5px] w-full bg-gray-200 mt-[1px]" />
        </div>
      ))}
    </div>
  )
}
