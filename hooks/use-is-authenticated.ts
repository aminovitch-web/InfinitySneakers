import { useSession } from "next-auth/react";

export const useIsAuthenticated = () => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return isLoggedIn;
};
