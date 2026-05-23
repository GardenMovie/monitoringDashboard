import { NextResponse } from "next/server"
import { getClient } from "@/lib/mongodb"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get("limit") || "24", 10)
  const client = await getClient()
  const db = client.db("Metrics")
  const coll = db.collection("hardwareHour")
  const docs = await coll.find({"metadata.hostname": "heweyDeb"}).sort({ timestamp: -1 }).limit(limit).toArray()

  const result = docs.map((d: any) => {
    const ts = d.timestamp
    const avgCpu = Number(d.fields?.avgCpu ?? 0)
    const maxCpu = Number(d.fields?.maxCpu ?? 0)
    const minCpu = Number(d.fields?.minCpu ?? 0)
    const avgRam = Number(d.fields?.avgRam ?? 0)
    const maxRam = Number(d.fields?.maxRam ?? 0)
    const minRam = Number(d.fields?.minRam ?? 0)
    const avgPing = Number(d.fields?.avgPing ?? 0)
    const maxPing = Number(d.fields?.maxPing ?? 0)
    const disk = Number(d.fields?.storageSpace ?? 0)

    return {
      ts,
      avgCpu,
      maxCpu,
      minCpu,
      avgRam,
      maxRam,
      minRam,
      disk,
      avgPing,
      maxPing
    }
  })
  return NextResponse.json(result)
}
