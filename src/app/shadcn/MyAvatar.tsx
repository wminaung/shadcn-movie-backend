"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  src: string;
  fallback: string;
}
const MyAvatar = ({ src, fallback }: Props) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default MyAvatar;
