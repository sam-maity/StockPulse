export default function DivergenceInsight({ comment,onClick }) {
  return (
    <div className="
      bg-white/5
      backdrop-blur-md
      border border-white/10
      rounded-xl
      p-6
      text-white
      transition
      hover:border-purple-500/40
    ">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm tracking-widest uppercase text-purple-400 font-semibold">
          AI Divergence Insight*
        </h2>

        <div className="h-px flex-1 ml-4 bg-linear-to-r from-purple-500/40 to-transparent"></div>
      </div>

      <p className="text-zinc-300 leading-relaxed text-sm">
        {comment}
      </p>
      <button
        onClick={onClick}
        className="mt-4 w-full py-2 text-xs font-orbitron tracking-widest text-cyan-500/60 border border-cyan-500/10 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
      >
        VIEW DEEP ANALYSIS →
      </button>
    </div>
  )
}