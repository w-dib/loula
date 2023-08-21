import { Expense } from "@prisma/client";

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

interface ExpenseCardProps {
  data: Expense[];
  categoryMap: Record<string, string>;
}

function ExpenseCard({ data, categoryMap }: ExpenseCardProps) {
  console.log(categoryMap); // Log the categoryMap to the console

  return (
    <div className="mt-3 flex flex-col lg:flex-row gap-2">
      {data.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-primary">{item.name}</p>
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
                {categoryMap[item.categoryId]}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-lg">{item.amount} AED</p>
          </CardContent>
          <CardFooter className="text-xs flex justify-between">
            <div>
              <p>{item.date.toString()}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ExpenseCard;
