import { IYoutubeVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";

type Props = IYoutubeVideo & {
  className?: string;
  playerClassName?: string;
  showAvatar?: boolean;
};
function SingleVideoCard({
  url,
  songName,
  className,
  playerClassName,
  showAvatar = true,
}: Props) {
  return (
    <VideoCard className={className}>
      <VideoCard.Player className={playerClassName} url={url} />
      <VideoCard.Footer>
        <div className="flex flex-1 gap-3">
          {showAvatar && (
            <VideoCardAvatar.Avatar
              src="https://github.com/shadcn.png"
              alt="Shadcn"
              link="/channel/shadcn"
            />
          )}
          <div className="w-full h-full">
            <VideoCard.Link href={`/watch?v=${url}`}>{songName}</VideoCard.Link>
            <VideoCard.VerifiedBadge channelName="Shadcn">
              Verified
            </VideoCard.VerifiedBadge>
            <VideoCard.Details views={1000} />
          </div>
        </div>
        <VideoCard.Actions />
      </VideoCard.Footer>
    </VideoCard>
  );
}

export default SingleVideoCard;
