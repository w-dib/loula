import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { name, amount, date, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (!name || !amount || !date || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const expenses = await prismadb.expense.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        name,
        amount,
        date,
        categoryId,
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.log("error");
    return new NextResponse("error", { status: 500 });
  }
}
