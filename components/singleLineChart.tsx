"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type Item = { ts?: number | null; value: number }

const chartConfig = {
  value: {
    label: "Metric",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function SingleLineChart({ chartData, title = "Metric Usage", description = "Metric over time", color }: {
  chartData: Item[],
  title?: string,
  description?: string,
  color?: string // Accepts Tailwind class or CSS color value
}) {
  const data = (chartData ?? [])
    .map((d) => ({ ts: typeof d.ts === "number" ? d.ts : d.ts ? new Date(d.ts).getTime() : null, value: d.value }))
    .filter((d) => d.ts != null)
    .sort((a, b) => (a.ts as number) - (b.ts as number))
  // Use provided color or fallback to config
  const lineColor = color || chartConfig.value.color
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
                dataKey="value"
                type="monotone"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
