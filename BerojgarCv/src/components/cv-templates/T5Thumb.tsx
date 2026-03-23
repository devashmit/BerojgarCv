export function T5Thumb() {
  return (
    <div className="w-full h-[168px] bg-white overflow-hidden shadow-sm flex pointer-events-none border border-gray-100">
      <div className="w-[30%] bg-[#2D4739] shrink-0 h-full flex flex-col items-center pt-3 px-2">
        <div className="w-6 h-6 bg-white/10 border border-white/20 rotate-45 mb-4 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#A5C9B3] -rotate-45" />
        </div>
        
        <div className="h-1.5 w-[80%] bg-white rounded-sm mb-1" />
        <div className="h-1 w-[60%] bg-[#A5C9B3] rounded-sm mb-4 border-b border-white/10 pb-2" />

        <div className="w-full mb-3">
          <div className="h-0.5 w-6 bg-[#A5C9B3] mb-1.5" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1"><div className="w-0.5 h-0.5 bg-[#A5C9B3]" /><div className="h-[2px] w-full bg-white/50" /></div>
            <div className="flex items-center gap-1"><div className="w-0.5 h-0.5 bg-[#A5C9B3]" /><div className="h-[2px] w-[80%] bg-white/50" /></div>
            <div className="flex items-center gap-1"><div className="w-0.5 h-0.5 bg-[#A5C9B3]" /><div className="h-[2px] w-[90%] bg-white/50" /></div>
          </div>
        </div>

        <div className="w-full">
          <div className="h-0.5 w-6 bg-[#A5C9B3] mb-1.5" />
          <div className="flex flex-wrap gap-[2px]">
            <div className="h-[3px] w-4 bg-white/20 rounded-full" />
            <div className="h-[3px] w-5 bg-white/20 rounded-full" />
            <div className="h-[3px] w-3 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex-1 h-full pl-3 pr-2 pt-4 flex flex-col gap-3 relative bg-white">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#2D4739] to-[#6EB38A]" />

        <div className="flex flex-col gap-1 mb-1 pl-1 border-l-[1.5px] border-[#A5C9B3]">
          <div className="h-[2px] w-[90%] bg-gray-300" />
          <div className="h-[2px] w-[70%] bg-gray-300" />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-[1px] bg-[#2D4739]" /><div className="h-1.5 w-10 bg-[#2D4739]" />
          </div>
          
          <div className="pl-3 relative flex flex-col gap-0.5">
            <div className="absolute left-0 top-[1px] w-1.5 h-1.5 rounded-full border border-[#2D4739] bg-white" />
            <div className="h-1.5 w-16 bg-gray-800" />
            <div className="h-1 w-10 bg-[#2D4739]" />
            <div className="h-1 w-[80%] bg-gray-400 mb-0.5" />
            <div className="flex items-center gap-1">
              <div className="w-0.5 h-0.5 rounded-full bg-gray-500" />
              <div className="h-0.5 w-[90%] bg-gray-300" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-0.5 h-0.5 rounded-full bg-gray-500" />
              <div className="h-0.5 w-[70%] bg-gray-300" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-[1px] bg-[#2D4739]" /><div className="h-1.5 w-10 bg-[#2D4739]" />
          </div>
          <div className="pl-3 relative flex flex-col gap-0.5">
            <div className="absolute left-0 top-[1px] w-1.5 h-1.5 rounded-full border border-[#2D4739] bg-white" />
            <div className="h-1.5 w-12 bg-gray-800" />
            <div className="h-1 w-14 bg-[#2D4739]" />
          </div>
        </div>
      </div>
    </div>
  )
}
