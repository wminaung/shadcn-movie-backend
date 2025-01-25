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
  category: Category;
}

//https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2Fc%2Fgracenote%2Fc307cf09b20216353316e6f18bf2756d.jpg

const ViewAll = ({ category, customClassName }: Props) => {
  // const { movies } = useMovieStore();

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
          <Link href={`/admin/movie?category=${category.name}`}>
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
    </Card>
  );
};

export default ViewAll;
