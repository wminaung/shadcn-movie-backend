import { getServerSession } from "next-auth/next";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { encode } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const token = await encode({
    token: {
      ...session,
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return NextResponse.json({ token });
}
