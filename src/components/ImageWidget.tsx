"use client";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MyAspectRatio from "@/app/shadcn/MyAspectRatio";
import { useMovieStore } from "@/store/movie";
import { Movie } from "@/core/entity/Movie";
import { Category } from "@/core/entity/Category";
import { cn } from "@/utils";

interface Props {
  customClassName?: string;
  movie?: Movie;
}

//https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2Fc%2Fgracenote%2Fc307cf09b20216353316e6f18bf2756d.jpg

const ImageWidget = ({ customClassName, movie }: Props) => {
  if (!movie) return <div>There is no movie</div>;

  return (
    <Card
      className={cn("border-0 shadow-none dark:bg-gray-900 ", customClassName)}
    >
      <MyAspectRatio
        ratio={2 / 3}
        width={10}
        components={
          <div className="relative w-full h-full">
            <Link href={`/admin/movie/${movie.id}/edit`}>
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={movie.image || "/2.avif"}
                alt="movie"
                priority
                className="object-cover  rounded hover:border-2 transition-all   
            hover:p-1 hover:border-slate-200 hover:cursor-pointer  overflow-hidden"
              />
            </Link>
          </div>
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

export default ImageWidget;
