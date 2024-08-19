"use client";
import { IPlayList } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { useEffect } from "react";
import ChannelPlaylist from "./channel-playlist";
import { cn } from "@/lib/utils";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";
import { useInView } from "react-intersection-observer";

type Props = {
  className?: string;
  userId: string;
};
function ChannelPlaylists({ className, userId }: Props) {
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useLoadMore<IPlayList[]>(
      apiRoutes.playlists.getPlaylistByUserId + `/${userId}`,
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) return <VideoCardSkeletons size={10} />;
  const pages = data?.pages || [];
  if (!pages || !pages.length || !pages[0]?.data?.length)
    return <EmptyState text={"No playlists found"} />;
  return (
    <div>
      {pages.map((page, index) => {
        if (!page || !page?.data || !page?.data.length) return null;
        return (
          <div
            className={cn(
              "py-5 grid gap-3 md:gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
              className,
            )}
            key={index}
          >
            {page.data.map((playlist) => (
              <ChannelPlaylist key={playlist._id} {...playlist} />
            ))}
          </div>
        );
      })}
      {hasNextPage && <div ref={ref}></div>}
      {isFetchingNextPage && <VideoCardSkeletons size={10} />}
    </div>
  );
}

export default ChannelPlaylists;
