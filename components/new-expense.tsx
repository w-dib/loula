"use client";

import { Category, Expense } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Separator } from "./ui/separator";

interface ExpenseFormProps {
  initialData: Expense | null;
  categories: Category[];
}

function NewExpense({ initialData, categories }: ExpenseFormProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="submit">Add Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new expense</DialogTitle>
            <DialogDescription>
              Type the details of the expense and the amount you spent.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-w-full">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenseName" className="text-left">
                Name
              </Label>
              <Input id="expenseName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenseValue" className="text-left">
                Amount
              </Label>
              <Input
                id="expenseValue"
                defaultValue="$"
                className="col-span-3"
              />
            </div>
            <Separator />
            <div className="grid grid-cols-2 w-full">
              <DatePicker />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between rounded-r-xl"
                  >
                    {value
                      ? categories.find((item) => item.id === value)?.name
                      : "Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search categories..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={(currentValue) => {
                            console.log("Clicked on item:", item.name);
                            console.log("value:", value);
                            console.log("Current value:", currentValue);
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === item.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewExpense;
