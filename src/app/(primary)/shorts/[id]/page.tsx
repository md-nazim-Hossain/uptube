"use client";
import EmptyState from "@/components/empty-state";
import { useShortsProvider } from "@/components/providers/shorts-provider";
import ShortVideo from "@/components/shorts/short-video";
import { ShortCardSkeleton } from "@/components/skeletons/short-card-skeleton";
import { IVideo } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

function ShortsVideoPage() {
  const { id } = useParams();
  const { isLoading, shorts } = useShortsProvider();
  if (isLoading)
    return (
      <div className="flex flex-col gap-5 items-center w-full pb-10">
        <ShortCardSkeleton className="max-w-[500px]" height={800} />
      </div>
    );
  const findShort = shorts.find((short) => short._id === id);
  if (!findShort) return <EmptyState text="No short found" />;
  return (
    <section className="flex flex-col gap-5 items-center  w-full pb-10">
      <ShortVideo {...findShort} />
      {shorts.map((short: IVideo, index: number) =>
        short._id === findShort._id ? null : (
          <ShortVideo key={index} {...short} />
        ),
      )}
    </section>
  );
}

export default ShortsVideoPage;
