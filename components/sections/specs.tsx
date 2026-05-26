import { Monitor, MemoryStick, HardDrive } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Specs() {
  return (
    <Card className="w-full mb-6">
      <CardContent className="flex justify-between items-center py-6">
        <div className="flex flex-col items-center flex-1">
          <Monitor className="w-8 h-8 mb-1 text-blue-600" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">heweyDeb</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <MemoryStick className="w-8 h-8 mb-1 text-amber-500" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">4GB</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <HardDrive className="w-8 h-8 mb-1 text-emerald-600" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">2TB</span>
        </div>
      </CardContent>
    </Card>
  )
}
