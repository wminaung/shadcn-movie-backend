"use client";
import { Skeleton } from "@/components/ui/skeleton";

type Props = React.HTMLAttributes<HTMLDivElement>;
const MySkeleton = ({ className, ...props }: Props) => {
  return <Skeleton className={`${className}`} {...props} />;
};

export default MySkeleton;
