"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  totalBudget: z.coerce.number().min(0.01, {
    message: "Amount must be greater than 0.",
  }),
});

function BudgetTab() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalBudget: 0,
    },
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          //todo add an onSubmit
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="xs:text-base text-lg font-medium">
                Set your monthly budget
              </h3>
              <p className="text-sm text-muted-foreground">
                Track your spend per category, and update it as you go.
              </p>
            </div>
            <Separator />
          </div>
          <div className="flex gap-4 md:justify-left justify-center flex-col">
            <FormField
              name="totalBudget"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Details</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="What did you buy?"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Describe what you paid for</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default BudgetTab;
