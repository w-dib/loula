import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import Categories from "./categories";
import { DatePickerWithRange } from "./date-range";
import ExpenseCard from "./expense-card";
import SearchInput from "./search-input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { SlidersHorizontal } from "lucide-react";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function ExpensesTab({ searchParams }: RootPageProps) {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const categories = await prismadb.category.findMany();
  const expenses = await prismadb.expense.findMany({
    where: {
      categoryId: searchParams.categoryId,
      userId,
    },
  });

  const categoryMap: Record<string, string> = {};
  categories.forEach((category) => {
    categoryMap[category.id] = category.name;
  });

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-2 md:space-y-0 space-y-2">
        <div className="flex-1">
          <SearchInput />
        </div>
        <div className="flex justify-between items-center space-x-2">
          <DatePickerWithRange />
          <Button>
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <Categories data={categories} />
      <Separator />
      <ExpenseCard data={expenses} categoryMap={categoryMap} />
    </div>
  );
}
