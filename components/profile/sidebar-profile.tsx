"use client";

import Image from "next/image";

import { LogOut } from "lucide-react";
import { BsLockFill } from "react-icons/bs";
import { SiCoursera } from "react-icons/si";

import { cn } from "@/lib/utils";
import PictureAvatar from "@/public/user.png";

interface ISidebarProfile {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
}
const SidebarProfile: React.FC<ISidebarProfile> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          `w-full flex items-center px-3 py-4 cursor-pointer`,
          active === 1 ? "bg-slate-800" : "bg-transparent"
        )}
        onClick={() => setActive(1)}
      >
        <Image
          width={30}
          height={30}
          src={user.avatar ? user.avatar.url : PictureAvatar}
          alt={user.name}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full "
        />
        <h5 className="pl-2 md:block hidden text-muted-foreground dark:text-white">
          My Account
        </h5>
      </div>
      <div
        className={cn(
          `w-full flex items-center px-3 py-4 cursor-pointer`,
          active === 2 ? "bg-slate-800" : "bg-transparent"
        )}
        onClick={() => setActive(2)}
      >
        <SiCoursera />
        <h5 className="pl-2 md:block hidden text-muted-foreground dark:text-white">
          Enrolled Courses
        </h5>
      </div>
      <div
        className={cn(
          `w-full flex items-center px-3 py-4 cursor-pointer`,
          active === 3 ? "bg-slate-800" : "bg-transparent"
        )}
        onClick={() => setActive(3)}
      >
        <BsLockFill />
        <h5 className="pl-2 md:block hidden text-muted-foreground dark:text-white">
          Change Password
        </h5>
      </div>
      <div
        className={cn(
          `w-full flex items-center px-3 py-4 cursor-pointer`,
          active === 4 ? "bg-slate-800" : "bg-transparent"
        )}
        onClick={() => logoutHandler()}
      >
        <LogOut />
        <h5 className="pl-2 md:block hidden text-muted-foreground dark:text-white">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
