import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Poppins } from "next/font/google";
import MobileSidebar from "./mobile-sidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

function Navbar() {
  return (
    <header className="w-full fixed z-40 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/" className="hidden md:flex items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <h1
            className={`text-xl md:text-3xl font-bold text-primary ${font.className} bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent`}
          >
            Loula
          </h1>
        </Link>
      </div>
      <Link href="/" className="md:hidden">
        <Image src="/logo.svg" alt="logo" width={32} height={32} className="" />
      </Link>
      <div className="flex justify-between items-center z-50 gap-x-1">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default Navbar;
