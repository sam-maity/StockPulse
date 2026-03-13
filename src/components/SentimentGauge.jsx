export default function SentimentGauge({ data, onClick }) {

  const colorMap = {
    bullish: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/30"
    },
    neutral: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/30"
    },
    bearish: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30"
    }
  }

  const c = colorMap[data.overall_label] || colorMap.neutral

  return (
    <div
      className="
        w-full
        cursor-pointer
        h-full
        bg-white/5
        backdrop-blur-md
        border border-white/10
        rounded-xl
        p-6
        text-white
        transition
        hover:border-purple-500/30
      "
    >

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm tracking-widest uppercase text-purple-400 font-semibold">
          AI Sentiment*
        </h2>
        <div className="h-[1px] flex-1 ml-4 bg-gradient-to-r from-purple-500/40 to-transparent"></div>
      </div>

      <div
        className={`
          ${c.bg}
          border ${c.border}
          rounded-sm
          p-6
          text-center
          mb-6
        `}
      >

        <p className={`text-4xl font-semibold tracking-tight ${c.text}`}>
          {data.overall_score >= 0 ? "+" : ""}
          {data.overall_score.toFixed(2)}
        </p>

        <p className={`text-sm font-semibold mt-2 tracking-wide ${c.text}`}>
          {data.overall_label.toUpperCase()}
        </p>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-4 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              data.overall_label === "bullish"
                ? "bg-green-400"
                : data.overall_label === "bearish"
                ? "bg-red-400"
                : "bg-yellow-400"
            }`}
            style={{
              width: `${Math.max(0, Math.min(100, ((data.overall_score + 1) / 2) * 100))}%`
            }}
          />
        </div>
        <p className="text-[11px] text-zinc-400 mt-1 tracking-wide">
          FinBERT sentiment analysis
        </p>

      </div>
      
{data.news_warning && (
  <div
    className="
      mb-5
      px-3 py-2
      text-[11px]
      text-yellow-300
      bg-yellow-500/10
      border border-yellow-500/20
      rounded-md
      tracking-wide
    "
  >
    {data.news_warning}
  </div>
)}
      <div className="grid grid-cols-3 gap-4 text-center">

        <div
          className="
            bg-white/5
            border border-white/10
            rounded-sm
            py-3
          "
        >
          <p className="text-xl font-semibold text-green-400">
            {data.label_counts.positive}
          </p>
          <p className="text-[11px] text-zinc-400 uppercase tracking-wide mt-1">
            Positive
          </p>
        </div>

        <div
          className="
            bg-white/5
            border border-white/10
            rounded-lg
            py-3
          "
        >
          <p className="text-xl font-semibold text-yellow-400">
            {data.label_counts.neutral}
          </p>
          <p className="text-[11px] text-zinc-400 uppercase tracking-wide mt-1">
            Neutral
          </p>
        </div>

        <div
          className="
            bg-white/5
            border border-white/10
            rounded-sm
            py-3
          "
        >
          <p className="text-xl font-semibold text-red-400">
            {data.label_counts.negative}
          </p>
          <p className="text-[11px] text-zinc-400 uppercase tracking-wide mt-1">
            Negative
          </p>
        </div>

      </div>
      <button
        onClick={onClick}
        className="mt-4 w-full py-2 text-xs font-orbitron tracking-widest text-cyan-500/60 border border-cyan-500/10 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all cursor-pointer"
      >
        VIEW DEEP ANALYSIS →
      </button>
    </div>
  )
}