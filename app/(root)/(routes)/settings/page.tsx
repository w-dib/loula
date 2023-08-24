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

import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const categoryBudgetSchema = z.object({
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

const profileFormSchema = z.object({
  partner: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(100, {
      message: "Email must not be longer than 100 characters.",
    }),
  totalBudget: z.coerce.number().min(0.01, {
    message: "Amount must be greater than 0.",
  }),
  categoryBudgets: z.array(categoryBudgetSchema),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      variant: "default",
      description: "Updated successfully!",
      duration: 3000,
    });
  }

  const categoryNames = [
    "Groceries",
    "Transportation",
    "Entertainment",
    "Personal",
    "Bills",
    "Misceallaneous",
  ];

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
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
                  <Input type="number" placeholder="20,000 AED" {...field} />
                </FormControl>
                <FormDescription>
                  How much do you wish to spend per month?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {categoryNames.map((categoryName) => (
            <FormField
              key={categoryName}
              name={`categoryBudgets.${categoryName}`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{categoryName}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00 AED" {...field} />
                  </FormControl>
                  <FormDescription>
                    {/* Add description for this category if needed */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Update settings</Button>
        </form>
      </Form>
    </div>
  );
}
