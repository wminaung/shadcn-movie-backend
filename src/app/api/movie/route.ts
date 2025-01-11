import { movieService } from "@/core";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") || undefined;
  const category = request.nextUrl.searchParams.get("category") || undefined;
  const categoryId =
    request.nextUrl.searchParams.get("categoryId") || undefined;

  if (!title && !category && !categoryId) {
    return await movieService.getAll();
  }

  if (
    (title && category) ||
    (title && categoryId) ||
    (category && categoryId)
  ) {
    return NextResponse.json(
      {
        error:
          "Please provide only one parameter: title, category, or categoryId",
      },
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
  if (categoryId) {
    const movies = await movieService.getAll({
      categoryId: categoryId,
    });
    return NextResponse.json(movies);
  }
}
