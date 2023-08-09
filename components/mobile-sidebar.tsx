import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
