"use client";

import Link from "next/link";
import { LuMenu } from "react-icons/lu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItemsData } from "@/data/nav-data";
import { Button } from "./ui/button";

const NavMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden block">
        <Button variant="ghost" size="icon">
          <LuMenu className="h-[1rem] w-[1rem]" />
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
