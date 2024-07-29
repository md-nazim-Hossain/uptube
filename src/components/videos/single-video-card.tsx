"use client";

import { IVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import ReactPlayer from "react-player";
import { addHTTPPrefix } from "@/utils/common";
import Link from "next/link";
import { cn } from "@/lib/utils";
import VideoCardActions from "./video-card-actions";
import UpTubeImage from "../uptube/uptube-image";

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
  type,
  className,
  playerClassName,
  showAvatar = true,
  isShort = false,
}: Props) {
  const { avatar, username, fullName, isVerified } = owner || {};
  return (
    <VideoCard className={className}>
      <VideoCard.Player
        type={type as any}
        thumbnail={thumbnail}
        className={playerClassName}
        url={videoFile}
        videoDuration={duration}
        _id={_id}
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
