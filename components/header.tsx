"use client";

import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import { NavItemsData } from "@/data/nav-data";

import NavMobile from "@/components/nav-mobile";
import ButtonUser from "@/components/button-user";
import ModalForm from "@/components/forms/modal-form";
import { ModeToggle } from "@/components/mode-toggle";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";

const Header = () => {
  const { data } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const [socialAuth, { isSuccess, isError, error }] = useSocialAuthMutation();

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

    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [data, user]);

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
              src={user.avatar ? user.avatar : "./user.png"}
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
