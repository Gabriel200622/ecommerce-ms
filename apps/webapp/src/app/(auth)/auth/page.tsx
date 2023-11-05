"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@bigcomponents/core";
import { envs } from "@/config/envs";

const AuthPage = () => {
  const login = async () => {
    window.location.href = `${envs.NEXT_PUBLIC_SERVER_URL}/api/user/auth/google`;
  };

  return (
    <div className="flex justify-center mt-10">
      <Button
        onClick={login}
        type="button"
        className="rounded-full"
        variant="secondary"
      >
        <FcGoogle className="mr-2 text-2xl" />
        <span className="font-semibold">Continue with Google</span>
      </Button>
    </div>
  );
};

export default AuthPage;
