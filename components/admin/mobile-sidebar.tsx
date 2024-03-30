import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 md:hidden">
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
