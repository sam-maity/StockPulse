import { createChart } from "lightweight-charts"
import { useEffect, useRef } from "react"

export default function PriceChart({ history, isPos }) {
  const chartRef      = useRef()
  const chartInstance = useRef()
  const seriesRef     = useRef()

  const lineColor   = isPos ? "#22c55e" : "#ef4444"
  const topColor    = isPos ? "rgba(34,197,94,0.3)"  : "rgba(239,68,68,0.3)"
  const bottomColor = isPos ? "rgba(34,197,94,0.0)"  : "rgba(239,68,68,0.0)"

  useEffect(() => {
    if (!chartRef.current) return

    chartInstance.current = createChart(chartRef.current, {
      height: 280,
      layout: {
        background: { color: "transparent" },
        textColor: "#9ca3af",
      },

      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      crosshair: {
        vertLine: { color: "rgba(139,92,246,0.5)" },
        horzLine: { color: "rgba(139,92,246,0.5)" },
      },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.1)" },
      timeScale: {
        borderColor: "rgba(255,255,255,0.1)",
        timeVisible: true,
        secondsVisible: false,
      },
    })

    seriesRef.current = chartInstance.current.addAreaSeries({
      lineColor,
      topColor,
      bottomColor,
      lineWidth: 2,
    })

    const ro = new ResizeObserver(() => {
      if (chartRef.current && chartInstance.current) {
        chartInstance.current.applyOptions({ width: chartRef.current.clientWidth })
      }
    })
    ro.observe(chartRef.current)

    return () => {
      ro.disconnect()
      chartInstance.current?.remove()
    }
  }, [])
  useEffect(() => {
    if (!seriesRef.current) return
    seriesRef.current.applyOptions({ lineColor, topColor, bottomColor })
  }, [isPos])
  useEffect(() => {
    if (!seriesRef.current || !history?.length) return
    const sorted = [...history].sort((a, b) => (a.time > b.time ? 1 : -1))
    seriesRef.current.setData(sorted)
    chartInstance.current?.timeScale().fitContent()
  }, [history])

  return <div ref={chartRef} className="w-full" />
}