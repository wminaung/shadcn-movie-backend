"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const GoogleLoginPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User is authenticated:", session.user?.email);
    }
  }, [status, session]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h1>
        {status === "authenticated" ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700">
              Welcome, {session?.user?.name}!
            </p>
            <Button
              onClick={() => signOut()}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Button
              onClick={() => signIn("google")}
              className="w-full mb-4 bg-blue-600 text-white hover:bg-blue-700"
            >
              Login with Google
            </Button>
            <p className="text-gray-500">
              Please login to access the admin panel.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Your login data is not stored in our database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleLoginPage;
