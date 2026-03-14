import { motion, AnimatePresence } from "framer-motion"
import { IoSearch } from "react-icons/io5"
import { useRef, useEffect } from "react"
import useTickerSearch from "../hooks/useTickerSearch"

const searchAnim = {
    initial: { opacity: 0, y: 120 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { amount: 0.4 }
}

export default function SearchBar({ onAnalyze }) {

    const {
        ticker,
        suggestions,
        dropItems,
        loadingSuggest,
        handleInput,
        handleSearch,
        setShowDropdown,
        showDropdown,
        handleSelect
    } = useTickerSearch(onAnalyze)

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }

        const handleScroll = () => {
            setShowDropdown(false)
        }

        document.addEventListener("mousedown", handleOutsideClick)
        window.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
            window.removeEventListener("scroll", handleScroll)
        }

    }, [])

    const wrapperRef = useRef(null)

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            }
        }

        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const exchangeBadge = (symbol) => {
        if (symbol.endsWith(".NS")) return { label: "NSE", color: "text-green-400" }
        if (symbol.endsWith(".BO")) return { label: "BSE", color: "text-blue-400" }
        return { label: "US", color: "text-cyan-400" }
    }

    return (
        <motion.section {...searchAnim} className="px-6 py-28">

            <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-10">
                <div>
                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-3">
                        Market Intelligence
                    </p>

                    <h2 className="text-4xl md:text-5xl font-semibold">
                        Explore Market Sentiment
                    </h2>
                </div>

                <div
                    ref={wrapperRef}
                    className="
          w-full
          bg-[#0b0b0f]
          border border-white/10
          rounded-2xl
          flex items-center
          px-6 py-4
          hover:border-purple-500/40
          transition
          relative
          "
                >

                    <IoSearch className="text-zinc-500 mr-4 text-lg" />

                    <input
                        value={ticker}
                        onChange={(e) => handleInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search company, ticker, or financial topic..."
                        className="
            w-full
            bg-transparent
            outline-none
            text-zinc-200
            placeholder:text-zinc-500
            text-lg
            "
                    />

                    {loadingSuggest && (
                        <div className="w-4 h-4 border border-purple-500/40 border-t-purple-400 rounded-full animate-spin" />
                    )}

                    <button
                        onClick={handleSearch}
                        className="
            ml-4
            px-6
            py-2
            rounded-lg
            bg-purple-600
            hover:bg-purple-500
            transition
            text-sm
            font-medium
            cursor-pointer
            "
                    >
                        Analyze
                    </button>

                    <AnimatePresence>

                        {showDropdown && dropItems.length > 0 && (

                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 right-0 mt-3 bg-[#0b0b0f] border border-white/10 rounded-xl overflow-hidden shadow-xl z-40"
                            >

                                <div className="px-4 py-2 border-b border-white/5">
                                    <span className="text-xs text-zinc-500 tracking-widest">
                                        {suggestions.length ? "SEARCH RESULTS" : "POPULAR"}
                                    </span>
                                </div>

                                {dropItems.map((item, i) => {

                                    const badge = exchangeBadge(item.symbol)

                                    return (
                                        <div
                                            key={i}
                                            onClick={() => handleSelect(item.symbol)}
                                            className="flex justify-between px-4 py-3 hover:bg-zinc-900 cursor-pointer"
                                        >

                                            <div>
                                                <p className="text-white text-sm">{item.name}</p>
                                                <p className="text-zinc-500 text-xs">{item.symbol}</p>
                                            </div>

                                            <span className={`text-xs ${badge.color}`}>
                                                {badge.label}
                                            </span>

                                        </div>
                                    )

                                })}

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>
                <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                    Enter a company or ticker to analyze real-time financial sentiment.
                    StockPulse evaluates financial news using AI models trained on market
                    language to detect bullish, bearish, and neutral narratives.
                </p>

            </div>

        </motion.section>
    )
}