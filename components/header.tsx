"use client";

import Link from "next/link";

import { NavItemsData } from "@/data/nav-data";

import NavMobile from "@/components/nav-mobile";
import ModalForm from "@/components/forms/modal-form";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="w-full border-b">
      <nav className="flex items-center justify-between p-2 text-sm">
        <Link href="/">LMS Cursos</Link>
        <div className="flex items-center gap-4">
          {NavItemsData.map((item) => (
            <Link
              href={item.url}
              key={item.name}
              className="text-muted-foreground dark:hover:text-white hover:text-black"
            >
              {item.name}
            </Link>
          ))}
          <ModalForm />
          <ModeToggle />
          <NavMobile />
        </div>
      </nav>
    </header>
  );
};

export default Header;
