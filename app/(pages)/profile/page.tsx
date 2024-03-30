"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import Heading from "@/utils/heading";
import Protected from "@/hooks/Protected";
import { useLogOutQuery } from "@/redux/features/auth/authApi";

import ProfileInfo from "@/components/profile/profile-info";
import SidebarProfile from "@/components/profile/sidebar-profile";
import ChangePassword from "@/components/profile/change-password";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [scroll, setScroll] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const { user } = useSelector((state: any) => state.auth);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
    redirect("/");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} profile`}
          description="LMS is a plataform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className="w-[85%] flex mx-auto">
          <div
            className={cn(
              `w-[60px] md:w-[310px] h-[450px] bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky`,
              scroll ? "top-[120px]" : "top-[30px]"
            )}
          >
            <SidebarProfile
              user={user}
              active={active}
              avatar={avatar}
              setActive={setActive}
              logoutHandler={logoutHandler}
            />
          </div>
          {active === 1 && <ProfileInfo avatar={avatar || ""} user={user} />}
          {active === 3 && <ChangePassword />}
        </div>
      </Protected>
    </div>
  );
};

export default ProfilePage;
