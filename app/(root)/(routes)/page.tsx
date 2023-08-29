import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import HomeFooter from "@/components/home-footer";
import ExpensesTab from "@/components/expenses-tab";
import BudgetTab from "@/components/budget-tab";

export default async function Home() {
  return (
    <main className="relative p-4 h-full max-w-5xl mx-auto">
      <div className="mb-14 h-full">
        <Tabs defaultValue="expenses" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="space-y-2 h-full">
            <ExpensesTab />
          </TabsContent>
          <TabsContent value="budget">
            <BudgetTab />
          </TabsContent>
        </Tabs>
        <Link
          href="/expense/new"
          className="fixed bottom-20 right-2 rounded-full bg-primary text-white p-4 shadow-lg block sm:hidden hover:opacity-75"
        >
          <Plus />
        </Link>
      </div>
      {/* <HomeFooter /> */}
    </main>
  );
}
