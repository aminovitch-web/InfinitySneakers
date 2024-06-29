"use client";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { CUSTOMER_LOGIN_REDIRECT } from "@/routes";

const SocialMedia = () => {
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: CUSTOMER_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FaGoogle className="mr-2 h-5 w-5" />
        Google
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("facebook")}
      >
        <FaFacebook className="mr-2 h-5 w-5" />
        Facebook
      </Button>
    </div>
  );
};

export default SocialMedia;
