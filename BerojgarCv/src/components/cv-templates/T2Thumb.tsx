export function T2Thumb() {
  return (
    <div className="w-full h-[168px] bg-white overflow-hidden shadow-sm flex pointer-events-none border border-gray-100">
      <div className="w-[30%] bg-[#1A3A5C] shrink-0 h-full flex flex-col items-center pt-4 relative">
        <div className="w-6 h-6 rounded-full border-[1.5px] border-white/20 bg-white/5 mb-3" />
        <div className="w-10 h-1.5 bg-white/80 rounded-full mb-1" />
        <div className="w-6 h-1 bg-blue-300/80 rounded-full mb-4" />
        
        <div className="flex flex-col gap-1 w-full px-2 mb-3">
          <div className="h-0.5 w-full bg-white/20" />
          <div className="h-0.5 w-[80%] bg-white/20" />
          <div className="h-0.5 w-[90%] bg-white/20" />
        </div>

        <div className="w-full px-2 flex flex-col gap-1.5 mt-2 z-10">
          <div className="h-1 w-8 bg-blue-200" />
          <div className="flex flex-col gap-1">
            <div className="h-[2px] w-full bg-white/10 rounded-full"><div className="h-full w-[80%] bg-blue-300 rounded-full" /></div>
            <div className="h-[2px] w-full bg-white/10 rounded-full"><div className="h-full w-[60%] bg-blue-300 rounded-full" /></div>
            <div className="h-[2px] w-full bg-white/10 rounded-full"><div className="h-full w-[40%] bg-blue-300 rounded-full" /></div>
          </div>
        </div>

        {/* Fake Mountain SVG graphic */}
        <div className="absolute bottom-0 left-0 w-full h-[30px] opacity-20 pointer-events-none bg-gradient-to-t from-white/30 to-transparent" />
      </div>

      <div className="flex-1 h-full pl-3 pr-2 pt-4 flex flex-col gap-3 relative bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#1A3A5C] to-[#3A7CA5]" />

        <div className="flex flex-col gap-1 mb-2">
          <div className="h-[2px] w-full bg-gray-200" />
          <div className="h-[2px] w-[90%] bg-gray-200" />
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="absolute -left-[5px] top-0 w-[2px] h-full bg-gray-200" />
          <div className="h-1.5 w-12 bg-[#1A3A5C] mb-1" />
          
          <div className="relative pl-2">
            <div className="absolute -left-2.5 top-[1px] w-[5px] h-[5px] rounded-full bg-[#1A3A5C] border border-white" />
            <div className="h-1.5 w-1/2 bg-gray-300 mb-0.5" />
            <div className="h-1 w-1/3 bg-[#3A7CA5] mb-1.5" />
            <div className="h-1 w-full bg-gray-200 mb-0.5" />
            <div className="h-1 w-[80%] bg-gray-200" />
          </div>

          <div className="relative pl-2 mt-1">
            <div className="absolute -left-2.5 top-[1px] w-[5px] h-[5px] rounded-full bg-[#1A3A5C] border border-white" />
            <div className="h-1.5 w-[60%] bg-gray-300 mb-0.5" />
            <div className="h-1 w-[40%] bg-[#3A7CA5] mb-1.5" />
          </div>
        </div>
      </div>
    </div>
  )
}
