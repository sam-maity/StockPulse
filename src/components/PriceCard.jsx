import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function PriceCard({ data }) {
  const chartRef = useRef();

  const [period, setPeriod] = useState("3mo");
  const [history, setHistory] = useState([]);

  async function loadHistory(p) {
    const res = await fetch(
      `http://localhost:8000/history?symbol=${data.ticker}&period=${p}`,
    );

    const d = await res.json();

    setHistory(d);
  }

  useEffect(() => {
    if (!data) return;

    loadHistory(period);
  }, [period, data]);

  useEffect(() => {
    if (!history.length) return;

    chartRef.current.innerHTML = "";

    const chart = createChart(chartRef.current, {
      height: 320,

      layout: {
        background: { color: "transparent" },
        textColor: "#9ca3af",
      },

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },

      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
    });

    const series = chart.addLineSeries({
      color: "#22c55e",
      lineWidth: 2,
    });

    series.setData(history);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [history]);
const currency = data.ticker.includes(".NS") || data.ticker.includes(".BO") ? "₹" : "$"
  return (
    <div className="card-cyber p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h2 className="text-xl font-bold">{data.ticker}</h2>
            <p className="text-green-400 text-lg">{currency}{data.price}</p>
        </div>
      </div>

      {/* RANGE BUTTONS */}

      <div className="flex gap-2 mb-4 text-xs">
        <button
          onClick={() => setPeriod("1d")}
          className="px-2 py-1 bg-zinc-800 rounded"
        >
          1D
        </button>

        <button
          onClick={() => setPeriod("5d")}
          className="px-2 py-1 bg-zinc-800 rounded"
        >
          5D
        </button>

        <button
          onClick={() => setPeriod("1mo")}
          className="px-2 py-1 bg-zinc-800 rounded"
        >
          1M
        </button>

        <button
          onClick={() => setPeriod("3mo")}
          className="px-2 py-1 bg-zinc-800 rounded"
        >
          3M
        </button>

        <button
          onClick={() => setPeriod("1y")}
          className="px-2 py-1 bg-zinc-800 rounded"
        >
          1Y
        </button>

        <button
          onClick={() => setPeriod("5y")}
          className="px-2 py-1 bg-zinc-800 rounded"
        >
          5Y
        </button>

        <button
          onClick={() => setPeriod("max")}
          className="px-2 py-1 bg-zinc-800 rounded"
        >
          MAX
        </button>
      </div>

      {/* CHART */}

      <div ref={chartRef} style={{ height: "320px", width: "100%" }} />
    </div>
  );
}