import Categories from "@/components/categories";
import ExpenseCard from "@/components/expense-card";
import SearchInput from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const categories = await prismadb.category.findMany();

  return (
    <main className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Separator />
      <ExpenseCard />
    </main>
  );
}
