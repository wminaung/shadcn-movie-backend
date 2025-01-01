import { movieService } from "@/core";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") || undefined;
  const category = request.nextUrl.searchParams.get("category") || undefined;

  if (!title || !category) {
    return NextResponse.json(
      { error: "Please provide a title and a category" },
      { status: 400 }
    );
  }

  if (title && category) {
    return NextResponse.json(
      { error: "Please provide either a title or a category, not both" },
      { status: 400 }
    );
  }

  if (title) {
    const movies = await movieService.getAll({
      title: title,
    });
    return NextResponse.json(movies);
  }

  if (category) {
    const movies = await movieService.getAll({
      category: category,
    });
    return NextResponse.json(movies);
  }
}
