"use client";

import { Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="relative">
          <div className="absolute -top-2 right-0 h-4 w-4 bg-blue-600 rounded-full text-xs">
            3
          </div>
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <h6 className="text-center font-semibold text-lg">Notificações</h6>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa harum
            sed autem quisquam assumenda nemo alias fugiat, omnis hic porro,
            vitae, facere esse eaque!{" "}
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
