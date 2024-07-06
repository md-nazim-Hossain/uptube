"use client";

import { IVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import ReactPlayer from "react-player";
import { addHTTPPrefix } from "@/utils/common";
import Link from "next/link";
import { cn } from "@/lib/utils";
import VideoCardActions from "./video-card-actions";

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
              href={isShort ? `/shorts/${_id}` : `/watch?v=${_id}`}
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
        <VideoCardActions user={owner} />
      </VideoCard.Footer>
    </VideoCard>
  );
}

export default SingleVideoCard;
