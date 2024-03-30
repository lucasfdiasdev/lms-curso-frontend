"use client";

import Link from "next/link";
import { Montserrat } from "next/font/google";

import {
  Book,
  Users,
  LogOut,
  CodeXml,
  Settings,
  VideoIcon,
  MonitorPlay,
  FileQuestion,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin"],
});

const AdminSidebar = () => {
  const pathname = usePathname();

  const routesSidebarAdmin = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      color: "text-sky-500",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      color: "text-violet-500",
    },
    {
      label: "Invoices",
      icon: Book,
      href: "/admin/invoices",
      color: "text-pink-700",
    },
    {
      label: "Create course",
      icon: VideoIcon,
      href: "/admin/create-course",
      color: "text-orange-700",
    },
    {
      label: "Live Courses",
      icon: MonitorPlay,
      href: "/admin/live-courses",
      color: "text-emerald-500",
    },
    {
      label: "Hero",
      icon: LayoutDashboard,
      href: "/admin/hero",
      color: "text-green-700",
    },
    {
      label: "FAQ",
      icon: FileQuestion,
      href: "/admin/faq",
      color: "text-green-700",
    },
    {
      label: "Categories",
      icon: FileQuestion,
      href: "/admin/categories",
      color: "text-green-700",
    },
    {
      label: "Manage Team",
      icon: FileQuestion,
      href: "/admin/manage-team",
      color: "text-green-700",
    },
    {
      label: "Courses Analytics",
      icon: FileQuestion,
      href: "/admin/courses-analytics",
      color: "text-green-700",
    },
    {
      label: "Orders Analytics",
      icon: FileQuestion,
      href: "/admin/orders-analytics",
      color: "text-green-700",
    },
    {
      label: "Users Analytics",
      icon: FileQuestion,
      href: "/admin/users-analytics",
      color: "text-green-700",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      color: "text-green-700",
    },
    {
      label: "Logout",
      icon: LogOut,
      href: "/categories",
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white overflow-y-auto">
      <div className="px-3 py-2 flex-1">
        <Link href={"/"} className="flex items-center pl-3 mb-14">
          <CodeXml className="relative w-8 h-8 mr-4" />
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            LMS
          </h1>
        </Link>
        <div className="space-y-1">
          {routesSidebarAdmin.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-2", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
