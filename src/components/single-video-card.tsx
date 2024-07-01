"use client";

import { IVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import { Button } from "./ui/button";
import ShareModal from "./modals/share-modal";
import { Separator } from "./ui/separator";

type Props = IVideo & {
  className?: string;
  playerClassName?: string;
  showAvatar?: boolean;
};
function SingleVideoCard({
  thumbnail,
  videoFile,
  title,
  owner,
  views,
  duration,
  createdAt,
  subscribersCount,
  className,
  playerClassName,
  showAvatar = true,
}: Props) {
  const { avatar, username, fullName, isVerified } = owner || {};
  return (
    <VideoCard className={className}>
      <VideoCard.Player
        thumbnail={thumbnail}
        className={playerClassName}
        url={videoFile}
        videoDuration={duration}
      />
      <VideoCard.Footer>
        <div className="flex flex-1 gap-3">
          {showAvatar && (
            <VideoCardAvatar.Avatar
              src={avatar}
              alt={`profile of ${username}`}
              link={`/${username}`}
            />
          )}
          <div className="w-full h-full">
            <VideoCard.Link href={`/watch?v=${videoFile}`}>
              {title}
            </VideoCard.Link>
            <VideoCard.VerifiedBadge
              isVerified
              fullName={fullName}
              channelName={username}
            >
              {isVerified ? "Verified" : "Unverified"}
            </VideoCard.VerifiedBadge>
            <VideoCard.Details createdAt={new Date(createdAt)} views={views} />
          </div>
        </div>
        <VideoCard.Actions>
          <Button variant={"flat"}>Add to playlist</Button>
          <Button variant={"flat"}>Next to play</Button>
          <Button variant={"flat"}>Add to queue</Button>
          <ShareModal
            trigger={<Button variant={"flat"}>Share</Button>}
            user={{
              subscriber: subscribersCount ?? 0,
              avatar,
              fullName,
            }}
            shareLink={`/${username}`}
          />

          <Separator />
          <Button variant={"flat"}>Play</Button>
        </VideoCard.Actions>
      </VideoCard.Footer>
    </VideoCard>
  );
}

export default SingleVideoCard;
