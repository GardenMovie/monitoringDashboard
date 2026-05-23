"use client"
import { useEffect, useState } from "react"
import LineChartClient from "./multiLineChart"

export const description = "A multiple line chart for daily data"

type MetricPoint = {
  ts: number | null;
  avg: number;
  min?: number | null;
  max?: number | null;
};
type DailyData = {
  cpu: MetricPoint[];
  ram: MetricPoint[];
  disk: MetricPoint[];
  ping: MetricPoint[];
  };

export function DailyCharts() {
  const [chartData, setChartData] = useState<DailyData | null>(null)

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/charts/daily?limit=30")
        .then(res => res.json())
        .then((data) => {
          // Transform the array of objects into arrays for each metric
          const metrics: DailyData = {
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
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  if (!chartData) return <div>Loading...</div>

  return (
    <>
      <div className="w-full h-full"><LineChartClient chartData={chartData.cpu} title="Avg CPU Usage (Hourly)" /></div>
      <div className="w-full h-full"><LineChartClient chartData={chartData.ram} title="Avg RAM Usage (Hourly)" /></div>
      <div className="w-full h-full"><LineChartClient chartData={chartData.disk} title="Disk Usage (Hourly)" /></div>
      <div className="w-full h-full"><LineChartClient chartData={chartData.ping} title="Avg Ping (Hourly)" /></div>
    </>
  )
}
