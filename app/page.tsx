"use client"

import { Button } from "@/components/ui/button"
import { MinutelyCharts } from "@/components/minutelyCharts"
import { HourlyCharts } from "@/components/hourlyCharts"
import { DailyCharts } from "@/components/dailyCharts"
import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ButtonGroup } from "@/components/ui/button-group"

export default function Page() {
  const [tab, setTab] = React.useState("minutely")
  return (
    <div className="md:w-[60%] mx-auto p-4">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
        <TabsList className="mb-4">
          <TabsTrigger value="minutely">Minutely</TabsTrigger>
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>
        {/* <TabsList className="mb-4">
          <Button variant="outline" size="sm" onClick={() => setTab("minutely")}>Host</Button>
        </TabsList> */}
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
    </div>
  )
}
