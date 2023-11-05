import Link from "next/link";
import UserButton from "./user-button";
import Logo from "./logo";

const Header = () => {
  return (
    <div>
      <header className="bg-primary text-white h-[60px] flex items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/">Home</Link>

          {/* @ts-expect-error Server Component */}
          <UserButton />
        </div>
      </header>

      <div className="px-4 h-[50px] flex items-center">
        <Link href="/sell">Sell</Link>
      </div>
    </div>
  );
};

export default Header;
