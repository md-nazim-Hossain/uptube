import { IYoutubeVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import { Button } from "./ui/button";
import ShareModal from "./modals/share-modal";
import { Separator } from "./ui/separator";

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
              link="/@shadcn"
            />
          )}
          <div className="w-full h-full">
            <VideoCard.Link href={`/watch?v=${url}`}>{songName}</VideoCard.Link>
            <VideoCard.VerifiedBadge
              isVerified
              fullName="Shadcn"
              channelName="@shadcn"
            >
              Verified
            </VideoCard.VerifiedBadge>
            <VideoCard.Details views={1000} />
          </div>
        </div>
        <VideoCard.Actions>
          <Button variant={"flat"}>Add to playlist</Button>
          <Button variant={"flat"}>Next to play</Button>
          <Button variant={"flat"}>Add to queue</Button>
          <ShareModal
            trigger={<Button variant={"flat"}>Share</Button>}
            user={{
              subscriber: 1000,
              avatar: "https://github.com/shadcn.png",
              fullName: "Shadcn",
            }}
            shareLink="/@shadcn"
          />

          <Separator />
          <Button variant={"flat"}>Play</Button>
        </VideoCard.Actions>
      </VideoCard.Footer>
    </VideoCard>
  );
}

export default SingleVideoCard;
