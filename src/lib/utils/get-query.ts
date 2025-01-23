import { NextRequest } from "next/server";

export const getMovieQuery = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title") || undefined;
  const category = searchParams.get("category") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;

  return { title, category, categoryId };
};
