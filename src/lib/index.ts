import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSession } from "./auth";
import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getYesterdayDate = () => {
  const today = new Date();
  const yesterday = new Date(today);

  const milliseconds = yesterday.setDate(today.getDate() - 1);
  return new Date(milliseconds);
};

export const convertMinutesToHoursAndSeconds = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = minutes * 60;

  return { hours, minutes, seconds };
};

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
