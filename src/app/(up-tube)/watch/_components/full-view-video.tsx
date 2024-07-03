"use client";

import ColumnViewVideoCard from "@/components/column-view-video-card";
import Comment from "@/components/comment";
import ShareModal from "@/components/modals/share-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import { youtubeVideos } from "@/data";
import { cn } from "@/lib/utils";
import { IVideo } from "@/types";
import { viewsFormat } from "@/utils/video";
import React from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
type Props = {
  video: IVideo;
};
function FullViewVideo({ video }: Props) {
  const [liked, setLiked] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const { _id, comments, likes, views, title, owner, videoFile } = video;

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div>
      <VideoCard className="sm:max-w-full rounded-none ">
        <VideoCard.Player
          fullPreview={true}
          autoPlay={true}
          className="rounded-none"
          url={videoFile}
        />
      </VideoCard>
      <div className="container py-5 flex flex-col lg:flex-row justify-between gap-10">
        <VideoCard.Footer className="flex h-max flex-col gap-3">
          <VideoCard.Link href={`/watch?v=${_id}`} className="w-max">
            {title}
          </VideoCard.Link>
          <div className="flex mb-6 flex-col sm:flex-row justify-between sm:items-center gap-5 sm:gap-2">
            <div className="flex justify-between items-center gap-20">
              <div className="flex gap-5 items-center">
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
              <Button variant={"outline"} className="text-destructive h-7">
                Follow
              </Button>
            </div>
            <div className="flex items-center gap-5 w-max">
              <VideoCard.Details showDate={false} views={views} />
              <div className="flex items-center gap-1">
                {liked ? (
                  <IoMdHeart
                    onClick={handleLike}
                    size={20}
                    className="text-destructive"
                  />
                ) : (
                  <IoIosHeartEmpty onClick={handleLike} size={20} />
                )}
                <span className="text-secondary text-sm">
                  {viewsFormat(likes)}
                </span>
              </div>
              <VideoCard.Actions show={true}>
                <Button variant={"flat"}>Add to playlist</Button>
                <Button variant={"flat"}>Next to play</Button>
                <Button variant={"flat"}>Add to queue</Button>
                <ShareModal
                  trigger={<Button variant={"flat"}>Share</Button>}
                  user={{
                    subscriber: owner?.subscribersCount ?? 0,
                    avatar: owner?.avatar ?? "",
                    fullName: owner?.fullName ?? "",
                  }}
                  shareLink={`/${owner?.username}`}
                />

                <Separator />
                <Button variant={"flat"}>Play</Button>
              </VideoCard.Actions>
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
          <Comment comments={comments} />
        </VideoCard.Footer>
        <ColumnViewVideoCard currentVideoId={video._id} />
      </div>
    </div>
  );
}

export default FullViewVideo;
