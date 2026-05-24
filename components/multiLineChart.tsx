"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type MetricPoint = {
  ts: number | null;
  avg: number;
  min?: number | null;
  max?: number | null;
}

const chartConfig = {
  avg: {
    label: "This",
    color: "var(--chart-1)",
  },
  min: {
    label: "Min",
    color: "var(--chart-2)",
  },
  max: {
    label: "Max",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export default function MultiLineChart({ chartData, title = "Metric Usage", description = "Metric over time", colors = {} }: {
  chartData: MetricPoint[],
  title?: string,
  description?: string,
  colors?: { avg?: string, min?: string, max?: string }
}) {
  const data = (chartData ?? [])
    .map((d) => ({
      ts: typeof d.ts === "number" ? d.ts : d.ts ? new Date(d.ts).getTime() : null,
      avg: d.avg,
      min: d.min,
      max: d.max,
    }))
    .filter((d) => d.ts != null)
    .sort((a, b) => (a.ts as number) - (b.ts as number))

  // Check if min/max exist in any data point
  const hasMin = data.some(d => d.min !== undefined && d.min !== null)
  const hasMax = data.some(d => d.max !== undefined && d.max !== null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="ts"
                type="number"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(t) => new Date(Number(t)).toLocaleTimeString()}
                minTickGap={12}
              />
              <YAxis
                domain={[
                  0,
                  (dataMax: number) => dataMax > 100 ? Number((dataMax * 1.2).toFixed(2)) : 100,
                ]}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent
                  labelKey="ts"
                  labelFormatter={(_, payload) => {
                    let ts = payload && payload[0] && payload[0].payload && payload[0].payload.ts;
                    ts = Number(ts);
                    return !isNaN(ts) && ts > 0
                      ? new Date(ts).toLocaleString()
                      : String(ts);
                  }}
                />}
              />
              <Line
                dataKey="avg"
                type="monotone"
                stroke={colors.avg || chartConfig.avg.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                name="Avg"
              />
              {hasMin && (
                <Line
                  dataKey="min"
                  type="monotone"
                  stroke={colors.min || chartConfig.min.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  name="Min"
                />
              )}
              {hasMax && (
                <Line
                  dataKey="max"
                  type="monotone"
                  stroke={colors.max || chartConfig.max.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  name="Max"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
