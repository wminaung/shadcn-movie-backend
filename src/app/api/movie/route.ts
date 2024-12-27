import { movieService } from "@/core";
import { authCheck } from "@/lib/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (!(await authCheck())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const title = request.nextUrl.searchParams.get("title") || undefined;
  const category = request.nextUrl.searchParams.get("category") || undefined;

  const movies = await movieService.getAll({ title, category });
  return NextResponse.json(movies);
}
