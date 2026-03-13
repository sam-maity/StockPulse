export default function TopicBreakdown({ topics }) {

  const getColor = (score) => {
    if (score > 0.2) return "text-green-400"
    if (score < -0.2) return "text-red-400"
    return "text-yellow-400"
  }

  const getBarColor = (score) => {
    if (score > 0.2) return "bg-green-500/80"
    if (score < -0.2) return "bg-red-500/80"
    return "bg-yellow-500/80"
  }

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
          Sentiment Drivers
        </h2>
        <div className="h-[1px] flex-1 ml-4 bg-gradient-to-r from-purple-500/40 to-transparent"></div>
      </div>

      {!topics || Object.keys(topics).length === 0 ? (
        <p className="text-zinc-400 text-sm">
          No topic sentiment data available
        </p>
      ) : (

        <div className="flex justify-between flex-col gap-10">

          {Object.entries(topics).map(([topic, score]) => (
            <div key={topic}>

              <div className="flex justify-between mb-2">

                <span className="capitalize text-sm text-zinc-300 tracking-wide">
                  {topic}
                </span>

                <span className={`text-sm font-semibold ${getColor(score)}`}>
                  {score > 0 ? "+" : ""}
                  {score.toFixed(2)}
                </span>

              </div>

              <div className="
                w-full
                bg-white/10
                border border-white/10
                rounded-sm
                h-2
                overflow-hidden
              ">

                <div
                  className={`
                    ${getBarColor(score)}
                    h-2
                    rounded-full
                    transition-all
                    duration-500
                  `}
                  style={{ width: `${Math.min(Math.abs(score) * 100, 100)}%` }}
                />

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}