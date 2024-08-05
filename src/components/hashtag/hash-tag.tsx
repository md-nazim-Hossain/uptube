"use client";
import { IAPIResponse, IVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { useEffect } from "react";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";
import SingleVideoCard from "../videos/single-video-card";
import { useInView } from "react-intersection-observer";

type Props = {
  initialData?: IAPIResponse<IVideo[]>;
  hashtagname: string;
};
function HashTag({ hashtagname, initialData }: Props) {
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useLoadMore<IVideo[]>(apiRoutes.videos.hashtag + hashtagname, undefined, [
      initialData,
    ]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) return <VideoCardSkeletons size={8} />;
  const pages = data?.pages || [];
  if (!pages || !pages.length)
    return <EmptyState text="No hashtag videos found" />;
  return (
    <>
      {pages.map((page, index) => {
        if (!page || !page?.data || !page?.data.length) return null;
        return (
          <div
            key={index}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {page.data.map((video, innerIndex) => {
              return (
                <SingleVideoCard
                  playerClassName="bg-primary/5"
                  {...video}
                  key={innerIndex}
                  onHoverPlay={false}
                />
              );
            })}
          </div>
        );
      })}
      {isFetchingNextPage && <VideoCardSkeletons size={8} />}
      {hasNextPage && <div ref={ref}></div>}
    </>
  );
}

export default HashTag;
