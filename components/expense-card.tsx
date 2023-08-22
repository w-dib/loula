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
import Link from "next/link";

interface ExpenseCardProps {
  data: Expense[];
  categoryMap: Record<string, string>;
}

function ExpenseCard({ data, categoryMap }: ExpenseCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const sortedData = data.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="mt-3 flex flex-col lg:flex-row gap-2">
      {sortedData.map((item) => (
        <Card key={item.id} className="flex-1 flex-wrap">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <p className="text-primary">{item.name}</p>
                <div className="flex space-x-2">
                  <div className="text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer hover:text-primary hover:bg-primary/10 rounded-xl transition">
                    <Link href={`/expense/${item.id}`}>
                      <Pencil className="w-5 h-5" />
                    </Link>
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
            <p>{formatDate(item.date.toString())}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ExpenseCard;
