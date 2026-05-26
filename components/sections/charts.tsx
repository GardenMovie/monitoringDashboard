import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MinutelyCharts } from "@/components/minutelyCharts"
import { HourlyCharts } from "@/components/hourlyCharts"
import { DailyCharts } from "@/components/dailyCharts"
import * as React from "react"

export function ChartsSection() {
  const [tab, setTab] = React.useState("minutely")
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <div>
        <TabsList className="w-full min-h-[64px] mb-3.5">
          <TabsTrigger value="minutely" className="flex-1 text-lg py-3">Minutely</TabsTrigger>
          <TabsTrigger value="hourly" className="flex-1 text-lg py-3">Hourly</TabsTrigger>
          <TabsTrigger value="daily" className="flex-1 text-lg py-3">Daily</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="minutely">
        <div className="min-h-[25vh] flex flex-col gap-4">
          <MinutelyCharts />
        </div>
      </TabsContent>
      <TabsContent value="hourly">
        <div className="min-h-[25vh] flex flex-col gap-4">
          <HourlyCharts />
        </div>
      </TabsContent>
      <TabsContent value="daily">
        <div className="min-h-[25vh] flex flex-col gap-4">
          <DailyCharts />
        </div>
      </TabsContent>
    </Tabs>
  )
}
