"use client";

import { IVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import { Button } from "./ui/button";
import ShareModal from "./modals/share-modal";
import { Separator } from "./ui/separator";
import ReactPlayer from "react-player";
import { addHTTPPrefix } from "@/utils/common";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = IVideo & {
  className?: string;
  playerClassName?: string;
  showAvatar?: boolean;
  isShort?: boolean;
};
function SingleVideoCard({
  thumbnail,
  videoFile,
  title,
  owner,
  views,
  duration,
  createdAt,
  _id,
  subscribersCount,
  className,
  playerClassName,
  showAvatar = true,
  isShort = false,
}: Props) {
  const { avatar, username, fullName, isVerified } = owner || {};
  return (
    <VideoCard className={className}>
      {isShort ? (
        <Link
          href={`/shorts/${_id}`}
          className={cn(
            "h-[450px] w-[300px] block rounded-2xl overflow-hidden",
            playerClassName,
          )}
        >
          <ReactPlayer
            light={addHTTPPrefix(thumbnail) ?? true}
            width="100%"
            height="100%"
            url={addHTTPPrefix(videoFile)}
            playsinline
            style={{ objectFit: "cover" }}
          />
        </Link>
      ) : (
        <VideoCard.Player
          thumbnail={thumbnail}
          className={playerClassName}
          url={videoFile}
          videoDuration={duration}
          _id={_id}
        />
      )}
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
            <VideoCard.Link
              href={isShort ? `/shorts/${_id}` : `/watch?v=${videoFile}`}
            >
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
