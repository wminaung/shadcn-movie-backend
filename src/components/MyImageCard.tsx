"use client";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MyAspectRatio from "@/app/shadcn/MyAspectRatio";
import { useMovieStore } from "@/store/movie";
import { Movie } from "@/core/entity/Movie";
import { Category } from "@/core/entity/Category";

interface Props {
  customClassName?: string;
  movie?: Movie;
  asImage?: boolean;
}

//https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2Fc%2Fgracenote%2Fc307cf09b20216353316e6f18bf2756d.jpg

const MyImageCard = ({ customClassName, movie, asImage }: Props) => {
  // const { movies } = useMovieStore();

  if (!movie) return <div>There is no movie</div>;

  // ! in params
  if (asImage) {
    return (
      <Card
        className={cn("border-0 shadow-none dark:bg-gray-900", customClassName)}
      >
        <MyAspectRatio
          ratio={2 / 3}
          width={10}
          components={
            <Image
              fill
              src={"/2.avif"}
              alt="movie"
              className="object-cover  rounded-lg  transition-all w-full sm:w-[200px] md:w-[300px] lg:w-[400px]"
            />
          }
        />
      </Card>
    );
  }

  return (
    <Card
      className={cn("border-0 shadow-none dark:bg-gray-900", customClassName)}
    >
      <MyAspectRatio
        ratio={2 / 3}
        width={10}
        components={
          <Link href={`/admin/movie/${movie.id}/edit`}>
            <Image
              fill
              src={
                "https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2F5%2Fgracenote%2F5e382dfb7014b01cb54d34e74edb8039.jpg"
              }
              alt="movie"
              className="object-cover  rounded hover:border-2 transition-all   
            hover:p-1 hover:border-slate-200 hover:cursor-pointer  overflow-hidden"
            />
          </Link>
        }
      />

      {/* Footer Section */}
      <CardFooter className="flex flex-col justify-center items-start px-0 py-2">
        <p className="text-sm">{movie?.title ? movie.title : ""}</p>

        <span>{movie?.release_year}</span>
      </CardFooter>
    </Card>
  );
};

export default MyImageCard;
