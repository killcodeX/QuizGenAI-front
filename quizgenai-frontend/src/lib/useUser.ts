// hooks/useUser.ts
import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  return {
    user: {
      name: session?.user?.name ?? "User",
      email: session?.user?.email ?? "",
      image: session?.user?.image ?? "/blank-user-svgrepo-com.svg",
      id: session?.user?.id ?? "",
      backendToken: session?.user?.backendToken ?? "",
    },
    status,
  };
};
