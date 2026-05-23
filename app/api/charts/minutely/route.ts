import { NextResponse } from "next/server"
import { getClient } from "@/lib/mongodb"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get("limit") || "60", 10)
  const client = await getClient()
  const db = client.db("Metrics")
  const coll = db.collection("hardwareMin")
  const docs = await coll.find({"metadata.hostname": "heweyDeb"}).sort({ timestamp: -1 }).limit(limit).toArray()

  // Prepare 4 arrays for each metric
  type MetricPoint = { ts: number | null, value: number }
  const cpu: MetricPoint[] = []
  const ram: MetricPoint[] = []
  const disk: MetricPoint[] = []
  const ping: MetricPoint[] = []

  docs.forEach((d: any) => {
    const ts = d.timestamp
    cpu.push({ ts, value: Number(d.fields?.cpu_percent ?? 0) })
    ram.push({ ts, value: Number(d.fields?.ram_percent ?? 0) })
    disk.push({ ts, value: Number(d.fields?.disk_percent ?? 0) })
    ping.push({ ts, value: Number(d.fields?.ping_ms ?? 0) })
  })

  return NextResponse.json({ cpu, ram, disk, ping })
}
