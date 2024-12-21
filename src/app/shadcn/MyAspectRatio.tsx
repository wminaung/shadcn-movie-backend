"use client";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Props {
  ratio?: number | undefined;
  components: React.ReactNode;
  width: number;
}

const MyAspectRatio = ({ ratio, width, components }: Props) => {
  return (
    <div className={`w-[${width}px]`}>
      <AspectRatio ratio={ratio}>{components}</AspectRatio>
    </div>
  );
};

export default MyAspectRatio;
