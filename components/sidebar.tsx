"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Home, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
    },
    {
      icon: Plus,
      href: "/add",
      label: "Add",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ];

  const onNavigate = (url: string) => {
    router.push(url);
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathName === route.href && "text-primary bg-primary/10"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
