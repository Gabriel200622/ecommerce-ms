import Header from "@/components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100">{children}</div>
    </>
  );
};

export default Layout;
