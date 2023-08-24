import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Overview } from "./overview";

function BudgetTab() {
  return (
    <div className="h-full p-4 space-y-2">
      <div className="space-y-2 w-full col-span-2">
        <div>
          <h3 className="xs:text-base text-lg font-medium">
            Track your monthly budget here
          </h3>
          <p className="text-sm text-muted-foreground">
            See how much you&apos;re spending per category, and compare it to
            previous spends
          </p>
        </div>
        <Separator />
      </div>
      <div className="flex gap-4 flex-col max-w-3xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Budget for this month
            </CardTitle>
            <p className="text-xs text-muted-foreground">AED </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">10,000 / 20,000</div>
            <Progress value={50} />
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BudgetTab;
