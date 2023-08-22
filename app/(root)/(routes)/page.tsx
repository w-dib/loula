import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";

import Categories from "@/components/categories";
import ExpenseCard from "@/components/expense-card";
import SearchInput from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import { DatePickerWithRange } from "@/components/date-range";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const categories = await prismadb.category.findMany();
  const expenses = await prismadb.expense.findMany({
    where: {
      userId,
    },
  });

  const categoryMap: Record<string, string> = {};
  categories.forEach((category) => {
    categoryMap[category.id] = category.name;
  });

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <main className="relative min-h-screen p-4">
      <div className="mb-14">
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0 space-y-2">
              <div className="flex-1 md:mr-5">
                <SearchInput />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs md:mr-2 pl-2 md:pl-0">
                  Filter by date:
                </span>
                <DatePickerWithRange />
              </div>
            </div>
            <Categories data={categories} />
            <Separator />
            <ExpenseCard data={expenses} categoryMap={categoryMap} />
          </TabsContent>
          <TabsContent value="budget">Change your budget here.</TabsContent>
        </Tabs>
        <Link href="/expense/new">
          <button className="fixed bottom-20 right-2 rounded-full bg-primary text-white p-4 shadow-lg block sm:hidden hover:opacity-75">
            <Plus />
          </button>
        </Link>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg z-20">
        <p className="text-primary text-lg text-center">
          <span className="text-primary font-bold text-lg">
            Total Spent: {""}
          </span>
          {totalAmount} AED
        </p>
      </div>
    </main>
  );
}
