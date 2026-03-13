export default function RiskScanner({ risks, onClick }) {

  const hasRisks = risks && Object.keys(risks).length > 0

  return (
    <div className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-white transition hover:border-purple-500/30 cursor-pointer flex flex-col justify-between">

      {/* TOP CONTENT */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm tracking-widest uppercase text-purple-400 font-semibold">
            Risk Scanner*
          </h2>
          <div className="h-px flex-1 ml-4 bg-linear-to-r from-purple-500/40 to-transparent" />
        </div>

        {hasRisks ? (
          <div className="flex flex-col justify-center">
            <p className="text-red-400 text-sm mb-4">
              Risk-related language detected in recent headlines
            </p>
            <div className="flex flex-wrap gap-10 items-center">
              {Object.entries(risks).map(([word, count]) => (
                <span
                  key={word}
                  className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs px-3 py-1 rounded-full tracking-wide"
                >
                  {word} ×{count}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 text-center">
            <p className="text-green-400 font-semibold text-sm">
              No risk indicators detected
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Recent headlines appear stable
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM BUTTON — always pinned to bottom */}
      <button
        onClick={onClick}
        className="mt-4 w-full py-2 text-xs font-orbitron tracking-widest text-cyan-500/60 border border-cyan-500/10 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all cursor-pointer"
      >
        VIEW DEEP ANALYSIS →
      </button>

    </div>
  )
}
