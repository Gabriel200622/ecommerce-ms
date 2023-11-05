"use client";

import { useLogout } from "@/hooks/useLogout";
import { Button } from "@bigcomponents/core";

const Logout = () => {
  const { handleLogout } = useLogout();

  return (
    <div>
      <Button variant="destructive" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Logout;
