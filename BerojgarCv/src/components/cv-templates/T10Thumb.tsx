export function T10Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-gray-200 px-[10px] py-[12px] flex flex-col gap-2">
      <div className="h-[8px] w-[70px] bg-gray-800 mb-2" />
      <div className="flex gap-2">
        <div className="w-[10px] h-[2px] bg-orange-400 mt-1 shrink-0" />
        <div className="flex flex-col gap-1 w-full">
          <div className="h-[3px] w-[40px] bg-gray-800" />
          <div className="h-[2px] w-full bg-gray-300" />
          <div className="h-[2px] w-[80%] bg-gray-300" />
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        <div className="w-[10px] h-[2px] bg-orange-400 mt-1 shrink-0" />
        <div className="flex flex-col gap-1 w-full">
          <div className="h-[3px] w-[40px] bg-gray-800" />
          <div className="h-[2px] w-full bg-gray-300" />
          <div className="h-[2px] w-[80%] bg-gray-300" />
        </div>
      </div>
    </div>
  )
}
