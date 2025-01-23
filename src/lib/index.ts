import { getSession } from "./auth";
import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

export const authCheck = async () => {
  const session = await getSession();

  if (!session || !session.user || !session.user.email) {
    // do something
    return new Promise((resolve) => resolve(false));
  }
  return new Promise((resolve) => resolve(true));
};

export const apiAuthCheck = async (
  request: NextRequest
): Promise<JWT | null> => {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    return token;
  } catch (error) {
    console.log("apiAuthCheck Error", error);
    return null;
  }
};
