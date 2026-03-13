import { useState, useRef, useEffect } from "react"
import { IoSearch } from "react-icons/io5"
import { IoIosMenu } from "react-icons/io"
import { motion, AnimatePresence } from "framer-motion"
import useTickerSearch from "../hooks/useTickerSearch"
import Categories from "./Categories"   // 👈 import

const Navbar = ({ onAnalyze }) => {

  const {
    ticker,
    suggestions,
    dropItems,
    loadingSuggest,
    handleInput,
    handleSearch,
    showDropdown,
    handleSelect
  } = useTickerSearch(onAnalyze)

  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)   // 👈 was missing
  const [marketStatus, setMarketStatus] = useState({
<<<<<<< Updated upstream
    india: "CHECKING",
    us: "CHECKING"
  })
  useEffect(() => {

    const fetchStatus = () => {
      fetch("http://127.0.0.1:8000/market-status")
        .then(res => res.json())
        .then(data =>
          setMarketStatus({
            india: data["Indian Market"],
            us: data["US Market"]
          })
        )
        .catch(() =>
          setMarketStatus({ nse: "OFFLINE", us: "OFFLINE" })
        )
    }

    fetchStatus()

    const interval = setInterval(fetchStatus, 60000)

    return () => clearInterval(interval)

  }, [])
=======
    nse: "CHECKING",
    us: "CHECKING"
  })

  useEffect(() => {
    const fetchStatus = () => {
      fetch("http://127.0.0.1:8000/market-status")
        .then(res => res.json())
        .then(data => setMarketStatus(data))
        .catch(() => setMarketStatus({ nse: "OFFLINE", us: "OFFLINE" }))
    }
    fetchStatus()
    const interval = setInterval(fetchStatus, 60000)
    return () => clearInterval(interval)
  }, [])

>>>>>>> Stashed changes
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  const openSearch = () => {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  const exchangeBadge = (symbol) => {
    if (symbol.endsWith(".NS")) return { label: "NSE", color: "text-green-400" }
    if (symbol.endsWith(".BO")) return { label: "BSE", color: "text-blue-400" }
    return { label: "US", color: "text-cyan-400" }
  }

  return (
    <>
      <div className="bg-black border-b border-white/5 h-20 flex justify-between items-center px-6 sticky top-0 z-50 backdrop-blur-xl">

        {/* LOGO */}
        <div className="flex items-center gap-3 flex-1 text-3xl cursor-pointer">
          <IoIosMenu
            className="text-2xl text-white cursor-pointer hover:text-purple-400 transition"
            onClick={() => setMenuOpen(true)}
          />
          <span className="font-[Poiret-One] text-white text-xl tracking-widest hidden sm:block">
            STOCKPULSE
          </span>
        </div>

        {/* MARKET STATUS TILES */}
<<<<<<< Updated upstream
        <div className="hidden md:flex items-center gap-3 pr-52 flex-1">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className={`w-2 h-2 rounded-full ${marketStatus.india === "OPEN" ? "bg-green-400" : "bg-red-500"}`} />
            <span className="text-xs font-orbitron tracking-widest">
              INDIAN MARKET {marketStatus.india}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className={`w-2 h-2 rounded-full ${marketStatus.us === "OPEN" ? "bg-green-400" : "bg-red-500"}`} />
            <span className="text-xs font-orbitron tracking-widest">
              US MARKET {marketStatus.us}
            </span>
          </div>

        </div>
=======
        <div className="hidden md:flex items-center gap-4 pr-50 flex-1">

          {/* NSE */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className={`w-2 h-2 rounded-full ${marketStatus.nse === "OPEN" ? "bg-green-400 pulse-dot" : "bg-red-400"
              }`} />
            <span className="text-xs font-orbitron tracking-widest text-white">
              NSE {marketStatus.nse}
            </span>
          </div>

          {/* US */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className={`w-2 h-2 rounded-full ${marketStatus.us === "OPEN" ? "bg-green-400 pulse-dot" : "bg-red-400"
              }`} />
            <span className="text-xs font-orbitron tracking-widest text-white">
              US {marketStatus.us}
            </span>
          </div>
>>>>>>> Stashed changes

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 text-white" ref={wrapperRef}>

          <AnimatePresence mode="wait">

            {!searchOpen ? (

              <motion.button
                key="icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={openSearch}
                className="cursor-pointer p-2 rounded-lg border border-zinc-800 hover:border-cyan-500/40 hover:bg-zinc-900 transition-all"
              >
                <IoSearch className="text-xl text-zinc-400 hover:text-cyan-400 transition-colors" />
              </motion.button>

            ) : (

              <motion.div
                key="searchbox"
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 360, opacity: 1 }}
                exit={{ width: 40, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative flex items-center gap-2"
              >

                {/* INPUT */}
                <div className="relative flex-1">

                  <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none" />

                  <input
                    ref={inputRef}
                    type="text"
                    value={ticker}
                    onChange={(e) => handleInput(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch()
                      if (e.key === "Escape") setSearchOpen(false)
                    }}
                    placeholder="Search company or ticker..."
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800 focus:border-cyan-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,255,0.08)] transition-all text-sm placeholder-zinc-600"
                  />

                  {loadingSuggest && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border border-cyan-500/40 border-t-cyan-400 rounded-full animate-spin" />
                  )}

                </div>

                {/* RUN BUTTON */}
                <button
                  onClick={handleSearch}
                  className="cursor-pointer px-4 py-2.5 text-xs font-orbitron tracking-wider border border-cyan-500/50 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all whitespace-nowrap"
                >
                  RUN
                </button>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {showDropdown && dropItems.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-10 mt-2 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black z-50"
                    >

                      <div className="px-4 py-2 border-b border-zinc-800/80">
                        <span className="text-xs font-orbitron text-zinc-600 tracking-widest">
                          {suggestions.length > 0 ? "SEARCH RESULTS" : "POPULAR"}
                        </span>
                      </div>

                      {dropItems.map((item, i) => {
                        const badge = exchangeBadge(item.symbol)
                        return (
                          <div
                            key={i}
                            onClick={() => handleSelect(item.symbol)}
                            className="flex justify-between items-center px-4 py-3 hover:bg-zinc-900/80 cursor-pointer transition-colors border-b border-zinc-900/50 last:border-0 group"
                          >
                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium truncate group-hover:text-cyan-300 transition-colors">
                                {item.name}
                              </p>
                              <p className="text-zinc-500 text-xs mt-0.5">
                                {item.symbol}
                              </p>
                            </div>
                            <span className={`text-xs ml-3 shrink-0 ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                        )
                      })}

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

      {/* bottom glow */}
      <div className="h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* CATEGORIES PANEL */}
      <Categories isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onAnalyze={handleSelect} />  {/* 👈 */}
    </>
  )
}

export default Navbar
