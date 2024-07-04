"use client";
import { IAPIResponse, IPlayList } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import ChannelPlaylist from "./channel-playlist";
import { cn } from "@/lib/utils";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";

type Props = {
  className?: string;
  userId: string;
};
function ChannelPlaylists({ className, userId }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<IPlayList[]>>(
    apiRoutes.playlists.getPlaylistByUserId + `/${userId}`,
  );

  if (isLoading) return <VideoCardSkeletons size={4} />;
  const playlists = data?.data || [];
  if (!playlists.length) return <EmptyState text={"No playlists found"} />;
  return (
    <div
      className={cn(
        "py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {playlists.map((playlist) => (
        <ChannelPlaylist key={playlist._id} {...playlist} />
      ))}
    </div>
  );
}

export default ChannelPlaylists;
