"use client";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import MyAspectRatio from "@/app/shadcn/MyAspectRatio";
import { Movie } from "@/core/entity/Movie";
import { cn } from "@/lib/utils";

interface Props {
  customClassName?: string;
  image?: string | null;
}

const ShowImage = ({ customClassName, image }: Props) => {
  if (!image) return <div>There is image</div>;

  return (
    <Card
      className={cn(
        "border-0 shadow-none dark:bg-gray-900 relative",
        customClassName
      )}
    >
      <MyAspectRatio
        ratio={2 / 3}
        width={10}
        components={
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image || "/2.avif"}
            alt="movie"
            priority
            className="object-cover  rounded-lg  transition-all w-full sm:w-[200px] md:w-[300px] lg:w-[400px]"
          />
        }
      />
    </Card>
  );
};

export default ShowImage;
