import { motion } from "framer-motion"

const cardAnim = {
    initial: { opacity: 0, y: 120 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { amount: 0.4 }
}

export default function HeroCards() {
    return (

        <div className="max-w-5xl mx-auto flex flex-col gap-32 px-6 py-32">
            <motion.div {...cardAnim} className="w-full cursor-pointer">

                <div className="
bg-[#0b0b0f]
border border-white/10
hover:border-purple-500/40
transition
rounded-3xl
p-14
min-h-105
flex flex-col
items-start
text-left
">

                    <div className="w-14 h-14 rounded-xl border border-purple-500/30
bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8">
                        AI
                    </div>

                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-3">
                        Sentiment Engine
                    </p>

                    <h3 className="text-4xl font-semibold mb-6">
                        FinBERT Market Sentiment
                    </h3>

                    <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-6">
                        StockPulse analyzes financial news using a domain trained FinBERT model to understand how markets are reacting to information in real time.
                        The system evaluates headlines, summaries and financial language to determine whether market sentiment is bullish, bearish or neutral.
                    </p>

                    <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                        This helps investors quickly understand the tone of current market coverage without manually reading dozens of articles across financial media.
                    </p>

                </div>
            </motion.div>
            <motion.div {...cardAnim} className="w-full cursor-pointer">

                <div className="
bg-[#0b0b0f]
border border-white/10
hover:border-purple-500/40
transition
rounded-3xl
p-14
min-h-105
flex flex-col
items-start
text-left
">

                    <div className="w-14 h-14 rounded-xl border border-indigo-500/30
bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8">
                        Scan
                    </div>

                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-3">
                        Narrative Detection
                    </p>

                    <h3 className="text-4xl font-semibold mb-6">
                        Hype and Risk Scanner
                    </h3>

                    <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-6">
                        Financial markets are often influenced by narratives rather than fundamentals.
                        StockPulse scans headlines for emotionally charged language, speculative wording and potential risk indicators that can distort perception.
                    </p>

                    <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                        By highlighting hype driven coverage and risk related keywords, the platform helps users distinguish between genuine market signals and narrative noise.
                    </p>

                </div>
            </motion.div>

            <motion.div {...cardAnim} className="w-full cursor-pointer">

                <div className="
bg-[#0b0b0f]
border border-white/10
hover:border-purple-500/40
transition
rounded-3xl
p-14
min-h-105
flex flex-col
items-start
text-left
">

                    <div className="w-14 h-14 rounded-xl border border-purple-500/30
bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8">
                        Data
                    </div>

                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-3">
                        Market Intelligence
                    </p>

                    <h3 className="text-4xl font-semibold mb-6">
                        Topic Drivers
                    </h3>

                    <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-6">
                        Beyond sentiment, StockPulse analyzes what themes are shaping the market conversation.
                        The system extracts topics from financial news to identify the forces currently influencing investor attention.
                    </p>

                    <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                        This allows users to quickly understand whether earnings announcements, macroeconomic shifts, regulatory decisions or company developments are driving market discussion.
                    </p>

                </div>
            </motion.div>


        </div>
    )
}