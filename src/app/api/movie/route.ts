import { movieService } from "@/core";
import { apiAuthCheck } from "@/lib/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") || undefined;
  const category = request.nextUrl.searchParams.get("category") || undefined;

  const movies = await movieService.getAll({ title, category });
  return NextResponse.json(movies);
}
