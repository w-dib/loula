import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function Sidebar() {
  return (
    <div className="h-full">
      <SignOutButton>
        <Button variant="secondary">Sign Out</Button>
      </SignOutButton>
    </div>
  );
}

export default Sidebar;
