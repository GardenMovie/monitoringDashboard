"use client"

import { Button } from "@/components/ui/button"
import { MinutelyCharts } from "@/components/minutelyCharts"
import { HourlyCharts } from "@/components/hourlyCharts"
import { DailyCharts } from "@/components/dailyCharts"
import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Page() {
  const [tab, setTab] = React.useState("minutely")
  return (
    <div className="w-[60%] mx-auto p-4">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="minutely">Minutely</TabsTrigger>
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>
        <TabsContent value="minutely">
          <div className="min-h-[25vh] flex flex-col gap-4">
            <MinutelyCharts />
          </div>
        </TabsContent>
        <TabsContent value="hourly">
          <div className="min-h-[25vh] grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
            <HourlyCharts />
          </div>
        </TabsContent>
        <TabsContent value="daily">
          <div className="min-h-[25vh] grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
            <DailyCharts />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
