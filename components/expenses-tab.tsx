import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import Categories from "./categories";
import { DatePickerWithRange } from "./date-range";
import ExpenseCard from "./expense-card";
import SearchInput from "./search-input";
import { Separator } from "./ui/separator";

export default async function ExpensesTab() {
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
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0 space-y-2">
        <div className="flex-1 md:mr-5">
          <SearchInput />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs md:mr-2 pl-2 md:pl-0">Date:</span>
          <DatePickerWithRange />
        </div>
      </div>
      <Categories data={categories} />
      <Separator />
      <ExpenseCard data={expenses} categoryMap={categoryMap} />
    </div>
  );
}
