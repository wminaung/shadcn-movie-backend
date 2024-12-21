"use client";

import MyMoviesCarousel from "@/components/MyMoviesCarousel";
import useFetchMovies from "@/hooks/use-fetch-movies";
import { MyButton } from "../shadcn/MyButton";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { nextPublicApiUrl, nextPublicBaseUrl } from "@/constants/constants";
import Loading from "@/components/Loading";

export default function HomePage() {
  const { movies, loading, error } = useFetchMovies(
    `${nextPublicApiUrl}/movie`
  );
  const router = useRouter();

  if (error) return <div className="text-3xl text-red-700">Error</div>;
  if (loading) return <Loading />;

  const categories = movies.map((movie) => movie.category);

  const uniqueCategories = categories.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  return (
    <div className="container mx-auto px-2 xs:px-3 md:px-0 transition-all lg:px-4 md:mx-auto">
      {uniqueCategories.map((category) => (
        <div key={category} className="flex flex-col transition-all">
          <h3 className="text-lg transition-all">
            <MyButton
              variant={"link"}
              onClick={() => {
                router.push(`/movie?category=${category}`);
              }}
              className="pl-0 text-xl"
              title={`Go to movies by ${category} category`}
            >
              {category} <FaArrowAltCircleRight />
            </MyButton>
          </h3>

          <div className="flex justify-center w-full">
            <MyMoviesCarousel allMovies={movies} category={category} />
          </div>
        </div>
      ))}
    </div>
  );
}
