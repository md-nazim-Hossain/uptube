"use client";

import FollowUnfollow from "@/components/channel/follow-unfollow";
import Comments from "@/components/comments/comments";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import ColumnViewVideoCard from "@/components/videos/column-view-video-card";
import VideoCardActions from "@/components/videos/video-card-actions";
import { cn } from "@/lib/utils";
import { IVideo } from "@/types";
import { usePost } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { viewsFormat } from "@/utils/video";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useUserStore } from "@/zustand/useUserStore";
import React from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
type Props = {
  video: IVideo;
};
function FullViewVideo({ video }: Props) {
  const [showMore, setShowMore] = React.useState(false);
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { _id, comments, likes, views, title, owner, videoFile, isLiked } =
    video;

  const { mutateAsync: mutateLikeDislike } = usePost<any, any>(
    apiRoutes.likes.likeDislike,
    apiRoutes.videos.getVideoById + _id,
    undefined,
    (oldData, data) => {
      if (!oldData) return;
      const totalLikes = oldData?.data?.likes;
      const isLiked = oldData?.data?.isLiked;
      return {
        data: {
          ...oldData?.data,
          likes: isLiked
            ? totalLikes - (totalLikes > 0 ? 1 : 0)
            : totalLikes + 1,
          isLiked: !isLiked,
        },
      };
    },
  );

  const handleLikeDislike = async () => {
    try {
      await mutateLikeDislike({
        videoId: _id,
        state: isLiked ? "dislike" : "like",
      });
    } catch (error) {}
  };
  return (
    <div>
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
            <div className="flex justify-between items-center gap-20">
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
                revalidateQueryKey={apiRoutes.videos.getVideoById + _id}
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
                  {isLiked ? (
                    <IoMdHeart className="text-destructive" />
                  ) : (
                    <IoIosHeartEmpty />
                  )}
                </Button>
                <span className="text-secondary text-sm">
                  {viewsFormat(likes)}
                </span>
              </div>
              <VideoCardActions user={owner} show={!!user} />
            </div>
          </div>
          <div className="mb-4 p-3 rounded-md bg-primary/10">
            <Typography className={cn("text-primary")} variant={"muted"}>
              <span>
                {showMore
                  ? video?.description
                  : video?.description?.slice(0, 200)}
              </span>
              {video?.description?.length > 200 && (
                <span onClick={() => setShowMore(!showMore)}>
                  {showMore ? " Show Less" : "...more"}
                </span>
              )}
            </Typography>
          </div>
          <Comments comments={comments} contentId={_id} />
        </VideoCard.Footer>
        <ColumnViewVideoCard currentVideoId={video._id} />
      </div>
    </div>
  );
}

export default FullViewVideo;
