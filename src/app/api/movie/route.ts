import { movieService } from "@/core";
import { response } from "@/lib/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") || undefined;
  const category = request.nextUrl.searchParams.get("category") || undefined;
  const categoryId =
    request.nextUrl.searchParams.get("categoryId") || undefined;

  if (!title && !category && !categoryId) {
    const movies = await movieService.getAll();
    return response(movies);
  }

  if (
    (title && category) ||
    (title && categoryId) ||
    (category && categoryId)
  ) {
    return response(
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
    return response(movies);
  }

  if (category) {
    const movies = await movieService.getAll({
      category: category,
    });
    return response(movies);
  }
  if (categoryId) {
    const movies = await movieService.getAll({
      categoryId: categoryId,
    });
    return response(movies);
  }
}
