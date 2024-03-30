import Header from "@/components/header";

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayoutMain;
