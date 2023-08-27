"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calculator } from "lucide-react";

const profileFormSchema = z.object({
  partner: z.string().optional(),
  totalBudget: z.coerce.number().min(0.01, {
    message: "Amount must be greater than 0.",
  }),
  groceriesBudget: z.coerce.number().min(0.0, {
    message: "Please enter a valid number.",
  }),
  transportationBudget: z.coerce.number().min(0.0, {
    message: "Please enter a valid number.",
  }),
  entertainmentBudget: z.coerce.number().min(0.0, {
    message: "Please enter a valid number.",
  }),
  personalBudget: z.coerce.number().min(0.0, {
    message: "Please enter a valid number.",
  }),
  billsBudget: z.coerce.number().min(0.0, {
    message: "Please enter a valid number.",
  }),
  miscBudget: z.coerce.number().min(0.0, {
    message: "Please enter a valid number.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const categorySum =
    (Number(form.watch("groceriesBudget")) || 0) +
    (Number(form.watch("transportationBudget")) || 0) +
    (Number(form.watch("entertainmentBudget")) || 0) +
    (Number(form.watch("personalBudget")) || 0) +
    (Number(form.watch("billsBudget")) || 0) +
    (Number(form.watch("miscBudget")) || 0);

  const totalBudgetSum = Number(form.watch("totalBudget"));

  const budgetDifference = categorySum / totalBudgetSum;

  return (
    <div className="h-min-full p-4 space-y-2 max-w-3xl mx-auto mb-20">
      <div className="space-y-2 w-full mb-8">
        <div>
          <h3 className="xs:text-base text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Update your monthly budget, add a partner, and change other settings
            here.
          </p>
        </div>
        <Separator />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="partner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partner&apos;s Email</FormLabel>
                <FormControl>
                  <Input placeholder="wdanieldib@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Make sure you add your partner with the email they use for
                  Loula&apos;s expenses.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            name="totalBudget"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total monthly budget</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={20000}
                    type="number"
                    placeholder="20,000 AED"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  How much do you wish to spend per month?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            <FormField
              name="groceriesBudget"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Groceries budget</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2,000 AED" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="transportationBudget"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transportation budget</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1,000 AED" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="entertainmentBudget"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entertainment budget</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1,000 AED" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="personalBudget"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal budget</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1,000 AED" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="billsBudget"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bills budget</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1,000 AED" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="miscBudget"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miscellaneous budget</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1,000 AED" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!isNaN(totalBudgetSum && categorySum) && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Category Sum / Total Budget
                </CardTitle>
                <Calculator />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">
                  {categorySum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  /{" "}
                  {totalBudgetSum
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  AED
                </div>
                <Progress value={budgetDifference * 100} />
                <p className="text-xs text-muted-foreground">
                  {(budgetDifference * 100).toFixed(0)}%
                </p>
              </CardContent>
            </Card>
          )}

          <Button type="submit">Update settings</Button>
        </form>
      </Form>
    </div>
  );
}
