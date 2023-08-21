import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import Categories from "@/components/categories";
import ExpenseCard from "@/components/expense-card";
import SearchInput from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      </div>
    </main>
  );
}
