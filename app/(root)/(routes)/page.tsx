import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";

import Categories from "@/components/categories";
import ExpenseCard from "@/components/expense-card";
import SearchInput from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
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
    <main className="h-full p-4 space-y-2">
      <div>
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses">
            <div>
              <SearchInput />
              <Categories data={categories} />
              <Separator />
              <ExpenseCard data={expenses} categoryMap={categoryMap} />
            </div>
          </TabsContent>
          <TabsContent value="budget">Change your budget here.</TabsContent>
        </Tabs>
        <Link href="/expense/new">
          <button className="fixed bottom-20 right-2 rounded-full bg-primary text-white p-4 shadow-lg block sm:hidden hover:opacity-75">
            <Plus />
          </button>
        </Link>
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
          <p className="text-primary text-lg text-center">
            <span className="text-primary font-bold text-lg">
              Total Amount: {""}
            </span>
            {totalAmount} AED
          </p>
        </div>
      </div>
    </main>
  );
}
