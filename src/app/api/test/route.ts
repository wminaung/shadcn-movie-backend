import { getSession } from "@/lib/auth";
import { response } from "@/lib/response";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  console.log(session);
  return response(session);
}
