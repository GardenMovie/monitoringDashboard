import { Button } from "@/components/ui/button"
import { MinutelyCharts } from "@/components/minutelyCharts"
import { HourlyCharts } from "@/components/hourlyCharts"
import { DailyCharts } from "@/components/dailyCharts"
export default function Page() {
  return (
    <>
      <div className="w-[80%] min-h-[25vh] mx-auto grid grid-cols-2 grid-rows-2 gap-4 p-4">
        <MinutelyCharts />
      </div>
      <div className="w-[80%] min-h-[25vh] mx-auto grid grid-cols-2 grid-rows-2 gap-4 p-4">
        <HourlyCharts />
      </div>
      <div className="w-[80%] min-h-[25vh] mx-auto grid grid-cols-2 grid-rows-2 gap-4 p-4">
        <DailyCharts />
      </div>
    </>
  )
}
