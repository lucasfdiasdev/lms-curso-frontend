"use client";

import Loader from "@/components/loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const CustomLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};

export default CustomLoader;
