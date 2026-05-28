import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

export default function TooMany429() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="">
        <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle className="text-red-500 text-center font-bold">429</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
            <CardDescription className="text-center ">
              You have hit the rate limit.<br />Please wait a minute and try again.
            </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
