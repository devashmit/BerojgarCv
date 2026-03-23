export function T1Thumb() {
  return (
    <div className="w-full h-[168px] bg-white overflow-hidden shadow-sm flex flex-col pointer-events-none border border-gray-100 relative">
      <div className="w-full h-[32px] bg-[#C0392B] border-t-[1.5px] border-b-[1.5px] border-[#D4AF37] px-3 py-2 flex justify-between items-center z-10">
        <div className="flex flex-col gap-1 w-1/2">
          <div className="h-2 w-full bg-white/10" />
          <div className="h-1.5 w-2/3 bg-[#D4AF37] opacity-80" />
          <div className="flex gap-1 mt-1">
            <div className="h-1 w-4 bg-white/20" /><div className="h-1 w-4 bg-white/20" /><div className="h-1 w-4 bg-white/20" />
          </div>
        </div>
        <div className="w-[20px] h-[24px] border border-dashed border-white/40 bg-white/5" />
      </div>

      <div className="p-3 flex flex-col gap-3">
        <div className="h-[2px] w-full bg-gray-100" />
        <div className="h-[2px] w-[90%] bg-gray-100" />
        
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
            <div className="h-1.5 w-8 bg-[#C0392B]" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C0392B] to-transparent opacity-50" />
          </div>
          <div className="flex flex-col gap-1.5 pl-2 border-l border-gray-50">
            <div className="h-1.5 w-1/3 bg-gray-300" />
            <div className="h-1 w-1/4 bg-[#C0392B] opacity-50" />
            <div className="h-1 w-full bg-gray-100" />
            <div className="h-1 w-5/6 bg-gray-100" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
            <div className="h-1.5 w-8 bg-[#C0392B]" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C0392B] to-transparent opacity-50" />
          </div>
          <div className="flex flex-col gap-1.5 pl-2 border-l border-gray-50">
            <div className="h-1.5 w-1/3 bg-gray-300" />
            <div className="h-1 w-1/4 bg-[#C0392B] opacity-50" />
          </div>
        </div>
      </div>
    </div>
  )
}
