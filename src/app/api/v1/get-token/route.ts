import { NextResponse, type NextRequest } from "next/server";
import { encode } from "next-auth/jwt";
import { getSession } from "@/lib/auth";
import { response } from "@/lib/response";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const token = await encode({
    token: {
      ...session,
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return response({ token }, { status: 200 });
}
