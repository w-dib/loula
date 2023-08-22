import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { expenseId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { name, amount, date, categoryId } = body;

    if (!params.expenseId) {
      return new NextResponse("Missing expenseId", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (!name || !amount || !date || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const expense = await prismadb.expense.update({
      where: {
        id: params.expenseId,
        userId: user.id,
      },
      data: {
        userId: user.id,
        userName: user.firstName,
        name,
        amount,
        date,
        categoryId,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log(error);
    return new NextResponse("error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { expenseId: string } }
) {
  try {
    const user = await currentUser();

    if (!params.expenseId) {
      return new NextResponse("Missing expenseId", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const expense = await prismadb.expense.delete({
      where: {
        id: params.expenseId,
        userId: user.id,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log(error);
    return new NextResponse("error", { status: 500 });
  }
}
