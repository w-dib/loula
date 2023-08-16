import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import NewExpense from "@/components/new-expense";

interface HomeProps {
  params: {
    expenseId: string;
  };
}

export default async function expenseIdPage({ params }: HomeProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const expense = await prismadb.expense.findUnique({
    where: {
      id: params.expenseId,
      // userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <main className="h-full p-4 space-y-2">
      <NewExpense categories={categories} initialData={expense} />
    </main>
  );
}
