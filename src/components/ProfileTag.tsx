"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileTag = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User is authenticated:", session.user?.email);
    }
  }, [status, session]);

  return (
    <div className="flex items-center space-x-4 ">
      {status === "authenticated" ? (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <p className="text-gray-700">{session?.user?.name}</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <p className="text-gray-500 text-sm">{session?.user?.email}</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="text-red-600"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => signIn("google")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Login with Google
        </Button>
      )}
    </div>
  );
};

export default ProfileTag;
