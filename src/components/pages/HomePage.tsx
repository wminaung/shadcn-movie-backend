"use client";
import { Card } from "@/components/ui/card";
import { useMovieStore } from "@/store/movie";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/category/categoryStore";
import MyMoviesCarousel from "@/components/MyMoviesCarousel";

export default function HomePage() {
  const { movies, loading: movieLoading } = useMovieStore();
  const { categories, loading: categoryLoading } = useCategoryStore();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Movies</h3>
          <p className="text-2xl">{movies?.length || 0}</p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">Categories</h3>
          <p className="text-2xl">{categories?.length || 0}</p>
        </Card>
      </div>

      <div className="flex gap-4 mb-8">
        <Link href="/admin/create/movie">
          <Button>Add New Movie</Button>
        </Link>
        <Link href="/admin/category">
          <Button variant="outline">Manage Categories</Button>
        </Link>
      </div>

      <section className="">
        <div className="container mx-auto px-2 xs:px-3 md:px-0 transition-all lg:px-4">
          {categories?.map((category) => (
            <div key={category.id} className="mb-5">
              <MyMoviesCarousel category={category} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
