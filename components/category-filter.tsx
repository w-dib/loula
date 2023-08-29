"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownWideNarrow } from "lucide-react";

// interface CategoryFilterProps {
//   position: string; // Add a position prop
//   setPosition: (position: string) => void; // Add a callback function prop
// }

export function CategoryFilter() {
// {
//     /// help here
//  }: CategoryFilterProps
  const [position, setPosition] = React.useState("desc");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="flex space-x-2">
          <span className="text-xs">Sort</span>
          <ArrowDownWideNarrow className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort Expenses By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="desc">
            Newest (default)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="asc">Oldest</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
