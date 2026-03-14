import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const sectors = [
  {
    label: "IT",
    stocks: [
      { name: "TCS", symbol: "TCS.NS" },
      { name: "Infosys", symbol: "INFY.NS" },
      { name: "Wipro", symbol: "WIPRO.NS" },
      { name: "HCL Tech", symbol: "HCLTECH.NS" },
      { name: "Tech Mahindra", symbol: "TECHM.NS" },
    ],
  },
  {
    label: "POWER & ENERGY",
    stocks: [
      { name: "NTPC", symbol: "NTPC.NS" },
      { name: "Power Grid", symbol: "POWERGRID.NS" },
      { name: "Reliance", symbol: "RELIANCE.NS" },
      { name: "ONGC", symbol: "ONGC.NS" },
      { name: "Adani Green", symbol: "ADANIGREEN.NS" },
    ],
  },
  {
    label: "FINANCE",
    stocks: [
      { name: "HDFC Bank", symbol: "HDFCBANK.NS" },
      { name: "ICICI Bank", symbol: "ICICIBANK.NS" },
      { name: "SBI", symbol: "SBIN.NS" },
      { name: "Kotak Bank", symbol: "KOTAKBANK.NS" },
      { name: "Bajaj Finance", symbol: "BAJFINANCE.NS" },
    ],
  },
  {
    label: "METALS",
    stocks: [
      { name: "Tata Steel", symbol: "TATASTEEL.NS" },
      { name: "Hindalco", symbol: "HINDALCO.NS" },
      { name: "JSW Steel", symbol: "JSWSTEEL.NS" },
      { name: "Coal India", symbol: "COALINDIA.NS" },
      { name: "NMDC", symbol: "NMDC.NS" },
    ],
  },
  {
    label: "TRANSPORT",
    stocks: [
      { name: "IRCTC", symbol: "IRCTC.NS" },
      { name: "IndiGo", symbol: "INDIGO.NS" },
      { name: "Adani Ports", symbol: "ADANIPORTS.NS" },
      { name: "CONCOR", symbol: "CONCOR.NS" },
      { name: "Blue Dart", symbol: "BLUEDART.NS" },
    ],
  },
]

const Categories = ({ isOpen, onClose, onAnalyze }) => {
  const [openSector, setOpenSector] = useState(null)

  const handleSectorClick = (label) => {
    setOpenSector(prev => prev === label ? null : label)
  }

  const handleStockClick = (symbol) => {
    onAnalyze(symbol)
    onClose()
    setOpenSector(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { onClose(); setOpenSector(null) }}
          />

          <motion.div
            className="fixed top-0 left-0 h-full w-72 bg-[#0a0a0f] border-r border-white/5 z-50 flex flex-col p-6 overflow-y-auto"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-[Poiret-One] text-white text-lg tracking-widest">
                STOCKPULSE
              </h2>
              <button
                onClick={() => { onClose(); setOpenSector(null) }}
                className="text-zinc-600 hover:text-white text-lg transition cursor-pointer"
              >✕</button>
            </div>

            <p className="text-xs font-orbitron text-zinc-600 tracking-widest mb-6">
              SECTORS
            </p>

            <div className="flex flex-col gap-6">
              {sectors.map((sector, i) => (
                <div key={sector.label}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleSectorClick(sector.label)}
                    className="hover:bg-purple-500/30 flex items-center justify-between cursor-pointer py-3 px-3 rounded-xl transition-all group"
                  >
                    <span className={`text-sm font-orbitron tracking-wider transition-colors ${
                      openSector === sector.label ? "text-cyan-400" : "text-zinc-400 group-hover:text-white"
                    }`}>
                      {sector.label}
                    </span>
                    <motion.span
                      animate={{ rotate: openSector === sector.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-zinc-600 text-xs focus:bg-white"
                    >
                      ▼
                    </motion.span>
                  </motion.div>

                  <AnimatePresence>
                    {openSector === sector.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col ml-3 mb-2 border-l border-white/5 pl-3">
                          {sector.stocks.map((stock, j) => (
                            <motion.div
                              key={stock.symbol}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.05 }}
                              onClick={() => handleStockClick(stock.symbol)}
                              className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-cyan-500/10 cursor-pointer group transition-all"
                            >
                              <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                                {stock.name}
                              </span>
                              <span className="text-xs text-zinc-600 group-hover:text-cyan-400 transition-colors font-orbitron">
                                {stock.symbol.replace(".NS", "")}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ))}
            </div>
            <div className="mt-auto pt-6 text-xs text-zinc-700 text-center font-orbitron tracking-widest">
              EDUCATIONAL USE ONLY
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Categories
