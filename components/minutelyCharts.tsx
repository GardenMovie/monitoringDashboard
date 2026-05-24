"use client"
import { useEffect, useState } from "react"
import LineChartClient from "./singleLineChart"

export const description = "A multiple line chart"

type MetricPoint = { ts: number | null, value: number }
type MinutelyData = {
  cpu: MetricPoint[]
  ram: MetricPoint[]
  disk: MetricPoint[]
  ping: MetricPoint[]
}

export function MinutelyCharts() {
  const [chartData, setChartData] = useState<MinutelyData | null>(null)

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/charts/minutely?limit=60")
        .then(res => res.json())
        .then(setChartData)
    }
    fetchData()
    const interval = setInterval(fetchData, 60000) // 60,000 ms = 1 minute
    return () => clearInterval(interval)
  }, [])

  if (!chartData) return <div>Loading...</div>

  return (
    <>
      <div className="w-full h-full"><LineChartClient chartData={chartData.cpu} title="CPU Usage" color="var(--color-lime-500)"/></div>
      <div className="w-full h-full"><LineChartClient chartData={chartData.ram} title="RAM Usage" color="var(--color-amber-500)"/></div>
      <div className="w-full h-full"><LineChartClient chartData={chartData.ping} title="Ping" color="var(--color-cyan-500)"/></div>
      <div className="w-full h-full"><LineChartClient chartData={chartData.disk} title="Disk Usage" color="var(--color-emerald-500)"/></div>
    </>
  )
}
