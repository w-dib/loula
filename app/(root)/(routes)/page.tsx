import Categories from "@/components/categories";
import { DatePicker } from "@/components/date-picker";
import SearchInput from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const categories = await prismadb.category.findMany();

  return (
    <main className="h-full p-4 space-y-2">
      <div className="flex justify-between items-center space-x-2">
        <div className="flex-1">
          <SearchInput />
        </div>
        <DatePicker />
      </div>
      <Categories data={categories} />
      <Separator />
    </main>
  );
}
