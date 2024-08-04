import { getUserLikeVideos } from "@/actions/user/getUserLikeVideo";
import EmptyState from "@/components/empty-state";
import LikeVideos from "@/components/feed/like-videos";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = generateClientMetadata({
  title: "Like Videos",
});
async function LikeVideosPage() {
  const likeVideos = await getUserLikeVideos();
  if (!likeVideos || !likeVideos?.data?.length)
    return <EmptyState text="No like videos" />;
  return <LikeVideos initialData={likeVideos} />;
}

export default LikeVideosPage;
