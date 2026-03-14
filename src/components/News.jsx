import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const reveal = {
  initial: { opacity: 0, y: 100 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { amount: 0.25 }
}

const News = () => {

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const token = "d6ni1upr01qodk5vtec0d6ni1upr01qodk5vtecg"

  const indianKeywords = [
    "india","nse","bse","nifty","sensex","rbi",
    "reliance","tata","infosys","adani","hdfc","icici"
  ]

  const fetchNews = async () => {
    setLoading(true)

    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${token}`
      )

      const data = await res.json()

      const indianNews = data.filter(a =>
        indianKeywords.some(k =>
          a.headline?.toLowerCase().includes(k) ||
          a.summary?.toLowerCase().includes(k)
        )
      )

      const globalNews = data.filter(a =>
        !indianKeywords.some(k =>
          a.headline?.toLowerCase().includes(k)
        )
      )

      setNews([...indianNews.slice(0,7), ...globalNews.slice(0,3)])

    } catch (e) {
      console.error("News fetch failed", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchNews() }, [])

  const formatTime = (unix) => {
    if (!unix) return ""
    const date = new Date(unix * 1000)

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const isIndian = (article) =>
    indianKeywords.some(k =>
      article.headline?.toLowerCase().includes(k) ||
      article.summary?.toLowerCase().includes(k)
    )

  const SkeletonCard = () => (
    <div className="
      p-5
      bg-white/5
      border border-white/10
      rounded-xl
      animate-pulse
    ">
      <div className="h-4 bg-zinc-700 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-zinc-800 rounded w-full mb-2"></div>
      <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
    </div>
  )

  return (

<motion.section
  {...reveal}
  className="max-w-5xl mx-auto px-6 py-32 relative"
>


<div className="flex items-center justify-between mb-12">

<div className="flex items-center gap-4">

<h2 className="text-sm tracking-widest uppercase text-purple-400 font-semibold">
Market Intelligence
</h2>

<div className="h-[1px] w-40 bg-gradient-to-r from-purple-500/40 to-transparent"></div>

</div>

<button
  onClick={fetchNews}
  className="
  text-xs
  border border-white/10
  text-zinc-300
  px-3 py-1.5
  rounded-lg
  hover:border-purple-500/40
  hover:text-purple-300
  transition
  "
>
Refresh
</button>

</div>


<div className="
space-y-4
max-h-[700px]
overflow-y-auto
pr-2
relative
">

{loading ? (

Array(6).fill(0).map((_,i) => (
  <SkeletonCard key={i} />
))

) : news.length === 0 ? (

<div className="text-center text-zinc-400 py-20">
No news available
</div>

) : (

news.map((item,i) => (

<div
key={i}
onClick={() => window.open(item.url,"_blank")}
className="
p-5
bg-white/5
border border-white/10
rounded-xl
hover:border-purple-500/40
hover:bg-white/10
hover:-translate-y-1
transition
cursor-pointer
"
>


<div className="flex items-center gap-2 mb-2 flex-wrap">

{isIndian(item) && (
<span className="
text-[10px]
border border-orange-500/30
text-orange-400
px-2 py-0.5
rounded-full
">
India
</span>
)}

{item.source && (
<span className="
text-[10px]
border border-white/10
text-zinc-400
px-2 py-0.5
rounded-full
">
{item.source}
</span>
)}

<span className="text-[10px] text-zinc-500 ml-auto">
{formatTime(item.datetime)}
</span>

</div>


<h3 className="
text-base
font-medium
text-zinc-200
leading-snug
hover:text-purple-300
transition
">
{item.headline}
</h3>


{item.summary && (
<p className="
text-sm
text-zinc-400
mt-2
leading-relaxed
line-clamp-2
">
{item.summary}
</p>
)}


<div className="flex items-center justify-between mt-4">

<span className="text-xs text-purple-400">
Read article
</span>

{item.image && (
<img
src={item.image}
alt=""
className="h-9 w-16 object-cover rounded opacity-70"
onError={e => e.target.style.display="none"}
/>
)}

</div>

</div>

))

)}

<div className="
pointer-events-none
absolute
bottom-0
left-0
w-full
h-20
bg-gradient-to-t
from-[#050505]
to-transparent
"/>

</div>

</motion.section>
  )
}

export default News