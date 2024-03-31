"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { NavItemsData } from "@/data/nav-data";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";

import NavMobile from "@/components/nav-mobile";
import ButtonUser from "@/components/button-user";
import ModalForm from "@/components/forms/modal-form";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  const { data } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const [socialAuth] = useSocialAuthMutation();
  const [logout, setLogout] = useState<boolean>(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data.user?.image,
        });
      }
    }

    if (data === null) {
      setLogout(true);
    }
  }, [data, user, socialAuth]);

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
          {user ? (
            <ButtonUser
              src={user.avatar ? user.avatar.url : "./user.png"}
              alt={user.name}
              name={user.email}
            />
          ) : (
            <ModalForm />
          )}
          <ModeToggle />
          <NavMobile />
        </div>
      </nav>
    </header>
  );
};

export default Header;
