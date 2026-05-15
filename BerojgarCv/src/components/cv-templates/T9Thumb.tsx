export function T9Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-gray-200 flex">
      <div className="w-[30%] bg-indigo-600 h-full p-[6px] flex flex-col gap-1 items-center">
        <div className="w-[16px] h-[16px] rounded-full bg-indigo-300 mb-1" />
        <div className="h-[3px] w-full bg-indigo-100" />
        <div className="h-[2px] w-[80%] bg-indigo-300" />
        <div className="h-[2px] w-[80%] bg-indigo-300 mt-2" />
      </div>
      <div className="w-[70%] h-full p-[8px] flex flex-col gap-2">
        <div className="h-[3px] w-[40px] bg-gray-800" />
        <div className="h-[2px] w-[60px] bg-gray-300" />
        <div className="h-[2px] w-[50px] bg-gray-300" />
        <div className="h-[3px] w-[40px] bg-gray-800 mt-1" />
        <div className="h-[2px] w-[60px] bg-gray-300" />
      </div>
    </div>
  )
}
