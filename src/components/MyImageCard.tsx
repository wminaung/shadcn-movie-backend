"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import MyAspectRatio from "@/app/shadcn/MyAspectRatio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Movie } from "@prisma/client";

interface Props {
  customClassName?: string;
  isViewAll?: boolean;
  movie?: Movie;
  asImage?: boolean;
}

//https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2Fc%2Fgracenote%2Fc307cf09b20216353316e6f18bf2756d.jpg

const MyImageCard = ({ customClassName, isViewAll, movie, asImage }: Props) => {
  // ! go all movies

  if (!movie) return <div>There is no movie</div>;

  if (isViewAll) {
    return (
      <Card
        className={cn(
          "border-0 shadow-none animate-pulse dark:bg-gray-900 transition-all",
          customClassName
        )}
      >
        <MyAspectRatio
          ratio={2 / 3}
          width={10}
          components={
            <Link href={`/movie?category=${movie.category}`}>
              <Image
                fill
                src={
                  "https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2Fc%2Fgracenote%2Fc307cf09b20216353316e6f18bf2756d.jpg"
                }
                alt="movie"
                className="object-cover transition-all  rounded hover:border-2 
          hover:p-1 hover:border-slate-200 hover:cursor-pointer"
              />
            </Link>
          }
        />

        {/* Footer Section */}
        {/* <CardFooter className="flex flex-col justify-center items-start px-0 py-2">
          <p className="text-sm">Movie Description</p>

          <span>1946</span>
        </CardFooter> */}
      </Card>
    );
  }

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
              className="object-cover  rounded-lg  transition-all"
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
          <Link href={`/movie/${movie.id}`}>
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
