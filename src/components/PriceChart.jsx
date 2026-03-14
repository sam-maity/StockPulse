import { createChart } from "lightweight-charts"
import { useEffect, useRef } from "react"

export default function PriceChart({ history }) {

  const chartRef = useRef()

  useEffect(() => {

    if (!history || history.length === 0) return

    chartRef.current.innerHTML = ""

    const chart = createChart(chartRef.current, {
      height: 300,

      layout: {
        background: { color: "transparent" },
        textColor: "#9ca3af"
      },

      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" }
      },

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightBarStaysOnScroll: true
      }
    })

    const series = chart.addLineSeries({
      color: "#22c55e",
      lineWidth: 2
    })

    series.setData(history)

    chart.timeScale().fitContent()

    return () => chart.remove()

  }, [history])

  return (
    <div
      ref={chartRef}
      style={{ height: "300px", width: "100%" }}
    />
  )
}