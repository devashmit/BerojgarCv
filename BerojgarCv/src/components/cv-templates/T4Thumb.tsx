export function T4Thumb() {
  return (
    <div className="w-full h-[168px] bg-white overflow-hidden shadow-sm flex flex-col pointer-events-none border border-gray-100 border-t-[3px] border-b-[3px] border-[#0A192F]">
      <div className="flex flex-col items-center pt-3 pb-2 border-b border-gray-100">
        <div className="h-2 w-24 bg-[#0A192F] mb-1.5" />
        <div className="h-1.5 w-16 bg-gray-300 mb-2" />
        <div className="flex gap-2">
          <div className="h-1 w-8 bg-gray-200" /><div className="h-1 w-8 bg-gray-200" /><div className="h-1 w-8 bg-gray-200" />
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1.5 w-12 bg-[#0A192F]" />
            <div className="flex-1 h-[1px] bg-gray-200 relative"><div className="absolute left-0 top-0 w-4 h-full bg-[#0A192F]" /></div>
          </div>
          <div className="flex justify-between">
            <div className="h-1.5 w-16 bg-[#0A192F] mb-0.5" />
            <div className="h-1 w-8 bg-gray-200" />
          </div>
          <div className="h-1 w-12 bg-gray-400 mb-1" />
          <div className="pl-1.5 flex items-center gap-1 mb-0.5">
            <div className="text-[6px] text-[#0A192F] leading-[4px] mt-0.5">▸</div>
            <div className="h-1 w-full bg-gray-300" />
          </div>
          <div className="pl-1.5 flex items-center gap-1">
            <div className="text-[6px] text-[#0A192F] leading-[4px] mt-0.5">▸</div>
            <div className="h-1 w-[80%] bg-gray-300" />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1.5 w-10 bg-[#0A192F]" />
            <div className="flex-1 h-[1px] bg-gray-200 relative"><div className="absolute left-0 top-0 w-4 h-full bg-[#0A192F]" /></div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="h-1.5 w-14 bg-[#0A192F] mb-0.5" />
              <div className="h-1 w-16 bg-gray-400" />
            </div>
            <div className="h-1 w-8 bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="h-1.5 w-12 bg-[#0A192F]" />
            <div className="flex-1 h-[1px] bg-gray-200 relative"><div className="absolute left-0 top-0 w-4 h-full bg-[#0A192F]" /></div>
          </div>
          <div className="flex gap-1">
            <div className="h-2.5 w-10 bg-[#0A192F] rounded-[1px]" />
            <div className="h-2.5 w-8 bg-[#0A192F] rounded-[1px]" />
            <div className="h-2.5 w-12 bg-gray-100 border border-gray-200 rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
