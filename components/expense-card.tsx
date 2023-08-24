"use client";

import { Expense } from "@prisma/client";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "./ui/loading";

interface ExpenseCardProps {
  data: Expense[];
  categoryMap: Record<string, string>;
}

function ExpenseCard({ data, categoryMap }: ExpenseCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const sortedData = data.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const router = useRouter();

  const onDelete = async (id: string) => {
    try {
      setIsDeleting(true);

      await axios.delete(`/api/expenses/${id}`);
      router.refresh();
      router.push("/");
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isDeleting ? (
        <div className="mx-auto">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="mt-3 flex flex-col lg:flex-row gap-2">
          {sortedData.map((item) => (
            <Card key={item.id} className="flex-1 flex-wrap">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex justify-between items-center">
                      <p className="text-primary">{item.name}</p>
                      <div className="flex space-x-2">
                        <Link
                          href={`/expense/${item.id}`}
                          className="text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer hover:text-primary hover:bg-primary/10 rounded-xl transition"
                        >
                          <Pencil className="w-5 h-5" />
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger className="text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer hover:text-destructive hover:bg-destructive/10 rounded-xl transition">
                            <Trash className="w-5 h-5" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete this expense and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive"
                                onClick={() => onDelete(item.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      `
    flex
    items-center
    text-cener
    text-xs
    md:text-sm
    px-2
    md:px-4
    py-2
    md:py-3
    rounded-xl
    bg-primary/10
    hover:opacity-75
    transition
    w-min
    `
                    )}
                  >
                    {categoryMap[item.categoryId]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-primary text-lg">{item.amount} AED</p>
                </CardContent>
                <CardFooter className="text-xs flex justify-between">
                  <p>{formatDate(item.date.toString())}</p>
                </CardFooter>
              </Card>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default ExpenseCard;
