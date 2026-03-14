import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import News from './components/news'
import PriceCard from './components/PriceCard'
import SentimentGauge from './components/SentimentGauge'
import TopicBreakdown from './components/TopicBreakdown'
import HypeMeter from './components/HypeMeter'
import RiskScanner from './components/RiskScanner'
import DivergenceInsight from './components/DivergenceInsight'
import HeadlineList from './components/HeadlineList'
import DetailPanel from './components/DetailPanel'
import { analyzeStock } from './api/stock'
import Hero from "./components/Hero"
import HeroCards from './components/HeroCards'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
}

const card = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

function App() {
    const [data, setData]       = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState(null)
    const [panel, setPanel]     = useState({ type: null, data: null })

    const openPanel  = (type) => setPanel({ type, data })
    const closePanel = ()     => setPanel({ type: null, data: null })

    const handleAnalyze = async (ticker) => {
        setLoading(true)
        setError(null)
        setData(null)
        try {
            const result = await analyzeStock(ticker)
            setData(result)
        } catch (e) {
            setError("Could not fetch data. Check your ticker spelling.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white relative">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute w-175 h-175 bg-purple-900/10 blur-[180px] -top-60 -left-60" />
                <div className="absolute w-150 h-150 bg-indigo-900/10 blur-[160px] bottom-0 right-0" />
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none
                bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]
                bg-size-[40px_40px]"
            />

            <Navbar onAnalyze={handleAnalyze} />

            <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
                        <p className="text-cyan-400 text-sm font-orbitron tracking-widest animate-pulse">
                            RUNNING FINBERT ANALYSIS...
                        </p>
                    </div>
                )}
                {error && (
                    <div className="card-cyber border-red-900/50 p-5 text-center mt-8">
                        <p className="text-red-400 font-orbitron text-sm">{error}</p>
                    </div>
                )}
                {!data && !loading && (
                    <>
                        <Hero />
                        <SearchBar onAnalyze={handleAnalyze} />
                        <HeroCards />
                        <News />
                    </>
                )}
                {data && (
                    <>
                        <button
                            onClick={() => setData(null)}
                            className="cursor-pointer flex items-center gap-2 text-xs text-cyan-500 hover:text-cyan-300 font-orbitron tracking-widest transition-colors mb-6"
                        >
                            ← BACK TO FEED
                        </button>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={container}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="md:col-span-2" variants={card}>
                                <PriceCard
                                    data={data}
                                    onClick={() => openPanel("price")}
                                />
                            </motion.div>
                            <motion.div variants={card}>
                                <SentimentGauge
                                    data={data}
                                    onClick={() => openPanel("sentiment")}
                                />
                            </motion.div>
                            <motion.div variants={card}>
                                <TopicBreakdown
                                    topics={data.topic_sentiment}
                                    data={data}
                                    onClick={() => openPanel("topics")}
                                />
                            </motion.div>
                            <motion.div variants={card}>
                                <HypeMeter
                                    hypeLevel={data.hype_level}
                                    hypeRatio={data.hype_ratio}
                                    data={data}
                                    onClick={() => openPanel("hype")}
                                />
                            </motion.div>
                            <motion.div variants={card}>
                                <RiskScanner
                                    risks={data.risk_terms}
                                    data={data}
                                    onClick={() => openPanel("risk")}
                                />
                            </motion.div>
                            <motion.div className="md:col-span-2" variants={card}>
                                <DivergenceInsight
                                    comment={data.divergence_comment}
                                    data={data}
                                    onClick={() => openPanel("divergence")}
                                />
                            </motion.div>
                            <motion.div className="md:col-span-2" variants={card}>
                                <HeadlineList headlines={data.headlines} />
                            </motion.div>
                            <motion.div
                                className="md:col-span-2 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 text-center"
                                variants={card}
                            >
                                <p className="text-yellow-300/70 text-xs font-orbitron tracking-wider">
                                    *EDUCATIONAL TOOL ONLY - NOT FINANCIAL ADVICE - ALWAYS DO YOUR OWN RESEARCH
                                </p>
                            </motion.div>

                        </motion.div>
                    </>
                )}
            </div>

            <Footer />
            <DetailPanel
                type={panel.type}
                data={panel.data}
                onClose={closePanel}
            />

        </div>
    )
}

export default App
