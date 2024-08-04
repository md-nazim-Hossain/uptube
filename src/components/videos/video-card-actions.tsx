"use client";

import React from "react";
import { VideoCard } from "../ui/video-card";
import { Button } from "../ui/button";
import ShareModal from "../modals/share-modal";
import { IUser } from "@/types";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  user: IUser;
  show?: boolean;
  shareLink?: string;
};
function VideoCardActions({ className, user, show, shareLink }: Props) {
  return (
    <VideoCard.VideoActions show={show} className={cn("", className)}>
      <Button variant={"flat"}>Add to playlist</Button>
      <Button variant={"flat"}>Next to play</Button>
      <Button variant={"flat"}>Add to queue</Button>
      <ShareModal
        trigger={<Button variant={"flat"}>Share</Button>}
        user={{
          subscriber: user?.subscribersCount ?? 0,
          avatar: user?.avatar ?? "",
          fullName: user?.fullName ?? "",
        }}
        shareLink={shareLink || `/${user?.username}`}
      />

      <Separator />
      <Button variant={"flat"}>Play</Button>
    </VideoCard.VideoActions>
  );
}

export default VideoCardActions;
