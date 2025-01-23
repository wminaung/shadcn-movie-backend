"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Category } from "@/core/entity/Category";
import { useEffect, useState } from "react";
import { Movie } from "@/core/entity/Movie";
import { MyButton } from "@/app/shadcn/MyButton";
import { FaArrowAltCircleRight } from "react-icons/fa";
import ViewAll from "./ViewAll";
import { useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movie";
import Loading from "./Loading";
import { Separator } from "./ui/separator";
import ImageWidget from "./ImageWidget";
//sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5

interface Props {
  category: Category;
}
const MyMoviesCarousel = ({ category }: Props) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const { filteredMoviesByCatId } = useMovieStore();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const movies = await filteredMoviesByCatId(category.id);
      setFilteredMovies(movies);
    })();
  }, [category]);

  if (!filteredMovies.length) return null;

  return (
    <div key={category.id} className="flex flex-col transition-all p-0 m-0">
      <h3 className="text-lg transition-all">
        <MyButton
          variant={"link"}
          onClick={() => {
            router.push(`/admin/movie?category=${category.name}`);
          }}
          className="pl-0 text-xl"
          title={`Go to movies by ${category.name} category`}
        >
          {category.name} <FaArrowAltCircleRight />
        </MyButton>
      </h3>
      <div className="container ">
        <Carousel
          opts={{
            // align: "start",
            slidesToScroll: "auto",
          }}
          className="md:w-[98%] w-full "
        >
          <CarouselContent>
            {filteredMovies.map((movie, index) => (
              <CarouselItem
                key={movie.id}
                className={`basis-2/2 sm:basis-1/3 md:basis-1/4 lg:basis:1/5 xl:basis-1/5`}
              >
                <ImageWidget
                  movie={movie}
                  customClassName=" w-[100px] sm:w-[160px] md:w-[170px] lg:w-[220px]"
                />
              </CarouselItem>
            ))}
            <CarouselItem className="basis-2/2 sm:basis-1/3 md:basis-1/4 lg:basis:1/5 xl:basis-1/5">
              <ViewAll
                category={category}
                customClassName=" w-[100px] sm:w-[160px] md:w-[170px] lg:w-[220px]"
              />
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-between">
            <CarouselPrevious className="absolute left-0 top-1/3 transform -translate-y-2/2 scale-150 " />
            <CarouselNext className="absolute right-0  top-1/3 transform -translate-y-2/2 scale-150" />
          </div>
        </Carousel>
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
};

export default MyMoviesCarousel;
