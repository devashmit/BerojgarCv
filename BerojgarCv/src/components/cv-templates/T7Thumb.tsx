// T7 Rirekisho — JIS grid table layout, all bordered cells, Japanese labels
export function T7Thumb() {
  return (
    <div className="w-[119px] h-[168px] overflow-hidden pointer-events-none bg-white border border-[#555] shadow-sm p-[4px]" style={{ fontFamily: 'sans-serif' }}>
      {/* Date row */}
      <div className="flex justify-end mb-[2px]">
        <div className="h-[2px] w-[28px] bg-gray-400" />
      </div>

      {/* Name + photo row */}
      <div className="flex border border-[#555] mb-[1px]">
        <div className="flex-1 border-r border-[#555]">
          <div className="border-b border-[#555] px-[2px] py-[1px]">
            <div className="h-[1.5px] w-[20px] bg-gray-400" />
          </div>
          <div className="px-[2px] py-[2px]">
            <div className="h-[2px] w-[36px] bg-gray-700 mb-[1px]" />
            <div className="h-[1.5px] w-[28px] bg-gray-400" />
          </div>
        </div>
        {/* Photo box */}
        <div className="w-[18px] flex items-center justify-center bg-gray-50">
          <div className="w-[12px] h-[16px] border border-dashed border-gray-400 flex items-center justify-center">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* DOB / address row */}
      <div className="flex border border-[#555] border-t-0 mb-[1px]">
        <div className="w-[20px] border-r border-[#555] px-[1px] py-[1px] bg-gray-50">
          <div className="h-[1.5px] w-full bg-gray-400" />
        </div>
        <div className="flex-1 px-[2px] py-[1px]">
          <div className="h-[1.5px] w-[32px] bg-gray-500" />
        </div>
      </div>

      {/* Education/Work history header */}
      <div className="border border-[#555] border-t-0 mb-[1px]">
        <div className="bg-gray-100 border-b border-[#555] px-[2px] py-[1px] text-center">
          <div className="h-[2px] w-[40px] bg-gray-600 mx-auto" />
        </div>
        {/* Rows */}
        {[
          { year: true, content: 36 },
          { year: true, content: 44 },
          { year: true, content: 40 },
          { year: true, content: 36 },
          { year: true, content: 44 },
        ].map((row, i) => (
          <div key={i} className="flex border-b border-[#555] last:border-b-0">
            <div className="w-[18px] border-r border-[#555] px-[1px] py-[1px] bg-gray-50">
              <div className="h-[1.5px] w-full bg-gray-400" />
            </div>
            <div className="flex-1 px-[2px] py-[1px]">
              <div className="h-[1.5px] bg-gray-600" style={{ width: row.content }} />
            </div>
          </div>
        ))}
      </div>

      {/* Self-PR box */}
      <div className="border border-[#555] border-t-0">
        <div className="bg-gray-100 border-b border-[#555] px-[2px] py-[0.5px]">
          <div className="h-[1.5px] w-[28px] bg-gray-500" />
        </div>
        <div className="px-[2px] py-[2px] flex flex-col gap-[1px]">
          <div className="h-[1px] w-full bg-gray-200" />
          <div className="h-[1px] w-[90%] bg-gray-200" />
          <div className="h-[1px] w-[80%] bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
