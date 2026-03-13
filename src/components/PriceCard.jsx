export default function PriceCard({ data, onClick }) {
    const isPos    = data.change >= 0
    const currency = data.ticker?.endsWith(".NS") || data.ticker?.endsWith(".BO") ? "₹" : "$"

    return (
        <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-white transition hover:border-purple-500/30 cursor-pointer">

            <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm tracking-widest uppercase text-purple-400 font-semibold">
                    Price Overview
                </h2>
                <div className="h-[1px] flex-1 ml-4 bg-gradient-to-r from-purple-500/40 to-transparent" />
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <p className="text-4xl font-semibold tracking-tight">
                        {currency}{data.price ? data.price.toFixed(2) : "N/A"}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1 tracking-wider">
                        {data.ticker}
                    </p>
                </div>

                <span className={`px-5 py-2 rounded-lg text-sm font-semibold border
                    ${isPos
                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}>
                    {isPos ? "+" : ""}{data.change?.toFixed(2)} ({isPos ? "+" : ""}{data.change_percent?.toFixed(2)}%)
                </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-[11px] text-zinc-400 uppercase tracking-wide mb-1">20 Day MA</p>
                    <p className="font-semibold text-lg">
                        {data.ma20 ? `${currency}${data.ma20.toFixed(2)}` : "N/A"}
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-[11px] text-zinc-400 uppercase tracking-wide mb-1">50 Day MA</p>
                    <p className="font-semibold text-lg">
                        {data.ma50 ? `${currency}${data.ma50.toFixed(2)}` : "N/A"}
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-[11px] text-zinc-400 uppercase tracking-wide mb-1">Trend</p>
                    <p className={`font-semibold text-lg ${data.ma20 > data.ma50 ? "text-green-400" : "text-red-400"}`}>
                        {data.ma20 > data.ma50 ? "Bullish" : "Bearish"}
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
