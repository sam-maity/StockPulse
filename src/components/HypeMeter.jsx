export default function HypeMeter({ hypeLevel, hypeRatio, onClick }) {
  const config = {
    calm: {
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      glow: "shadow-green-500/30",
      barColor: "bg-green-400",
      msg: "News coverage appears factual and measured."
    },
    "mild hype": {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      glow: "shadow-yellow-500/30",
      barColor: "bg-yellow-400",
      msg: "Some emotionally charged language detected. Interpret cautiously."
    },
    "high hype": {
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      glow: "shadow-red-500/30",
      barColor: "bg-red-400",
      msg: "High emotional intensity detected. Coverage may be driven by narrative rather than fundamentals."
    }
  }

  const c = config[hypeLevel] || config["calm"]

  // Clamp hypeRatio to [0, 1] for meter display
  const pct = Math.min(Math.max(hypeRatio, 0), 1) * 100

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-white transition hover:border-purple-500/30">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm tracking-widest uppercase text-purple-400 font-semibold">
          Hype Analysis*
        </h2>
        <div className="h-px flex-1 ml-4 bg-gradient-to-r from-purple-500/40 to-transparent" />
      </div>

      {/* Score row */}
      <div className="flex items-center justify-between mb-3">
        <p className={`text-xs tracking-widest uppercase font-bold ${c.color}`}>
          {hypeLevel}
        </p>
        <p className="text-xs text-zinc-400">
          Emotional Score:{" "}
          <span className={`font-bold ${c.color}`}>{hypeRatio.toFixed(2)}</span>
        </p>
      </div>

      {/* Meter card */}
      <div className={`${c.bg} border ${c.border} rounded-xl p-4 mb-4`}>

        {/* Zone labels */}
        <div className="flex justify-between text-[10px] tracking-widest uppercase text-zinc-500 mb-2">
          <span>Calm</span>
          <span>Mild Hype</span>
          <span>High Hype</span>
        </div>

        {/* Track */}
        <div className="relative h-3 rounded-full bg-white/10">

          {/* Static gradient background — all three zones always visible */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/50 via-yellow-500/50 to-red-500/50" />

          {/* Animated fill overlay */}
          <div
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out opacity-75 ${c.barColor}`}
            style={{ width: `${pct}%` }}
          />

          {/* Glowing needle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-white shadow-lg ${c.glow} shadow-md transition-all duration-700 ease-out`}
            style={{ left: `calc(${pct}% - 1.5px)` }}
          />
        </div>

        {/* Tick marks */}
        <div className="flex justify-between mt-1.5 px-[1px]">
          {[0, 0.25, 0.50, 0.75, 1.00].map((tick) => (
            <div key={tick} className="flex flex-col items-center gap-0.5">
              <div className="w-px h-1.5 bg-white/20" />
              <span className="text-[9px] text-zinc-600">{tick.toFixed(2)}</span>
            </div>
          ))}
        </div>

      </div>

      <p className="text-sm text-zinc-300 leading-relaxed">{c.msg}</p>

      <button
        onClick={onClick}
        className="mt-4 w-full py-2 text-xs font-orbitron tracking-widest text-cyan-500/60 border border-cyan-500/10 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all cursor-pointer"
      >
        VIEW DEEP ANALYSIS →
      </button>

    </div>
  )
}
