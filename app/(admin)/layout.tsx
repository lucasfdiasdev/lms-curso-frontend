import AdminSidebar from "@/components/admin/admin-sidebar";
import Navbar from "@/components/admin/navbar";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <AdminSidebar />
      </div>
      <main className="md:pl-60">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default LayoutAdmin;
