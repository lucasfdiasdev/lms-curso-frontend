"use client";

import Notification from "@/components/admin/notification";
import MobileSidebar from "@/components/admin/mobile-sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end gap-8">
        user button
        <Notification />
      </div>
    </div>
  );
};

export default Navbar;
