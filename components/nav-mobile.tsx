"use client";

import Link from "next/link";
import { LuMenu } from "react-icons/lu";

import { NavItemsData } from "@/data/nav-data";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NavMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="ghost" size="icon">
          <LuMenu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Bem vindo</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
          {NavItemsData.map((item) => (
            <Link
              href={item.url}
              key={item.name}
              className="flex flex-col py-2 text-sm text-muted-foreground"
            >
              {item.name}
            </Link>
          ))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
