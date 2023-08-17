"use client";

import { Category, Expense } from "@prisma/client";
import * as z from "zod";
import axios from "axios";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { ImageUpload } from "@/components/image-upload";
// import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { Check, ChevronsUpDown, Wand2 } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePicker } from "./date-picker";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  amount: z.coerce.number().min(0.01, {
    message: "Amount must be greater than 0.",
  }),
  date: z.date().min(new Date(2000, 1, 1), {
    message: "Date must be after 2000.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

interface ExpenseFormProps {
  initialData: Expense | null;
  categories: Category[];
}

function NewExpense({ initialData, categories }: ExpenseFormProps) {
  // const { toast } = useToast();
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      amount: 0,
      date: new Date(),
      categoryId: "",
    },
  });

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // try {
    //   if (initialData) {
    //     await axios.patch(`/api/expenses/${initialData.id}`, values);
    //   } else {
    //     await axios.post("/api/expenses", values);
    //   }
    // } catch (error) {
    // toast({
    //   variant: "destructive",
    //   description: "Something went wrong.",
    //   duration: 3000,
    // });
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="xs:text-base text-lg font-medium">New expense</h3>
              <p className="text-sm text-muted-foreground">
                Type the details of the expense and the amount you spent.
              </p>
            </div>
            <Separator />
          </div>
          <div className="flex lg:flex-row gap-4 md:justify-left justify-center flex-col">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" ">
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
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount in AED</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="1,000 AED"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>How much did you pay </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your expense
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker />
                  </FormControl>
                  <FormDescription>When did you buy this</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="bg-primary/10" />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your expense" : "Submit your expense"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

//   return (
//     <div className="flex flex-col items-center">
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button type="submit">Add Expense</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add new expense</DialogTitle>
//             <DialogDescription>
//               Type the details of the expense and the amount you spent.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4 max-w-full">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="expenseName" className="text-left">
//                 Name
//               </Label>
//               <Input id="expenseName" className="col-span-3" />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="expenseValue" className="text-left">
//                 Amount
//               </Label>
//               <Input
//                 id="expenseValue"
//                 defaultValue="$"
//                 className="col-span-3"
//               />
//             </div>
//             <Separator />
//             <div className="grid grid-cols-2 w-full">
//               <DatePicker />
//               <Popover open={open} onOpenChange={setOpen}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     aria-expanded={open}
//                     className=" justify-between rounded-r-xl"
//                   >
//                     {value
//                       ? categories.find((item) => item.name === value)?.name
//                       : "Category"}
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="p-0">
//                   <Command>
//                     <CommandInput placeholder="Search categories..." />
//                     <CommandEmpty>No category found.</CommandEmpty>
//                     <CommandGroup>
//                       {categories.map((item) => (
//                         <CommandItem
//                           key={item.id}
//                           onSelect={() => {
//                             setValue(item.name);
//                             setOpen(false);
//                           }}
//                         >
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               value === item.id ? "opacity-100" : "opacity-0"
//                             )}
//                           />
//                           {item.name}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

export default NewExpense;
