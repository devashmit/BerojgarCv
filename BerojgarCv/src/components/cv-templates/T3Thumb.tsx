export function T3Thumb() {
  return (
    <div className="w-full h-[168px] bg-white overflow-hidden shadow-sm flex flex-col pointer-events-none border border-gray-100 p-4">
      <div className="flex flex-col items-center mb-3">
        <div className="h-2.5 w-24 bg-black rounded-[1px] mb-1.5" />
        <div className="h-1 w-32 bg-gray-400 rounded-[1px]" />
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="h-1.5 w-12 bg-black mb-1 border-b border-black pb-0.5" />
          <div className="flex justify-between items-baseline mb-0.5">
            <div className="h-1.5 w-16 bg-gray-800" />
            <div className="h-1 w-8 bg-gray-400" />
          </div>
          <div className="flex justify-between items-baseline">
            <div className="h-1 w-20 bg-gray-500" />
            <div className="h-1 w-10 bg-gray-300" />
          </div>
        </div>

        <div>
          <div className="h-1.5 w-16 bg-black mb-1 border-b border-black pb-0.5" />
          <div className="flex justify-between items-baseline mb-0.5">
            <div className="h-1.5 w-20 bg-gray-800" />
            <div className="h-1 w-8 bg-gray-400" />
          </div>
          <div className="flex justify-between items-baseline mb-1">
            <div className="h-1 w-12 bg-gray-500" />
            <div className="h-1 w-10 bg-gray-300" />
          </div>
          
          <div className="pl-3 space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-black shrink-0" />
              <div className="h-1 w-full bg-gray-300" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-black shrink-0" />
              <div className="h-1 w-[80%] bg-gray-300" />
            </div>
          </div>
        </div>

        <div>
          <div className="h-1.5 w-10 bg-black mb-1 border-b border-black pb-0.5" />
          <div className="h-1 w-full bg-gray-400 mb-0.5" />
          <div className="h-1 w-[90%] bg-gray-400" />
        </div>
      </div>
    </div>
  )
}
