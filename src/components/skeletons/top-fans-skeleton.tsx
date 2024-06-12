import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const TopFansSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-3">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-1.5">
        <Skeleton className="w-9/12 h-4 mx-auto" />
        <Skeleton className="w-20 h-6 rounded-[100vw]" />
      </div>
    </div>
  );
};

type Props = {
  className?: string;
  size?: number;
};
export const TopFansSkeletons = ({ className, size = 6 }: Props) => {
  return (
    <div className="space-y-5">
      <Skeleton className="w-11/12 h-6" />
      <div
        className={cn("flex flex-row lg:flex-col gap-5 flex-wrap", className)}
      >
        {Array.from({ length: size }, (_, i) => (
          <TopFansSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
