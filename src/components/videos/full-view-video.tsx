"use client";

import FollowUnfollow from "@/components/channel/follow-unfollow";
import Comments from "@/components/comments/comments";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import VideoCardActions from "@/components/videos/video-card-actions";
import { IAPIResponse, IVideo } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { viewsFormat } from "@/utils/video";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useUserStore } from "@/zustand/useUserStore";
import React, { useState } from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import ViewCount from "./view-count";
import AddWatchHistory from "./AddWatchHistory";
import RelatedVideos from "./related-videos";
import UTagify from "../uptube/u-tagify";
import axios from "@/utils/axios";
import { useToast } from "../ui/use-toast";
import { revalidatePath } from "@/_actions/revalidate-actions";
import { getCookie } from "cookies-next";

type Props = {
  video: IVideo;
};
function FullViewVideo({ video }: Props) {
  const { toast } = useToast();
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { _id, likes, views, title, owner, videoFile, isLiked } = video;
  const [isLikedVideo, setIsLikedVideo] = useState(isLiked);
  const [totalLikes, setTotalLikes] = useState(likes);

  const handleLikeDislike = async () => {
    const prevLiked = isLikedVideo;
    try {
      setTotalLikes((prev) =>
        isLikedVideo ? prev - (prev > 0 ? 1 : 0) : prev + 1,
      );
      setIsLikedVideo((prev) => !prev);
      await axios.post(
        apiRoutes.likes.likeDislike,
        {
          videoId: _id,
          state: isLikedVideo ? "dislike" : "like",
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        },
      );
      revalidatePath("/watch");
    } catch (error: IAPIResponse<any> | any) {
      setTotalLikes((prev) =>
        !prevLiked ? prev - (prev > 0 ? 1 : 0) : prev + 1,
      );
      setIsLikedVideo(prevLiked);
      toast({
        variant: "destructive",
        title: `Failed to ${isLikedVideo ? "dislike" : "like"} video`,
        description: error?.data?.message,
      });
    }
  };
  return (
    <div>
      {_id && (
        <>
          {user?._id !== owner?._id && (
            <ViewCount
              revalidateQueryKey={apiRoutes.videos.getVideoById + _id}
              videoId={_id}
            />
          )}
          {user && <AddWatchHistory videoId={_id} />}
        </>
      )}
      <VideoCard className="sm:max-w-full rounded-none">
        <VideoCard.Player
          fullPreview={true}
          autoPlay={true}
          className="rounded-none"
          url={videoFile}
        />
      </VideoCard>
      <div className="container py-5 flex flex-col lg:flex-row justify-between gap-10">
        <VideoCard.Footer className="flex h-max flex-col gap-3 py-0">
          <Typography
            variant={"h4"}
            className="w-max font-medium line-clamp-2 hover:opacity-80"
          >
            {title}
          </Typography>
          <div className="flex mb-6 flex-col sm:flex-row justify-between sm:items-center gap-5 sm:gap-2">
            <div className="flex justify-between items-center gap-5 sm:gap-20">
              <div className="flex-1 flex gap-5 items-center">
                <VideoCardAvatar.Avatar
                  src={owner?.avatar!}
                  alt={owner?.fullName}
                  link={owner?.username}
                />
                <div>
                  <VideoCard.VerifiedBadge
                    fullName={owner?.fullName}
                    channelName={owner?.username}
                    isVerified={owner?.isVerified}
                    className="max-w-[200px] truncate"
                  />

                  <Typography className="text-xs [&:not(:first-child)]:mt-0 flex items-center gap-2">
                    <span className="text-secondary">Followers:</span>
                    <span className="font-medium">
                      {viewsFormat(owner?.subscribersCount ?? 0)}
                    </span>
                  </Typography>
                </div>
              </div>
              <FollowUnfollow
                channelId={owner?._id}
                isFollow={owner?.isSubscribed}
                channelName={owner?.fullName}
                onSuccess={() => revalidatePath("/watch")}
              />
            </div>
            <div className="flex items-center gap-5 w-max">
              <VideoCard.Details showDate={false} views={views} />
              <div className="flex items-center">
                <Button
                  onClick={() => (user ? handleLikeDislike() : setOpen(true))}
                  variant={"flat"}
                  className="flex text-lg hover:bg-transparent justify-center items-center size-8 p-0"
                >
                  {isLikedVideo ? (
                    <IoMdHeart className="text-destructive" />
                  ) : (
                    <IoIosHeartEmpty />
                  )}
                </Button>
                <span className="text-secondary text-sm">
                  {viewsFormat(totalLikes)}
                </span>
              </div>
              <VideoCardActions user={owner} show={!!user} />
            </div>
          </div>
          <div className="mb-4 p-3 rounded-md bg-primary/10 text-primary text-sm">
            <UTagify text={video?.description ?? ""} />
          </div>
          <Comments contentId={_id} />
        </VideoCard.Footer>
        <RelatedVideos currentVideoId={video._id} />
      </div>
    </div>
  );
}

export default FullViewVideo;
