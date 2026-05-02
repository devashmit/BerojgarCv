// T2 Himalaya Modern — two-column, narrow blue sidebar, main content right
export function T2Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-gray-200 shadow-sm flex">
      {/* Left sidebar */}
      <div className="w-[32px] bg-[#2B6CB0] h-full flex flex-col items-center pt-[6px] px-[3px] shrink-0">
        {/* Photo circle */}
        <div className="w-[16px] h-[16px] rounded-full bg-white/20 border border-white/40 mb-[4px]" />
        {/* Name lines */}
        <div className="h-[2.5px] w-[22px] bg-white mb-[1.5px]" />
        <div className="h-[2px] w-[16px] bg-white/60 mb-[5px]" />
        {/* Divider */}
        <div className="w-full h-[0.5px] bg-white/30 mb-[4px]" />
        {/* Contact */}
        <div className="flex flex-col gap-[2px] w-full mb-[4px]">
          {[22, 18, 20].map((w, i) => (
            <div key={i} className="flex items-center gap-[1.5px]">
              <div className="w-[2px] h-[2px] bg-white/60 rounded-full shrink-0" />
              <div className="h-[1.5px] bg-white/70" style={{ width: w }} />
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="w-full h-[0.5px] bg-white/30 mb-[3px]" />
        {/* Skills label */}
        <div className="h-[2px] w-[18px] bg-white/80 mb-[2px]" />
        {/* Skills as text */}
        {[20, 16, 18, 14].map((w, i) => (
          <div key={i} className="h-[1.5px] bg-white/50 mb-[1.5px]" style={{ width: w }} />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 px-[5px] py-[5px] flex flex-col gap-[5px]">
        {/* Summary */}
        <div>
          <div className="h-[2.5px] w-[28px] bg-[#2B6CB0] mb-[2px]" />
          <div className="h-[1.5px] w-full bg-gray-300 mb-[1px]" />
          <div className="h-[1.5px] w-[80%] bg-gray-300" />
        </div>
        {/* Experience */}
        <div>
          <div className="h-[2.5px] w-[36px] bg-[#2B6CB0] mb-[2px]" />
          {[
            { title: 44, sub: 32, date: true },
            { title: 38, sub: 28, date: true },
          ].map((item, i) => (
            <div key={i} className="mb-[3px]">
              <div className="flex justify-between">
                <div className="h-[2.5px] bg-gray-700" style={{ width: item.title }} />
                {item.date && <div className="h-[2px] w-[14px] bg-gray-300" />}
              </div>
              <div className="h-[2px] bg-gray-400 mb-[1px]" style={{ width: item.sub }} />
              <div className="h-[1.5px] w-full bg-gray-200 mb-[0.5px]" />
              <div className="h-[1.5px] w-[85%] bg-gray-200" />
            </div>
          ))}
        </div>
        {/* Education */}
        <div>
          <div className="h-[2.5px] w-[30px] bg-[#2B6CB0] mb-[2px]" />
          <div className="flex justify-between">
            <div className="h-[2.5px] w-[40px] bg-gray-700" />
            <div className="h-[2px] w-[14px] bg-gray-300" />
          </div>
          <div className="h-[2px] w-[32px] bg-gray-400" />
        </div>
      </div>
    </div>
  )
}
