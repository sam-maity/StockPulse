import React from 'react'

const SectorWise = () => {
    return (
        <div className="
      w-full
      h-full
      bg-white/5
      backdrop-blur-md
      border border-white/10
      rounded-xl
      p-6
      text-white
      transition
      hover:border-purple-500/30
    ">

            <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm tracking-widest uppercase text-purple-400 font-semibold">
                    Sector Wise
                </h2>
                <div className="h-px flex-1 ml-4 bg-linear-to-r from-purple-500/40 to-transparent"></div>
            </div>

        </div>
    )
}

export default SectorWise