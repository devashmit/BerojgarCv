// T3 Jake's Resume — strict single column, black/white, section heading + HR
export function T3Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm px-[8px] py-[6px]" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Name centered */}
      <div className="flex flex-col items-center mb-[3px]">
        <div className="h-[5px] w-[56px] bg-black mb-[2px]" />
        {/* Contact pipe-separated */}
        <div className="flex items-center gap-[2px]">
          <div className="h-[1.5px] w-[14px] bg-gray-500" />
          <div className="h-[2px] w-[1px] bg-gray-400" />
          <div className="h-[1.5px] w-[18px] bg-gray-500" />
          <div className="h-[2px] w-[1px] bg-gray-400" />
          <div className="h-[1.5px] w-[14px] bg-gray-500" />
        </div>
      </div>

      {/* Sections */}
      {[
        { label: 'EDUCATION', w: 32, entries: [{ title: 44, sub: 36, bullets: [] }] },
        { label: 'EXPERIENCE', w: 40, entries: [{ title: 44, sub: 32, bullets: [48, 40] }, { title: 38, sub: 28, bullets: [44] }] },
        { label: 'SKILLS', w: 24, entries: [{ title: 80, sub: 0, bullets: [] }] },
      ].map((sec, i) => (
        <div key={i} className="mb-[4px]">
          {/* Heading + HR */}
          <div className="mb-[1.5px]">
            <div className="h-[2.5px] bg-black mb-[0.5px]" style={{ width: sec.w }} />
            <div className="h-[0.5px] w-full bg-black" />
          </div>
          {sec.entries.map((entry, j) => (
            <div key={j} className="mb-[2px]">
              <div className="flex justify-between items-baseline">
                <div className="h-[2.5px] bg-gray-800" style={{ width: entry.title }} />
                <div className="h-[2px] w-[14px] bg-gray-400" />
              </div>
              {entry.sub > 0 && <div className="h-[2px] bg-gray-500 mb-[1px]" style={{ width: entry.sub }} />}
              {entry.bullets.map((bw, k) => (
                <div key={k} className="flex items-center gap-[2px] mb-[0.5px]">
                  <div className="text-[4px] text-black leading-none">▸</div>
                  <div className="h-[1.5px] bg-gray-300" style={{ width: bw }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
