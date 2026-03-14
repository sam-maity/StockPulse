import { useEffect, useState } from "react"
import PriceChart from "./PriceChart"

const PERIODS = [
  { label: "1D",  value: "1d"  },
  { label: "1W",  value: "5d"  },
  { label: "1M",  value: "1mo" },
  { label: "3M",  value: "3mo" },
  { label: "1Y",  value: "1y"  },
  { label: "MAX", value: "max" },
]

export default function PriceCard({ data, onClick }) {
  const [history, setHistory] = useState([])
  const [period, setPeriod]   = useState("1d")
  const [loading, setLoading] = useState(false)

  const currency = data.ticker?.endsWith(".NS") || data.ticker?.endsWith(".BO") ? "₹" : "$"

  // Badge always shows today's change vs yesterday
  const badgePos = data.change >= 0

  // Chart colour based on selected period's first vs last price
  const chartPos = history.length >= 2
    ? history[history.length - 1].value >= history[0].value
    : badgePos

  useEffect(() => {
    if (!data?.ticker) return
    setLoading(true)
    fetch(`http://127.0.0.1:8000/stock/${data.ticker}/history?period=${period}`)
      .then(res => res.json())
      .then(d => { setHistory(d); setLoading(false) })
      .catch(() => { setHistory([]); setLoading(false) })
  }, [data.ticker, period])

  return (
    <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl p-6 w-full">

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">
            Price Overview
          </p>
          <h2 className="text-4xl font-bold text-white">
            {currency}{data.price ? data.price.toFixed(2) : "N/A"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">{data.ticker}</p>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-lg mt-1
          ${badgePos ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
          {badgePos ? "+" : ""}{data.change?.toFixed(2)} ({badgePos ? "+" : ""}{data.change_percent?.toFixed(2)}%)
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">20 Day MA</p>
          <p className="text-lg font-semibold text-white">
            {data.ma20 ? `${currency}${data.ma20.toFixed(2)}` : "N/A"}
          </p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">50 Day MA</p>
          <p className="text-lg font-semibold text-white">
            {data.ma50 ? `${currency}${data.ma50.toFixed(2)}` : "N/A"}
          </p>
        </div>
      </div>

      {/* Period Buttons */}
      <div className="flex gap-2 mb-4">
        {PERIODS.map(p => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
              ${period === p.value
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      {loading ? (
        <div className="h-[280px] flex items-center justify-center text-gray-500 text-sm">
          Loading...
        </div>
      ) : (
        <PriceChart history={history} isPos={chartPos} />
      )}

      {onClick && (
        <button
          onClick={onClick}
          className="w-full mt-4 text-center text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          VIEW DEEP ANALYSIS →
        </button>
      )}
    </div>
  )
}