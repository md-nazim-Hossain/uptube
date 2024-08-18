"use client";

import { IUserFavoriteVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { useEffect } from "react";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";
import SingleVideoCard from "../videos/single-video-card";
import { useInView } from "react-intersection-observer";

function ChannelUserFavoriteVideos() {
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useLoadMore<IUserFavoriteVideo[]>(apiRoutes.likes.getUserLikeVideos);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isLoading) return <VideoCardSkeletons size={10} />;
  const pages = data?.pages || [];
  if (!pages || !pages.length)
    return <EmptyState text={"No favorite videos found"} />;
  return (
    <div>
      {pages?.map((page, index) => {
        if (!page || !page?.data || !page?.data.length) return null;
        return (
          <div
            key={index}
            className="py-5 grid gap-3 md:gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          >
            {page.data.map((video: IUserFavoriteVideo) => (
              <SingleVideoCard
                showType={video?.video?.type === "short"}
                key={video._id}
                {...video?.video}
                showAvatar={false}
                onHoverPlay={false}
              />
            ))}
          </div>
        );
      })}
      {isFetchingNextPage && <VideoCardSkeletons size={10} />}
      {hasNextPage && <div ref={ref}></div>}
    </div>
  );
}

export default ChannelUserFavoriteVideos;
