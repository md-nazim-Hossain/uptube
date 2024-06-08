"use client";

import ColumnViewVideoCard from "@/components/column-view-video-card";
import Comment from "@/components/comment";
import { Button } from "@/components/ui/button";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import { youtubeVideos } from "@/data";
import { IYoutubeVideo } from "@/types";
import React from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
type Props = {
  url: string;
};
function FullViewVideo({ url }: Props) {
  const findVideo = youtubeVideos.find((video) => video.url === url);
  const [liked, setLiked] = React.useState(false);

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
          url={url}
        />
      </VideoCard>
      <div className="cp-10 py-5 flex flex-col lg:flex-row justify-between gap-10">
        <VideoCard.Footer className="flex h-max flex-col gap-3">
          <VideoCard.Link href="/watch?v=" className="w-max">
            {findVideo?.songName}
          </VideoCard.Link>
          <div className="flex mb-10 flex-col sm:flex-row justify-between sm:items-center gap-5 sm:gap-2">
            <div className="flex justify-between items-center gap-20">
              <div className="flex gap-5 items-center">
                <VideoCardAvatar.Avatar
                  src="https://github.com/shadcn.png"
                  alt="Shadcn"
                  link="https://github.com/shadcn"
                />
                <div>
                  <VideoCard.VerifiedBadge channelName="Shadcn">
                    Verified
                  </VideoCard.VerifiedBadge>
                  <p className="text-xs flex items-center gap-2">
                    <span className="text-secondary">Followers:</span>
                    <span className="font-medium">{4}</span>
                  </p>
                </div>
              </div>
              <Button variant={"outline"} className="text-destructive h-7">
                Follow
              </Button>
            </div>
            <div className="flex items-center gap-5 w-max">
              <VideoCard.Details showDate={false} views={1000} />
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
                <span className="text-secondary text-sm">{3}</span>
              </div>
              <VideoCard.Actions show={true} />
            </div>
          </div>
          <Comment />
        </VideoCard.Footer>
        <ColumnViewVideoCard />
      </div>
    </div>
  );
}

export default FullViewVideo;
