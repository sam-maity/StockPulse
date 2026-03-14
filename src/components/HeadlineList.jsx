export default function HeadlineList({ headlines }) {

  const bgMap = {
    positive: "bg-green-500/10 border-green-500/30",
    neutral: "bg-yellow-500/10 border-yellow-500/30",
    negative: "bg-red-500/10 border-red-500/30"
  }

  const labelColor = {
    positive: "text-green-400",
    neutral: "text-yellow-400",
    negative: "text-red-400"
  }

  return (
    <div
      className="
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
          Headline Analysis
        </h2>
        <div className="h-[1px] flex-1 ml-4 bg-gradient-to-r from-purple-500/40 to-transparent"></div>
      </div>

      <div className="space-y-3 cursor-pointer">

        {headlines.map((h, i) => (
          <div
            key={i}
            className={`
              border rounded-xl p-4
              ${bgMap[h.label]}
              transition-all
              hover:scale-[1.01]
            `}
          >
            <a
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm 
                text-zinc-200 
                mb-3 
                leading-relaxed 
                block 
                transition
                cursor-pointer
                no-underline
                decoration-purple-500/50
              "
            >
              {h.title || h.headline}
            </a>
            <div className="flex flex-wrap gap-2 items-center">

              <span className={`text-xs font-semibold uppercase tracking-wide ${labelColor[h.label]}`}>
                {h.label}
              </span>

              <span className="text-xs text-zinc-400">
                {(h.confidence * 100).toFixed(0)}% confidence
              </span>

              {h.risk_flags && h.risk_flags.length > 0 && (
                <span
                  className="
                    text-xs
                    bg-red-500/10
                    border border-red-500/30
                    text-red-300
                    px-2 py-0.5
                    rounded-full
                  "
                >
                  risk: {h.risk_flags.join(", ")}
                </span>
              )}

              {h.hype_score > 0 && (
                <span
                  className="
                    text-xs
                    bg-orange-500/10
                    border border-orange-500/30
                    text-orange-300
                    px-2 py-0.5
                    rounded-full
                  "
                >
                  hype signal
                </span>
              )}

              {h.topics && h.topics.map((t) => (
                <span
                  key={t}
                  className="
                    text-xs
                    bg-purple-500/10
                    border border-purple-500/30
                    text-purple-300
                    px-2 py-0.5
                    rounded-full
                    capitalize
                  "
                >
                  {t}
                </span>
              ))}

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}
