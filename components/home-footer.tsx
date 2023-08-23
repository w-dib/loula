import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

export default async function HomeFooter() {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const expenses = await prismadb.expense.findMany({
    where: {
      userId,
    },
  });

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg z-20">
      <p className="text-primary text-lg text-center">
        <span className="text-primary font-bold text-lg">
          Total Spent: {""}
        </span>
        {totalAmount} AED
      </p>
    </div>
  );
}
