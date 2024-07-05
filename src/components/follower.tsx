import React from "react";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import Link from "next/link";
import FollowUnfollow from "./channel/follow-unfollow";
import { IFollower } from "@/types";

type Props = IFollower["subscriber"];
function Follower({ username, avatar, fullName, isSubscribed }: Props) {
  return (
    <div className="w-full max-w-[230px] md:max-w-[240px] space-y-1.5">
      <Link href={`/channel/${username}`} className="space-y-2.5">
        <UpTubeAvatarImage
          src={avatar}
          alt={`Avatar of ${username}`}
          className="size-[230px] md:size-[240px]"
          name={fullName}
        />
        <Typography variant={"small"} className="block font-normal text-center">
          {username}
        </Typography>
      </Link>
      <div className="flex items-center justify-center">
        <FollowUnfollow
          isFollow={isSubscribed}
          revalidateQueryKey=""
          className="text-destructive h-max text-xs px-2 py-0.5"
          channelName={fullName}
          channelId={username}
        />
      </div>
    </div>
  );
}

export default Follower;
