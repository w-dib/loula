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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  totalBudget: z.coerce.number().min(0.01, {
    message: "Amount must be greater than 0.",
  }),
});

function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalBudget: 0,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const toast = useToast();

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          //todo add an onSubmit
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-8 pb-10"
        >
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
        </form>
      </Form>
    </div>
  );
}

export default Home;
