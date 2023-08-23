import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import HomeFooter from "@/components/home-footer";
import ExpensesTab from "@/components/expenses-tab";

export default async function Home() {
  return (
    <main className="relative min-h-screen p-4">
      <div className="mb-14">
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="space-y-2">
            <ExpensesTab />
          </TabsContent>
          <TabsContent value="budget">Change your budget here.</TabsContent>
        </Tabs>
        <Link
          href="/expense/new"
          className="fixed bottom-20 right-2 rounded-full bg-primary text-white p-4 shadow-lg block sm:hidden hover:opacity-75"
        >
          <Plus />
        </Link>
      </div>
      <HomeFooter />
    </main>
  );
}
