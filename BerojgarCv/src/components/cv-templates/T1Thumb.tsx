// T1 Dhaka Heritage — single column, dark navy header, photo placeholder top-right
export function T1Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="bg-white px-[6px] pt-[6px] pb-[4px] flex justify-between items-start border-b-[1.5px] border-[#1A2744]">
        <div>
          <div className="h-[5px] w-[52px] bg-[#1A2744] mb-[2px] font-bold" />
          <div className="h-[3px] w-[36px] bg-[#444] mb-[3px]" />
          <div className="flex gap-[2px]">
            <div className="h-[2px] w-[18px] bg-[#666]" />
            <div className="h-[2px] w-[2px] bg-[#999]" />
            <div className="h-[2px] w-[22px] bg-[#666]" />
          </div>
        </div>
        {/* Photo placeholder */}
        <div className="w-[14px] h-[18px] border border-dashed border-[#1A2744] bg-gray-50 shrink-0" />
      </div>

      {/* Body */}
      <div className="px-[6px] py-[4px] flex flex-col gap-[5px]">
        {/* Section */}
        {[
          { label: 28, lines: [[40, 20], [36, 16], [44, 12], [38, 12]] },
          { label: 24, lines: [[38, 20], [32, 16], [40, 12]] },
          { label: 20, lines: [[44, 12], [36, 12]] },
        ].map((sec, i) => (
          <div key={i}>
            <div className="flex items-center gap-[2px] mb-[2px]">
              <div className="w-[1.5px] h-[5px] bg-[#1A2744]" />
              <div className="h-[3px] bg-[#1A2744] font-bold" style={{ width: sec.label }} />
            </div>
            {sec.lines.map(([w, gap], j) => (
              <div key={j} className="flex justify-between items-center mb-[1px]">
                <div className="h-[2px] bg-gray-400" style={{ width: w }} />
                {j === 0 && <div className="h-[2px] w-[16px] bg-gray-300" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
