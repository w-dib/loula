import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

function Navbar() {
  return (
    <header className="w-full fixed z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div>
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
        </Link>
      </div>
      <div>
        {/* <ModeToggle /> */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default Navbar;
