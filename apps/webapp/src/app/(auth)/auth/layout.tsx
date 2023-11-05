import Logo from "@/components/logo";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <>
      <div className="h-[60px] flex border-b items-center justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <>{children}</>
    </>
  );
};

export default Layout;
