"use client";

import { useShortsProvider } from "@/components/providers/shorts-provider";
import { ShortCardSkeleton } from "@/components/skeletons/short-card-skeleton";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

function ShortsPage() {
  const router = useRouter();
  const { shorts } = useShortsProvider();
  useLayoutEffect(() => {
    if (shorts.length) router.push(`/shorts/${shorts[0]?._id}`);
  }, [router, shorts]);
  return (
    <div className="flex flex-col gap-5 items-center w-full pb-10">
      <ShortCardSkeleton className="max-w-[500px]" height={800} />
    </div>
  );
}

export default ShortsPage;
