import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";

function ExpenseCard() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-primary">Long text Long text</p>
              </div>
              <div className="flex space-x-2">
                <div className="text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer hover:text-primary hover:bg-primary/10 rounded-xl transition">
                  <Pencil className="w-5 h-5" />
                </div>
                <div className="text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer hover:text-destructive hover:bg-destructive/10 rounded-xl transition">
                  <Trash className="w-5 h-5" />
                </div>
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div
              className={cn(
                `
      flex
      items-center
      text-cener
      text-xs
      md:text-sm
      px-2
      md:px-4
      py-2
      md:py-3
      rounded-xl
      bg-primary/10
      hover:opacity-75
      transition
      w-min
      `
              )}
            >
              Transportation
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-primary">230 AED</p>
        </CardContent>
        <CardFooter className="text-xs flex justify-between">
          <div>
            <p>18th August 2023</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ExpenseCard;
