import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AvatarProps {
  image?: string;
  name: string;
}

export default function AvatarDemo({
  name,
  image = "/blank-user-svgrepo-com.svg",
}: AvatarProps) {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      // More explicitly clear the cookie with all necessary attributes
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";

      // Wait for NextAuth signOut to complete
      await signOut({ redirect: false });

      // Force a reload before redirect to ensure cookies are cleared in browser state
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="text-red-900 border-1 border-red-900">
            {name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20 bg-[#1E1F29] text-white border-none">
        <DropdownMenuItem onClick={() => router.push("/stats")}>
          Stats
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
