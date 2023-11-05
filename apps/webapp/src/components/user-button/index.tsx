import Link from "next/link";
import Logout from "./log-out";
import Image from "next/image";
import { getCurrentUser } from "@/lib/session";

const UserButton = async () => {
  const { user } = await getCurrentUser();

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] relative overflow-hidden rounded-full">
            <Image
              src={user.userImageUrl}
              alt={user.name}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>

          <p>{user?.name}</p>

          <Logout />
        </div>
      ) : (
        <Link href="/auth">Log in</Link>
      )}
    </>
  );
};

export default UserButton;
