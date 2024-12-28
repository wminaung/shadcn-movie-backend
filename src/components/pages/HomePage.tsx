"use client";

import MyMoviesCarousel from "@/components/MyMoviesCarousel";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useMovieStore } from "@/store/movie";
import { MyButton } from "@/app/shadcn/MyButton";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { movies, loading, error } = useMovieStore();
  const router = useRouter();
  const session = useSession();
  console.log(JSON.stringify(session));
  console.log("hello");

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;

  const categories = movies.map((movie) => movie.category);

  const uniqueCategories = categories.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  return (
    <div className="container mx-auto px-2 xs:px-3 md:px-0 transition-all lg:px-4 md:mx-auto">
      {uniqueCategories.map((category) => (
        <div key={category} className="flex flex-col transition-all p-0 m-0">
          <h3 className="text-lg transition-all">
            <MyButton
              variant={"link"}
              onClick={() => {
                router.push(`/admin/movie?category=${category}`);
              }}
              className="pl-0 text-xl"
              title={`Go to movies by ${category} category`}
            >
              {category} <FaArrowAltCircleRight />
            </MyButton>
          </h3>

          <div className="container ">
            <MyMoviesCarousel category={category} />
          </div>
        </div>
      ))}
    </div>
  );
}