import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : redirect("/");
};

export default Protected;
