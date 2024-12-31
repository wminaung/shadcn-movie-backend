"use client";

import MyMoviesCarousel from "@/components/MyMoviesCarousel";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useMovieStore } from "@/store/movie";
import { MyButton } from "@/app/shadcn/MyButton";
import { useSession } from "next-auth/react";
import { useCategoryStore } from "@/store/category/categoryStore";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { getAllCategory } from "@/store/category/categoryActions";

export default function HomePage() {
  const { categories } = useCategoryStore();

  return (
    <div className="container mx-auto px-2 xs:px-3 md:px-0 transition-all lg:px-4 md:mx-auto">
      {categories.map((category) => (
        <MyMoviesCarousel key={category.id} category={category} />
      ))}
    </div>
  );
}
