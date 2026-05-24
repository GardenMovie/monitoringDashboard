"use client"
import { useEffect, useState } from "react"
import LineChartClient from "./multiLineChart"

export const description = "A multiple line chart for hourly data"

type MetricPoint = {
  ts: number | null;
  avg: number;
  min?: number | null;
  max?: number | null;
};
type HourlyData = {
  cpu: MetricPoint[];
  ram: MetricPoint[];
  disk: MetricPoint[];
  ping: MetricPoint[];
};

export function HourlyCharts() {
  const [chartData, setChartData] = useState<HourlyData | null>(null)

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/charts/hourly?limit=24")
        .then(res => res.json())
        .then((data) => {
          // Transform the array of objects into arrays for each metric
          const metrics: HourlyData = {
            cpu: [],
            ram: [],
            disk: [],
            ping: []
          }
          data.reverse().forEach((d: any) => {
            metrics.cpu.push({ ts: d.ts, avg: d.avgCpu, min: d.minCpu ?? undefined, max: d.maxCpu ?? undefined })
            metrics.ram.push({ ts: d.ts, avg: d.avgRam, min: d.minRam ?? undefined, max: d.maxRam ?? undefined })
            metrics.disk.push({ ts: d.ts, avg: d.disk, min: d.minDisk ?? undefined, max: d.maxDisk ?? undefined })
            metrics.ping.push({ ts: d.ts, avg: d.avgPing, min: d.minPing ?? undefined, max: d.maxPing ?? undefined })
          })
          setChartData(metrics)
        })
    }
    fetchData()
    const interval = setInterval(fetchData, 60000 * 60)
    return () => clearInterval(interval)
  }, [])

  if (!chartData) return <div>Loading...</div>

  return (
    <>
      <div className="w-full h-full"><LineChartClient 
        chartData={chartData.cpu} 
        title="CPU Usage (%)" 
        colors={{ avg: "var(--color-lime-500)", min: "var(--color-lime-300)", max: "var(--color-lime-700)" }} /></div>
      <div 
        className="w-full h-full"><LineChartClient 
        chartData={chartData.ram} 
        title="RAM Usage (%)" 
        colors={{ avg: "var(--color-amber-500", min: "var(--color-amber-300", max: "var(--color-amber-700)" }} /></div>
      <div 
        className="w-full h-full"><LineChartClient 
        chartData={chartData.disk} 
        title="Disk Usage (%)" 
        colors={{ avg: "var(--color-emerald-500", min: "var(--color-emerald-300", max: "var(--color-emerald-700)" }} /></div>
      <div 
        className="w-full h-full"><LineChartClient 
        chartData={chartData.ping} 
        title="Ping (ms)"
        colors={{ avg: "var(--color-cyan-500", min: "var(--color-cyan-300", max: "var(--color-cyan-700)" }} /></div>
    </>
  )
}
